

export interface Producto {
    id : number;
    nombre : string;
    marca : string;
    precio : number;
    imagen : string;
    stock : number;
     categoria : string;
       descripcion?: string;
     rating?: number;
}

export type EstadoCarga = 'cargando' | 'listo' | 'error';

export interface ItemCarrito {
    id: number;
    nombre : string;
    precio: number;
    cantidad: number; 
}

export interface Pedido {
  id: string;
  fecha: string;
  items: ItemCarrito[];
  total: number;
  estado: 'recibido' | 'preparando' | 'enviado';
}

