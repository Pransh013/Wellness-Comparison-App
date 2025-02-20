import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  mobile: z
    .string()
    .min(10, { message: "Mobile number should be at least 10 digits" })
    .regex(/^\d{10}$/, { message: "Invalid mobile number" }),
  location: z.object({
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    country: z.string().min(1, { message: "Country is required" }),
  }),
  file: z.any().nullable(),
  agreed: z.boolean().refine((value) => value, {
    message: "You must agree to the Terms and Conditions",
  }),
});
