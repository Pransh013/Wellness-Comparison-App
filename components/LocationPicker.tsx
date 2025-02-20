import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface LocationPickerProps {
  location: { city: string; state: string; country: string };
  onLocationChange: (key: string, value: string) => void;
}

const LocationPicker = ({
  location,
  onLocationChange,
}: LocationPickerProps) => {
  return (
    <View>
      <Text className="text-primary mt-2 text-sm font-rubik">Location</Text>
      <View className="w-full flex-row flex-wrap justify-between">
        <View className="w-[48%] border border-gray rounded-md">
          <Picker
            selectedValue={location.city}
            onValueChange={(value) => onLocationChange("city", value)}
          >
            <Picker.Item label="Select City" value="" />
            <Picker.Item label="New York" value="New York" />
            <Picker.Item label="Los Angeles" value="Los Angeles" />
            <Picker.Item label="Chicago" value="Chicago" />
          </Picker>
        </View>

        <View className="w-[48%] border border-primary rounded-md">
          <Picker
            selectedValue={location.state}
            onValueChange={(value) => onLocationChange("state", value)}
          >
            <Picker.Item label="Select State" value="" />
            <Picker.Item label="California" value="California" />
            <Picker.Item label="Texas" value="Texas" />
            <Picker.Item label="Florida" value="Florida" />
          </Picker>
        </View>

        <View className="w-full mt-4 border border-primary rounded-md">
          <Picker
            selectedValue={location.country}
            onValueChange={(value) => onLocationChange("country", value)}
          >
            <Picker.Item label="Select Country" value="" />
            <Picker.Item label="USA" value="USA" />
            <Picker.Item label="Canada" value="Canada" />
            <Picker.Item label="India" value="India" />
          </Picker>
        </View>
      </View>
    </View>
  );
};

export default LocationPicker;
