const textSelect = document.querySelectorAll("select"),
	textFrom = document.querySelector('.text-from'),
	textTo = document.querySelector('.text-to'),
	button = document.querySelector('button'),
	icons = document.querySelectorAll('.icons'),
	exchange = document.querySelector('.exchange');

exchange.addEventListener("click", ()=>{
	let text = textFrom.value;
	textFrom.value = textTo.value;
	textTo.value = text;

	let option = textSelect[0].value;
	textSelect[0].value = textSelect[1].value;
	textSelect[1].value = option;
})

icons.forEach(icon => {
	icon.addEventListener("click", ({target})=>{
		if(target.classList[1] == "fa-copy"){
			if(target.id == "from1"){
				navigator.clipboard.writeText(textFrom.value);
			}else{
				navigator.clipboard.writeText(textTo.value);
			}
		}else {
			let ovoz;
			if(target.id == "from"){
				ovoz = new SpeechSynthesisUtterance(textFrom.value);
				ovoz.lang = textSelect[0].value;
				console.log(888)
			}else{
				ovoz = new SpeechSynthesisUtterance(textTo.value);
				ovoz.lang = textSelect[1].value;
			}
			speechSynthesis.speak(ovoz);
		}
	})
})
textSelect.forEach((text,id) => {
	let option;

	for (const key in countries){
		let selected;
		if(id == 0 && key == "en-GB"){
			selected = "selected";
		}else if (id == 1 && key == 'uz-UZ'){
			selected = "selected";
		}
		option = `<option value="${key}" ${selected}>${countries[key]}</option>`;
		text.insertAdjacentHTML("beforeend", option);
	}
})

function getData(){
	let newText = textFrom.value,
		translateFrom = textSelect[0].value,
		translateTo = textSelect[1].value;
	if(!newText)return;
	textTo.setAttribute("placeholder", "Translating...");
	let api = `https://api.mymemory.translated.net/get?q=${newText}&langpair=${translateFrom}|${translateTo}`;

	fetch(api).then(res => res.json()).then(data => {
		textTo.value = data.responseData.translatedText;
		textTo.setAttribute("placeholder", "Translation");
	}).catch(err => {console.log(err)})
}

button.addEventListener("click", getData)

window.addEventListener("keypress", e=> {
	if(e.keyCode == 13){
		getData();
	}
})