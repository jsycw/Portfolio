import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { featuredProjects, moreProjects } from "../data/projects.js";

const AUTO_MS = 5500;

const sectionReveal = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardParent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

function useAutoAdvance(length, intervalMs) {
  const [i, setI] = useState(0);
  const timerRef = useRef(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clear();
    timerRef.current = window.setInterval(() => {
      setI((n) => (n + 1) % length);
    }, intervalMs);
  }, [clear, intervalMs, length]);

  useEffect(() => {
    start();
    return clear;
  }, [start, clear]);

  const go = useCallback(
    (delta) => {
      setI((n) => {
        const next = n + delta;
        if (next < 0) return length - 1;
        if (next >= length) return 0;
        return next;
      });
      start();
    },
    [length, start]
  );

  const goTo = useCallback(
    (index) => {
      setI(index);
      start();
    },
    [start]
  );

  return { index: i, go, goTo };
}

function LinkIcon({ type }) {
  if (type === "figma") return <i className="bx bxl-figma" />;
  if (type === "external") return <i className="bx bx-link-external" />;
  return <i className="bx bxl-github" />;
}

export function Projects() {
  const n = featuredProjects.length;
  const [direction, setDirection] = useState(1);
  const { index, go, goTo } = useAutoAdvance(n, AUTO_MS);
  const current = featuredProjects[index];

  return (
    <section className="projects" id="projects">
      <motion.div
        className="projects-content"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div className="h2-container" variants={sectionReveal}>
          <h2>/ my projects</h2>
          <hr />
        </motion.div>

        <motion.div className="slideshow-container" variants={sectionReveal}>
          <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={current.id}
            className="carousel"
            initial={{ x: direction > 0 ? "100%" : "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: direction > 0 ? "-100%" : "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
            }}
          >
              <img src={current.image} alt="" style={{ width: "100%" }} loading="lazy" />
              <div className="explanation">
                <div className="title">{current.title}</div>
                <div className="desc">{current.description}</div>
                <div className="lang">{current.stack}</div>
                <a href={current.github} target="_blank" rel="noreferrer noopener">
                  <i className="bx bxl-github" />
                </a>
                <a href={current.external} target="_blank" rel="noreferrer noopener">
                  <i className="bx bx-link-external" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          <button type="button" className="prev" 
            onClick={() => {
              setDirection(-1);
              go(-1);
            }} 
            aria-label="Previous project">&#10094;
          </button>
          <button type="button" className="next" 
            onClick={() => {
              setDirection(1);
              go(1);
            }} 
            aria-label="Next project">&#10095;
          </button>
        </motion.div>

        <div className="carousel-dots" style={{ textAlign: "center" }}>
          {featuredProjects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={`line ${i === index ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
            />
          ))}
        </div>

        <motion.div
          className="projs-container"
          variants={cardParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {moreProjects.map((p) => (
            <motion.div key={p.title} className="projs-box" variants={cardItem} whileHover={{ y: -4 }}>
              <div className="headerprojs">
                <div className="kiri">
                  <i className="bx bx-folder" />
                </div>
                <div className="kanan">
                  <a href={p.link} target="_blank" rel="noreferrer noopener">
                    <LinkIcon type={p.linkIcon} />
                  </a>
                </div>
              </div>
              <h2>{p.title}</h2>
              <h3>{p.description}</h3>
              <p>{p.stack}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
