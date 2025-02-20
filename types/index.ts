import { DocumentPickerAsset } from "expo-document-picker";

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