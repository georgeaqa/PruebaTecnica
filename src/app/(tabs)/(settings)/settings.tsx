import {
  CustomButton,
  CustomImportExcelProductos,
  CustomScreenWrapper,
} from "@/src/components";
import { useUserStore } from "@/src/store/store";
import { useClerk } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function Settings() {
  const { user } = useUserStore();
  const { signOut } = useClerk();
  const handleSignOut = async () => {
    try {
      await signOut();
      Linking.openURL(Linking.createURL("/"));
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handleAddProduct = () => {
    router.push("/addProduct");
  };

  return (
    <CustomScreenWrapper>
      <View className="gap-2">
        {user.type === "admin" ? (
          <>
            <CustomButton onPress={handleAddProduct} title="Agregar Producto" />
            <CustomImportExcelProductos />
          </>
        ) : null}

        <CustomButton onPress={handleSignOut} title="Cerrar Session" />
      </View>
    </CustomScreenWrapper>
  );
}
