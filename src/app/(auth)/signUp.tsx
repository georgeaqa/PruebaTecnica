import {
  CustomButton,
  CustomIcon,
  CustomScreenWrapper,
  CustomTextInput,
} from "@/src/components";
import { useSignUp } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(true);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        username,
        password,
      });

      await setActive({ session: signUp.createdSessionId });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1">
      <CustomScreenWrapper>
        <View className="flex-1 items-center justify-center gap-5">
          <Text className="font-bold text-8xl text-center">Crear Cuenta</Text>
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
            onPress={onSignUpPress}
            title="Continuar"
            className="w-full"
          />
          <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
            <Text>¿Ya tienes cuenta?</Text>
            <Link href="/" replace>
              <Text className="text-blue-600">Iniciar sesión</Text>
            </Link>
          </View>
        </View>
      </CustomScreenWrapper>
    </KeyboardAvoidingView>
  );
}
