import { useEffect, useRef } from "react";
import p5 from "p5/lib/p5.min";

export function FractalTree() {
  const hostRef = useRef(null);
  const p5Ref = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const sketch = (p) => {
      let angle = 0;

      p.setup = () => {
        const canvas = p.createCanvas(300, 250);
        canvas.parent(host);
        p.clear();
      };

      p.draw = () => {
        p.clear();

        angle += 0.01;

        p.stroke(255);
        p.translate(p.width / 2, p.height);
        branch(80);

        function branch(len) {
          p.line(0, 0, 0, -len);
          p.translate(0, -len);

          if (len > 4) {
            const a = p.map(p.sin(angle), -1, 1, 0.2, 1.2);

            p.push();
            p.rotate(a);
            branch(len * 0.67);
            p.pop();

            p.push();
            p.rotate(-a);
            branch(len * 0.67);
            p.pop();
          }
        }
      };
    };

    p5Ref.current = new p5(sketch);

    return () => {
      p5Ref.current?.remove();
      p5Ref.current = null;
    };
  }, []);

  return <div ref={hostRef} className="fractal-tree-host" />;
}