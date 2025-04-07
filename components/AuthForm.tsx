"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";

// Build form components.
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import FileUpload from "./FileUpload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// <T> is the default value we're passing into the form.
interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const router = useRouter();
  // Check if the form is a sign in form.
  const isSignIn = type === "SIGN_IN";
  // 1. Define your form.
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  // 2. Define a submit handler.
  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if (result.success) {
      toast.success("Success", {
        description: isSignIn
          ? "You have succesfully signed in"
          : "You have succesfully signed up",
        classNames: {
          toast: "!bg-green-500",
        },
      });
      // push user to the home page
      router.push("/");
    } else {
      toast.error(`Error ${isSignIn ? "signing in" : "signing up"}`, {
        description: result.error ?? "An error occured",
      });
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "Welcome back to BookWise" : "Create your library account"}
      </h1>
      <p className="text-light-300">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"
        >
          {Object.keys(defaultValues).map((fields) => (
            <FormField
              key={fields}
              control={form.control}
              name={fields as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>

                  <FormControl>
                    {field.name === "universityCard" ? (
                      <FileUpload
                        onFileChange={field.onChange}
                        type="image"
                        accept="image/*"
                        placeholder="Upload you ID"
                        folder="ids"
                        variant="dark"
                      />
                    ) : (
                      <Input
                        required
                        placeholder={
                          FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]
                        }
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button className="form-btn" type="submit">
            {isSignIn ? "Login" : "Sign Up"}
          </Button>
        </form>
      </Form>
      <p className="text-center text-base">
        {isSignIn ? "New to BookWise? " : "Already have an account? "}

        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary"
        >
          {isSignIn ? "Create an account" : "Login"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
