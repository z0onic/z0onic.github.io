function rot13(str) {
  const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let newStr = str.toUpperCase();
  return newStr
    .split("")
    .map(char => { 
      const pos = alpha.indexOf(char);
      return pos >= 0 ? alpha[(pos + 13) % 26] : char;
      })
      .join("");
}

	var input = ""
	//var output = document.getElementById("output-text").value;

	function codeMessage() {
		input = document.getElementById("input-text").value;
		//console.log(input);
		let coded = rot13(input);
		//console.log(coded);
		document.getElementById("output-text").innerHTML = coded;

	}