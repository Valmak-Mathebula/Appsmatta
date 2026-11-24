import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Process from "../components/Process";
import Services from "../components/Services";
import WhyUs from "../components/WhyUs";
import Projects from "../components/Projects";
import FreeAssessment from "../components/FreeAssessment";
import Transformation from "../components/Transformation";
import Stats from "../components/Stats";
import WebHero from "../components/WebHero";
import WebPackages from "../components/WebPackages";
import FreeSample from "../components/FreeSample";
import HostingPlans from "../components/HostingPlans";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <WebHero />

      <HostingPlans />

      <WebPackages />

      <FreeSample />

      <div id="excel">
        <Hero />
      </div>

      <Process />

      <Services />

      <WhyUs />

      <Transformation />

      <Stats />

      <Projects />
      <FreeAssessment />

      <Footer />
    </>
  );
}

export default Home;
