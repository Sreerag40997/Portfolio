"use client"

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner" // Assuming you're using sonner for toasts
import { Mail, MessageSquare, Send, MapPin, Phone, Github, Linkedin } from "lucide-react" // Import used icons
import { cn } from '@/lib/utils' // Assuming you have this utility function

// Zod schema for form validation (no changes needed)
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  })

  // --- Color Theme Variables (Orange/Black) ---
  const primaryColor = "text-orange-500";
  const primaryBg = "bg-orange-500";
  const primaryFg = "text-white"; // Text on primary background
  const sectionBg = "bg-black"; // Changed from bg-muted/30
  const cardBg = "bg-neutral-900"; // Darker card background
  const textColor = "text-neutral-100";
  const mutedTextColor = "text-neutral-400";
  const inputBg = "bg-neutral-800"; // Background for inputs on dark theme
  const inputBorder = "border-neutral-700"; // Border for inputs
  const inputFocusRing = "focus-visible:ring-orange-500"; // Focus ring color
  const iconContainerBg = "bg-neutral-800"; // Background for icon containers in contact info
  const socialIconBg = "bg-neutral-800"; // Background for social icons
  const socialIconHoverBg = primaryBg; // Hover background for social icons
  const socialIconHoverFg = primaryFg; // Hover text/icon color for social icons

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    console.log("Form Values:", values);

    // Simulate form submission if no backend yet
    setTimeout(() => {
      setIsSubmitting(false);
      form.reset();
      toast.success("Message sent successfully! I'll get back to you soon.");
    }, 1500);
  }

  return (
    <section id="contact" className={cn("py-24 px-4", sectionBg, textColor)}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className={cn("mx-auto w-24 h-1 mb-8", primaryBg)}></div>
          <p className={cn("max-w-2xl mx-auto", mutedTextColor)}>
            Have a project in mind or want to discuss an opportunity? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form Column */}
          <div>
            <h3 className={cn("text-2xl font-bold mb-6 flex items-center", textColor)}>
              <MessageSquare className="mr-3 h-6 w-6" />
              Send Me a Message
            </h3>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                 {/* Form fields remain the same */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={mutedTextColor}>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            {...field}
                            className={cn(inputBg, inputBorder, textColor, "placeholder:text-neutral-500", inputFocusRing)}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={mutedTextColor}>Email</FormLabel>
                        <FormControl>
                           <Input
                            type="email"
                            placeholder="your.email@example.com"
                            {...field}
                            className={cn(inputBg, inputBorder, textColor, "placeholder:text-neutral-500", inputFocusRing)}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Subject Field */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={mutedTextColor}>Subject</FormLabel>
                      <FormControl>
                         <Input
                            placeholder="Subject of your message"
                            {...field}
                            className={cn(inputBg, inputBorder, textColor, "placeholder:text-neutral-500", inputFocusRing)}
                          />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                {/* Message Field */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={mutedTextColor}>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type your message here..."
                          rows={6}
                          {...field}
                          className={cn(inputBg, inputBorder, textColor, "placeholder:text-neutral-500", inputFocusRing, "min-h-[120px]")}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                 {/* Submit Button */}
                <Button
                  type="submit"
                  className={cn("w-full", primaryBg, primaryFg, `hover:${primaryBg}/90`, `focus-visible:ring-${primaryColor}`)} // Themed button
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className={cn("text-2xl font-bold mb-6 flex items-center", textColor)}>
              <Mail className="mr-3 h-6 w-6" />
              Contact Information
            </h3>

            {/* Info Card */}
            <div className={cn("p-8 rounded-lg shadow-md", cardBg)}>
              <div className="space-y-8">
                 {/* Contact Details remain the same */}
                 <div className="flex items-start">
                  <div className={cn("p-3 rounded-lg mr-4", iconContainerBg)}>
                    <MapPin className={cn("h-6 w-6", primaryColor)} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Location</h4>
                    {/* --- Replace with your actual Location --- */}
                    <p className={mutedTextColor}>Kerala, India</p>
                  </div>
                </div>
                <div className="flex items-start">
                   <div className={cn("p-3 rounded-lg mr-4", iconContainerBg)}>
                    <Mail className={cn("h-6 w-6", primaryColor)} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email</h4>
                     {/* --- Replace with your actual Email --- */}
                    <p className={mutedTextColor}>
                      <a href="mailto:your.email@example.com" className={cn("hover:text-orange-400 transition-colors")}>
                        sreerag472678@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                   <div className={cn("p-3 rounded-lg mr-4", iconContainerBg)}>
                    <Phone className={cn("h-6 w-6", primaryColor)} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Phone</h4>
                    {/* --- Replace with your actual Phone --- */}
                    <p className={mutedTextColor}>
                      <a href="tel:+919876543210" className={cn("hover:text-orange-400 transition-colors")}>
                        +91 7592890623
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links - Updated */}
              <div className="mt-12">
                <h4 className="font-bold text-lg mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  {/* GitHub */}
                  <a
                    href="https://github.com/Sreerag472678" // --- Replace ---
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("p-3 rounded-full transition-colors duration-200", socialIconBg, textColor, `hover:${socialIconHoverBg}`, `hover:${socialIconHoverFg}`)}
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/sreerag-t-m-633b77292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" // --- Replace ---
                    target="_blank"
                    rel="noopener noreferrer"
                     className={cn("p-3 rounded-full transition-colors duration-200", socialIconBg, textColor, `hover:${socialIconHoverBg}`, `hover:${socialIconHoverFg}`)}
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  {/* WhatsApp */}
                  <a
                    href="https://whatsapp/917592890623 " // --- Replace ---
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("p-3 rounded-full transition-colors duration-200", socialIconBg, textColor, `hover:${socialIconHoverBg}`, `hover:${socialIconHoverFg}`)}
                    aria-label="WhatsApp"
                  >
                    {/* WhatsApp SVG Icon */}
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.75 13.96c.25.52.37 1.08.37 1.69 0 1.16-.4 2.2-1.08 3.06-.69.85-1.61 1.54-2.68 1.98-.87.36-1.8.61-2.78.71-.7.08-1.4-.01-2.09-.23-.9-.29-1.75-.75-2.49-1.36l-.37-.32-1.83.48.49-1.78-.3-.39c-.67-.84-1.18-1.8-1.49-2.82-.37-1.23-.35-2.54.05-3.8.4-1.26 1.1-2.4 2.02-3.33 1.12-1.13 2.56-1.9 4.16-2.21.13-.03.26-.05.39-.07.16-.02.33-.04.5-.05.6-.03 1.2-.01 1.79.05.79.08 1.56.31 2.27.68.72.37 1.37.88 1.91 1.49.54.61.97 1.32 1.25 2.07.29.75.43 1.55.43 2.39 0 .6-.09 1.19-.27 1.77m-4.89-5.9c-.15-.08-.89-.44-.89-.44-.12-.06-.25-.08-.38-.08-.15 0-.3.02-.44.08-.14.06-.26.15-.36.27-.1.11-.19.26-.25.41-.07.15-.1.32-.1.48s.01.34.04.51c.03.17.08.33.15.49l.15.3c.06.12.13.24.21.37.09.13.19.25.3.37.12.12.25.24.39.35.14.11.29.22.45.32.16.1.33.19.5.28.17.08.35.15.54.21.19.06.39.1.6.11.21.01.42 0 .63-.04.21-.04.4-.11.58-.21.18-.1.34-.23.47-.39s.22-.34.28-.54l.06-.2c.03-.1.05-.2.05-.31 0-.1-.01-.2-.04-.3-.03-.1-.07-.19-.13-.27l-.14-.19c-.05-.06-.11-.12-.19-.17-.08-.05-.16-.1-.26-.14-.1-.04-.21-.07-.32-.09s-.23-.03-.35-.03c-.12 0-.24.01-.36.04-.12.02-.23.06-.34.11-.11.05-.21.1-.31.17l-.11.06c-.11.07-.21.15-.3.25-.09.1-.17.2-.23.31-.06.11-.1.22-.11.34s.01.24.06.36c.05.12.13.23.23.33.1.1.22.19.35.26.13.07.28.12.43.16.15.03.31.05.47.05.19 0 .38-.02.57-.06s.37-.1.54-.19c.17-.09.32-.2.46-.34.14-.14.26-.3.35-.48.09-.18.15-.37.18-.57.03-.2.03-.4.02-.61-.02-.2-.06-.4-.13-.58-.07-.18-.17-.35-.29-.5s-.28-.28-.44-.39l-.1-.06c-.07-.04-.14-.07-.21-.1-.07-.03-.14-.05-.21-.07-.07-.02-.14-.03-.21-.04-.07-.01-.14-.01-.2-.01-.09 0-.18.01-.26.03s-.16.05-.24.08l-.24.08-.11-.06c-.11-.05-.22-.1-.33-.14s-.23-.07-.35-.09-.25-.03-.38-.03c-.13 0-.26.01-.38.03-.12.02-.24.05-.36.08s-.23.07-.33.11c-.11.04-.2.09-.29.14l-.1.05c-.06.04-.12.07-.17.11s-.1.09-.14.14l-.08.08c-.06.06-.1.12-.13.19s-.05.14-.05.21c.01.14.05.27.14.39.09.12.2.22.34.3.14.09.29.15.45.2.16.05.32.08.48.09.17.01.34.01.5 0 .17-.01.34-.04.5-.08.16-.04.31-.1.46-.17.15-.07.29-.16.41-.27s.23-.23.31-.37c.08-.14.14-.29.17-.45.03-.16.03-.32.01-.49"/>
                    </svg>
                  </a>
                  {/* Instagram - Added */}
                  <a
                    href="https://www.instagram.com/sreerag__radigozz?igsh=aHFtdzY5Z2gwYWht" // --- Replace with your Instagram URL ---
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("p-3 rounded-full transition-colors duration-200", socialIconBg, textColor, `hover:${socialIconHoverBg}`, `hover:${socialIconHoverFg}`)}
                    aria-label="Instagram"
                  >
                    {/* Instagram SVG Icon */}
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.268.058 1.905.23 2.398.412.614.235 1.05.57 1.484.995.435.435.77 1.05.995 1.484.182.493.354 1.13.412 2.398.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.058 1.268-.23 1.905-.412 2.398-.235.614-.57 1.05-.995 1.484-.435.435-1.05.77-1.484.995-.493.182-1.13.354-2.398.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.268-.058-1.905-.23-2.398-.412-.614-.235-1.05-.57-1.484-.995-.435-.435-.77-1.05-.995-1.484-.182-.493-.354-1.13-.412-2.398-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.058-1.268.23-1.905.412-2.398.235-.614.57-1.05.995-1.484.435-.435 1.05-.77 1.484-.995.493-.182 1.13-.354 2.398-.412C8.416 2.175 8.796 2.163 12 2.163zm0-1.964c-3.264 0-3.674.015-4.95.072C5.775.32 4.905.533 4.14.836c-.783.302-1.452.718-2.12 1.387C1.35.93 1.935.514 1.15.817.847 1.58.634 2.45.58 3.727c-.058 1.277-.073 1.688-.073 4.97s.015 3.693.073 4.97c.054 1.277.267 2.148.57 2.93.302.783.718 1.452 1.387 2.12.67.67 1.337 1.086 2.12 1.387.783.303 1.654.516 2.93.57C8.326 23.985 8.736 24 12 24s3.674-.015 4.95-.072c1.277-.054 2.148-.267 2.93-.57.783-.302 1.452-.718 2.12-1.387.67-.67 1.086-1.337 1.387-2.12.303-.783.516-1.654.57-2.93.058-1.277.072-1.688.072-4.97s-.015-3.693-.072-4.97c-.054-1.277-.267-2.148-.57-2.93-.302-.783-.718-1.452-1.387-2.12C21.318.93 20.649.514 19.866.817c-.783-.303-1.654-.516-2.93-.57C15.674.015 15.264 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.33a4.168 4.168 0 110-8.336 4.168 4.168 0 010 8.336zM17.964 4.158a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}