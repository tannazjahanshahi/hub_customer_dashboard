import {
  formatPersianDate,
  formatPersianDateShort,
  getCurrentPersianDate,
} from '../dateUtils';

describe('dateUtils', () => {
  describe('formatPersianDate', () => {
    it('formats ISO date string to Persian date with time', () => {
      const isoDate = '2025-06-10T13:30:00Z';
      const result = formatPersianDate(isoDate);
      
      // حالا فقط تا دقیقه رو چک می‌کنیم (بدون ثانیه)
      expect(result).toMatch(/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/);
      expect(result).toContain('1404'); // Persian year
    });

    it('formats Date object to Persian date with time', () => {
      const date = new Date('2025-06-10T13:30:00Z');
      const result = formatPersianDate(date);
      
      expect(result).toMatch(/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/);
      expect(result).toContain('1404'); // Persian year
    });
  });

  describe('formatPersianDateShort', () => {
    it('formats ISO date string to Persian date without time', () => {
      const isoDate = '2025-06-10T13:30:00Z';
      const result = formatPersianDateShort(isoDate);
      
      // Check if result contains Persian date format without time
      expect(result).toMatch(/^\d{4}\/\d{2}\/\d{2}$/);
      expect(result).toContain('1404'); // Persian year
      expect(result).not.toContain(':'); // Should not contain time
    });

    it('formats Date object to Persian date without time', () => {
      const date = new Date('2025-06-10T13:30:00Z');
      const result = formatPersianDateShort(date);
      
      expect(result).toMatch(/^\d{4}\/\d{2}\/\d{2}$/);
      expect(result).toContain('1404'); // Persian year
      expect(result).not.toContain(':'); // Should not contain time
    });
  });

  describe('getCurrentPersianDate', () => {
    it('returns current Persian date with time', () => {
      const result = getCurrentPersianDate();
      
      // تغییر به دقیقه (بدون ثانیه)
      expect(result).toMatch(/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/);
      
      // Should be a recent date (Persian year should be around 1403-1404)
      expect(result).toMatch(/^140[34]/);
    });
  });

  describe('date consistency', () => {
    it('same input produces same output', () => {
      const isoDate = '2025-06-10T13:30:00Z';
      const result1 = formatPersianDate(isoDate);
      const result2 = formatPersianDate(isoDate);
      
      expect(result1).toBe(result2);
    });

    it('short format is subset of full format', () => {
      const isoDate = '2025-06-10T13:30:00Z';
      const fullFormat = formatPersianDate(isoDate);
      const shortFormat = formatPersianDateShort(isoDate);
      
      // Short format should be the date part of full format
      expect(fullFormat).toContain(shortFormat);
      expect(fullFormat.split(' ')[0]).toBe(shortFormat);
    });
  });

  describe('edge cases', () => {
    it('handles different time zones', () => {
      const date1 = '2025-06-10T00:00:00Z';
      const date2 = '2025-06-10T23:59:59Z';
      
      const result1 = formatPersianDateShort(date1);
      const result2 = formatPersianDateShort(date2);
      
      // Both should be valid Persian dates
      expect(result1).toMatch(/^\d{4}\/\d{2}\/\d{2}$/);
      expect(result2).toMatch(/^\d{4}\/\d{2}\/\d{2}$/);
    });

    it('handles leap years', () => {
      // Test a date that might be affected by leap year calculations
      const leapYearDate = '2024-02-29T12:00:00Z';
      const result = formatPersianDate(leapYearDate);
      
      // باز هم فقط تا دقیقه
      expect(result).toMatch(/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/);
      expect(result).toContain('1402'); // Persian year for 2024
    });
  });
});
