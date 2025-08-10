"use client";

import { Hero } from "@/components/hero";
import HomeProjectsClient from "@/components/home-projects-client";
import { Separator } from "@/components/ui/separator";
import { ContactForm } from "@/components/contact-form";

export default function HomeClient({ initialProjects = [] }) {
  return (
    <>
      <Hero />
      <section className="container mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-semibold">Featured Projects</h2>
        </div>
        <HomeProjectsClient initialProjects={initialProjects} />
      </section>
      <Separator className="my-6" />
      <section className="container mx-auto max-w-3xl px-4 py-12" id="contact">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <ContactForm />
      </section>
    </>
  );
}
