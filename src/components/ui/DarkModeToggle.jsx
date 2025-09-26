import { useTheme } from '@hooks';

export default function DarkModeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  const handleClick = () => {
    console.log('Toggle clicked, current isDarkMode:', isDarkMode);
    toggleTheme();
    console.log('After toggle, isDarkMode should be:', !isDarkMode);
  };

  console.log('DarkModeToggle render, isDarkMode:', isDarkMode);

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="text-lg">
        {isDarkMode ? '☀️' : '🌙'}
      </span>
    </button>
  );
}