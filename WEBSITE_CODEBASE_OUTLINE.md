# Kronomods Website - Comprehensive Codebase Outline

## Project Overview
**Kronomods** is a luxury watch company website built as a modern React application featuring sophisticated animations, 3D effects, and premium user experiences. The site showcases watch collections through an immersive scroll-driven narrative.

## Technology Stack

### Core Framework
- **React 19.2.0** with TypeScript
- **Vite** as build tool and dev server
- **Node.js** environment with ES modules

### Animation & 3D Libraries
- **GSAP 3.13.0** with premium plugins:
  - ScrollSmoother (Club GreenSock - requires license for production)
  - ScrollTrigger
  - @gsap/react hooks
- **Three.js 0.181.1** for 3D graphics
- **@react-three/fiber 9.4.0** & **@react-three/drei 10.7.6** for React-Three integration
- **Framer Motion 12.23.24** for additional animations

### Styling & UI
- **Tailwind CSS 3.4.17** with custom design system
- **Custom CSS** with glass morphism effects
- **Responsive design** with mobile-first approach
- **Dark theme** with luxury color palette

### Development Tools
- **TypeScript 5.9.3** with strict configuration
- **ESLint 9.39.1** with React-specific rules
- **Vite plugins** for optimized development
- **PostCSS & Autoprefixer** for CSS processing

## Project Structure

```
kronomods/
├── src/
│   ├── main.tsx              # Application entry point
│   ├── App.tsx              # Main application component
│   ├── App.css             # Application-specific styles
│   ├── index.css           # Global styles & Tailwind base
│   └── components/
│       ├── HeroCardsSection.tsx    # Main content component (1386 lines)
│       ├── WatchScene.tsx          # 3D watch animation
│       ├── Footer.tsx              # Site footer
│       └── ui/
│           ├── contact-section.tsx     # Contact form & social links
│           ├── macbook-pro.tsx         # MacBook Pro SVG component
│           └── image-auto-slider.tsx   # Image carousel component
├── dist/                    # Build output directory
├── package.json            # Dependencies & scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind theme configuration
└── [config files]         # ESLint, TypeScript, PostCSS configs
```

## Design System & Theme

### Color Palette
```css
/* Dark luxury theme */
night: '#05060A'        /* Primary dark background */
obsidian: '#0B0D12'     /* Secondary dark */
graphite: '#1C1F2A'     /* Tertiary dark */
onyx: '#232733'         /* Cards & borders */
champagne: '#E9D5A1'    /* Primary accent (gold) */
auric: '#B89648'        /* Secondary accent (darker gold) */
porcelain: '#F5F1E6'    /* Light text/elements */
```

### Typography
- **Primary Font**: Space Grotesk (sans-serif)
- **Display Font**: Unbounded (headings & display text)
- **Font Smoothing**: Antialiased with optimized text rendering

### Visual Effects
- **Glass Morphism**: Cards with backdrop blur and transparency
- **Gradient Backgrounds**: Multi-layer gradients from night to graphite
- **Texture Overlay**: SVG grain pattern for premium feel
- **Box Shadows**: Custom glow effects for depth

## Application Architecture

### Entry Point Flow
1. **main.tsx** → Renders App component into DOM root
2. **App.tsx** → Sets up GSAP plugins, ScrollSmoother, and layout wrapper
3. **HeroCardsSection.tsx** → Main content with complex scroll-driven animations

### State Management
- **React Hooks**: useRef, useGSAP for animation references
- **No external state library** - simple component-based state
- **Animation State**: Managed through GSAP timelines and triggers

### Routing
- **Single-page application** - no routing library needed
- All content contained within main scrollable experience

## Core Components Analysis

### 1. App.tsx
**Purpose**: Application shell with smooth scrolling setup

**Key Features**:
- GSAP ScrollSmoother initialization with optimized settings
- Fixed header with Kronomods logo
- Smooth scrolling wrapper structure
- Background gradient and styling

**Configuration**:
```javascript
ScrollSmoother.create({
  smooth: 1.2,              // Reduced for smoother feel
  effects: false,           // Prevents conflicts
  smoothTouch: 0.05,        // Mobile optimization
  normalizeScroll: true,    // Cross-device consistency
  ignoreMobileResize: true  // Performance optimization
})
```

