const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
}

const darkModeMatcher = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");

function prefersDarkMode() {
  return darkModeMatcher && darkModeMatcher.matches;
}

if (prefersDarkMode() && !currentTheme) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
