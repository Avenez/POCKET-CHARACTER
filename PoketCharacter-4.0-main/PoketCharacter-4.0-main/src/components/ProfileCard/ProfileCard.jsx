import React from "react";
import "./ProfileCardStyle.scss";

export default function ProfileCard() {
  return (
    <div class="profile-card-container">
      {/* <span class="pro">Junior</span> */}
      <img class="round profileImage" src="images/profile.jpg" alt="user" />
      <h3>Alvise Veneziano</h3>
      <h6>Salerno, Italy</h6>
      <p>
        Full Stack Developer <br />
      </p>
      <div class="buttons">
        {/* <button class="primary">Message</button> */}

        <a href="https://www.linkedin.com/in/aveneziano/" target="_blank" class="primary ghost">
          <i className="bi bi-linkedin"></i> Linkedin
        </a>
      </div>
      <div class="skills">
        <h6>Skills</h6>
        <ul>
          <li>UI / UX</li>
          <li>Full Stack Development</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
          <li>React</li>
          <li>Redux</li>
          <li>SASS</li>
          <li>C#</li>
          <li>.NET</li>
        </ul>
      </div>
    </div>
  );
}
