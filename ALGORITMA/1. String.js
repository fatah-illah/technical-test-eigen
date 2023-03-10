let str = "NEGIE1";
let reversedStr = "";
for (let i = str.length - 2; i >= 0; i--) {
  reversedStr += str[i];
}
reversedStr += str[str.length - 1];
console.log(reversedStr);
