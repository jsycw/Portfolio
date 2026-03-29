import { motion } from "framer-motion";

const tech = [
  "React.js",
  "Java",
  "Spring",
  "Laravel",
  "Javascript",
  "Python",
  "C#",
  "Swift",
  "C/C++",
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.06 },
  },
};

const block = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const listParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
};

const listItem = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.32 } },
};

export function About() {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <motion.div
          className="about-content"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div className="h2-container" variants={block}>
            <h2>/ about me</h2>
            <hr />
          </motion.div>
          <motion.h3 variants={block}>
            I am currently a <b>Computer Science Student</b> at{" "}
            <span>
              <b>Bina Nusantara University</b>
            </span>
            , focusing in <b>Software Engineering</b>. I also work part-time as a tutor, helping
            students both on campus and outside of it.
          </motion.h3>
          <motion.h3 variants={block}>Here are some technologies I have been working with:</motion.h3>
          <motion.ul className="about-list" variants={listParent}>
            {tech.map((t) => (
              <motion.li key={t} variants={listItem}>
                <i className="bx bxs-right-arrow" />
                {t}
              </motion.li>
            ))}
          </motion.ul>
          <motion.h3 variants={block}>
            Outside of work, I&apos;m interested in following the developments of science. I also
            play some of video games. And play piano.
          </motion.h3>
        </motion.div>

        <motion.div
          className="about-img"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 0.85, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src="/img/about3.jpg" alt="Jessy Clarissa" loading="lazy" />
        </motion.div>
      </div>
    </section>
  );
}
