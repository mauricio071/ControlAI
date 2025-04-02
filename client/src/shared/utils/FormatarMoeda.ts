export const FormatarMoeda = (value: number) => {
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

  return formattedValue;
};

export const FormatarParaMoeda = (value: string) => {
  const stringNumber = value.replace(/[^0-9,]/g, "").replace(",", ".");

  return parseFloat(stringNumber);
};
