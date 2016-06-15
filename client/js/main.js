var x_score = 0;
var o_score = 0;
var x_turn = true;
var game_x_start = true;
// Resize function for window.onload and window.change
resize = function() {
    var square = $('.square').width();
    $('.square').css({'height': square+'px'});
}

// check a spot in the grid to determine whats there.
check_spot = function(i,j) {
    if ($("#"+i+"-"+j).hasClass("x"))
        return 1;
    if ($("#"+i+"-"+j).hasClass("o"))
        return -1;
    return 0;
}

// changes the score 1 for increase in x's score, -1 for increase in o's score, 2 for total reset
change_score = function(winner) {
    if (winner == 1)
        x_score++;
    if (winner == -1)
        o_score++;
    if (winner == 2){
        x_score = 0;
        o_score = 0;
    }
    $("#score").text(x_score+":"+o_score);
}

// Resets the grid for a new game
reset_grid = function() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if ($("#"+i+"-"+j).hasClass("x")){
                $("#"+i+"-"+j).addClass("square");
                $("#"+i+"-"+j).removeClass("x")
            }
            if ($("#"+i+"-"+j).hasClass("o")){
                $("#"+i+"-"+j).addClass("square");
                $("#"+i+"-"+j).removeClass("o")
            }
            if ($("#"+i+"-"+j).hasClass("frozen")){
                $("#"+i+"-"+j).addClass("square");
                $("#"+i+"-"+j).removeClass("frozen")
            }
            $("#"+i+"-"+j).css("background-image", "none");
        }
    }
    game_x_start = !game_x_start;
    x_turn = game_x_start;
    if (x_turn)
        alert("X goes first");
    else
        alert("O goes first");
}

// Freezes the grid so players can not modify it
freeze_grid = function() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if ($("#"+i+"-"+j).hasClass("square")){
                $("#"+i+"-"+j).addClass("frozen");
                $("#"+i+"-"+j).removeClass("square")
            }
        }
    }
}

// announces the winner or tie and freezes the grid.
announce_winner = function(winner) {
    freeze_grid();
    if (winner == 1){
        alert("X wins!!!");
    }
    else if (winner == -1){
        alert("O wins!!!");
    }
    else
        alert("No Winner. :,(");
    change_score(winner)
}

// checks for a win/tie
check_win = function() {

    // if there is a win then all remaining spots will change to void spots and the winner will be displayed!
    // there are only 8 possible ways to win.
    // array of ways to win. Each sub array contains the coordinates of the spots needed to check for that particular win. 
    ways_to_win = [[[0,0],[1,1],[2,2]],
                    [[2,0],[1,1],[0,2]],
                    [[1,0],[1,1],[1,2]],
                    [[0,1],[1,1],[2,1]],
                    [[0,0],[0,1],[0,2]],
                    [[0,0],[1,0],[2,0]],
                    [[2,0],[2,1],[2,2]],
                    [[0,2],[1,2],[2,2]]];
    // variable to check if there is a tie
    grid_lock = true;
    for (var i = 0; i < ways_to_win.length; i++) {
        var item = ways_to_win[i];
        var first = check_spot(item[0][0],item[0][1]);
        var second = check_spot(item[1][0], item[1][1]); 
        var third = check_spot(item[2][0], item[2][1])
        if (first != 0 && first == second && second == third) {
            console.log("winner")
            announce_winner(first);
            return;
        }
        if (first == 0 || second == 0 || third == 0)
            grid_lock = false;
    }
    if (grid_lock)
        announce_winner(0);
}
window.onload = function() {
    resize();
    alert("Welcome to Tic-Tac-Toe. go ahead and start playing. X will go first this time.");
    // what happens when a square is clicked
    $('.square').on("click", function() {
        if (x_turn){
            $(this).css("background-image", "url(X.png)");
            $(this).addClass("x");
        }
        else {
            $(this).css("background-image", "url(O.png)");
            $(this).addClass("o");
        }
        x_turn = !x_turn;
        $(this).removeClass("square");

        check_win();

    });

    $('#new_game').on("click", function() {
        reset_grid();
    });

    $('#reset_all').on("click", function() {
        change_score(2);
    });
}
window.onchange = function() {
    resize()
}