# React Resume Portfolio: Build It From Scratch

This tutorial walks you through creating the portfolio in this repository completely from scratch. It includes environment setup, library installation, file-by-file code listings, and quick line-by-line explanations of what each part does.

## Prerequisites
- Node.js 18+ and npm 9+ installed (`node -v`, `npm -v`)
- Git (optional, for version control)
- A code editor and a terminal

## 1) Create the project shell
1. Scaffold with Create React App: `npx create-react-app resume-portfolio`
2. Move in: `cd resume-portfolio`
3. Install the extra library used for the hero animation: `npm install react-typewriter`
4. Remove CRA demo files if they exist (`src/App.css`, `src/logo.svg`, `src/reportWebVitals.js`, `src/setupTests.js`), because we replace them with the code below.

## 2) Target folder layout
```
resume-portfolio/
  public/
    index.html
    resumeData.json
    favicon.ico
    css/default.css
    css/layout.css
    css/media-queries.css
    css/magnific-popup.css
    images/...
    js/jquery-1.10.2.min.js
    js/jquery-migrate-1.2.1.min.js
    js/jquery.flexslider.js
    js/waypoints.js
    js/jquery.fittext.js
    js/magnific-popup.js
    js/init.js
  src/
    App.js
    index.js
    index.css
    registerServiceWorker.js
    utils/index.js
    utils/components.js
    Components/About.js
    Components/Resume.js
    Components/Portfolio.js
    Components/Testimonials.js
    Components/Contact.js
    Components/Header.js
    Components/Footer.js
  package.json
```

## 3) Public files
### 3.1 `public/index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="theme-color" content="#000000">
  <title>Miloslaw Fostowicz-Zahorski - Full Stack Developer | Portfolio & Resume</title>
  <meta name="title" content="Miloslaw Fostowicz-Zahorski - Full Stack Developer | Portfolio & Resume">
  <meta name="description" content="Full Stack Developer based in London. Specializing in React, JavaScript, and modern web development. View my portfolio, resume, and get in touch.">
  <meta name="keywords" content="Full Stack Developer, React Developer, JavaScript, Web Development, Portfolio, Resume, London Developer">
  <meta name="author" content="Miloslaw Fostowicz-Zahorski">
  <meta name="robots" content="index, follow">
  <meta name="language" content="English">
  <meta name="geo.region" content="IS-1">
  <meta name="geo.placename" content="Reykjavik">
  <meta name="geo.position" content="64.1466;-21.9426">
  <meta name="ICBM" content="64.1466, -21.9426">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.miloslawfostowicz.dev/">
  <meta property="og:title" content="Miloslaw Fostowicz-Zahorski - Full Stack Developer">
  <meta property="og:description" content="Full Stack Developer based in Reykjavik. Specializing in React, JavaScript, and modern web development.">
  <meta property="og:image" content="%PUBLIC_URL%/images/profilepic.jpg">
  <meta property="og:locale" content="en_GB">
  <meta property="og:site_name" content="Miloslaw Fostowicz-Zahorski Portfolio">
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://www.easygrow.agency/">
  <meta property="twitter:title" content="Miloslaw Fostowicz-Zahorski - Full Stack Developer">
  <meta property="twitter:description" content="Full Stack Developer based in Reykjavik. Specializing in React, JavaScript, and modern web development.">
  <meta property="twitter:image" content="%PUBLIC_URL%/images/profilepic.jpg">
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
  <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
  <link rel="apple-touch-icon" href="%PUBLIC_URL%/favicon.ico">
  <link rel="preload" href="%PUBLIC_URL%/css/default.css" as="style">
  <link rel="preload" href="%PUBLIC_URL%/css/layout.css" as="style">
  <link rel="preload" href="%PUBLIC_URL%/resumeData.json" as="fetch" crossorigin>
  <link rel="stylesheet" href="%PUBLIC_URL%/css/default.css">
  <link rel="stylesheet" href="%PUBLIC_URL%/css/layout.css">
  <link rel="stylesheet" href="%PUBLIC_URL%/css/media-queries.css">
  <link rel="stylesheet" href="%PUBLIC_URL%/css/magnific-popup.css">
  <link rel="preconnect" href="https://ajax.googleapis.com" crossorigin>
  <link rel="dns-prefetch" href="https://ajax.googleapis.com">
  <link rel="dns-prefetch" href="https://www.youtube.com">
  <link rel="dns-prefetch" href="https://www.facebook.com">
  <link rel="dns-prefetch" href="https://www.linkedin.com">
  <link rel="dns-prefetch" href="https://www.instagram.com">
  <link rel="dns-prefetch" href="https://github.com">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Miloslaw Fostowicz-Zahorski",
    "jobTitle": "Full Stack Developer",
    "description": "Full Stack Developer based in Reykjavik. Specializing in React, JavaScript, and modern web development.",
    "url": "https://www.easygrow.agency/",
    "image": "%PUBLIC_URL%/images/profilepic.jpg",
    "email": "me@miloslawfostowicz.dev",
    "telephone": "+354 79036666",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Laugavegur 101",
      "addressLocality": "Reykjavik",
      "addressRegion": "Iceland",
      "postalCode": "101",
      "addressCountry": "IS"
    },
    "sameAs": [
      "https://www.youtube.com/channel/UCqeTj_QAnNlmt7FwzNwHZnA",
      "https://www.facebook.com/sonny.sangha.3",
      "https://www.linkedin.com/in/saajansangha",
      "https://www.instagram.com/ssssangha/",
      "https://github.com/PapaReact"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "PjATK Warsaw"
    },
    "knowsAbout": ["React", "JavaScript", "Python", "Web Development", "Git"],
    "worksFor": {
      "@type": "Organization",
      "name": "EasyGrow.agency",
      "jobTitle": "Founder and CEO"
    }
  }
  </script>
