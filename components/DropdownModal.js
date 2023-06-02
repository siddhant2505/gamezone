import React, { useState } from 'react';
import Link from 'next/link';

function DropdownModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Notifications
      </button>
      {isOpen && (
        <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {/* Render each notification item */}
            <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Friend request accepted
            </Link>
            <Link href="#" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
              New message received
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownModal;
