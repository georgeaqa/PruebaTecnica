import { TextInput, TextInputProps, View } from "react-native";

type CustomTextInputProps = TextInputProps & {
  className?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

export default function CustomTextInput({
  className,
  iconLeft,
  iconRight,
  ...props
}: CustomTextInputProps) {
  return (
    <View
      className={`flex-row items-center gap-2 px-3 py-2  border border-gray-300 rounded-2xl shadow-sm ${className}`}
    >
      {iconLeft && <View className="opacity-70">{iconLeft}</View>}
      <TextInput
        className="flex-1 text-base text-gray-800"
        placeholderTextColor="#A1A1AA"
        {...props}
      />
      {iconRight && <View className="opacity-70">{iconRight}</View>}
    </View>
  );
}
