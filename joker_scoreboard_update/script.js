$(document).ready(() => {

    async function init() {
        const update_btn = $("#updateBtn");
        const download_page = $("#downloadPage");
        const how_to_update_page = $("#howToUpdatePage");
        const newest_version = $("#newestVersion");

        let response = await fetch("https://raw.githubusercontent.com/Samuelobabu69/joker-scoreboard/refs/heads/main/version.json")
            .then(data => data.json())

        newest_version.text(response.version);

        update_btn.click(() => {
            pageChange(download_page, how_to_update_page);
        });
    }

    function pageChange(previous, next) {

        // HTML elementy
        const no_press_page = $("#noPressPage");

        // Zobrazenie prekrytia obrazovky, ktorá zabraňuje kliknutiam
        no_press_page.removeClass("d-none");
        next.removeClass("d-none");

        // Skrytie starej a zobrazenie novej stránky
        setTimeout(() => {
            next.removeClass("page-hidden");
            previous.addClass("page-hidden");

            setTimeout(() => {
                previous.addClass("d-none");
                no_press_page.addClass("d-none");
            }, 300);
        }, 50);
    }

    init();

});