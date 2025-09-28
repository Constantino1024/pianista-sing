import React from 'react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

const CopyButton = ({ 
  data, 
  formatFn, 
  className = '', 
  size = 'sm',
  variant = 'outline'
}) => {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  const handleCopy = () => {
    const formattedData = formatFn ? formatFn(data) : data;
    copyToClipboard(formattedData);
  };

  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base'
  };

  const variantClasses = {
    outline: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700',
    ghost: 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
    solid: 'bg-blue-600 text-white hover:bg-blue-700'
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        inline-flex items-center gap-2 rounded-md font-medium transition-colors
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      disabled={!data}
      title="Copy to clipboard"
    >
      {isCopied ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy to clipboard
        </>
      )}
    </button>
  );
};

export default CopyButton;