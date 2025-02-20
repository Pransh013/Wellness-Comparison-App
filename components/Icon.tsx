import { IconProps } from "@/types";
import { icons } from "lucide-react-native";

const Icon = ({
  name,
  color = "black",
  size = 24,
  strokeWidth = 2,
}: IconProps) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    return null;
  }

  return <LucideIcon color={color} size={size} strokeWidth={strokeWidth} />;
};

export default Icon;
