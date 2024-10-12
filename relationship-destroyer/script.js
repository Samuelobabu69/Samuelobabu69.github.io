$(document).ready(() => {

    function screenSwitch (screenToHide, screenToShow) {
        screenToHide.css("opacity", "0");
        screenToHide.find("*").css("margin", "25px")
        setTimeout(() => {
            screenToHide.css("display", "none");
            screenToShow.css("display", "flex");
            setTimeout(() => {
                screenToShow.css("opacity", "1");
                screenToShow.find("*").css("margin", "5px");
            }, 20);
        }, 500);
    }

    function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateNextQuestion () {
        questionBox.css("transition", "margin-left 0.5s");
        questionBoxCover.css("transition", "top 0.9s cubic-bezier(.66,-0.5,1,1), transform 0.9s ease-out, margin-right 0.5s")
        setTimeout(() => {
            questionBox.css("margin-left", "200%")
            questionDiscard.css("opacity", "0")
            questionBoxCover.css("margin-right", "5px")
            setTimeout(() => {
    
                questionDiscard.css({
                    "opacity": "1",
                    "background-color": "transparent"
                });
                questionAnswer.css({
                    "opacity": "1",
                    "background-color": "transparent"
                });
    
                questionActions.css("display", "none");
                questionAnswer.css("opacity", "1");
                questionDiscard.css("opacity", "1");
                questionAnswer.prop("disabled", false);
                questionDiscard.prop("disabled", false);
                questionBox.css("transition", "unset");
                setTimeout(() => {
                    questionBox.css("margin-left", "5px");
                    questionDiscard.css("transition", "unset");
                    questionAnswer.css("transition", "unset");
                }, 20);
                coverReady = true;
            }, 500);
        }, 20);
    }

    window.addEventListener("touchmove", (event) => {
        event.preventDefault()
    }, {passive: false})

    const rulesScreen = $("#rules-screen");
    const startupScreen = $("#startup-screen");
    const playScreen = $("#play-screen");
    const questionBox = $(".question-box");
    const questionBoxCover = $(".question-box-cover");
    const questionActions = $(".question-actions");
    const questionDiscard = $("#question-discard");
    const questionAnswer = $("#question-answer");
    const questionTextEN = $(".question-text-en");
    const questionTextSK = $(".question-text-sk");
    const wheel = $(".wheel");
    const wheelArrow = $(".wheel-arrow");
    const wheelYes = $(".wheel-yes");
    const wheelNo = $(".wheel-no");
    const wheelShowHim = $(".wheel-show-him");
    const nextQuestionBtn = $(".next-question");

    let questions;
    let arrowReady = true, coverReady = true;

    startupScreen.find(".play-btn").click(() => {
        screenSwitch(startupScreen, playScreen);
        $.getJSON("questions.json", (data) => {
            questions = data;
        })
    })

    startupScreen.find(".rules-btn").click(() => {
        screenSwitch(startupScreen, rulesScreen);
    })

    rulesScreen.find(".back-btn").click(() => {
        screenSwitch(rulesScreen, startupScreen);
    })

    questionBoxCover.click(() => {
        if (coverReady) {
            coverReady = false;
            let questionNumber = getRandomInt(0, questions.length-1)
            questionTextEN.text(questions[questionNumber][0])
            questionTextSK.text(questions[questionNumber][1])
            questionBoxCover.css({
                "top": "110%",
                "transform": "rotate(5deg)"
            })
            setTimeout(() => {
                questionActions.css("display", "flex");
            }, 700);
            setTimeout(() => {
                questionBoxCover.css({
                    "transition": "unset",
                    "top": "10%",
                    "margin-right": "200%",
                    "transform": "rotate(0deg)"
                })
            }, 900);
        }
    })

    questionDiscard.click(() => {
        questionAnswer.prop("disabled", true);
        questionDiscard.prop("disabled", true);
        questionAnswer.css("opacity", "0");
        questionDiscard.css({
            "background-color": "red",
            "transition": "opacity 0.5s"
        });
        questionBox.css("transition", "margin-left 0.5s");
        questionBoxCover.css("transition", "top 0.9s cubic-bezier(.66,-0.5,1,1), transform 0.9s ease-out, margin-right 0.5s")
        setTimeout(() => {
            generateNextQuestion();
        }, 500);
        

    });

    questionAnswer.click(() => {
        arrowReady = true;
        wheel.find("*").css("margin", "0")
        wheel.css("display", "flex");
        questionAnswer.prop("disabled", true);
        questionDiscard.prop("disabled", true);
        questionDiscard.css("opacity", "0");
        questionAnswer.css({
            "background-color": "limegreen",
            "transition": "opacity 0.5s"
        });
        setTimeout(() => {
            questionAnswer.css("opacity", "0")
            wheel.css("opacity", "1")
        }, 500);
        setTimeout(() => {
            questionDiscard.css({
                "opacity": "1",
                "background-color": "transparent"
            });

            questionActions.css("display", "none");
            questionAnswer.css("opacity", "1");
            questionAnswer.prop("disabled", false);
            questionDiscard.prop("disabled", false);
            setTimeout(() => {
                questionDiscard.css("transition", "unset");
            }, 20);
        }, 1000);
    });

    wheelArrow.click(() => {
        if (arrowReady) {
            arrowReady = false;
            let rotateDegrees = 3600;
            while (rotateDegrees == 3600 || rotateDegrees == 3780 || rotateDegrees == 3960) {
                rotateDegrees = getRandomInt(3600, 3960);
            }
            let finalDegrees = rotateDegrees % 360;

            wheelArrow.css("transform", `rotate(${rotateDegrees}deg)`);
            wheelShowHim.css("opacity", "0")
            setTimeout(() => {
                if (finalDegrees < 180) {
                    wheelYes.css("color", "limegreen")
                    wheelNo.css("opacity", "0.2")
                    nextQuestionBtn.css("display", "inline-block")

                    setTimeout(() => {

                        wheel.css("opacity", "0");
                        nextQuestionBtn.css("opacity", "1")
                        setTimeout(() => {
                            wheel.css("display", "none")
                            
                        }, 500);
            
                    }, 500);

                } else {
                    wheelNo.css("color", "red")
                    wheelYes.css("opacity", "0.2")
                    
                    setTimeout(() => {
                        generateNextQuestion()

                        wheel.css("opacity", "0");
                        setTimeout(() => {
                            wheel.css("display", "none")
                        }, 500);
            
                    }, 500);
                }

                setTimeout(() => {
                    wheelShowHim.css("opacity", "1")
                    wheelYes.css({
                        "color": "white",
                        "opacity": "1"
                    });
                    wheelNo.css({
                        "color": "white",
                        "opacity": "1"
                    });
                    wheelArrow.css("transition", "none");
                    setTimeout(() => {
                        wheelArrow.css({
                            "transform": "rotate(0deg)",
                            "transition": "transform 3s ease-in-out"
                        })
                    }, 20);
                }, 1000);
            }, 3000);
        }
    })

    nextQuestionBtn.click(() => {
        nextQuestionBtn.css("opacity", "0");
        generateNextQuestion();
        setTimeout(() => {
            nextQuestionBtn.css("display", "none")
        }, 500);
    })

    
});

