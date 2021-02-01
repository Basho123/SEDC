//script.js // exercise 3

$(document).ready(function () {

    let userBalance = 25000;

    let depositBut = $(`#deposit`);
    let withdrawBut = $(`#withdrawal`);
    let balanceBut = $(`#getBalance`);
    let exitBut = $(`#exit`);

    let mainWindow = $('#mainWindow')[0];

    let printing = $(`#printing`)[0];

    depositBut.click(function () {
        printing.innerHTML = `<h2>Enter how much money you need in the field</h2>                     <input type= "number" id ="moneyInput"><span style="font-size:20px">MKD</span><button id="buttonInside">DEPOSIT</button>`
        let moneyInput = $('#moneyInput')[0];
        let buttonInside = $('#buttonInside');
        buttonInside.click(function () {
            if (!isNaN(moneyInput.value)) {
                userBalance += parseInt(moneyInput.value);
                printing.innerHTML = `<h2>you had ${userBalance - moneyInput.value} denars on your account, now you have ${userBalance} denars on your account.</h2>`
            }
            else printing.innerHTML = `<h2>Please input valid data!</h2>`
        })


    })

    withdrawBut.click(function () {

        printing.innerHTML = `<h2>Enter how much money you need in the field</h2>                     <input type= "number" id ="moneyInput"><span style="font-size:20px">MKD</span><button id="buttonInside">WITHDRAW</button>`
        let moneyInput = $('#moneyInput')[0];
        let buttonInside = $('#buttonInside');
        
        buttonInside.click(function () {                
            if (!isNaN(parseInt(moneyInput.value))) {
                if (userBalance >= parseInt(moneyInput.value)) {
                    userBalance -= parseInt(moneyInput.value);
                    printing.innerHTML = `<h2>You had ${userBalance + parseInt(moneyInput.value)} denars on your account, now you have ${userBalance} denars on your account.</h2>`
                }
                else {
                    printing.innerHTML = `<h2>You dont have so much money on your account. Current balance: ${userBalance} denars </h2>`
                    alert(`You don't have so much money on your account`)
                }
            }
            else printing.innerHTML = `<h2>Please input valid data!</h2>`
        })

    })

    exitBut.click(function () {
        printing.innerHTML = `<h2>Thank you for using our bank</h2>`
        mainWindow.innerHTML = ``

        printing.style.color = `black`;
        printing.style.padding = `230px 0 100px 0`;        
    })

    balanceBut.click(function () {
        printing.innerHTML = `<h2>you have ${userBalance} denars on your account</h2>`

    })

})

