//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Devil = require("./modules/Devil.js");
var Fire = require("./modules/Fire.js");
var Water = require("./modules/Water.js");
var Hogh = require("./modules/Hogh.js");
let random = require('./modules/random');
seasontime = 0;
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
DevilArr = [];
FireArr = [];
WaterArr = [];
hoghArr = [];
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0;
devilHashiv = 0;
fireHashiv = 0;
waterHashiv = 0;
hoghHashiv = 0;

//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, devil, fire, water, hogh) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < devil; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < fire; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < water; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < hogh; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }
}
matrixGenerator(20, 40, 43, 54, 67, 89, 50);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
            }
            else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var devil = new Devil(x, y);
                DevilArr.push(devil);
                devilHashiv++;
            }
            else if (matrix[y][x] == 4) {
                var fire = new Fire(x, y);
                FireArr.push(fire);
                fireHashiv++;
            }
            else if (matrix[y][x] == 5) {
                var water = new Water(x, y);
                WaterArr.push(water);
                waterHashiv++;
            }
            else if (matrix[y][x] == 6) {
                var hogh = new Hogh(x, y);
                hoghArr.push(hogh);
                hoghHashiv++;
            }
        }
    }
}
creatingObjects();

function game() {

    seasontime++;
    if (seasontime >= 0 && seasontime <= 10) {
        season = "winter";
    }
    else if (seasontime >= 11 && seasontime <= 12) {
        season = "spring";
    }
    else if (seasontime >= 13 && seasontime <= 15) {
        season = "summer";
    }
    else if (seasontime >= 16 && seasontime <= 50) {
        season = "autumn";
    }
    else {
        seasontime = 0;
    }

    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
            grassEaterArr[i].mul();
            grassEaterArr[i].move();
            grassEaterArr[i].die();
        }
    }
    if (DevilArr[0] !== undefined) {
        for (var i in DevilArr) {
            DevilArr[i].eat();
            DevilArr[i].mul();
            DevilArr[i].move();
            DevilArr[i].die();
        }
    }
    if (FireArr[0] !== undefined) {
        for (var i in FireArr) {
            FireArr[i].eat();
            FireArr[i].mul();
            FireArr[i].move();
            FireArr[i].die();
        }
    }

    if (WaterArr[0] !== undefined) {
        for (var i in WaterArr) {
            WaterArr[i].eat();
            WaterArr[i].mul();
            WaterArr[i].move();
            WaterArr[i].die();
        }
    }
    if (hoghArr[0] !== undefined) {
        for (var i in hoghArr) {
            hoghArr[i].eat();
            hoghArr[i].mul();
            hoghArr[i].move();
            hoghArr[i].die();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        devilCounter: devilHashiv,
        fireCounter: fireHashiv,
        waterCounter: waterHashiv,
        hoghCounter: hoghHashiv,
        s: season
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



// addEventListener("click", go_to_add())
// function go_to_add(){
    
// }

// function go_to_add(){

// }
let AddCharacter = {
    characteradder: grass
}

io.sockets.emit("add" , AddCharacter)

setInterval(game, 1000)

