import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import ScoreMetricsTable from "../components/ScoreMetrics/ScoreMetricsTable";
import ScoreMetricForm from "../components/ScoreMetrics/ScoreMetricForm";
import Loading from "../components/common/Loading";
import { ScoreMetric, ScoreMetricFormData } from "../types";

// Mock data for demonstration - Extended for pagination testing
const mockData: ScoreMetric[] = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  name: `معیار امتیازدهی ${index + 1}`,
  scheduleType: index % 2 === 0 ? "MONTHLY" : "DAILY",
  calculationFormula: `FORMULA_${index + 1}(data) / ${(index + 1) * 10}`,
  createdAt: new Date(2025, 5, 10 + index, 13, 30, 0).toISOString(),
}));

const ScoreMetrics: React.FC = () => {
  const [data, setData] = useState<ScoreMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<ScoreMetric | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAdd = () => {
    setEditData(null);
    setFormOpen(true);
  };

  const handleEdit = (metric: ScoreMetric) => {
    setEditData(metric);
    setFormOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setData((prev) => prev.filter((item) => item.id !== deleteId));
      setSnackbar({
        open: true,
        message: "معیار با موفقیت حذف شد",
        severity: "success",
      });
    }
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const handleFormSubmit = (formData: ScoreMetricFormData) => {
    if (editData) {
      // Update existing
      setData((prev) => prev.map((item) => (item.id === editData.id ? { ...item, ...formData } : item)));
      setSnackbar({
        open: true,
        message: "معیار با موفقیت ویرایش شد",
        severity: "success",
      });
    } else {
      // Add new
      const newMetric: ScoreMetric = {
        id: Math.max(...data.map((d) => d.id), 0) + 1,
        ...formData,
        createdAt: new Date().toISOString(),
      };
      setData((prev) => [...prev, newMetric]);
      setSnackbar({
        open: true,
        message: "معیار جدید با موفقیت اضافه شد",
        severity: "success",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get paginated data
  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (loading) {
    return <Loading message="در حال بارگذاری معیارهای امتیازدهی..." />;
  }

  return (
    <Box sx={{ direction: "rtl" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 0 },
          mb: 3,
        }}
      >
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAdd}
          size={isMobile ? "small" : "medium"}
          sx={{
            borderRadius: 2,
            alignSelf: { xs: "stretch", md: "auto" },
          }}
        >
          افزودن معیار جدید
        </Button>
        <Typography variant={isMobile ? "h5" : "h4"} component="h1" sx={{ fontWeight: "bold" }}>
          مدیریت معیارهای امتیازدهی
        </Typography>
      </Box>

      <ScoreMetricsTable 
        data={paginatedData} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
        onAdd={handleAdd}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={data.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      <ScoreMetricForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        editData={editData}
      />

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle sx={{ direction: "rtl" }}>تأیید حذف</DialogTitle>
        <DialogContent sx={{ direction: "rtl" }}>
          <Typography>آیا از حذف این معیار اطمینان دارید؟ این عمل قابل بازگشت نیست.</Typography>
        </DialogContent>
        <DialogActions sx={{ direction: "rtl", gap: 1 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
            انصراف
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ScoreMetrics;
