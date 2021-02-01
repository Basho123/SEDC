//script.js // exercise 3

$(document).ready(function () {

    let userBalance = 25000;

    let depositBut = $(`#deposit`);
    let withdrawBut = $(`#withdrawal`);
    let balanceBut = $(`#getBalance`);
    let exitBut = $(`#exit`);
 
    let mainWindow = $('#mainWindow')[0];

    let printing = $(`#printing`)[0];
    
    console.log(printing.innerHTML);

    depositBut.click(function () {
        let addMoney = parseInt(prompt(`Enter how much money do you want to deposit`));
        userBalance += addMoney;
        printing.innerHTML = `<h2>you had ${userBalance-addMoney} denars on your account, now you have ${userBalance} denars on your account.</h2>`
        
    })

    withdrawBut.click(function () {
        let getMoney = parseInt(prompt(`Enter how much money do you want to withdraw`));
        if (userBalance >= getMoney) {
            userBalance -= getMoney;
            printing.innerHTML = `<h2>you had ${userBalance+getMoney} denars on your account, now you have ${userBalance} denars on your account.</h2>`
        }        
        else {
            printing.innerHTML = `<h2>You dont have so much money on your account. Current balance: ${userBalance} denars </h2>`
            alert(`You don't have so much money on your account`)}
    })

    exitBut.click(function(){
        printing.innerHTML = ``
        mainWindow.innerHTML = `<h1>Thank you for using our bank</h1>`
    })


    balanceBut.click(function(){     
        printing.innerHTML = `<h2>you have ${userBalance} denars on your account</h2>`
        console.log(userBalance);
    })

})

