import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WebHero from "../components/WebHero";
import FreeSample from "../components/FreeSample";
import WebPackages from "../components/WebPackages";
import HostingPlans from "../components/HostingPlans";

function WebDevelopment() {
  return (
    <>
      <Navbar />
      <WebHero />
      <HostingPlans />
      <WebPackages />
      <FreeSample />
      <Footer />
    </>
  );
}

export default WebDevelopment;
