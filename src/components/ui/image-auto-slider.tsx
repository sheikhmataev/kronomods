import React from 'react'
import carouselImg1 from '@/assets/carousel/carouselimg1.jpg'
import carouselImg2 from '@/assets/carousel/carouselimg2.jpg'
import carouselImg3 from '@/assets/carousel/carouselimg3.jpg'
import carouselImg4 from '@/assets/carousel/carouselimg4.jpg'
import carouselImg5 from '@/assets/carousel/carouselimg5.jpg'
import carouselImg6 from '@/assets/carousel/carouselimg6.jpeg'
import carouselImg7 from '@/assets/carousel/carouselimg7.jpeg'
import carouselImg8 from '@/assets/carousel/carouselimg8.jpg'

export interface ImageAutoSliderProps {
  images?: string[]
  className?: string
}

export const ImageAutoSlider: React.FC<ImageAutoSliderProps> = ({
  images = [
    carouselImg1,
    carouselImg2,
    carouselImg3,
    carouselImg4,
    carouselImg5,
    carouselImg6,
    carouselImg7,
    carouselImg8,
  ],
  className = '',
}) => {
  // Duplicate images for seamless infinite loop
  const duplicatedImages = [...images, ...images]

  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right 20s linear infinite;
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .image-item {
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .image-item:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
      `}</style>

      <div 
        className={`w-full min-h-screen relative overflow-hidden flex items-center justify-center ${className}`}
        style={{ backgroundColor: '#5F5A56' }}
      >
        {/* Background gradient - using same color as Phase 5c zoom */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(to bottom, #5F5A56 0%, rgba(95, 90, 86, 0.9) 50%, #5F5A56 100%)'
          }}
        />

        {/* Scrolling images container */}
        <div className="relative z-10 w-full flex items-center justify-center py-8">
          <div className="scroll-container w-full max-w-6xl">
            <div className="infinite-scroll flex gap-6 w-max">
              {duplicatedImages.map((image, index) => (
                <div
                  key={index}
                  className="image-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-xl overflow-hidden shadow-2xl"
                >
                  <img
                    src={image}
                    alt={`Gallery image ${(index % images.length) + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom gradient overlay */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-24 z-20"
          style={{
            background: 'linear-gradient(to top, #5F5A56 0%, transparent 100%)'
          }}
        />
      </div>
    </>
  )
}

