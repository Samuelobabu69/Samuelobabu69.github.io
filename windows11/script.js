(() => {
    
    const lockScreen = document.getElementsByClassName("lock-screen")[0]
    const startMenu = document.getElementsByClassName("start-menu")[0];
    const startButton = document.getElementsByClassName("start-button")[0];
    const startButtonImage = document.getElementsByClassName("start-button-image")[0];
    const taskbarTime = document.getElementsByClassName("taskbar-time")[0];
    const taskbarDate = document.getElementsByClassName("taskbar-date")[0];
    const lockScreenTime = document.getElementsByClassName("lock-screen-time")[0];
    const lockScreenDate = document.getElementsByClassName("lock-screen-date")[0];
    const lockScreenTimeDate = document.getElementsByClassName("lock-screen-time-date")[0];
    const logInScreen = document.getElementsByClassName("log-in-screen")[0];
    const logInElements = document.getElementsByClassName("log-in-elements")[0];
    const logInPin = document.getElementsByClassName("log-in-pin")[0];
    const forgotPin = document.getElementsByClassName("forgot-pin")[0];
    const errorNoPin = document.getElementsByClassName("error-no-pin")[0];
    const errorIncorrectPin = document.getElementsByClassName("error-incorrect-pin")[0];
    const errorButtonOk = document.getElementsByClassName("error-button-ok")[0];
    const welcome = document.getElementsByClassName("welcome")[0];
    const settingUpScreen = document.getElementsByClassName("setting-up-screen")[0];
    const settingUpCircle1 = document.getElementsByClassName("setting-up-circle-1")[0];
    const settingUpCircle2 = document.getElementsByClassName("setting-up-circle-2")[0];
    const settingUpCircle3 = document.getElementsByClassName("setting-up-circle-3")[0];
    const settingUpPhrase1 = document.getElementsByClassName("setting-up-phrase-1")[0];
    const settingUpPhrase2 = document.getElementsByClassName("setting-up-phrase-2")[0];
    const startupSound = document.getElementsByClassName("startup-sound")[0];
    
    function sleep (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function refreshTimeDate () {
        while (true) {
            const currentTime = new Date();

            // zistiť aktuálny čas
            let hours = currentTime.getHours();         // 0-23
            let minutes = currentTime.getMinutes();     // 0-59
            if (minutes === 0) {
                minutes = "00";
            }
            let seconds = currentTime.getSeconds();     // 0-59
            let day_number = currentTime.getDate();     // 1-31
            let day_word = currentTime.getDay() - 1;        // 0-6
            const day_names = ["pondelok", "utorok", "streda", "štvrtok", "piatok", "sobota", "nedeľa"]
            day_word = day_names[day_word]
            let month_number = currentTime.getMonth();     // 0-11
            const month_names = [
                'januára',
                'februára',
                'marca',
                'apríla',
                'mája',
                'júna',
                'júla',
                'augusta',
                'septembra',
                'októbra',
                'novembra',
                'decembra'
            ];
            let month_word = month_names[month_number]
            month_number += 1;
            let year = currentTime.getFullYear();       // 4-digit year

            // zobrazenie času
            lockScreenTime.innerHTML = `${hours}:${minutes}`;
            lockScreenDate.innerHTML = `${day_word} ${day_number}. ${month_word}`;
            taskbarTime.innerHTML = `${hours}:${minutes}`;
            taskbarDate.innerHTML = `${day_number}. ${month_number}. ${year}`
            await sleep(250);
        }
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    // obnovenie času a dátumu
    refreshTimeDate();

    // zamknúť obrazovku na začiatku
    lockScreen.style = "";
    logInScreen.style = "";
    let locked = false;

    // odomknúť pri stlačení akéhokoľvek tlačidla (myš/klávesnica)
    document.addEventListener("click", () => {
        if (locked === true) {
            logInScreen.style = "backdrop-filter: blur(15px);";
            lockScreenTimeDate.style = "opacity: 0; top: -20%;";
            logInElements.style = "opacity: 1;";
            logInPin.focus();
        }
    })
    document.addEventListener("keydown", (event) => {
        if ((locked === true) && ((event.key === "Enter") || (event.key === " "))) {
            logInScreen.style = "backdrop-filter: blur(15px);";
            lockScreenTimeDate.style = "opacity: 0; top: -20%;";
            logInElements.style = "opacity: 1;";
            logInPin.focus();
            setTimeout(() => {logInPin.value = ""}, 1);
        }
    })

    // zobraziť PIN pri stlačení na "Nepamätám si PIN kód"
    forgotPin.addEventListener("click", () => {
        forgotPin.innerHTML = "PIN: 123456";
    })

    // prihlásenie
    logInPin.addEventListener("keydown", (event) => {
        setTimeout(() => {
            if ((event.key === "Enter") || (logInPin.value.length === 6)) {
                if (logInPin.value === "123456") {
                    logInPin.style = "display: none;";
                    forgotPin.style = "display: none;";
                    welcome.style = "display: block;";
                    lockScreen.style = "opacity: 0;";
                    setTimeout(() => {
                        lockScreen.style = "display: none;";
                    }, 300);
                } else {
                    logInPin.style = "display: none;";
                    forgotPin.style = "display: none;";
                    errorButtonOk.style = "display: block;";
                    errorButtonOk.focus();
                    if (logInPin.value.length === 0) {
                        errorNoPin.style = "display: block;";
                    } else {
                        errorIncorrectPin.style = "display: block;";
                    }
                }
            } 
        }, 1)
    })

    // pri stlačení na OK po zlom PIN
    errorButtonOk.addEventListener("click", () => {
        logInPin.value = "";
        logInPin.style = "display: block;";
        forgotPin.style = "display: block;";
        errorNoPin.style = "display: none;";
        errorIncorrectPin.style = "display: none;";
        errorButtonOk.style = "display: none;";
    })

    // zobraziť/skryť start menu
    startMenu.classList.remove("start-menu-show");
    startButton.addEventListener("click", () => {
        startMenu.classList.toggle("start-menu-show");
    })

    // skryť start menu ak sa kliklo niekde inde
    document.addEventListener("click", (event) => {
        if ((event.target != startMenu) && (event.target != startButton) && (event.target != startButtonImage)) {
            startMenu.classList.remove("start-menu-show");
        }
    })

    // náhodné vybratie frázy
    const phrases = [
        "Getting things ready for you.",
        "This might take a few seconds.",
        "Good things coming your way.",
        "Making sure everything is ready to go.",
        "Still working on a few things. Please wait."
    ];
    let phraseNumber = getRandomInt(0, 4);
    settingUpPhrase1.innerHTML = phrases[phraseNumber];
    
    // animácia pri spustení stránky
    setTimeout(() => {
        settingUpPhrase1.style = "opacity: 1;";
        settingUpPhrase2.style = "opacity: 1;";
        settingUpCircle3.style = "width: 300px; height: 300px;";
    }, 1);
    setTimeout(() => {settingUpCircle2.style = "width: 350px; height: 350px;";}, 500);
    setTimeout(() => {settingUpCircle1.style = "width: 500px; height: 500px;";}, 1000);
    setTimeout(() => {settingUpCircle1.style = "width: 0px; height: 0px;";}, 5000);
    setTimeout(() => {settingUpCircle2.style = "width: 0px; height: 0px;";}, 5500);
    setTimeout(() => {settingUpCircle3.style = "width: 0px; height: 0px;";}, 6000);
    setTimeout(() => {
        settingUpPhrase1.style = "opacity: 0;";
        settingUpPhrase2.style = "opacity: 0;";
    }, 6500);
    //setTimeout(() => {startupSound.play()}, 8000);
    setTimeout(() => {
        settingUpScreen.style = "opacity: 0;";
    }, 9000);
    setTimeout(() => {
        locked = true;
        settingUpScreen.style = "display: none;";
    }, 11000);
    
})();