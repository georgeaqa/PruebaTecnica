import { supabase } from "../lib/supabase";

export async function get_user(id: string) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw new Error(error.message);
    } else {
      return data;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}
