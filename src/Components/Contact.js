import React, { useState, memo, useCallback, useMemo } from "react";
import { SectionHeader, formatAddress } from "../utils";

const Contact = ({ data }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("idle");

  // Memoize address formatting - must be called before any early returns
  const formattedAddress = useMemo(
    () => formatAddress(data?.address),
    [data?.address],
  );

  // Memoize submit form callback - must be called before any early returns
  const submitForm = useCallback(async (e) => {
    e?.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus("idle");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
          company: company.trim(),
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setCompany("");
    } catch (error) {
      setStatus("error");
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  }, [name, email, subject, message, company, isSubmitting]);

  if (!data) return null;

  const { name: contactName, email: contactEmail, phone, contactmessage: contactMessage } = data;

  return (
    <section id="contact">
      <SectionHeader title="Get In Touch." subtitle={contactMessage} />

      <div className="row">
        <div className="eight columns">
          <form onSubmit={submitForm}>
            <fieldset>
              <div style={{ position: "absolute", left: "-10000px" }} aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  value={company}
                  id="company"
                  name="company"
                  onChange={(e) => setCompany(e.target.value)}
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>

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
                  maxLength={100}
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
                  maxLength={254}
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
                  maxLength={150}
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
                  maxLength={2000}
                  required
                ></textarea>
              </div>

              <div>
                <button type="submit" className="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Submit"}
                </button>
              </div>
            </fieldset>
          </form>

          <div
            id="message-warning"
            style={{ display: status === "error" ? "block" : "none" }}
          >
            <i className="fa fa-warning"></i>Something went wrong. Please try again.
          </div>
          <div
            id="message-success"
            style={{ display: status === "success" ? "block" : "none" }}
          >
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