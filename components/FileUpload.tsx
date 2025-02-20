import { View, Text, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Icon from "@/components/Icon";
import { FileUploadProps } from "@/types";

const FileUpload = ({ file, onUpload }: FileUploadProps) => {
  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      if (!result.canceled) {
        onUpload(result.assets[0]);
      }
    } catch (error) {
      console.log("File upload error:", error);
    }
  };

  return (
    <View className="">
      <Text className="text-primary mt-4 text-sm font-rubik">
        Upload Your Report
      </Text>
      <View className="w-full flex-row items-center gap-4">
        <View className="bg-[#ebe5e5] flex-row w-full flex-1 rounded-md justify-center gap-3 items-center h-12">
          {!file && <Icon name="Paperclip" size={24} color="#0F2736AB" />}
          <Text className="text-[#0F2736AB] font-rubik text-nowrap max-w-3/4">
            {file ? file.name : "No file attached"}
          </Text>
        </View>
        <TouchableOpacity
          className="bg-button-bg px-5 h-12 justify-center rounded-md items-center"
          onPress={handleFileUpload}
        >
          <Icon name="Upload" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FileUpload;
