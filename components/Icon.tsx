import { icons } from "lucide-react-native";

interface IconProps {
  name: keyof typeof icons;
  color?: string;
    size?: number;
    strokeWidth?: number;
}

const Icon = ({ name, color = "black", size = 24, strokeWidth = 1.5 }: IconProps) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    return null;
  }

  return <LucideIcon color={color} size={size} strokeWidth={strokeWidth} />;
};

export default Icon;
