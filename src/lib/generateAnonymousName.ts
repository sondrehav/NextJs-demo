import animalNames from "@/../animalNames.json";

const generateAnonymousName = (uuid: string): string => {
  const id = Number("0x" + uuid.replace(/-/g, ""));
  return animalNames[id % animalNames.length];
};

export default generateAnonymousName;
