import React from "react";
import { Paper, Typography, Box, Card, CardContent, CardActions, Button, useTheme, useMediaQuery } from "@mui/material";
import { Assessment, People, Work, TrendingUp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const cards = [
    {
      title: "معیارهای امتیازدهی",
      description: "مدیریت و تعریف معیارهای محاسبه امتیاز مشتریان",
      icon: <Assessment sx={{ fontSize: 40, color: "primary.main" }} />,
      path: "/score-metrics",
      color: "#1976d2",
    },
    {
      title: "امتیاز مشتریان",
      description: "مشاهده و بررسی امتیازات محاسبه شده مشتریان",
      icon: <People sx={{ fontSize: 40, color: "success.main" }} />,
      path: "/customer-scores",
      color: "#2e7d32",
    },
    {
      title: "گزارش پردازش‌ها",
      description: "مشاهده تاریخچه و وضعیت اجرای پردازش‌ها",
      icon: <Work sx={{ fontSize: 40, color: "warning.main" }} />,
      path: "/job-logs",
      color: "#ed6c02",
    },
  ];

  return (
    <Box sx={{ direction: "rtl" }}>
      <Typography
        variant={isMobile ? "h5" : "h4"}
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          mb: { xs: 3, md: 4 },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        داشبورد مدیریت هاب باشگاه مشتریان
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, md: 3 } }}>
        <Paper
          sx={{
            p: { xs: 2, md: 3 },
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: { xs: "flex-start", md: "center" },
              flexDirection: { xs: "column", md: "row-reverse" },
              gap: 2,
            }}
          >
            <TrendingUp
              sx={{
                fontSize: { xs: 32, md: 40 },
                alignSelf: { xs: "center", md: "initial" },
              }}
            />
            <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
              <Typography
                variant={isMobile ? "h6" : "h5"}
                component="h2"
                sx={{ fontWeight: "bold" }}
              >
                خوش آمدید به سیستم هاب باشگاه مشتریان
              </Typography>
              <Typography variant={isMobile ? "body2" : "body1"} sx={{ mt: 1, opacity: 0.9 }}>
                این سیستم به عنوان واسط ارتباطی بین بانک و باشگاه مشتریان عمل می‌کند
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: { xs: 2, md: 3 },
          }}
        >
          {cards.map((card, index) => (
            <Card
              key={index}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: { xs: "none", md: "translateY(-4px)" },
                  boxShadow: { xs: 2, md: 4 },
                },
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  textAlign: "center",
                  p: { xs: 2, md: 3 },
                }}
              >
                <Box sx={{ mb: 2 }}>
                  {React.cloneElement(card.icon, {
                    sx: { fontSize: { xs: 32, md: 40 }, color: "primary.main" },
                  })}
                </Box>
                <Typography variant={isMobile ? "body1" : "h6"} component="h3" gutterBottom sx={{ fontWeight: "bold" }}>
                  {card.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.875rem", md: "0.875rem" } }}
                >
                  {card.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => navigate(card.path)}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    backgroundColor: card.color,
                    "&:hover": {
                      backgroundColor: card.color,
                      filter: "brightness(0.9)",
                    },
                  }}
                >
                  مشاهده
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
