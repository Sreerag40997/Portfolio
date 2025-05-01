"use client"

import { useState } from 'react'
import Image from 'next/image'
// Assuming Button is from shadcn/ui or similar. Adjust if needed.
import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'
import { cn } from '@/lib/utils' // Assuming you have this utility function

type Project = {
  id: number
  title: string
  description: string
  image: string // URL to project image/screenshot
  tags: string[] // Technologies used
  liveUrl?: string // Optional URL to live demo
  githubUrl?: string // Optional URL to GitHub repo
  category: 'web' | 'backend' // Updated categories
}

// --- Updated Project Data ---
const projects: Project[] = [
  {
    id: 1,
    title: "Store9",
    description: "A full-stack e-commerce platform built with Next.js for a fast frontend experience, featuring product browsing, cart management, and user accounts.",
    // --- Replace with actual Store9 screenshot URL ---
    image: "https://images.pexels.com/photos/3769747/pexels-photo-3769747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Next.js", "Javascript", "TypeScript", "Tailwind CSS", "E-commerce"], // Updated tags
    liveUrl: "https://demo.store9.io", // Replace with actual URL or remove if none
    githubUrl: "https://github.com/sreerag472678/store9-frontend", // Replace with actual URL or remove if none
    category: "web"
  },
  {
    id: 2,
    title: "Property9",
    description: "A property listing web application featuring a Next.js frontend and a high-performance backend API built with Go (Gin) and MySQL.",
     // --- Replace with actual Property9 screenshot URL ---
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Next.js", "Javasript", "Go", "Gin", "MySQL", "REST API","Graphql", "Tailwind CSS"], // Updated tags
    liveUrl: "https://property9.commerce9.io", // Replace with actual URL or remove if none
    githubUrl: "https://github.com/sreerag472678/property9-frontend", // Replace with actual URL or remove if none
    category: "web" // Primarily a web app experience, backend is part of it
  },
  {
    id: 3,
    title: "This Portfolio Website",
    description: "The responsive portfolio website you are currently viewing, built with Next.js and styled with Tailwind CSS.",
    // --- Replace with a screenshot of your portfolio ---
    image: "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"], // Add/remove tags as applicable
    // Add liveUrl if it's different from the current domain, otherwise omit
    // liveUrl: "https://your-portfolio-url.com",
    githubUrl: "https://github.com/your-username/your-portfolio-repo", // Replace with actual URL
    category: "web"
  },
  {
    id: 4, // Added a separate backend-focused example
    title: "Gin Backend API",
    description: "A standalone RESTful API service built with Go (Gin) for handling data operations, potentially powering applications like Property9.",
    // --- Replace with a relevant backend/API screenshot or diagram if available ---
    image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Go", "Gin", "MySQL", "REST API","Graphql", "API Development", "Backend"],
    // No liveUrl for a pure backend usually, unless it has a Swagger/doc page
    githubUrl: "https://github.com/your-username/property9-backend", // Example: Link specifically to backend repo if separate
    category: "backend"
  }
  // Add more projects as needed
];

// Categories remain the same
const categories = [
  { id: "all", name: "All Projects" },
  { id: "web", name: "Web Development" },
  { id: "backend", name: "Backend Systems" }
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter(project => project.category === activeCategory)

  // --- Color Theme Variables (Orange/Black) ---
  const primaryBg = "bg-orange-500";
  const primaryFg = "text-white"; // Text on primary background
  const sectionBg = "bg-black";
  const cardBg = "bg-neutral-900"; // Darker card background
  const textColor = "text-neutral-100";
  const mutedTextColor = "text-neutral-400";
  const tagBg = "bg-neutral-700"; // Background for tags
  const tagFg = "text-neutral-200"; // Text color for tags
  const buttonInactiveBg = cardBg; // Use card background for inactive buttons
  const buttonInactiveHoverBg = "hover:bg-neutral-800"; // Slightly lighter hover for inactive
  // Overlay button styles
  const overlayButtonBase = "rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-white hover:bg-black/80 hover:border-white/40";


  return (
    <section id="projects" className={cn("py-24 px-4", sectionBg, textColor)}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className={cn("mx-auto w-24 h-1 mb-8", primaryBg)}></div>
          <p className={cn("max-w-2xl mx-auto", mutedTextColor)}>
            Here are some of the projects I've worked on, showcasing my skills in frontend and backend development.
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
                  ? `${primaryBg} ${primaryFg}`
                  : `${buttonInactiveBg} ${textColor} ${buttonInactiveHoverBg}`
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={cn(
                  "rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                  cardBg
              )}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Image Container */}
              <div className="relative w-full h-56 group">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={cn(
                    "object-cover transition-transform duration-500 ease-in-out",
                    hoveredProject === project.id ? "scale-105" : "scale-100"
                  )}
                />
                {/* Overlay for Links */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 flex items-center justify-center",
                  hoveredProject === project.id ? "opacity-100" : "opacity-0"
                )}>
                   <div className="flex space-x-4">
                     {project.githubUrl && (
                       <Button size="sm" variant="outline" className={overlayButtonBase} asChild>
                         <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} GitHub Repository`}>
                           <Github className="h-4 w-4 mr-2" />
                           Code
                         </a>
                       </Button>
                     )}
                     {project.liveUrl && (
                       <Button size="sm" variant="outline" className={overlayButtonBase} asChild>
                         <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} Live Demo`}>
                           <ExternalLink className="h-4 w-4 mr-2" />
                           Live Demo
                         </a>
                       </Button>
                     )}
                   </div>
                </div>
              </div>
              {/* Content Area */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className={cn("mb-4 text-sm", mutedTextColor)}>{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={`${project.id}-${tag}`}
                      className={cn(
                        "px-3 py-1 text-xs rounded-full font-medium",
                        tagBg,
                        tagFg
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}