### 2. HeroCardsSection.tsx (Primary Component)
**Purpose**: Main content section with scroll-triggered watch showcase

**File Size**: 1,386 lines - This is the heart of the application

**Core Structure**:
- **Multi-phase scroll experience** (400vh height for extended scroll)
- **3D watch cards** with dynamic positioning and transforms
- **MacBook Pro showcase** with video integration
- **Image slider section** for gallery display
- **Contact form integration**

**Watch Cards Configuration**:
```javascript
const cards = [
  {
    role: 'center',
    title: 'Chrono Apex',
    subtitle: 'Flagship tourbillon · 120h reserve',
    accent: 'KA',
    image: watch1Image, // inside /src/assets
  },
  {
    role: 'left', 
    title: 'Obsidian GMT',
    subtitle: 'Dual timezone · Meteorite dial',
    accent: 'KG',
    image: watch2Image, // inside /src/assets
  },
  {
    role: 'right',
    title: 'Eclipse No. 8', 
    subtitle: 'Skeleton calibre · Night lume',
    accent: 'KE',
    image: watch3Image, // inside /src/assets
  }
]
```

**Animation Phases** (Desktop Experience):
- **Phase 1**: Initial card presentation with 3D positioning
- **Phase 2**: Cards fade out, prepare for next content
- **Phase 3**: MacBook Pro emerges with video showcase
- **Phase 4**: Image gallery slider appears
- **Phase 5**: Contact section and footer presentation

**Responsive Design**:
- **Mobile-first approach** with different animation sets
- **Breakpoints**: Mobile (<640px), Tablet (640px-1024px), Desktop (>1024px)
- **Reduced motion support** for accessibility
- **Touch-optimized** interactions for mobile devices

### 3. WatchScene.tsx
**Purpose**: 3D animated watch component using Three.js

**Features**:
- **Real-time 3D rendering** with React Three Fiber
- **Animated watch elements**: dial rotation, hand movement
- **Physical materials**: metallic surfaces with realistic lighting
- **Torus geometry**: Watch band/ring elements
- **Shadow casting**: Realistic depth and lighting effects

**3D Elements**:
- Cylindrical dial with gold metallic material
- Animated minute and hour hands
- Watch band represented by torus geometry
- Shadow-receiving base plane

### 4. UI Components

#### contact-section.tsx
**Purpose**: Contact form and social media links

**Features**:
- **Contact form** with validation (first name, last name, email, phone, message)
- **Social links**: Instagram and Tise marketplace
- **Norwegian localization**: Phone number with 🇳🇴 flag
- **Responsive grid layout** for mobile optimization
- **Glass morphism styling** consistent with theme

#### macbook-pro.tsx
**Purpose**: SVG-based MacBook Pro component for showcasing content

**Features**:
- **Scalable SVG** MacBook Pro illustration (650x400 default)
- **Video integration** with autoplay support
- **Image display** capability
- **Safari-specific** play button overlay
- **Realistic design** with detailed shadows and highlights
- **Responsive aspect ratio** maintenance

#### image-auto-slider.tsx
**Purpose**: Infinite horizontal scrolling image gallery

**Features**:
- **Infinite scroll animation** (20s duration, linear)
- **Image masking** with gradient fade edges
- **Hover effects** with scale and brightness changes
- **Responsive sizing** across devices
- **Missing assets**: 8 carousel images referenced but not present


## Key Features & Functionality

### 1. Premium Scroll Experience
- **ScrollSmoother**: Professional-grade smooth scrolling
- **Scroll-triggered animations**: Content appears based on scroll position
- **Performance optimized**: GPU acceleration and reduced motion support

### 2. 3D Watch Showcase
- **Three.js integration**: Real-time 3D rendering
- **Interactive watch model**: Animated hands and rotating dial
- **Realistic materials**: Metallic surfaces with proper lighting
- **Responsive performance**: Optimized for various devices

