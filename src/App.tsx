import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { SectionWrapper } from './components/SectionWrapper';
import { FlavorWheel } from './sections/FlavorWheel';
import { DrinksGuide } from './sections/DrinksGuide';
import { BeanExplorer } from './sections/BeanExplorer';
import { Terminology } from './sections/Terminology';
import { BrewingMethods } from './sections/BrewingMethods';
import { IndianCoffee } from './sections/IndianCoffee';

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />
      <Hero />

      <SectionWrapper id="bean-explorer">
        <BeanExplorer />
      </SectionWrapper>

      <SectionWrapper id="terminology" alternate>
        <Terminology />
      </SectionWrapper>

      <FlavorWheel />

      <DrinksGuide />

      <SectionWrapper id="brewing-methods" alternate>
        <BrewingMethods />
      </SectionWrapper>

      <SectionWrapper id="indian-coffee" alternate>
        <IndianCoffee />
      </SectionWrapper>

      <Footer />
    </div>
  );
}

export default App;
