import React from "react";
import { FlatList, Modal, Text, View } from "react-native";
import { useUserStore } from "../store/store";
import CustomButton from "./CustomButton";
import CustomIcon from "./CustomIcon";

type FiltrosModalProps = {
  visible: boolean;
  onClose: () => void;
  filtros: any;
  setFiltros: (fn: any) => void;
};

export default function FiltrosModal({
  visible,
  onClose,
  filtros,
  setFiltros,
}: FiltrosModalProps) {
  const { tallas, marcas, modelos, colors } = useUserStore();
  const categorias = [
    { key: "tallas", title: "Tallas", data: tallas },
    { key: "marcas", title: "Marcas", data: marcas },
    { key: "modelos", title: "Modelos", data: modelos },
    { key: "colores", title: "Colores", data: colors },
  ];

  const limpiarFiltros = () => {
    setFiltros({
      tallas: [],
      marcas: [],
      modelos: [],
      colores: [],
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/40 justify-end">
        <View className="bg-white rounded-t-3xl p-6 max-h-[85%] shadow-xl">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-extrabold">Filtros</Text>

            <CustomButton
              className="bg-gray-100 border-gray-300"
              onPress={onClose}
              iconLeft={<CustomIcon name="X" />}
            />
          </View>

          <FlatList
            data={categorias}
            keyExtractor={(item) => item.key}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
            renderItem={({ item }) => (
              <View className="mb-6">
                <Text className="font-semibold text-lg mb-3 text-gray-800">
                  {item.title}
                </Text>

                <View className="flex-row flex-wrap gap-2">
                  {item.data.map((x: any) => {
                    const id = x.id;

                    const nombre =
                      x.NombreTalla ||
                      x.NombreMarca ||
                      x.NombreModelo ||
                      x.NombreColor;

                    const categoria = item.key;
                    const isSelected = filtros[categoria].includes(id);

                    return (
                      <CustomButton
                        key={id}
                        onPress={() => {
                          setFiltros((prev: any) => {
                            const current = prev[categoria];
                            const updated = current.includes(id)
                              ? current.filter((v: number) => v !== id)
                              : [...current, id];
                            return { ...prev, [categoria]: updated };
                          });
                        }}
                        className={`px-4 py-2 rounded-full border
                          ${
                            isSelected
                              ? "bg-black border-black"
                              : "bg-gray-100 border-gray-300"
                          }`}
                        title={nombre}
                        classNameText={isSelected ? "text-white" : "text-black"}
                      ></CustomButton>
                    );
                  })}
                </View>
              </View>
            )}
          />
          <View className="flex-row justify-between mt-4 gap-3">
            <CustomButton
              title="Limpiar"
              onPress={limpiarFiltros}
              className="flex-1 bg-gray-600 gap-2"
              iconLeft={<CustomIcon name="Eraser" />}
            />

            <CustomButton
              title="Aplicar"
              onPress={onClose}
              className="flex-1 bg-black gap-2"
              iconRight={<CustomIcon name="Check" color="white" />}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
