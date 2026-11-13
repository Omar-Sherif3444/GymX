import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../../components/landing/Hero";
import HowItWorks from "../../components/landing/HowItWorks";
import Bundles from "../../components/landing/Bundles";
import Machines from "../../components/landing/Machines";
import Challenges from "../../components/landing/Challenges";
import About from "../../components/landing/About";
import CtaBanner from "../../components/landing/CtaBanner";
import Footer from "../../components/Footer";

export default function Landing() {
  const { hash } = useLocation();

  // React refs (no getElementById): each section registers itself under its hash name.
  const sections = useRef({});
  const register = (name) => (el) => {
    sections.current[name] = el;
  };

  // When the URL hash changes (e.g. /#bundles), smooth-scroll to that section.
  useEffect(() => {
    const name = hash.replace("#", "") || "top";
    sections.current[name]?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <>
      <Hero ref={register("top")} />
      <HowItWorks ref={register("how")} />
      <Bundles ref={register("bundles")} />
      <Machines ref={register("machines")} />
      <Challenges ref={register("challenges")} />
      <About ref={register("about")} />
      <CtaBanner />
      <Footer />
    </>
  );
}
