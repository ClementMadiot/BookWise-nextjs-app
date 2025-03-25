'use client'

import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validations";

const Page = () => (
  <AuthForm
    type="SIGN_IN"
    schema={signInSchema}
    defaultValues={{
      email: "",
      password: "",
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

export default Page;
