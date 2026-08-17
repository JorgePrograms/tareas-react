import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import { productos } from "./datos"
import type { EstadoCarga, ItemCarrito, Producto } from "./tipos";
import formatearPrecio from "./formato";
import { agregarItems, cambiarCantidad, quitarItem } from "./carrito";






export default function App() {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  // Tarea 5: Forma funcional aplicada
  function agregarAlCarrito(producto : Producto) { 
  setCarrito(agregarItems(carrito, producto));
  }

  function modificarCantidad(id: number, cantidad: number) {
    setCarrito((prev) => cambiarCantidad(prev, id, cantidad));
  }

  function eliminarItem(id: number) {
    setCarrito((prev) => quitarItem(prev, id));
  }


  const unidades = carrito.reduce((suma, i) => suma + i.cantidad, 0);
  const totalPrecio = carrito.reduce((suma, i) => suma + i.cantidad * i.precio, 0);
  const estado : EstadoCarga = 'listo';
return (
    <main className="mx-auto max-w-5xl p-6">
      <Header
        nombre="Tienda Tech"
        eslogan="Ofertas de agosto"
        resumen={`🛒 ${unidades} productos - ${formatearPrecio(totalPrecio)}`}
      />

      <section className="mb-6 rounded-xl border p-4">
        <h2 className="font-semibold mb-2">Tu carrito</h2>
        {carrito.length === 0 && (
          <p className="text-sm text-gray-500">Tu carrito está vacío.</p>
        )}
        <ul>
          {carrito.map((item) => (
            <li key={item.id} className="flex items-center justify-between py-1 text-sm border-b last:border-b-0">
              <span>{item.nombre} - {formatearPrecio(item.precio)}</span>
              
              {/* Tareas 3 y 4: Botones +, - y ✕ */}
              <div className="flex items-center gap-2">
                <button
                  className="px-2 border rounded"
                  onClick={() => modificarCantidad(item.id, item.cantidad - 1)}
                >
                  -
                </button>
                <span className="w-4 text-center">{item.cantidad}</span>
                <button
                  className="px-2 border rounded"
                  onClick={() => modificarCantidad(item.id, item.cantidad + 1)}
                >
                  +
                </button>
                <button
                  className="ml-2 text-red-500 font-bold"
                  onClick={() => eliminarItem(item.id)}
                  aria-label="Quitar del carrito"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {estado === "listo" && (
        <section className="flex flex-wrap gap-4">
          {productos.map((p) => (
            <ProductCard key={p.id} producto={p} onAgregar={agregarAlCarrito} />
          ))}
        </section>
      )}

      <Footer />
    </main>
  );
}