const squares = document.getElementsByClassName("square");
const restart_btn = document.getElementById("restart-btn");
const title_txt = document.getElementById("title-txt");
let x_turn = true;
let turn_num = 0;
let win_state = false;

title_txt.innerText = "X turn";

function square_click(num) {
    //-- Look at clicked square
    //-- if square is open, then put X | O as the square-txt innerText
    //-- else don't do anything
    //-- if the user won then change title and show restart button
    const h3 = squares[num].firstChild;
    const square_txt = squares[num].firstChild.innerText;

    if (square_txt == "" && !win_state) {
        //console.log("Open space!");
        if (x_turn) {
            //console.log("X is placing");
            h3.innerText = "X";
            title_txt.innerText = "O turn";
        } else {
            //console.log("O is placing");
            h3.innerText = "O";
            title_txt.innerText = "X turn";
        }
        turn_num++;
        x_turn = !x_turn;
        const winner = check_win();
        if (winner == "") {
            if (turn_num >= 9) {
                title_txt.innerText = "It's a tie!";
                restart_btn.style.display = "block";
            }
            return;
        }

        win_state = true;

        restart_btn.style.display = "block";
        title_txt.innerText = `${winner} won!`;

    } else {
        //console.log("Space has a: " + square_txt);
    }
}

function check_win() {
    const xo = (index, x_o) => squares[index].firstChild.innerText == x_o;
    const xo_3 = (i0, i1, i2, x_o) => xo(i0, x_o) && xo(i1, x_o) && xo(i2, x_o);

    const hold_xo = ["X", "O"];

    for (let i = 0; i < hold_xo.length; i++) {
        const x_o = hold_xo[i];
        
        if (xo_3(0, 1, 2, x_o)) return x_o;
        else if (xo_3(3, 4, 5, x_o)) return x_o;
        else if (xo_3(6, 7, 8, x_o)) return x_o;

        else if (xo_3(0, 3, 6, x_o)) return x_o;
        else if (xo_3(1, 4, 7, x_o)) return x_o;
        else if (xo_3(2, 5, 8, x_o)) return x_o;

        else if (xo_3(0, 4, 8, x_o)) return x_o;
        else if (xo_3(2, 4, 6, x_o)) return x_o;
    }
    return "";
}

function restart() {
    for (let i = 0; i < squares.length; i++) {
        const h3 = squares[i].firstChild;
        h3.innerText = "";
    }
    //-- clear all text in board
    //-- reset title text to "X turn"
    //-- finally, hide restart button

    title_txt.innerText = "X turn";
    restart_btn.style.display = "none";
    turn_num = 0;
    x_turn = true;
    win_state = false;
}