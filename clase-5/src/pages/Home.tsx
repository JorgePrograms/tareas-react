import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import type { ItemCarrito, Producto } from '../tipos';
import formatearPrecio from '../formato';

interface Props {
  productos: Producto[];
  estado: 'cargando' | 'listo' | 'error';
  esRespaldo: boolean;
  carrito: ItemCarrito[];
  carritoAbierto: boolean;
  setCarritoAbierto: (value: boolean) => void;
  onAgregar: (producto: Producto) => void;
  onQuitar: (id: number) => void;
  onVaciar: () => void;
  onReintentar: () => void;
}

export default function Home({
  productos,
  estado,
  esRespaldo,
  carrito,
  carritoAbierto,
  setCarritoAbierto,
  onAgregar,
  onQuitar,
  onVaciar,
  onReintentar,
}: Props) {
  const [categoriaActiva, setCategoriaActiva] = useState('todas');
  const [termino, setTermino] = useState('');

  const categorias = ['todas', 'laptops', 'audio', 'relojes'];
  const busqueda = termino.trim().toLocaleLowerCase();

  // Este catálogo es SOLO de tecnología.
  // "todas" significa todas las categorías tecnológicas,
  // no todos los productos que entregue la API.
  const esTecnologia = (producto: Producto) => {
    const cat = (producto.categoria ?? '').toLocaleLowerCase();
    const nombre = producto.nombre.toLocaleLowerCase();

    // Laptops
    if (
      cat === 'laptops' ||
      cat === 'laptop' ||
      nombre.includes('laptop') ||
      nombre.includes('notebook')
    ) {
      return true;
    }

    // Relojes
    if (
      cat === 'relojes' ||
      cat === 'mens-watches' ||
      cat === 'womens-watches' ||
      cat === 'watches' ||
      /\b(reloj|watch|smartwatch)\b/.test(nombre)
    ) {
      return true;
    }

    // Audio.
    // No consideramos todo "mobile-accessories" como audio,
    // porque allí también pueden venir fundas, cargadores, etc.
    if (
      cat === 'audio' ||
      /auricular|aud[ií]fono|earbud|earphone|headphone|headset|airpod|speaker|parlante|soundbar|audio/.test(
        nombre,
      )
    ) {
      return true;
    }

    return false;
  };

  const perteneceACategoria = (producto: Producto, categoria: string) => {
    const cat = (producto.categoria ?? '').toLocaleLowerCase();
    const nombre = producto.nombre.toLocaleLowerCase();

    if (categoria === 'todas') {
      return esTecnologia(producto);
    }

    if (categoria === 'laptops') {
      return (
        cat === 'laptops' ||
        cat === 'laptop' ||
        nombre.includes('laptop') ||
        nombre.includes('notebook')
      );
    }

    if (categoria === 'audio') {
      return (
        cat === 'audio' ||
        /auricular|aud[ií]fono|earbud|earphone|headphone|headset|airpod|speaker|parlante|soundbar|audio/.test(
          nombre,
        )
      );
    }

    if (categoria === 'relojes') {
      return (
        cat === 'relojes' ||
        cat === 'mens-watches' ||
        cat === 'womens-watches' ||
        cat === 'watches' ||
        /\b(reloj|watch|smartwatch)\b/.test(nombre)
      );
    }

    return false;
  };

  // Primero dejamos únicamente productos tecnológicos.
  // Luego aplicamos la categoría y finalmente la búsqueda.
  const productosTecnologia = productos.filter(esTecnologia);

  const visible = productosTecnologia.filter(
    (producto) =>
      perteneceACategoria(producto, categoriaActiva) &&
      (busqueda === '' ||
        producto.nombre.toLocaleLowerCase().includes(busqueda) ||
        producto.marca.toLocaleLowerCase().includes(busqueda)),
  );

  useEffect(() => {
    const filtroCat =
      categoriaActiva !== 'todas' ? ` | ${categoriaActiva}` : '';
    const filtroBusqueda = busqueda !== '' ? ` - "${termino.trim()}"` : '';

    document.title = `tech-cart${filtroCat}${filtroBusqueda} (${visible.length} resultados)`;
  }, [visible.length, categoriaActiva, termino, busqueda]);

  const unidades = carrito.reduce((suma, item) => suma + item.cantidad, 0);
  const total = carrito.reduce(
    (suma, item) => suma + item.cantidad * item.precio,
    0,
  );

  return (
    <main className="mx-auto max-w-5xl p-6">
      <Header
        nombre="Tienda Tech"
        eslogan="Ofertas de agosto"
        resumen={`🛒 ${unidades} productos - ${formatearPrecio(total)}`}
      />

      <div className="mb-4 flex gap-3 text-sm">
        <button
          className="underline"
          onClick={() => setCarritoAbierto(!carritoAbierto)}
        >
          {carritoAbierto ? 'Ocultar carrito' : 'Ver carrito'}
        </button>

        <Link className="underline" to="/checkout">
          Checkout
        </Link>

        <Link className="underline" to="/pedidos">
          Mis pedidos
        </Link>
      </div>

      {carritoAbierto && (
        <section className="mb-6 rounded-xl border p-4">
          <h2 className="font-semibold">Tu carrito</h2>

          {carrito.length === 0 && (
            <p className="text-sm text-gray-500">Tu carrito está vacío.</p>
          )}

          <ul>
            {carrito.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between py-1 text-sm"
              >
                <span>
                  {item.nombre} x {item.cantidad}
                </span>

                <button
                  onClick={() => onQuitar(item.id)}
                  aria-label="Quitar del carrito"
                >
                  X
                </button>
              </li>
            ))}
          </ul>

          {carrito.length > 0 && (
            <button className="mt-2 text-sm underline" onClick={onVaciar}>
              Vaciar carrito
            </button>
          )}
        </section>
      )}

      {esRespaldo && (
        <p className="mb-4 rounded-lg border border-orange-300 bg-orange-50 p-2 text-sm">
          Mostrando el catálogo local. No pudimos conectar con la tienda.
          <button className="ml-2 underline" onClick={onReintentar}>
            Reintentar
          </button>
        </p>
      )}

      <nav className="mb-4 flex gap-2" aria-label="Filtrar por categoría">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            onClick={() => setCategoriaActiva(categoria)}
            className={`rounded-full border px-3 py-1 text-sm ${
              categoria === categoriaActiva ? 'bg-black text-white' : ''
            }`}
          >
            {categoria}
          </button>
        ))}
      </nav>

      <input
        type="search"
        placeholder="Buscar por nombre o marca..."
        value={termino}
        onChange={(e) => setTermino(e.target.value)}
        className="mb-4 w-64 rounded-lg border px-3 py-2 text-sm"
        aria-label="Buscar productos"
      />

      {estado === 'cargando' && (
        <section className="flex flex-wrap gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </section>
      )}

      {estado === 'error' && (
        <p className="text-red-600">No pudimos cargar los productos.</p>
      )}

      {estado === 'listo' && visible.length === 0 && (
        <p className="text-gray-500">
          {busqueda !== ''
            ? `No encontramos productos para ${termino.trim()}`
            : 'No hay productos en esta categoría.'}
        </p>
      )}

      {estado === 'listo' && (
        <section className="flex flex-wrap gap-4">
          {visible.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onAgregar={onAgregar}
            />
          ))}
        </section>
      )}

      <Footer />
    </main>
  );
}