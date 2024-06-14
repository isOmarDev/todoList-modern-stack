import SpinnerIcon from '@/assets/spinner.svg?react';
import { cn } from '@/utils/cn';

const sizes = {
  default: 'size-6',
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-16 w-16',
  xl: 'h-24 w-24',
};

const variants = {
  light: 'text-white',
  primary: 'text-slate-600',
};

export type SpinnerProps = {
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  className?: string;
};

export const Spinner = ({
  size = 'default',
  variant = 'primary',
  className = '',
}: SpinnerProps) => {
  return (
    <SpinnerIcon
      className={cn(sizes[size], variants[variant], className)}
    />
  );
};
