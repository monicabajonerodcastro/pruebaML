import Numeral from "numeral";

export default function PriceFormatter({price}){
    return Numeral(price).format('$ 0,0[.]00');  
}