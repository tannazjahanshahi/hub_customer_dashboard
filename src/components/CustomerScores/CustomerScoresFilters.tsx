import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

interface CustomerScoresFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedMetricId: number | '';
  onMetricIdChange: (value: number | '') => void;
  availableMetricIds: number[];
  onClearFilters: () => void;
}

const CustomerScoresFilters: React.FC<CustomerScoresFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedMetricId,
  onMetricIdChange,
  availableMetricIds,
  onClearFilters
}) => {
  return (
    <Paper sx={{ p: 3, mb: 3, direction: 'rtl' }}>
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        alignItems: 'center', 
        flexWrap: 'wrap',
        direction: 'rtl',
        '& .MuiTextField-root': {
          direction: 'rtl'
        },
        '& .MuiFormControl-root': {
          direction: 'rtl'
        }
      }}>
        <TextField
          label="جستجو بر اساس شناسه مشتری"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="CUST12345"
          sx={{ minWidth: 250 }}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
          }}
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>فیلتر بر اساس معیار</InputLabel>
          <Select
            value={selectedMetricId}
            label="فیلتر بر اساس معیار"
            onChange={(e) => onMetricIdChange(e.target.value as number | '')}
          >
            <MenuItem value="">همه معیارها</MenuItem>
            {availableMetricIds.map(id => (
              <MenuItem key={id} value={id}>معیار {id}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          onClick={onClearFilters}
          startIcon={<Clear />}
          sx={{ height: 'fit-content' }}
        >
          پاک کردن فیلترها
        </Button>
      </Box>
    </Paper>
  );
};

export default CustomerScoresFilters;


