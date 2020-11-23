var path = require("path");
var fileExplorer = (function () {
    function fileExplorer(root) {
        this.root = path.resolve(root);
    }
    return fileExplorer;
})();
module.exports = fileExplorer;
