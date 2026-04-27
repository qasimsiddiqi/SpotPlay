interface RadioButtonProps {
  value: string;
  label: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}

/**
 * Accessible radio button with custom visuals matching project chips.
 */
const RadioButton = ({
  value,
  label,
  checked = false,
  onChange,
  className,
}: RadioButtonProps) => (
  <label
    className={`inline-flex items-center cursor-pointer rounded-full px-4 py-2 border text-sm font-medium gap-2 ${
      checked
        ? "border-blue-500 bg-[#FAFAFF]"
        : "border-gray-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
    } ${className || ""}`}
  >
    <input
      type="radio"
      value={value}
      checked={checked}
      onChange={() => onChange?.(value)}
      className="sr-only"
    />

    <span
      className={`w-4 h-4 rounded-full flex items-center justify-center ${
        checked
          ? "bg-white border border-blue-500"
          : "border border-gray-300 bg-white"
      }`}
    >
      {checked && <span className="w-2 h-2 rounded-full bg-blue-500" />}
    </span>

    <span>{label}</span>
  </label>
);

export default RadioButton;
