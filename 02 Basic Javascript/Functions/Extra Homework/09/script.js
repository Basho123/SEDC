// Extra Homework/09/script.js

// ------------ Task 09 -----------<br/>
        // Create a function that determines whether or not it's possible to split a pie fairly given these three parameters:
        // Total number of slices.
        // Number of recipients.
        // How many slices each person gets.


let numberOfSlices = parseInt(prompt(`Test if pie slices can be distribiuted fairly among recepients.
Enter the number of slices.`));
let numberOfRecepients = parseInt(prompt(`Enter the number of recepients.`));

let globalPieSlices = numberOfSlices % numberOfRecepients;

function fairSlicesDistribution(slicesInFunction, recepients){
  
   if (isNaN(slicesInFunction) || isNaN(recepients) || slicesInFunction < 1 || recepients < 1 )
    {console.log(`Please enter valid number`);
   }else if (globalPieSlices > 0  ){
      console.log(`Slices cannot be distribiuted equally among recepients.`);
   }

   else{console.log(`Slices can be distributed equally, each recepient gaining ${slicesInFunction/recepients} slices`);}
}

fairSlicesDistribution(numberOfSlices, numberOfRecepients);