//script.js
console.log(`Да се напише програма што на екран ќе ги испечати сите четири
цифрени броеви кај кои збирот на трите најмалку значајни цифри е еднаков со најзначајната цифра

пример 4031 (4=0+3+1); 5131 (5=1+3+1)`);

for (let i = 1000; i <9999; i++) {
    i+='';   
    let array = [];    
    for (let g = 0; g < i.length; g++){        
      array.push(i[g]);      
      array[g]= parseInt(array[g]);
    }
    for (let h = 0; h < array.length; h++){
        for (let k = 0; k < array.length; k++){            
            if (array[h]<array[k]){                
                [array[h],array[k]]=[array[k],array[h]]
            }           
        }
    }
    
    if (array[3] == array[0]+array[1]+array[2]){
        console.log(`${i}, ${array[3]} = ${array[0]} + ${array[1]} + ${array[2]}`);
    }
    else{
        continue;
    } 
    
    
    
    
   
   
}