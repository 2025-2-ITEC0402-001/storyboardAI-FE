import { CTASection } from "@/widgets/main-landing/CTASection";
import { FeaturesSection } from "@/widgets/main-landing/FeaturesSection";
import { Footer } from "@/widgets/main-landing/Footer";
import { Header } from "@/widgets/main-landing/Header";
import { HeroSection } from "@/widgets/main-landing/HeroSection";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-[#0E0E11]">
            <Header />
            <main>
                <HeroSection />
                <FeaturesSection />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
}
