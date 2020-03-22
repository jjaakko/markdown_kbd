// Define type for the config object.
export type Config = {
  wrapKeyNamesSeparately: boolean;
  addSpacesAroundPlusSign: boolean;
  replaceKeyNamesWithIcons: boolean;
};

export type KeyNameInfo = {
  keyName: string,
  icon: string,
  literalIcon?: string
};