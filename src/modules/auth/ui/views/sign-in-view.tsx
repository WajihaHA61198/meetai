"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import SignPageRight from "@/src/components/SignPageRight";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Alert, AlertTitle } from "@/src/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/src/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const SignInView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);

    authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/");
        },
        onError: ({ error }) => {
          setPending(false);
          setError(error.message);
        },
      }
    );

    // try {
    //   const { email, password } = values;

    //   const { error } = authClient.signIn.email(
    //     {
    //       email,
    //       password,
    //     },
    //     {
    //       onSuccess: () => {
    //         window.alert("Signed in successfully");
    //         router.push("/");
    //       },
    //       onError: () => {
    //         window.alert("Error signing in");
    //         setError(error?.message || "error signing in");
    //       },
    //     }
    //   );
    // } catch (err) {
    //   console.error(err);
    //   window.alert("An unexpected error occurred");
    // }
  };

  return (
    <>
      {/* 1 */}
      <Card className="overflow-hidden p-0 mb-8">
        <CardContent className="grid md:grid-cols-2 p-0">
          {/* form */}
          <div>
            <Form {...form}>
              <h1 className="text-center font-semibold text-2xl mt-10">
                Welcome Back
              </h1>
              <p className="text-center text-sm text-gray-400">
                Login to your account
              </p>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 p-6 h-full"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email.."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="**********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!!error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlertIcon className="h-4 w-4 text-destructive!" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={pending}
                >
                  Sign in
                </Button>

                <div className="mt-1 after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full cursor-pointer"
                    disabled={pending}
                  >
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full cursor-pointer"
                    disabled={pending}
                  >
                    Github
                  </Button>
                </div>

                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="underline underline-offset-2 hover:text-blue-600 transition-opacity"
                  >
                    Sign up
                  </Link>
                </div>
              </form>
            </Form>
          </div>
          {/* ------ */}
          <SignPageRight />
        </CardContent>
      </Card>
      {/* 2 */}
      <div className="text-center text-xs text-gray-500">
        By clicking continue, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-2 hover:text-blue-600 transition-opacity"
        >
          Terms of Services
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-2 hover:text-blue-600 transition-opacity"
        >
          Privacy Policy
        </Link>
        .
      </div>
    </>
  );
};
