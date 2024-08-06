import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { Spinner } from './Spinner';

import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-medium transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-active hover:bg-neutral-800',
        ghost: 'bg-transparent hover:bg-active',
        text: 'bg-transparent',
        outline:
          'bg-transparent outline outline-1 outline-gray hover:bg-active',
      },
      size: {
        default: 'h-10 rounded-lg px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-lg px-8',
        xlg: 'h-16 rounded-lg px-8',
        icon: 'size-9 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
      isLoading?: boolean;
      icon?: React.ReactNode;
    };

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    { className, variant, size, children, isLoading, icon, ...props },
    ref,
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading && <Spinner size="sm" className="text-current" />}
        {!isLoading && icon && <span>{icon}</span>}
        {children && <span>{children}</span>}
      </button>
    );
  },
);

Button.displayName = 'Button';
