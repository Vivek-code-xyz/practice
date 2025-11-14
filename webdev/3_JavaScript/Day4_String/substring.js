//index of substring

let hero="Hello I Am Saktiman Am";
console.log(hero.indexOf("Saktiman"));   //gives index of first occurance of the substring entered

console.log(hero.lastIndexOf("Am"))   //returns last index for the Am

console.log(hero.indexOf("ironman"))   //returns -1

console.log(hero.includes("man"));            ///showos if the substring exist in the string or not
console.log(hero.includes("america"));

let newstring ="helloDon";
console.log(newstring.slice(0,4));   //prints the string from index 0 to 3
console.log(newstring.substring(0,4))    //both are same

//slice can take negative indexes also but substring cannot..

/*
    indexing in string

    H     E     L     L     O
    0     1     2     3     4   --->POSITIVE
    -5    -4    -3    -2    -1  ---->NEGATIVE

*/

console.log(newstring.slice(-6,5));
//for slice operation....if starting index is greater than ending index then output will be empty string
console.log(newstring.slice(6,2));

console.log(newstring.substr(0,3));       //substr(st_idx, lengthof charecters to print);

