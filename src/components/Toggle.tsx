import React from 'react';

interface ToggleProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  sublabel?: string;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({ id, checked, onChange, label, sublabel, disabled = false }) => {
  return (
    <div className={`toggle-container ${disabled ? 'toggle-disabled' : ''}`}>
      <div className="toggle-text">
        <label htmlFor={id} className="toggle-label">
          {label}
        </label>
        {sublabel && <span className="toggle-sublabel">{sublabel}</span>}
      </div>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`toggle-switch ${checked ? 'toggle-active' : ''}`}
      >
        <span className="toggle-thumb" />
      </button>
    </div>
  );
};
