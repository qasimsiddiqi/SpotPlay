import { type ChangeEvent, useRef } from "react";
import DraggableMouseIcon from "../../assets/svg-icons/draggable-mouse-icon.svg";

interface TextAreaProps {
  name: string;
  value: string;
  label?: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  placeHolder?: string;
  rows?: number;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

/**
 * Reusable TextArea with draggable resize grip (vertical only)
 * Respects parent container boundaries (e.g., modal content)
 */
const TextArea = (props: TextAreaProps) => {
  const {
    name,
    value,
    label,
    autoComplete,
    required,
    className = "",
    placeHolder,
    disabled = false,
    rows = 4,
    onChange,
  } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle drag-to-resize (vertical only)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!textareaRef.current) return;

    const startY = e.clientY;
    const startHeight = textareaRef.current.offsetHeight;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!textareaRef.current) return;

      const newHeight = startHeight + (moveEvent.clientY - startY);
      textareaRef.current.style.height = `${Math.min(300, Math.max(100, newHeight))}px`;
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="relative w-full">
      {label && (
        <label className="block text-left text-sm font-medium text-gray-600 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        ref={textareaRef}
        id={name}
        name={name}
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
        value={value}
        onChange={onChange}
        placeholder={placeHolder || ""}
        rows={rows}
        className={`${className} w-full rounded-xl border border-gray-300 dark:border-gray-600 
          bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 
          px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500/30 
          focus:border-blue-300 transition-all resize-none
          placeholder:text-gray-400 dark:placeholder:text-gray-500`}
        style={{ resize: "none" }}
      />

      {/* Draggable Resize Grip */}
      <div
        className="absolute bottom-3 right-0 w-8 h-8 flex items-end justify-center cursor-ns-resize select-none outline-none"
        onMouseDown={handleMouseDown}
        role="slider"
        aria-valuenow={textareaRef.current?.offsetHeight || 100}
        aria-valuemin={100}
        aria-valuemax={300}
        aria-label="Resize text area vertically"
        tabIndex={0}
        onKeyDown={(e) => {
          if (!textareaRef.current) return;
          const currentHeight = textareaRef.current.offsetHeight;

          if (e.key === "ArrowUp") {
            e.preventDefault();
            const newH = Math.min(300, currentHeight + 20);
            textareaRef.current.style.height = `${newH}px`;
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            const newH = Math.max(100, currentHeight - 20);
            textareaRef.current.style.height = `${newH}px`;
          }
        }}
      >
        <DraggableMouseIcon />
      </div>
    </div>
  );
};

export default TextArea;
