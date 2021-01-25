//script.js
console.log(`Vlez na funkcija bilo koj cel broj (int),
Da se ispechati chess table so golemina na strana kolku shto e brojot od vlezniot parametar, 
so toa shto sekoe neparno pole ke bide 1 a sekoe parno 0 \n\n

primer: za vlez na brojot 5 ke se ispecati
                10101
                01010
                10101
                01010
                10101`);













function chess(number) {

    for (let i = 0; i < number; i++) {
        let chessField = "";
        for (let g = i; g < number+i; g++) {
            chessField += g % 2;
        }        
        console.log(chessField);
    }
    console.log(`\n`);
}

chess(5);
chess(10);
chess(15);