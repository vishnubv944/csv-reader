const express = require('express')
const upload = require('express-fileupload')
const path = require('path')   
csvtojson = require("csvtojson");
const expressLayouts = require('express-ejs-layouts'); 
const app = express()

const fs = require('fs');
const { title } = require('process');

var csvFiles = [];

app.use(upload())

app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.use(express.static('./assets'));

//var json = ['a', 'b', 'c']

app.get('/', function (req, res) {
    res.render("home")
})

app.post('/addFile', (req, res) => {
    //var csvData
    if (!req.files) {
        try {  
            var data = fs.readFileSync('demo.csv', 'utf8');
            return csvtojson().fromString(data).then(json => 
                {
                    head = (Object.keys(json[0]))  
                    length = json.length;
                    res.render('csv-page.ejs', {
                        "json": json,
                        "heading": head,
                        "length": length,
                        "title": "Demo - Sheet1.csv"
                    })
                })
        } catch(e) {
            console.log('Error:', e.stack);
        }
    }
    heading = req.files.file.name
    console.log(heading)
    csvData = req.files.file.data.toString('utf8');
    csvFiles.push(csvData);
  return csvtojson().fromString(csvData).then(json => 
    {
        head = (Object.keys(json[0]))  
        length = json.length;
        res.render('csv-page.ejs', {
            "json": json,
            "heading": head,
            "length": length,
            "title": heading
        })
    })
    
});


console.log("Server is listening to port 8000")

app.listen(8000)