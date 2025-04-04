import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Linking,
  Dimensions,
  StyleSheet,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { ReportType } from "@/types";

const SERVER_URL = "http://52.66.206.177:3000";

const Home = () => {
  const { user, logout } = useAuth();
  const uri = user?.file?.uri;
  const [report, setReport] = useState<ReportType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { width } = Dimensions.get("window");

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

      setReport(response?.data?.analysis);
    } catch (error) {
      console.error("Error sending PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    sendToBackend(uri);
  }, []);

  const sendEmail = (report: ReportType) => {
    const subject = `Medical Report for ${report?.patient?.name}`;

    const testDetails = report.tests
      .map(
        (test, idx) =>
          `Test ${idx + 1}:
  - Sample Test: ${test.sampleTest}
  - Result: ${test.result} ${test.unit}
  - Bio Ref: ${test.bioRef}
  - Advisory:\n    ${test.advisory.map((tip) => `• ${tip}`).join("\n    ")}\n`
      )
      .join("\n");

    const body = `
Dear Doctor,

Please find attached the medical report for ${report?.patient?.name}.

Patient Details:
- Name: ${report.patient.name}
- Date: ${report.patient.date}
- Time: ${report.patient.time}
- Hospital: ${report.patient.hospitalName || "N/A"}

Test Details:
${testDetails}

Regards,
Your Medical App`;

    const email = "recipient@example.com";
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

  const { patient, tests } = report;

  return (
    <SafeAreaView className="bg-primary-background justify-center py-10">
      <View
        style={{
          flexGrow: 1,
          alignItems: "center",
        }}
      >
        <Header />

        <View className="w-full flex-row px-6 mt-4 gap-2 justify-between">
          <View className="gap-4 justify-center items-center">
            <View>
              <Text className="text-gray text-center">Name</Text>
              <Text className="text-base font-semibold capitalize text-green">
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
              <Text className="text-base font-semibold capitalize text-green">
                {patient?.testName || "N/A"}
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

        <Carousel
          loop={false}
          width={width * 0.92}
          height={450}
          autoPlay={false}
          data={tests}
          scrollAnimationDuration={600}
          style={{ alignSelf: "center", marginTop: 20 }}
          renderItem={({ item }) => (
            <View className="bg-white rounded-xl px-5 py-5 w-full">
              {/* Test Details */}
              <View className="mb-4">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-gray font-semibold">Parameter</Text>
                  <Text className="text-gray font-semibold">Result</Text>
                  <Text className="text-gray font-semibold">Units</Text>
                  <Text className="text-gray font-semibold">Bio Ref</Text>
                </View>

                <View className="flex-row justify-between items-center mb-2">
                  <Text className="font-semibold capitalize max-w-40">
                    {item?.sampleTest || "N/A"}
                  </Text>
                  <Text className="text-danger font-semibold">
                    {item?.result || "N/A"}
                  </Text>
                  <Text className="font-semibold">{item?.unit || "N/A"}</Text>
                  <Text className="font-semibold">{item?.bioRef || "N/A"}</Text>
                </View>
              </View>

              {/* Advisory */}
              <View
                className="bg-green rounded-lg p-2"
                style={styles.advisoryContainer}
              >
                <Text className="text-white font-semibold text-base mb-2">
                  Advisory:
                </Text>
                <ScrollView
                  style={styles.advisoryScrollView}
                  contentContainerStyle={styles.advisoryContent}
                  showsVerticalScrollIndicator={true}
                  nestedScrollEnabled={true}
                  persistentScrollbar={true}
                >
                  {item?.advisory?.length > 0 ? (
                    item.advisory.map((tip, idx) => (
                      <View
                        className="flex-row mb-1"
                        key={idx}
                        style={styles.advisoryItem}
                      >
                        <Text
                          className="text-white text-xl"
                          style={styles.bulletPoint}
                        >
                          •
                        </Text>
                        <Text
                          className="text-white text-base"
                          style={styles.advisoryText}
                        >
                          {tip}
                        </Text>
                      </View>
                    ))
                  ) : (
                    <Text className="text-white">No advisory available</Text>
                  )}
                </ScrollView>
              </View>
            </View>
          )}
        />

        <Button
          title="Send Report to Email"
          onPress={() => sendEmail(report)}
          className="w-60"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  advisoryContainer: {
    height: 300,
  },
  advisoryScrollView: {
    flex: 1,
    width: "100%",
  },
  advisoryContent: {
    paddingHorizontal: 8,
    paddingBottom: 10,
  },
  advisoryItem: {
    flexDirection: "row",
    marginBottom: 4,
    width: "100%",
  },
  bulletPoint: {
    marginRight: 4,
  },
  advisoryText: {
    flex: 1,
    flexWrap: "wrap",
  },
});

export default Home;
