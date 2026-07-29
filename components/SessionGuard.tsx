"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { initSessionWatcher, isSessionValid, clearSession } from "@/services/sessionManager";

// Routes that don't require a valid session to view.
const PUBLIC_ROUTES = ["/login"];

export default function SessionGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    initSessionWatcher();

    const hadUser = !!localStorage.getItem("user");
    const valid = isSessionValid();
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    if (hadUser && !valid && !isPublicRoute) {
      clearSession();
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return <>{children}</>;
}