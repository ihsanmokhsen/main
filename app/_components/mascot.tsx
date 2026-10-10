"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Mascot } from "page-mascot";

type Greeting = {
  text: string;
  href?: string;
  linkLabel?: string;
};

const GREETINGS: Greeting[] = [
  { text: "haii" },
  { text: "halo" },
  { text: "yo!" },
  {
    text: "Jangan lupa mampir di portofolio ya:",
    href: "https://works.ihsanmokhsen.com/",
    linkLabel: "works.ihsanmokhsen.com"
  },
  { text: "Web BPAD NTT? Saya yang bangun sendiri loh!" },
  { text: "VPS kantor? Tenang, saya yang urus" },
  { text: "Paling males ada yang generate AI mukanya jadi beda terus, lalu post di sosmed kantor huft" },
  {
    text: "LinkedIn-ku juga ada kok:",
    href: "https://www.linkedin.com/in/ihsanmokhsen/",
    linkLabel: "linkedin.com/in/ihsanmokhsen"
  },
  { text: "Riset kesadaran keamanan siber itu ranah saya" },
  { text: "Klik lagi, siapa tahu ada yang baru" }
];

type Offset = { x: number; y: number };

const OFFSET_KEY = "mascot-offset";
const DRAG_THRESHOLD = 4;
const EDGE = 8;

export function PageMascot({
  size = 140,
}: {
  size?: number;
}) {
  const [showGreeting, setShowGreeting] = useState(false);
  const [greeting, setGreeting] = useState<Greeting>(GREETINGS[0]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const wrapRef = useRef<HTMLSpanElement>(null);
  const offsetRef = useRef<Offset>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const suppressClickRef = useRef(false);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Keep the mascot inside the page, measured from its untranslated spot.
  const clamp = useCallback((next: Offset): Offset => {
    const el = wrapRef.current;
    if (!el) return next;
    const rect = el.getBoundingClientRect();
    const baseLeft = rect.left - offsetRef.current.x;
    const baseTop = rect.top + window.scrollY - offsetRef.current.y;
    const maxX = document.documentElement.clientWidth - EDGE - rect.width - baseLeft;
    const maxY = document.documentElement.scrollHeight - EDGE - rect.height - baseTop;
    return {
      x: Math.min(Math.max(next.x, EDGE - baseLeft), maxX),
      y: Math.min(Math.max(next.y, EDGE - baseTop), maxY)
    };
  }, []);

  // Written straight to the DOM so clamp() always measures the current position.
  const applyOffset = useCallback((next: Offset) => {
    offsetRef.current = next;
    if (wrapRef.current) {
      wrapRef.current.style.transform = `translate3d(${next.x}px, ${next.y}px, 0)`;
    }
  }, []);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(OFFSET_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Offset;
        if (Number.isFinite(parsed.x) && Number.isFinite(parsed.y)) {
          applyOffset(clamp(parsed));
        }
      }
    } catch {}

    const onResize = () => applyOffset(clamp(offsetRef.current));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [applyOffset, clamp]);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLSpanElement>) => {
      if (event.button !== 0) return;
      const startX = event.clientX;
      const startY = event.clientY;
      const pointerId = event.pointerId;
      const origin = offsetRef.current;
      let moved = false;

      const onMove = (e: PointerEvent) => {
        if (e.pointerId !== pointerId) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (!moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
        if (!moved) {
          moved = true;
          setDragging(true);
        }
        applyOffset(clamp({ x: origin.x + dx, y: origin.y + dy }));
      };

      const onUp = (e: PointerEvent) => {
        if (e.pointerId !== pointerId) return;
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        if (!moved) return;
        suppressClickRef.current = true;
        setDragging(false);
        try {
          window.localStorage.setItem(OFFSET_KEY, JSON.stringify(offsetRef.current));
        } catch {}
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    },
    [applyOffset, clamp]
  );

  // A drag ends with a click; swallow it so dropping doesn't boop or greet.
  const handleClickCapture = useCallback((event: React.MouseEvent) => {
    if (!suppressClickRef.current) return;
    suppressClickRef.current = false;
    event.stopPropagation();
    event.preventDefault();
  }, []);

  const handleGreet = useCallback(() => {
    setGreeting(GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
    setShowGreeting(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    const chars = greeting.text.length + (greeting.linkLabel?.length ?? 0);
    const duration = greeting.href
      ? 4200
      : Math.min(1400 + chars * 40, 4200);
    timerRef.current = setTimeout(() => setShowGreeting(false), duration);
  }, [greeting]);

  return (
    <span
      ref={wrapRef}
      className={`mascot-drag relative inline-block${dragging ? " is-dragging" : ""}`}
      onPointerDown={handlePointerDown}
      onClickCapture={handleClickCapture}
      onDragStart={(event) => event.preventDefault()}
      onClick={handleGreet}
    >
      {showGreeting && (
        <span className="mascot-bubble">
          {greeting.text}
          {greeting.href && (
            <a
              className="mascot-bubble-link"
              href={greeting.href}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
            >
              {greeting.linkLabel}
            </a>
          )}
        </span>
      )}
      <Mascot
        className="mascot-float"
        directions="/mascots/ihsan-directions.png"
        reactions="/mascots/ihsan-reactions.png"
        size={size}
        label="mascot Ihsan"
      />
    </span>
  );
}
