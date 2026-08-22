import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import type { ItemCarrito, Pedido, Producto, EstadoCarga } from './tipos';
import { agregarItems, quitarItem } from './carrito';
import { obtenerProductos } from './api';
import Home from './pages/Home';
import Detalle from './pages/DetalleProducto';
import Checkout from './pages/Checkout';
import Pedidos from './pages/Pedidos';
import { CLAVE_PEDIDOS } from './pages/Checkout';

const CLAVE_CARRITO = 'tienda_carrito';
const CLAVE_CARRITO_ABIERTO = 'tienda_carrito_abierto';

function leerCarrito(): ItemCarrito[] {
  try {
    const crudo: unknown = JSON.parse(localStorage.getItem(CLAVE_CARRITO) ?? '[]');
    return Array.isArray(crudo) ? (crudo as ItemCarrito[]) : [];
  } catch {
    return [];
  }
}

function leerCarritoAbierto(): boolean {
  try {
    const crudo = localStorage.getItem(CLAVE_CARRITO_ABIERTO);
    if (crudo !== null) {
      const parseado: unknown = JSON.parse(crudo);
      return typeof parseado === 'boolean' ? parseado : false;
    }
  } catch {
    // Valor inválido: usamos false.
  }
  return false;
}

export default function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [estado, setEstado] = useState<EstadoCarga>('cargando');
  const [esRespaldo, setEsRespaldo] = useState(false);
  const [intento, setIntento] = useState(0);
  const [carrito, setCarrito] = useState<ItemCarrito[]>(leerCarrito);
  const [carritoAbierto, setCarritoAbierto] = useState<boolean>(leerCarritoAbierto);

  useEffect(() => {
    const controller = new AbortController();

    async function cargar() {
      setEstado('cargando');
      try {
        const resultado = await obtenerProductos(controller.signal);
        setProductos(resultado.productos);
        setEsRespaldo(resultado.esRespaldo);
        setEstado('listo');
      } catch (error) {
        if ((error as Error).name !== 'AbortError') setEstado('error');
      }
    }

    void cargar();
    return () => controller.abort();
  }, [intento]);

  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO_ABIERTO, JSON.stringify(carritoAbierto));
  }, [carritoAbierto]);

  function agregarAlCarrito(producto: Producto) {
    setCarrito((actual) => agregarItems(actual, producto));
  }

  function quitarDelCarrito(id: number) {
    setCarrito((actual) => quitarItem(actual, id));
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  function guardarPedido(pedido: Pedido) {
    try {
      const crudo: unknown = JSON.parse(localStorage.getItem(CLAVE_PEDIDOS) ?? '[]');
      const pedidos = Array.isArray(crudo) ? (crudo as Pedido[]) : [];
      localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify([pedido, ...pedidos]));
      setCarrito([]);
    } catch (error) {
      console.warn('No se pudo guardar el pedido:', error);
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            productos={productos}
            estado={estado}
            esRespaldo={esRespaldo}
            carrito={carrito}
            carritoAbierto={carritoAbierto}
            setCarritoAbierto={setCarritoAbierto}
            onAgregar={agregarAlCarrito}
            onQuitar={quitarDelCarrito}
            onVaciar={vaciarCarrito}
            onReintentar={() => setIntento((actual) => actual + 1)}
          />
        }
      />
      <Route path="/producto/:id" element={<Detalle productos={productos} onAgregar={agregarAlCarrito} />} />
      <Route path="/checkout" element={<Checkout carrito={carrito} onConfirmar={guardarPedido} />} />
      <Route path="/pedidos" element={<Pedidos />} />
      <Route path="*" element={<Home productos={productos} estado={estado} esRespaldo={esRespaldo} carrito={carrito} carritoAbierto={carritoAbierto} setCarritoAbierto={setCarritoAbierto} onAgregar={agregarAlCarrito} onQuitar={quitarDelCarrito} onVaciar={vaciarCarrito} onReintentar={() => setIntento((actual) => actual + 1)} />} />
    </Routes>
  );
}
