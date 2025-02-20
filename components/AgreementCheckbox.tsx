import { View, Text, TouchableOpacity } from "react-native";

interface AgreementCheckboxProps {
  agreed: boolean;
  onToggle: () => void;
}

const AgreementCheckbox = ({ agreed, onToggle }: AgreementCheckboxProps) => {
  return (
    <View className="flex-row items-center mt-4">
      <TouchableOpacity onPress={onToggle}>
        <View
          className={`w-6 h-6 border rounded-md flex items-center justify-center ${
            agreed ? "bg-button-bg border-gray" : "bg-white border-gray"
          }`}
        >
          {agreed && <Text className="text-white">✓</Text>}
        </View>
      </TouchableOpacity>
      <Text className="text-gray ml-2 font-rubik">
        I agree to{" "}
        <Text className="text-button-bg font-semibold font-rubik">
          Terms and Conditions
        </Text>
      </Text>
    </View>
  );
};

export default AgreementCheckbox;
