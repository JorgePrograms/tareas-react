import type { Producto } from "./tipos";
import { productos as respaldo } from "./datos";

const BASE = "https://dummyjson.com";

interface ProductoAPI {
  id: number;
  title: string;
  brand?: string;
  price: number;
  thumbnail: string;
  category?: string;
  stock?: number;
  description?: string;
  rating?: number;
}

function clasificarTecnologia(producto: ProductoAPI): Producto["categoria"] | null {
  const categoria = (producto.category ?? "").toLowerCase();
  const titulo = producto.title.toLowerCase();

  // Laptops
  if (categoria === "laptops") {
    return "laptops";
  }

  // Relojes
  if (
    categoria === "mens-watches" ||
    categoria === "womens-watches" ||
    categoria === "watches" ||
    titulo.includes("watch") ||
    titulo.includes("reloj")
  ) {
    return "relojes";
  }

  // Audio: dentro de mobile-accessories solo dejamos productos
  // que realmente sean de audio.
  const palabrasAudio = [
    "airpod",
    "earbud",
    "headphone",
    "headset",
    "earphone",
    "speaker",
    "soundbar",
    "audio",
    "audífono",
    "audifono",
    "auricular",
  ];

  if (
    categoria === "audio" ||
    (categoria === "mobile-accessories" &&
      palabrasAudio.some((palabra) => titulo.includes(palabra)))
  ) {
    return "audio";
  }

  // Todo lo demás (maquillaje, perfumes, alimentos, decoración, etc.)
  // queda fuera del catálogo tecnológico.
  return null;
}

function mapearProducto(productoCrudo: ProductoAPI): Producto | null {
  const categoria = clasificarTecnologia(productoCrudo);

  if (!categoria) {
    return null;
  }

  return {
    id: productoCrudo.id,
    nombre: productoCrudo.title,
    marca: productoCrudo.brand ?? "",
    precio: productoCrudo.price,
    imagen: productoCrudo.thumbnail,
    categoria,
    stock: productoCrudo.stock ?? 0,
    descripcion: productoCrudo.description ?? "",
    rating: productoCrudo.rating,
  };
}

export async function obtenerProductos(
  signal?: AbortSignal,
): Promise<{ productos: Producto[]; esRespaldo: boolean }> {
  try {
    // Pedimos más productos para poder filtrar la API y quedarnos
    // únicamente con tecnología.
    const r = await fetch(`${BASE}/products?limit=100`, { signal });

    if (!r.ok) {
      throw new Error(`HTTP ${r.status}`);
    }

    const data = (await r.json()) as { products: ProductoAPI[] };

    const productosTecnologia = data.products
      .map(mapearProducto)
      .filter((producto): producto is Producto => producto !== null);

    return {
      productos: productosTecnologia,
      esRespaldo: false,
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }

    console.warn(
      "API no disponible, usando el catálogo de tecnología de respaldo:",
      error instanceof Error ? error.message : error,
    );

    return {
      productos: respaldo,
      esRespaldo: true,
    };
  }
}