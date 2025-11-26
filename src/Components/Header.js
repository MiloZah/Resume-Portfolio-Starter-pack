import React, { memo } from "react";
import TypeWriter from "react-typewriter";

const Header = ({ data }) => {
  if (!data) return null;

  const name = data.name;
  const occupation = data.occupation;
  const description = data.description;
  const city = data.address?.city;
  const networks = data.social?.map((network) => (
    <li key={network.name}>
      <a href={network.url} aria-label={network.name} target="_blank" rel="noopener noreferrer">
        <i className={network.className}></i>
      </a>
    </li>
  )) || [];

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
            <TypeWriter typing={0.5}>{name ? `I'm ${name}.` : null}</TypeWriter>
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
