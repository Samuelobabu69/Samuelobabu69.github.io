$(document).ready(() => {

    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }

    const storyElem = $("#story");
    const startupScreen = $(".startup-screen")
    const startupScreenElems = $(".startup-screen *")
    const createBtn = $(".create-btn");
    const createScreen = $(".create-screen");
    const createScreenElems = $(".create-screen *");
    const createFromScratchBtn = $(".create-from-scratch-btn");
    const createBackBtn = $(".create-screen .back");
    const createStep1Screen = $(".create-step1-screen");
    const createStep1ScreenElems = $(".create-step1-screen *");
    const createStep1Title = $(".story-title");
    const createStep1Next = $(".create-step1-next");
    const createCancelBtn = $(".create-cancel-btn")
    const createStep2Screen = $(".create-step2-screen");
    const createStep2ScreenElems = $(".create-step2-screen *");
    const createStep2NextBtn = $(".create-step2-next");
    const createStep2BackBtn = $(".create-step2-back-btn")
    const createStep3Screen = $(".create-step3-screen");
    const createStep3ScreenElems = $(".create-step3-screen *");
    const createStep3FinishBtn = $(".create-step3-finish-btn");
    const createStep3BackBtn = $(".create-step3-back-btn");
    const wordDescriptor = $(".word-descriptor");
    const howtoBtn = $(".howto-btn");
    const howtoScreen = $(".howto-screen");
    const howtoScreenElems = $(".howto-screen *");
    const howtoBackBtn = $(".howto-screen .back");
    const wordSelect = $(".word-select");

    let createCancelBtnState = 0;
    let selected = [];
    let story, words;

    createStep1Next.click(() => {
        story = storyElem.val();
        let storyFixed = story.replace(new RegExp("\n", "g"), " ");
        words = storyFixed.split(" ");
        
        wordSelect.empty()

        for (let index = 0; index < words.length; index++) {

            const element = $(`<div class="word" data-number="${index}">${words[index]}</div>`);
            element.click(() => {
                if (element.css("opacity") == "0.3") {
                    element.css("opacity", "1");
                } else {
                    element.css("opacity", "0.3");
                }
            })
            wordSelect.append(element)

        }

        createStep1Screen.css("opacity", "0");
        createStep1ScreenElems.css("margin", "25px")
        setTimeout(() => {
            createStep1Screen.css("display", "none");
            createStep2Screen.css("display", "flex");
            setTimeout(() => {
                createStep2Screen.css("opacity", "1");
                createStep2ScreenElems.css("margin", "5px");
            }, 20);
        }, 500);

    });

    createStep1Title.on("input", () => {
        if (createStep1Title.val()) {
            $(".create-step1-screen h1").text("Step 1: Write your shitty " + createStep1Title.val())
        } else {
            $(".create-step1-screen h1").text("Step 1: Write your shitty template")
        }
    });

    createCancelBtn.click(() => {
        if (createCancelBtnState === 0) {

            createCancelBtnState = 1;
            createCancelBtn.text("Cancel?")
            createCancelBtn.css({
                "color": "black",
                "background-color": "white",
            });

            setTimeout(() => {
                createCancelBtn.css({
                    "color": "white",
                    "background-color": "black",
                    "transition": "color 2s, background-color 2s"
                });
                setTimeout(() => {
                    createCancelBtn.text("Cancel")
                    createCancelBtn.css("transition", "color 0s, background-color 0s")
                    createCancelBtnState = 0;
                }, 2000);
            }, 10);

        } else {

            createStep1Screen.css("opacity", "0");
            createStep1ScreenElems.css("margin", "25px")
            setTimeout(() => {
                createStep1Screen.css("display", "none");
                createScreen.css("display", "flex");
                setTimeout(() => {
                    createScreen.css("opacity", "1");
                    createScreenElems.css("margin", "5px");
                }, 20);
            }, 500);
        }
    })

    createBtn.click(() => {

        startupScreen.css("opacity", "0");
        startupScreenElems.css("margin", "25px")
        setTimeout(() => {
            startupScreen.css("display", "none");
            createScreen.css("display", "flex");
            setTimeout(() => {
                createScreen.css("opacity", "1");
                createScreenElems.css("margin", "5px");
            }, 20);
        }, 500);

    });

    createBackBtn.click(() => {

        createScreen.css("opacity", "0");
        createScreenElems.css("margin", "25px")
        setTimeout(() => {
            createScreen.css("display", "none");
            startupScreen.css("display", "flex");
            setTimeout(() => {
                startupScreen.css("opacity", "1");
                startupScreenElems.css("margin", "5px");
            }, 20);
        }, 500);

    });

    createFromScratchBtn.click(() => {

        storyElem.val("")

        createScreen.css("opacity", "0");
        createScreenElems.css("margin", "25px")
        setTimeout(() => {
            createScreen.css("display", "none");
            createStep1Screen.css("display", "flex");
            setTimeout(() => {
                createStep1Screen.css("opacity", "1");
                createStep1ScreenElems.css("margin", "5px");
            }, 20);
        }, 500);

    });

    createStep2BackBtn.click(() => {

        createStep2Screen.css("opacity", "0");
        createStep2ScreenElems.css("margin", "25px")
        setTimeout(() => {
            createStep2Screen.css("display", "none");
            createStep1Screen.css("display", "flex");
            setTimeout(() => {
                createStep1Screen.css("opacity", "1");
                createStep1ScreenElems.css("margin", "5px");
            }, 20);
        }, 500);

    });

    createStep2NextBtn.click(() => {

        selected = [];

        for (let index = 0; index < wordSelect.children().length; index++) {
            const word = wordSelect.children().eq(index);
            if (word.css("opacity") == "0.3") {
                selected.push(Number(word.attr("data-number")))
            }
        }

        wordDescriptor.empty()

        for (let index = 0; index < words.length; index++) {

            let input;

            if (selected.indexOf(index) !== -1) {
                input = $(`<input type="text" class="word" placeholder="${words[index]}" data-number="${index}">`);
                
                input.focus(() => {

                    inputFocused = true;

                    setTimeout(() => {
                        let colorPicker = $(`<input type="color" value="#ffffff">`)
                        let colorPickerFocused = false;
                        let inputFocused = false;

                        colorPicker.focus(() => {
                            colorPickerFocused = true;
                        })

                        colorPicker.blur(() => {
                            colorPickerFocused = false;

                            setTimeout(() => {
                                if (!inputFocused) {
                                    colorPicker.remove()
                                }
                            }, 50);

                        })

                        colorPicker.on("input", () => {
                            input.css({
                                "color": colorPicker.val(),
                                "border-bottom": `solid ${colorPicker.val()} 1px`
                            })
                        })

                        input.blur(() => {
                            inputFocused = false
        
                            setTimeout(() => {
                                if (!colorPickerFocused) {
                                    colorPicker.remove()
                                }
                                
                            }, 50);
        
                        })
                        

                        let position = input.offset();
                        let x = position.left;
                        let y = position.top;
                        let width = input.width();
                        let height = input.height();
                        let color = input.css("color");
                        let colorRGB = color.slice(0, color.length-1).slice(4).split(", ");
                        let colorHEX = rgbToHex(Number(colorRGB[0]), Number(colorRGB[1]), Number(colorRGB[2]))
    
    
                        colorPicker.attr("value", colorHEX)
    
                        colorPicker.css({
                            "position": "absolute",
                            "top": y - height*2 + "px",
                            "left": x + width/2 + "px",
                            "transform": "translateX(-50%)"
                        })
                        
                        $("body").append(colorPicker);
                        
                    }, 50);

                })

            } else {
                input = $(`<div class="word">${words[index]}</div>`);
            }

            wordDescriptor.append(input)
           

        }

        createStep2Screen.css("opacity", "0");
        createStep2ScreenElems.css("margin", "25px")
        setTimeout(() => {
            createStep2Screen.css("display", "none");
            createStep3Screen.css("display", "flex");
            setTimeout(() => {
                createStep3Screen.css("opacity", "1");
                createStep3ScreenElems.css("margin", "5px");
            }, 20);
        }, 500);

    });

    createStep3BackBtn.click(() => {

        createStep3Screen.css("opacity", "0");
        createStep3ScreenElems.css("margin", "25px")
        setTimeout(() => {
            createStep3Screen.css("display", "none");
            createStep2Screen.css("display", "flex");
            setTimeout(() => {
                createStep2Screen.css("opacity", "1");
                createStep2ScreenElems.css("margin", "5px");
            }, 20);
        }, 500);

    })

    createStep3FinishBtn.click(() => {

        let templateWords = [];

        for (let index = 0; index < wordDescriptor.children().length; index++) {
            const word = wordDescriptor.children().eq(index);
            if (word.is("input")) {
                let number = Number(word.attr("data-number"));
                let description = word.val();
                let color = word.css("color");

                templateWords.push([number, description, color])
            }
        }

        let template = {
            "title": createStep1Title.val(),
            "story": story,
            "words": templateWords
        }

        console.log(template)
    });

    howtoBtn.click(() => {

        startupScreen.css("opacity", "0");
        startupScreenElems.css("margin", "25px")
        setTimeout(() => {
            startupScreen.css("display", "none");
            howtoScreen.css("display", "flex");
            setTimeout(() => {
                howtoScreen.css("opacity", "1");
                howtoScreenElems.css("margin", "5px");
            }, 20);
        }, 500);

    });

    howtoBackBtn.click(() => {

        howtoScreen.css("opacity", "0");
        howtoScreenElems.css("margin", "25px")
        setTimeout(() => {
            howtoScreen.css("display", "none");
            startupScreen.css("display", "flex");
            setTimeout(() => {
                startupScreen.css("opacity", "1");
                startupScreenElems.css("margin", "5px");
            }, 20);
        }, 500);

    });
});