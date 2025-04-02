import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "./Icon";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const router = useRouter();
  const { logout } = useAuth();
  return (
    <View className="flex-row justify-between w-full items-center px-3 mb-4">
      {router.canGoBack() ? (
        <TouchableOpacity
          className="bg-white h-12 w-12 rounded-full items-center justify-center"
          onPress={() => router.back()}
        >
          <Icon name="ArrowLeft" color="#3CC19A" />
        </TouchableOpacity>
      ) : (
        <View className="h-12 w-12"></View>
      )}
      <Text className="text-lg font-semibold text-gray-900">Thrive Daily</Text>
      <TouchableOpacity
        className="bg-white h-12 w-12 rounded-full items-center justify-center"
        onPress={() => {
          logout();
          router.replace("/sign-in");
        }}
      >
        <Icon name="LogOut" color="#3CC19A" size={24} strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
