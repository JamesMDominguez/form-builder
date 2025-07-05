'use client';

import React from 'react';
import Image from 'next/image';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white text-gray-900 p-4 h-screen border-r border-gray-200">
      <div className="mb-4 flex items-center justify-center gap-2">
        <Image src="/logo.png" alt="Logo" width={40} height={50} />
        <span className="text-2xl font-bold tracking-tight">EZ inputs</span>
      </div>
      <hr className="mb-4 border-gray-200" />
      <ul>
        <li className="mb-2"><a href="#" className="hover:text-gray-600">Link 1</a></li>
        <li className="mb-2"><a href="#" className="hover:text-gray-600">Link 2</a></li>
        <li className="mb-2"><a href="#" className="hover:text-gray-600">Link 3</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
