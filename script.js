$(document).ready(() => {

    async function wait (ms, fn) {
        setTimeout(fn, ms);
    }

    function typeWriterWrite (whatToWrite, whereToWrite, timeBetweenChars, currentCharIndex=0, writtenSoFar="") {
            
        if (currentCharIndex < whatToWrite.length) {
            let currentChar = whatToWrite.charAt(currentCharIndex);
            writtenSoFar = writtenSoFar + currentChar;
            whereToWrite.text(writtenSoFar);
            currentCharIndex++;
            setTimeout(() => {
                typeWriterWrite(whatToWrite, whereToWrite, timeBetweenChars, currentCharIndex, writtenSoFar);
            }, timeBetweenChars);
        }
    }
    
    function typeWriterRemove (whatToRemove, timeBetweenChars) {
    
        if (whatToRemove.text().length !== 0) {
            whatToRemove.text(whatToRemove.text().slice(0, whatToRemove.text().length-1));
            setTimeout(() => {
                typeWriterRemove(whatToRemove, timeBetweenChars);
            }, timeBetweenChars);
        }
    }
    
    const welcome = $(".welcome");
    typeWriterWrite("Bored?", welcome, 70)
    

});

