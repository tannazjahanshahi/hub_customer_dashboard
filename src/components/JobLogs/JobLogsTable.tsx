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
  IconButton,
  TablePagination,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { JobExecutionLog } from "../../types";
import { formatPersianDate } from "../../utils/dateUtils";
import { RtlTablePaginationActions } from "../common/RTLPagination";

interface JobLogsTableProps {
  data: JobExecutionLog[];
  onViewDetails: (log: JobExecutionLog) => void;
  page?: number;
  rowsPerPage?: number;
  totalCount?: number;
  onPageChange?: (event: unknown, newPage: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const JobLogsTable: React.FC<JobLogsTableProps> = ({
  data,
  onViewDetails,
  page = 0,
  rowsPerPage = 5,
  onPageChange,
  totalCount,
  onRowsPerPageChange,
}) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "success";
      case "FAILED":
        return "error";
      case "RUNNING":
        return "info";
      default:
        return "default";
    }
  };

  const getDuration = (startTime: string, endTime?: string) => {
    if (!endTime) return "-";

    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffMs = end.getTime() - start.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);

    if (diffMinutes > 0) {
      return `${diffMinutes} دقیقه و ${diffSeconds % 60} ثانیه`;
    }
    return `${diffSeconds} ثانیه`;
  };

  if (data.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          هیچ گزارشی یافت نشد
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
              شناسه
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              نام Job
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              وضعیت
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              زمان شروع
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              زمان پایان
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              مدت زمان
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
                "&:nth-of-type(odd)": {
                  backgroundColor: "action.hover",
                },
                "&:hover": {
                  backgroundColor: "action.selected",
                },
              }}
            >
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                {row.jobName}
              </TableCell>
              <TableCell align="center">
                <Chip
                  label={getStatusLabel(row.status)}
                  color={getStatusColor(row.status) as any}
                  size="small"
                />
              </TableCell>
              <TableCell align="center">
                {formatPersianDate(row.startTime)}
              </TableCell>
              <TableCell align="center">
                {row.endTime ? formatPersianDate(row.endTime) : "-"}
              </TableCell>
              <TableCell align="center">
                {getDuration(row.startTime, row.endTime)}
              </TableCell>
              <TableCell align="center">
                <IconButton
                  color="primary"
                  onClick={() => onViewDetails(row)}
                  size="small"
                >
                  <Visibility />
                </IconButton>
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

export default JobLogsTable;
