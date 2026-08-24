import { Suspense } from "react";

import InteriorDesignLoginPage from "@/components/interior-design/login/InteriorDesignLoginPage";

function LoginLoading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #08111f 0%, #102048 60%, #182d57 100%)",
        color: "#ffffff",
        fontFamily:
          "Arial, Helvetica, sans-serif",
      }}
    >
      Loading Network Ten Client Portal...
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <InteriorDesignLoginPage />
    </Suspense>
  );
}