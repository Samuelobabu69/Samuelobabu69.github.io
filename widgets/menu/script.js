
const body = $("body");
const menuBtn = $('<button class="menu-btn"><img src="../assets/menu.png"></button>');
const menuBox = $('<div class="menu-box"><a class="home-btn-wrapper" href="../index.html"><button class="home-btn"><img src="../assets/home.png"></button></a></div>');
const menuItems = $('<div class="menu-items"></div>')
const menuShade = $('<div class="menu-shade"></div>');
let menuOpened = false;
let menuClosing;

$.getJSON("../config.json", (data) => {
    const menuItemsJSON = data["menu-items"]
    for (let path in menuItemsJSON) {
        const menuItem = $(`<a class="menu-item" href="../${path}"><button class="small-font">${menuItemsJSON[path]}</button></a>`)
        menuItems.append(menuItem);
    }
});

menuBtn.click(() => {
    if (!menuOpened) {
        menuOpened = true;
        
        menuBox.css("left", "0px");
        menuBtn.css("filter", "invert(0%)");
        menuShade.css("display", "block");
        setTimeout(() => {
            menuShade.css("opacity", "1");
            if (menuClosing) {
                clearTimeout(menuClosing);
                menuClosing = undefined;
            }
        }, 10);

    } else {
        menuOpened = false;

        if ($(window).width() <= 768) { // Typical breakpoint for mobile devices
            
            menuBox.css("left", "-105%");
            menuBtn.css("filter", "invert(100%)");
            menuShade.css("opacity", "0")
            menuClosing = setTimeout(() => {
                menuShade.css("display", "none");
            }, 500);

        } else {
            
            menuBox.css("left", "-503px");
            menuBtn.css("filter", "invert(100%)");
            menuShade.css("opacity", "0")
            menuClosing = setTimeout(() => {
                menuShade.css("display", "none");
            }, 500);

        }
    }
});

$(document).keydown(function(event) {
    if (event.key === 'Escape' || event.key === 'Esc') { 
        menuBtn.click();
    }
});

menuBox.append(menuItems);
body.append(menuBtn);
body.append(menuBox);
body.append(menuShade);