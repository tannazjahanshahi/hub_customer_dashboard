import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert
} from '@mui/material';
import { ScoreMetric, ScoreMetricFormData } from '../../types';

interface ScoreMetricFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ScoreMetricFormData) => void;
  editData?: ScoreMetric | null;
}

const ScoreMetricForm: React.FC<ScoreMetricFormProps> = ({
  open,
  onClose,
  onSubmit,
  editData
}) => {
  const [formData, setFormData] = useState<ScoreMetricFormData>({
    name: '',
    scheduleType: 'MONTHLY',
    calculationFormula: ''
  });
  const [errors, setErrors] = useState<Partial<ScoreMetricFormData>>({});

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        scheduleType: editData.scheduleType,
        calculationFormula: editData.calculationFormula
      });
    } else {
      setFormData({
        name: '',
        scheduleType: 'MONTHLY',
        calculationFormula: ''
      });
    }
    setErrors({});
  }, [editData, open]);

  const validateForm = (): boolean => {
    const newErrors: Partial<ScoreMetricFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'نام معیار الزامی است';
    }

    if (!formData.calculationFormula.trim()) {
      newErrors.calculationFormula = 'فرمول محاسبه الزامی است';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleInputChange = (field: keyof ScoreMetricFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
    >
      <DialogTitle sx={{ direction: 'rtl' }}>
        {editData ? 'ویرایش معیار امتیازدهی' : 'افزودن معیار امتیازدهی جدید'}
      </DialogTitle>
      <DialogContent sx={{ direction: 'rtl' }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: { xs: 2, md: 3 }, 
          mt: 2,
          '& .MuiTextField-root': {
            direction: 'rtl'
          },
          '& .MuiFormControl-root': {
            direction: 'rtl'
          },
          '& .MuiInputLabel-root': {
            right: 14,
            left: 'auto',
            transformOrigin: 'top right',
            '&.MuiInputLabel-shrunk': {
              transform: 'translate(-14px, -9px) scale(0.75)',
              right: 14,
              left: 'auto'
            }
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              textAlign: 'right'
            }
          }
        }}>
          <TextField
            fullWidth
            label="نام معیار"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            placeholder="مثال: تراکنش‌های ماهانه"
          />

          <FormControl fullWidth error={!!errors.scheduleType}>
            <InputLabel>نوع زمان‌بندی</InputLabel>
            <Select
              value={formData.scheduleType}
              label="نوع زمان‌بندی"
              onChange={(e) => handleInputChange('scheduleType', e.target.value)}
            >
              <MenuItem value="DAILY">روزانه</MenuItem>
              <MenuItem value="MONTHLY">ماهانه</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="فرمول محاسبه"
            value={formData.calculationFormula}
            onChange={(e) => handleInputChange('calculationFormula', e.target.value)}
            error={!!errors.calculationFormula}
            helperText={errors.calculationFormula || 'مثال: COUNT(transactions) / 10'}
            placeholder="COUNT(transactions) / 10"
          />

          {Object.keys(errors).length > 0 && (
            <Alert severity="error">
              لطفاً تمام فیلدهای الزامی را پر کنید
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ direction: 'rtl', gap: 1 }}>
        <Button onClick={onClose} color="inherit">
          انصراف
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {editData ? 'ویرایش' : 'افزودن'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScoreMetricForm;
