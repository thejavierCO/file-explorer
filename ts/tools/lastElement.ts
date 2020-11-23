import is from "./is";
function lastElement(element:Array<string>):string{
    if(is(element)==="array"){
        return element[element.length-1];
    }else{
        throw {error:"require array"}
    }
}
export default lastElement;