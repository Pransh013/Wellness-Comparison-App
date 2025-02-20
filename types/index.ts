import { DocumentPickerAsset } from "expo-document-picker";
import { icons } from "lucide-react-native";

type LocationType = {
  city: string;
  state: string;
  country: string;
};

export type FormStateType = {
  name: string;
  mobile: string;
  location: LocationType;
  file: null | DocumentPickerAsset;
  agreed: boolean;
};

export type FormInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  keyboardType?: "default" | "phone-pad";
};

export type IconProps = {
  name: keyof typeof icons;
  color?: string;
  size?: number;
  strokeWidth?: number;
};

export type AgreementCheckboxProps = {
  agreed: boolean;
  onToggle: () => void;
};

export type ButtonProps = {
  title: string;
  onPress: () => void;
  className?: string;
};

export type FileUploadProps = {
  file: any;
  onUpload: (file: any) => void;
};

export type LocationPickerProps = {
  location: { city: string; state: string; country: string };
  onLocationChange: (key: string, value: string) => void;
};
