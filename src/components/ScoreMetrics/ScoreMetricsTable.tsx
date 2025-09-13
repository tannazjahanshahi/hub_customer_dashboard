import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Box,
  TablePagination,
} from "@mui/material";
import { Edit, Delete, Assessment } from "@mui/icons-material";
import { ScoreMetric } from "../../types";
import { formatPersianDate } from "../../utils/dateUtils";
import EmptyState from "../common/EmptyState";
import { RtlTablePaginationActions } from "../common/RTLPagination";

interface ScoreMetricsTableProps {
  data: ScoreMetric[];
  onEdit: (metric: ScoreMetric) => void;
  onDelete: (id: number) => void;
  onAdd?: () => void;
  page?: number;
  rowsPerPage?: number;
  totalCount?: number;
  onPageChange?: (event: unknown, newPage: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ScoreMetricsTable: React.FC<ScoreMetricsTableProps> = ({
  data,
  onEdit,
  onDelete,
  onAdd,
  page = 0,
  rowsPerPage = 5,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const getScheduleTypeLabel = (type: string) => {
    return type === "DAILY" ? "روزانه" : "ماهانه";
  };

  const getScheduleTypeColor = (type: string) => {
    return type === "DAILY" ? "primary" : "secondary";
  };

  if (data.length === 0) {
    return (
      <EmptyState
        title="هیچ معیاری تعریف نشده است"
        description="برای شروع، اولین معیار امتیازدهی خود را اضافه کنید"
        actionText="افزودن معیار جدید"
        onAction={onAdd}
        icon={<Assessment />}
      />
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        direction: "rtl",
        overflowX: "auto",
        "& .MuiTable-root": { minWidth: { xs: 650, md: "auto" } },
        "& .MuiTableCell-root": { textAlign: "right" },
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "grey.100" }}>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              شناسه
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              نام معیار
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              نوع زمان‌بندی
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontWeight: "bold",
                display: { xs: "none", md: "table-cell" },
              }}
            >
              تاریخ ایجاد
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              عملیات
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                "&:nth-of-type(odd)": { backgroundColor: "action.hover" },
                "&:hover": { backgroundColor: "action.selected" },
              }}
            >
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">
                <Chip
                  label={getScheduleTypeLabel(row.scheduleType)}
                  color={getScheduleTypeColor(row.scheduleType) as any}
                  size="small"
                />
              </TableCell>
              <TableCell
                align="center"
                sx={{ display: { xs: "none", md: "table-cell" } }}
              >
                {formatPersianDate(row.createdAt)}
              </TableCell>
              <TableCell align="center">
                <Box
                  sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}
                >
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(row)}
                    size="small"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => onDelete(row.id)}
                    size="small"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {(totalCount || data.length) > 5 &&
        onPageChange &&
        onRowsPerPageChange && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20]}
            component="div"
            count={totalCount ?? 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            labelRowsPerPage=":تعداد ردیف در هر صفحه"
            labelDisplayedRows={({ count }) =>
              `صفحه ${page + 1} از ${
                count !== -1 ? Math.ceil(count / rowsPerPage) : "بی‌نهایت"
              }`
            }
            ActionsComponent={RtlTablePaginationActions}
            sx={{
              direction: "rtl",
              "& .MuiTablePagination-toolbar": {
                flexDirection: "row-reverse",
              },
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                {
                  marginInline: 1,
                  fontFamily: "inherit",
                },
            }}
          />
        )}
    </TableContainer>
  );
};

export default ScoreMetricsTable;
