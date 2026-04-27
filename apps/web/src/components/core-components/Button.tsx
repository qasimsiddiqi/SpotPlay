/**
 * Button component props
 */
interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  color?: string;
  className?: string;
  children: React.ReactNode;
  startIcon?: React.ReactNode;
}

/**
 * Reusable button component with loading state and consistent styling.
 *
 * Features dark mode support, hover effects, focus states, and optional loading spinner.
 *
 * @param props - Component props
 * @returns JSX.Element
 *
 * @example
 * ```tsx
 * <Button type="submit" loading={isLoading}>
 *   Sign In
 * </Button>
 * ```
 */
const Button = ({
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  className,
  children,
  startIcon,
}: ButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`${className} cursor-pointer rounded-full px-4 py-2 bg-[#16a349] hover:bg-[#16a349] text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
  >
    {loading ? (
      <>
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        <span className="whitespace-nowrap">{children}</span>
      </>
    ) : (
      <>
        {/* Start Icon - only shown when not loading */}
        {startIcon && (
          <span className="flex items-center justify-center opacity-90">
            {startIcon}
          </span>
        )}

        {/* Button text/content */}
        <span className="whitespace-nowrap">{children}</span>
      </>
    )}
  </button>
);

export default Button;
