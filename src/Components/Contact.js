import React, { useState, memo, useCallback, useMemo } from "react";
import { SectionHeader } from "../utils";

const Contact = ({ data }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Memoize address formatting - must be called before any early returns
  const formattedAddress = useMemo(() => {
    if (!data?.address) return '';
    const { street, city, state, zip } = data.address;
    return `${street}${city ? `, ${city}` : ''}${state ? ` ${state}` : ''}${zip ? ` ${zip}` : ''}`.trim();
  }, [data?.address]);

  // Memoize submit form callback - must be called before any early returns
  const submitForm = useCallback((e) => {
    e?.preventDefault();
    const contactEmail = data?.email;
    if (contactEmail) {
      window.open(
        `mailto:${contactEmail}?subject=${encodeURIComponent(
          subject || 'Contact Form Submission'
        )}&body=${encodeURIComponent(name)} (${encodeURIComponent(
          email
        )}): ${encodeURIComponent(message)}`
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
                <label htmlFor="contactName">
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  size="35"
                  id="contactName"
                  name="contactName"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="contactEmail">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  size="35"
                  id="contactEmail"
                  name="contactEmail"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="contactSubject">Subject</label>
                <input
                  type="text"
                  value={subject}
                  size="35"
                  id="contactSubject"
                  name="contactSubject"
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="contactMessage">
                  Message <span className="required">*</span>
                </label>
                <textarea
                  cols="50"
                  rows="15"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  id="contactMessage"
                  name="contactMessage"
                  required
                ></textarea>
              </div>

              <div>
                <button onClick={submitForm} type="submit" className="submit">
                  Submit
                </button>
              </div>
            </fieldset>
          </form>

          <div id="message-warning"> Error boy</div>
          <div id="message-success">
            <i className="fa fa-check"></i>Your message was sent, thank you!
            <br />
          </div>
        </div>

        <aside className="four columns footer-widgets">
          <div className="widget widget_contact">
            <h4>Address and Phone</h4>
            <p className="address">
              {contactName}
              <br />
              {contactEmail}
              <br />
              <br />
              {formattedAddress}
              <br />
              <span>{phone}</span>
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default memo(Contact);
