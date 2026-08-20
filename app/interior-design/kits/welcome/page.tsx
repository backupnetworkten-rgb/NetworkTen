"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import ClientGuard from "@/components/interior-design/ClientGuard";

import WelcomeKitForm from "@/components/interior-design/welcome-kit/WelcomeKitForm";

import WelcomeKitSuccess from "@/components/interior-design/welcome-kit/WelcomeKitSuccess";

function WelcomeKitContent() {
  const searchParams =
    useSearchParams();

  const success =
    searchParams.get("success") === "true";

  if (success) {
    return <WelcomeKitSuccess />;
  }

  return (
    <WelcomeKitForm />
  );
}

export default function WelcomeKitPage() {
  return (
    <ClientGuard>
      <Suspense
        fallback={
          <div>
            Loading Welcome Kit...
          </div>
        }
      >
        <WelcomeKitContent />
      </Suspense>
    </ClientGuard>
  );
}