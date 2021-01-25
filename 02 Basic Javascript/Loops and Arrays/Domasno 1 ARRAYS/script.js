//script.js
// Create a function called tellStory()

// The function should accept an array of 3 strings as an argument: name, mood, activity ( All strings )

// The function should return one big string with a story made from the arguments

// Example: This is *name*. *name* is a nice person. Today they are *mood*. They are *activity* all day. The end.

// The value that is returned from the function should be printed in the console or in alert

storyPrompt = [
    prompt("Enter a desired name for the hero"),
    prompt("Select the desired mood"),
    prompt("What does the protagonist do")
]



function tellStory(name,mood,activity){
   console.log(`
    Once upon a time, there was a hero, named ${name}, and the hero was
    in a very ${mood} mood, and he got his bearings up and went to ${activity} all 
    the people from his village.`);
}

tellStory(storyPrompt[0],storyPrompt[1],storyPrompt[2]);



