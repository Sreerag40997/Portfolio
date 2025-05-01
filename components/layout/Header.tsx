"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/theme-toggle' // Assuming path is correct
import { Menu, X, Download } from 'lucide-react' // Added Download icon
import { Button } from '@/components/ui/button' // Assuming path is correct

const navItems = [
  // Home is usually handled by the logo link, removed from here for less redundancy
  // { name: 'Home', href: '/' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

// --- Replace with the actual path to your resume file in the public folder ---
const RESUME_PATH = '\sreerag_ats_resume.pdf' // Example path

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // --- Color Theme Variables (Orange/Black) ---
  const primaryColor = "text-orange-500";
  const primaryBg = "bg-orange-500";
  const primaryFg = "text-white";
  const headerBgScrolled = "bg-black/90"; // Dark background when scrolled
  const headerBgTransparent = "bg-transparent";
  const headerTextColor = "text-neutral-100"; // Default text color in header
  const linkHoverColor = primaryColor; // Orange hover for links
  const mobileMenuBg = "bg-black/95"; // Dark background for mobile menu
  const buttonTextColor = headerTextColor; // Text color for icon buttons
  // Resume Button styles
  const resumeButtonBase = "border-orange-500 text-orange-500 hover:bg-orange-500/10";
  const resumeButtonMobile = "text-orange-500 hover:bg-orange-500/10 w-full justify-start";


  useEffect(() => {
    const handleScroll = () => {
      // Trigger change slightly earlier if desired
      setIsScrolled(window.scrollY > 30)
    }

    // Set initial state in case page loads already scrolled
    handleScroll();

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // Tailwind's 'md' breakpoint
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 lg:px-8',
         // Apply dark theme text color by default
        headerTextColor,
        isScrolled
          ? `${headerBgScrolled} backdrop-blur-lg py-3 shadow-md` // Dark blurred background
          : `${headerBgTransparent} py-5` // Transparent background
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "text-2xl font-bold tracking-tighter transition-colors",
             `hover:${linkHoverColor}` // Orange hover
          )}
          onClick={() => setIsMobileMenuOpen(false)} // Close menu on logo click
        >
          SR
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors",
                `hover:${linkHoverColor}` // Orange hover
              )}
            >
              {item.name}
            </Link>
          ))}
          {/* Resume Download Button (Desktop) */}
          <Button variant="outline" size="sm" className={resumeButtonBase} asChild>
            <a href={RESUME_PATH} download={`Sreerag_Resume.pdf`} target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" />
              Resume
            </a>
          </Button>
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation Controls */}
        <div className="flex md:hidden items-center">
          <ThemeToggle />
          <Button
            variant="ghost" // Ghost is fine here, color inherited
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn("ml-2", buttonTextColor)} // Ensure icon color is visible
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} // Accessibility
            aria-expanded={isMobileMenuOpen} // Accessibility
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {/* Added transition for smoother open/close */}
      <div className={cn(
          "md:hidden absolute top-full left-0 right-0 shadow-lg overflow-hidden transition-all duration-300 ease-in-out",
          mobileMenuBg, // Dark blurred background
          "backdrop-blur-xl", // Stronger blur for mobile menu
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0" // Height and opacity transition
         )}
         // Ensures focus is managed correctly when menu opens/closes
         // You might need a more robust focus trap library for production
         aria-hidden={!isMobileMenuOpen}
         >
          <div className="flex flex-col space-y-2 p-6 pt-4"> {/* Adjusted padding */}
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-base font-medium py-3 transition-colors rounded-md px-3", // Added padding/rounding for better tap target
                  headerTextColor, // Ensure text color
                  `hover:${linkHoverColor} hover:bg-neutral-800` // Orange hover + subtle bg
                )}
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
              >
                {item.name}
              </Link>
            ))}
             {/* Resume Download Button (Mobile) */}
             <Button variant="ghost" size="lg" className={cn("mt-2", resumeButtonMobile)} asChild>
                 <a
                    href={RESUME_PATH}
                    download={`Sreerag_Resume.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
                >
                     <Download className="mr-3 h-5 w-5" />
                     Download Resume
                 </a>
             </Button>
          </div>
      </div>
    </header>
  )
}