import React from 'react';
import { Error } from './Error';
import { cn } from '../utils/cn';

export type InputProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    errorMsg?: string;
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, errorMsg, ...props }, ref) => {
    return (
      <div>
        <label>
          {label}

          <input
            className={cn(
              'w-full rounded-[7px] bg-gray px-[15px] py-[20px] text-base outline-0 transition duration-150 ease-in-out hover:bg-slate',
              errorMsg && 'outline outline-2 outline-red-500',
              className,
            )}
            ref={ref}
            {...props}
          />
        </label>

        <Error errorMsg={errorMsg} />
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
