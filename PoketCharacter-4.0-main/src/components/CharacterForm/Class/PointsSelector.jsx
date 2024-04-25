import React from "react";
import { Form } from "react-bootstrap";

export default function PointsSelector(props) {
  let position = props.position;

  return (
    <Form.Select
      aria-label="PointsSelector"
      onChange={(e) => props.selectPointsFun(e.target.value, position)}
      className="mb-2"
    >
      <option value="NO">Select Ability</option>
      <option value="STR+">STR</option>
      <option value="DEX+">DEX</option>
      <option value="CON+">CON</option>
      <option value="INT+">INT</option>
      <option value="WIS+">WIS</option>
      <option value="CHA+">CHA</option>
    </Form.Select>
  );
}
