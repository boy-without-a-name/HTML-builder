const path = require('path');
const fs = require('fs');

const pathToStyles = path.join(__dirname, 'styles');
const pathtoBundle = path.join(__dirname, 'project-dist','bundle.css');
fs.writeFile( pathtoBundle, '',(error) => {
        if (error) throw error;
    }
);


fs.readdir(pathToStyles, {withFileTypes: true},(error, files) => {
    if(error) throw error;
    files.forEach(file=>{
        if(file.name.includes('.css')){
            fs.readFile(path.join(__dirname, 'styles',file.name),'utf-8',(err, data) => {
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