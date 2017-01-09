var game = {};
game.array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

$(document).ready(function() {
    game.array = shuffle(game.array);
    game.field = $('.gamefield');

    createField(game.array);

    game.items = $('.move');

    game.items.on('click swipe', function(event) {
        var self = $(this);
        var hole = $('.hole');
        game.index = self.index();
        game.holePos = game.array.indexOf(0);
        
        turn(game.array, game.index, game.holePos);

        if (chechWin(game.array)) {
            alert('win');
            location.reload();
        }
    })
})

// меняем местами елементы массива игры
function swap(arr, x, y) {
    var tmp = arr[x];
    arr[x] = arr[y];
    arr[y] = tmp;
    return arr;
}

// делаем ход и отображаем его
function turn(arr, index, hole) {
    if (isPossibleToTurn(index, hole)) {
        game.items[hole].innerHTML = game.items[index].innerHTML;
        game.items[hole].classList.remove('hole');
        game.items[index].innerHTML = 0;
        game.items[index].classList.add('hole');
        return swap(arr, index, hole);
    }
}

// создаем игровое поле
function createField(array) {
    game.field.text('');
    for (var k = 0; k < 16; k++) {
        var item = $('<div></div>');
        if (array[k] !== 0) {
            game.field.append(item.addClass('move').text(array[k]));
        } else {
            game.field.append(item.addClass('move hole').text(array[k]));
        }
    }
}

// проверка массива игры на существование решения
function isDecidable(arr) {
    var c = 0;
    var h = 1 + (arr.indexOf(0) - (arr.indexOf(0) % 4)) / 4;
    for (var i = 0; i < arr.length - 1; i++) {
        var elem = arr[i];
        if (elem > 0) {
            for (var j = i + 1; j < arr.length; j++) {
                if (elem > arr[j] && arr[j] !== 0) {
                    c++;
                }
            }
        }
    }
    return ((c + h) % 2 == 0) ? true : false;
}

// получение перемешеного масива, решение которого существует
function shuffle(arr) {
    var b = true;
    while (b) {
        arr = arr.sort(function() {
            return 0.5 - Math.random();
        });
        if (isDecidable(arr)) {
            b = false;
        }
    }
    return arr;
}

// проверка на возможность хода в ячейку (ход по правилам)
function isPossibleToTurn(index, holePos) {
    if ((index == holePos + 1) && (index % 4 !== 0) ||
        (index == holePos - 1) && (index % 4 !== 3) ||
        index == holePos - 4 || index == holePos + 4) {
        return true;
    } else {
        return false;
    }
}

// проверака, достигнута ли победа
function chechWin(array) {
    var c = 0;
    array.forEach(function(elem, i) {
        if (elem == i + 1) {
            c++;
        }
    })
    return (c === 15) ? true : false;
}
