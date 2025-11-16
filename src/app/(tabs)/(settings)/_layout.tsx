import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="settings"
        options={{
          title: "Opciones",
        }}
      />
      <Stack.Screen
        name="addProduct"
        options={{
          title: "Agregar Producto",
        }}
      />
    </Stack>
  );
}
