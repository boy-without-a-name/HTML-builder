const path = require('path');
const fs = require('fs');
const pathToDist = path.join(__dirname, 'project-dist');
const pathToIndex = path.join(__dirname, 'project-dist','index.html');
const pathToTemplate = path.join(__dirname, '','template.html');
const pathToComponents = path.join(__dirname, 'components');
const pathToStyles = path.join(__dirname, 'styles');
const pathtoBundle = path.join(__dirname, 'project-dist','style.css');
const pathToAssets = path.join(__dirname, 'assets');


function createIndex(){
    fs.readFile(pathToTemplate,'utf-8',(error, template) => {
        if(error) throw error;
        fs.readdir(pathToComponents, {withFileTypes: true},(error, files) => {
            if(error) throw error;
            files.forEach(file=>{
                let point = file.name.indexOf('.');
                let str = file.name.slice(0,point);
                fs.readFile(path.join(__dirname, 'components',file.name),'utf-8',(error,component)=>{
                    if(error) throw error;
                    template = template.replace(`{{${str}}}`,component);
                    fs.writeFile(pathToIndex,template,error=>{
                        if(error) throw error;
                    })
                })
            })
        });
    });
}

function createStyle(){
    fs.readdir(pathToStyles, {withFileTypes: true},(error, files) => {
        if(error) throw error;
        files.forEach(file=>{
            if(file.name.includes('.css')){
                fs.readFile(path.join(__dirname, 'styles',file.name),'utf-8',(error, data) => {
                    if (error) throw error;
                    fs.appendFile(
                        pathtoBundle,
                        data,
                        (error) => {
                            if (error) throw error;
                        });
                    }
                )
            }
        })
    });
}

function copyFiles(pathToDir,pathToCopyDir){
    fs.readdir(pathToDir, {withFileTypes: true},(err, files) => {
        if(err) throw err;
        files.forEach(file=>{
            let inputPath =  path.join(pathToDir,file.name);
            let outputPath = path.join(pathToCopyDir,file.name);
            fs.copyFile(inputPath,outputPath,(err=>{
                if(err) throw err;
            }))
        })
    });
}

function copyDir(){
    fs.mkdir(path.join(__dirname,'project-dist'),{recursive:true},  err => {
        if (err) throw err;
    });
    let pathToDistAssets = path.join(pathToDist,'assets');
    fs.mkdir(pathToDistAssets,{recursive:true},  err => {
        if (err) throw err;
    });
    fs.readdir(pathToAssets, {withFileTypes: true},(err, files) => {
        if(err) throw err;
        files.forEach(file=>{
            if(file.isDirectory()){
                fs.mkdir(path.join(pathToDistAssets,`${file.name}`),{recursive:true},  err => {
                    if (err) throw err;
                }); 
                copyFiles(path.join(pathToAssets,`${file.name}`),path.join(pathToDistAssets,`${file.name}`));
            }
        })
    });
}
copyDir();
createIndex();
createStyle();