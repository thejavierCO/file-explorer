import is from "./is";
function lastElement(element: Array<any>){
    if(is(element)==="array"){
        return element[element.length-1];
    }else{
        throw {error:"require array"}
    }
}
export default lastElement;