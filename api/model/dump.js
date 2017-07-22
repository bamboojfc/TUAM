//delete all data in database
var config = require('../config');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const HOST = 'http://'+config.HOSTNAME+':'+config.API_PORT;
var request = new XMLHttpRequest();
request.open('GET', HOST+'/api/deleteAll', false);  // `false` makes the request synchronous
request.send(null);
var count = 0;

if (request.status === 200) {
    console.log(request.responseText);

    //read new data from file
    var csv = require("fast-csv");
    var data;
    csv
    .fromPath("list.csv")
    .on("data", function(data){
        if(count!==0){
            //console.log("adding data : ", data[0],data[1],data[2],data[3],data[4]);
        
            //insert new data to database
            var handleResponse = function (status, response) {
                if (request.status !== 200) {
                    console.log('fail');
                }else{
                    count++;
                }
            }
            var handleStateChange = function () {
                switch (xmlhttp.readyState) {
                    case 0 :  // UNINITIALIZED
                    case 1 : // LOADING
                    case 2 : // LOADED
                    case 3 : // INTERACTIVE
                    break;
                    case 4 : // COMPLETED
                    handleResponse(xmlhttp.status, xmlhttp.responseText);
                    break;
                    default: alert("error");
                }
            }
            var xmlhttp=new XMLHttpRequest();
            xmlhttp.onreadystatechange=handleStateChange;
            console.log(HOST+'/api/addStudent/'+parseInt(data[0].replace(/,/g, ''), 10)+'/'+data[1]+'/'+data[2]+'/'+data[3]+'/'+data[4]);
            xmlhttp.open("GET",HOST+'/api/addStudent/'+parseInt(data[0].replace(/,/g, ''), 10)+'/'+data[1]+'/'+data[2]+'/'+data[3]+'/'+data[4],'utf-8',true);
            xmlhttp.send(null);
        }else{
            count++;
        }
    })
    .on("end", function(){
        console.log("Added "+count+" students succesfully.");
    });

}else{
    console.log('Dump data fail.');
}



