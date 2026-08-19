import { PrismaHero } from "@/components/ui/prisma-hero";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";

function App() {
  return (
    <>
      <Nav />
      <main>
        <section id="home" className="h-screen p-2 pt-[80px] md:p-4 md:pt-[88px]">
          <PrismaHero />
        </section>
        <About />
        <Experience />
        <Education />
        <Projects />
        <Services />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
