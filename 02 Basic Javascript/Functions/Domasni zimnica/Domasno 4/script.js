//Domasno 4/script.js

let money = Math.floor(Math.random()*100000);



//////////////////// PROMPT ////////////////////////////////////////////////
let withdrawAmount = parseInt(prompt(`ACCOUNT BALANCE: ${money} MKD.

Please enter the money you wish to withdraw from your account.`));
////////////////////////////////////////////////////////////////////////////



if (withdrawAmount >= 0 && withdrawAmount <= money){
    console.log(`
    Transaction succsessful, you have withdrawn ${withdrawAmount} MKD from your account.
    
    ACCOUNT BALANCE: ${money - withdrawAmount} MKD`);

}else if (withdrawAmount >= 0 && withdrawAmount >= money){
    console.log(`
    Transaction denied, you have requested withdrawal of ${withdrawAmount} MKD from your account.
    
    ACCOUNT BALANCE: ${money} MKD`);

}else if(isNaN(withdrawAmount) === true || withdrawAmount < 0){
    console.log("Please enter valid number.");
}


