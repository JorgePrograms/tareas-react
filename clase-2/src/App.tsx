import { Beneficio } from "./components/Beneficio";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import { productos } from "./datos"
import type { EstadoCarga } from "./tipos";






export default function App() {
  const estado : EstadoCarga = 'listo';
  return( 
    <main className="mx-auto max-w-5xl p-6">
      <Header nombre="TechStore" eslogan="Lo último en tecnología"/>

      {/* TAREA INTERMEDIA: Render de Beneficios (3 veces: envío, cuotas y garantía) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <Beneficio 
          titulo="Envío gratis" 
          detalle="A todo el país en compras seleccionadas" 
        />
        <Beneficio 
          titulo="Hasta 12 cuotas" 
          detalle="Sin intereses con tarjetas BCP y BBVA" 
        />
        <Beneficio 
          titulo="Garantía extendida" 
          /* Sin detalle para que aplique el valor por defecto */
        />
      </section>

      {/* {estado === 'cargando' ? <p className="text-gray-500">Cargando Catalogo...</p> : ''} */}
      {/* {estado === 'error' && <p className="text-red-600">No pudimos cargar los productos</p>} */}
      {estado === 'listo' && (
        <section className="flex flex-wrap gap-4">
            {/* 
        POR QUÉ EL ÍNDICE MIENTE:
        Se usa `p.id` en lugar de `index` para evitar que el Virtual DOM pierda la 
        referencia del estado de los componentes al filtrar o reordenar.
        Usar p.id garantiza una clave estable e idéntica al dato.
    */}
        {
        
          productos.map((p) => (
            <ProductCard key={p.id} producto={p}/>
          ))
        }
      </section>
      )}
      <Footer/>
    </main>
  )
}