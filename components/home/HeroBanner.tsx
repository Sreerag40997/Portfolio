"use client"

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils' 

// Define some constants for dimensions to ensure consistency
const PIVOT_TOP_OFFSET_PX = 64; // Corresponds to 'top-16'
const WIRE_LENGTH_PX = 128;    // Corresponds to 'h-32'
const SOCKET_HEIGHT_PX = 32;   // Corresponds to 'h-8'
const BULB_GLASS_HEIGHT_PX = 56; // Corresponds to 'h-14'
const WIRE_OVERLAP_PX = 3;     // <<< NEW: How much the wire overlaps into the socket (adjust as needed)

export default function HeroBanner() {
  const lightbulbRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const [isIlluminated, setIsIlluminated] = useState(false)
  const [swingPosition, setSwingPosition] = useState(0)
  const swingAmplitude = 30 // Maximum swing in degrees
  const swingSpeed = 1.5 // Speed of the swing (adjusted for potentially smoother feel)

  useEffect(() => {
    let animationFrameId: number
    let startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const position = Math.sin(elapsed / 1000 * swingSpeed) * swingAmplitude
      setSwingPosition(position)

      const isNearCenter = Math.abs(position) < 10 // Increased threshold slightly
      setIsIlluminated(isNearCenter)

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Calculate the Y position for the start of the bulb glass (for light ray origin)
  const bulbGlassTopY = PIVOT_TOP_OFFSET_PX + WIRE_LENGTH_PX + SOCKET_HEIGHT_PX;
  // Optional: center rays on bulb glass
  const lightRayOriginY = bulbGlassTopY + (BULB_GLASS_HEIGHT_PX / 3);


  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/90 z-0"></div>

      {/* Light rays when illuminated */}
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 w-[2px] bg-gradient-radial from-yellow-200/70 via-yellow-200/40 to-transparent",
          "transition-all duration-700 ease-out",
          isIlluminated ? "opacity-100 h-[150vh]" : "opacity-0 h-0" // h-[150vh] to ensure it covers screen and below
        )}
        style={{
          top: `${lightRayOriginY}px`,
          display:'none'
        }}
      ></div>

      {/* Ceiling and wire */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-neutral-900/80"></div> {/* h-16 is 64px */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-neutral-600 origin-top"
        style={{
          top: `${PIVOT_TOP_OFFSET_PX}px`, // Starts below ceiling
          // <<< MODIFIED: Extend height slightly for visual overlap into socket
          height: `${WIRE_LENGTH_PX + WIRE_OVERLAP_PX}px`,
          transform: `rotate(${swingPosition}deg)`, // Swings from the top
        }}
      ></div>

      {/* Light bulb assembly (pivot point matches wire's top) */}
      <div
        ref={lightbulbRef}
        className="absolute left-1/2 -translate-x-1/2 z-10 origin-top"
        style={{
          top: `${PIVOT_TOP_OFFSET_PX}px`, // Pivot from the same Y as the wire's top
          // <<< UNCHANGED: Translate by original wire length to position socket correctly
          transform: `rotate(${swingPosition}deg) translateY(${WIRE_LENGTH_PX}px)`
        }}
      >
        {/* Bulb socket */}
        {/* NOTE: The wire now visually overlaps the top `WIRE_OVERLAP_PX` pixels of this socket */}
        <div className="w-6 h-8 mx-auto bg-neutral-700 rounded-t-md relative z-[-1]"></div> {/* Added relative z-[-1] to ensure wire renders on top if needed */}

        {/* Bulb glass */}
        <div className={cn(
          "w-10 h-14 mx-auto rounded-full relative transition-all duration-500", // h-14 is 56px
          "before:content-[''] before:absolute before:inset-[3px] before:rounded-full before:transition-all before:duration-500",
          // Base "dimly lit" state (always on)
          "bg-gradient-to-b from-yellow-400/30 to-yellow-300/20 shadow-[0_0_15px_7px_rgba(253,200,72,0.25)]",
          "before:bg-yellow-100/40",
          // "Illuminated" state (when near center)
          isIlluminated && "from-yellow-200/90 to-yellow-100/80 shadow-[0_0_60px_30px_rgba(254,240,138,0.7)]",
          isIlluminated && "before:bg-yellow-50/95" // Brighter inner core
        )}>
          {/* Filament (optional visual detail) */}
          <div className={cn(
            "absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 border-t-2 border-l-2 border-r-2 rounded-t-full transition-colors duration-500",
            isIlluminated ? "border-yellow-400/80" : "border-neutral-400/60"
            )}
          ></div>
        </div>
      </div>

      {/* Name text that gets illuminated */}
      <div className="relative z-10 text-center">
        <h2
          className={cn(
            "text-xl md:text-2xl font-light mb-2 transition-opacity duration-500 delay-100",
            isIlluminated ? "opacity-90 text-neutral-200" : "opacity-20 text-neutral-500"
          )}
        >
          I am
        </h2>
        <h1
          ref={textRef}
          className={cn(
            "text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter transition-all duration-500",
            isIlluminated
              ? "text-yellow-100 scale-110 text-shadow-[0_0_15px_rgba(254,240,138,0.7)]" // Softer text shadow
              : "text-neutral-700 scale-100"
          )}
        >
          SREERAG
        </h1>
        <h2
          className={cn(
            "text-xl md:text-2xl font-light mt-2 transition-opacity duration-500 delay-100",
            isIlluminated ? "opacity-90 text-neutral-200" : "opacity-20 text-neutral-500"
          )}
        >
          Software Engineer
        </h2>

        {/* Scroll indicator (adjust position if needed) */}
        <div className="absolute -bottom-24 md:-bottom-32 left-1/2 -translate-x-1/2 animate-bounce z-20 group"> {/* Added group for hover state */}
          <div className="w-6 h-10 border-2 border-neutral-600 group-hover:border-neutral-400 transition-colors rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-neutral-600 group-hover:bg-neutral-400 transition-colors rounded-full animate-pulse"></div>
          </div>
          <p className="text-xs text-neutral-500 mt-2">Scroll down</p>
        </div>
      </div>
    </section>
  )
}