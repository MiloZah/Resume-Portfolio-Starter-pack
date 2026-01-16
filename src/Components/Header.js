import React, { memo, useEffect, useMemo, useState } from "react";
import { mapSocialNetworks } from "../utils";

const TypewriterText = memo(({ text, speed = 50, startDelay = 0 }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!text) {
      setDisplayText("");
      return undefined;
    }

    const prefersReducedMotion = typeof window !== "undefined"
      && window.matchMedia
      && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayText(text);
      return undefined;
    }

    let index = 0;
    let intervalId;
    let timeoutId;

    setDisplayText("");

    const startTyping = () => {
      intervalId = setInterval(() => {
        index += 1;
        setDisplayText(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(intervalId);
        }
      }, speed);
    };

    if (startDelay > 0) {
      timeoutId = setTimeout(startTyping, startDelay);
    } else {
      startTyping();
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return <>{displayText}</>;
});

const Header = ({ data }) => {
  // Memoize social networks - must be called before any early returns
  const networks = useMemo(() => mapSocialNetworks(data?.social), [data?.social]);

  if (!data) return null;

  const { name, occupation, description, address } = data;
  const city = address?.city;
  const headline = name ? `I'm ${name}.` : "";

  return (
    <header id="home">
      <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation" aria-label="Show navigation">
          Show navigation
        </a>
        <a className="mobile-btn" href="#home" title="Hide navigation" aria-label="Hide navigation">
          Hide navigation
        </a>

        <ul id="nav" className="nav">
          <li className="current">
            <a className="smoothscroll" href="#home">
              Home
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#about">
              About
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#resume">
              Resume
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#portfolio">
              Works
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#testimonials">
              Testimonials
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <div className="row banner">
        <div className="banner-text">
          <h1 className="responsive-headline">
            <TypewriterText text={headline} speed={45} startDelay={150} />
          </h1>
          <h3>
            Based in {city}. <span>{occupation}</span>. {description}.
          </h3>
          <hr />
          <ul className="social">{networks}</ul>
        </div>
      </div>

      <p className="scrolldown">
        <a className="smoothscroll" href="#about" aria-label="Scroll to about section">
          <i className="icon-down-circle"></i>
        </a>
      </p>
    </header>
  );
};

export default memo(Header);
