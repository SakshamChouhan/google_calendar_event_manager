"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function LoginButton() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Button 
        onClick={() => signIn("google")}
        className="px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white"
      >
        Sign in with Google
      </Button>
    </div>
  );
}