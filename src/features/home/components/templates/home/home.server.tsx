import { CtaSection } from '../../organisms/cta-section';
import { FeatureShowcasesSection } from '../../organisms/feature-showcases-section';
import { FeaturesSection } from '../../organisms/features-section';
import { Footer } from '../../organisms/footer';
import { Header } from '../../organisms/header';
import { HeroSection } from '../../organisms/hero-section';
import { HowItWorksSection } from '../../organisms/how-it-works-section';
import { SocialProofSection } from '../../organisms/social-proof-section';

export const HomeTemplate = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FeatureShowcasesSection />
        <HowItWorksSection />
        <SocialProofSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};
