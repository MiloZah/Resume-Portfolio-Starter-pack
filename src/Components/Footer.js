import React, { memo, useMemo } from "react";
import { mapSocialNetworks } from "../utils";

const Footer = ({ data }) => {
  // Memoize social networks - must be called before any early returns
  const networks = useMemo(() => mapSocialNetworks(data?.social), [data?.social]);

  if (!data) return null;

  return (
    <footer>
      <div className="row">
        <div className="twelve columns">
          <ul className="social-links">{networks}</ul>

          <ul className="copyright">
            <li>
              Made by{" "}
              <a title="Milo Slav" href="http://www.miloslawfostowicz.dev/">
                Miloslaw
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
