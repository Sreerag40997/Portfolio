"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Swal from "sweetalert2"
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
import { toast } from "sonner"
import {
  Mail,
  MessageSquare,
  Send,
  MapPin,
  Phone,
  Github,
  Linkedin,
} from "lucide-react"
import { cn } from "@/lib/utils"
import emailjs from "@emailjs/browser"

// Zod schema for form validation
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

  // Theme variables
  const primaryColor = "text-orange-500"
  const primaryBg = "bg-orange-500"
  const primaryFg = "text-white"
  const sectionBg = "bg-black"
  const cardBg = "bg-neutral-900"
  const textColor = "text-neutral-100"
  const mutedTextColor = "text-neutral-400"
  const inputBg = "bg-neutral-800"
  const inputBorder = "border-neutral-700"
  const inputFocusRing = "focus-visible:ring-orange-500"
  const iconContainerBg = "bg-neutral-800"
  const socialIconBg = "bg-neutral-800"
  const socialIconHoverBg = primaryBg
  const socialIconHoverFg = primaryFg

  // EmailJS config (client-side public key is expected)
  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ""
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ""
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    const templateParams = {
      from_name: values.name,
      from_email: values.email,
      subject: values.subject,
      message: values.message,
      time: new Date().toLocaleString(),
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      Swal.fire({
        icon: "error",
        title: "Configuration Error",
        text: "Email service is not configured. Check your environment variables.",
        background: "#0f0f0f",
        color: "#f1f1f1",
        confirmButtonColor: "#f97316",
        customClass: { popup: "rounded-xl border border-neutral-700" },
      })
      setIsSubmitting(false)
      return
    }

    try {
      const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      console.log("EmailJS success:", result)

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Your message has been sent successfully. I'll get back to you soon.",
        background: "#0f0f0f",
        color: "#f1f1f1",
        confirmButtonColor: "#f97316",
        customClass: { popup: "rounded-xl border border-neutral-700" },
      })

      form.reset()
    } catch (err) {
      console.error("EmailJS error:", err)

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to send message. Please try again later.",
        background: "#0f0f0f",
        color: "#f1f1f1",
        confirmButtonColor: "#f97316",
        customClass: { popup: "rounded-xl border border-neutral-700" },
      })
    } finally {
      setIsSubmitting(false)
    }
  }



  return (
    <section id="contact" className={cn("py-24 px-4", sectionBg, textColor)}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className={cn("mx-auto w-24 h-1 mb-8", primaryBg)} />
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
                            className={cn(
                              inputBg,
                              inputBorder,
                              textColor,
                              "placeholder:text-neutral-500",
                              inputFocusRing
                            )}
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
                            className={cn(
                              inputBg,
                              inputBorder,
                              textColor,
                              "placeholder:text-neutral-500",
                              inputFocusRing
                            )}
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
                          className={cn(
                            inputBg,
                            inputBorder,
                            textColor,
                            "placeholder:text-neutral-500",
                            inputFocusRing
                          )}
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
                          className={cn(
                            inputBg,
                            inputBorder,
                            textColor,
                            "placeholder:text-neutral-500",
                            inputFocusRing,
                            "min-h-[120px]"
                          )}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className={cn("w-full", primaryBg, primaryFg, `hover:${primaryBg}/90`, `focus-visible:ring-${primaryColor}`)}
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
                <div className="flex items-start">
                  <div className={cn("p-3 rounded-lg mr-4", iconContainerBg)}>
                    <MapPin className={cn("h-6 w-6", primaryColor)} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Location</h4>
                    <p className={mutedTextColor}>Kerala, India</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className={cn("p-3 rounded-lg mr-4", iconContainerBg)}>
                    <Mail className={cn("h-6 w-6", primaryColor)} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email</h4>
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
                    <p className={mutedTextColor}>
                      <a href="tel:+919876543210" className={cn("hover:text-orange-400 transition-colors")}>
                        +91 7592890623
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <h4 className="font-bold text-lg mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/Sreerag472678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("p-3 rounded-full transition-colors duration-200", socialIconBg, textColor, `hover:${socialIconHoverBg}`, `hover:${socialIconHoverFg}`)}
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sreerag-t-m-633b77292"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("p-3 rounded-full transition-colors duration-200", socialIconBg, textColor, `hover:${socialIconHoverBg}`, `hover:${socialIconHoverFg}`)}
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  {/* you can keep other social icons similarly */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
