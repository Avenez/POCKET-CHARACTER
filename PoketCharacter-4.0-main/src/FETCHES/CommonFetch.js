import { fetchWithAuth } from "./interceptor";

export const fetchTraits = async (traitsArray) => {
  const traitsResults = [];

  try {
    for (const element of traitsArray) {
      const url = `https://www.dnd5eapi.co/api/traits/${element}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Error during request for ancestry");
      }

      const data = await response.json();
      traitsResults.push(data);
    }
    return traitsResults;
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
};

//-----------SUBRACE TRAITS
export const subRaceFetchTraits = async (traitsArray) => {
  const traitsResults = [];

  try {
    for (const element of traitsArray) {
      const url = `https://www.dnd5eapi.co${element.url}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Error during request for ancestry");
      }

      const data = await response.json();
      traitsResults.push(data);
    }
    return traitsResults;
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
};

//---------GENERIC---------------------------------
export const genericFetch = async (urlPlus) => {
  try {
    const url = `https://www.dnd5eapi.co${urlPlus}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Errore durante la richiesta della razza");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
};

// ------------CLASSES-----------------------------

export const fetchClasses = async () => {
  try {
    const url = `https://www.dnd5eapi.co/api/classes`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Errore durante la richiesta della razza");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
};

//-----------SINGLE CLASS---------------------------
export const fetchClass = async (className) => {
  try {
    const url = `https://www.dnd5eapi.co/api/classes/${className}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Errore durante la richiesta della razza");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
};

//-------SUBCLASS---------------------------------------

export const fetchSubClass = async (subClassName) => {
  try {
    const url = `https://www.dnd5eapi.co/api/subclasses/${subClassName}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Errore durante la richiesta della razza");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
};

//------------CLASS LEVELS---------------------------

export const fetchClassLevels = async (className) => {
  try {
    const url = `https://www.dnd5eapi.co/api/classes/${className}/levels`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Errore durante la richiesta della razza");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
};

//----------FEATURES-------------------------------------

export const fetchFeatures = async (featuresArray) => {
  try {
    // Array per memorizzare i risultati delle richieste per ciascuna feature
    const featureData = [];

    // Itera su ciascun oggetto nell'array principale
    for (const obj of featuresArray) {
      // Itera su ciascuna feature nell'array di features dell'oggetto corrente
      for (const feature of obj.features) {
        const url = `https://www.dnd5eapi.co${feature.url}`; // Costruisci l'URL completo
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Errore durante la richiesta di ${feature.name}`);
        }
        const data = await response.json();
        featureData.push(data); // Aggiungi i dati della feature all'array
      }
    }

    return featureData;
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
};

//------------BACKGROUNDS-----------------------------

export const fetchBackGrounds = async () => {
  try {
    // const url = `https://localhost:44305/api/Background`;
    const url = `https://localhost:7106/api/Background`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Errore durante la richiesta dei background");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
};

//------------BACKGROUNDS-----------------------------

export const fetchBackGround = async (id) => {
  try {
    // const url = `https://localhost:44305/api/Background`;
    const url = `https://localhost:7106/api/Background/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Errore durante la richiesta dei background");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
};
//------------CHARACTER LIST---------------------------

export const fetchCharacterList = async (idUser, token) => {
  try {
    const url = `https://localhost:7106/api/Character/UserCharactersWithImage/${idUser}`;

    const response = await fetchWithAuth(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Errore durante la richiesta dei personaggi");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
};

//------------CHARACTER-----------------------------------

export const fetchCharacter = async (idCharacter, token) => {
  try {
    // const url = `https://localhost:44305/api/Character/${idCharacter}`;
    const url = `https://localhost:7106/api/Character/CharacterById/${idCharacter}`;
    const response = await fetchWithAuth(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Errore durante la richiesta dei background");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
};

//------------------------USER

export const fetchUser = async (idUser, token) => {
  try {
    // const url = `https://localhost:44305/api/Character/${idCharacter}`;
    const url = `https://localhost:7106/api/User/${idUser}`;
    const response = await fetchWithAuth(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Errore durante la richiesta dei background");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
};
