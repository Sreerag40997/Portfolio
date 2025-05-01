"use client"

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils' // Assuming you have this utility function

// Updated Skill type with 'database' category
type Skill = {
  name: string
  level: number // Proficiency percentage (0-100)
  category: 'frontend' | 'backend' | 'database' | 'other' // Added 'database'
}

// Updated skills list based on your requirements
const skills: Skill[] = [
  // Frontend
  { name: 'HTML/CSS', level: 95, category: 'frontend' },
  { name: 'JavaScript', level: 80, category: 'frontend' },
  { name: 'TypeScript', level: 70, category: 'frontend' },
  { name: 'React', level: 92, category: 'frontend' },
  { name: 'Next.js', level: 88, category: 'frontend' },

  // Backend
  { name: 'Django (Python)', level: 70, category: 'backend' },
  { name: 'Laravel (PHP)', level: 65, category: 'backend' },
  { name: 'Gin (Go)', level: 78, category: 'backend' },
  { name: 'Go Language', level: 80, category: 'backend' }, // Added Golang explicitly
  { name: 'REST APIs', level: 90, category: 'backend' }, // Added REST
  { name: 'GraphQL', level: 75, category: 'backend' }, // Added GraphQL

  // Database
  { name: 'PostgreSQL', level: 80, category: 'database' },
  { name: 'MySQL', level: 78, category: 'database' },

  // Other (if needed, or add to specific categories)
  // { name: 'Git', level: 85, category: 'other' },
  // { name: 'Docker', level: 70, category: 'other' },
]

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Updated categories list
  const categories = [
    { id: 'all', name: 'All Skills' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'database', name: 'Database' }, // Changed from 'Tools & DevOps'
  ]

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory)

  // --- Color Theme Variables ---
  const primaryColor = "text-orange-500";
  const primaryBg = "bg-orange-500";
  const primaryFg = "text-white"; // Text on primary background
  const sectionBg = "bg-black";
  const cardBg = "bg-neutral-900"; // Darker card background
  const textColor = "text-neutral-100";
  const mutedTextColor = "text-neutral-400";
  const progressBarBg = "bg-neutral-700"; // Background for the progress bar track
  const buttonInactiveBg = cardBg; // Use card background for inactive buttons
  const buttonInactiveHoverBg = "hover:bg-neutral-800"; // Slightly lighter hover for inactive

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger animation only when intersecting and not already triggered
        if (entry.isIntersecting && !isInView) {
          setIsInView(true)
          // Optional: If you want the animation to reset when scrolling out of view
          // } else if (!entry.isIntersecting && isInView) {
          //   setIsInView(false);
        }
      },
      { threshold: 0.15 } // Adjust threshold slightly if needed
    )

    const currentRef = sectionRef.current; // Capture ref value

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
    // Add isInView to dependency array ONLY if you want reset on scroll out behavior
  }, [isInView]) // Rerun effect if isInView changes (for potential reset logic)


  return (
    <section id="skills" ref={sectionRef} className={cn("py-24 px-4", sectionBg, textColor)}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          {/* Orange divider */}
          <div className={cn("mx-auto w-24 h-1 mb-8", primaryBg)}></div>
          {/* Muted text */}
          <p className={cn("max-w-2xl mx-auto", mutedTextColor)}>
            Here are some of the technologies and tools I work with
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-6 py-2 rounded-full transition-colors duration-200 ease-in-out font-medium",
                activeCategory === category.id
                  ? `${primaryBg} ${primaryFg}` // Active button: orange bg, white text
                  : `${buttonInactiveBg} ${textColor} ${buttonInactiveHoverBg}` // Inactive: dark bg, light text, hover effect
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSkills.map((skill, index) => (
            <div key={skill.name} className={cn("rounded-lg p-6 shadow-md", cardBg)}>
              <div className="flex justify-between items-center mb-3">
                {/* Skill name uses default text color */}
                <h3 className="font-semibold">{skill.name}</h3>
                {/* Percentage uses muted text color */}
                <span className={cn("text-sm font-medium", mutedTextColor)}>{skill.level}%</span>
              </div>
              {/* Progress Bar Background */}
              <div className={cn("w-full rounded-full h-2.5", progressBarBg)}>
                {/* Progress Bar Fill (Animated) */}
                <div
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-1000 ease-out delay-100", // Added slight delay
                    primaryBg, // Orange fill
                    isInView ? "w-[var(--width)]" : "w-0" // Animate width based on isInView state
                  )}
                  // Use CSS custom property to set the target width for the animation
                  style={{ '--width': `${skill.level}%` } as React.CSSProperties}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Technologies Section */}
        <div className="mt-16 text-center">
          <h3 className="text-xl md:text-2xl font-semibold mb-8">Also Familiar With</h3>
          {/* List relevant tools/concepts not in the main progress bars */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
            {/* Combined relevant items from previous list and added Git/Docker */}
            {['Git', 'Figma', 'Redux', 'GitHub Actions'].map((tech) => (
              <span
                key={tech}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium",
                   cardBg, // Use card background for tags
                   textColor // Use default text color
                   )}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}