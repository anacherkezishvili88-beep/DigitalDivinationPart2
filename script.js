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
        console.log('✅ Fortunes loaded successfully:', fortunes);
    } catch (error) {
        console.error('❌ Error loading fortunes:', error);
        // Fallback fortunes if JSON fails to load
        fortunes = [
            { title: 'Focus on Improving', imageUrl: 'images/json1.jpg' },
            { title: 'Care Instead of Control', imageUrl: 'images/json2.jpg' },
            { title: 'It Didn\'t Work Out', imageUrl: 'images/json3.jpg' },
            { title: 'Enjoy Your Body', imageUrl: 'images/json4.jpg' },
            { title: 'Fortune 5', imageUrl: 'images/json5.jpg' },
            { title: 'Fortune 6', imageUrl: 'images/json6.jpg' },
            { title: 'Fortune 7', imageUrl: 'images/json7.jpg' }
        ];
        console.log('✅ Using fallback fortunes:', fortunes);
    }
}

// Get random fortune
function getRandomFortune() {
    if (fortunes.length === 0) {
        console.error('❌ No fortunes available');
        return null;
    }
    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    console.log('🎯 Selected fortune:', fortune);
    return fortune;
}

// Display fortune
function displayFortune() {
    console.log('📖 Displaying fortune...');
    const fortune = getRandomFortune();
    if (!fortune) {
        console.error('❌ No fortune to display');
        return;
    }

    const fortuneImage = document.getElementById('fortuneImage');
    console.log('🖼️ Setting image URL to:', fortune.imageUrl);
    fortuneImage.src = fortune.imageUrl;
    fortuneImage.alt = fortune.title;

    const fortuneDisplay = document.getElementById('fortuneDisplay');
    fortuneDisplay.classList.add('show');
    console.log('✨ Fortune displayed');
}

// Crack cookie
function crackCookie() {
    console.log('🥠 Current state:', currentState);
    if (currentState !== 'idle') {
        console.log('⚠️ Cookie is already in state:', currentState);
        return;
    }

    console.log('💥 Cracking cookie...');
    currentState = 'cracking';

    const cookieTop = document.querySelector('.cookie-top');
    const cookieBottom = document.querySelector('.cookie-bottom');
    const cookieWrapper = document.querySelector('.cookie-wrapper');

    if (!cookieTop || !cookieBottom || !cookieWrapper) {
        console.error('❌ Cookie elements not found');
        return;
    }

    // Add cracking animation
    cookieTop.classList.add('crack');
    cookieBottom.classList.add('crack');
    console.log('🎬 Crack animation started');

    // Hide cookie and show fortune after animation completes
    setTimeout(() => {
        cookieWrapper.classList.add('hide');
        displayFortune();
        currentState = 'displaying';
        console.log('✅ Cookie cracked, fortune displayed');
    }, 800);
}

// Reset to initial state
function resetCookie() {
    console.log('🔄 Resetting cookie...');
    currentState = 'idle';

    const cookieTop = document.querySelector('.cookie-top');
    const cookieBottom = document.querySelector('.cookie-bottom');
    const cookieWrapper = document.querySelector('.cookie-wrapper');
    const fortuneDisplay = document.getElementById('fortuneDisplay');

    if (!cookieTop || !cookieBottom || !cookieWrapper || !fortuneDisplay) {
        console.error('❌ Cookie elements not found during reset');
        return;
    }

    // Remove animations and classes
    cookieTop.classList.remove('crack');
    cookieBottom.classList.remove('crack');
    cookieWrapper.classList.remove('hide');
    fortuneDisplay.classList.remove('show');

    // Reset animation by removing and re-adding them
    const cookie = document.getElementById('cookie');
    cookie.style.animation = 'none';
    setTimeout(() => {
        cookie.style.animation = '';
    }, 10);
    
    console.log('✅ Cookie reset to idle state');
}

// Handle cookie click
function handleCookieClick() {
    console.log('👆 Cookie clicked!');
    if (currentState === 'idle') {
        crackCookie();
    } else {
        console.log('⚠️ Cookie not in idle state, ignoring click');
    }
}

// Handle keyboard input
function handleKeyPress(event) {
    if (event.key === 'Enter' || event.code === 'Space') {
        event.preventDefault();
        console.log('⌨️ Keyboard input detected');
        if (currentState === 'idle') {
            crackCookie();
        } else if (currentState === 'displaying') {
            resetCookie();
        }
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Page loaded, initializing...');
    
    loadFortunes();

    const cookie = document.getElementById('cookie');
    const newFortuneBtn = document.getElementById('newFortuneBtn');

    if (!cookie) {
        console.error('❌ Cookie element not found!');
        return;
    }
    
    if (!newFortuneBtn) {
        console.error('❌ Button element not found!');
        return;
    }

    cookie.addEventListener('click', handleCookieClick);
    console.log('✅ Click listener added to cookie');
    
    newFortuneBtn.addEventListener('click', resetCookie);
    console.log('✅ Click listener added to button');
    
    document.addEventListener('keypress', handleKeyPress);
    console.log('✅ Keyboard listener added');
    
    console.log('✅ Initialization complete!');
});
