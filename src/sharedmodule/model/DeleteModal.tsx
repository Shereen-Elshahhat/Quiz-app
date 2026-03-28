import { FaTimes, FaExclamationCircle } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  loading:boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure you want to delete this?",
  description = "",
  loading,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
        disabled={loading}
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-white"
        >
          <FaTimes className="h-4 w-4" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <FaExclamationCircle className="text-gray-400 dark:text-gray-300 h-12 w-12" />
        </div>

        {/* Title */}
        <h3 className="text-center text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
          disabled={loading}
            onClick={onConfirm}
            className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium cursor-pointer w-30 flex justify-center"
          >
            {loading ? <ImSpinner8 className="animate-spin"/> :"Yes, I'm sure"}
          </button>
          <button
          disabled={loading}
            onClick={onClose}
            className="text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium cursor-pointer"
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  );
}