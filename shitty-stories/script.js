$(document).ready(() => {

    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }

    const storyElem = $("#story");
    const startupScreen = $(".startup-screen");
    const startupScreenElems = $(".startup-screen *");
    const playBtn = $(".play-btn");
    const playScreen = $(".play-screen");
    const playScreenElems = $(".play-screen *");
    const playScreenTemplates = $(".play-screen-templates");
    const playScreenBackBtn = $(".play-screen-back-btn");
    const playScreenShareBtn = $(".play-screen-share-btn");
    const playScreenDeleteBtn = $(".play-screen-delete-btn");
    const playScreenPlayBtn = $(".play-screen-play-btn");
    const playTemplateScreen = $(".play-template-screen");
    const playTemplateScreenElems = $(".play-template-screen *");
    const playTemplateTitle = $(".play-template-title");
    const playTemplateStory = $(".play-template-story");
    const playTemplateCancelBtn = $(".play-template-cancel-btn");
    const playTemplateFinishBtn = $(".play-template-finish-btn");
    const createBtn = $(".create-btn");
    const createScreen = $(".create-screen");
    const createScreenElems = $(".create-screen *");
    const createFromScratchBtn = $(".create-from-scratch-btn");
    const importSharedBtn = $(".import-shared-btn");
    const importScreen = $(".import-screen");
    const importScreenElems = $(".import-screen *");
    const importInput = $(".import-input");
    const importScreenBackBtn = $(".import-screen-back-btn");
    const importScreenImportBtn = $(".import-screen-import-btn");
    const createBackBtn = $(".create-screen .back");
    const createStep1Screen = $(".create-step1-screen");
    const createStep1ScreenElems = $(".create-step1-screen *");
    const createStep1Title = $(".story-title");
    const createStep1Next = $(".create-step1-next");
    const createCancelBtn = $(".create-cancel-btn")
    const createStep2Screen = $(".create-step2-screen");
    const createStep2ScreenElems = $(".create-step2-screen *");
    const createStep2Description = $(".create-step2-screen h1");
    const createStep2NextBtn = $(".create-step2-next");
    const createStep2BackBtn = $(".create-step2-back-btn")
    const createStep3Screen = $(".create-step3-screen");
    const createStep3ScreenElems = $(".create-step3-screen *");
    const createStep3Description = $(".create-step3-screen h1");
    const createStep3FinishBtn = $(".create-step3-finish-btn");
    const createStep3BackBtn = $(".create-step3-back-btn");
    const wordDescriptor = $(".word-descriptor");
    const howtoBtn = $(".howto-btn");
    const howtoScreen = $(".howto-screen");
    const howtoScreenElems = $(".howto-screen *");
    const howtoBackBtn = $(".howto-screen .back");
    const wordSelect = $(".word-select");

    let createCancelBtnState = 0;
    let playTemplateScreenCancelBtnState = 0;
    let playScreenDeleteBtnState = 0;
    let selected = [];
    let story, words, playScreenSelectedTemplate;

    playBtn.click(() => {

        playScreenTemplates.empty()

        if (!localStorage.getItem("templates")) {
            playScreenTemplates.append($(`<p class="no-templates">You have no templates. Import or create one.</p>`))
        } else {
            let templates = JSON.parse(localStorage.getItem("templates"))

            for (let index = 0; index < templates.length; index++) {
                const template = templates[index];
                const templateBtn = $(`<button>${template["title"]}</button>`)

                templateBtn.click(() => {
                    playScreenTemplates.css({
                        "background-color": "black",
                        "color": "white"
                    })
                    templateBtn.css({
                        "background-color": "white",
                        "color": "black"
                    })
                    playScreenSelectedTemplate = templateBtn.text().toLowerCase()

                    playScreenShareBtn.css("opacity", "1")
                    playScreenDeleteBtn.css("opacity", "1")
                    playScreenPlayBtn.css("opacity", "1")
                })

                playScreenTemplates.append(templateBtn)
                
            }
        }

        playScreenShareBtn.css("opacity", "0.5")
        playScreenDeleteBtn.css("opacity", "0.5")
        playScreenPlayBtn.css("opacity", "0.5")
        playScreenSelectedTemplate = undefined;

        startupScreen.css("opacity", "0");
        startupScreenElems.css("margin", "25px")
        setTimeout(() => {
            startupScreen.css("display", "none");
            playScreen.css("display", "flex");
            setTimeout(() => {
                playScreen.css("opacity", "1");
                playScreenElems.css("margin", "5px");

            }, 20);
        }, 500);
    });

    playScreenBackBtn.click(() => {
        playScreen.css("opacity", "0");
        playScreenElems.css("margin", "25px")
        setTimeout(() => {
            playScreen.css("display", "none");
            startupScreen.css("display", "flex");
            setTimeout(() => {
                startupScreen.css("opacity", "1");
                startupScreenElems.css("margin", "5px");
            }, 20);
        }, 500);
    });

    playScreenShareBtn.click(async () => {

        if (playScreenSelectedTemplate) {

            let templates = await JSON.parse(localStorage.getItem("templates"));

            for (let index = 0; index < templates.length; index++) {
                const template = templates[index];
                if (template["title"].toLowerCase() === playScreenSelectedTemplate.toLowerCase()) {
                    
                    navigator.clipboard.writeText(JSON.stringify(template))
                }
                
            }

            playScreenShareBtn.text("Copied!")
            playScreenShareBtn.css({
                "background-color": "lime",
                "border-color": "lime"
            });

            setTimeout(() => {
                playScreenShareBtn.css({
                    "background-color": "black",
                    "border-color": "white",
                    "transition": "border-color 0.5s, background-color 0.5s, margin 0.5s"
                });
                setTimeout(() => {
                    playScreenShareBtn.text("Share")
                    playScreenShareBtn.css("transition", "border-color 0s, background-color 0s, margin 0.5s")
                }, 500);
            }, 1500);

        }

    });

    playScreenDeleteBtn.click(() => {
        if (playScreenDeleteBtnState === 0 && playScreenSelectedTemplate) {

            playScreenDeleteBtnState = 1;
            playScreenDeleteBtn.text("Delete?")
            playScreenDeleteBtn.css({
                "color": "black",
                "background-color": "white",
            });

            setTimeout(() => {
                playScreenDeleteBtn.css({
                    "color": "white",
                    "background-color": "black",
                    "transition": "color 0.5s, background-color 0.5s, margin 0.5s"
                });
                setTimeout(() => {
                    playScreenDeleteBtn.text("Delete")
                    playScreenDeleteBtn.css("transition", "color 0s, background-color 0s, margin 0.5s")
                    playScreenDeleteBtnState = 0;
                }, 500);
            }, 1500);

        } else {

            let templateName;
            let savedTemplates = JSON.parse(localStorage.getItem("templates"))

            for (let index = 0; index < playScreenTemplates.children().length; index++) {
                const templateElem = playScreenTemplates.children().eq(index);
                if (templateElem.css("background-color") == "rgb(255, 255, 255)") {
                    templateName = templateElem.text().toLowerCase()
                    templateElem.remove()
                    playScreenShareBtn.css("opacity", "0.5")
                    playScreenDeleteBtn.css("opacity", "0.5")
                    playScreenPlayBtn.css("opacity", "0.5")
                    playScreenSelectedTemplate = undefined;
                }
            }

            for (let index = 0; index < savedTemplates.length; index++) {
                const template = savedTemplates[index];
                if (templateName === template["title"].toLowerCase()) {
                    savedTemplates.splice(index)
                }
            }

            localStorage.setItem("templates", JSON.stringify(savedTemplates))

            if (JSON.parse(localStorage.getItem("templates")).length === 0) {
                localStorage.removeItem("templates")
            }
        }
    });

    playScreenPlayBtn.click(async () => {

        if (playScreenSelectedTemplate) {
            
            let templates = await JSON.parse(localStorage.getItem("templates"));

            for (let index = 0; index < templates.length; index++) {
                const template = templates[index];
                if (template["title"].toLowerCase() === playScreenSelectedTemplate.toLowerCase()) {
                    playTemplateTitle.text(template["title"])
                    playTemplateStory.text(template["story"])

                    // let words = template["story"].split(" ");

                    
                }
            }

            playScreen.css("opacity", "0");
                playScreenElems.css("margin", "25px")
                setTimeout(() => {
                    playScreen.css("display", "none");
                    playTemplateScreen.css("display", "flex");
                    setTimeout(() => {
                        playTemplateScreen.css("opacity", "1");
                        playTemplateScreenElems.css("margin", "5px");
                    }, 20);
                }, 500);
        }
    });

    playTemplateCancelBtn.click(() => {
        if (playTemplateScreenCancelBtnState === 0) {

            playTemplateScreenCancelBtnState = 1;
            playTemplateCancelBtn.text("Cancel?")
            playTemplateCancelBtn.css({
                "color": "black",
                "background-color": "white",
            });

            setTimeout(() => {
                playTemplateCancelBtn.css({
                    "color": "white",
                    "background-color": "black",
                    "transition": "color 0.5s, background-color 0.5s, margin 0.5s"
                });
                setTimeout(() => {
                    playTemplateCancelBtn.text("Cancel")
                    playTemplateCancelBtn.css("transition", "color 0s, background-color 0s, margin 0.5s")
                    playTemplateScreenCancelBtnState = 0;
                }, 500);
            }, 1500);

        } else {

            playTemplateScreen.css("opacity", "0");
            playTemplateScreenElems.css("margin", "25px")
            setTimeout(() => {
                playTemplateScreen.css("display", "none");
                playScreen.css("display", "flex");
                setTimeout(() => {
                    playScreen.css("opacity", "1");
                    playScreenElems.css("margin", "5px");
                }, 20);
            }, 500);
        }
    })

    importSharedBtn.click(() => {
        importInput.val("")

        createScreen.css("opacity", "0");
            createScreenElems.css("margin", "25px")
            setTimeout(() => {
                createScreen.css("display", "none");
                importScreen.css("display", "flex");
                setTimeout(() => {
                    importScreen.css("opacity", "1");
                    importScreenElems.css("margin", "5px");
                }, 20);
            }, 500);
    });

    importScreenImportBtn.click(async () => {

        let invalidTemplate = false;
        let importedTemplate;
        try {
            importedTemplate = JSON.parse(importInput.val().trim());
        
        } catch {
            invalidTemplate = true;
        
        }

        if (!invalidTemplate) {

            if (!("title" in importedTemplate) || !("story" in importedTemplate) || !("words" in importedTemplate)) {
                invalidTemplate = true;
            
            }
    
            for (let index = 0; index < importedTemplate["words"].length; index++) {
                const word = importedTemplate["words"][index];
                if ((word[0] === undefined) || (typeof word[0] === "string") || (importedTemplate["story"].split().length > word[0])) {
                    invalidTemplate = true
                
                }
    
                if ((word[1] === undefined) || (typeof word[1] === "number")) {
                    invalidTemplate = true
                
                }
    
                if ((word[2] === undefined) || (typeof word[2] === "number")) {
                    invalidTemplate = true
                
                }
                
            }
        }

        if (invalidTemplate) {
            importScreenImportBtn.css({
                "background-color": "red",
                "border-color": "red"
            })
            importScreenImportBtn.text("Invalid")
            setTimeout(() => {
                importScreenImportBtn.css({
                    "background-color": "black",
                    "border-color": "white"
                })
                importScreenImportBtn.text("Import")
            }, 2000);
        } else {
            
            let templates = [];
            if (localStorage.getItem("templates")) {
                templates = await JSON.parse(localStorage.getItem("templates"));
            }

            templates.push(importedTemplate);
            localStorage.setItem("templates", JSON.stringify(templates));

            importInput.val("")

            importScreenImportBtn.css({
                "background-color": "lime",
                "border-color": "lime"
            })
            importScreenImportBtn.text("Imported!")
            setTimeout(() => {
                importScreenImportBtn.css({
                    "background-color": "black",
                    "border-color": "white"
                })
                importScreenImportBtn.text("Import")
            }, 2000);
        }




    });

    importScreenBackBtn.click(() => {
        importScreen.css("opacity", "0");
            importScreenElems.css("margin", "25px")
            setTimeout(() => {
                importScreen.css("display", "none");
                createScreen.css("display", "flex");
                setTimeout(() => {
                    createScreen.css("opacity", "1");
                    createScreenElems.css("margin", "5px");
                }, 20);
            }, 500);
    });


    createStep1Next.click(() => {
        let timeout1, timeout2, timeout3, timeout4;
        let storyTitleExists = false;

        if (localStorage.getItem("templates")) {
            let templates = JSON.parse(localStorage.getItem("templates"))

            for (let index = 0; index < templates.length; index++) {
                const template = templates[index];
                if (createStep1Title.val().trim().toLowerCase() === template["title"].toLowerCase()) {
                    storyTitleExists = true;
                }
                
            }
        } 

        if (storyElem.val().trim() && createStep1Title.val().trim() && !storyTitleExists) {

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
            
        } else {
            if (!storyElem.val().trim()) {
                
                clearTimeout(timeout1)
                clearTimeout(timeout2) 

                storyElem.css("border-color", "red");

                timeout1 = setTimeout(() => {
                    storyElem.css({
                        "border-color": "white",
                        "transition": "border-color 1s, margin 0.5s"
                    });
                    timeout2 = setTimeout(() => {
                        storyElem.css("transition", "border-color 0s, margin 0.5s")
                    }, 1000);
                }, 10);
            }
            if (!createStep1Title.val().trim() || storyTitleExists) {
                
                clearTimeout(timeout3)
                clearTimeout(timeout4) 
                
                createStep1Title.css("border-color", "red");

                timeout3 = setTimeout(() => {
                    createStep1Title.css({
                        "border-color": "white",
                        "transition": "border-color 1s, margin 0.5s"
                    });
                    timeout4 = setTimeout(() => {
                        createStep1Title.css("transition", "border-color 0s, margin 0.5s")
                    }, 1000);
                }, 10);
            }
        }

    });

    createStep1Title.on("input", () => {
        if (createStep1Title.val().trim()) {
            $(".create-step1-screen h1").text("Step 1: Write your shitty " + createStep1Title.val().trim())
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
                    "transition": "color 0.5s, background-color 0.5s, margin 0.5s"
                });
                setTimeout(() => {
                    createCancelBtn.text("Cancel")
                    createCancelBtn.css("transition", "color 0s, background-color 0s, margin 0.5s")
                    createCancelBtnState = 0;
                }, 500);
            }, 1500);

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
        createStep1Title.val("")
        $(".create-step1-screen h1").text("Step 1: Write your shitty template");

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

        let timeout1, timeout2;

        selected = [];

        for (let index = 0; index < wordSelect.children().length; index++) {
            const word = wordSelect.children().eq(index);
            if (word.css("opacity") == "0.3") {
                selected.push(Number(word.attr("data-number")))
            }
        }

        if (selected.length !== 0) {

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
            }

        } else {

            clearTimeout(timeout1)
            clearTimeout(timeout2) 

            createStep2Description.css("color", "red");

            timeout1 = setTimeout(() => {
                createStep2Description.css({
                    "color": "white",
                    "transition": "color 1s, margin 0.5s"
                });
                timeout2 = setTimeout(() => {
                    createStep2Description.css("transition", "color 0s, margin 0.5s")
                }, 1000);
            }, 10);

        }

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

    createStep3FinishBtn.click(async () => {

        let timeout1, timeout2;

        let templateWords = [];
        let allDescriptionsInserted = true;

        for (let index = 0; index < wordDescriptor.children().length; index++) {
            const word = wordDescriptor.children().eq(index);
            if (word.is("input")) {
                let number = Number(word.attr("data-number"));
                let description = word.val().trim();
                let color = word.css("color");

                if (!description) {
                    allDescriptionsInserted = false
                }

                templateWords.push([number, description, color])
            }
        }

        let template = {
            "title": createStep1Title.val().trim(),
            "story": story,
            "words": templateWords
        }

        if (allDescriptionsInserted) {

            let templates = [];

            if (localStorage.getItem("templates")) {
                templates = await JSON.parse(localStorage.getItem("templates"));
            }
            templates.push(template)
            localStorage.setItem("templates", JSON.stringify(templates));

            createStep3FinishBtn.css({
                "color": "black",
                "background-color": "lime",
                "border-color": "lime"
            })
            createStep3FinishBtn.text("Finished!")
            setTimeout(() => {
                createStep3Screen.css("opacity", "0");
                createStep3ScreenElems.css("margin", "25px")
                setTimeout(() => {
                    createStep3Screen.css("display", "none");
                    startupScreen.css("display", "flex");
                    setTimeout(() => {
                        startupScreen.css("opacity", "1");
                        startupScreenElems.css("margin", "5px");
                        createStep3FinishBtn.css({
                            "color": "white",
                            "background-color": "black",
                            "border-color": "white"
                        })
                        createStep3FinishBtn.text("Finish")
                    }, 20);
                }, 500);
            }, 400);

        } else {

            clearTimeout(timeout1)
            clearTimeout(timeout2) 

            createStep3Description.css("color", "red");

            timeout1 = setTimeout(() => {
                createStep3Description.css({
                    "color": "white",
                    "transition": "color 1s, margin 0.5s"
                });
                timeout2 = setTimeout(() => {
                    createStep3Description.css("transition", "color 0s, margin 0.5s")
                }, 1000);
            }, 10);
        }

        
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

