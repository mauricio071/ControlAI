import {
  Work,
  MonetizationOn,
  AttachMoney,
  LaptopMac,
  AccountBalance,
  MoreHoriz,
  Fastfood,
  DirectionsBus,
  ShoppingCart,
  LocalHospital,
  Home,
  Subscriptions,
  ShoppingBag,
  SportsEsports,
  Build,
  School,
  Flight,
} from "@mui/icons-material";

export const CategoriaSwitch = (categoria: string) => {
  switch (categoria) {
    case "salario":
      return {
        label: "Salário",
        icon: <Work fontSize="small" />,
        bgColor: "#4CAF50",
      };
    case "investimento":
      return {
        label: "Investimento",
        icon: <MonetizationOn fontSize="small" />,
        bgColor: "#FBC02D",
      };
    case "rendaExtra":
      return {
        label: "Renda Extra",
        icon: <AttachMoney fontSize="small" />,
        bgColor: "#03A9F4",
      };
    case "freelance":
      return {
        label: "Freelance",
        icon: <LaptopMac fontSize="small" />,
        bgColor: "#FF9800",
      };
    case "aposentadoria":
      return {
        label: "Aposentadoria",
        icon: <AccountBalance fontSize="small" />,
        bgColor: "#9C27B0",
      };
    case "alimentacao":
      return {
        label: "Alimentação",
        icon: <Fastfood fontSize="small" />,
        bgColor: "#FBC02D",
      };
    case "transporte":
      return {
        label: "Transporte",
        icon: <DirectionsBus fontSize="small" />,
        bgColor: "#03A9F4",
      };
    case "supermercado":
      return {
        label: "Supermercado",
        icon: <ShoppingCart fontSize="small" />,
        bgColor: "#4CAF50",
      };
    case "saude":
      return {
        label: "Saúde",
        icon: <LocalHospital fontSize="small" />,
        bgColor: "#F44336",
      };
    case "casa":
      return {
        label: "Casa",
        icon: <Home fontSize="small" />,
        bgColor: "#795548",
      };
    case "assinatura":
      return {
        label: "Assinatura",
        icon: <Subscriptions fontSize="small" />,
        bgColor: "#9C27B0",
      };
    case "compras":
      return {
        label: "Compras",
        icon: <ShoppingBag fontSize="small" />,
        bgColor: "#FF9800",
      };
    case "lazer":
      return {
        label: "Lazer",
        icon: <SportsEsports fontSize="small" />,
        bgColor: "#673AB7",
      };
    case "servicos":
      return {
        label: "Serviços",
        icon: <Build fontSize="small" />,
        bgColor: "#607D8B",
      };
    case "educacao":
      return {
        label: "Educação",
        icon: <School fontSize="small" />,
        bgColor: "#FF5722",
      };
    case "operacaoBancaria":
      return {
        label: "Operação Bancária",
        icon: <AccountBalance fontSize="small" />,
        bgColor: "#2196F3",
      };
    case "pix":
      return {
        label: "Pix",
        icon: <AttachMoney fontSize="small" />,
        bgColor: "#00C853",
      };
    case "viagem":
      return {
        label: "Viagem",
        icon: <Flight fontSize="small" />,
        bgColor: "#3F51B5",
      };
    case "outros":
    default:
      return {
        label: "Outros",
        icon: <MoreHoriz fontSize="small" />,
        bgColor: "#9E9E9E",
      };
  }
};
