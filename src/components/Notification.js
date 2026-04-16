import React, { useEffect } from 'react';
import './Notification.css';

export default function Notification({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={'notification notification-' + type}>
      <span>{type === 'success' ? '✅' : '❌'}</span>
      <span>{msg}</span>
    </div>
  );
}