### 3. Luxury Brand Presentation
- **Premium typography**: Space Grotesk and Unbounded fonts
- **Sophisticated color scheme**: Dark theme with gold accents
- **Glass morphism effects**: Modern translucent card designs
- **Professional imagery**: High-end product photography placeholders

### 4. Interactive Elements
- **Contact form**: Multi-field form with Norwegian phone formatting
- **Social integration**: Instagram and Tise marketplace links
- **Video showcase**: MacBook Pro with autoplay video content
- **Image gallery**: Infinite scrolling product imagery

### 5. Cross-Browser & Cross-Device Compatibility
- **Universal Device Support**: iPhone, Samsung Galaxy, iPad, Android tablets, desktop browsers
- **Browser Compatibility**: Safari, Chrome, Firefox, Edge, Opera, Samsung Internet
- **Mobile-First Approach**: Touch-optimized interactions and responsive design
- **iPhone-Specific Optimizations**: Critical fixes for iOS Safari and WebKit browsers
- **Performance Considerations**: GPU acceleration and transform optimizations

## Cross-Device & Cross-Browser Compatibility Requirements

### Critical Priority: Universal Device Support
**The Kronomods website MUST work flawlessly across all devices and browsers.** This is non-negotiable for a luxury brand website. The user experience must be consistent and premium regardless of the device or browser being used.

### Supported Devices & Browsers
- **iPhone**: All models (iPhone SE to iPhone 15 Pro Max)
- **Samsung Galaxy**: All recent models (S series, A series, Note series, Fold series)
- **iPad & Android Tablets**: Full tablet experience optimization
- **Desktop**: Windows, Mac, Linux compatibility
- **Browsers**: Safari, Chrome, Firefox, Edge, Opera, Samsung Internet

### iPhone-Specific Issues & Fixes

#### 1. iOS Safari Video Autoplay Issues
**Problem**: Safari blocks video autoplay without user interaction
**Solution**: 
```javascript
// User interaction tracking for Safari compliance
const attemptVideoPlay = async (video: HTMLVideoElement): Promise<boolean> => {
  if (isSafari() && !hasUserInteracted) {
    // Add click handler for Safari without user interaction
    const handleClick = () => {
      attemptVideoPlay(video)
      video.removeEventListener('click', handleClick)
      video.style.cursor = 'default'
    }
    video.addEventListener('click', handleClick)
    video.style.cursor = 'pointer'
  } else {
    return video.play().catch(() => false)
  }
}
```

#### 2. iOS ScrollSmoother Conflicts
**Problem**: ScrollSmoother interferes with native iOS scrolling behavior
**Solution**:
```javascript
ScrollTrigger.config({
  ignoreMobileResize: true  // Prevents iOS viewport change refresh loops
})

ScrollSmoother.create({
  smoothTouch: 0.05,        // Reduced for iOS touch sensitivity
  normalizeScroll: true,   // Cross-device consistency
  ignoreMobileResize: true  // Performance optimization
})
```

#### 3. iOS Viewport Height Issues
**Problem**: iOS viewport height changes when Safari UI appears/disappears
**Solution**:
```css
/* Use stable viewport units */
.hero-section {
  height: 100svh; /* Stable viewport height */
}

/* Safe area insets for iPhone notches */
.contact-portal {
  padding-top: calc(env(safe-area-inset-top) + 16px);
  padding-bottom: calc(env(safe-area-inset-bottom) + 40px);
}
```

#### 4. iOS Touch Event Handling
**Problem**: iOS requires specific touch event handling for smooth scrolling
**Solution**:
```javascript
// iOS-specific scroll container fixes
const scrollContainer = contactTarget.querySelector('div')
if (scrollContainer && isIOS()) {
  scrollContainer.style.WebkitOverflowScrolling = 'touch'
  scrollContainer.style.touchAction = 'pan-y'
  scrollContainer.scrollTop = 0 // Force reflow
  scrollContainer.focus() // Enable touch scrolling
}
```

