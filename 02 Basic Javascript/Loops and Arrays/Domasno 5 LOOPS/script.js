//script.js
//


function studetsFullNames(firstNames, lastNames) {  
    let studentsIndex = [];
    console.log("\n==========================================");  

    for (let i = 0; i < firstNames.length || i < lastNames.length; i++)       
        {
            if (lastNames[i] === undefined || firstNames[i] === undefined){
                 lastNames[i] = ""}   
            
            studentsIndex.push(`${i+1}. ${firstNames[i]} ${lastNames[i]}.`)            
            console.log(studentsIndex[i]); 
        }
        console.log(studentsIndex);
}



studetsFullNames(["Ivan","Elena","Dalibor","Bertan"],["Jamandilovski","Ivanovska"]);
studetsFullNames([2,4,5],[3,5,4]);
studetsFullNames(["Tadej", "Богољуб", "Драгомир"],["Kristofalofski","Веселиновски","Морков"])