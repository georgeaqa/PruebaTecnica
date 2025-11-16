import {
  CustomButton,
  CustomIcon,
  CustomScreenWrapper,
  CustomTextInput,
} from "@/src/components";
import { useSignIn } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";

export default function Index() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(true);

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: username,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1">
      <CustomScreenWrapper>
        <View className="flex-1 items-center justify-center gap-5">
          <Text className="font-bold text-8xl text-center">Prueba Tecnica</Text>
          <CustomTextInput
            autoCapitalize="none"
            value={username}
            placeholder="Ingresar nombre de usuario"
            onChangeText={(username) => setUsername(username)}
            iconLeft={<CustomIcon name="User" />}
          />
          <CustomTextInput
            value={password}
            placeholder="Ingresar Contraseña"
            secureTextEntry={visible}
            onChangeText={(password) => setPassword(password)}
            iconLeft={<CustomIcon name="Lock" />}
            iconRight={
              <CustomIcon
                name={visible ? "EyeClosed" : "Eye"}
                onPress={() => setVisible(!visible)}
              />
            }
          />
          <CustomButton
            className={"w-full"}
            onPress={onSignInPress}
            title="Iniciar Sesión"
          />

          <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
            <Text className="">¿No tienes cuenta?</Text>
            <Link href="/signUp" replace>
              <Text className="text-blue-600">Crear Cuenta</Text>
            </Link>
          </View>
        </View>
      </CustomScreenWrapper>
    </KeyboardAvoidingView>
  );
}