#### 5. iOS Hardware Acceleration
**Problem**: iOS Safari needs explicit hardware acceleration for smooth animations
**Solution**:
```javascript
// Force GPU acceleration on iOS
gsap.set(element, {
  force3D: true,
  transform: 'translate3d(0,0,0)',
  willChange: 'transform, opacity'
})

// CSS for iOS Safari
.ios-scroll-fix {
  transform: translate3d(0,0,0);
  WebkitBackfaceVisibility: 'hidden';
  backfaceVisibility: 'hidden';
}
```

#### 6. iOS Keyboard & Form Issues
**Problem**: iOS keyboard interferes with fixed positioning and scroll behavior
**Solution**:
```javascript
// Handle iOS keyboard appearance/disappearance
onStart: () => {
  // Hide header to prevent overlap
  const header = document.querySelector('header')
  if (header) (header as HTMLElement).style.display = 'none'
},
onReverseComplete: () => {
  // Show header again
  const header = document.querySelector('header')
  if (header) (header as HTMLElement).style.display = ''
}
```

### Samsung & Android Specific Optimizations

#### 1. Samsung Internet Browser
**Problem**: Samsung Internet has different scroll behavior than Chrome
**Solution**: 
```javascript
// Samsung-specific scroll optimizations
ScrollTrigger.config({
  ignoreMobileResize: true, // Prevents Samsung viewport issues
  normalizeScroll: true     // Consistent scroll behavior
})
```

#### 2. Android Chrome Scrolling
**Problem**: Android Chrome has momentum scrolling that can interfere with animations
**Solution**:
```javascript
// Android momentum scroll handling
scrollTrigger: {
  fastScrollEnd: true,     // Prevents momentum scroll issues
  anticipatePin: 1,        // Prevents layout shifts
  scrub: 0.5              // Reduced sensitivity for Android
}
```

### Cross-Browser Compatibility Matrix

| Feature | Safari | Chrome | Firefox | Edge | Samsung Internet |
|---------|--------|--------|---------|------|------------------|
| Video Autoplay | ✅ (with fix) | ✅ | ✅ | ✅ | ✅ |
| Smooth Scrolling | ✅ (optimized) | ✅ | ✅ | ✅ | ✅ (optimized) |
| 3D Animations | ✅ (GPU accel) | ✅ | ✅ | ✅ | ✅ |
| Touch Events | ✅ (iOS fixes) | ✅ | ✅ | ✅ | ✅ |
| Form Inputs | ✅ (safe area) | ✅ | ✅ | ✅ | ✅ |

### Mobile Performance Optimizations

#### 1. Reduced Motion Support
```javascript
// Respect user's motion preferences
const prefersReducedMotion = () => 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (prefersReducedMotion()) {
  // Disable complex animations
  gsap.globalTimeline.timeScale(0)
}
```

#### 2. Touch-Friendly Interactions
```javascript
// Mobile-optimized ScrollTrigger settings
scrollTrigger: {
  scrub: 0.5,           // Reduced for mobile
  fastScrollEnd: true,  // Prevents momentum issues
  anticipatePin: 1      // Prevents layout shifts
}
```

#### 3. Memory Management
```javascript
// Clean up animations on mobile
return () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  gsap.globalTimeline.clear()
}
```

### Testing Requirements

#### Device Testing Checklist
- [ ] iPhone (iOS 17+) - Safari
- [ ] Samsung Galaxy (Android 13+) - Samsung Internet & Chrome
- [ ] iPad (iPadOS 17+) - Safari
- [ ] Desktop (Windows/Mac) - Chrome, Firefox, Edge, Safari
- [ ] Tablet (Android) - Chrome

#### Critical User Flows to Test
1. **Scroll Experience**: Smooth scrolling across all phases
2. **Video Playback**: Autoplay works on all devices
3. **Contact Form**: Keyboard behavior on mobile
4. **Touch Interactions**: Responsive touch events
5. **Performance**: 60fps animations on all devices

### Browser-Specific CSS Fixes

#### Safari WebKit
```css
/* Safari-specific fixes */
.contact-portal-container {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

/* Safe area support for iPhone notches */
@supports (padding: max(0px)) {
  .contact-section {
    padding-left: max(16px, env(safe-area-inset-left));
    padding-right: max(16px, env(safe-area-inset-right));
  }
}
```

