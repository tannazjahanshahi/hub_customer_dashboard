import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { ScoreMetric } from '../../types';
import { AppProvider, useAppContext } from '../AppContext';

// Test component that uses the context
const TestComponent: React.FC = () => {
  const {
    state,
    addScoreMetric,
    updateScoreMetric,
    deleteScoreMetric,
    setLoading,
    setPagination,
  } = useAppContext();

  return (
    <div>
      <div data-testid="score-metrics-count">{state.scoreMetrics.length}</div>
      <div data-testid="loading-status">
        {state.loading.scoreMetrics ? 'loading' : 'not-loading'}
      </div>
      <div data-testid="current-page">{state.pagination.scoreMetrics.page}</div>
      <div data-testid="rows-per-page">{state.pagination.scoreMetrics.rowsPerPage}</div>
      
      <button
        data-testid="add-metric"
        onClick={() =>
          addScoreMetric({
            name: 'تست معیار',
            scheduleType: 'MONTHLY',
            calculationFormula: 'COUNT(*) / 10',
            createdAt: new Date().toISOString(),
          })
        }
      >
        Add Metric
      </button>
      
      <button
        data-testid="set-loading"
        onClick={() => setLoading('scoreMetrics', true)}
      >
        Set Loading
      </button>
      
      <button
        data-testid="set-pagination"
        onClick={() => setPagination('scoreMetrics', 2, 25)}
      >
        Set Pagination
      </button>
      
      {state.scoreMetrics.map((metric) => (
        <div key={metric.id}>
          <span data-testid={`metric-${metric.id}`}>{metric.name}</span>
          <button
            data-testid={`update-${metric.id}`}
            onClick={() =>
              updateScoreMetric({ ...metric, name: 'معیار بروزرسانی شده' })
            }
          >
            Update
          </button>
          <button
            data-testid={`delete-${metric.id}`}
            onClick={() => deleteScoreMetric(metric.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

describe('AppContext', () => {
  it('provides initial state correctly', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId('score-metrics-count')).toHaveTextContent('0');
    expect(screen.getByTestId('loading-status')).toHaveTextContent('not-loading');
    expect(screen.getByTestId('current-page')).toHaveTextContent('0');
    expect(screen.getByTestId('rows-per-page')).toHaveTextContent('5');
  });

  it('adds score metric correctly', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    act(() => {
      screen.getByTestId('add-metric').click();
    });

    expect(screen.getByTestId('score-metrics-count')).toHaveTextContent('1');
    expect(screen.getByTestId('metric-1')).toHaveTextContent('تست معیار');
  });

  it('updates score metric correctly', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    // First add a metric
    act(() => {
      screen.getByTestId('add-metric').click();
    });

    // Then update it
    act(() => {
      screen.getByTestId('update-1').click();
    });

    expect(screen.getByTestId('metric-1')).toHaveTextContent('معیار بروزرسانی شده');
  });

  it('deletes score metric correctly', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    // First add a metric
    act(() => {
      screen.getByTestId('add-metric').click();
    });

    expect(screen.getByTestId('score-metrics-count')).toHaveTextContent('1');

    // Then delete it
    act(() => {
      screen.getByTestId('delete-1').click();
    });

    expect(screen.getByTestId('score-metrics-count')).toHaveTextContent('0');
  });

  it('sets loading state correctly', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    act(() => {
      screen.getByTestId('set-loading').click();
    });

    expect(screen.getByTestId('loading-status')).toHaveTextContent('loading');
  });

  it('sets pagination correctly', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    act(() => {
      screen.getByTestId('set-pagination').click();
    });

    expect(screen.getByTestId('current-page')).toHaveTextContent('2');
    expect(screen.getByTestId('rows-per-page')).toHaveTextContent('25');
  });

  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAppContext must be used within an AppProvider');

    consoleSpy.mockRestore();
  });

  it('generates correct IDs for new metrics', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    // Add first metric
    act(() => {
      screen.getByTestId('add-metric').click();
    });

    expect(screen.getByTestId('metric-1')).toBeInTheDocument();

    // Add second metric
    act(() => {
      screen.getByTestId('add-metric').click();
    });

    expect(screen.getByTestId('metric-2')).toBeInTheDocument();
    expect(screen.getByTestId('score-metrics-count')).toHaveTextContent('2');
  });
});
