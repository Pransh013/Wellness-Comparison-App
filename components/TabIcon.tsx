import { Text, View } from "react-native";
import Icon from "@/components/Icon";
import { icons } from "lucide-react-native";

export const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: keyof typeof icons;
  title: string;
}) => (
  <View className="flex-1 mt-3 flex flex-col items-center">
    <Icon name={icon} color={focused ? "#0061FF" : "#666876"} size={24} />
    <Text
      className={`${
        focused
          ? "text-primary-300 font-rubik-medium"
          : "text-black-200 font-rubik"
      } text-xs w-full text-center mt-1`}
    >
      {title}
    </Text>
  </View>
);
