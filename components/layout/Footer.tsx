import Link from 'next/link'
// Include necessary icons, remove Twitter if not needed, add others if desired
import { Github, Linkedin, Mail, Twitter, Instagram, Phone /* Or WhatsApp */ } from 'lucide-react'
import { cn } from '@/lib/utils' // Assuming you have this utility function

export default function Footer() {
  const currentYear = new Date().getFullYear()

  // --- Color Theme Variables (Orange/Black) ---
  const primaryColor = "text-orange-500"; // Orange for highlights/hovers
  const footerBg = "bg-neutral-900"; // Slightly different dark bg for footer? Or use cardBg/sectionBg
  const textColor = "text-neutral-200"; // Main text color in footer
  const mutedTextColor = "text-neutral-500"; // Muted text color
  const headingColor = "text-neutral-100"; // Slightly brighter for headings
  const borderColor = "border-neutral-700"; // Border color
  const linkHoverColor = primaryColor; // Orange hover for links
  const iconHoverColor = primaryColor; // Orange hover for icons

  return (
    <footer className={cn("py-12 px-4", footerBg, textColor)}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8"> {/* Added more gap */}
          {/* Column 1: Brand/Description */}
          <div>
            <h3 className={cn("text-xl font-bold mb-4", headingColor)}>Sreerag</h3>
            <p className={cn("max-w-xs", mutedTextColor)}>
              Software engineer passionate about building beautiful, functional, and user-friendly applications.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className={cn("text-xl font-bold mb-4", headingColor)}>Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className={cn("transition-colors", mutedTextColor, `hover:${linkHoverColor}`)}>
                  About
                </Link>
              </li>
              <li>
                <Link href="#skills" className={cn("transition-colors", mutedTextColor, `hover:${linkHoverColor}`)}>
                  Skills
                </Link>
              </li>
              <li>
                <Link href="#projects" className={cn("transition-colors", mutedTextColor, `hover:${linkHoverColor}`)}>
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#contact" className={cn("transition-colors", mutedTextColor, `hover:${linkHoverColor}`)}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect Links */}
          <div>
            <h3 className={cn("text-xl font-bold mb-4", headingColor)}>Connect</h3>
            {/* Match icons with Contact section if desired */}
            <div className="flex space-x-5"> {/* Increased spacing */}
              {/* GitHub */}
              <Link
                href="https://github.com/Sreerag472678" // --- Replace ---
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={cn("transition-colors", mutedTextColor, `hover:${iconHoverColor}`)}
               >
                <Github className="h-5 w-5" /> {/* Slightly smaller icons */}
              </Link>
              {/* LinkedIn */}
              <Link
                href="https://www.linkedin.com/in/sreerag-t-m-633b77292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" // --- Replace ---
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={cn("transition-colors", mutedTextColor, `hover:${iconHoverColor}`)}
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              {/* Instagram (Example - Add if needed) */}
              {/* <Link
                href="https://instagram.com/your_username" // --- Replace ---
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                 className={cn("transition-colors", mutedTextColor, `hover:${iconHoverColor}`)}
               >
                 <Instagram className="h-5 w-5" />
               </Link> */}
              {/* WhatsApp/Phone (Example - Add if needed) */}
              {/* <Link
                 href="https://wa.me/919876543210" // --- Replace ---
                 target="_blank"
                 rel="noopener noreferrer"
                 aria-label="WhatsApp"
                 className={cn("transition-colors", mutedTextColor, `hover:${iconHoverColor}`)}
               >
                 <Phone className="h-5 w-5" /> // Or WhatsApp icon SVG
               </Link> */}
               {/* Twitter (Keep if desired, remove if not) */}
              <Link
                href="https://twitter.com" // --- Replace ---
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className={cn("transition-colors", mutedTextColor, `hover:${iconHoverColor}`)}
              >
                 <Twitter className="h-5 w-5" />
              </Link>
              {/* Mail */}
              <Link
                href="mailto:sreerag472678@gmail.com" // --- Replace ---
                aria-label="Email"
                 className={cn("transition-colors", mutedTextColor, `hover:${iconHoverColor}`)}
               >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={cn("border-t mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center", borderColor)}>
          <p className={cn("text-sm", mutedTextColor)}>
            © {currentYear} Sreerag. All rights reserved.
          </p>
          <p className={cn("text-sm mt-2 sm:mt-0", mutedTextColor)}>
            Designed & Built with <span className={primaryColor}>passion</span>
          </p>
        </div>
      </div>
    </footer>
  )
}