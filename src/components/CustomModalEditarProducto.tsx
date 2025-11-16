import { useState } from "react";
import { Alert, Modal, ScrollView, Text, View } from "react-native";
import { useUserStore } from "../store/store";
import CustomButton from "./CustomButton";
import CustomTextInput from "./CustomTextInput";

interface CustomModalEditarProductoProps {
  producto: any;
  visible: boolean;
  onClose: () => void;
}

export default function CustomModalEditarProducto({
  producto,
  visible,
  onClose,
}: CustomModalEditarProductoProps) {
  const { marcas, modelos, tallas, colors, updateProducto } = useUserStore();
  const [NombreProducto, setNombreProducto] = useState(producto.NombreProducto);
  const [precio, setPrecio] = useState(producto.precio.toString());
  const [idmarca, setIdMarca] = useState(producto.idmarca);
  const [idmodelo, setIdModelo] = useState(producto.idmodelo);
  const [idtalla, setIdTalla] = useState(producto.idtalla);
  const [idcolor, setIdColor] = useState(producto.idcolor);
  const handleUpdate = () => {
    try {
      updateProducto({
        ...producto,
        NombreProducto: NombreProducto,
        idmarca: idmarca,
        idmodelo: idmodelo,
        idcolor: idcolor,
        idtalla: idtalla,
        precio: Number(precio),
      });
      Alert.alert("Éxito", "Producto actualizado correctamente");
      onClose();
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "No se pudo actualizar el producto");
    }
  };
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-center bg-black/50 p-5">
        <View className="bg-white rounded-xl p-5 max-h-[85%]">
          <ScrollView
            contentContainerClassName="gap-5"
            showsVerticalScrollIndicator={false}
          >
            <Text className="text-xl font-bold mb-2">Editar Producto</Text>

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

            <View className="flex-row justify-between mt-3">
              <CustomButton title="Cancelar" onPress={onClose} />
              <CustomButton title="Guardar" onPress={handleUpdate} />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
