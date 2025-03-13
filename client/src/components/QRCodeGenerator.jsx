import React, { useState } from "react";
import QRCode from "react-qr-code";
import { getUserId } from "../services/AuthService";

const QRCodeModal = ({ isOpen, onClose, menuUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 scale-100">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &#10005;
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Your Restaurant QR Code</h2>
          <QRCode value={menuUrl} size={128} />
          <p className="mt-4 text-sm text-gray-500">Scan to view your public menu</p>
          <a 
            href={menuUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-2 text-blue-500 hover:underline"
          >
            View Public Menu
          </a>
        </div>
      </div>
    </div>
  );
};

const QRCodeGenerator = () => {
  const businessId = getUserId();
  const menuUrl = `http://localhost:5173/menu/${businessId}`;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center p-4">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition-colors duration-300"
        onClick={() => setModalOpen(true)}
      >
        QR Code
      </button>
      <QRCodeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        menuUrl={menuUrl}
      />
    </div>
  );
};

export default QRCodeGenerator;
