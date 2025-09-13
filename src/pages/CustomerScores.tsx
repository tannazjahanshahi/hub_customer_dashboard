import React, { useState, useEffect, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import CustomerScoresTable from "../components/CustomerScores/CustomerScoresTable";
import CustomerScoresFilters from "../components/CustomerScores/CustomerScoresFilters";
import Loading from "../components/common/Loading";
import { CustomerScore } from "../types";

// Mock data for demonstration
const mockData: CustomerScore[] = [
  {
    id: 101,
    customerId: "CUST12345",
    scoreMetricId: 1,
    score: 85,
    computationDate: "2025-06-10T12:00:00Z",
    sendStatus: "SENT",
  },
  {
    id: 102,
    customerId: "CUST67890",
    scoreMetricId: 2,
    score: 72,
    computationDate: "2025-06-11T10:30:00Z",
    sendStatus: "FAILED",
  },
  {
    id: 103,
    customerId: "CUST11111",
    scoreMetricId: 1,
    score: 95,
    computationDate: "2025-06-12T14:15:00Z",
    sendStatus: "PENDING",
  },
  {
    id: 104,
    customerId: "CUST22222",
    scoreMetricId: 3,
    score: 63,
    computationDate: "2025-06-13T08:45:00Z",
    sendStatus: "SENT",
  },
  {
    id: 105,
    customerId: "CUST33333",
    scoreMetricId: 2,
    score: 88,
    computationDate: "2025-06-14T16:20:00Z",
    sendStatus: "SENT",
  },
];

const CustomerScores: React.FC = () => {
  const [data, setData] = useState<CustomerScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMetricId, setSelectedMetricId] = useState<number | "">("");
  const [sortField, setSortField] = useState<keyof CustomerScore>("computationDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const availableMetricIds = useMemo(() => {
    return Array.from(new Set(data.map((item) => item.scoreMetricId))).sort();
  }, [data]);

  const filteredAndSortedData = useMemo(() => {
    let filtered = data;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((item) => item.customerId.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Apply metric ID filter
    if (selectedMetricId !== "") {
      filtered = filtered.filter((item) => item.scoreMetricId === selectedMetricId);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle date sorting
      if (sortField === "computationDate") {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [data, searchTerm, selectedMetricId, sortField, sortDirection]);

  const handleSort = (field: keyof CustomerScore) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedMetricId("");
  };

  if (loading) {
    return <Loading message="در حال بارگذاری امتیازات مشتریان..." />;
  }

  return (
    <Box sx={{ direction: "rtl" }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 3, textAlign: "left" }}>
        امتیاز مشتریان
      </Typography>

      <CustomerScoresFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedMetricId={selectedMetricId}
        onMetricIdChange={setSelectedMetricId}
        availableMetricIds={availableMetricIds}
        onClearFilters={handleClearFilters}
      />

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          نمایش {filteredAndSortedData.length} نتیجه از {data.length} امتیاز
        </Typography>
      </Box>

      <CustomerScoresTable
        data={filteredAndSortedData}
        onSort={handleSort}
        sortField={sortField}
        sortDirection={sortDirection} totalCount={0}      />
    </Box>
  );
};

export default CustomerScores;
