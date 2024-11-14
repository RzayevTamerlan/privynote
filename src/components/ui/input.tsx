import { forwardRef, InputHTMLAttributes, useState } from 'react';

import { cn } from "@/utils/cn";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    return (
      <div className="relative w-full">
        <input
          type={type === "password" && passwordVisible ? "text" : type}
          className={cn(
            "flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
            className,
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className={`absolute top-1/2 right-2 -translate-y-1/2 text-sm text-zinc-500 cursor-pointer hover:text-zinc-300 py-2 px-3 
            rounded-md transition-all duration-300`}
            onClick={() => setPasswordVisible((prev) => !prev)}
          >
            {passwordVisible ? "Hide" : "Show"}
          </button>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
