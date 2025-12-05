import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder: string;
  isPassword?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = 'text', placeholder, isPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full mb-4">
      <label className="text-sm font-semibold text-gray-700 block mb-2">{label}</label>
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
        />
        {isPassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;