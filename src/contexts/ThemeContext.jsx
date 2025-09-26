import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from './themeContext';

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first
    const stored = localStorage.getItem('theme');
    console.log('Initial theme check - stored:', stored);
    if (stored) {
      console.log('Using stored theme:', stored === 'dark');
      return stored === 'dark';
    }
    // Fall back to system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log('Using system preference:', systemPrefersDark);
    return systemPrefersDark;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    console.log('Theme effect running, isDarkMode:', isDarkMode);
    console.log('Root element:', root);
    console.log('Root classes before:', root.className);
    
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      console.log('Added dark class, root classes now:', root.className);
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      console.log('Removed dark class, root classes now:', root.className);
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const value = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
