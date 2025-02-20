import React from "react";
import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl">Oops! This screen doesn't exist.</Text>
        <Link href="/(root)/(tabs)" className="underline text-blue-500">
          Go to home screen
        </Link>
      </View>
    </>
  );
}
