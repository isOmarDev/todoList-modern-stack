import React from 'react';
import { Error } from './Error';
import { cn } from '../utils/cn';

export type InputProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    errorMsg?: string;
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, type, errorMsg, ...props }, ref) => {
    return (
      <div>
        <label>
          {label}

          <input
            className={cn(
              type === 'checkbox' &&
                'relative h-[25px] w-[25px] cursor-pointer appearance-none rounded-full border border-gray bg-charcoal align-bottom before:absolute before:left-2/4 before:top-2/4 before:h-1.5 before:w-3 before:-translate-x-2/4 before:-translate-y-2/4 before:-rotate-45 before:border-2 before:border-r-0 before:border-t-0 before:border-charcoal before:opacity-0 checked:border-green-400 checked:bg-green-400 checked:opacity-100 before:checked:opacity-100',
              type === 'text' &&
                'w-full rounded-lg bg-gray px-[15px] py-[20px] text-base font-medium outline-0 transition duration-150 ease-in-out placeholder:font-normal hover:bg-slate',
              errorMsg && 'outline outline-2 outline-red-500',
              className,
            )}
            type={type}
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
