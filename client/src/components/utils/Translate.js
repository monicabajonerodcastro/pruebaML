/**
 * 
 * Condition component
 * 
 * This component map the condition of the item in order to show the item condition in Spanish
 * 
 * @param {boolean} condition The condition variable is assigned by destructuring and it is
 *      a flag that indicates if the item is new or used in the condition param 
 */
function Condition({condition}){
    const conditionLabels =  {
        "used": "Usado",
        "new": "Nuevo"
    }
    return conditionLabels[condition];
}

/**
 * SoldQuantity component
 * 
 * This component returns the appropriate word (in singular or plural) according to the sold quantity
 * 
 * @param {Integer} soldQuantity The soldQuantity variable is assigned by destructuring and it is
 *      a flag that indicates the sold units of the item. 
 */

function SoldQuantity({soldQuantity}){
    if(soldQuantity !== 1){
        return <span> {soldQuantity} vendidos</span>;
    }else{
        return <span> {soldQuantity} vendido</span>;
    }
}

export {Condition, SoldQuantity};