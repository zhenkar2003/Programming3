
//! Setup function fires automatically
function setup() {

    var socket = io();

    var side = 30;

    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let devilCountElement = document.getElementById('devilCount');
    let fireCountElement = document.getElementById('fireCount');
    let waterCountElement = document.getElementById('waterCount');
    let hoghCountElement = document.getElementById('hoghCount');
    let grassweather = document.getElementById('grassweather');
    let grassEaterweather = document.getElementById('grassEaterweather');
    let devilWeather = document.getElementById('devilweather');
    let Fireweather = document.getElementById('Fireweather');
    let Waterweather = document.getElementById('Waterweather');
    let Hoghweather = document.getElementById('Hoghweather');
    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        season = data.s;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        devilCountElement.innerText = data.devilCounter;
        fireCountElement.innerText = data.fireCounter;
        waterCountElement.innerText = data.waterCounter;
        hoghCountElement.innerText = data.hoghCounter;
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#f4f5e1');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    fill("green");
                    rect(j * side, i * side, side, side);
                    if (season == "winter") {

                        fill("white");
                        rect(j * side, i * side, side, side);
                        grassweather.innerText = "ձմեռ"
                    }
                    else if(season == "spring"){
                        fill("#07fa40");
                        rect(j * side, i * side, side, side);
                        grassweather.innerText = "գարուն"
                    }
                    else if(season == "summer"){
                        fill("yellow");
                        rect(j * side, i * side, side, side);
                        grassweather.innerText = "ամառ"
                    }
                    else if(season == "autumn"){
                        fill("orange");
                        rect(j * side, i * side, side, side);
                        grassweather.innerText = "աշուն"
                    }
                    
                }

                else if (matrix[i][j] == 2) {
                    fill("orange");
                    rect(j * side, i * side, side, side);
                    if (season == "winter") {
                        fill("#b56d07");
                        rect(j * side, i * side, side, side);
                        grassEaterweather.innerText = "ձմեռ"
                    }
                    else if(season == "spring"){
                        fill("#02b081");
                        rect(j * side, i * side, side, side);
                        grassEaterweather.innerText = "գարուն"
                    }
                    else if(season == "summer"){
                        fill("#ae2ab5");
                        rect(j * side, i * side, side, side);
                        grassEaterweather.innerText = "ամառ"
                    }
                    else if(season == "autumn"){
                        fill("#e8ed47");
                        rect(j * side, i * side, side, side);
                        grassEaterweather.innerText = "աշուն"
                    }
                    
                }
                else if (matrix[i][j] == 0) {
                    fill("#f4f5e1");
                    rect(j * side, i * side, side, side);
                }

                else if (matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                    if (season == "winter") {
                        fill("#052687");
                        rect(j * side, i * side, side, side);
                        devilWeather.innerText = "ձմեռ"
                    }
                    else if(season == "spring"){
                        fill("#f257f0");
                        rect(j * side, i * side, side, side);
                        devilWeather.innerText = "գարուն"
                    }
                    else if(season == "summer"){
                        fill("#98f086");
                        rect(j * side, i * side, side, side);
                        devilWeather.innerText = "ամառ"
                    }
                    else if(season == "autumn"){
                         fill("#ffcd69");
                         rect(j * side, i * side, side, side);
                         devilWeather.innerText = "աշուն"
                    }       
                      
                    
                }     
                 
                else if (matrix[i][j] == 4) {
                    
                    fill('blue');
                    rect(j * side, i * side, side, side);
                    if (season == "winter") {
                        fill("#c4163b");
                        rect(j * side, i * side, side, side);
                        Fireweather.innerText = "ձմեռ"
                    }
                    else if(season == "spring"){
                        fill("#7d3376");
                        rect(j * side, i * side, side, side);
                        Fireweather.innerText = "գարուն"
                    }
                    else if(season == "summer"){
                        fill("#a6a600");
                        rect(j * side, i * side, side, side);
                        Fireweather.innerText = "ամառ"
                    }
                    else if(season == "autumn"){
                        fill("orange");
                        rect(j * side, i * side, side, side);
                        Fireweather.innerText = "աշուն"
                    }
                    
                } 
                else if (matrix[i][j] == 5) {
                    fill('yellow');
                    rect(j * side, i * side, side, side);
                    if (season == "winter") {
                        fill("#00ffe1");
                        rect(j * side, i * side, side, side);
                        Waterweather.innerText = "ձմեռ"
                    }
                    else if(season == "spring"){
                        fill("#ff6a00");
                        rect(j * side, i * side, side, side);
                        Waterweather.innerText = "գարուն"
                    }
                    else if(season == "summer"){
                        fill("#d7db84");
                        rect(j * side, i * side, side, side);
                        Waterweather.innerText = "ամառ"
                    }
                    else if(season == "autumn"){
                        fill("#f55d5d");
                        rect(j * side, i * side, side, side);
                        Waterweather.innerText = "աշուն"
                    }

                    else if (matrix[i][j] == 6) {
                        fill("purple");
                        rect(j * side, i * side, side, side);
                        if (season == "winter") {
                            fill("#ca9ff5");
                            rect(j * side, i * side, side, side);
                            Hoghweather.innerText = "ձմեռ"
                        }
                        else if(season == "spring"){
                            fill("#f59faa");
                            rect(j * side, i * side, side, side);
                            Hoghweather.innerText = "գարուն"
                        }
                        else if(season == "summer"){
                            fill("#bff59f");
                            rect(j * side, i * side, side, side);
                            Hoghweather.innerText = "ամառ"
                        }
                        else if(season == "autumn"){
                            fill("#f5e19f");
                            rect(j * side, i * side, side, side);
                            Hoghweather.innerText = "աշուն"
                        }
                }
            }
        }
    }
}
var clickCount = 0;
function clickHandler(evt){
   clickCount++;
   console.log(evt);
   var str = "Added character " + clickCount;
   this.innerText = str;
}

var add = document.getElementById("Addcharacter");
add.addEventListener("click", clickHandler);

// document.getElementById('Addcharacter').onclick = go_to_add() {
    
// }​;​

var addgrass = document.getElementById('Addcharacter');

socket.on("add", go_to_add);

function go_to_add(add){
   addgrass = add.grass
}

}