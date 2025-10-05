# NASA Space Apps Challenge 2024 - ISS 25th Anniversary

A cinematic React.js website celebrating the International Space Station's 25th Anniversary, featuring an interactive space adventure that educates users about ISS benefits for Earth.

## 🚀 Features

- **Cinematic Experience**: Full-screen videos, smooth animations, and space-themed UI
- **Interactive Story**: 7-page journey from Earth to ISS with educational content
- **Educational Content**: Learn about NBL training, ISS Cupola, and Earth benefits
- **Responsive Design**: Works on desktop and mobile devices
- **Easy Video Integration**: Simple video replacement system
- **Modern Tech Stack**: React.js, Tailwind CSS, Framer Motion, GSAP

## 🛠️ Tech Stack

- **React.js** (Vite) - Frontend framework
- **Tailwind CSS** - Styling and responsive design
- **Framer Motion** - Smooth animations and transitions
- **GSAP** - Advanced animations
- **React Router** - Page navigation

## 📦 Installation

1. **Clone or download the project**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start development server:**
   ```bash
   npm run dev
   ```
4. **Open your browser to** `http://localhost:5173`

## 🎬 Video Integration

### Easy Video Replacement

The website uses a reusable `VideoScene` component for easy video integration:

```jsx
<VideoScene
  src="/assets/your-video.mp4"
  onEnded={handleVideoEnd}
  overlayText="Your overlay text"
  autoPlay={true}
  muted={true}
/>
```

### Video Placeholders to Replace

Create a `public/assets/` folder and add these video files:

1. **Mission Briefing** (`/assets/mission-briefing.mp4`)
   - Location: `src/pages/MissionBrief.jsx`
   - Purpose: Mission introduction video

2. **NBL Training** (`/assets/nbl-training.mp4`)
   - Location: `src/pages/AIBotIntro.jsx`
   - Purpose: Underwater astronaut training footage

3. **Rocket Launch** (`/assets/rocket-launch.mp4`)
   - Location: `src/pages/RocketLaunch.jsx`
   - Purpose: Rocket launch sequence

4. **Cupola Earth View** (`/assets/cupola-earth-view.mp4`)
   - Location: `src/pages/CupolaView.jsx`
   - Purpose: ISS Cupola window Earth view

5. **Background Music** (`/assets/space-ambient.mp3`)
   - Location: `src/components/BackgroundMusic.jsx`
   - Purpose: Optional ambient space music

### Video Requirements

- **Format**: MP4 (recommended)
- **Resolution**: 1920x1080 or higher
- **Duration**: 30-60 seconds per video
- **Size**: Optimize for web (under 50MB per video)

## 🎮 Game Integration

The final challenge page (`src/pages/FinalChallenge.jsx`) includes a placeholder for mini-game integration:

```jsx
// Replace this section with your game
<div className="game-integration-placeholder">
  {/* Your mini-game component or iframe */}
  <iframe 
    src="your-game-url" 
    width="100%" 
    height="400px"
    frameborder="0">
  </iframe>
  
  {/* OR React component */}
  <YourGameComponent onComplete={handleGameComplete} />
</div>
```

## 🎨 Customization

### Colors and Theme

Edit `tailwind.config.js` to customize the space theme:

```js
colors: {
  'neon-blue': '#00f5ff',
  'neon-purple': '#bf00ff',
  'neon-pink': '#ff0080',
  'space-black': '#0a0a0a',
  'space-grey': '#1a1a1a',
}
```

### Fonts

The project uses Google Fonts:
- **Orbitron** - Headers and sci-fi text
- **Rajdhani** - Body text and UI elements

### Animations

Customize animations in `src/index.css`:
- `glow` - Button glow effects
- `float` - Floating animations
- `stars` - Moving stars background

## 📱 Responsive Design

The website is fully responsive with:
- Mobile-first design approach
- Flexible layouts using CSS Grid and Flexbox
- Touch-friendly buttons and interactions
- Optimized typography scaling

## 🌟 Page Structure

1. **Intro** (`/`) - Welcome screen with animated title
2. **Mission Brief** (`/mission-brief`) - Video briefing scene
3. **AI Bot Intro** (`/ai-intro`) - NBL training introduction
4. **Quiz** (`/quiz`) - 10 MCQ astronaut certification
5. **Rocket Launch** (`/rocket-launch`) - Launch sequence
6. **Cupola View** (`/cupola-view`) - ISS Earth observation
7. **Final Challenge** (`/final-challenge`) - Game integration + credits

## 🎯 Educational Content

The website teaches about:
- **NBL Training**: Weightlessness simulation benefits
- **ISS Cupola**: Earth observation and robotics
- **Earth Applications**: Medicine, robotics, climate science
- **Space Research**: 25 years of ISS achievements

## 🔧 Development

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── LoadingScreen.jsx
│   ├── VideoScene.jsx
│   ├── BackgroundMusic.jsx
│   └── AIChat.jsx
├── pages/              # Page components
│   ├── Intro.jsx
│   ├── MissionBrief.jsx
│   ├── AIBotIntro.jsx
│   ├── Quiz.jsx
│   ├── RocketLaunch.jsx
│   ├── CupolaView.jsx
│   └── FinalChallenge.jsx
├── App.jsx             # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## 🎵 Audio Integration

Add background music by placing an audio file at `public/assets/space-ambient.mp3`. The music player includes:
- Play/pause controls
- Mute/unmute toggle
- Automatic looping
- Responsive design

## 🚀 Deployment

The project can be deployed to:
- **Vercel**: `npm run build` then upload dist folder
- **Netlify**: Connect GitHub repo for automatic deployment
- **GitHub Pages**: Use GitHub Actions for deployment
- **Any static hosting**: Upload the `dist` folder contents

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

Created for NASA Space Apps Challenge 2024 - ISS 25th Anniversary

## 🌌 Credits

**Team [Your Team Name]**
- Replace with your actual team name in `src/pages/FinalChallenge.jsx`

**NASA Space Apps Challenge 2024**
- International Space Station 25th Anniversary Theme

---

**Ready to launch your space adventure! 🚀**

For questions or support, please refer to the code comments or create an issue in the repository.