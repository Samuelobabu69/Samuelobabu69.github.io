$(document).ready(() => {

    let squares = [$(".sq1"), $(".sq2"), $(".sq3"), $(".sq4"), $(".sq5"), $(".sq6"), $(".sq7"), $(".sq8"), $(".sq9"), $(".sq10"), $(".sq11"), $(".sq12")]
    const percentages = [24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2]

    for (let i = 0; i < squares.length; i++) {
        const sq = squares[i];
        
        let startX = Number(sq.css("left").replace("px", ""));
        let startY = Number(sq.css("top").replace("px", ""));

        $(document).mousemove((event) => {
            let mouseX = event.clientX;
            let mouseY = event.clientY;
    
            let offsetX = mouseX - startX;
            let offsetY = mouseY - startY;
    
            let sqX = startX + offsetX / 100 * percentages[i]
            let sqY = startY + offsetY / 100 * percentages[i]
    
            sq.css("left", `${sqX}px`)
            sq.css("top", `${sqY}px`)
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