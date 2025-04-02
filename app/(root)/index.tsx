import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { ReportType } from "@/types";

const SERVER_URL = "http://52.66.206.177:3000";

const hospitalToProviderMap: { [key: string]: string } = {
  "Sakra World Hospital": "Omron Global",
  "Green Valley Clinic": "MedEquip Co.",
  "Sunrise Medical Center": "MedicaTech",
  "Lakeside Hospital": "HealthPlus Technologies",
};

const Home = () => {
  const { user, logout } = useAuth();
  const uri = user?.file?.uri;
  const [report, setReport] = useState<ReportType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const sendToBackend = async (uri: string | undefined) => {
    if (!uri) return;
    try {
      const formData = new FormData();
      formData.append("pdf", {
        uri,
        name: "document.pdf",
        type: "application/pdf",
      } as any);

      const response = await axios.post(`${SERVER_URL}/analyze-pdf`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const cleanedString = response?.data?.analysis
        .replace(/```json/g, "")
        .replace(/```/g, "");

      const reportData = JSON.parse(cleanedString);
      setReport(reportData);
    } catch (error) {
      console.error("Error sending PDF:", error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    sendToBackend(uri);
  }, []);

  const sendEmail = (report: ReportType) => {
    const subject = `Medical Report for ${report?.patient?.name}`;
    const body = `
    Dear Doctor,

    Please find attached the medical report for ${report?.patient?.name}.

    Patient Details:
    Name: ${report?.patient?.name}
    Date: ${report?.patient?.date}
    Sample Test: ${report?.patient?.sampleTest}
    Time: ${report?.patient?.time}

    Advisory:
    ${report?.advisory?.join("\n")}

    Best regards,
    Your Medical App`;

    const email = "recipient@example.com"; // Replace with the recipient's email

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoUrl).catch((error) => {
      console.error("Failed to open email app", error);
    });
  };

  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3CC19A" />
      </View>
    );

  if (!report)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No report available</Text>
        <Button className="w-60" title="Logout" onPress={() => logout()} />
      </View>
    );

  const { patient, advisory } = report;

  return (
    <SafeAreaView className="bg-primary-background justify-center h-screen py-10">
      <ScrollView contentContainerClassName="h-full items-center">
        <Header />

        <View className="w-full flex-row px-6 mt-4 gap-2 justify-between">
          <View className="gap-4 justify-center items-center">
            <View>
              <Text className="text-gray text-center">Name</Text>
              <Text className="text-base font-semibold text-green">
                {patient?.name || "N/A"}
              </Text>
            </View>
            <View>
              <Text className="text-gray text-center">Date</Text>
              <Text className="text-base font-semibold text-gray-800">
                {patient?.date || "N/A"}
              </Text>
            </View>
          </View>
          <View className="items-center justify-center gap-4">
            <View>
              <Text className="text-gray text-center">Sample Test</Text>
              <Text className="text-base font-semibold text-green">
                {patient?.sampleTest || "N/A"}
              </Text>
            </View>

            <View>
              <Text className="text-gray text-center">Time</Text>
              <Text className="text-base font-semibold text-gray-800">
                {patient?.time || "N/A"}
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
            <Text className="font-semibold max-w-32">
              {patient?.sampleTest || "N/A"}
            </Text>
            <Text className="text-danger font-semibold">
              {patient?.result || "N/A"}
            </Text>
            <Text className="font-semibold">{patient?.unit || "N/A"}</Text>
            <Text className="font-semibold">{patient?.bioRef || "N/A"}</Text>
          </View>
        </View>

        <View className="bg-green mx-6 p-3 rounded-lg mt-4 max-h-[320px]">
          <Text className="text-white text-lg font-semibold mb-2">
            Advisory:
          </Text>
          <ScrollView
            contentContainerStyle={{
              maxWidth: "95%",
            }}
          >
            {advisory && advisory.length > 0 ? (
              advisory.map((item, idx) => (
                <View className="flex-row gap-1" key={idx}>
                  <Text className="text-white text-2xl">•</Text>
                  <Text className="text-white text-lg">{item}</Text>
                </View>
              ))
            ) : (
              <Text className="text-white">No advisory available</Text>
            )}
          </ScrollView>
        </View>

        <Button
          title="Send Report to Email"
          onPress={() => sendEmail(report)}
          className="w-60"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
