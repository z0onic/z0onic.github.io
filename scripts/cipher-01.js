function shift(str, num) {
  const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const beta = "abcdefghijklmnopqrstuvwxyz";
  return str
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

function deShift(str, num) {
  const revAlpha = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
  const revBeta  ="zyxwvutsrqponmlkjihgfedcba";
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
  let key = Math.abs(parseInt(document.getElementById("input-key").value));
  let coded = shift(input, key);
	document.getElementById("output-text").innerHTML = coded;
}

function decodeMessage() {
  let input = document.getElementById("input-text").value;
  let key = Math.abs(parseInt(document.getElementById("input-key").value));
  let decoded = deShift(input, key);
  document.getElementById("output-text").innerHTML = decoded;
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
