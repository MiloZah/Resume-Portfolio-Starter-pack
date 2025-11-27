import React, { Suspense, lazy, memo } from "react";
import { useResumeData } from "./utils";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

// Lazy load components for code splitting
const About = lazy(() => import("./Components/About"));
const Resume = lazy(() => import("./Components/Resume"));
const Contact = lazy(() => import("./Components/Contact"));
const Testimonials = lazy(() => import("./Components/Testimonials"));
const Portfolio = lazy(() => import("./Components/Portfolio"));


// Optimized loading fallback component
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
