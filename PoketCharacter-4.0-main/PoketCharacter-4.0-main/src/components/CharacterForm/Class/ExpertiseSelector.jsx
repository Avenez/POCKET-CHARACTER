import React from "react";
import { Form } from "react-bootstrap";

function capitalizzaPrimaLettera(stringa) {
  return stringa.charAt(0).toUpperCase() + stringa.slice(1);
}

export default function ExpertiseSelector(props) {
  let exIndex = props.position;

  return (
    <Form.Select
      aria-label="Expertise Selector"
      onChange={(e) => props.exepertisefun(e.target.value, exIndex)}
      className="mb-2"
    >
      <option value="NO">Select Expertise</option>
      {props.skills.map((skill, index) => (
        <option key={`id-expertise-${skill.index}-${index}`} value={skill}>
          {capitalizzaPrimaLettera(skill)}
        </option>
      ))}
    </Form.Select>
  );
}
