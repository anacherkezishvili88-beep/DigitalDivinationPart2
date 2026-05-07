console.log('=== STAR FORTUNE TELLER STARTED ===');

let fortunes = [];
let boxActive = false;

// ── Load fortunes from JSON ──────────────────────────────────────────────────
async function loadFortunes() {
    try {
        const response = await fetch('fortunes.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        fortunes = await response.json();
        console.log('Fortunes loaded from JSON:', fortunes.length);
    } catch (err) {
        console.warn('Could not load fortunes.json, using fallback.', err);
        fortunes = [
            { title: 'Focus on Improving',    imageUrl: 'images/json1.jpg' },
            { title: 'Care Instead of Control', imageUrl: 'images/json2.jpg' },
            { title: "It Didn't Work Out",     imageUrl: 'images/json3.jpg' },
            { title: 'Enjoy Your Body',        imageUrl: 'images/json4.jpg' }
        ];
    }
}

function getRandomFortune() {
    return fortunes[Math.floor(Math.random() * fortunes.length)];
}

// ── Show fortune box ─────────────────────────────────────────────────────────
function showFortune(starEl) {
    if (boxActive) return;
    boxActive = true;

    const fortune   = getRandomFortune();
    const box       = document.getElementById('fortuneBox');
    const img       = document.getElementById('fortuneImage');
    const highlight = document.getElementById('starHighlight');

    // Position the golden highlight ring over the clicked star
    const rect = starEl.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    highlight.style.left = cx + 'px';
    highlight.style.top  = cy + 'px';
    highlight.classList.add('visible');

    // Load image — reset animation by cloning src trick
    img.style.animation = 'none';
    img.src = fortune.imageUrl;
    img.alt = fortune.title;
    // Re-trigger animation on next frame
    requestAnimationFrame(() => {
        img.style.animation = '';
    });

    // Show box
    box.classList.add('show');
    console.log('Fortune shown:', fortune.title);
}

// ── Close fortune box ────────────────────────────────────────────────────────
function closeFortune() {
    const box       = document.getElementById('fortuneBox');
    const highlight = document.getElementById('starHighlight');
    box.classList.remove('show');
    highlight.classList.remove('visible');
    boxActive = false;
    console.log('Fortune closed');
}

// ── Star positions (% of viewport) ──────────────────────────────────────────
// Adjust these to align with the actual glowing stars in your background image
const starPositions = [
    { x: 47, y:  8 },   // top-center bright star
    { x: 40, y: 17 },   // upper-mid left cluster
    { x: 62, y: 13 },   // upper-mid right
    { x: 78, y: 22 },   // right side upper
    { x: 83, y: 34 },   // far right
    { x: 46, y: 30 },   // center cluster top
    { x: 55, y: 38 },   // center cluster mid
    { x: 34, y: 40 },   // left mid
    { x: 66, y: 45 },   // right mid
    { x: 57, y: 53 },   // lower center
    { x: 77, y: 53 },   // lower right
    { x: 30, y: 58 },   // lower left
    { x: 87, y: 47 },   // far right low
];

// ── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async function () {
    await loadFortunes();

    const container  = document.getElementById('starsContainer');
    const restartBtn = document.getElementById('restartBtn');

    starPositions.forEach((pos) => {
        const star = document.createElement('div');
        star.className   = 'star-clickable';
        star.style.left  = pos.x + '%';
        star.style.top   = pos.y + '%';

        star.addEventListener('click', function () {
            showFortune(this);
        });

        container.appendChild(star);
    });

    if (restartBtn) {
        restartBtn.addEventListener('click', closeFortune);
    }

    // Keyboard support
    document.addEventListener('keydown', function (e) {
        if ((e.key === 'Escape') && boxActive) {
            closeFortune();
        }
    });

    console.log('=== READY — stars:', starPositions.length, '| fortunes:', fortunes.length);
});
