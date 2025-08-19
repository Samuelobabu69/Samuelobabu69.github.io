$(document).ready(() => {

    async function init() {
        sessionStorage.removeItem("translations-update-website")

        if (!localStorage.getItem("language")) {
            localStorage.setItem("language", "slovak");
        }

        applyTranslations();
        
        const language_input = $("#languageInput")
        const update_btn = $("#updateBtn");
        const newest_version = $("#newestVersion");

        language_input.val(localStorage.getItem("language"));
        language_input.on("change", () => {
            localStorage.setItem("language", language_input.val());
            applyTranslations();
        });

        let response = await fetch(
            "https://raw.githubusercontent.com/Samuelobabu69/joker-scoreboard/refs/heads/main/version.json",
            { cache: 'no-store' })
            .then(data => data.json())

        newest_version.text(response.version);

        update_btn.click(async () => {
            update_btn.text(await getTranslation("downloading"));
            update_btn.prop("disabled", true);
        });
    }

    async function getTranslation(id) {
        if (!sessionStorage.getItem("translations-update-website")) {
            const response = await fetch('assets/translations.json');
            let translations = await response.json();
            sessionStorage.setItem("translations-update-website", JSON.stringify(translations));
        }
        let translations = await JSON.parse(sessionStorage.getItem("translations-update-website"));
        translations = translations[localStorage.getItem("language")]

        return translations[id]
    }

    async function applyTranslations() {
        if (!sessionStorage.getItem("translations-update-website")) {
            const response = await fetch('assets/translations.json');
            let translations = await response.json();
            sessionStorage.setItem("translations-update-website", JSON.stringify(translations));
        }
        let translations = await JSON.parse(sessionStorage.getItem("translations-update-website"));
        translations = translations[localStorage.getItem("language")];
        let translation_ids = Object.keys(translations);

        for (let index = 0; index < translation_ids.length; index++) {
            $(`[data-translate-id="${translation_ids[index]}"]`).text(translations[translation_ids[index]]);
            
        } 
    }

    init();

});