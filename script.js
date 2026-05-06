let fortunes = [];
let currentState = 'idle';

console.log('🔄 script.js is loading...');

async function loadFortunes() {
    console.log('📦 loadFortunes() called');
    try {
        const response = await fetch('fortunes.json');
        console.log('Fetch response:', response);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        fortunes = await response.json();
        console.log('✅ Fortunes loaded from JSON:', fortunes);
    } catch (error) {
        console.error('❌ Error loading JSON:', error);
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

function getRandomFortune() {
    if (fortunes.length === 0) {
        console.error('❌ No fortunes available');
        return null;
    }
    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    console.log('🎯 Selected fortune:', fortune);
    return fortune;
}

function displayFortune() {
    console.log('📖 displayFortune() called');
    const fortune = getRandomFortune();
    
    if (!fortune) {
        console.error('❌ No fortune selected');
        return;
    }

    const fortuneImage = document.getElementById('fortuneImage');
    console.log('🖼️ fortuneImage element:', fortuneImage);
    console.log('🖼️ Setting image to:', fortune.imageUrl);
    
    fortuneImage.src = fortune.imageUrl;
    fortuneImage.alt = fortune.title;

    const fortuneDisplay = document.getElementById('fortuneDisplay');
    console.log('✨ fortuneDisplay element:', fortuneDisplay);
    
    fortuneDisplay.classList.add('show');
    console.log('✨ Added show class to fortune display');
}

function crackCookie() {
    console.log('💥 crackCookie() called - current state:', currentState);
    
    if (currentState !== 'idle') {
        console.log('⚠️ Not idle, ignoring click');
        return;
    }

    currentState = 'cracking';
    console.log('🎬 State changed to: cracking');

    const cookieTop = document.querySelector('.cookie-top');
    const cookieBottom = document.querySelector('.cookie-bottom');
    const cookieWrapper = document.querySelector('.cookie-wrapper');

    console.log('🍪 Cookie elements found:', { cookieTop, cookieBottom, cookieWrapper });

    if (cookieTop && cookieBottom) {
        cookieTop.classList.add('crack');
        cookieBottom.classList.add('crack');
        console.log('🎬 Added crack class to cookie halves');
    }

    setTimeout(() => {
        console.log('⏱️ 800ms timeout fired');
        if (cookieWrapper) {
            cookieWrapper.classList.add('hide');
            console.log('🎬 Added hide class to cookie wrapper');
        }
        displayFortune();
        currentState = 'displaying';
        console.log('✅ State changed to: displaying');
    }, 800);
}

function resetCookie() {
    console.log('🔄 resetCookie() called');
    currentState = 'idle';

    const cookieTop = document.querySelector('.cookie-top');
    const cookieBottom = document.querySelector('.cookie-bottom');
    const cookieWrapper = document.querySelector('.cookie-wrapper');
    const fortuneDisplay = document.getElementById('fortuneDisplay');

    if (cookieTop) cookieTop.classList.remove('crack');
    if (cookieBottom) cookieBottom.classList.remove('crack');
    if (cookieWrapper) cookieWrapper.classList.remove('hide');
    if (fortuneDisplay) fortuneDisplay.classList.remove('show');

    console.log('✅ Reset complete, state is now: idle');
}

function handleCookieClick(e) {
    console.log('👆 COOKIE CLICKED!', e);
    if (currentState === 'idle') {
        crackCookie();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOMContentLoaded fired!');
    
    console.log('📦 Loading fortunes...');
    loadFortunes();

    const cookie = document.getElementById('cookie');
    const newFortuneBtn = document.getElementById('newFortuneBtn');

    console.log('🍪 Cookie element:', cookie);
    console.log('🔘 Button element:', newFortuneBtn);

    if (cookie) {
        cookie.addEventListener('click', handleCookieClick);
        console.log('✅ Click listener added to cookie');
    } else {
        console.error('❌ Cookie element not found!');
    }

    if (newFortuneBtn) {
        newFortuneBtn.addEventListener('click', resetCookie);
        console.log('✅ Click listener added to button');
    }

    document.addEventListener('keypress', function(e) {
        console.log('⌨️ Keypress detected:', e.key);
        if (e.key === 'Enter' || e.code === 'Space') {
            e.preventDefault();
            if (currentState === 'idle') {
                crackCookie();
            } else if (currentState === 'displaying') {
                resetCookie();
            }
        }
    });

    console.log('✅✅✅ Script initialization COMPLETE ✅✅✅');
});

console.log('🔄 script.js has finished loading');