#### Chrome/Android
```css
/* Chrome-specific optimizations */
.gpu-accelerated {
  transform: translate3d(0, 0, 0);
  will-change: transform, opacity;
}

/* Android overscroll behavior */
.mobile-scroll-container {
  overscroll-behavior: contain;
  touch-action: pan-y;
}
```

### Performance Monitoring

#### Mobile Performance Metrics
- **60fps animations** across all devices
- **Memory usage** under 100MB on mobile
- **Load time** under 3 seconds on 3G
- **Touch response** under 100ms

#### Cross-Browser Testing Tools
- **BrowserStack** for comprehensive device testing
- **Safari Web Inspector** for iOS debugging
- **Chrome DevTools** for Android debugging
- **Lighthouse** for performance scoring

### Ongoing Maintenance

#### Regular Testing Schedule
- **Weekly**: Test on iPhone and Samsung devices
- **Monthly**: Full cross-browser compatibility check
- **Quarterly**: Performance optimization review

#### Update Requirements
- **iOS Updates**: Test on new iOS versions within 2 weeks
- **Android Updates**: Test on new Android versions within 2 weeks
- **Browser Updates**: Test on new browser versions within 1 week

This comprehensive cross-device and cross-browser compatibility ensures the Kronomods website delivers a premium, consistent experience across all platforms, with special attention to iPhone-specific issues that commonly affect luxury brand websites.

## Technical Implementation Details

### Animation Architecture
- **GSAP Timeline**: Coordinated scroll-triggered animations
- **MediaQuery responsive**: Different animation sets per device
- **Performance optimization**: will-change, force3D, and transform hints
- **User interaction tracking**: For Safari video autoplay compliance

### Component Communication
- **Props-based**: Simple parent-child communication
- **Portal usage**: ReactDOM.createPortal for advanced layouts
- **Ref-based animations**: Direct DOM manipulation through useRef
- **Event handling**: Custom video play logic and form interactions

### Build & Deployment
- **Vite bundling**: Modern build tool with fast HMR
- **GitHub Pages**: Configured for `/kronomods/` base path
- **TypeScript compilation**: Strict type checking enabled
- **Asset optimization**: Lazy loading and performance hints

## Current Status & Next Steps

### Completed Features
✅ **Core application structure** and component architecture
✅ **Animation framework** with GSAP integration  
✅ **Responsive design** with mobile/tablet/desktop breakpoints
✅ **3D watch component** with Three.js
✅ **Contact form** with validation and styling
✅ **MacBook Pro showcase** component
✅ **Image slider** with infinite scroll animation
✅ **Dark luxury theme** with custom Tailwind configuration

### Missing Implementation
❌ **Form submission logic** - Contact form needs backend integration
❌ **Content management** - Product descriptions and specifications
❌ **SEO optimization** - Meta tags, structured data
❌ **Performance monitoring** - Analytics and user tracking
❌ **Error boundaries** - React error handling
❌ **Loading states** - Image and video loading indicators

### Critical Dependencies for Production
⚠️ **Club GreenSock License** required for ScrollSmoother in production
⚠️ **Backend service** - Contact form submission endpoint

## Development Workflow

### Local Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint checks
```

### Deployment
```bash
npm run deploy       # Deploy to GitHub Pages
```

## Architecture Strengths

1. **Modern React patterns**: Hooks, TypeScript, functional components
2. **Performance-focused**: Optimized animations and rendering
3. **Mobile-responsive**: Touch-friendly interactions
4. **Accessibility aware**: Reduced motion and keyboard navigation
5. **Maintainable code**: Well-structured components and clear separation
6. **Premium UX**: Sophisticated animations and visual effects

## Areas for Enhancement

1. **Asset Management**: Implement dynamic imports and optimization
2. **State Management**: Consider Zustand/Redux for complex state
3. **Testing**: Add unit tests for components and animations
4. **Documentation**: Component documentation with Storybook
5. **Performance**: Bundle analysis and code splitting
6. **Internationalization**: Multi-language support beyond Norwegian

---

*This outline provides a complete understanding of the Kronomods website codebase, enabling efficient development, debugging, and feature enhancement.*