let is = require("./is");
function lastElement(element){
    if(is(element)==="array"){
        return element[element.length-1];
    }else{
        throw {error:"require array"}
    }
}
module.exports = lastElement;