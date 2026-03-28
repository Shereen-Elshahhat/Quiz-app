import React, { useState } from "react";

type JoinQuizModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void;
};

const JoinQuizModal: React.FC<JoinQuizModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [code, setCode] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className=" w-[380px] rounded-lg bg-white shadow-lg p-6">

        {/* Title */}
        <h2 className="text-center text-lg font-semibold mb-4">Join Quiz</h2>

        {/* Input */}
        <label className="text-sm text-gray-600 block mb-2">
          Type the code received for the quiz below to join
        </label>

        <input
          type="text"
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-5 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => onSubmit(code)}
            className="w-12 h-10 flex items-center justify-center border rounded-md hover:bg-gray-100"
          >
            ✔
          </button>

          <button
            onClick={onClose}
            className="w-12 h-10 flex items-center justify-center border rounded-md hover:bg-gray-100"
          >
            ✖
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinQuizModal;