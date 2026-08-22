import { Link, useNavigate } from 'react-router-dom';
import type { ItemCarrito, Pedido } from '../tipos';
import formatearPrecio from '../formato';

const CLAVE_PEDIDOS = 'tienda_pedidos';

interface Props {
  carrito: ItemCarrito[];
  onConfirmar: (pedido: Pedido) => void;
}

export default function Checkout({ carrito, onConfirmar }: Props) {
  const navigate = useNavigate();
  const total = carrito.reduce((suma, item) => suma + item.cantidad * item.precio, 0);

  function confirmar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const pedido: Pedido = {
      id: `PED-${Date.now()}`,
      fecha: new Date().toISOString(),
      items: carrito,
      total,
      estado: 'recibido',
    };

    onConfirmar(pedido);
    navigate('/pedidos');
  }

  // Protegemos el checkout con un condicional:
  // si el carrito está vacío, mostramos el mensaje y no renderizamos el formulario.
  if (carrito.length === 0) {
    return (
      <main className="mx-auto max-w-2xl p-6">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="mt-4 text-gray-600">
          Tu carrito está vacío. Agrega productos antes de continuar.
        </p>
        <Link
          className="mt-4 inline-block rounded-full bg-black px-4 py-2 text-sm text-white"
          to="/"
        >
          Ir al catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <Link className="text-sm underline" to="/">
        ← Seguir comprando
      </Link>
      <h1 className="mt-3 text-2xl font-bold">Checkout</h1>

      <form onSubmit={confirmar} className="mt-6 space-y-4 rounded-xl border p-5">
        <div>
          <label className="text-sm font-medium" htmlFor="nombre">
            Nombre
          </label>
          <input
            id="nombre"
            required
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="correo">
            Correo
          </label>
          <input
            id="correo"
            type="email"
            required
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <p className="font-semibold">Resumen</p>
          {carrito.map((item) => (
            <p key={item.id} className="text-sm">
              {item.nombre} x {item.cantidad}
            </p>
          ))}
          <p className="mt-2 font-semibold">Total: {formatearPrecio(total)}</p>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-black px-4 py-2 text-sm text-white"
        >
          Confirmar pedido
        </button>
      </form>
    </main>
  );
}

export { CLAVE_PEDIDOS };