import { productos } from "./datos"
import Practica from "./Practica";





function App() {


  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* TAREA 1 Y 2: Header semántico, Tailwind CSS y Bautizo de Tienda */}
      <header className="bg-slate-900 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight text-indigo-400">CRYONFORGE</h1>
        <nav>
          <ul className="flex gap-4 text-sm font-medium">
            <li className="hover:text-indigo-300 cursor-pointer">Inicio</li>
            <li className="hover:text-indigo-300 cursor-pointer">Catálogo</li>
            <li className="hover:text-indigo-300 cursor-pointer">Contacto</li>
          </ul>
        </nav>
      </header>

      {/* TAREA 2: Main semántico */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6">
        
        {/* TAREA 5: Componente de práctica con useState */}
        <Practica />

        <h2 className="text-xl font-bold mb-6 text-gray-800">Catálogo de Productos</h2>

        {/* 
          TAREA 3: 
        * Duplicar la etiqueta <article> a mano tres veces no es buena práctica.
           Si después me piden cambiar los estilos de Tailwind o agregar un botón, tendría que editar 
            cada tarjeta una por una, lo que hace el código difícil de mantener y propenso a errores. 
            Lo ideal es iterar con el método .map() o mover la tarjeta a un componente reutilizable <ProductCard />.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
         {/* Tarjeta 1 */}
  <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col justify-between">
    <div>
      <img src={productos[0].imagen} alt={productos[0].nombre} className="w-full h-40 object-contain mb-3 rounded-lg" />
      <span className="text-xs text-indigo-600 uppercase font-semibold">{productos[0].marca}</span>
      <h3 className="font-bold text-gray-800 text-sm mb-1">{productos[0].nombre}</h3>
      {productos[0].descripcion && (
        <p className="text-xs text-gray-500 my-2 bg-gray-50 p-2 rounded">{productos[0].descripcion}</p>
      )}
    </div>
    <div className="mt-4 pt-2 border-t border-gray-100 flex justify-between items-center">
      <p className="text-lg font-extrabold text-slate-900">S/ {productos[0].precio}</p>
      <span className="text-xs text-gray-400">Stock: {productos[0].stock}</span>
    </div>
  </article>

  {/* Tarjeta 2 */}
  <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col justify-between">
    <div>
      <img src={productos[1].imagen} alt={productos[1].nombre} className="w-full h-40 object-contain mb-3 rounded-lg" />
      <span className="text-xs text-indigo-600 uppercase font-semibold">{productos[1].marca}</span>
      <h3 className="font-bold text-gray-800 text-sm mb-1">{productos[1].nombre}</h3>
      {productos[1].descripcion && (
        <p className="text-xs text-gray-500 my-2 bg-gray-50 p-2 rounded">{productos[1].descripcion}</p>
      )}
    </div>
    <div className="mt-4 pt-2 border-t border-gray-100 flex justify-between items-center">
      <p className="text-lg font-extrabold text-slate-900">S/ {productos[1].precio}</p>
      <span className="text-xs text-gray-400">Stock: {productos[1].stock}</span>
    </div>
  </article>

  {/* Tarjeta 3 */}
  <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col justify-between">
    <div>
      <img src={productos[2].imagen} alt={productos[2].nombre} className="w-full h-40 object-contain mb-3 rounded-lg" />
      <span className="text-xs text-indigo-600 uppercase font-semibold">{productos[2].marca}</span>
      <h3 className="font-bold text-gray-800 text-sm mb-1">{productos[2].nombre}</h3>
      {productos[2].descripcion && (
        <p className="text-xs text-gray-500 my-2 bg-gray-50 p-2 rounded">{productos[2].descripcion}</p>
      )}
    </div>
    <div className="mt-4 pt-2 border-t border-gray-100 flex justify-between items-center">
      <p className="text-lg font-extrabold text-slate-900">S/ {productos[2].precio}</p>
      <span className="text-xs text-gray-400">Stock: {productos[2].stock}</span>
    </div>
  </article>
          
        </div>
      </main>

      {/* TAREA 2: Footer semántico */}
      <footer className="bg-slate-900 text-gray-400 text-center p-4 text-xs border-t border-slate-800 mt-10">
        <p>© 2026 iStore Cusco - Todos los derechos reservados.</p>
      </footer>
    </div>
  );

  
}

export default App;
