var path = require('path');
var zip = require('cross-zip');
 
var inPath = path.join(__dirname, '../out');
var outPath = path.join(__dirname, '../FrontendFiduciaWeb-v2.war');
 
zip.zipSync(inPath, outPath)