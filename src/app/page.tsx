"use client";

import { Button } from "../components/ui/button";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const session = await authClient.getSession();
      if (!session?.data?.user) {
        router.push("/sign-in");
      } else {
        setUser(session.data.user);
      }
      setLoading(false);
    };

    getSession();
  }, [router]);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-semibold">Welcome to Meet AI</h1>
      <p className="text-lg">Logged in as {user.name || user.email}</p>
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  );
}
