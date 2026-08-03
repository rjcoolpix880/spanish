import React from 'react';
import type { LabelDisplayMode } from '../types/spanish';

interface SegmentedControlProps {
  label: string;
  value: LabelDisplayMode;
  onChange: (value: LabelDisplayMode) => void;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({ label, value, onChange }) => {
  const options: { mode: LabelDisplayMode; title: string }[] = [
    { mode: 'spanish', title: 'Spanish' },
    { mode: 'english', title: 'English' },
    { mode: 'none', title: 'No Text' },
  ];

  return (
    <div className="segmented-control-wrapper">
      <span className="segmented-label">{label}</span>
      <div className="segmented-control">
        {options.map((opt) => {
          const isActive = value === opt.mode;
          return (
            <button
              key={opt.mode}
              type="button"
              className={`segmented-button ${isActive ? 'segmented-button-active' : ''}`}
              onClick={() => onChange(opt.mode)}
            >
              {opt.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};
