import React, { memo } from "react";

const Footer = ({ data }) => {
  if (!data) return null;

  const networks = data.social?.map((network) => (
    <li key={network.name}>
      <a href={network.url} aria-label={network.name} target="_blank" rel="noopener noreferrer">
        <i className={network.className}></i>
      </a>
    </li>
  )) || [];

  return (
    <footer>
      <div className="row">
        <div className="twelve columns">
          <ul className="social-links">{networks}</ul>

          <ul className="copyright">
            <li>
              Made by{" "}
              <a title="PAPA" href="http://www.papareact.com/">
                PAPA
              </a>
            </li>
          </ul>
        </div>
        <div id="go-top">
          <a className="smoothscroll" title="Back to Top" href="#home">
            <i className="icon-up-open"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
