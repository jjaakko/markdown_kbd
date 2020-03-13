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
        const pattern: RegExp = new RegExp(arr[index].keyName, "giu");
        accumulator = accumulator.replace(pattern, arr[index].icon);
        // accumulator = "5";
        // console.log(arr[index]);
        return accumulator;
      },
      text
    );
    return result;
  }