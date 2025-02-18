export const FormatarMoeda = (value: number) => {
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

  return formattedValue;
};

export const FormatarParaMoeda = (value: string) => {
  const numero = value.replace("R$", "");
  const valorNumerico = numero.replace(/[+-.]/g, "").replace(",", ".");
  return Number(valorNumerico);
};
