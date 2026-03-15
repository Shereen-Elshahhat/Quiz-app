import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-lg w-[450px] p-6 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-gray-500"
        >
          ✕
        </button>

        {/* Title */}
        {title && (
          <h2 className="text-lg font-semibold mb-4">{title}</h2>
        )}

        {/* Content */}
        {children}

      </div>
    </div>
  );
}