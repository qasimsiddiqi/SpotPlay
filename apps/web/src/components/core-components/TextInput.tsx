import React, { forwardRef, type InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      containerClassName,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <label className="block text-left text-sm font-medium text-gray-600 mb-1.5">
            {label}
          </label>
        )}

        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={`
              w-full px-4 py-2 rounded-xl border border-gray-300
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200,
              transition-all duration-200,
              placeholder:text-gray-400 text-gray-900,
              ${leftIcon && "pl-11"},
              ${rightIcon && "pr-11"},
              ${error && "border-red-500 focus:border-red-500 focus:ring-red-200"},
              ${className}
            `}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-1.5 text-left text-sm text-red-600">{error}</div>
        )}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
