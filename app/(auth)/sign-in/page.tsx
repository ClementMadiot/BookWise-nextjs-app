'use client'

import AuthForm from "@/components/AuthForm";
import { signInWithCredentails } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validations";

const Page = () => (
  <AuthForm
    type="SIGN_IN"
    schema={signInSchema}
    defaultValues={{
      email: "",
      password: "",
    }}
    onSubmit={signInWithCredentails}
  />
);

export default Page;
