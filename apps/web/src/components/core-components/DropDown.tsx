import React, { useState, useRef, useEffect } from "react";

interface Option {
  value: string | number;
  label: string;
}

interface DropDownProps {
  name: string;
  label: string;
  value: string | number;
  options: Option[];
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  startIcon?: React.ReactNode;
}

/**
 * Reusable dropdown/select component with dark mode and accessible styling.
 *
 * Supports custom options array and optional placeholder text.
 *
 * @param props - Component props
 * @returns JSX.Element
 *
 * @example
 * ```tsx
 * <DropDown
 *   name="gender"
 *   value={gender}
 *   options={[
 *     { value: "1", label: "Male" },
 *     { value: "2", label: "Female" },
 *   ]}
 *   placeholder="Select gender"
 *   onChange={handleChange}
 * />
 * ```
 */
const DropDown: React.FC<DropDownProps> = ({
  name,
  label,
  value,
  options,
  required = false,
  error,
  disabled = false,
  className = "",
  placeholder = "Select an option...",
  startIcon,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((!disabled && e.key === "Enter") || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === "ArrowDown" && !isOpen && !disabled) {
      e.preventDefault();
      setIsOpen(true);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  const handleOptionSelect = (optionValue: string | number) => {
    // Simulate native select change event
    const fakeEvent = {
      target: { name, value: optionValue },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange(fakeEvent);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  const baseClasses = `${className} w-full rounded-xl border ${error ? "border-red-500" : "border-gray-300"} ${disabled ? "bg-gray-100" : "bg-white"} dark:border-gray-600 dark:bg-gray-900 px-4 py-2 flex gap-2 items-center justify-between focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500 transition-all ${disabled ? "cursor-not-allowed" : "cursor-pointer"} min-h-10`;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-left text-sm font-medium text-gray-600 mb-1.5">
          {label}
        </label>
      )}
      {/* Hidden native select for form submission & accessibility */}
      <select
        id={name}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        tabIndex={-1}
        className="sr-only"
      >
        <option value="" disabled={required}>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Custom Trigger */}
      <div
        ref={triggerRef}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={`listbox-${name}`}
        tabIndex={0}
        onClick={() => {
          if (!disabled) {
            setIsOpen(!isOpen);
          }
        }}
        onKeyDown={handleKeyDown}
        className={baseClasses}
      >
        {startIcon && <div className="w-5 h-5">{startIcon}</div>}
        <span
          className={
            !selectedOption
              ? "text-gray-400 dark:text-gray-500"
              : "text-gray-900 dark:text-gray-100"
          }
        >
          {displayText}
        </span>
        <svg
          className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Custom Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute z-50 w-full mt-1 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto"
          role="listbox"
          id={`listbox-${name}`}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isHighlighted = highlightedIndex === index;

            return (
              <button
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => handleOptionSelect(option.value)}
                className={`w-full text-left px-4 py-2 cursor-pointer select-none transition-colors ${
                  isSelected
                    ? "bg-blue-500/10 dark:bg-blue-500/20 font-medium"
                    : ""
                } ${
                  isHighlighted
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <span className="text-gray-900 dark:text-gray-100">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
      {error && (
        <div className="mt-1.5 text-left text-sm text-red-600">{error}</div>
      )}
    </div>
  );
};

export default DropDown;
