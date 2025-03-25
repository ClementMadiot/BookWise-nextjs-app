'use client'

import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validations";

const Page = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      email: "",
      password: "",
      fullName: "",
      universityId: 0,
      universityCard: "",
    }}
    onSubmit={async (data) => {
      // Example implementation
      try {
        // Simulate API call
        return { success: true };
      } catch (error) {
        return { success: false, error: "An error occurred" };
      }
    }}
  />
);

export default Page