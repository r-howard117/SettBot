const fs = require("fs");
const path = require("path");

/**
 * 
 * @param {*} directory the directory to get files from
 * @param {*} foldersOnly a boolean for if this function should only return
 *                          folders 
 * @returns an array containing all file names contained within the directory
 */
module.exports = (directory, foldersOnly = false) => {
    let fileNames = [];

    const files = fs.readdirSync(directory, {withFileTypes: true});

    for(let file of files){
        let filePath = path.join(directory, file.name);
        if(foldersOnly) {
            if(file.isDirectory()){
                fileNames.push(filePath);
            }
        } else {
            if(file.isFile()){
                fileNames.push(filePath);
            }
        }
    }

    return fileNames;

}