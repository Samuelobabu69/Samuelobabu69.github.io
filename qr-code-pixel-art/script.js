$(document).ready(() => {

    function squareClick (square) {
        if (square.css("background-color") == squareWhiteHover) {
            slideColor = "black";
            square.css("background-color", squareBlackHover);
        }
        else if (square.css("background-color") == squareBlackHover) {
            slideColor = "white";
            square.css("background-color", squareWhiteHover);
        }
    }

    function squareMove (square) {
        if (slideColor == "black" && square.css("background-color") == squareWhiteHover) {
            square.css("background-color", squareBlackHover);
        }
        else if (slideColor == "white" && square.css("background-color") == squareBlackHover) {
            square.css("background-color", squareWhiteHover);
        }
    }

    let qrsize = 21;
    let slideColor;
    const squareBlackHover = "rgb(50, 50, 50)";
    const squareWhiteHover = "rgb(206, 206, 206)";

    const qr = $(".qr");
    const squarehtml = `<div class="square" style="background-color: white; width: calc(100%/${qrsize}); height: calc(100%/${qrsize});"></div>`;

    let precoloredSquares = [
        1, 2, 3, 4, 5, 6, 7, qrsize-6, qrsize-5, qrsize-4, qrsize-3, qrsize-2, qrsize-1, qrsize,
        qrsize+1, qrsize+7, qrsize*2-6, qrsize*2,
        qrsize*2+1, qrsize*2+3, qrsize*2+4, qrsize*2+5, qrsize*2+7, qrsize*3-6, qrsize*3-4, qrsize*3-3, qrsize*3-2, qrsize*3,
        qrsize*3+1, qrsize*3+3, qrsize*3+4, qrsize*3+5, qrsize*3+7, qrsize*4-6, qrsize*4-4, qrsize*4-3, qrsize*4-2, qrsize*4,
        qrsize*4+1, qrsize*4+3, qrsize*4+4, qrsize*4+5, qrsize*4+7, qrsize*5-6, qrsize*5-4, qrsize*5-3, qrsize*5-2, qrsize*5,
        qrsize*5+1, qrsize*5+7, qrsize*6-6, qrsize*6,
        qrsize*6+1, qrsize*6+2, qrsize*6+3, qrsize*6+4, qrsize*6+5, qrsize*6+6, qrsize*6+7, qrsize*7-6, qrsize*7-5, qrsize*7-4, qrsize*7-3, qrsize*7-2, qrsize*7-1, qrsize*7,
        
        qrsize*(qrsize-7)+1, qrsize*(qrsize-7)+2, qrsize*(qrsize-7)+3, qrsize*(qrsize-7)+4, qrsize*(qrsize-7)+5, qrsize*(qrsize-7)+6, qrsize*(qrsize-7)+7, 
        qrsize*(qrsize-6)+1, qrsize*(qrsize-6)+7, 
        qrsize*(qrsize-5)+1, qrsize*(qrsize-5)+3, qrsize*(qrsize-5)+4, qrsize*(qrsize-5)+5, qrsize*(qrsize-5)+7, 
        qrsize*(qrsize-4)+1, qrsize*(qrsize-4)+3, qrsize*(qrsize-4)+4, qrsize*(qrsize-4)+5, qrsize*(qrsize-4)+7, 
        qrsize*(qrsize-3)+1, qrsize*(qrsize-3)+3, qrsize*(qrsize-3)+4, qrsize*(qrsize-3)+5, qrsize*(qrsize-3)+7, 
        qrsize*(qrsize-2)+1, qrsize*(qrsize-2)+7, 
        qrsize*(qrsize-1)+1, qrsize*(qrsize-1)+2, qrsize*(qrsize-1)+3, qrsize*(qrsize-1)+4, qrsize*(qrsize-1)+5, qrsize*(qrsize-1)+6, qrsize*(qrsize-1)+7, 
    ];
    
    let save = [];

    for (let index = 0; index < qrsize * qrsize; index++) {
        const square = $(squarehtml);

        if (precoloredSquares.includes(index+1)) {
            square.css("background-color", "black");
        }

        square.mousedown((event) => {
            event.preventDefault();
            squareClick(square);
        });

        square.on("touchstart", (event) => {
            squareClick(square);
        })

        square.mousemove(() => {
            squareMove(square);
        });



        $("body").mouseup(() => {
            slideColor = undefined;
        });

        $("body").on("touchend", () => {
            slideColor = undefined;
        });

        square.hover(() => {
            if (square.css("background-color") == "rgb(255, 255, 255)") {
                square.css("background-color", squareWhiteHover);
            } else if (square.css("background-color") == "rgb(0, 0, 0)") {
                square.css("background-color", squareBlackHover);
            }
            
        }, () => {
            if (square.css("background-color") == squareWhiteHover) {
                square.css("background-color", "rgb(255, 255, 255)");
            } else if (square.css("background-color") == squareBlackHover) {
                square.css("background-color", "rgb(0, 0, 0)");
            }
        })

        qr.append(square);
    }
});