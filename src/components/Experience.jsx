import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { experienceTabs } from "../data/experience.js";

const headerReveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function Experience() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const [indicator, setIndicator] = useState({ y: 0, height: 0 });

  useLayoutEffect(() => {
    const el = tabRefs.current[active];
    if (!el) return;
    setIndicator({ y: el.offsetTop, height: el.offsetHeight });
  }, [active]);

  const tab = experienceTabs[active];

  return (
    <section className="experience" id="experience">
      <motion.div
        className="experience-content"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.div className="h2-container" variants={headerReveal}>
          <h2>/ experience</h2>
          <hr />
        </motion.div>

        <motion.div className="tabs" variants={headerReveal}>
          <div className="tabs-sidebar">
            <div
              className="tab-indicator"
              style={{
                transform: `translateY(${indicator.y}px)`,
                height: indicator.height || undefined,
              }}
            />
            <div className="tabs-header">
              {experienceTabs.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  className={`tab-btn ${i === active ? "active" : ""}`}
                  ref={(node) => {
                    tabRefs.current[i] = node;
                  }}
                  onClick={() => setActive(i)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            className="tab-content"
            key={tab.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3>
              {tab.title} <span>{tab.org}</span>
            </h3>
            <p>{tab.period}</p>
            <ul className="job-list">
              {tab.bullets.map((b) => (
                <li key={b.slice(0, 40)}>
                  <i className="bx bxs-right-arrow" />
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
