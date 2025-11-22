import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = {
    bg: isDark ? '#000' : '#fff',
    text: isDark ? '#fff' : '#000',
    border: isDark ? '#333' : '#000',
    cardBg: isDark ? '#1a1a1a' : '#fff',
    inputBg: isDark ? '#1a1a1a' : '#fff',
    inputBorder: isDark ? '#333' : '#ddd',
    secondaryBg: isDark ? '#2a2a2a' : '#fafafa',
    hover: isDark ? '#2a2a2a' : '#f5f5f5'
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
