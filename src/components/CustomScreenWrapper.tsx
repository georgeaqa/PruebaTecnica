import { View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type CustomScreenWrapperProps = ViewProps & {
  className?: string;
};

export default function CustomScreenWrapper({
  className,
  children,
}: CustomScreenWrapperProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={`flex-1 px-2 bg-white ${className}`}
      style={{ paddingTop: insets.top }}
    >
      {children}
    </View>
  );
}
