import { FormInputProps } from "@/types";
import { TextInput, View, Text } from "react-native";

const FormInput = ({
  label,
  placeholder,
  value,
  onChange,
  keyboardType = "default",
}: FormInputProps) => {
  return (
    <View className="mt-2">
      <Text className="text-primary mb-1 text-sm font-rubik">{label}</Text>
      <TextInput
        className="border border-primary rounded-md p-3 text-primary"
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default FormInput;
