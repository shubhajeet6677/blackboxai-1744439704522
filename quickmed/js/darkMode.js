// Dark Mode Handler
const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

// Check for saved dark mode preference
function getInitialColorMode() {
    // Check for saved preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
        return savedMode === 'true';
    }
    
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Initialize dark mode
function initializeDarkMode() {
    const isDarkMode = getInitialColorMode();
    html.classList.toggle('dark', isDarkMode);
    updateToggleButton(isDarkMode);
}

// Update toggle button appearance
function updateToggleButton(isDark) {
    const moonIcon = darkModeToggle.querySelector('.fa-moon');
    const sunIcon = darkModeToggle.querySelector('.fa-sun');
    
    if (isDark) {
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    } else {
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
    }
}

// Toggle dark mode
function toggleDarkMode() {
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark);
    updateToggleButton(isDark);
    
    // Add transition effect
    html.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        html.style.transition = '';
    }, 300);
}

// Event Listeners
darkModeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggleDarkMode();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeDarkMode();
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('darkMode') === null) {
        html.classList.toggle('dark', e.matches);
        updateToggleButton(e.matches);
    }
});
