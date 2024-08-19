$(document).ready(() => {

    function countSubstrings(mainString, subString) {
        var count = 0;
        var pos = mainString.indexOf(subString);

        while (pos !== -1) {
            count++;
            pos = mainString.indexOf(subString, pos + 1);
        }

        return count;
    }

    function normalizeString(inputString) {
        // Mapping object for Slovak and Czech characters
        const charMap = {
            'Á': 'a', 'Ä': 'a', 'Č': 'c', 'Ď': 'd', 'É': 'e',
            'Ě': 'e', 'Í': 'i', 'Ľ': 'l', 'Ĺ': 'l', 'Ň': 'n',
            'Ó': 'o', 'Ô': 'o', 'Ŕ': 'r', 'Š': 's', 'Ť': 't',
            'Ú': 'u', 'Ů': 'u', 'Ý': 'y', 'Ž': 'z',
            'á': 'a', 'ä': 'a', 'č': 'c', 'ď': 'd', 'é': 'e',
            'ě': 'e', 'í': 'i', 'ľ': 'l', 'ĺ': 'l', 'ň': 'n',
            'ó': 'o', 'ô': 'o', 'ŕ': 'r', 'š': 's', 'ť': 't',
            'ú': 'u', 'ů': 'u', 'ý': 'y', 'ž': 'z'
            // Add more mappings as needed
        };
    
        // Replace accented characters with their normalized lowercase counterparts
        return inputString.replace(/[ÁÄČĎÉĚÍĽĹŇÓÔŔŠŤÚŮÝŽáäčďéěíľĺňóôŕšťúůýž]/g, function(match) {
            return charMap[match];
        });
    }

    if (!localStorage.getItem("character-list")) {
        localStorage.setItem("character-list", "abcdefghijklmnopqrstuvwxyz");
    }

    const characterList = localStorage.getItem("character-list");

    const characters = $("#characters");
    const stats = $(".stats");
    const characterInput = $(".character-input");
    const characterInputSave = $(".character-input-save");
    const characterInputReset = $(".character-input-reset");
    const settingsButton = $(".settings-btn");
    const settingsBox = $(".settings-box")
    const counter = $(".counter");

    characterInput.val(characterList);

    settingsButton.click(() => {
        if (settingsBox.css("top") != "0px") {
            settingsBox.css("top", "0px");
        } else {
            settingsBox.css("top", "-203px");
        }
    });

    characterInputSave.click(() => {
        localStorage.setItem("character-list", characterInput.val().toLowerCase());
        location.reload();
    });

    characterInputReset.click(() => {
        localStorage.removeItem("character-list");
        location.reload();
    });

    characters.on("input", () => {
        if (characters.val().length != 0) {
            for (let index = 0; index < characterList.length; index++) {
                const char = characterList[index];
                const text = normalizeString(characters.val()).toLowerCase();
                const progress = $("[data-letter='" + char + "']")
                const progressPercentage = $("[data-letter='" + char + "'] .progress-p")
                const progressCount = $("[data-letter='" + char + "'] .progress-count")
    
                let textLength = text.length;
                let charCount = countSubstrings(text, char);
                let charPercentage = 100 / textLength * charCount;

                progress.css("height", charPercentage + "%")
                progressPercentage.text(charPercentage.toFixed(2) + "%")
                progressCount.text(charCount)
                if (charCount == 0) {
                    progressCount.text("")
                }
            }
        } else {
            for (let index = 0; index < characterList.length; index++) {
                const char = characterList[index];
                const progress = $("[data-letter='" + char + "']")
                const progressPercentage = $("[data-letter='" + char + "'] .progress-p")
                const progressCount = $("[data-letter='" + char + "'] .progress-count")
    
                progress.css("height", "0%");
                progressPercentage.text("0.00%")
                progressCount.text("")
            }
        }
        counter.text(characters.val().length);
    });

    for (let index = 0; index < characterList.length; index++) {

        const char = characterList[index];

        const stat = $('<div class="stat"><div class="progress-wrapper"><div class="progress" data-letter="' + char + '"><p class="progress-p">0.00%</p><p class="progress-count"></p></div></div><p class="char">' + char + '</p></div>')
        stats.append(stat)
        
    }



});