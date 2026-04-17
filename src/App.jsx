import Header from "./components/Header";
import Hero from "./components/Hero";
import Products from "./components/ProductsPage";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import ScrollProgress from "./components/ScrollProgress";
import PageTransition from "./components/PageTransition";
import { useScrollReveal } from "./lib/useScrollReveal";
import { useSiteContent } from "./context/SiteContentContext";

function App() {
  useScrollReveal();
  const { sectionsConfig } = useSiteContent();

  return (
    <div>
      <ScrollProgress />
      <Header />
      {/*
        snap-container must NOT have transform/opacity on it directly —
        transforms break scroll-snap in all browsers.
        PageTransition wraps the inner content only.
      */}
      <main className="snap-container">
        <PageTransition>
          <section className="snap-section" id="hero">
            <Hero />
          </section>
          {sectionsConfig.showProducts && (
            <section className="snap-section" id="products">
              <Products />
            </section>
          )}
          {sectionsConfig.showAbout && (
            <section className="snap-section" id="about">
              <AboutUs />
            </section>
          )}
          {sectionsConfig.showContact && (
            <section className="snap-section" id="contact-section">
              <Contact />
              <Footer />
            </section>
          )}
        </PageTransition>
      </main>
    </div>
  );
}

export default App;