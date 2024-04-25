import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../../REDUX/CharacterSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { goTo } from "../../../REDUX/FormSlice";
import SuccessBadge from "../../Success/SuccessBadge";
import FailedBadge from "../../Success/FailedBadge";
import { Container, Row, Col } from "react-bootstrap";
import EditedBadge from "../../Success/EditedBadge";
import CustomSpinner from "../../CustomSpinner/CustomSpinner";

export default function CheckComponent(props) {
  let characterObj = useSelector((state) => state.character.character);
  let editMode = useSelector((state) => state.editMode);
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCreated, setIsCreated] = useState(null);
  const [isEdited, setIsEdited] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  let { imagefile } = props;

  const sendCharacter = async (userData, url, methodSelected) => {
    try {
      const formData = new FormData();

      // Aggiungi tutti i campi dell'oggetto userData al FormData
      Object.keys(userData).forEach((key) => {
        formData.append(key, userData[key]);
      });

      const response = await fetch(url, {
        method: methodSelected,
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Errore durante la registrazione");
      }
    } catch (error) {
      console.error("Si è verificato un errore:", error.message);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        let characterToSend = {
          idUser: characterObj.idUser,
          Name: characterObj.Name,
          ImageName: characterObj.ImageName,
          ImageFile: imagefile,
          ImageSrc: "none",
          Race: characterObj.Race,
          RaceType: characterObj.RaceType,
          SubRace: characterObj.SubRace,
          Lv: characterObj.Lv,
          Bc: characterObj.BC,
          Backgorund: characterObj.Background.toString(),
          Class: characterObj.Class,
          SubClass: characterObj.SubClass,
          FightingStyle: characterObj.FightingStyle,
          Str: characterObj.STR,
          Dex: characterObj.DEX,
          Con: characterObj.CON,
          Int: characterObj.INT,
          Wis: characterObj.WIS,
          Cha: characterObj.CHA,
          Ca: 10,
          Tpcm: 0,
          Tpcd: 0,
          Tpci: 0,
          ToolProf: characterObj.ToolProf.length > 0 ? JSON.stringify(characterObj.ToolProf) : "",
          AbilitiesProf: characterObj.AbilitiesProf.length > 0 ? JSON.stringify(characterObj.AbilitiesProf) : "",
          AbilitiesMastery:
            characterObj.AbilitiesMastery.length > 0 ? JSON.stringify(characterObj.AbilitiesMastery) : "",
          SavingProf: characterObj.SavingProf.length > 0 ? JSON.stringify(characterObj.SavingProf) : "",
          Visible: true,
          SubClassType: characterObj.SubClassType,
        };

        let urlCharacter = "https://localhost:7106/api/Character/CharacterWithImage";
        await sendCharacter(characterToSend, urlCharacter, "POST");
        setIsLoading(false);
        setIsCreated(true);
        setTimeout(() => {
          dispatch(resetState());
          navigate("/");
        }, 5000);
      } catch (error) {
        console.log("si è verificato un errore " + error);
        setIsLoading(false);
        setIsCreated(false);
        setTimeout(() => {
          dispatch(resetState());
          navigate("/");
        }, 5000);
      }
    };

    const updateFetch = async () => {
      try {
        let characterToSend = {
          idCharacter: editMode.characterSpecifics.idCharacter,
          idUser: characterObj.idUser,
          Name: characterObj.Name,
          ImageName: editMode.characterSpecifics.imageName,
          ImageFile: imagefile,
          ImageSrc: "none",
          Race: characterObj.Race,
          RaceType: characterObj.RaceType,
          SubRace: characterObj.SubRace,
          Lv: characterObj.Lv,
          Bc: characterObj.BC,
          Backgorund: characterObj.Background.toString(),
          Class: characterObj.Class,
          SubClass: characterObj.SubClass,
          FightingStyle: characterObj.FightingStyle,
          Str: characterObj.STR,
          Dex: characterObj.DEX,
          Con: characterObj.CON,
          Int: characterObj.INT,
          Wis: characterObj.WIS,
          Cha: characterObj.CHA,
          Ca: editMode.characterSpecifics.Ca,
          Tpcm: editMode.characterSpecifics.Tpcm,
          Tpcd: editMode.characterSpecifics.Tpcd,
          Tpci: editMode.characterSpecifics.Tpci,
          ToolProf: characterObj.ToolProf.length > 0 ? JSON.stringify(characterObj.ToolProf) : "",
          AbilitiesProf: characterObj.AbilitiesProf.length > 0 ? JSON.stringify(characterObj.AbilitiesProf) : "",
          AbilitiesMastery:
            characterObj.AbilitiesMastery.length > 0 ? JSON.stringify(characterObj.AbilitiesMastery) : "",
          SavingProf: characterObj.SavingProf.length > 0 ? JSON.stringify(characterObj.SavingProf) : "",
          Visible: true,
          SubClassType: characterObj.SubClassType,
        };

        let urlCharacter = `https://localhost:7106/api/Character/${editMode.characterSpecifics.idCharacter}`;
        await sendCharacter(characterToSend, urlCharacter, "PUT");

        setIsLoading(false);
        setIsEdited(true);
        setTimeout(() => {
          dispatch(resetState());
          navigate("/");
        }, 5000);
      } catch (error) {
        console.log("si è verificato un errore " + error);
        setIsLoading(false);
        setIsEdited(false);
        setTimeout(() => {
          dispatch(resetState());
          navigate("/");
        }, 5000);
      }
    };

    if (editMode.editMode) {
      updateFetch();
    } else {
      fetch();
    }
  }, []);

  return (
    <>
      <Container>
        {isLoading ? (
          <CustomSpinner />
        ) : (
          <Row>
            <Col className="d-flex justify-content-center">
              {isCreated != null ? isCreated ? <SuccessBadge /> : <FailedBadge /> : <></>}
              {isEdited != null ? isEdited ? <EditedBadge /> : <FailedBadge /> : <></>}
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
