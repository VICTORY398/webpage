# Assets Folder

Place your video and audio files here for the NASA Space Apps Challenge website.

## Required Video Files

1. **mission-briefing.mp4** - Mission introduction video
2. **nbl-training.mp4** - Neutral Buoyancy Lab underwater training footage
3. **rocket-launch.mp4** - Rocket launch sequence
4. **cupola-earth-view.mp4** - ISS Cupola window Earth view

## Optional Audio Files

1. **space-ambient.mp3** - Background ambient space music

## Video Specifications

- **Format**: MP4 (H.264 codec recommended)
- **Resolution**: 1920x1080 or higher
- **Duration**: 30-60 seconds per video
- **File Size**: Under 50MB per video (optimize for web)
- **Aspect Ratio**: 16:9 preferred

## Audio Specifications

- **Format**: MP3 or WAV
- **Quality**: 128kbps or higher
- **Duration**: 2-5 minutes (will loop automatically)
- **File Size**: Under 10MB

## Usage

Videos are automatically loaded by the VideoScene component:

```jsx
<VideoScene src="/assets/your-video.mp4" />
```

The website will display loading placeholders if videos are not found.

## Copyright Notice

Ensure all media files are either:
- Created by your team
- Licensed for use (Creative Commons, etc.)
- NASA public domain content
- Properly attributed stock footage

## File Organization

```
public/assets/
├── mission-briefing.mp4
├── nbl-training.mp4
├── rocket-launch.mp4
├── cupola-earth-view.mp4
├── space-ambient.mp3
└── README.md (this file)
```