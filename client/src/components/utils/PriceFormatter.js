import Numeral from "numeral";

/**
 * 
 * PriceFromatter component
 * 
 * This component converts a number into a currency amount.
 * 
 * @param {integer} price 
 */
export default function PriceFormatter({price}){
    return Numeral(price).format('$ 0,0[.]00');  
}