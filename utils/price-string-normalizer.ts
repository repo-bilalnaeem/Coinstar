// Normalizes a string, like "120.050" to "1200.50"
const normalizer = (priceString: string) => {
  let strippedString = priceString.replace(".", "");
  if (
    (strippedString.length < 4 || strippedString == "0000") &&
    parseInt(strippedString, 10) == 0
  ) {
    return "0.00";
  }
  let priceInt = (parseInt(strippedString, 10) / 100).toFixed(2);
  let normalizedPriceString = String(priceInt);
  return normalizedPriceString;
};

// export default normalizer
export default normalizer;
