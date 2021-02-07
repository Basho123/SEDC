//script.js
console.log(`Да се напише функција која ќе проверува дали дадена текстуална низа е палиндром.

Една текстуална низа е палиндром ако таа се чита исто од лево на десно и од десно на лево.

Примери за палиндроми
dovod
ana
kalabalak`);









function palindrom(zbor) {
    let palindrom = '';   
        for (let i = zbor.length - 1; i >= 0; i--) {
                     palindrom += zbor[i];
            }         

if (palindrom === zbor){
    console.log(`зборот ${zbor} е палиндром`);
}
else {console.log(`зборот ${zbor} не е палиндром`);}       
}

palindrom("ana");
palindrom("калабалак");
palindrom('krkevina');
palindrom('dovod');
palindrom('kursetrese');