import React from "react";

export default function AddCharacterButton() {
  return (
    <div className="addButton">
      <a href="/Main">
        <img
          src="/images/addcharacter.png"
          alt="addcharacter"
          style={{ width: "100px" }}
          className="border border-5 border-black rounded-circle cursor"
        />
      </a>
    </div>
  );
}
