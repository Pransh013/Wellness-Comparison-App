import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LocationPickerProps } from "@/types";
import { stateToCities } from "@/constants/data";

const LocationPicker = ({
  location,
  onLocationChange,
}: LocationPickerProps) => {

  const cities = stateToCities[location.state] || [];

  return (
    <View>
      <Text className="text-primary mt-2 text-sm font-rubik">Location</Text>
      <View className="w-full flex-row flex-wrap justify-between">
        <View className="w-[48%] border border-primary rounded-md">
          <Picker
            selectedValue={location.state}
            onValueChange={(value) => onLocationChange("state", value)}
          >
            <Picker.Item label="Select State" value="" />
            {Object.keys(stateToCities).map((state) => (
              <Picker.Item key={state} label={state} value={state} />
            ))}
          </Picker>
        </View>
        <View className="w-[48%] border border-gray rounded-md">
          <Picker
            selectedValue={location.city}
            onValueChange={(value) => onLocationChange("city", value)}
            enabled={cities.length > 0}
          >
            <Picker.Item label="Select City" value="" />
            {cities.map((city) => (
              <Picker.Item key={city} label={city} value={city} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

export default LocationPicker;
