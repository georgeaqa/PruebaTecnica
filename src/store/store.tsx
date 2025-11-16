import { create } from "zustand";
import { get_user } from "../services/authService";
import {
  add_producto,
  delete_producto,
  get_colors,
  get_marcas,
  get_modelos,
  get_productos,
  get_real_time_changes_productos,
  get_tallas,
  update_producto,
} from "../services/productoService";
import { Color, Marca, Modelo, Producto, Talla, User } from "../types/type";

interface UserState {
  loading: boolean;
  user: User;
  getUser: (id: string) => Promise<any>;

  productos: Producto[];
  getProductos: () => Promise<any>;
  addProducto: (producto: Omit<Producto, "id" | "created_at">) => Promise<any>;
  updateProducto: (producto: Producto) => Promise<any>;
  deleteProducto: (id: number) => Promise<any>;

  marcas: Marca[];
  getMarcas: () => Promise<any>;

  modelos: Modelo[];
  getModelos: () => Promise<any>;

  tallas: Talla[];
  getTallas: () => Promise<any>;

  colors: Color[];
  getColors: () => Promise<any>;

  realtimeChannel: any;
  startProductosRealtime: () => void;
  stopProductosRealtime: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  loading: false,
  realtimeChannel: null,

  //usuario
  user: {
    id: 0,
    created_at: "",
    username: "",
    type: "",
  },
  getUser: async (id: string) => {
    set({ loading: true });
    try {
      const user = await get_user(id);
      set({ user });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  //Productos
  productos: [],
  getProductos: async () => {
    try {
      const productos = await get_productos();
      set({ productos });
    } catch (error) {
      console.log(error);
    }
  },
  addProducto: async (p) => {
    try {
      await add_producto(p);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateProducto: async (p) => {
    try {
      await update_producto(p);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteProducto: async (id) => {
    try {
      await delete_producto(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  startProductosRealtime: () => {
    if (get().realtimeChannel) return;

    const { channel } = get_real_time_changes_productos((payload) => {
      const { eventType, new: newItem, old: oldItem } = payload;
      const productos = get().productos;

      if (eventType === "INSERT") {
        set({ productos: [...productos, newItem] });
      }

      if (eventType === "UPDATE") {
        set({
          productos: productos.map((p) => (p.id === newItem.id ? newItem : p)),
        });
      }

      if (eventType === "DELETE") {
        set({
          productos: productos.filter((p) => p.id !== oldItem.id),
        });
      }
    });

    set({ realtimeChannel: channel });
  },

  stopProductosRealtime: () => {
    const ch = get().realtimeChannel;
    if (ch) ch.unsubscribe();
    set({ realtimeChannel: null });
  },

  //Marcas
  marcas: [],
  getMarcas: async () => {
    try {
      const marcas = await get_marcas();
      set({ marcas });
    } catch (error) {
      console.log(error);
    }
  },

  //Modelos
  modelos: [],
  getModelos: async () => {
    try {
      const modelos = await get_modelos();
      set({ modelos });
    } catch (error) {
      console.log(error);
    }
  },

  //Tallas
  tallas: [],
  getTallas: async () => {
    try {
      const tallas = await get_tallas();
      set({ tallas });
    } catch (error) {
      console.log(error);
    }
  },

  //Colores
  colors: [],
  getColors: async () => {
    try {
      const colors = await get_colors();
      set({ colors });
    } catch (error) {
      console.log(error);
    }
  },
}));
