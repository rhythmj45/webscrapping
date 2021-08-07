let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/royal-challengers-bangalore-vs-sunrisers-hyderabad-eliminator-1237178/full-scorecard"
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
    let bowlers = searchTool(".table.bowler tbody tr");
    //------------------------
  //overview of what are we doing actually

//   let htmldata ="";
//   for(let i=0 ; i<bowlers.length ;i++){
//       htmldata += searchTool(bowlers[i]).html();
//   }
//   fs.writeFileSync("bowlersdata.html" , htmldata);

//-----------------------------------------------------------------
let bname = "";
let hwt = 0;
    for(let i=0 ; i<bowlers.length ;i++){
        let cols = searchTool(bowlers[i]).find("td");
        let name = searchTool(cols[0]).text();
        let wickets = searchTool(cols[4]).text();
        // console.log(name + " " + wickets);
        // console.log(wickets);
        if(wickets>hwt){
            hwt = wickets;
            bname = name;
        }
    }

console.log(bname , " ", hwt);
}
console.log("after");
