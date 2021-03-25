const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const beta = "abcdefghijklmnopqrstuvwxyz";
const revAlpha = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
const revBeta  = "zyxwvutsrqponmlkjihgfedcba";


function shift(str, num) {
  return str
    .toLowerCase()
    .split("")
    .map(char => { 
      if(char == char.toUpperCase()) {
        let pos = alpha.indexOf(char);
        return pos >= 0 ? alpha[(pos + num) % 26] : char;
      }
        let pos = beta.indexOf(char);
        return pos >= 0 ? beta[(pos + num) % 26] : char;
      })
      .join("");
}

function wordShift(str, combo) {
  let newStr = str.trim().split(" ");
  return newStr
    .map(word => {
      let wordPos = newStr.indexOf(word);
      return newStr[(wordPos + combo) % newStr.length]
    })
    .join(" ");
}

function sentenceShift(str, num, combo) {
  var skip = /\W/gi;
  //let space = " ";
  let puncRegex = /[.?!]/g;
  var puncArr = str.match(puncRegex); 
  var splitFunc = function() {
    if(puncRegex.test(str)){
        return puncRegex;
      }
  }
  let newStr = str
    .split(splitFunc())
    .map(part => {
      let newPart = part; //wordShift(part, combo);
      let skips = newPart.match(skip);
      var skipSpots = [];
      var skipPos = 0;
      if(skips != null) {
        for(let i = 0; i < skips.length; i++) {
          posStart = skipPos;
          skipPos = newPart.indexOf(skips[i], posStart);
          skipSpots.push(skipPos);
          skipPos++;
        }
      }
      let joinedPart = newPart.split(skip).join("");
      let jpL = joinedPart.length;
      let pos = -1;
      let shiftPart = joinedPart
        .split("")
        .map(char => {
          pos++;
          
          return pos + num > -1 
            ? joinedPart[(pos + num) % jpL]
            : (jpL - Math.abs(pos + num) % jpL) != jpL
            ? joinedPart[jpL - Math.abs(pos + num) % jpL]
            : joinedPart[(jpL - Math.abs(pos + num))];
        });
      while(skipSpots.length > 0) {
        let temp = shiftPart.splice(skipSpots.shift(), 0, skips.shift());
      }
      if(puncArr != null) {
        var lastPart = shiftPart.concat(puncArr.shift()).join("");
      }else {
        var lastPart = shiftPart.join("");
      }
      return lastPart;
      })
    .join(" ");

  return newStr; 
}

function deShift(str, num) {
  return str
    .split("")
    .map(char => { 
      if(char == char.toUpperCase()) {
        let pos = revAlpha.indexOf(char);
        return pos >= 0 ? revAlpha[(pos + num) % 26] : char;
      }
        let pos = revBeta.indexOf(char);
        return pos >= 0 ? revBeta[(pos + num) % 26] : char;
      })
      .join("");
}

function codeMessage() {
	let input = document.getElementById("input-text").value;
  let key01 = Math.abs(parseInt(document.getElementById("input-key-01").value));
  let key02 = Math.abs(parseInt(document.getElementById("input-key-02").value));
  let combo = key01 + key02;
  let coded = shift(input, key01);
  let coded2 = sentenceShift(coded, key02, combo);
	document.getElementById("output-text").innerHTML = coded2;
}


//this works with word shift turned off... and also only if the first number is under 10 maybe. more testing needed.
function decodeMessage() {
  let input = document.getElementById("input-text").value;
  let key01 = -Math.abs(parseInt(document.getElementById("input-key-01").value));
  let key02 = -Math.abs(parseInt(document.getElementById("input-key-02").value));
  let combo = -Math.abs(key01 + key02);
  let decoded = shift(input, key01);
  let decoded2 = sentenceShift(decoded, key02, combo)
  document.getElementById("output-text").innerHTML = decoded2;
}

function saveText(text){
  var link = document.createElement('a');
  link.href = 'data:text/plain;charset=UTF-8,' + encodeURI(text);
  link.download = 'output.txt';
  link.click();
}

function exportText() {
  var codedText = document.getElementById("output-text").innerHTML;
  saveText(codedText);
}