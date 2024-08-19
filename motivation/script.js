function getAge () {

    let birth = JSON.parse(localStorage.getItem("birth"))
    let specificDate = new Date(birth["year"], birth["month"], birth["day"], birth["hour"], birth["minute"]);
    let currentDate = new Date();
    let timeDifference = currentDate - specificDate;
    let millisecondsInYear = 1000 * 60 * 60 * 24 * 365.24219;
    let years = timeDifference / millisecondsInYear;

    $(".age").text(years.toFixed(8));

    let percentage = 100 / 75 * years

    $(".percentage").text(`${percentage.toFixed(8)}%`)
    $(".progress").css("width", `${percentage.toFixed(8)}%`)
}

// UR GAY

function verifyBirthInput () {

    let day = $("#day").val().trim();
    let month = $("#month").val().trim();
    let year = $("#year").val().trim();
    let minute = $("#minute").val().trim();
    let hour = $("#hour").val().trim();

    if (minute === "") {
        minute = 0;
    }
    if (hour === "") {
        hour = 0;
    }

    let birth = [day, month, year, minute, hour];

    // from str to int
    for (let i = 0; i < birth.length; i++) {
        
        birth[i] = Number(birth[i])

    }

    const birthDate = new Date(year, month - 1, day, hour, minute);

    // is valid?
    if (isNaN(birthDate)) {
        return "invalid";
    }

    const currentDate = new Date();

    // is not in future?
    if (birthDate > currentDate) {
        return "invalid"; 
    }

    // is the same as input?
    if (
        birthDate.getDate() !== birth[0] ||
        birthDate.getMonth() !== birth[1] - 1 ||
        birthDate.getFullYear() !== birth[2] ||
        birthDate.getMinutes() !== birth[3] ||
        birthDate.getHours() !== birth[4]
    ) {
        return "invalid"; 
    }

    let lsBirth = {
        "day": birth[0],
        "month": birth[1]-1,
        "year": birth[2],
        "minute": birth[3],
        "hour": birth[4]
    };

    lsBirth = JSON.stringify(lsBirth);

    return lsBirth;
    
} 

function saveSetup () {
    let valid = verifyBirthInput()
    if (valid === "invalid") {
        $(".invalid").css("opacity", "1");
    } else {
        localStorage.setItem("birth", valid);
        $(".invalid").css("opacity", "0");
        location.reload()
    }
}

function isLeapYear(year) {
    // Leap years are divisible by 4
    // But not divisible by 100 unless also divisible by 400
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

}


function wait (ms, fn) {
    setTimeout(fn, ms);
}

const save = $("#save");
const changeDate = $("#change-date")
const setup = $(".setup")
const main = $(".main")


//localStorage.removeItem("birth")

if (localStorage.getItem("birth") === null) {
    
    setup.css("display", "flex");
    wait(10, () => {
        setup.css("opacity", "1")
    });

} else {

    setInterval(() => {
        getAge()
    }, 10);
    main.css("display", "flex");
    wait(10, () => {
        main.css("opacity", "1")
    });
}

save.on("click", () => {
    saveSetup(); 
});

changeDate.on("click", () => {
    localStorage.removeItem("birth");
    location.reload()
});

