import React from "react";
import Alert from "react-bootstrap/Alert";

export default function SuccessAlert(props) {
  let { messagge } = props;

  return (
    <Alert key="success" variant="success">
      {messagge}
    </Alert>
  );
}
