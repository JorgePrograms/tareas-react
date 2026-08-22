import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import formatearPrecio from '../formato';
import type { Producto } from '../tipos';

interface Props {
  productos: Producto[];
  onAgregar: (producto: Producto) => void;
}

export default function DetalleProducto({ productos, onAgregar }: Props) {
  const { id } = useParams();
  const producto = productos.find((item) => item.id === Number(id));

  useEffect(() => {
    document.title = producto ? producto.nombre : 'Producto no encontrado';
  }, [producto]);

  if (!producto) {
    return <main className="mx-auto max-w-3xl p-6"><p>Producto no encontrado.</p><Link className="underline" to="/">Volver al catálogo</Link></main>;
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <Link className="text-sm underline" to="/">← Volver al catálogo</Link>
      <article className="mt-4 grid gap-6 rounded-xl border p-6 md:grid-cols-2">
        <img src={producto.imagen} alt={producto.nombre} className="aspect-square w-full object-contain" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{producto.marca}</p>
          <h1 className="text-3xl font-bold">{producto.nombre}</h1>
          {producto.rating !== undefined && <p className="mt-2">⭐ {producto.rating.toFixed(1)}</p>}
          <p className="mt-4 text-2xl font-semibold">{formatearPrecio(producto.precio * 1.18)}</p>
          <p className="mt-4 text-sm leading-6 text-gray-600">{producto.descripcion}</p>
          <p className="mt-4 text-sm">Stock: {producto.stock}</p>
          <button disabled={producto.stock === 0} onClick={() => onAgregar(producto)} className="mt-4 rounded-full border px-5 py-2 text-sm disabled:opacity-50">
            {producto.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
          </button>
        </div>
      </article>
    </main>
  );
}
