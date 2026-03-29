import { useEffect, useState } from "react";

const FULL_TEXT = "Hi, Jessy here.";
const TYPING_MS = 120;

/**
 * Types "Hi, " plain, "Jessy" with accent (caller wraps in CSS), then " here."
 */
export function useTypingText() {
  const [phase, setPhase] = useState("idle");
  const [plain, setPlain] = useState("");
  const [accent, setAccent] = useState("");
  const [tail, setTail] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      if (i < 4) {
        setPlain(FULL_TEXT.slice(0, i + 1));
        i++;
        setTimeout(tick, TYPING_MS);
      } else if (i < 9) {
        setAccent(FULL_TEXT.slice(4, i + 1));
        i++;
        setTimeout(tick, TYPING_MS);
      } else if (i < FULL_TEXT.length) {
        setTail(FULL_TEXT.slice(9, i + 1));
        i++;
        setTimeout(tick, TYPING_MS);
      } else {
        setDone(true);
        setPhase("done");
      }
    };

    setPhase("typing");
    tick();
    return () => {
      cancelled = true;
    };
  }, []);

  return { plain, accent, tail, done, phase };
}
