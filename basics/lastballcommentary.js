let url ="https://www.espncricinfo.com/series/ipl-2020-21-1210595/royal-challengers-bangalore-vs-sunrisers-hyderabad-eliminator-1237178/ball-by-ball-commentary"

let request = require("request");
let cheerio = require("cheerio");
console.log("before");
request(url,cb);
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
    let elemRepArr = searchTool(".match-comment-wrapper .match-comment-long-text");
    //29 me search tool dobara karna padega hi agar array access krenge to
    let lbc = searchTool(elemRepArr[0]).text();
    console.log("lbc" , lbc);

}
console.log("after");
