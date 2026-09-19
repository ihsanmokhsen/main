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

export function PageMascot({
  size = 140,
}: {
  size?: number;
}) {
  const [showGreeting, setShowGreeting] = useState(false);
  const [greeting, setGreeting] = useState<Greeting>(GREETINGS[0]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
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
    <span className="relative inline-block" onClick={handleGreet}>
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
