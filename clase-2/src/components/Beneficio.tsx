interface BeneficioProps {
  titulo: string;
  detalle?: string;
}

export const Beneficio = ({ titulo, detalle = "Consulta condiciones" }: BeneficioProps) => {
  return (
    <div className="p-4 border rounded-md">
      <h3 className="font-bold text-lg">{titulo}</h3>
      <p className="text-gray-600 text-sm">{detalle}</p>
    </div>
  );
}