import React, { useEffect, useState, Suspense, lazy, memo } from "react";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

// Lazy load components for code splitting
const About = lazy(() => import("./Components/About"));
const Resume = lazy(() => import("./Components/Resume"));
const Contact = lazy(() => import("./Components/Contact"));
const Testimonials = lazy(() => import("./Components/Testimonials"));
const Portfolio = lazy(() => import("./Components/Portfolio"));

import "./App.css";

// Loading fallback component
const LoadingFallback = memo(() => (
  <div style={{ minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div>Loading...</div>
  </div>
));

const App = () => {
  const [resumeData, setResumeData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prefetch resume data with error handling
    const loadData = async () => {
      try {
        const response = await fetch("/resumeData.json", {
          headers: {
            'Accept': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResumeData(data);
      } catch (error) {
        console.error("Error loading resume data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

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
