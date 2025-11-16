import { useUserStore } from "@/src/store/store";
import { Producto } from "@/src/types/type";
import * as DocumentPicker from "expo-document-picker";
import React from "react";
import { Alert } from "react-native";
import * as XLSX from "xlsx";
import CustomButton from "./CustomButton";

export default function ImportExcelButton() {
  const { addProducto } = useUserStore();

  const handleImportExcel = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ],
      });

      if (result.canceled) return;

      const file = result.assets[0];

      const response = await fetch(file.uri);
      const buffer = await response.arrayBuffer();

      const workbook = XLSX.read(buffer, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(firstSheet);

      console.log("Excel importado:", data);

      Alert.alert(
        "Importación Completa",
        `Se detectaron ${data.length} filas.`
      );

      for (const p of data as Producto[]) {
        await addProducto({
          NombreProducto: p.NombreProducto,
          precio: Number(p.precio),
          idcolor: p.idcolor,
          idtalla: p.idtalla,
          idmodelo: p.idmodelo,
          idmarca: p.idmarca,
        });
      }

      Alert.alert("Listo", "Los productos fueron agregados.");
    } catch (error) {
      console.log("Error importando Excel:", error);
      Alert.alert("Error", "No se pudo importar el archivo.");
    }
  };

  return <CustomButton title="Importar Excel" onPress={handleImportExcel} />;
}
