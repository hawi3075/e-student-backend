import React from 'react';

const SocialIconPlaceholder: React.FC<{ label: string }> = ({ label }) => (
  <div className="w-12 h-12 bg-white border border-gray-300 rounded-xl flex items-center justify-center text-gray-600 font-bold shadow-sm hover:shadow-md transition duration-150">
    <span className="text-sm">{label}</span>
  </div>
);

const SocialLogin: React.FC = () => {
  return (
    <div className="mt-8 text-center">
      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300" />
        <p className="mx-4 text-gray-500 text-sm">Or continue with</p>
        <hr className="flex-grow border-gray-300" />
      </div>
      <div className="flex justify-center space-x-4">
        <button aria-label="Continue with Google"><SocialIconPlaceholder label="G" /></button>
        <button aria-label="Continue with Apple"><SocialIconPlaceholder label="A" /></button>
        <button aria-label="Continue with another service"><SocialIconPlaceholder label="..." /></button>
      </div>
    </div>
  );
};

export default SocialLogin;