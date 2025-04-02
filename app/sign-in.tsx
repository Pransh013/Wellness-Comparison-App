import { View, Text, ScrollView } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import { router } from "expo-router";
import { formSchema } from "@/schemas";
import { FormStateType } from "@/types";
import { initialFormState } from "@/constants/data";
import FormInput from "@/components/FormInput";
import FileUpload from "@/components/FileUpload";
import AgreementCheckbox from "@/components/AgreementCheckbox";
import { handleInputChange } from "@/lib/utils";
import LocationPicker from "@/components/LocationPicker";
import { useAuth } from "@/contexts/AuthContext";
import { ZodIssue } from "zod";

const SignIn = () => {
  const [formState, setFormState] = useState<FormStateType>(initialFormState);
  const [formErrors, setFormErrors] = useState<ZodIssue[]>([]);

  const { login } = useAuth();

  const handleLogin = async () => {
    const result = formSchema.safeParse(formState);
    if (!result.success) {
      setFormErrors(result.error.errors);
      return;
    }

    const userData = {
      name: formState.name,
      mobile: formState.mobile,
      email: formState.email,
      location: formState.location,
      agreed: formState.agreed,
      file: formState.file,
      isAuthenticated: true,
    };
    await login(userData);
    router.replace("/");
  };

  return (
    <SafeAreaView className="bg-primary-background h-full py-8 px-4">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="h-full gap-4">
          <Text className="text-center text-xl uppercase font-rubik">
            Thrive Daily
          </Text>

          <ScrollView
            contentContainerStyle={{
              backgroundColor: "#fff",
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 16,
              justifyContent: "flex-start",
            }}
          >
            <Text className="text-center text-3xl font-rubik-semibold">
              Wellness
            </Text>
            <Text className="text-center text-3xl font-rubik-semibold">
              Comparison Test
            </Text>
            <View className="mt-3 gap-1.5">
              <FormInput
                label="Name"
                placeholder="Enter you name"
                value={formState.name}
                onChange={(text) =>
                  handleInputChange("name", text, setFormState)
                }
              />

              <FormInput
                label="Mobile No."
                placeholder="Enter you mobile no."
                value={formState.mobile}
                keyboardType="phone-pad"
                onChange={(text) =>
                  handleInputChange("mobile", text, setFormState)
                }
              />

              <FormInput
                label="E-mail"
                placeholder="Enter you email"
                value={formState.email}
                onChange={(text) =>
                  handleInputChange("email", text, setFormState)
                }
              />

              <LocationPicker
                location={formState.location}
                onLocationChange={(key, value) =>
                  handleInputChange(
                    "location",
                    { ...formState.location, [key]: value },
                    setFormState
                  )
                }
              />

              <FileUpload
                file={formState.file}
                onUpload={(file) =>
                  handleInputChange("file", file, setFormState)
                }
              />

              <AgreementCheckbox
                agreed={formState.agreed}
                onToggle={() =>
                  handleInputChange("agreed", !formState.agreed, setFormState)
                }
              />

              <Button onPress={handleLogin} title="Submit"></Button>

              {formErrors[0]?.message ? (
                <Text className="text-red-500 text-center font-rubik mt-1 text-lg">
                  **{formErrors[0]?.message}
                </Text>
              ) : null}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
