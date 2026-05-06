let fortunes = [];
let currentState = 'idle'; // idle, cracking, displaying

// Load fortunes from JSON file
async function loadFortunes() {
    try {
        const response = await fetch('fortunes.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        fortunes = await response.json();
        console.log('Fortunes loaded successfully:', fortunes);
    } catch (error) {
        console.error('Error loading fortunes:', error);
        // Fallback fortunes if JSON fails to load
        fortunes = [
            { title: 'Focus on Improving', imageUrl: 'images/focus-improving.jpg' },
            { title: 'Care Instead of Control', imageUrl: 'images/care-instead-control.jpg' },
            { title: 'It Didn\'t Work Out', imageUrl: 'images/didnt-work-out.jpg' },
            { title: 'Enjoy Your Body', imageUrl: 'images/enjoy-body.jpg' }
        ];
    }
}

// Get random fortune
function getRandomFortune() {
    if (fortunes.length === 0) {
        return null;
    }
    return fortunes[Math.floor(Math.random() * fortunes.length)];
}

// Display fortune
function displayFortune() {
    const fortune = getRandomFortune();
    if (!fortune) {
        console.error('No fortunes available');
        return;
    }

    const fortuneImage = document.getElementById('fortuneImage');
    fortuneImage.src = fortune.imageUrl;
    fortuneImage.alt = fortune.title;

    const fortuneDisplay = document.getElementById('fortuneDisplay');
    fortuneDisplay.classList.add('show');
}

// Crack cookie
function crackCookie() {
    if (currentState !== 'idle') return;

    currentState = 'cracking';

    const cookieTop = document.querySelector('.cookie-top');
    const cookieBottom = document.querySelector('.cookie-bottom');
    const cookieWrapper = document.querySelector('.cookie-wrapper');

    // Add cracking animation
    cookieTop.classList.add('crack');
    cookieBottom.classList.add('crack');

    // Hide cookie and show fortune after animation completes
    setTimeout(() => {
        cookieWrapper.classList.add('hide');
        displayFortune();
        currentState = 'displaying';
    }, 800);
}

// Reset to initial state
function resetCookie() {
    currentState = 'idle';

    const cookieTop = document.querySelector('.cookie-top');
    const cookieBottom = document.querySelector('.cookie-bottom');
    const cookieWrapper = document.querySelector('.cookie-wrapper');
    const fortuneDisplay = document.getElementById('fortuneDisplay');

    // Remove animations and classes
    cookieTop.classList.remove('crack');
    cookieBottom.classList.remove('crack');
    cookieWrapper.classList.remove('hide');
    fortuneDisplay.classList.remove('show');

    // Reset animation by removing and re-adding them
    // This forces the browser to restart the animations
    const cookie = document.getElementById('cookie');
    cookie.style.animation = 'none';
    setTimeout(() => {
        cookie.style.animation = '';
    }, 10);
}

// Handle cookie click
function handleCookieClick() {
    if (currentState === 'idle') {
        crackCookie();
    }
}

// Handle keyboard input
function handleKeyPress(event) {
    if (event.key === 'Enter' || event.code === 'Space') {
        event.preventDefault();
        if (currentState === 'idle') {
            crackCookie();
        } else if (currentState === 'displaying') {
            resetCookie();
        }
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadFortunes();

    const cookie = document.getElementById('cookie');
    const newFortuneBtn = document.getElementById('newFortuneBtn');

    cookie.addEventListener('click', handleCookieClick);
    newFortuneBtn.addEventListener('click', resetCookie);
    document.addEventListener('keypress', handleKeyPress);
});
