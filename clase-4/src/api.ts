import type { Producto } from "./tipos";
import {productos as respaldo} from './datos';

const BASE  = 'https://dummyjson.com';


interface ProductoAPI { 
    id : number;
    title : string; 
    brand? : string;
    price: number;
    thumbnail : string;
    category?: string;
    stock?: number;
    rating?: number;
}


function mapearProducto(productoCrudo : ProductoAPI) : Producto {
     const catAPI = (productoCrudo.category ?? '').toLowerCase();

  let categoriaNormalizada = 'otros';

 if (catAPI.includes('laptop')) {
    categoriaNormalizada = 'laptops';
} else if (catAPI.includes('watch')) {
    categoriaNormalizada = 'relojes';
} else if (
    catAPI.includes('audio') ||
    catAPI.includes('headphone') ||
    catAPI.includes('mobile-accessories')
) {
    categoriaNormalizada = 'audio';
}
    return {
        id: productoCrudo.id,
        nombre : productoCrudo.title,
        marca : productoCrudo.brand ?? '',
        precio : productoCrudo.price,
        imagen : productoCrudo.thumbnail,
       categoria: categoriaNormalizada,
        stock : productoCrudo.stock ?? 0,
        rating: productoCrudo.rating ?? 0
    }
}


export async function obtenerProductos(
  signal?: AbortSignal
): Promise<{ productos: Producto[]; esRespaldo: boolean }> {
  try {
    const r = await fetch(`${BASE}/products?limit=100`, { signal });

    const data = (await r.json()) as { products: ProductoAPI[] };

    const productos = data.products
      .map(mapearProducto)
      .filter(
        producto =>
          producto.categoria === 'laptops' ||
          producto.categoria === 'audio' ||
          producto.categoria === 'relojes'
      );

    return {
      productos,
      esRespaldo: false
    };
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      throw error;
    }

    console.warn(
      'API no disponible, usando el catalogo de semilla: ',
      error instanceof Error ? error.message : error
    );

    return {
      productos: respaldo,
      esRespaldo: true
    };
  }
}