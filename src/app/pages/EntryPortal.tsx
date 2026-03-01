import { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Typography, Stack, Paper } from "@mui/material";
import { GraduationCap, Briefcase } from "lucide-react";
import { DemoNav } from "@/app/components/DemoNav";
import { useAuth } from "@/app/contexts/AuthContext";
import { motion } from "motion/react";

export function EntryPortal() {
  const navigate = useNavigate();
  const { loginWithHaka, loginWithGoogle, isLoading } = useAuth();
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  const handleUniversityLogin = async () => {
    try {
      await loginWithHaka();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleCompanyLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fafaf9",
        px: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial gradient background accent */}
      <Box
        sx={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(45,90,71,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-15%",
          left: "-5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(45,90,71,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <DemoNav />

      {/* Authentication Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "480px",
            maxWidth: "calc(100vw - 48px)",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "48px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
            position: "relative",
            zIndex: 10,
          }}
        >
          <Stack sx={{ gap: "32px" }}>
            {/* Typographic Logo */}
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#2d5a47",
                fontFamily: "Inter, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              LuppoGrove
            </Typography>

            {/* Header Section */}
            <Stack sx={{ gap: "8px" }}>
              <Typography
                sx={{
                  fontSize: "28px",
                  fontWeight: 600,
                  color: "#1a1a1a",
                  lineHeight: 1.3,
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Welcome to the
                <br />
                Collaboration Ecosystem
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "#6b6b6b",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Choose your portal to continue.
              </Typography>
            </Stack>

            {/* Action Section — SSO Buttons */}
            <Stack sx={{ gap: "16px" }}>
              {/* University Login (Haka / Microsoft) */}
              <Button
                onClick={handleUniversityLogin}
                disabled={isLoading}
                disableRipple
                fullWidth
                onMouseEnter={() => setHoveredBtn("university")}
                onMouseLeave={() => setHoveredBtn(null)}
                sx={{
                  height: "56px",
                  backgroundColor: "#2d5a47",
                  color: "#ffffff",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "Inter, sans-serif",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform:
                    hoveredBtn === "university"
                      ? "translateY(-2px)"
                      : "translateY(0)",
                  boxShadow:
                    hoveredBtn === "university"
                      ? "0 4px 12px rgba(45,90,71,0.2)"
                      : "none",
                  "&:hover": {
                    backgroundColor: "#2d5a47",
                  },
                  "&:disabled": {
                    opacity: 0.5,
                    backgroundColor: "#2d5a47",
                    color: "#ffffff",
                  },
                }}
              >
                <GraduationCap size={20} strokeWidth={1.5} />
                {isLoading ? "Authenticating..." : "University Login (Microsoft)"}
              </Button>

              {/* Industry Login (Google / Gmail) */}
              <Button
                onClick={handleCompanyLogin}
                disabled={isLoading}
                disableRipple
                fullWidth
                variant="outlined"
                onMouseEnter={() => setHoveredBtn("industry")}
                onMouseLeave={() => setHoveredBtn(null)}
                sx={{
                  height: "56px",
                  backgroundColor: "transparent",
                  color: "#2d5a47",
                  border: "2px solid #2d5a47",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "Inter, sans-serif",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform:
                    hoveredBtn === "industry"
                      ? "translateY(-2px)"
                      : "translateY(0)",
                  boxShadow:
                    hoveredBtn === "industry"
                      ? "0 4px 12px rgba(45,90,71,0.2)"
                      : "none",
                  "&:hover": {
                    backgroundColor: "transparent",
                    border: "2px solid #2d5a47",
                  },
                  "&:disabled": {
                    opacity: 0.5,
                    backgroundColor: "transparent",
                    color: "#2d5a47",
                    border: "2px solid #2d5a47",
                  },
                }}
              >
                <Briefcase size={20} strokeWidth={1.5} />
                {isLoading
                  ? "Authenticating..."
                  : "Industry Login (Google/Gmail)"}
              </Button>
            </Stack>

            {/* Footer / Terms */}
            <Typography
              sx={{
                fontSize: "12px",
                color: "#9ca3af",
                textAlign: "center",
                lineHeight: 1.5,
                fontFamily: "Inter, sans-serif",
              }}
            >
              By authenticating, you agree to the LuppoGrove Terms of Service.
            </Typography>
          </Stack>
        </Paper>
      </motion.div>

      {/* Powered by */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Typography
          sx={{
            mt: 4,
            fontSize: "13px",
            color: "#9ca3af",
            position: "relative",
            zIndex: 10,
            fontFamily: "Inter, sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          Powered by Rahti / CSC
        </Typography>
      </motion.div>
    </Box>
  );
}
