"use client"

import { useState } from "react"
import { Header } from "@/app/components/header"
import { Footer } from "@/app/components/footer"
import { Mail } from 'lucide-react'

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In a real app, you would send the form data to your backend
    console.log("Form submitted:", formState)
    
    setSubmitMessage("Thank you for your message. We'll get back to you soon!")
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: ""
    })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header activePage="contact" />

      <div className="w-full h-px bg-gray-200 mt-2"></div>

      <main className="container mx-auto px-4 py-12 flex-grow">
        <h1 className="text-3xl md:text-4xl text-center mb-6 font-bold">CONTACT US</h1>

        {/* Direct email link */}
        <div className="text-center mb-12">
          <a
            href="mailto:info@nickstokesphoto.com"
            className="inline-flex items-center text-lg hover:text-gray-600 transition-colors"
          >
            <Mail className="w-5 h-5 mr-2" />
            info@nickstokesphoto.com
          </a>
        </div>

        <div className="max-w-2xl mx-auto">
          {submitMessage ? (
            <div className="text-center py-8">
              <p className="text-green-600 mb-6">{submitMessage}</p>
              <button
                onClick={() => setSubmitMessage("")}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
                    placeholder="Your email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
                  placeholder="Subject"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
                  placeholder="Your message"
                  rows={6}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}