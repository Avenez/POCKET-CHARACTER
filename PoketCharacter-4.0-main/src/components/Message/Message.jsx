import React from "react";
import "./MessageStyle.scss";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function Message() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_duiazrt", "template_53fw14g", form.current, {
        publicKey: "AluOk0TPHzjdtPFHn",
      })
      .then(
        () => {
          alert("Tank you for your attention!");
        },
        (error) => {
          alert("FAILED...", error.text);
        }
      );
  };

  return (
    <>
      <div className="contact">
        <div id="container">
          <h2>CONTACT</h2>
          <form ref={form} onSubmit={sendEmail} id="contact_form">
            <div className="name">
              <label htmlFor="name"></label>
              <input type="text" placeholder="name" name="from_name" id="name_input" required />
            </div>
            <div className="email">
              <label htmlFor="email"></label>
              <input type="email" placeholder="e-mail" name="from_email" id="email_input" required />
            </div>
            <div className="message">
              <label htmlFor="message"></label>
              <textarea name="message" placeholder="message" id="message_input" cols="30" rows="5" required></textarea>
            </div>
            <div className="submit">
              <input type="submit" value="send" id="form_button" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
