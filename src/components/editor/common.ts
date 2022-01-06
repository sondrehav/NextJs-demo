export const identifierPattern = {
  value: /^[\da-z][\da-z-]{2,62}[\da-z]$/,
  message:
    "The identifier must be all lower-case, only include letters, numbers and '-'. " +
    "It must start with a letter and end in a letter or number. " +
    "It must be between 4 and 64 characters.",
};

const regex = new RegExp(/[^A-Za-z0-9\-_]/g);

export const sanitizeIdentifier = (identifier: string) => {
  return identifier
    .replaceAll(" ", "-")
    .replaceAll(regex, "")
    .toLowerCase()
    .substring(0, 64);
};
