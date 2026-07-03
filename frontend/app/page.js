import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';

export default function Home() {
  return (
    <div>
      <Hero />
      {/* We will add a Features component here later */}
      <HowItWorks /> 
    </div>
  );
}