import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string; // Optional extra classes for customization
}

const Card = ({ children, className = "" }: CardProps) => (
  <div
    className={`rounded-xl bg-white border border-[#ECECEC] p-6 ${className}`}
  >
    {children}
  </div>
);

export default Card;
