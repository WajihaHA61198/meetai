"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    // console.log("ni");
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: () => {
          window.alert("Error signing up");
        },
        onSuccess: () => {
          window.alert("Signed up successfully");
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto mt-20">
      <Input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onSubmit} variant="custom">
        Click me
      </Button>
    </div>
  );
}
