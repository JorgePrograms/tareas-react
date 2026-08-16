import formatearPrecio from "../formato";

interface PrecioProps {
  precio: number;
}

export default function Precio({ precio }: PrecioProps) {
  // Calculamos el precio con IGV (18%)
  const precioConIgv = precio * 1.18;

  return (
    <div className="flex flex-col my-2">
      <span className="text-xl font-bold text-green-700">
        {formatearPrecio(precioConIgv)} <small className="text-xs font-normal text-gray-500">(con IGV)</small>
      </span>
      <span className="text-xs text-gray-500">
        Base: {formatearPrecio(precio)}
      </span>
    </div>
  );
}