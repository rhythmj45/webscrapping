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

    for(let i=0 ; i<bowlers.length ;i++){
        let cols = searchTool(bowlers[i]).find("td");
        let aElem = searchTool(cols[0]).find("a")
        let link = aElem.attr("href");
        
         
         let fullLink = `https://www.espncricinfo.com/${link}`;
        //  console.log(fullLink);
        request(fullLink,newCb)
    }
}

function newCb(error, response, html) {
    if(error){
  console.error(error); 
    }
    else if(response.statusCode==404){
        console.log("page not found");
    }
    else{
        // console.log(html);
        // console.log("html");
        console.log("----------------------");
        getbd(html);
    }
    
}  

function getbd(html){
    let searchTool = cheerio.load(html);
    let headingsArr = searchTool(".player-card-description");
    let dob = searchTool(headingsArr[2]).text();
    // console.log(dob);
    let name = searchTool(headingsArr[0]).text();
    console.log(name, " :-" , dob);
}
console.log("after");