/**
 * Consolidated utilities and hooks
 * Reduces file count by combining helpers and custom hooks
 */

import { useState, useEffect, useMemo } from 'react';

// Re-export shared components
export { SectionHeader, SectionWithHeader, InfoItem } from './components';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Maps social networks to list items - used in Header and Footer
 */
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

/**
 * Formats address string from address object
 */
export const formatAddress = (address) => {
  if (!address) return '';
  const { street, city, state, zip } = address;
  return `${street}${city ? `, ${city}` : ''}${state ? ` ${state}` : ''}${zip ? ` ${zip}` : ''}`.trim();
};

/**
 * Optimized image component with lazy loading defaults
 */
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

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

/**
 * Custom hook for fetching and caching resume data
 * Reduces duplication and improves performance
 */
export const useResumeData = () => {
  const [resumeData, setResumeData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        // Check cache first
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
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Cache the data
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

    return () => {
      isMounted = false;
    };
  }, []);

  // Memoize computed values to prevent unnecessary recalculations
  const memoizedData = useMemo(() => ({
    main: resumeData.main || null,
    resume: resumeData.resume || null,
    portfolio: resumeData.portfolio || null,
    testimonials: resumeData.testimonials || null,
  }), [resumeData]);

  return { resumeData: memoizedData, isLoading, error };
};

