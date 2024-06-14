import {
  render as rtlRender,
  RenderOptions,
} from '@testing-library/react';
import { AppProvider } from '../app/AppProvider';

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => rtlRender(ui, { wrapper: AppProvider, ...options });

export * from '@testing-library/react';
export { customRender as render };
