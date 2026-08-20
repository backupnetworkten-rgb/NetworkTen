"use client";

import {
  ReactNode,
  useEffect,
  useState,
} from "react";

import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
} from "firebase/firestore";

import { useRouter } from "next/navigation";

import {
  auth,
  db,
} from "@/lib/firebase/client";

interface ClientGuardProps {
  children: ReactNode;
}

export default function ClientGuard({
  children,
}: ClientGuardProps) {
  const router = useRouter();

  const [checking, setChecking] =
    useState(true);

  const [allowed, setAllowed] =
    useState(false);

  useEffect(() => {
    let mounted = true;

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {
          if (!user) {
            router.replace(
              "/interior-design/login"
            );
            return;
          }

          try {
            const clientRef = doc(
              db,
              "interiorClients",
              user.uid
            );

            const snapshot =
              await getDoc(clientRef);

            if (!snapshot.exists()) {
              router.replace(
                "/interior-design/access-denied"
              );
              return;
            }

            const client =
              snapshot.data();

            const portalAccess =
              client.interiorDesignAccess === true;

            const welcomeKitAccess =
              client.kits?.welcomeKit === true;

            if (
              !portalAccess ||
              !welcomeKitAccess
            ) {
              router.replace(
                "/interior-design/access-denied"
              );
              return;
            }

            if (mounted) {
              setAllowed(true);
            }
          } catch (error) {
            console.error(
              "Client access error:",
              error
            );

            router.replace(
              "/interior-design/access-denied"
            );
          } finally {
            if (mounted) {
              setChecking(false);
            }
          }
        }
      );

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [router]);

  if (checking) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f7f9fc",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress
            size={42}
            sx={{
              color: "#8BC53F",
            }}
          />

          <Typography
            sx={{
              mt: 2,
              color: "#64748b",
            }}
          >
            Verifying your client access...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}