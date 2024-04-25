import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { fetchWithAuth } from "../../../FETCHES/interceptor";
import { getCookie } from "../../../hooks/getCookie";
import { useDispatch } from "react-redux";
import { setUserCharacterDelete } from "../../../REDUX/NotificationsSlice";

export default function DeleteModal(props) {
  let { character } = props;
  const [deleteCheck, setDeleteCheck] = useState("");
  const dispatch = useDispatch();

  const deleteCharacter = async (characterId, url, token) => {
    try {
      const response = await fetchWithAuth(`${url}/${characterId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Errore durante l'eliminazione del personaggio");
      }

      // Il personaggio è stato eliminato con successo
      console.log("Personaggio eliminato con successo.");
    } catch (error) {
      console.error("Si è verificato un errore:", error.message);
    }
  };

  const deleteCharacterbyId = async (characterId) => {
    const characterIdToDelete = characterId; // ID del personaggio che si desidera eliminare
    const url = "https://localhost:7106/api/Character"; // URL dell'API

    let cookie = getCookie();

    await deleteCharacter(characterIdToDelete, url, cookie.token);
    props.setdeletedcharacter();
    dispatch(setUserCharacterDelete(true));
    props.onHide();
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton className="bg-danger text-white">
        <Modal.Title id="contained-modal-title-vcenter fw-bold"></Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark d-flex flex-column">
        <label className="text-white mb-2">
          Type "DELETE" to delete <span className="fw-bold">{character.name}</span>{" "}
        </label>
        <input
          type="text"
          placeholder="DELETE"
          value={deleteCheck}
          onChange={(event) => setDeleteCheck(event.target.value)}
        />
      </Modal.Body>
      <Modal.Footer className="bg-dark">
        {deleteCheck === "DELETE" && (
          <Button
            className="btn btn-danger"
            onClick={() => {
              deleteCharacterbyId(character.idCharacter);
            }}
          >
            Delete
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
