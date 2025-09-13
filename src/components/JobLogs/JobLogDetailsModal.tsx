import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Chip,
  Alert
} from '@mui/material';
import { JobExecutionLog } from '../../types';
import { formatPersianDate } from '../../utils/dateUtils';

interface JobLogDetailsModalProps {
  open: boolean;
  onClose: () => void;
  logData: JobExecutionLog | null;
}

const JobLogDetailsModal: React.FC<JobLogDetailsModalProps> = ({
  open,
  onClose,
  logData
}) => {
  if (!logData) return null;

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'SUCCESS': return 'موفق';
      case 'FAILED': return 'ناموفق';
      case 'RUNNING': return 'در حال اجرا';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS': return 'success';
      case 'FAILED': return 'error';
      case 'RUNNING': return 'info';
      default: return 'default';
    }
  };

  const getDuration = () => {
    if (!logData.endTime) return 'در حال اجرا';
    
    const start = new Date(logData.startTime);
    const end = new Date(logData.endTime);
    const diffMs = end.getTime() - start.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    
    if (diffMinutes > 0) {
      return `${diffMinutes} دقیقه و ${diffSeconds % 60} ثانیه`;
    }
    return `${diffSeconds} ثانیه`;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ direction: 'rtl', textAlign: 'right' }}>
        جزئیات گزارش پردازش
      </DialogTitle>
      <DialogContent sx={{ direction: 'rtl' }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 3, 
          mt: 2,
          textAlign: 'right'
        }}>
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              اطلاعات کلی
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
              gap: 2,
              textAlign: 'right'
            }}>
              <Box>
                <Typography variant="body2" color="text.secondary">شناسه:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {logData.id}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" color="text.secondary">نام Job:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {logData.jobName}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" color="text.secondary">وضعیت:</Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Chip
                    label={getStatusLabel(logData.status)}
                    color={getStatusColor(logData.status) as any}
                    size="small"
                  />
                </Box>
              </Box>
              
              <Box>
                <Typography variant="body2" color="text.secondary">مدت زمان اجرا:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {getDuration()}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              زمان‌بندی
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
              gap: 2,
              textAlign: 'right'
            }}>
              <Box>
                <Typography variant="body2" color="text.secondary">زمان شروع:</Typography>
                <Typography variant="body1">
                  {formatPersianDate(logData.startTime)}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" color="text.secondary">زمان پایان:</Typography>
                <Typography variant="body1">
                  {logData.endTime ? formatPersianDate(logData.endTime) : 'در حال اجرا'}
                </Typography>
              </Box>
            </Box>
          </Box>

          {logData.errorMessage && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                پیام خطا
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Alert severity="error">
                {logData.errorMessage}
              </Alert>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ direction: 'rtl' }}>
        <Button onClick={onClose} variant="contained">
          بستن
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobLogDetailsModal;


