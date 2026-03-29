import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { href: "#home", id: "home", label: "Home" },
  { href: "#about", id: "about", label: "About" },
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#projects", id: "projects", label: "Projects" },
];

const social = [
  { href: "mailto:jessyjcw@gmail.com", icon: "bx bxs-envelope" },
  { href: "https://github.com/jsycw", icon: "bx bxl-github" },
  { href: "https://www.linkedin.com/in/jessyclarissa", icon: "bx bxl-linkedin-square" },
  { href: "https://www.instagram.com/jessy_clarissa", icon: "bx bxl-instagram-alt" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = navLinks.map((l) => l.id);
    const onScroll = () => {
      const y = window.scrollY + 140;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="header">
      <nav className={`navbar ${open ? "open" : ""}`}>
        <a href="#home" className="logo" onClick={() => setOpen(false)}>
          Jessy Clarissa
        </a>
        {navLinks.map(({ href, id, label }) => (
          <a
            key={href}
            href={href}
            className={active === id ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <i className={`bx ${open ? "bx-x" : "bx-menu"}`} />
      </button>

      <div className="social-media">
        {social.map(({ href, icon }) => (
          <a key={href} href={href} target="_blank" rel="noreferrer noopener">
            <i className={icon} />
          </a>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
