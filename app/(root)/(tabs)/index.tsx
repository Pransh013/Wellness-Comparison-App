import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { advisoryList } from "@/constants/data";

const Home = () => {
  return (
    <SafeAreaView className="bg-primary-background justify-center h-screen py-10">
      <ScrollView contentContainerClassName="h-full items-center">
        <Header />

        <View className="w-full flex-row px-10 mx-4 mt-4 justify-between">
          <View className=" gap-4">
            <View>
              <Text className="text-gray">Name</Text>
              <Text className="text-lg font-semibold text-green">John Doe</Text>
            </View>
            <View>
              <Text className="text-gray">Date</Text>
              <Text className="text-lg font-semibold text-gray-800">
                05-02-25
              </Text>
            </View>
          </View>
          <View className=" gap-4">
            <View>
              <Text className="text-gray">Sample Test</Text>
              <Text className="text-lg font-semibold text-green">
                Cholesterol
              </Text>
            </View>

            <View>
              <Text className="text-gray">Time</Text>
              <Text className="text-lg font-semibold text-gray-800">
                11:00 PM
              </Text>
            </View>
          </View>
        </View>

        <View className="bg-white w-full px-6 mt-4 py-8">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray">Sample Test</Text>
            <Text className="text-gray">Results</Text>
            <Text className="text-gray">Units</Text>
            <Text className="text-gray">Bio Ref</Text>
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="font-semibold">Cholesterol</Text>
            <Text className="text-danger font-semibold">241.10</Text>
            <Text className="font-semibold">mg/dl</Text>
            <Text className="font-semibold">{`<200.00`}</Text>
          </View>
        </View>

        <View className="bg-card-to rounded-2xl p-5 mx-6 mt-6">
          <Text className="text-white text-lg font-semibold mb-2">
            Advisory:
          </Text>
          {advisoryList.map((item, idx) => (
            <View className="flex-row gap-1" key={idx}>
              <Text className="text-white text-2xl">•</Text>
              <Text className="text-white text-lg">{item}</Text>
            </View>
          ))}
        </View>

        <Button
          title="Send Report to Email"
          onPress={() => {}}
          className="w-60"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
