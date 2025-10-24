import React, { useState, useRef, useEffect } from 'react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
  description?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, label, description }) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showPicker]);

  return (
    <div className="color-picker" ref={pickerRef}>
      <div className="color-picker-header">
        <label className="color-picker-label">{label}</label>
        {description && (
          <p className="color-picker-description">{description}</p>
        )}
      </div>
      <div className="color-picker-input-wrapper">
        <input
          type="color"
          className="color-picker-color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          title="点击选择颜色"
        />
        <input
          type="text"
          className="color-picker-text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          maxLength={7}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
