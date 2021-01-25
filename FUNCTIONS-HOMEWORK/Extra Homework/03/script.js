// Extra Homework/03/script.js

// ------------ Task 03 -------------
// You are counting points for a basketball game, given the amount of 2-pointers scored and 
// 3-pointers scored, find the final points for the team and return that value.
// Example: points(38, 8) 
// output 100

userInput2pointers = parseInt(prompt(`You are counting points for a basketball game, given the amount of
 2-pointers scored and 3-pointers scored.
 
 First, enter the 2 point number of hits during the match`));

userInput3pointers = parseInt(prompt(`Now, enter the 3 point number of hits during the match`));

function totalPoints(points2,points3) {
    if (isNaN(points2) || points2 < 0 || isNaN(points3) || points3 < 0){
        console.log("Please enter valid number.");
    }else {console.log(`The total number of points for this match is ${(points2 * 2) + (points3 * 3)}. `);
    }
}

totalPoints(userInput2pointers,userInput3pointers);


