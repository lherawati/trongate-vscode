export function makeFirstLetterGoUpper(name: string): string {
  const upperName = name.charAt(0).toUpperCase() + name.slice(1);
  return upperName;
}

export function validateModuleName(name: string): string {
  /*** 
    1. module name should not have space - all spaces should be replaced with underscore
    
    2. module name should be all lower case - for the folder
    ***/

  let validatedStr = name.split(" ").join("_");
  validatedStr = validatedStr.toLowerCase();

  return validatedStr;
}
