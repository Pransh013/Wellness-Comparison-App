import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "./Icon";
import { router } from "expo-router";

const Header = () => {
  return (
    <View className="flex-row justify-between w-full items-center px-3 mb-4">
      <TouchableOpacity
        className="bg-white h-10 w-10 rounded-full items-center justify-center"
        onPress={() => router.replace("/sign-in")}
      >
        <Icon name="ArrowLeft" color="#3CC19A" />
      </TouchableOpacity>
      <Text className="text-lg font-semibold text-gray-900">Thrive Daily</Text>
      <TouchableOpacity className="bg-white h-10 w-10 rounded-full items-center justify-center">
        <Icon name="Info" color="#3CC19A" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
