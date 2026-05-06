# 🥠 Digital Fortune Cookie Teller

A beautiful, animated digital fortune cookie website built with vanilla JavaScript, CSS animations, and a JSON-based content system.

## ✨ Features

- **Smooth Animations**: Realistic 3D cookie cracking animation with floating idle state
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Custom Images**: Load any images you want through the `fortunes.json` file
- **Easy Customization**: Simple JSON structure for adding/removing fortunes
- **No Dependencies**: Pure vanilla JavaScript and CSS - no frameworks needed
- **Accessible**: Keyboard support (Enter or Space to crack)

## 📁 File Structure

```
├── index.html        # Main HTML structure
├── styles.css        # All animations and styling
├── script.js         # JavaScript logic and state management
├── fortunes.json     # Your fortune data (modify this!)
├── images/           # Folder for your fortune images (create this)
└── README.md         # This file
```

## 🚀 Quick Start

1. **Clone or download** this repository
2. **Replace image paths** in `fortunes.json` with your own images:
   ```json
   {
     "title": "Your Fortune Title",
     "imageUrl": "images/your-image.jpg"
   }
   ```
3. **Create an `images/` folder** and add your images there
4. **Open `index.html`** in your browser - that's it!

## 📝 Customizing Fortunes

Edit `fortunes.json` to add your own fortunes. The structure is simple:

```json
[
  {
    "title": "My First Fortune",
    "imageUrl": "images/fortune1.jpg"
  },
  {
    "title": "My Second Fortune",
    "imageUrl": "images/fortune2.jpg"
  }
]
```

### Image URL Options:
- **Local files**: `images/my-image.jpg` (relative path)
- **Absolute paths**: `/images/my-image.jpg` or `C:/Users/...`
- **External URLs**: `https://example.com/image.jpg`

## 🎨 Customizing Appearance

### Colors
Edit the CSS variables in `styles.css`:
- **Background gradient**: Lines 206-207
- **Cookie color**: `linear-gradient(135deg, #d4a574 0%, #c9934d 50%, #b8860b 100%)`
- **Button color**: `linear-gradient(135deg, #ff6b6b, #ee5a6f)`

### Animation Speed
- **Cookie float**: Change `3s` in line 170 (`.cookie`)
- **Cracking animation**: Change `0.8s` in line 123 and 131
- **Fortune zoom**: Change `0.8s` in line 153 (`.fortune-image`)

### Sizes
- **Cookie size**: Change `200px` and `100px` in `.cookie` and `.cookie-half` (line 169)
- **Mobile cookie size**: Adjust in `@media` query (line 330)

## 🎯 How It Works

1. **User clicks** the floating cookie
2. **JavaScript detects** the click and starts the cracking animation
3. **CSS 3D transforms** split the cookie apart smoothly
4. **JavaScript randomly selects** a fortune from `fortunes.json`
5. **Fortune image displays** with a smooth zoom-in animation
6. **User clicks** "Get Another Fortune" to reset and try again

## ⌨️ Interaction Methods

- **Mouse**: Click the cookie
- **Keyboard**: Press Enter or Space bar
- **Mobile**: Tap the cookie

## 🛠️ Advanced Customization

### Modify animation timing in `script.js`:
```javascript
setTimeout(() => {
    displayFortune();
    currentState = 'displaying';
}, 800); // Change 800ms to your preferred delay
```

### Add more animation states:
- Extend the `currentState` variable to track additional states
- Add new animation classes to `styles.css`
- Trigger them in the corresponding JavaScript functions

### Auto-crack feature:
Uncomment line 134 in `script.js` to automatically crack the next cookie:
```javascript
setTimeout(() => handleCookieClick(), 500);
```

## 📱 Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support with touch events

## 🎁 Tips

- **Image optimization**: Use compressed images (under 500KB each) for faster loading
- **Aspect ratio**: Keep images as close to square as possible for best display
- **Add more fortunes**: The more entries in `fortunes.json`, the more variety!
- **Performance**: The website is very lightweight and will load quickly even on slow connections

## 📧 Troubleshooting

**Images not showing?**
- Check file paths in `fortunes.json`
- Ensure images are in the correct folder
- Check browser console (F12) for error messages

**Animations look choppy?**
- This is rare, but try closing other browser tabs
- Check your browser's performance settings
- Try a different browser

**JSON not loading?**
- Make sure `fortunes.json` is in the same folder as `index.html`
- Check browser console for CORS errors
- Verify JSON syntax with a validator

## 🎉 Have Fun!

Create memorable fortunes and enjoy your digital fortune teller! ✨
