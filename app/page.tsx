import HeroBanner from '@/components/home/HeroBanner';
import About from '@/components/home/About';
import Skills from '@/components/home/Skills';
import Projects from '@/components/home/Projects';
import Contact from '@/components/home/Contact';

export default function Home() {
  return (
    <>
      <HeroBanner />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}         