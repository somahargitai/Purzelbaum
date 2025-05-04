import { forwardRef } from 'react';
import { cn } from '../lib/utils';

const Button = forwardRef(({ className, variant = 'primary', size = 'default', children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden rounded-xl font-medium transition-all duration-300',
        'before:absolute before:inset-0 before:-z-10 before:transition-transform before:duration-300',
        {
          // Primary variant
          'border-2 border-gray-300 bg-gradient-to-br from-[#5a436b] to-[#4a3360] shadow-lg shadow-[#5b3f71]/30':
            variant === 'primary',
          'hover:border-gray-100 hover:shadow-l hover:shadow-[#5b3f71]/40 active:scale-[0.98]': variant === 'primary',
          'before:bg-gradient-to-br before:from-[#6b4f81] before:to-[#5a4370] before:hover:scale-110':
            variant === 'primary',
          
          // Secondary variant
          'border-2 border-gray-300 bg-gradient-to-br from-[#242424] to-[#1a1a1a] shadow-lg shadow-black/20':
            variant === 'secondary',
          'hover:border-gray-100 hover:shadow-l hover:shadow-black/30 active:scale-[0.98]': variant === 'secondary',
          'before:bg-gradient-to-br before:from-[#2a2a2a] before:to-[#202020] before:hover:scale-110':
            variant === 'secondary',
          
          // Sizes
          'h-9 px-4 text-sm': size === 'default',
          'h-8 px-3 text-xs': size === 'sm',
          'h-11 px-6 text-base': size === 'lg',
        },
        'disabled:pointer-events-none disabled:opacity-50',
        'focus:ring-2 focus:ring-[#5b3f71]/50 focus:ring-offset-0 focus:outline-none',
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 text-gray-300 group-hover:text-gray-100">
        {children}
      </span>
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