</head>
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/jquery-1.10.2.min.js"><\/script>')</script>
  <script type="text/javascript" src="js/jquery-migrate-1.2.1.min.js"></script>
  <script src="js/jquery.flexslider.js"></script>
  <script src="js/waypoints.js"></script>
  <script src="js/jquery.fittext.js"></script>
  <script src="js/magnific-popup.js"></script>
  <script src="js/init.js"></script>
</body>
</html>
```
Line by line: HTML head defines SEO/meta tags; styles preload/load CSS; JSON-LD schema describes the person; body holds the React root plus the legacy jQuery scripts used by the theme.

### 3.2 `public/resumeData.json`
```json
{
  "main": {
    "name": "Miloslaw Fostowicz-Zahorski",
    "occupation": "Full Stack Developer",
    "description": "I eat, sleep and breathe coding",
    "image": "profilepic.jpg",
    "bio": "Hi there! I am Miloslaw! I've been coding for over 5 years now. As a Full Stack developer I've worked both with startups and large corporations to help build & scale their companies. Along the journey I realised my passion existed in helping others excel and pursue their dreams as upcoming developers. With this passion, I have now trained thousands of developers across the globe. Through live coaching sessions on Youtube, I have accumulated several MILLION views demonstrating how to apply developer skills in a range of cool builds and challenges. I deliver REAL VALUE by teaching REAL WORLD projects to help students enter the world of web development. You'll get hands-on experience and learn the skills that are required to succeed in the real-world in this community.",
    "contactmessage": "Get in touch with me to be a part of my team!",
    "email": "off.arth@gmail.com",
    "phone": "+354 79036666",
    "address": {
      "street": "Laugavegur 101",
      "city": "Reykjavik",
      "state": "Iceland",
      "zip": "101"
    },
    "website": "https://www.miloslawfostowicz.dev",
    "resumedownload": "http://miloslawfostowicz.dev",
    "social": [
      { "name": "youtube", "url": "", "className": "fa fa-youtube" },
      { "name": "facebook", "url": "", "className": "fa fa-facebook" },
      { "name": "linkedin", "url": "", "className": "fa fa-linkedin" },
      { "name": "instagram", "url": "", "className": "fa fa-instagram" },
      { "name": "github", "url": "", "className": "fa fa-github" }
    ]
  },
  "resume": {
    "skillmessage": "My Programming Language Proficiency",
    "education": [
      {
        "school": "University PJATK Warsaw",
        "degree": "Bachelor's Degree, Computer Science",
        "graduated": "July 2016",
        "description": "Graduated with First Class Honours"
      }
    ],
    "work": [
      {
        "company": "EasyGrow.agency - Startup Studio",
        "title": "Founder and CEO",
        "years": "May 2019 - Present",
        "description": "Accelerating Web Apps to stimulate company grow. On the way to improve the world! Building quantum blockchain platform."
      }
    ],
    "skills": [
      { "name": "ReactJs", "level": "100%" },
      { "name": "Python", "level": "85%" },
      { "name": "Git", "level": "70%" },
      { "name": "JavaScript", "level": "99%" },
      { "name": "Web Development", "level": "95%" }
    ]
  },
  "portfolio": {
    "projects": [
      { "title": "Snapchat Clone (React JS)", "category": "", "image": "snapchat.jpg", "url": "" },
      { "title": "Gmail Clone (React JS)", "category": "", "image": "gmail.jpg", "url": "" },
      { "title": "LinkedIn Clone (React JS)", "category": "", "image": "linkedin.jpg", "url": "" }
    ]
  },
  "testimonials": {
    "testimonials": [
      { "text": "Miloslaw is absolutely excellent, his depth of knowledge & his mentorship really meant a lot to us... I would definitely recommend", "user": "Jorge Fourier" },
      { "text": "Coworking with Miloslaw has been AWESOME, he makes learning React so easy and approachable, you'll finally feel like you know what's going on!", "user": "Adam Cudmore" }
    ]
  }
}
```
Line by line: this JSON is the single source of truth that feeds every React component (personal info, resume, portfolio, testimonials).

### 3.3 Styles and scripts
Copy the CSS files (`default.css`, `layout.css`, `media-queries.css`, `magnific-popup.css`) and JS helpers (flexslider, magnific-popup, init.js, etc.) from this repo's `public` folder. They provide the theme, grid, animations, and popup behavior referenced by class names in the components.

## 4) React source (`src/`)
### 4.1 `src/index.js`
```javascript
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
registerServiceWorker();
```
Lines 1-5 import React, the root renderer, global styles, the App component, and the service worker helper. Lines 7-10 create the root and render `<App />` inside `<React.StrictMode>` to surface warnings. Line 11 registers the service worker in production for caching/offline.

### 4.2 `src/index.css`
```css
/* Consolidated styles - App.css merged here */
.submit {
  background-color: black;
  border-radius: 5px;
  padding: 20px;
}
```
Defines a simple button style used in the contact form; the rest of the styling comes from the public CSS files.

### 4.3 `src/utils/components.js`
```javascript
import React from 'react';

