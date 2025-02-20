import { FormStateType } from "@/types";

export const handleInputChange = <K extends keyof FormStateType>(
  key: K,
  value: FormStateType[K],
  setFormState: React.Dispatch<React.SetStateAction<FormStateType>>
) => {
  setFormState((prevState: FormStateType) => ({
    ...prevState,
    [key]: value,
  }));
};
