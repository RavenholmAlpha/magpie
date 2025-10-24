import React, { useState, useEffect } from 'react';

interface InputModalProps {
  isOpen: boolean;
  title: string;
  placeholder: string;
  defaultValue?: string;
  onConfirm: (value: string) => void;
  onCancel: () => void;
}

const InputModal: React.FC<InputModalProps> = ({
  isOpen,
  title,
  placeholder,
  defaultValue = '',
  onConfirm,
  onCancel,
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (isOpen) {
      setValue(defaultValue);
    }
  }, [isOpen, defaultValue]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      } else if (e.key === 'Enter') {
        handleConfirm();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (value.trim()) {
      onConfirm(value.trim());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <input
          type="text"
          className="modal-input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
        />
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onCancel}>
            取消
          </button>
          <button className="btn-primary" onClick={handleConfirm}>
            确认
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
