export interface Producto {
  id: number;
  created_at: string;
  NombreProducto: string;
  idmodelo: number;
  idcolor: number;
  idmarca: number;
  idtalla: number;
  precio: number;
}

export interface Talla {
  id: number;
  created_at: string;
  NombreTalla: string;
}

export interface Marca {
  id: number;
  created_at: string;
  NombreMarca: string;
}

export interface Modelo {
  id: number;
  created_at: string;
  NombreModelo: string;
}

export interface Color {
  id: number;
  created_at: string;
  NombreColor: string;
}

export interface User {
  id: number;
  created_at: string;
  username: string;
  type: string;
}
