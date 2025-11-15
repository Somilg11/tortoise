"use client";


import HeroSection from "@/components/about/hero-section";
import FeaturesSection from "@/components/about/features-section";
import TechSection from "@/components/about/tech-section";

export default function AboutPage() {
    return (
        <div className="space-y-24 py-10">
            <HeroSection />
            <FeaturesSection />
            <TechSection />
        </div>
    );
}