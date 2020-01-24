class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    // bazmanuma azat vandakneri himan vra
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        // console.log(newCell, this.multiply);
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}


class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 5;
    }
    //vorpes method
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    //qayluma
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

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
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
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 5;
        }
    }

    die() {

        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y)
                    grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}



class Devil {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    } 
    move() {

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


        var newCell = random(this.chooseCell(2));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
            this.energy += 3;

        }
    }


   
    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 8 && newCell) {
            var newDevil = new Devil(newCell[0], newCell[1], this.index);
            DevilArr.push(newDevil);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 5;
        }
    }


    die() {

        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in DevilArr) {
                if (this.x == DevilArr[i].x && this.y == DevilArr[i].y){
                    DevilArr.splice(i, 1);
                break;
                }
            }
        }
    }

}


class Frcharacter {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.energy = 15
     }

    getNewCoordinates(){
        this.directions = [ 
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2], 
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    eat() {
        
        var newCell = this.chooseCell(3);
        var newCell1 = this.chooseCell(1);
        var merge = random(newCell.concat(newCell1))

          if(merge) {
              var newX = merge[0];
              var newY = merge[1];

              matrix[this.y][this.x] = 0;
              matrix[newY][newX] = this.index;

              for (var i in DevilArr) {
                            if (newX == DevilArr[i].x && newY == DevilArr[i].y) {
                                 DevilArr.splice(i, 1);
                                break;
                            }
                         }

            for (var i in grassArr) {
                            if (newX == grassArr[i].x && newY == grassArr[i].y) {
                                 grassArr.splice(i, 1);
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

        if (this.energy >= 18 && newCell) {
            var newFrcharacter = new Frcharacter(newCell[0], newCell[1], 4);
            FrcharacterArr.push(newFrcharacter);
            matrix[newCell[1]][newCell[0]] = 4;
            this.energy = 15;
        }
    }


die() {

    if (this.energy <= 0) {
        matrix[this.y][this.x] = 0;
        for (var i in FrcharacterArr) {
            if (this.x == FrcharacterArr[i].x && this.y == FrcharacterArr[i].y){
                FrcharacterArr.splice(i, 1);
            break;
            }
        }
    }
}
}

class Sccharacter {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.energy = 25;
     }

    getNewCoordinates(){
        this.directions = [ 
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 2]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 28 && newCell) {
            var newSccharacter = new Sccharacter(newCell[0], newCell[1], this.index);
            SccharacterArr.push(newSccharacter);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 25;
        }
    }



    move() {

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
        
    var newCell = this.chooseCell(4);
    var newCell1 = this.chooseCell(1);
    var mix = random(newCell.concat(newCell1))

      if(mix) {
          var newX = mix[0];
          var newY = mix[1];

          matrix[this.y][this.x] = 0;
          matrix[newY][newX] = this.index;

          for (var i in FrcharacterArr) {
                        if (newX == FrcharacterArr[i].x && newY == FrcharacterArr[i].y) {
                            FrcharacterArr.splice(i, 1);
                            break;
                        }
                     }

        for (var i in grassArr) {
                        if (newX == grassArr[i].x && newY == grassArr[i].y) {
                             grassArr.splice(i, 1);
                            break;
                        }
                     } 


       this.y = newY;
       this.x = newX;
       this.energy += 2;             
                     
        
      }
}



die() {

    if (this.energy <= 0) {
        matrix[this.y][this.x] = 0;
        for (var i in SccharacterArr) {
            if (this.x == SccharacterArr[i].x && this.y == SccharacterArr[i].y){
                SccharacterArr.splice(i, 1);
            break;
            }
        }
    }
}
}