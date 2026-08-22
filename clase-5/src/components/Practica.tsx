import { useEffect, useState } from "react";

export default function Practica() {
  const [segundos, setSegundos] = useState(60);
  const [corriendo, setCorriendo] = useState(true);

  useEffect(() => {
    // Si la cuenta regresiva no está activa o llegó a 0, no iniciamos el intervalo
    if (!corriendo || segundos <= 0) return;

    const id = setInterval(() => {
      setSegundos((s) => {
        if (s <= 1) {
          setCorriendo(false); // Se detiene sola en 0
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [corriendo, segundos]);

  function reiniciar() {
    setSegundos(60);
    setCorriendo(true);
  }

  return (
    <div className="my-4 flex items-center gap-3 rounded-xl border p-4">
      <p className="text-2xl font-bold">⌚ {segundos} s.</p>
      <button 
        onClick={() => setCorriendo(!corriendo)}
        disabled={segundos === 0}
        className="rounded-lg bg-gray-200 px-3 py-1 text-sm font-medium hover:bg-gray-300 disabled:opacity-50"
      >
        {corriendo ? 'Pausar' : 'Reanudar'}
      </button>
      <button 
        onClick={reiniciar}
        className="rounded-lg bg-black px-3 py-1 text-sm text-white hover:bg-gray-800"
      >
        Reiniciar
      </button>
    </div>
  );
}