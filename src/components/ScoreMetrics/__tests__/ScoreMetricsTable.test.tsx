import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ScoreMetricsTable from '../ScoreMetricsTable';
import { ScoreMetric } from '../../../types';

const mockData: ScoreMetric[] = [
  {
      id: 1, name: 'تراکنش‌های ماهانه', scheduleType: 'DAILY', createdAt: '1404/03/20 17:00',
      calculationFormula: ''
  },
  {
      id: 2, name: 'موجودی حساب روزانه', scheduleType: 'MONTHLY', createdAt: '1404/03/21 21:30',
      calculationFormula: ''
  },
];

describe('ScoreMetricsTable', () => {
  it('renders table with correct data', () => {
    render(<ScoreMetricsTable data={mockData} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('تراکنش‌های ماهانه')).toBeInTheDocument();
    expect(screen.getByText('موجودی حساب روزانه')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const mockOnEdit = jest.fn();
    render(<ScoreMetricsTable data={mockData} onEdit={mockOnEdit} onDelete={() => {}} />);
    const editButtons = screen.getAllByTestId('EditIcon');
    fireEvent.click(editButtons[0]);
    expect(mockOnEdit).toHaveBeenCalledWith(mockData[0]);
  });

  it('calls onDelete when delete button is clicked', () => {
    const mockOnDelete = jest.fn();
    render(<ScoreMetricsTable data={mockData} onEdit={() => {}} onDelete={mockOnDelete} />);
    const deleteButtons = screen.getAllByTestId('DeleteIcon');
    fireEvent.click(deleteButtons[0]);
    expect(mockOnDelete).toHaveBeenCalledWith(mockData[0].id);
  });
});
