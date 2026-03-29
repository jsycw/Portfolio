import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useTypingText } from "../hooks/useTypingText.js";

const FractalTree = lazy(() =>
  import("./FractalTree.jsx").then((m) => ({ default: m.FractalTree }))
);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Home() {
  const { plain, accent, tail, done } = useTypingText();

  return (
    <section className="home" id="home">
      <motion.div
        className="home-content"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div className="fractal-wrap" variants={item}>
          <div className="fractal-container">
            <Suspense fallback={<div className="fractal-skeleton" aria-hidden />}>
              <FractalTree />
            </Suspense>
          </div>
        </motion.div>
        <motion.h1 variants={item}>
          <span className="typing-text" id="typing-text">
            {plain}
            {accent && <span>{accent}</span>}
            {tail}
          </span>
          <span className={`cursor ${done ? "done-typing" : ""}`}>|</span>
        </motion.h1>
        <motion.h3 variants={item}>I create stuff sometimes.</motion.h3>
        <motion.p variants={item}>
          I&apos;m a software engineer with a passion for building innovative and impactful products.
          I&apos;ve worked on various projects that integrate cutting-edge technologies, from app
          development to web platforms.
        </motion.p>

        <motion.div variants={item}>
          <motion.a
            href="/CV/resume.pdf"
            download="resume.pdf"
            className="btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            Download CV
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
