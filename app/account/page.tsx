"use client";

import { useEffect, useState } from "react";
import { Box, Container, Skeleton } from "@mui/material";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

import AccountHero from "@/components/account/AccountHero";
import AccountSidebar, { AccountSection } from "@/components/account/AccountSidebar";
import ProfileSection from "@/components/account/ProfileSection";
import AddressSection from "@/components/account/AddressSection";
import SecuritySection from "@/components/account/SecuritySection";

import { subscribeToCurrentUser } from "@/services/userService";
import { UserData } from "@/types/user";

export default function AccountPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<AccountSection>("profile");

  useEffect(() => {
    const unsubscribe = subscribeToCurrentUser((data) => {
      setUser(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />

      <Box
        sx={{
          background: "#F3F5FA",
          minHeight: "100vh",
          py: { xs: 4, md: 7 },
        }}
      >
        <Container
          maxWidth="lg"        /* lg = 1200px max — stops the layout ballooning on wide screens */
          sx={{ px: { xs: 2, sm: 3, md: 4 } }}
        >
          <AccountHero />

          {loading ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "248px 1fr" },
                gap: { xs: 2.5, md: 3.5 },
                alignItems: "flex-start",
              }}
            >
              <Skeleton
                variant="rounded"
                height={260}
                sx={{ borderRadius: "28px" }}
              />
              <Skeleton
                variant="rounded"
                height={460}
                sx={{ borderRadius: "28px" }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "248px 1fr" },
                gap: { xs: 2.5, md: 3.5 },
                alignItems: "flex-start",
              }}
            >
              {/* Sidebar */}
              <AccountSidebar
                user={user}
                active={active}
                onChange={setActive}
              />

              {/* Content panel — naturally constrained by the grid */}
              <Box>
                {active === "profile"   && <ProfileSection  user={user} />}
                {active === "addresses" && <AddressSection  user={user} />}
                {active === "security"  && <SecuritySection />}
              </Box>
            </Box>
          )}
        </Container>
      </Box>

      <Footer />
    </>
  );
}