const path = require('path');
const fs = require('fs');
const { error } = require('console');
const pathToFiles = path.join(__dirname, 'files');

function copyDir(){
    fs.mkdir(path.join(__dirname,'files-copy'),{recursive:true},  error => {
        if (error) throw error;
    });
    fs.readdir(pathToFiles, {withFileTypes: true},(error, files) => {
        if(error) throw error;
        files.forEach(file=>{
            let inputPath =  path.join(__dirname, 'files',file.name);
            let outputPath = path.join(__dirname, 'files-copy',file.name);
            fs.copyFile(inputPath,outputPath,(error=>{
                if(error) throw error;
            }))
        })
    });
}

copyDir();
