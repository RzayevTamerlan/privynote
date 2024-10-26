export const getSystemTheme = (theme: string | undefined) => {
  if (typeof window !== 'undefined' && theme && theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return theme;
};