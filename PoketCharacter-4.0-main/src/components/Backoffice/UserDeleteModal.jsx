import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../hooks/getCookie";
import { useDispatch } from "react-redux";
import { setUserDelete } from "../../REDUX/NotificationsSlice";

export default function UserDeleteModal(props) {
  let { user } = props;
  const [deleteCheck, setDeleteCheck] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteUser = async (characterId, url) => {
    let cookie = getCookie();
    try {
      const response = await fetch(`${url}/${characterId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${cookie.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Errore durante l'eliminazione del personaggio");
      }
      // Il personaggio è stato eliminato con successo
    } catch (error) {
      console.error("Si è verificato un errore:", error.message);
    }
  };

  const deleteUserId = async (characterId) => {
    const characterIdToDelete = characterId; // ID del personaggio che si desidera eliminare
    const url = "https://localhost:7106/api/User/UserAndCharacters"; // URL dell'API

    await deleteUser(characterIdToDelete, url);
    dispatch(setUserDelete(true));
    navigate("/Backoffice");
    props.onHide();
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton className="bg-danger text-white">
        <Modal.Title id="contained-modal-title-vcenter fw-bold"></Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark d-flex flex-column">
        <label className="text-white mb-2">
          Type "DELETE" to delete the User: <span className="fw-bold">{user.username}</span>{" "}
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
              deleteUserId(user.idUser);
            }}
          >
            Delete
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
