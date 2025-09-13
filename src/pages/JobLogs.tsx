import React, { useState, useEffect, useMemo } from "react";
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Paper, Button } from "@mui/material";
import { Clear } from "@mui/icons-material";
import JobLogsTable from "../components/JobLogs/JobLogsTable";
import JobLogDetailsModal from "../components/JobLogs/JobLogDetailsModal";
import Loading from "../components/common/Loading";
import { JobExecutionLog } from "../types";

// Mock data for demonstration
const mockData: JobExecutionLog[] = [
  {
    id: 501,
    jobName: "محاسبه امتیاز ماهانه",
    status: "SUCCESS",
    startTime: "2025-06-10T01:00:00Z",
    endTime: "2025-06-10T01:05:00Z",
  },
  {
    id: 502,
    jobName: "ارسال امتیازات به باشگاه مشتریان",
    status: "FAILED",
    startTime: "2025-06-11T02:00:00Z",
    endTime: "2025-06-11T02:01:30Z",
    errorMessage: "Database connection timeout",
  },
  {
    id: 503,
    jobName: "محاسبه امتیاز روزانه",
    status: "RUNNING",
    startTime: "2025-06-12T03:00:00Z",
  },
  {
    id: 504,
    jobName: "پردازش تراکنش‌های جدید",
    status: "SUCCESS",
    startTime: "2025-06-13T23:30:00Z",
    endTime: "2025-06-13T23:45:00Z",
  },
  {
    id: 505,
    jobName: "بروزرسانی معیارهای امتیازدهی",
    status: "FAILED",
    startTime: "2025-06-14T22:00:00Z",
    endTime: "2025-06-14T22:02:15Z",
    errorMessage: "Invalid calculation formula in metric ID 3",
  },
];

const JobLogs: React.FC = () => {
  const [data, setData] = useState<JobExecutionLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedLog, setSelectedLog] = useState<JobExecutionLog | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const availableStatuses = useMemo(() => {
    return Array.from(new Set(data.map((item) => item.status)));
  }, [data]);

  const filteredData = useMemo(() => {
    let filtered = data;

    if (selectedStatus) {
      filtered = filtered.filter((item) => item.status === selectedStatus);
    }

    // Sort by start time (newest first)
    filtered.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

    return filtered;
  }, [data, selectedStatus]);

  const handleViewDetails = (log: JobExecutionLog) => {
    setSelectedLog(log);
    setDetailsModalOpen(true);
  };

  const handleClearFilters = () => {
    setSelectedStatus("");
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "موفق";
      case "FAILED":
        return "ناموفق";
      case "RUNNING":
        return "در حال اجرا";
      default:
        return status;
    }
  };

  const getStatusCounts = () => {
    const counts = {
      SUCCESS: data.filter((item) => item.status === "SUCCESS").length,
      FAILED: data.filter((item) => item.status === "FAILED").length,
      RUNNING: data.filter((item) => item.status === "RUNNING").length,
    };
    return counts;
  };

  if (loading) {
    return <Loading message="در حال بارگذاری گزارش پردازش‌ها..." />;
  }

  const statusCounts = getStatusCounts();

  return (
    <Box sx={{ direction: "rtl" }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 3, textAlign: "left" }}>
        گزارش پردازش‌ها
      </Typography>

      {/* Status Summary */}
      <Paper sx={{ p: 3, mb: 3, direction: "rtl" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          خلاصه وضعیت پردازش‌ها
        </Typography>
        <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" color="success.main" sx={{ fontWeight: "bold" }}>
              {statusCounts.SUCCESS}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              موفق
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" color="error.main" sx={{ fontWeight: "bold" }}>
              {statusCounts.FAILED}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ناموفق
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" color="info.main" sx={{ fontWeight: "bold" }}>
              {statusCounts.RUNNING}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              در حال اجرا
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3, direction: "rtl" }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>فیلتر بر اساس وضعیت</InputLabel>
            <Select
              value={selectedStatus}
              label="فیلتر بر اساس وضعیت"
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <MenuItem value="">همه وضعیت‌ها</MenuItem>
              {availableStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {getStatusLabel(status)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="outlined" onClick={handleClearFilters} startIcon={<Clear />} sx={{ height: "fit-content" }}>
            پاک کردن فیلترها
          </Button>
        </Box>
      </Paper>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          نمایش {filteredData.length} نتیجه از {data.length} گزارش
        </Typography>
      </Box>

      <JobLogsTable data={filteredData} onViewDetails={handleViewDetails} />

      <JobLogDetailsModal open={detailsModalOpen} onClose={() => setDetailsModalOpen(false)} logData={selectedLog} />
    </Box>
  );
};

export default JobLogs;
