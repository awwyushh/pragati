// components/Notification.tsx

import React from 'react';

interface NotificationProps {
  title: string;
  imageUrl: string;
  message: string;
  visible: boolean;
}

const Notification: React.FC<NotificationProps> = ({ title, imageUrl, message, visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 animate-slide-in">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
      <img
        src={imageUrl}
        alt="Notification"
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  );
};

export default Notification;
