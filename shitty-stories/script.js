$(document).ready(() => {

    const storyElem = $("#story");
    const startupScreen = $(".startup-screen")
    const startupScreenElems = $(".startup-screen *")
    const createBtn = $(".create-btn");
    const createScreen = $(".create-screen");
    const createScreenElems = $(".create-screen *");
    const createBackBtn = $(".create-screen .back");
    const howtoBtn = $(".howto-btn");
    const howtoScreen = $(".howto-screen");
    const howtoScreenElems = $(".howto-screen *");
    const howtoBackBtn = $(".howto-screen .back");
    const step1 = $(".step1");
    const step1Next = $(".step1-next");
    const step2 = $(".step2");
    const wordSelect = $(".word-select");

    let story;

    step1Next.click(() => {
        story = storyElem.val();
        let storyFixed = story.replace(new RegExp("\n", "g"), " ");
        let words = storyFixed.split(" ");
        step1.css("display", "none");
        step2.css("display", "flex");

        for (let index = 0; index < words.length; index++) {
            const element = $(`<div class="word">${words[index]}</div>`);
            element.click(() => {
                if (element.css("opacity") == "0.5") {
                    element.css("opacity", "1");
                } else {
                    element.css("opacity", "0.5");
                }
            })
            wordSelect.append(element)
            
        }
    });

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