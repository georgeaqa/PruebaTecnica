import { Image } from "expo-image";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import React from "react";
import { Modal, Text, View } from "react-native";
import { getProductoImage } from "../services/productoService";
import { useUserStore } from "../store/store";
import { Producto } from "../types/type";
import CustomButton from "./CustomButton";
import CustomIcon from "./CustomIcon";
interface CustomModalProductoProps {
  producto: Producto;
  onClose: () => void;
}

export default function ProductoModal({
  producto,
  onClose,
}: CustomModalProductoProps) {
  const image = getProductoImage(producto.id);
  const { tallas, marcas, modelos, colors } = useUserStore();

  const color = colors.find((c) => c.id === producto.idcolor)?.NombreColor;
  const modelo = modelos.find((m) => m.id === producto.idmodelo)?.NombreModelo;
  const talla = tallas.find((t) => t.id === producto.idtalla)?.NombreTalla;
  const marca = marcas.find((m) => m.id === producto.idmarca)?.NombreMarca;

  const exportToPDF = async () => {
    try {
      const html = `
      <html>
        <body style="font-family: Arial; padding: 20px;">
          <h1>${producto.NombreProducto}</h1>
          <img src="${image}" style="width: 250px; height: auto; margin-bottom: 20px;" />
          
          <h2>Precio: S/${producto.precio.toFixed(2)}</h2>

          <p><strong>Color:</strong> ${color}</p>
          <p><strong>Talla:</strong> ${talla}</p>
          <p><strong>Modelo:</strong> ${modelo}</p>
          <p><strong>Marca:</strong> ${marca}</p>
        </body>
      </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.log("Error al generar PDF:", error);
    }
  };

  return (
    <Modal animationType="slide" transparent>
      <View className="flex-1 bg-black/40 justify-end">
        <View className="bg-white rounded-t-3xl p-5 shadow-xl">
          <View className="items-center mb-3">
            <View className="w-16 h-1.5 bg-gray-300 rounded-full" />
          </View>

          <View className="w-full h-56 items-center justify-center">
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: "100%" }}
              contentFit="contain"
            />
          </View>

          <Text className="font-bold text-xl mt-3">
            {producto.NombreProducto}
          </Text>

          <Text className="font-bold text-2xl text-blue-600 mt-1">
            S/{producto.precio.toFixed(2)}
          </Text>

          <View className="flex-row flex-wrap gap-2 mt-3">
            <View className="bg-gray-100 px-3 py-1 rounded-xl">
              <Text>Color: {color}</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-xl">
              <Text>Talla: {talla}</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-xl">
              <Text>Modelo: {modelo}</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-xl">
              <Text>Marca: {marca}</Text>
            </View>
          </View>

          <CustomButton
            className="mt-5 bg-blue-600 gap-2"
            title="Exportar a PDF"
            onPress={exportToPDF}
            iconLeft={<CustomIcon name="FileText" color="white" />}
          />

          <CustomButton
            className="bg-gray-100 border-gray-300 absolute top-5 right-5"
            onPress={onClose}
            iconLeft={<CustomIcon name="X" />}
          />
        </View>
      </View>
    </Modal>
  );
}
