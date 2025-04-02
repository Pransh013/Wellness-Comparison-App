import { ButtonProps } from "@/types";
import { TouchableOpacity, Text } from "react-native";

const Button = ({ title, onPress, className }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      className={`bg-button-bg shadow-md shadow-zinc-300 rounded-lg py-4 mt-5 ${className}`}
    >
      <Text className="text-lg text-white text-center font-rubik-medium">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
