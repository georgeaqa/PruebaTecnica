import { CustomIcon } from "@/src/components";
import { useUserStore } from "@/src/store/store";
import { useSession } from "@clerk/clerk-expo";
import { Tabs } from "expo-router";
import { useEffect } from "react";
export default function TabsLayout() {
  const { session } = useSession();
  const {
    getProductos,
    getUser,
    getColors,
    getMarcas,
    getModelos,
    getTallas,
    productos,
  } = useUserStore();

  useEffect(() => {
    getColors();
    getMarcas();
    getModelos();
    getTallas();
  }, []);

  useEffect(() => {
    getProductos();
  }, [productos]);

  useEffect(() => {
    if (session?.user?.id) {
      getUser(session.user.id);
    }
  }, [session]);

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => <CustomIcon name="House" color={color} />,
        }}
      />

      <Tabs.Screen
        name="(settings)"
        options={{
          title: "Opciones",
          tabBarIcon: ({ color }) => (
            <CustomIcon name="Settings" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
