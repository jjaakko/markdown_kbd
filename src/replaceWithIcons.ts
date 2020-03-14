import { keyNamesToIcons } from "./validKeyNames";

export function doReplaceKeyNamesWithUnicodeChars(text: string): string {
  // write a reducer for keyNamesToIcons
  // redusoi niin, että joka kierroksella korvaa tekstistä kaikki tietyt merkit
  // Huom! Unicode pitää huomioda.
  // Tarvitaan sittenkin regexiä!!
  // .alt.  ,alt. [välilyönti]alt[välilyönti]
  // paras ehto on ehkä se että ennen tai jälkeen ei saa olla kirjaimia!! tai numeroita!!

  // See https://wincent.com/wiki/Unicode_representations_of_modifier_keys
  const result = keyNamesToIcons.reduce(
    (accumulator, currentValue, index, arr) => {
      const regExString: string = `(?:^|[^a-z0-9])(${arr[index].keyName})(?:[^a-z0-9]|$)`;
      const pattern: RegExp = new RegExp(regExString, "giu");
      accumulator = accumulator.replace(
        pattern,
        (match: string, p1: string, offset: number, wholeString: string): string => {
          console.log("match: " + match);
          console.log("icon: " + arr[index].icon);
          return wholeString.charAt(offset) + arr[index].icon;
        }
      );
      // accumulator = "5";
      // console.log(arr[index]);
      return accumulator;
    },
    text
  );
  return result;
}
