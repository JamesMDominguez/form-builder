// src/components/Toolbox.tsx
import React from 'react';

const Toolbox = () => {
  const formElements = [
    { type: 'Title', icon: 'T' },
    { type: 'TextField', icon: 'Ab' },
    { type: 'Dropdown', icon: '▼' },
    { type: 'Checkbox', icon: '☑' },
    { type: 'Image', icon: '🖼️' },
  ];

  return (
    <div className="w-1/4 p-4 border-r">
      <h2 className="text-lg font-bold mb-4">Toolbox</h2>
      <div className="grid grid-cols-2 gap-4">
        {formElements.map((element) => (
          <div
            key={element.type}
            className="p-4 border rounded-lg flex flex-col items-center cursor-grab"
            draggable={true}
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', element.type);
            }}
          >
            <div className="text-4xl">{element.icon}</div>
            <div>{element.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toolbox;