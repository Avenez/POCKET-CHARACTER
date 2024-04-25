export const fetchAnchestry = async () => {
  try {
    const url = `https://www.dnd5eapi.co/api/traits/draconic-ancestry`;
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

export const fetchBreathWeapon = async () => {
  try {
    const url = `https://www.dnd5eapi.co/api/traits/breath-weapon`;
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

export const fetchDamageResistance = async () => {
  try {
    const url = `https://www.dnd5eapi.co/api/traits/damage-resistance`;
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

export const fetchAnchestryType = async () => {
  const AnchestryType = ["black", "blue", "brass", "bronze", "copper", "gold", "green", "red", "silver", "white"];
  const Anchestryresults = [];

  try {
    for (const element of AnchestryType) {
      const url = `https://www.dnd5eapi.co/api/traits/draconic-ancestry-${element}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Error during request for ancestry");
      }

      const data = await response.json();
      Anchestryresults.push(data);
    }
    return Anchestryresults;
  } catch (error) {
    console.error("An error occurred:", error);
    return []; // or handle the error in some other way
  }
};
