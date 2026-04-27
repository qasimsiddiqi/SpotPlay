import React, { createContext, useContext, type ReactNode } from "react";

interface ModalContextType {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal sub-components must be used within a Modal");
  }
  return context;
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  bgBlur?: boolean;
}

const Modal: React.FC<ModalProps> & {
  Header: React.FC<{ children: ReactNode }>;
  Content: React.FC<{ children: ReactNode; contentClassName?: string }>;
  Footer: React.FC<{ children: ReactNode }>;
} = ({ isOpen, onClose, children, className, bgBlur = true }) => {
  if (!isOpen) return null;

  return (
    <ModalContext.Provider value={{ isOpen, onClose }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <button
          className={`absolute inset-0 bg-black/30 ${bgBlur && "backdrop-blur-xs"}`}
          onClick={onClose}
          aria-label="Close modal"
        />

        {/* Modal Panel - Flex column layout for proper scrolling */}
        <div
          className={`${className} relative max-w-lg rounded-lg bg-white shadow-2xl flex flex-col min-w-152 max-h-[90vh]`}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
};

// Header - Fixed at top
const Header: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { onClose } = useModal();

  return (
    <div className="flex items-center justify-between rounded-t-lg border-b border-b-border-outline-low-em px-6 py-4 shrink-0">
      <h4 className="text-lg font-semibold text-gray-900">{children}</h4>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        aria-label="Close modal"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

// Content - Scrollable area
const Content: React.FC<{ children: ReactNode; contentClassName?: string }> = ({
  children,
  contentClassName,
}) => (
  <div
    className={`${contentClassName} px-6 py-4 text-gray-700 overflow-y-auto flex-1`}
  >
    {children}
  </div>
);

// Footer - Fixed at bottom
const Footer: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex justify-end gap-3 rounded-b-lg border-t border-border-primary px-6 py-4 shrink-0">
    {children}
  </div>
);

// Attach sub-components
Modal.Header = Header;
Modal.Content = Content;
Modal.Footer = Footer;

export default Modal;
