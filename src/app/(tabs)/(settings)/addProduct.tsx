import { CustomButton, CustomTextInput } from "@/src/components";
import { useUserStore } from "@/src/store/store";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

export default function AddProduct() {
  const { loading, colors, modelos, marcas, tallas, addProducto } =
    useUserStore();
  const [NombreProducto, setNombreProducto] = useState("");
  const [precio, setPrecio] = useState("");
  const [idmarca, setIdMarca] = useState<number | null>(null);
  const [idmodelo, setIdModelo] = useState<number | null>(null);
  const [idcolor, setIdColor] = useState<number | null>(null);
  const [idtalla, setIdTalla] = useState<number | null>(null);

  const validar = () => {
    if (!NombreProducto.trim()) return "Ingresa el nombre del producto";
    if (!precio || isNaN(Number(precio))) return "El precio es inválido";
    if (!idmarca) return "Selecciona una marca";
    if (!idmodelo) return "Selecciona un modelo";
    if (!idcolor) return "Selecciona un color";
    if (!idtalla) return "Selecciona una talla";
    return null;
  };

  const handleSave = async () => {
    const error = validar();
    if (error) return Alert.alert("Error", error);

    try {
      await addProducto({
        NombreProducto,
        precio: Number(precio),
        idmarca: idmarca!,
        idmodelo: idmodelo!,
        idcolor: idcolor!,
        idtalla: idtalla!,
      });
      Alert.alert("Éxito", "Producto agregado correctamente");
      router.back();
    } catch (err) {
      Alert.alert("Error", "No se pudo agregar el producto");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>Agregar Producto</Text>

      <View>
        <Text style={{ fontWeight: "bold" }}>Nombre del Producto</Text>
        <CustomTextInput
          value={NombreProducto}
          onChangeText={setNombreProducto}
          placeholder="Ej: Zapatillas deportivas"
        />
      </View>

      <View>
        <Text style={{ fontWeight: "bold" }}>Precio (S/)</Text>
        <CustomTextInput
          value={precio}
          onChangeText={setPrecio}
          placeholder="Ej: 150"
          keyboardType="numeric"
        />
      </View>

      <View>
        <Text style={{ fontWeight: "bold" }}>Marca</Text>
        {marcas.map((m) => (
          <Text
            key={m.id}
            onPress={() => setIdMarca(m.id)}
            style={{
              padding: 10,
              backgroundColor: idmarca === m.id ? "#b3d9ff" : "#eee",
              marginTop: 4,
              borderRadius: 8,
            }}
          >
            {m.NombreMarca}
          </Text>
        ))}
      </View>

      <View>
        <Text style={{ fontWeight: "bold" }}>Modelo</Text>
        {modelos.map((m) => (
          <Text
            key={m.id}
            onPress={() => setIdModelo(m.id)}
            style={{
              padding: 10,
              backgroundColor: idmodelo === m.id ? "#b3d9ff" : "#eee",
              marginTop: 4,
              borderRadius: 8,
            }}
          >
            {m.NombreModelo}
          </Text>
        ))}
      </View>

      <View>
        <Text style={{ fontWeight: "bold" }}>Color</Text>
        {colors.map((c) => (
          <Text
            key={c.id}
            onPress={() => setIdColor(c.id)}
            style={{
              padding: 10,
              backgroundColor: idcolor === c.id ? "#b3d9ff" : "#eee",
              marginTop: 4,
              borderRadius: 8,
            }}
          >
            {c.NombreColor}
          </Text>
        ))}
      </View>

      <View>
        <Text style={{ fontWeight: "bold" }}>Talla</Text>
        {tallas.map((t) => (
          <Text
            key={t.id}
            onPress={() => setIdTalla(t.id)}
            style={{
              padding: 10,
              backgroundColor: idtalla === t.id ? "#b3d9ff" : "#eee",
              marginTop: 4,
              borderRadius: 8,
            }}
          >
            {t.NombreTalla}
          </Text>
        ))}
      </View>

      <CustomButton
        title={loading ? "Guardando..." : "Guardar Producto"}
        onPress={handleSave}
      />
    </ScrollView>
  );
}
