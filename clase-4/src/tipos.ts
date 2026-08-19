

export interface Producto {
    id : number;
    nombre : string;
    marca : string;
    precio : number;
    imagen : string;
    stock : number;
     categoria : string;
     rating?: number;
}

export type EstadoCarga = 'cargando' | 'listo' | 'error';

export interface ItemCarrito {
    id: number;
    nombre : string;
    precio: number;
    cantidad: number; 
}

