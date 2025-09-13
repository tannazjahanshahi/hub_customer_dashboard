import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ScoreMetric, CustomerScore, JobExecutionLog } from '../types';

// Types for the context state
interface AppState {
  scoreMetrics: ScoreMetric[];
  customerScores: CustomerScore[];
  jobLogs: JobExecutionLog[];
  loading: {
    scoreMetrics: boolean;
    customerScores: boolean;
    jobLogs: boolean;
  };
  filters: {
    customerScores: {
      customerId: string;
      scoreMetricId: string;
    };
    jobLogs: {
      status: string;
    };
  };
  pagination: {
    scoreMetrics: { page: number; rowsPerPage: number };
    customerScores: { page: number; rowsPerPage: number };
    jobLogs: { page: number; rowsPerPage: number };
  };
}

// Action types
type AppAction =
  | { type: 'SET_SCORE_METRICS'; payload: ScoreMetric[] }
  | { type: 'ADD_SCORE_METRIC'; payload: ScoreMetric }
  | { type: 'UPDATE_SCORE_METRIC'; payload: ScoreMetric }
  | { type: 'DELETE_SCORE_METRIC'; payload: number }
  | { type: 'SET_CUSTOMER_SCORES'; payload: CustomerScore[] }
  | { type: 'SET_JOB_LOGS'; payload: JobExecutionLog[] }
  | { type: 'SET_LOADING'; payload: { section: keyof AppState['loading']; loading: boolean } }
  | { type: 'SET_CUSTOMER_SCORES_FILTER'; payload: Partial<AppState['filters']['customerScores']> }
  | { type: 'SET_JOB_LOGS_FILTER'; payload: Partial<AppState['filters']['jobLogs']> }
  | { type: 'SET_PAGINATION'; payload: { section: keyof AppState['pagination']; page?: number; rowsPerPage?: number } };

// Initial state
const initialState: AppState = {
  scoreMetrics: [],
  customerScores: [],
  jobLogs: [],
  loading: {
    scoreMetrics: false,
    customerScores: false,
    jobLogs: false,
  },
  filters: {
    customerScores: {
      customerId: '',
      scoreMetricId: '',
    },
    jobLogs: {
      status: '',
    },
  },
  pagination: {
    scoreMetrics: { page: 0, rowsPerPage: 5 },
    customerScores: { page: 0, rowsPerPage: 5 },
    jobLogs: { page: 0, rowsPerPage: 5 },
  },
};

// Reducer function
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_SCORE_METRICS':
      return { ...state, scoreMetrics: action.payload };
    
    case 'ADD_SCORE_METRIC':
      return { ...state, scoreMetrics: [...state.scoreMetrics, action.payload] };
    
    case 'UPDATE_SCORE_METRIC':
      return {
        ...state,
        scoreMetrics: state.scoreMetrics.map(metric =>
          metric.id === action.payload.id ? action.payload : metric
        ),
      };
    
    case 'DELETE_SCORE_METRIC':
      return {
        ...state,
        scoreMetrics: state.scoreMetrics.filter(metric => metric.id !== action.payload),
      };
    
    case 'SET_CUSTOMER_SCORES':
      return { ...state, customerScores: action.payload };
    
    case 'SET_JOB_LOGS':
      return { ...state, jobLogs: action.payload };
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: { ...state.loading, [action.payload.section]: action.payload.loading },
      };
    
    case 'SET_CUSTOMER_SCORES_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          customerScores: { ...state.filters.customerScores, ...action.payload },
        },
      };
    
    case 'SET_JOB_LOGS_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          jobLogs: { ...state.filters.jobLogs, ...action.payload },
        },
      };
    
    case 'SET_PAGINATION':
      return {
        ...state,
        pagination: {
          ...state.pagination,
          [action.payload.section]: {
            ...state.pagination[action.payload.section],
            ...(action.payload.page !== undefined && { page: action.payload.page }),
            ...(action.payload.rowsPerPage !== undefined && { rowsPerPage: action.payload.rowsPerPage }),
          },
        },
      };
    
    default:
      return state;
  }
};

// Context type
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Helper functions
  addScoreMetric: (metric: Omit<ScoreMetric, 'id'>) => void;
  updateScoreMetric: (metric: ScoreMetric) => void;
  deleteScoreMetric: (id: number) => void;
  setLoading: (section: keyof AppState['loading'], loading: boolean) => void;
  setCustomerScoresFilter: (filter: Partial<AppState['filters']['customerScores']>) => void;
  setJobLogsFilter: (filter: Partial<AppState['filters']['jobLogs']>) => void;
  setPagination: (section: keyof AppState['pagination'], page?: number, rowsPerPage?: number) => void;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Helper functions
  const addScoreMetric = (metric: Omit<ScoreMetric, 'id'>) => {
    const newMetric: ScoreMetric = {
      ...metric,
      id: Math.max(...state.scoreMetrics.map(m => m.id), 0) + 1,
    };
    dispatch({ type: 'ADD_SCORE_METRIC', payload: newMetric });
  };

  const updateScoreMetric = (metric: ScoreMetric) => {
    dispatch({ type: 'UPDATE_SCORE_METRIC', payload: metric });
  };

  const deleteScoreMetric = (id: number) => {
    dispatch({ type: 'DELETE_SCORE_METRIC', payload: id });
  };

  const setLoading = (section: keyof AppState['loading'], loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: { section, loading } });
  };

  const setCustomerScoresFilter = (filter: Partial<AppState['filters']['customerScores']>) => {
    dispatch({ type: 'SET_CUSTOMER_SCORES_FILTER', payload: filter });
  };

  const setJobLogsFilter = (filter: Partial<AppState['filters']['jobLogs']>) => {
    dispatch({ type: 'SET_JOB_LOGS_FILTER', payload: filter });
  };

  const setPagination = (section: keyof AppState['pagination'], page?: number, rowsPerPage?: number) => {
    dispatch({ type: 'SET_PAGINATION', payload: { section, page, rowsPerPage } });
  };

  const contextValue: AppContextType = {
    state,
    dispatch,
    addScoreMetric,
    updateScoreMetric,
    deleteScoreMetric,
    setLoading,
    setCustomerScoresFilter,
    setJobLogsFilter,
    setPagination,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

// Hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
