import { TouchableOpacity, Text } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const Button = ({ title, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      className="bg-button-bg shadow-md shadow-zinc-300 rounded-lg w-full py-4 mt-5"
    >
      <Text className="text-lg text-white text-center font-rubik-medium">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
