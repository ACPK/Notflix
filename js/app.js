canvas = document.getElementById('canvas');

var i, j, k;
var flag;

var genres = [];

for (i = 0; i < movies.length; i++) {
    flag = false;
    for (j = 0; j < genres.length; j++){
        if (genres[j] === movies[i].genre) {
            flag = true;
            break;
        }
    }
    if (!flag) genres.push(movies[i].genre);
}



for (j = 0; j < genres.length; j++) {


    var container = document.createElement('div');
    container.classList.add('container');

    var genre = document.createElement('h4');
    var genre_text = document.createTextNode(genres[j]);

    genre.appendChild(genre_text);
    container.appendChild(genre);


    var row = document.createElement('div');
    row.classList.add('row');

    for (i = 0; i < movies.length; i++) {
        if (genres[j] === movies[i].genre) {

            if (row.children.length < 6) {

                var tile = document.createElement('div');
                tile.classList.add('tile');

                var overlay = document.createElement('div');
                overlay.classList.add('overlay', 'hover');

                var play_icon = document.createElement('div');
                play_icon.classList.add('play-icon');

                var play_icon_outer = document.createElement('div');
                play_icon_outer.classList.add('play-icon-outer');

                var play_icon_inner = document.createElement('div');
                play_icon_inner.classList.add('play-icon-inner');

                var play_icon_arrow = document.createElement('div');
                play_icon_arrow.classList.add('play-icon-arrow');

                var text = document.createTextNode(movies[i].name);

                play_icon_inner.appendChild(play_icon_arrow);
                play_icon_outer.appendChild(play_icon_inner);
                play_icon.appendChild(play_icon_outer);
                tile.appendChild(play_icon);
                tile.appendChild(overlay);
                tile.appendChild(text);
                row.appendChild(tile);
            }
        }
    }

    container.appendChild(row);
    canvas.appendChild(container);

}



var hover_tiles = document.getElementsByClassName('tile');
var current_node = null;



var mouseover_delay = function (elem, callback) {
    var timeout = null;
    elem.addEventListener('mouseover', function() {
        timeout = setTimeout(function() { callback(elem); }, 200);
    });

    elem.addEventListener('mouseout', function() {
        clearTimeout(timeout);
    });
};


var mouseout_delay = function (elem, callback) {
    var timeout = null;
    elem.addEventListener('mouseover', function() {
        clearTimeout(timeout);
    });

    elem.addEventListener('mouseout', function() {
        timeout = setTimeout(function() { callback(elem); }, 200);
    });
};

for (i = 0; i < hover_tiles.length; i++) {

    // Mouseover
    mouseover_delay(hover_tiles[i], function(elem){
        elem.classList.add('tile-scale');
        elem.children[0].classList.add('play-icon-hover');

        // Shift left side
        for (current_node = elem.previousSibling ; current_node !== null ; current_node = current_node.previousSibling){
            current_node.classList.add('shiftLeft');
        }

        // Shift right side
        for (current_node = elem.nextSibling ; current_node !== null ; current_node = current_node.nextSibling){
            current_node.classList.add('shiftRight');
        }
    });

    // Mouseout
    mouseout_delay(hover_tiles[i], function(elem){
        elem.classList.remove('tile-scale');
        elem.children[0].classList.remove('play-icon-hover');

        // Shift left side
        for (current_node = elem.previousSibling ; current_node !== null ; current_node = current_node.previousSibling){
            current_node.classList.remove('shiftLeft');
        }

        // Shift right side
        for (current_node = elem.nextSibling ; current_node !== null ; current_node = current_node.nextSibling){
            current_node.classList.remove('shiftRight');
        }
    });
}

