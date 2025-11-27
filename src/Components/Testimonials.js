import React, { memo, useMemo } from "react";

const Testimonials = ({ data }) => {
  // Memoize testimonials list - must be called before any early returns
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
            <h1>
              <span>Client Testimonials</span>
            </h1>
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
