let request = require("request");
let cheerio = require("cheerio");
console.log("before");
request("https://www.npmjs.com/package/cheerio",cb);
function cb(error, response, html) {
    if(error){
  console.error(error); 
    }
    else if(response.statusCode==404){
        console.log("page not found");
    }
    else{
        // console.log(html);
        // console.log("html");
        dataExtractor(html);
    }
    
}  

function dataExtractor(html){
    //searchtool

    let searchTool = cheerio.load(html);
    //css selector -->element
    let elemRep = searchTool("#readme>h1");
    //text
    let moduleName = elemRep.text().trim();
    console.log("moduleName" , moduleName);

}
console.log("after");
