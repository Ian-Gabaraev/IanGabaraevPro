import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

const Home = () => {
  useEffect(() => {
    document.title = "Ian Gabaraev | Lead Software Engineer | Python, React, Cloud Expert";
  }, []);

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Ian Gabaraev is a Lead Software Development Engineer with 10+ years of experience building scalable systems. Expert in Python, Django, TypeScript, React, AWS, and Azure cloud architecture."
        />
        <link rel="canonical" href="https://iangabaraev.com/" />
        <meta property="og:image" content="https://iangabaraev.com/og-image.png" />
      </Helmet>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
};

export default Home;
