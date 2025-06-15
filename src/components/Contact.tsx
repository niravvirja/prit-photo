
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Send, User, Mail, Phone } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import SectionTitle from './ui/section-title';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 640;

    if (
      !formData.name ||
      !formData.phone ||
      !formData.service ||
      (isDesktop && !formData.email)
    ) {
      toast({
        title: 'Please fill in all required fields',
        description: 'Make sure to complete all mandatory information.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/mblyyrvv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: 'Message sent successfully!',
          description: "We'll get back to you within 24 hours with a personalized quote.",
        });
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: '',
          message: '',
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: 'Error sending message',
        description: 'Please try again later or contact us directly.',
        variant: 'destructive',
      });
    }
  };

  const services = [
    'Ring Ceremonies',
    'Pre-Wedding Shoot',
    'Wedding Photography',
    'Baby Shower Ceremonies',
    'Kids Photography',
    'Portrait Photography',
  ];

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24 bg-primary text-primary-foreground min-h-screen flex items-center"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionTitle badge="Get In Touch" title="Get In Touch" />

        <div className="flex justify-center">
          <motion.div
            className="w-full max-w-2xl"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="bg-background text-foreground border border-border rounded-3xl px-8 py-4 sm:p-10 lg:p-12 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-foreground text-base font-bold">
                      Your Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="pl-14 h-12 border-2 border-border focus:border-primary text-foreground bg-background text-base rounded-2xl shadow-lg transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-foreground text-base font-bold">
                      Phone Number *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="pl-14 h-12 border-2 border-border focus:border-primary text-foreground bg-background text-base rounded-2xl shadow-lg transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Show Email input only on desktop (sm and above) */}
                  <div className="space-y-3 hidden sm:block">
                    <Label htmlFor="email" className="text-foreground text-base font-bold">
                      Email Address *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="pl-14 h-12 border-2 border-border focus:border-primary text-foreground bg-background text-base rounded-2xl shadow-lg transition-all duration-300"
                        // required removed! Validation is done in JS
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="service" className="text-foreground text-base font-bold">
                      Service Required *
                    </Label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none bg-background text-foreground text-base rounded-2xl shadow-lg transition-all duration-300"
                      required
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service.toLowerCase().replace(/\s+/g, '-')}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="message" className="text-foreground text-base font-bold">
                    Tell Us About Your Event
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about event, dates, or any special requirements..."
                    className="h-20 border-2 overflow-hidden border-border focus:border-primary resize-none text-foreground bg-background text-base rounded-2xl shadow-lg transition-all duration-300 p-4"
                  />
                </div>

                <div className="flex items-center justify-center">
                  <Button
                    type="submit"
                    className="w-full sm:w-auto bg-primary text-primary-foreground py-7 text-base font-bold tracking-wide transition-all duration-300 rounded-2xl shadow-lg"
                  >
                    <Send className="w-5 h-5 mr-3" />
                    Send Message & Get Quote
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

// Contact.tsx is now 222 lines long. It's getting quite large—consider asking me to refactor this into smaller components for better maintainability.
