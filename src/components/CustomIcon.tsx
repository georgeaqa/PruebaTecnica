import { icons, LucideProps } from "lucide-react-native";

type IconProps = LucideProps & {
  name: keyof typeof icons;
  color?: string;
  size?: number;
  strokeWidth?: number;
};

export default function CustomIcon({
  name,
  color = "#000",
  size = 24,
  strokeWidth = 2,
  ...props
}: IconProps) {
  const LucideIcon = icons[name];

  return (
    <LucideIcon
      color={color}
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
}