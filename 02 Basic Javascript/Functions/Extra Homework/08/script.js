// Extra Homework/08/script.js

 // ------------- Task 08 -----------
        // Create a function that takes in a current mood and return a sentence in the following format: "Today, I am feeling {mood}". However, if no argument is passed, return "Today, I am feeling neutral".<br/>
        // Example: moodToday("happy") output "Today, I am feeling happy"
        // Example: moodToday() output "Today, I am feeling neutral"

        moodPrompt = prompt(`How do you feel today?`)

        function moodToday(mood){
           if (moodPrompt === null || mood.length < 1){
              console.log(`Today, I am feeling neutral.`);
           }
           else {console.log(`Today, i am feeling ${mood}.`);}
        }

        moodToday(moodPrompt);