export function parseToReducedNumber(value) {
  const valueString = value.toString();
  const moneyLength = valueString.length;
  const isHundreds = moneyLength / 3 <= 1;
  const isThousands = moneyLength / 3 > 1 && moneyLength / 3 <= 2;
  const isMillions = moneyLength / 3 > 2 && moneyLength / 3 <= 3;
  const isBillions = moneyLength / 3 > 3 && moneyLength / 3 <= 4;
  const numberOfDigits = moneyLength % 3 === 0 ? 3 : moneyLength % 3;
  let acronym = "";
  let reducedNumber = valueString.substring(0, numberOfDigits);

  if (isHundreds) {
    return valueString;
  } else if (isThousands) {
    acronym = "k";
  } else if (isMillions) {
    acronym = "m";
  } else if (isBillions) {
    acronym = "b";
  }

  return reducedNumber + acronym;
}
