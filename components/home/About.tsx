import { GraduationCap, Briefcase, Code, Heart } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils' // Assuming you have cn for potential future use

export default function About() {
  // Define color classes for easy modification
  const primaryColor = "text-orange-500"; // Orange text
  const primaryBg = "bg-orange-500"; // Orange background element
  const primaryBorder = "border-orange-500"; // Orange border
  const iconBg = "bg-neutral-800"; // Dark background for icons, contrasts with orange
  const textColor = "text-neutral-100"; // Main text color on black bg
  const mutedTextColor = "text-neutral-400"; // Muted text color on black bg
  const sectionBg = "bg-black"; // Section background

  return (
    <section id="about" className={cn("py-24 px-4", sectionBg, textColor)}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* Heading uses default section text color */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          {/* Divider uses primary orange background */}
          <div className={cn("mx-auto w-24 h-1 mb-8", primaryBg)}></div>
          {/* Muted text uses the defined muted color */}
          <p className={cn("max-w-2xl mx-auto", mutedTextColor)}>
            I'm a passionate software engineer with a focus on creating elegant solutions to complex problems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            {/* Image Container - shadow adjusted slightly for dark bg */}
            <div className="aspect-square w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-lg shadow-neutral-900/50">
              <div className="relative w-full h-full">
                <Image
                  src="\sreerag.jpeg"
                  alt="Sreerag - Software Engineer"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            {/* Decorative elements use primary orange border */}
            <div className={cn("absolute -bottom-6 -left-6 w-24 h-24 border-2 rounded-lg -z-10", primaryBorder)}></div>
            <div className={cn("absolute -top-6 -right-6 w-24 h-24 border-2 rounded-lg -z-10", primaryBorder)}></div>
          </div>

          {/* Text Content Section */}
          <div>
             {/* Sub-heading uses default section text color */}
            <h3 className="text-2xl font-bold mb-6">Who am I?</h3>
             {/* Paragraphs use default section text color */}
            <p className="mb-6 text-lg">
              I'm a software engineer with a passion for creating elegant, efficient, and user-friendly applications. With a strong foundation in both frontend and backend technologies, I enjoy building complete solutions that solve real-world problems.
            </p>
            <p className="mb-8 text-lg">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through blog posts and mentoring.
            </p>

            {/* Info Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Item 1: Education */}
              <div className="flex items-start">
                <div className={cn("mr-4 p-3 rounded-lg", iconBg)}> {/* Icon background */}
                  <GraduationCap className={cn("h-6 w-6", primaryColor)} /> {/* Icon color */}
                </div>
                <div>
                  <h4 className="font-bold mb-1">Education</h4>
                  <p className={mutedTextColor}>Bachelor In Computer Application</p> {/* Muted text */}
                </div>
              </div>

              {/* Item 2: Experience */}
              <div className="flex items-start">
                 <div className={cn("mr-4 p-3 rounded-lg", iconBg)}> {/* Icon background */}
                  <Briefcase className={cn("h-6 w-6", primaryColor)} /> {/* Icon color */}
                </div>
                <div>
                  <h4 className="font-bold mb-1">Experience</h4>
                  <p className={mutedTextColor}>1+ Years</p> {/* Muted text */}
                </div>
              </div>

              {/* Item 3: Projects */}
              <div className="flex items-start">
                 <div className={cn("mr-4 p-3 rounded-lg", iconBg)}> {/* Icon background */}
                  <Code className={cn("h-6 w-6", primaryColor)} /> {/* Icon color */}
                </div>
                <div>
                  <h4 className="font-bold mb-1">Projects</h4>
                  <p className={mutedTextColor}>2+ Completed</p> {/* Muted text */}
                </div>
              </div>

              {/* Item 4: Interests */}
              <div className="flex items-start">
                 <div className={cn("mr-4 p-3 rounded-lg", iconBg)}> {/* Icon background */}
                  <Heart className={cn("h-6 w-6", primaryColor)} /> {/* Icon color */}
                </div>
                <div>
                  <h4 className="font-bold mb-1">Interests</h4>
                  <p className={mutedTextColor}>Full Stack Devolopment</p> {/* Muted text */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}