export const SectionHeader = ({ title, subtitle, className = "section-head" }) => (
  <div className={`row ${className}`}>
    <div className="two columns header-col">
      <h1><span>{title}</span></h1>
    </div>
    {subtitle && (
      <div className="ten columns">
        <p className="lead">{subtitle}</p>
      </div>
    )}
  </div>
);

export const SectionWithHeader = ({ headerTitle, children, className = "" }) => (
  <div className={`row ${className}`}>
    <div className="three columns header-col">
      <h1><span>{headerTitle}</span></h1>
    </div>
    <div className="nine columns main-col">
      {children}
    </div>
  </div>
);

export const InfoItem = ({ title, subtitle, date, description, key }) => (
  <div key={key}>
    <h3>{title}</h3>
    <p className="info">
      {subtitle} <span>&bull;</span>
      <em className="date">{date}</em>
    </p>
    {description && <p>{description}</p>}
  </div>
);
```
Line by line: small reusable render helpers for section headings, a shared section wrapper, and list items for education/work entries.

### 4.4 `src/utils/index.js`
```javascript
import { useState, useEffect, useMemo } from 'react';
export { SectionHeader, SectionWithHeader, InfoItem } from './components';

export const mapSocialNetworks = (social) => {
  if (!social || !Array.isArray(social)) return [];
  return social.map((network) => (
    <li key={network.name}>
      <a 
        href={network.url} 
        aria-label={network.name} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <i className={network.className}></i>
      </a>
    </li>
  ));
};

