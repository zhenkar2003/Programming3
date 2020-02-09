var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class Hogh extends LiveForm {
    constructor(x, y){
        super(x, y);
        this.index = 2;
        this.energy = 8;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
}
    move() {

        //yntruma vandak
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;


            this.y = newY;
            this.x = newX;
            this.energy--;

        }

    }
    eat() {


        var newCell = random(this.chooseCell(1));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in WaterArr) {
                if (newX == WaterArr[i].x && newY == WaterArr[i].y) {
                    WaterArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
            this.energy += 2;

        }
    }
    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 8 && newCell) {
            var newHogh = new Hogh(newCell[0], newCell[1], this.index);
            hoghArr.push(newHogh);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 5;
        }
    }

    die() {

        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in hoghArr) {
                if (this.x == hoghArr[i].x && this.y == hoghArr[i].y)
                    hoghArr.splice(i, 1);
                break;
            }
        }
    }
}