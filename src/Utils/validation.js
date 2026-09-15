// Password
export const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const PASSWORD_ERROR_MESSAGE = "Must be 8+ chars with uppercase, lowercase, number & special char";

// First Name / Last Name - letters only, 3 to 20 chars
export const NAME_REGEX = /^[A-Za-z\s]{3,20}$/;
export const NAME_ERROR_MESSAGE = "Must be 3-20 letters only";

// Address - min 5 chars, max 100
export const ADDRESS_REGEX = /^.{5,100}$/;
export const ADDRESS_ERROR_MESSAGE = "Address must be at least 5 characters";

// Egyptian mobile number - 01 then 0/1/2/5 then 8 digits (11 digits total)
export const PHONE_REGEX = /^01[0125][0-9]{8}$/;
export const PHONE_ERROR_MESSAGE = "Enter a valid Egyptian phone number (e.g. 01xxxxxxxxx)";

// Zip / Postal Code - digits only, 3 to 10
export const ZIP_REGEX = /^[0-9]{3,10}$/;
export const ZIP_ERROR_MESSAGE = "Enter a valid zip code(digits only 3 to 10";

// Card Holder Name - same rule as Name
export const CARD_HOLDER_REGEX = NAME_REGEX;
export const CARD_HOLDER_ERROR_MESSAGE = "Enter a valid cardholder name";

// Expiry Date - MM/YY format only 
export const EXPIRY_REGEX = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
export const EXPIRY_ERROR_MESSAGE = "Use MM/YY format";

// Card Number - 13 to 19 digits
export const CARD_NUMBER_REGEX = /^[0-9]{13,19}$/;
export const CARD_NUMBER_ERROR_MESSAGE = "Enter a valid card number(13 to 19)";