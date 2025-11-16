import { Image } from "expo-image";
import React from "react";
import { Pressable, PressableProps, Text, View } from "react-native";
import { getProductoImage } from "../services/productoService";
import { useUserStore } from "../store/store";
import { Producto } from "../types/type";
import CustomButton from "./CustomButton";
import CustomIcon from "./CustomIcon";

type CustomProductoListProps = PressableProps & {
  producto: Producto;
  onEdit?: (producto: Producto) => void;
};

export default function CustomProductoList({
  producto,
  ...props
}: CustomProductoListProps) {
  const image = getProductoImage(producto.id);
  const { tallas, marcas, modelos, colors, user, deleteProducto } =
    useUserStore();

  const color = colors.find((c) => c.id === producto.idcolor)?.NombreColor;
  const modelo = modelos.find((m) => m.id === producto.idmodelo)?.NombreModelo;
  const talla = tallas.find((t) => t.id === producto.idtalla)?.NombreTalla;
  const marca = marcas.find((m) => m.id === producto.idmarca)?.NombreMarca;

  return (
    <Pressable
      className="bg-white rounded-2xl p-3 shadow-md border border-gray-200"
      {...props}
    >
      <View className="w-full h-40 items-center justify-center mb-2 relative">
        <Image
          source={{ uri: image }}
          style={{
            width: "100%",
            height: "100%",
          }}
          contentFit="contain"
        />
        {user.type === "admin" ? (
          <View className="absolute top-2 right-2 flex flex-row gap-2">
            <CustomButton
              className="  bg-green-500 w-9 h-9 rounded-full justify-center items-center shadow-md p-0"
              iconLeft={<CustomIcon name="Pen" color="white" />}
              onPress={() => props.onEdit?.(producto)}
            />
            <CustomButton
              className=" bg-red-500 w-9 h-9 rounded-full justify-center items-center shadow-md p-0"
              iconLeft={<CustomIcon name="Trash2" color="white" />}
              onPress={() => deleteProducto(producto.id)}
            />
          </View>
        ) : null}
      </View>

      <Text className="font-bold text-base mb-1" numberOfLines={2}>
        {producto.NombreProducto}
      </Text>

      <Text className="font-semibold text-lg text-blue-600 mb-2">
        S/{producto.precio.toFixed(2)}
      </Text>
      <View className="flex-row flex-wrap gap-2">
        <View className="bg-gray-100 px-2 py-1 rounded-lg">
          <Text className="text-xs">Color: {color}</Text>
        </View>

        <View className="bg-gray-100 px-2 py-1 rounded-lg">
          <Text className="text-xs">Talla: {talla}</Text>
        </View>
        <View className="bg-gray-100 px-2 py-1 rounded-lg">
          <Text className="text-xs">Modelo: {modelo}</Text>
        </View>
        <View className="bg-gray-100 px-2 py-1 rounded-lg">
          <Text className="text-xs">Marca: {marca}</Text>
        </View>
      </View>
    </Pressable>
  );
}
