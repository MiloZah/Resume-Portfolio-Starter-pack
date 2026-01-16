/**
 * Shared component patterns to reduce duplication
 */

import React from 'react';

/**
 * Reusable section header component
 */
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

/**
 * Reusable section wrapper with header column pattern
 */
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

/**
 * Reusable list item renderer for education/work
 */
export const InfoItem = ({ title, subtitle, date, description }) => (
  <div>
    <h3>{title}</h3>
    <p className="info">
      {subtitle} <span>&bull;</span>
      <em className="date">{date}</em>
    </p>
    {description && <p>{description}</p>}
  </div>
);

