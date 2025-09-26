import { useSidebar } from '@hooks';

export const HamburgerButton = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
      aria-label="Toggle menu"
      title="Toggle menu"
    >
      <div className="w-5 h-5 flex flex-col justify-center items-center">
        <span
          className={`block h-0.5 w-5 bg-gray-600 dark:bg-gray-400 transform transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-1' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-5 bg-gray-600 dark:bg-gray-400 transform transition-all duration-300 mt-1 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-5 bg-gray-600 dark:bg-gray-400 transform transition-all duration-300 mt-1 ${
            isOpen ? '-rotate-45 -translate-y-1' : ''
          }`}
        />
      </div>
    </button>
  );
};