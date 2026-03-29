import { useEffect } from "react";
import { Header } from "./components/Header.jsx";
import { Home } from "./components/Home.jsx";
import { About } from "./components/About.jsx";
import { Experience } from "./components/Experience.jsx";
import { Projects } from "./components/Projects.jsx";
import { Credits } from "./components/Credits.jsx";
import "./styles.css";

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <>
      <Header />
      <main>
        <Home />
        <About />
        <Experience />
        <Projects />
      </main>
      <Credits />
    </>
  );
}
