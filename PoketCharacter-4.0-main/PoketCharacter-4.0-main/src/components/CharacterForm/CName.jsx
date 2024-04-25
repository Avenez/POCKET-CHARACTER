import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetImageFile,
  resetImageName,
  resetName,
  setIdUser,
  setImageFile,
  setImageName,
  setName,
} from "../../REDUX/CharacterSlice";
import { Col, Container, Row } from "react-bootstrap";
import { nextIndex } from "../../REDUX/FormSlice";
import { fetchCharacter } from "../../FETCHES/CommonFetch";
import { setCharacterSpecifics, setEditMode } from "../../REDUX/EditModeSlice";
// Componente per l'inserimento del nome del personaggio
export default function CName(props) {
  const character = useSelector((state) => state.character.character);
  const editMode = useSelector((state) => state.editMode);
  const dispatch = useDispatch();

  const defaultImageSrc = "/images/placeholder.jpg";

  let initialImageValue = {
    imageName: "",
    imageSrc: defaultImageSrc,
    imageFile: "",
  };

  const [imageValues, setImageValues] = useState(initialImageValue);

  const nextPage = () => {
    dispatch(setImageName(imageValues.imageName));
    props.setimagefile(imageValues.imageFile);

    dispatch(nextIndex());
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImageValues({
          ...imageValues,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImageValues({
        ...imageValues,
        imageFile: null,
        imageSrc: defaultImageSrc,
      });
    }
  };

  // Al montaggio del componente, viene recuperato il coockie di login per ottenere l'id dell'user per associarlo al personaggio
  useEffect(() => {
    const cookie_or_null = (document.cookie.match(/^(?:.*;)?\s*loginCookie\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1]; //Santo STACKOVERFLOW
    if (cookie_or_null != null) {
      let cookie = JSON.parse(cookie_or_null);
      dispatch(setIdUser(cookie.idUser));
    }
    dispatch(resetImageName());
    dispatch(resetName());

    //Se arrivo qui con un id nei params e la modalità update è attiva allora:
    if (editMode.editMode) {
      const fetch = async () => {
        try {
          let character = await fetchCharacter(editMode.characterSpecifics.idCharacter);
          dispatch(setName(character.name));
          dispatch(setEditMode(true));
          setImageValues({
            ...imageValues,
            imageSrc: character.imageSrc,
          });
          dispatch(
            setCharacterSpecifics({
              idCharacter: character.idCharacter,
              imageName: character.ImageName,
              Ca: character.ca,
              Tpcm: character.tpcm,
              Tpcd: character.tpcd,
              Tpci: character.tpci,
            })
          );
        } catch (error) {
          console.log(error);
        }
      };

      fetch();
    }
  }, []);

  //Funzione per il cambio del nome nello state di REDUX
  const updateCName = (e) => {
    let cName = e.target.value;
    dispatch(setName(cName));
  };

  return (
    <Container className="mb-4">
      <Row>
        <Col>
          <h2 className="text-center mb-4">Who are you ? </h2>
          <Row className="row-cols-1">
            <Col>
              <Row className="row-cols-1 mb-4">
                <Col>
                  <label htmlFor="fileInput" className="fileInputLabel">
                    <img
                      src={imageValues.imageSrc}
                      alt="Character Placeholder"
                      className="img-thumbnail rounded-circle"
                      style={{ width: "200px", height: "200px", cursor: "pointer" }}
                    />
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      className="form-control-file"
                      style={{ display: "none" }}
                      onChange={showPreview}
                    />
                  </label>
                </Col>
                <Col className="mt-2">
                  <span className="fileInputText fw-bold">Select Character Image</span>
                </Col>
              </Row>
            </Col>
            <Col>
              <input
                className="nameInput"
                type="text"
                id="CName"
                name="CName"
                value={character.Name}
                placeholder="Character name..."
                onChange={updateCName}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {imageValues.imageSrc !== "/images/placeholder.jpg" && character.Name !== "" ? (
        <>
          <button
            className="nextButton"
            onClick={() => {
              nextPage();
            }}
          >
            Next <i className="bi bi-caret-right-fill ms-2"></i>
          </button>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}
