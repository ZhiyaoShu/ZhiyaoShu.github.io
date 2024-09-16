"use client";
import React, { useState } from "react";
import { Button } from "@/app/components/button";
import { Textarea } from "@/app/components/textarea";
import { Input } from "@/app/components/input";
import { useToast } from "@/app/components/use-toast";

export function ContactForm() {
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, text }),
      });

      if (response.ok) {
        toast({
          title: "Message sent",
          description: "Your message has been sent successfully.",
        });
        setEmail("");
        setText("");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Your Email
        </label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Your Message
        </label>
        <Textarea
          id="message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          className="mt-1"
          placeholder="Type your message here..."
          rows={4}
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
