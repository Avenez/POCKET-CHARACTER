import React from "react";
import Alert from "react-bootstrap/Alert";

export default function FailedAlert(props) {
  let { messagge } = props;

  return (
    <Alert key="danger" variant="danger">
      {messagge}
    </Alert>
  );
}
