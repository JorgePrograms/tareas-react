import { useState } from "react";
import formatearPrecio from "../formato";
import type { Producto } from "../tipos";
import EtiquetaStock from "./EtiquetaStock";


interface Props{
  producto: Producto;
  onAgregar: (producto : Producto) => void
}

export default function ProductCard( {producto, onAgregar} : Props){
// Tarea 2: Estado local para favorito
  const [esFavorito, setEsFavorito] = useState(false);

  const agotado = producto.stock === 0; //true/false
  return (
    <article className={`w-64 rounded-xl border p-4 ${agotado ? 'opacity-50' : ''}`}>
      {/* Cabecera: Nombre, Marca y Favorito */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="font-semibold leading-snug">{producto.nombre}</h2>
          {producto.marca && (
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {producto.marca}
            </p>
          )}
        </div>
        <button
          onClick={() => setEsFavorito(!esFavorito)}
          aria-label={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
          className="text-lg leading-none"
        >
          {esFavorito ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Imagen del producto */}
      {producto.imagen && (
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="my-3 aspect-square w-full object-contain"
        />
      )}

      {/* Stock y Precio */}
      <EtiquetaStock stock={producto.stock} />
      <p className="mt-2 text-sm">
        {formatearPrecio(producto.precio * 1.18)} con IGV
      </p>

      {/* Botón de acción */}
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