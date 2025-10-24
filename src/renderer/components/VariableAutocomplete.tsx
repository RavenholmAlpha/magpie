import React, { useState, useRef, useEffect } from 'react';
import { Environment, KeyValuePair } from '../types';

interface VariableAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  environments: Environment[];
  activeEnvironmentId: string | null;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const VariableAutocomplete: React.FC<VariableAutocompleteProps> = ({
  value,
  onChange,
  placeholder,
  className,
  environments,
  activeEnvironmentId,
  onKeyDown,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // 获取当前激活环境的变量
  const activeEnvironment = environments.find((env) => env.id === activeEnvironmentId);
  const variables = activeEnvironment?.variables.filter((v) => v.enabled) || [];

  // 监听输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const cursorPos = e.target.selectionStart || 0;
    
    onChange(newValue);
    setCursorPosition(cursorPos);

    // 检测是否输入了 {
    if (newValue[cursorPos - 1] === '{' && variables.length > 0) {
      setShowSuggestions(true);
      setSelectedIndex(0);
    } else if (showSuggestions) {
      // 如果正在显示建议，检查是否仍然在 { 后面
      const beforeCursor = newValue.substring(0, cursorPos);
      const lastOpenBrace = beforeCursor.lastIndexOf('{');
      
      if (lastOpenBrace === -1 || beforeCursor.substring(lastOpenBrace + 1).includes('}')) {
        setShowSuggestions(false);
      }
    }
  };

  // 插入变量
  const insertVariable = (variable: KeyValuePair) => {
    if (!inputRef.current) return;

    const beforeCursor = value.substring(0, cursorPosition);
    const afterCursor = value.substring(cursorPosition);
    
    // 找到最后一个 { 的位置
    const lastOpenBrace = beforeCursor.lastIndexOf('{');
    
    if (lastOpenBrace === -1) return;

    // 构建新值：{ 之前的内容 + {{variable}} + { 之后的内容
    const newValue = 
      value.substring(0, lastOpenBrace) + 
      `{{${variable.key}}}` + 
      afterCursor;
    
    onChange(newValue);
    setShowSuggestions(false);

    // 设置光标位置到插入变量之后
    setTimeout(() => {
      if (inputRef.current) {
        const newCursorPos = lastOpenBrace + variable.key.length + 4; // 4 = {{ + }}
        inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
        inputRef.current.focus();
      }
    }, 0);
  };

  // 键盘导航
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showSuggestions && variables.length > 0) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % variables.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + variables.length) % variables.length);
          break;
        case 'Enter':
          if (showSuggestions) {
            e.preventDefault();
            insertVariable(variables[selectedIndex]);
          } else if (onKeyDown) {
            onKeyDown(e);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setShowSuggestions(false);
          break;
        case 'Tab':
          if (showSuggestions) {
            e.preventDefault();
            insertVariable(variables[selectedIndex]);
          }
          break;
        default:
          if (onKeyDown) {
            onKeyDown(e);
          }
      }
    } else if (onKeyDown) {
      onKeyDown(e);
    }
  };

  // 点击外部关闭建议框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 自动滚动到选中项
  useEffect(() => {
    if (showSuggestions && suggestionsRef.current) {
      const selectedElement = suggestionsRef.current.querySelector('.suggestion-item.selected');
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex, showSuggestions]);

  return (
    <div className="variable-autocomplete">
      <input
        ref={inputRef}
        type="text"
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      {showSuggestions && variables.length > 0 && (
        <div ref={suggestionsRef} className="suggestions-dropdown">
          <div className="suggestions-header">
            可用变量 ({activeEnvironment?.name})
          </div>
          <div className="suggestions-list">
            {variables.map((variable, index) => (
              <div
                key={variable.id}
                className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                onClick={() => insertVariable(variable)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="suggestion-key">
                  {variable.key}
                </div>
                <div className="suggestion-value">
                  {variable.value}
                </div>
              </div>
            ))}
          </div>
          <div className="suggestions-footer">
            <span>↑↓ 导航</span>
            <span>Enter/Tab 选择</span>
            <span>Esc 关闭</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VariableAutocomplete;

