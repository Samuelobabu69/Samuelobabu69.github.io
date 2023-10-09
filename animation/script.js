$(document).ready(() => {

    let squares = [$(".sq1"), $(".sq2"), $(".sq3"), $(".sq4"), $(".sq5"), $(".sq6"), $(".sq7"), $(".sq8"), $(".sq9"), $(".sq10"), $(".sq11"), $(".sq12")]
    const percentages = [24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2]

    for (let i = 0; i < squares.length; i++) {
        const sq = squares[i];
        
        let startX = Number(sq.css("left").replace("px", ""));
        let startY = Number(sq.css("top").replace("px", ""));

        setInterval(() => {
            let color = sq.css("background-color");

            if (color === "rgb(255, 0, 0)") {
                sq.css("background-color", "orange")
            } else if (color === "rgb(255, 165, 0)") {
                sq.css("background-color", "yellow")
            } else if (color === "rgb(255, 255, 0)") {
                sq.css("background-color", "green")
            } else if (color === "rgb(0, 128, 0)") {
                sq.css("background-color", "blue")
            } else if (color === "rgb(0, 0, 255)") {
                sq.css("background-color", "purple")
            } else if (color === "rgb(128, 0, 128)") {
                sq.css("background-color", "red")
            }
        }, 50);

        $(document).mousemove((event) => {
            let mouseX = event.clientX;
            let mouseY = event.clientY;
    
            let offsetX = mouseX - startX;
            let offsetY = mouseY - startY;
    
            let sqX = startX + offsetX / 100 * percentages[i]
            let sqY = startY + offsetY / 100 * percentages[i]
    
            sq.css("left", `${sqX}px`)
            sq.css("top", `${sqY}px`)

            let color = sq.css("background-color");
            console.log(color);
        })

        $(document).on("touchmove", (event) => {
            let mouseX = event.touches[0].clientX;
            let mouseY = event.touches[0].clientY;
    
            let offsetX = mouseX - startX;
            let offsetY = mouseY - startY;
    
            let sqX = startX + offsetX / 100 * percentages[i]
            let sqY = startY + offsetY / 100 * percentages[i]
    
            sq.css("left", `${sqX}px`)
            sq.css("top", `${sqY}px`)
        });
    }
});
