import {
  CustomButton,
  CustomIcon,
  CustomModalEditarProducto,
  CustomModalFiltros,
  CustomModalProducto,
  CustomProductoList,
  CustomScreenWrapper,
  CustomTextInput,
} from "@/src/components";

import { useUserStore } from "@/src/store/store";
import { Producto } from "@/src/types/type";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function Home() {
  const [buscarProducto, setBuscarProducto] = useState<string>("");
  const [filtros, setFiltros] = useState({
    tallas: [] as number[],
    marcas: [] as number[],
    modelos: [] as number[],
    colores: [] as number[],
  });
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);
  const [modalFiltrosVisible, setModalFiltrosVisible] = useState(false);
  const [productoEditar, setProductoEditar] = useState<Producto | null>(null);
  const { productos, startProductosRealtime, stopProductosRealtime } =
    useUserStore();

  useEffect(() => {
    startProductosRealtime();

    return () => stopProductosRealtime();
  }, []);

  const renderProducto = ({ item }: { item: Producto }) => {
    return (
      <CustomProductoList
        producto={item}
        onPress={() => setProductoSeleccionado(item)}
        onEdit={(prod) => setProductoEditar(prod)}
      />
    );
  };

  const productosFiltrados = productos.filter((p: Producto) => {
    const matchTexto = p.NombreProducto.toLowerCase().includes(
      buscarProducto.toLowerCase()
    );

    const matchTallas =
      filtros.tallas.length > 0 ? filtros.tallas.includes(p.idtalla) : true;

    const matchMarcas =
      filtros.marcas.length > 0 ? filtros.marcas.includes(p.idmarca) : true;

    const matchModelos =
      filtros.modelos.length > 0 ? filtros.modelos.includes(p.idmodelo) : true;

    const matchColores =
      filtros.colores.length > 0 ? filtros.colores.includes(p.idcolor) : true;

    return (
      matchTexto && matchTallas && matchMarcas && matchModelos && matchColores
    );
  });

  return (
    <CustomScreenWrapper className="gap-2">
      <View className="gap-2">
        <CustomTextInput
          value={buscarProducto}
          onChangeText={(text: string) => setBuscarProducto(text)}
          iconLeft={<CustomIcon name="Search" />}
        />
        <CustomButton
          title="Filtros"
          className="gap-2"
          iconLeft={<CustomIcon name="SlidersHorizontal" color="white" />}
          onPress={() => setModalFiltrosVisible(true)}
        />

        <CustomModalFiltros
          visible={modalFiltrosVisible}
          onClose={() => setModalFiltrosVisible(false)}
          filtros={filtros}
          setFiltros={setFiltros}
        />
      </View>

      {productosFiltrados.length === 0 ? (
        <Text className="text-center text-3xl text-black">
          Producto no encontrado
        </Text>
      ) : (
        <FlatList
          data={productosFiltrados}
          renderItem={renderProducto}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          contentContainerClassName="gap-2 flex-grow"
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
        />
      )}

      {productoSeleccionado && (
        <CustomModalProducto
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
        />
      )}

      {productoEditar && (
        <CustomModalEditarProducto
          producto={productoEditar}
          visible={!!productoEditar}
          onClose={() => setProductoEditar(null)}
        />
      )}
    </CustomScreenWrapper>
  );
}
