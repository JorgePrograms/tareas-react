import type { Producto } from "./tipos";


export const productos: Producto[] = [
  { 
    id: 1, 
    nombre: 'Audífonos inalámbricos', 
    marca: 'TechSound', 
    precio: 249.9, 
    imagen: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/1.png', 
    stock: 12,
    descripcion: 'Audífonos con cancelación activa de ruido y hasta 24 horas de batería.'
  },
 
  { 
    id: 2, 
    nombre: 'Laptop ultradelgada 14"', 
    marca: 'Nova', 
    precio: 3499, 
    imagen: 'https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/1.png', 
    stock: 5 ,
    descripcion: 'Pantalla OLED de alta definición, procesador de última generación y peso ultraligero.'
  },

  { 
    id: 3, 
    nombre: 'Reloj inteligente', 
    marca: 'Clik', 
    precio: 499.9, 
    imagen: 'https://cdn.dummyjson.com/products/images/mens-watches/Brown%20Leather%20Belt%20Watch/1.png', 
    stock: 20 ,
    descripcion: 'Monitoreo de ritmo cardíaco, GPS integrado y batería de larga duración.'
  },

  { 
    id: 4, 
    nombre: 'Cámara Réflex Digital', 
    marca: 'Canon', 
    precio: 2899, 
    imagen: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/1.png', 
    stock: 8 ,
    descripcion: 'Sensor de 24.1 megapíxeles con grabación de video en resolución 4K profesional.'
  },
  { 
    id: 5, 
    nombre: 'Silla Gamer Ergonómica', 
    marca: 'DXRacer', 
    precio: 850, 
    imagen: 'https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/1.png', 
    stock: 15,
    descripcion: 'Diseño ergonómico con soporte lumbar ajustable y reposabrazos 4D.'
  },
  { 
    id: 6, 
    nombre: 'Teclado Mecánico RGB', 
    marca: 'Keychron', 
    precio: 320, 
    imagen: 'https://cdn.dummyjson.com/products/images/mens-watches/Brown%20Leather%20Belt%20Watch/1.png', 
    stock: 30,
    descripcion: 'Switches mecánicos táctiles con iluminación RGB personalizable y conexión Bluetooth.'
  },
  { 
    id: 7, 
    nombre: 'Monitor Gamer 27"', 
    marca: 'ASUS', 
    precio: 1199, 
    imagen: 'https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/1.png', 
    stock: 7,
    descripcion: 'Panel IPS con tasa de refresco de 144Hz y tiempo de respuesta súper rápido de 1ms.'
  },
  { 
    id: 8, 
    nombre: 'Smartphone Pro 256GB', 
    marca: 'Samsung', 
    precio: 4200, 
    imagen: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/1.png', 
    stock: 10,
    descripcion: 'Pantalla Dynamic AMOLED de 120Hz con sistema de triple cámara de nivel profesional.'
  }
];