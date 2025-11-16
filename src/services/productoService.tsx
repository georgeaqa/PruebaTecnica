import { supabase } from "../lib/supabase";
import { Producto } from "../types/type";
export async function get_productos() {
  try {
    const { data, error } = await supabase
      .from("producto")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      throw new Error(error.message);
    } else {
      return data;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function get_tallas() {
  try {
    const { data, error } = await supabase.from("talla").select("*");

    if (error) {
      throw new Error(error.message);
    } else {
      return data;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}
export async function get_colors() {
  try {
    const { data, error } = await supabase.from("color").select("*");

    if (error) {
      throw new Error(error.message);
    } else {
      return data;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}
export async function get_marcas() {
  try {
    const { data, error } = await supabase.from("marca").select("*");

    if (error) {
      throw new Error(error.message);
    } else {
      return data;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function get_modelos() {
  try {
    const { data, error } = await supabase.from("modelo").select("*");

    if (error) {
      throw new Error(error.message);
    } else {
      return data;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function getProductoImage(id: number) {
  try {
    const data = supabase.storage
      .from("producto")
      .getPublicUrl(`${id.toString()}.webp`).data;
    return data.publicUrl;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function add_producto(
  producto: Omit<Producto, "id" | "created_at">
) {
  try {
    const { data, error } = await supabase
      .from("producto")
      .insert(producto)
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function update_producto(producto: Producto) {
  try {
    const { error } = await supabase
      .from("producto")
      .update(producto)
      .eq("id", producto.id);
    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function delete_producto(id: number) {
  try {
    const { error } = await supabase.from("producto").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export function get_real_time_changes_productos(
  onChange: (payload: any) => void
) {
  const channel = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "producto" },
      (payload) => {
        onChange(payload);
      }
    )
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "producto" },
      (payload) => {
        onChange(payload);
      }
    )
    .on(
      "postgres_changes",
      { event: "DELETE", schema: "public", table: "producto" },
      (payload) => {
        onChange(payload);
      }
    )
    .subscribe();

  return {
    channel,
    unsubscribe: () => {
      channel.unsubscribe();
    },
  };
}
