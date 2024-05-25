import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch = useAppDispatch.withTypes<AppDispatch>();
export const useSelector = useAppSelector.withTypes<RootState>();
