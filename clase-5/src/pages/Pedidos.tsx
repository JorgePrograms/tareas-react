import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import formatearPrecio from '../formato';
import type { Pedido } from '../tipos';
import { CLAVE_PEDIDOS } from './Checkout';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    try {
      const crudo: unknown = JSON.parse(localStorage.getItem(CLAVE_PEDIDOS) ?? '[]');
      if (Array.isArray(crudo)) setPedidos(crudo as Pedido[]);
    } catch {
      setPedidos([]);
    }
  }, []);

  return (
    <main className="mx-auto max-w-3xl p-6">
      <Link className="text-sm underline" to="/">← Volver al catálogo</Link>
      <h1 className="mt-3 text-2xl font-bold">Mis pedidos</h1>

      {pedidos.length === 0 ? (
        <p className="mt-6 rounded-xl border p-5 text-gray-500">Aún no tienes pedidos guardados.</p>
      ) : (
        <section className="mt-6 space-y-4">
          {pedidos.map((pedido) => (
            <article key={pedido.id} className="rounded-xl border p-5">
              <div className="flex flex-wrap justify-between gap-2">
                <div>
                  <h2 className="font-semibold">{pedido.id}</h2>
                  <p className="text-sm text-gray-500">{new Date(pedido.fecha).toLocaleString('es-PE')}</p>
                </div>
                <span className="rounded-full border px-3 py-1 text-xs">{pedido.estado}</span>
              </div>
              <ul className="mt-3 text-sm">
                {pedido.items.map((item) => <li key={item.id}>{item.nombre} x {item.cantidad}</li>)}
              </ul>
              <p className="mt-3 font-semibold">Total: {formatearPrecio(pedido.total)}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
