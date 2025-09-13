import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  Typography,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import { CustomerScore } from "../../types";
import { formatPersianDate } from "../../utils/dateUtils";
import { RtlTablePaginationActions } from "../common/RTLPagination";

interface CustomerScoresTableProps {
  data: CustomerScore[];
  onSort: (field: keyof CustomerScore) => void;
  sortField: keyof CustomerScore;
  sortDirection: "asc" | "desc";
  page?: number;
  rowsPerPage?: number;
  totalCount: number;
  onPageChange?: (event: unknown, newPage: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomerScoresTable: React.FC<CustomerScoresTableProps> = ({
  data,
  onSort,
  sortField,
  sortDirection,
  page = 0,
  rowsPerPage = 5,
  onPageChange,
  totalCount,
  onRowsPerPageChange,
}) => {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "SENT":
        return "ارسال شده";
      case "FAILED":
        return "ناموفق";
      case "PENDING":
        return "در انتظار";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SENT":
        return "success";
      case "FAILED":
        return "error";
      case "PENDING":
        return "warning";
      default:
        return "default";
    }
  };

  if (data.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          هیچ امتیازی یافت نشد
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        direction: "rtl",
        "& .MuiTableCell-root": {
          textAlign: "right",
        },
        "& .MuiTableCell-alignCenter": {
          textAlign: "center",
        },
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "grey.100" }}>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              <TableSortLabel
                active={sortField === "customerId"}
                direction={sortField === "customerId" ? sortDirection : "asc"}
                onClick={() => onSort("customerId")}
              >
                شناسه مشتری
              </TableSortLabel>
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              <TableSortLabel
                active={sortField === "scoreMetricId"}
                direction={
                  sortField === "scoreMetricId" ? sortDirection : "asc"
                }
                onClick={() => onSort("scoreMetricId")}
              >
                شناسه معیار
              </TableSortLabel>
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              <TableSortLabel
                active={sortField === "score"}
                direction={sortField === "score" ? sortDirection : "asc"}
                onClick={() => onSort("score")}
              >
                امتیاز
              </TableSortLabel>
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              <TableSortLabel
                active={sortField === "computationDate"}
                direction={
                  sortField === "computationDate" ? sortDirection : "asc"
                }
                onClick={() => onSort("computationDate")}
              >
                تاریخ محاسبه
              </TableSortLabel>
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              <TableSortLabel
                active={sortField === "sendStatus"}
                direction={sortField === "sendStatus" ? sortDirection : "asc"}
                onClick={() => onSort("sendStatus")}
              >
                وضعیت ارسال
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                "&:nth-of-type(odd)": {
                  backgroundColor: "action.hover",
                },
                "&:hover": {
                  backgroundColor: "action.selected",
                },
              }}
            >
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                {row.customerId}
              </TableCell>
              <TableCell align="center">{row.scoreMetricId}</TableCell>
              <TableCell align="center">
                <Box
                  sx={{
                    display: "inline-block",
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    backgroundColor: "primary.light",
                    color: "primary.contrastText",
                    fontWeight: "bold",
                  }}
                >
                  {row.score}
                </Box>
              </TableCell>
              <TableCell align="center">
                {formatPersianDate(row.computationDate)}
              </TableCell>
              <TableCell align="center">
                <Chip
                  label={getStatusLabel(row.sendStatus)}
                  color={getStatusColor(row.sendStatus) as any}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data.length > 5 && onPageChange && onRowsPerPageChange && (
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

export default CustomerScoresTable;
