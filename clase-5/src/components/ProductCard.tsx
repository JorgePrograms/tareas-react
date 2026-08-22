import { useState } from 'react';
import { Link } from 'react-router-dom';
import formatearPrecio from '../formato';
import type { Producto } from '../tipos';
import EtiquetaStock from './EtiquetaStock';
interface Props {
  producto: Producto;
  onAgregar: (producto: Producto) => void;
}

export default function ProductCard({ producto, onAgregar }: Props) {
  const [esFavorito, setEsFavorito] = useState(false);
  const agotado = producto.stock === 0;

  return (
    <article className={`w-64 rounded-xl border p-4 ${agotado ? 'opacity-50' : ''}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <Link to={`/producto/${producto.id}`} className="font-semibold leading-snug hover:underline">
            {producto.nombre}
          </Link>
          {producto.marca && (
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {producto.marca}
            </p>
          )}
          {producto.rating !== undefined && (
            <span className="text-xs font-semibold text-amber-600">⭐ {producto.rating.toFixed(1)}</span>
          )}
        </div>
        <button
          onClick={() => setEsFavorito(!esFavorito)}
          aria-label={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          className="text-lg leading-none"
        >
          {esFavorito ? '❤️' : '🤍'}
        </button>
      </div>

      <Link to={`/producto/${producto.id}`} aria-label={`Ver detalle de ${producto.nombre}`}>
        <img src={producto.imagen} alt={producto.nombre} className="my-3 aspect-square w-full object-contain" />
      </Link>

      <EtiquetaStock stock={producto.stock} />
      <p className="mt-2 text-sm">{formatearPrecio(producto.precio * 1.18)} con IGV</p>

      <button
        className="mt-3 w-full rounded-full border px-4 py-1 text-sm disabled:cursor-not-allowed"
        onClick={() => onAgregar(producto)}
        disabled={agotado}
      >
        {agotado ? 'Agotado' : 'Agregar al carrito'}
      </button>
    </article>
  );
}
