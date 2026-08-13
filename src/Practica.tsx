import { useState } from 'react';

export default function Practica() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  /*
   * COMENTARIO PARA TAREA 5:
   * useState es un Hook de React que sirve para almacenar y gestionar el estado local de un componente.
   * Nos entrega una variable con el valor actual (count) y una función para actualizarlo (setCount).
   * Cada vez que llamamos a setCount, React detecta el cambio de estado y vuelve a renderizar 
   * el componente para actualizar el número visible en la pantalla.
   */

  return (
    <div className="p-4 bg-slate-100 rounded-lg text-center my-6 max-w-sm mx-auto border shadow-sm">
      <h3 className="text-md font-bold mb-2 text-slate-800">Ejercicio Práctico con useState</h3>
      <button 
        onClick={handleClick}
        className="bg-indigo-600 text-white px-4 py-2 rounded font-medium hover:bg-indigo-700 transition"
      >
        Hiciste clic {count} veces
      </button>
    </div>
  );
}