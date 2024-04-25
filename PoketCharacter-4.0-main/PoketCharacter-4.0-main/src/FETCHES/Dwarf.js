export const fetchDwarfTraits = async () => {
  const dwarfTraits = [
    "darkvision",
    "dwarven-resilience",
    "stonecunning",
    "dwarven-combat-training",
    "tool-proficiency",
  ];
  const dwarfTraitsResults = [];

  try {
    for (const element of dwarfTraits) {
      const url = `https://www.dnd5eapi.co/api/traits/${element}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Error during request for ancestry");
      }

      const data = await response.json();
      dwarfTraitsResults.push(data);
    }
    console.log(dwarfTraitsResults);
    return dwarfTraitsResults;
  } catch (error) {
    console.error("An error occurred:", error);
    return []; // or handle the error in some other way
  }
};
