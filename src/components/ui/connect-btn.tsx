'use client';

import { cn } from '@utils/cn';
import { useInView } from 'framer-motion';
import type { FC, HTMLAttributes, ReactNode } from 'react';
import { useRef } from 'react';

interface ConnectBtnProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
}

const ConnectBtn: FC<ConnectBtnProps> = ({ onClick, children, className, icon, ...props }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <button
      ref={ref}
      onClick={onClick}
      {...props}
      className={cn(
        "dark:bg-slate-800 bg-white no-underline group cursor-pointer relative dark:shadow-2xl dark:shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block transition-all duration-700 overflow-hidden",
        isInView ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-10 invisible",
        className,
      )}
    >
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span
          className={`absolute inset-0 rounded-full 
            bg-[image:radial-gradient(150%_150%_at_50%_50%,rgba(56,189,248,0.8)_0%,rgba(56,189,248,0.6)_90%,rgba(56,189,248,0)_100%)]
            dark:bg-[image:radial-gradient(90%_90%_at_50%_50%,rgba(56,189,248,0.8)_0%,rgba(56,189,248,0.2)_70%,rgba(56,189,248,0)_100%)] 
            transition-all duration-700 ease-in-out hover:opacity-80`}
          style={{ opacity: isInView ? 1 : 0 }}
        ></span>
      </span>
      <div
        className="relative flex space-x-2 items-center z-10 rounded-full bg-white dark:bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10"
      >
        {children}
        {icon}
      </div>
      <span
        className="absolute -bottom-0.5 left-[1.125rem] h-px w-[calc(100%-2.25rem)]
        bg-gradient-to-r from-emerald-400/0 via-emerald-400/80 to-emerald-400/0
        transition-opacity duration-500 group-hover:opacity-60"
      ></span>
    </button>
  );
};

export { ConnectBtn };
