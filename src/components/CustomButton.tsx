import { Pressable, PressableProps, Text } from "react-native";

type CustomButtonProps = PressableProps & {
  className?: string;
  classNameText?: string;
  title?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

export default function CustomButton({
  className,
  classNameText,
  title,
  iconLeft,
  iconRight,
  ...props
}: CustomButtonProps) {
  return (
    <Pressable
      className={`flex-row px-4 py-3 items-center justify-center rounded-2xl shadow-sm shadow-black bg-blue-600 active:opacity-70 ${className}`}
      {...props}
    >
      {iconLeft && iconLeft}
      <Text className={`font-semibold text-base text-white ${classNameText}`}>
        {title}
      </Text>
      {iconRight && iconRight}
    </Pressable>
  );
}
