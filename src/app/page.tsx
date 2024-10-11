import FAQ from '@/components/home/FAQ';
import Features from '@/components/home/Features';
import Hero from '@/components/home/Hero';
import Overview from '@/components/home/Overview';
import Pricing from '@/components/home/Pricing';
import WaveBottom from '@/components/home/WaveBottom';
import WaveTop from '@/components/home/WaveTop';

export default function Home() {
  return (
    <main>
      <section className="bg-plasma landing-page-margins relative pb-20 text-center">
        <Hero />
        <WaveBottom fill="fill-white" />
      </section>

      <section className="landing-page-margins py-20" id="overview">
        <Overview />
      </section>

      <section className="landing-page-margins relative bg-black py-20" id="features">
        <WaveTop fill="fill-white" />
        <div className="h-[94px]" />
        <Features />
      </section>

      <section className="landing-page-margins relative py-20" id="pricing">
        <WaveTop />
        {/* Extra height in given because does not start with h1 that has natural margins */}
        <div className="h-[99px]" />
        <Pricing />
      </section>

      <section
        className="bg-plasma landing-page-margins relative py-20 text-center"
        id="faq"
      >
        <WaveTop fill="fill-white" />
        <div className="h-[94px]" />
        <FAQ />
        <div className="h-[94px]" />
        <WaveBottom />
      </section>
    </main>
  );
}
