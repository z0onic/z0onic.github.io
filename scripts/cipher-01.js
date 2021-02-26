function rotFirst(str) {
  const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let newStr = str.toUpperCase();
  let key = Math.abs(parseInt(document.getElementById("input-key").value));
  return newStr
    .split("")
    .map(char => { 
      const pos = alpha.indexOf(char);
      return pos >= 0 ? alpha[(pos + key) % 26] : char;
      })
      .join("");
}

function codeMessage() {
	let input = document.getElementById("input-text").value;
	let coded = rotFirst(input);
	document.getElementById("output-text").innerHTML = coded;
}

//download output

function saveText(text){
  var link = document.createElement('a');
  link.href = 'data:text/plain;charset=UTF-8,' + escape(text);
  link.download = 'output.txt';
  link.click();
}

function exportText() {
  var codedText = document.getElementById("output-text").innerHTML;
  console.log(codedText);
  saveText(codedText);
}

