import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  mobile: z
    .string()
    .min(10, { message: "Mobile number should be 10 digits" })
    .regex(/^\d{10}$/, { message: "Invalid mobile number" }),
  email: z.string().email({ message: "Email is required" }),
  location: z.object({
    state: z.string().min(2, { message: "State is required" }),
    city: z.string().min(2, { message: "City is required" }),
  }),
  file: z.any().refine((value) => value !== null && value !== undefined, {
    message: "File is required",
  }),
  agreed: z.boolean().refine((value) => value, {
    message: "You must agree to the Terms and Conditions",
  }),
});
