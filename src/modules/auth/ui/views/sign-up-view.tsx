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

const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z.string().min(1, { message: "Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const SignUpView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);

    authClient.signUp.email(
      {
        name: values.name,
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
                Let&apos;s get started
              </h1>
              <p className="text-center text-sm text-gray-400">
                create your account
              </p>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 p-6 h-full"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your name.."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
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
                  Sign Up
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
                  already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="underline underline-offset-2 hover:text-blue-600 transition-opacity"
                  >
                    Sign in
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
