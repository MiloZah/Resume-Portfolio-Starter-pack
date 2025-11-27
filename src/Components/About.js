import React, { memo, useMemo } from "react";
import { OptimizedImage, formatAddress } from "../utils";

const About = ({ data }) => {
  // Memoize address formatting - must be called before any early returns
  const formattedAddress = useMemo(() => formatAddress(data?.address), [data?.address]);

  if (!data) return null;

  const { name, image, bio, phone, email } = data;
  const resumeDownload = data['resumedownload'];
  const profilePic = `images/${image}`;

  return (
    <section id="about">
      <div className="row">
        <div className="three columns">
          <OptimizedImage
            className="profile-pic"
            src={profilePic}
            alt={name}
            width="200"
            height="200"
          />
        </div>
        <div className="nine columns main-col">
          <h2>About Me</h2>

          <p>{bio}</p>
          <div className="row">
            <div className="columns contact-details">
              <h2>Contact Details</h2>
              <p className="address">
                <span>{name}</span>
                <br />
                <span>{formattedAddress}</span>
                <br />
                <span>{phone}</span>
                <br />
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
