import visaLogo from "/src/assets/Icons/visa.png";
import mastercardLogo from "/src/assets/Icons/Mastercard_2019_logo.svg";
import amexLogo from "/src/assets/Icons/download.png";
import defaultLogo from "/src/assets/Icons/defalt.png";

export const cardTypes = [
  { value: "visa", label: "Visa" },
  { value: "mastercard", label: "Mastercard" },
  { value: "amex", label: "American Express" },
];

export const cardLogos = {
  visa: visaLogo,
  mastercard: mastercardLogo,
  amex: amexLogo,
};

export function getCardLogo(type) {
  return cardLogos[type?.toLowerCase()] || defaultLogo;
}