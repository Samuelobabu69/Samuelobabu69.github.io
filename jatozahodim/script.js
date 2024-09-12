$(document).ready(() => {

    const body = $("body");
    const ball = $(".ball");
    const fullscreenScreen = $(".fullscreen-screen");
    const distance = $(".distance")
    const history = $(".history");

    const friction = 0.3
    
    let ballMoveInterval;
    let touchX, touchY, newX, newY, lastX, lastY, velocity;
    let ballX = ball.offset().left;
    let ballY = ball.offset().top;


    ball.on("touchstart", (event) => {
        let touch = event.originalEvent.touches[0];
        touchX = touch.clientX - ballX;
        touchY = touch.clientY - ballY;
    });

    ball.on("touchmove", (event) => {
        let touch = event.originalEvent.touches[0];

        lastX = ball.offset().left;
        lastY = ball.offset().top;

        newX = touch.clientX - touchX;
        newY = touch.clientY - touchY;

        ball.css({
            "top": newY,
            "left": newX
        })
    });

    ball.on("touchend", () => {
        velocity = Math.sqrt(Math.abs(lastX-newX)**2 + Math.abs(lastY-newY)**2)
        

        ballMoveInterval = setInterval(() => {
            if (velocity > 0) {
                distance.css("color", "white");

                ballX = ball.offset().left;
                ballY = ball.offset().top;

                let top = ball.css("top");

                distance.text(Math.floor(Math.abs(Number(top.slice(0, top.length-2)))));

                ball.css("top", ballY-velocity);

                velocity -= friction;
            } else {
                let currentDistance = $(`<h1>${distance.text()}</h1>`);
                distance.css("color", "lime");
                clearInterval(ballMoveInterval);

                history.append(currentDistance);
            }
            

            
        }, 1);
    });

    fullscreenScreen.on('click', function () {
        if (!document.fullscreenElement) {
            // Request fullscreen on the element
            if (document.body.requestFullscreen) {
                document.body.requestFullscreen();
            } else if (document.body.webkitRequestFullscreen) { /* Safari */
                document.body.webkitRequestFullscreen();
            } else if (document.body.msRequestFullscreen) { /* IE11 */
                document.body.msRequestFullscreen();
            }
        } else {
            // Exit fullscreen mode
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
        }
    });

    $(document).on('fullscreenchange', () => {
        if (document.fullscreenElement) {
            fullscreenScreen.css("display", "none");
        } else {
            fullscreenScreen.css("display", "flex");
        }
    });

    body.on("click", () => {
        clearInterval(ballMoveInterval);
        ball.css({
            "top": "0px",
            "left": "0px"
        })
        ballX = ball.offset().left;
        ballY = ball.offset().top;
    });
});