export const formatAddress = (address) => {
  if (!address) return '';
  const { street, city, state, zip } = address;
  return `${street}${city ? `, ${city}` : ''}${state ? ` ${state}` : ''}${zip ? ` ${zip}` : ''}`.trim();
};

export const OptimizedImage = ({ src, alt, className, width, height, ...props }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    loading="lazy"
    width={width}
    height={height}
    {...props}
  />
);

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const cached = sessionStorage.getItem('resumeData');
        if (cached) {
          const data = JSON.parse(cached);
          if (isMounted) {
            setResumeData(data);
            setIsLoading(false);
            return;
          }
        }

        const response = await fetch('/resumeData.json', {
          headers: { 'Accept': 'application/json' },
          cache: 'default'
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        sessionStorage.setItem('resumeData', JSON.stringify(data));
        if (isMounted) {
          setResumeData(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setIsLoading(false);
          console.error('Error loading resume data:', err);
        }
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, []);

  const memoizedData = useMemo(() => ({
    main: resumeData.main || null,
    resume: resumeData.resume || null,
    portfolio: resumeData.portfolio || null,
    testimonials: resumeData.testimonials || null,
  }), [resumeData]);

  return { resumeData: memoizedData, isLoading, error };
};
```
Line by line: exports helper components, maps social icons, formats addresses, provides an `<img>` wrapper with lazy loading, and defines `useResumeData` hook that caches JSON in sessionStorage, fetches `/resumeData.json`, handles loading/error state, and memoizes slices for components.

### 4.5 `src/App.js`
```javascript
import React, { Suspense, lazy, memo } from "react";
import { useResumeData } from "./utils";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const About = lazy(() => import("./Components/About"));
const Resume = lazy(() => import("./Components/Resume"));
const Contact = lazy(() => import("./Components/Contact"));
const Testimonials = lazy(() => import("./Components/Testimonials"));
const Portfolio = lazy(() => import("./Components/Portfolio"));

const LoadingFallback = memo(() => (
  <div style={{ minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div>Loading...</div>
  </div>
));
LoadingFallback.displayName = 'LoadingFallback';

const App = () => {
  const { resumeData, isLoading } = useResumeData();

  if (isLoading && !resumeData.main) {
    return (
      <div className="App">
        <LoadingFallback />
      </div>
    );
  }

  return (
    <div className="App">
      <Header data={resumeData.main} />
      <Suspense fallback={<LoadingFallback />}>
        <About data={resumeData.main} />
        <Resume data={resumeData.resume} />
        <Portfolio data={resumeData.portfolio} />
        <Testimonials data={resumeData.testimonials} />
        <Contact data={resumeData.main} />
      </Suspense>
      <Footer data={resumeData.main} />
    </div>
  );
};

export default memo(App);
```
Line by line: imports React hooks, the data hook, and header/footer. Lazily loads the content sections for code splitting. `LoadingFallback` is memoized to avoid rerenders. In the component body, it fetches resume data; while loading it shows the fallback; otherwise it renders each section with props from the JSON; wrapped in `<Suspense>` to handle lazy chunks; memo exports to avoid unnecessary renders.

### 4.6 Components
#### `src/Components/Header.js`
```javascript
import React, { memo, useMemo } from "react";
import TypeWriter from "react-typewriter";
import { mapSocialNetworks } from "../utils";

const Header = ({ data }) => {
  const networks = useMemo(() => mapSocialNetworks(data?.social), [data?.social]);
  if (!data) return null;
  const { name, occupation, description, address } = data;
  const city = address?.city;

  return (
    <header id="home">
      <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation" aria-label="Show navigation">Show navigation</a>
        <a className="mobile-btn" href="#home" title="Hide navigation" aria-label="Hide navigation">Hide navigation</a>
        <ul id="nav" className="nav">
          <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
          <li><a className="smoothscroll" href="#about">About</a></li>
          <li><a className="smoothscroll" href="#resume">Resume</a></li>
          <li><a className="smoothscroll" href="#portfolio">Works</a></li>
          <li><a className="smoothscroll" href="#testimonials">Testimonials</a></li>
          <li><a className="smoothscroll" href="#contact">Contact</a></li>
        </ul>
      </nav>
      <div className="row banner">
        <div className="banner-text">
          <h1 className="responsive-headline">
            <TypeWriter typing={0.5}>{name ? `I'm ${name}.` : null}</TypeWriter>
          </h1>
          <h3>Based in {city}. <span>{occupation}</span>. {description}.</h3>
          <hr />
          <ul className="social">{networks}</ul>
        </div>
      </div>
      <p className="scrolldown">
        <a className="smoothscroll" href="#about" aria-label="Scroll to about section"><i className="icon-down-circle"></i></a>
      </p>
    </header>
  );
};

export default memo(Header);
```
Key points: maps social links once with `useMemo`, guards against missing data, uses `react-typewriter` for the headline animation, and renders nav anchors that match section IDs.

#### `src/Components/About.js`
```javascript
import React, { memo, useMemo } from "react";
import { OptimizedImage, formatAddress } from "../utils";

const About = ({ data }) => {
  const formattedAddress = useMemo(() => formatAddress(data?.address), [data?.address]);
  if (!data) return null;

  const { name, image, bio, phone, email } = data;
  const resumeDownload = data['resumedownload'];
  const profilePic = `images/${image}`;

  return (
    <section id="about">
      <div className="row">
        <div className="three columns">
          <OptimizedImage className="profile-pic" src={profilePic} alt={name} width="200" height="200" />
        </div>
        <div className="nine columns main-col">
          <h2>About Me</h2>
          <p>{bio}</p>
          <div className="row">
            <div className="columns contact-details">
              <h2>Contact Details</h2>
              <p className="address">
                <span>{name}</span><br />
                <span>{formattedAddress}</span><br />
                <span>{phone}</span><br />
                <span>{email}</span>
              </p>
            </div>
            <div className="columns download">
              <p>
                <a href={resumeDownload} className="button" aria-label={`Download ${name}'s Resume`}>
                  <i className="fa fa-download"></i>Download Resume
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
```
Key points: formats the address once, lazy-loads the profile image, shows contact info and a resume download link pulled from JSON.

#### `src/Components/Resume.js`
```javascript
import React, { memo, useMemo } from "react";
import { SectionWithHeader, InfoItem } from "../utils/components";

const Resume = ({ data }) => {
  const educationList = useMemo(() => 
    data?.education?.map((edu) => (
      <InfoItem
        key={edu.school}
        title={edu.school}
        subtitle={edu.degree}
        date={edu.graduated}
        description={edu.description}
      />
    )) || [], [data?.education]);
  
  const workList = useMemo(() =>
    data?.work?.map((job) => (
      <InfoItem
        key={job.company}
        title={job.company}
        subtitle={job.title}
        date={job.years}
        description={job.description}
      />
    )) || [], [data?.work]);
  
  const skillsList = useMemo(() =>
    data?.skills?.map((skill) => {
      const className = `bar-expand ${skill.name.toLowerCase()}`;
      return (
        <li key={skill.name}>
          <span style={{ width: skill.level }} className={className}></span>
          <em>{skill.name}</em>
        </li>
      );
    }) || [], [data?.skills]);

  if (!data) return null;
  const { skillmessage } = data;

  return (
    <section id="resume">
      <SectionWithHeader headerTitle="Education" className="education">
        <div className="row item">
          <div className="twelve columns">{educationList}</div>
        </div>
      </SectionWithHeader>

      <SectionWithHeader headerTitle="Work" className="work">
        {workList}
      </SectionWithHeader>

      <SectionWithHeader headerTitle="Skills" className="skill">
        <p>{skillmessage}</p>
        <div className="bars">
          <ul className="skills">{skillsList}</ul>
        </div>
      </SectionWithHeader>
    </section>
  );
};

export default memo(Resume);
```
Key points: three `useMemo` calls build lists for education, work, and skills (with width-driven bars). `SectionWithHeader` supplies consistent columns.

#### `src/Components/Portfolio.js`
```javascript
import React, { memo, useMemo } from "react";
import { OptimizedImage } from "../utils";

const Portfolio = ({ data }) => {
  const projects = useMemo(() => 
    data?.projects?.map((project) => {
      const projectImage = `images/portfolio/${project.image}`;
      return (
        <div key={project.title} className="columns portfolio-item">
          <div className="item-wrap">
            <a href={project.url} title={project.title} aria-label={`View ${project.title} project`}>
              <OptimizedImage alt={project.title} src={projectImage} width="400" height="300" />
              <div className="overlay">
                <div className="portfolio-item-meta">
                  <h5>{project.title}</h5>
                  <p>{project.category}</p>
                </div>
              </div>
              <div className="link-icon">
                <i className="fa fa-link"></i>
              </div>
            </a>
          </div>
        </div>
      );
    }) || [], [data?.projects]);

  if (!data?.projects) return null;

  return (
    <section id="portfolio">
      <div className="row">
        <div className="twelve columns collapsed">
          <h1>Check Out Some of My Works.</h1>
          <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
            {projects}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Portfolio);
```
Key points: maps project cards, builds an image path per project, wraps items in classes used by the CSS grid and popup scripts.

#### `src/Components/Testimonials.js`
```javascript
import React, { memo, useMemo } from "react";

const Testimonials = ({ data }) => {
  const testimonials = useMemo(() =>
    data?.testimonials?.map((testimonial) => (
      <li key={testimonial.user}>
        <blockquote>
          <p>{testimonial.text}</p>
          <cite>{testimonial.user}</cite>
        </blockquote>
      </li>
    )) || [], [data?.testimonials]);

  if (!data?.testimonials) return null;

  return (
    <section id="testimonials">
      <div className="text-container">
        <div className="row">
          <div className="two columns header-col">
            <h1><span>Client Testimonials</span></h1>
          </div>
          <div className="ten columns flex-container">
            <ul className="slides">{testimonials}</ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Testimonials);
```
Key points: memoized list of quotes, renders a flex slider list tied to the CSS/JS slider styles.

#### `src/Components/Contact.js`
```javascript
import React, { useState, memo, useCallback, useMemo } from "react";
import { SectionHeader } from "../utils";

const Contact = ({ data }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const formattedAddress = useMemo(() => {
    if (!data?.address) return '';
    const { street, city, state, zip } = data.address;
    return `${street}${city ? `, ${city}` : ''}${state ? ` ${state}` : ''}${zip ? ` ${zip}` : ''}`.trim();
  }, [data?.address]);

  const submitForm = useCallback((e) => {
    e?.preventDefault();
    const contactEmail = data?.email;
    if (contactEmail) {
      window.open(
        `mailto:${contactEmail}?subject=${encodeURIComponent(subject || 'Contact Form Submission')}&body=${encodeURIComponent(name)} (${encodeURIComponent(email)}): ${encodeURIComponent(message)}`
      );
    }
  }, [data?.email, subject, name, email, message]);

  if (!data) return null;
  const { name: contactName, email: contactEmail, phone, contactmessage: contactMessage } = data;

  return (
    <section id="contact">
      <SectionHeader title="Get In Touch." subtitle={contactMessage} />
      <div className="row">
        <div className="eight columns">
          <form onSubmit={submitForm}>
            <fieldset>
              <div>
                <label htmlFor="contactName">Name <span className="required">*</span></label>
                <input type="text" value={name} size="35" id="contactName" name="contactName" onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="contactEmail">Email <span className="required">*</span></label>
                <input type="email" value={email} size="35" id="contactEmail" name="contactEmail" onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="contactSubject">Subject</label>
                <input type="text" value={subject} size="35" id="contactSubject" name="contactSubject" onChange={(e) => setSubject(e.target.value)} />
              </div>
              <div>
                <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                <textarea cols="50" rows="15" value={message} onChange={(e) => setMessage(e.target.value)} id="contactMessage" name="contactMessage" required></textarea>
              </div>
              <div>
                <button onClick={submitForm} type="submit" className="submit">Submit</button>
              </div>
            </fieldset>
          </form>
          <div id="message-warning"> Error boy</div>
          <div id="message-success"><i className="fa fa-check"></i>Your message was sent, thank you!<br /></div>
        </div>
        <aside className="four columns footer-widgets">
          <div className="widget widget_contact">
            <h4>Address and Phone</h4>
            <p className="address">
              {contactName}<br />
              {contactEmail}<br /><br />
              {formattedAddress}<br />
              <span>{phone}</span>
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default memo(Contact);
```
Key points: controlled inputs with `useState`, memoized address formatting, submit handler that opens a mailto link, and a sidebar showing contact details.

#### `src/Components/Footer.js`
```javascript
import React, { memo, useMemo } from "react";
import { mapSocialNetworks } from "../utils";

const Footer = ({ data }) => {
  const networks = useMemo(() => mapSocialNetworks(data?.social), [data?.social]);
  if (!data) return null;

  return (
    <footer>
      <div className="row">
        <div className="twelve columns">
          <ul className="social-links">{networks}</ul>
          <ul className="copyright">
            <li>Made by <a title="MILOSLAW" href="http://www.miloslawfostowicz.dev/">PAPA</a></li>
          </ul>
        </div>
        <div id="go-top">
          <a className="smoothscroll" title="Back to Top" href="#home"><i className="icon-up-open"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
```
Key points: reuses the social mapper, keeps rendering minimal, and links back to the top of the page.

## 5) Run the app locally
- Development server: `npm start` (serves at http://localhost:3000 with hot reload)
- Lint/tests (optional): `npm test`

## 6) Build and deploy
- Production build: `npm run build` (outputs `build/`)
- Drag-and-drop deploy to Netlify or upload `build/` to any static host.

## 7) React concepts highlighted
- Props-driven rendering: every section receives data from `resumeData.json`.
- State and controlled inputs: `Contact` form uses `useState` for each field.
- Effects and caching: `useResumeData` fetches once and caches in sessionStorage.
- Memoization: `useMemo`/`memo` prevent unnecessary rerenders in list-heavy sections.
- Lazy loading and Suspense: sections load in separate chunks with a fallback.
- Accessibility touches: `aria-label` on links/buttons, alt text on images, and semantic sections.

## 8) Customization checklist
- Update `public/resumeData.json` with your details.
- Replace images in `public/images/` (keep file names or update the JSON paths).
- Tweak colors/layout in `public/css/layout.css` and `public/css/default.css`.
- Swap fonts or remove jQuery plugins if you want a leaner build (then delete the related scripts and classes).
