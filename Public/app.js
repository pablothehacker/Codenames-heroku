let socket;
socket = io.connect('http://localhost:3000');

const words = [
{'name': 'Elephant', 'status': 'red'},
{'name': 'Headache', 'status': 'blue'},
{'name': 'Machine', 'status': 'neutral'},
{'name': 'Balloon', 'status': 'red'},
{'name': 'Japan', 'status': 'blue'},
{'name': 'Motorcycle', 'status': 'neutral'},
{'name': 'Football', 'status': 'blue'},
{'name': 'Blanket', 'status': 'red'},
{'name': 'Coal', 'status': 'blue'},
{'name': 'Curtain', 'status': 'blue'},
{'name': 'Puppy', 'status': 'neutral'},
{'name': 'Eyebrow', 'status': 'blue'},
{'name': 'World', 'status': 'bomb'},
{'name': 'Gasoline', 'status': 'blue'},
{'name': 'Glasses', 'status': 'blue'},
{'name': 'Basketball', 'status': 'red'},
{'name': 'Alligator', 'status': 'red'},
{'name': 'Laugh', 'status': 'neutral'},
{'name': 'Aircraft', 'status': 'red'},
{'name': 'Moon', 'status': 'neutral'},
{'name': 'Bicycle', 'status': 'red'},
{'name': 'Piano', 'status': 'neutral'},
{'name': 'Dress', 'status': 'blue'},
{'name': 'Sandcastle', 'status': 'neutral'},
{'name': 'Birthday', 'status': 'red'}
];

const boxes = document.querySelectorAll('.box');
let redPoints = 8;
let bluePoints = 9;

const cellsContainer = document.getElementById('gameId')
words.forEach((word) => {
	cellsContainer.insertAdjacentHTML('beforeend', `<div class='box active' onclick=(triggerClickedCell()) data-word='${word.name}'>${word.name}</div>`)
});


function showColor(data) {
	const found = data.word
    let clickedCell = document.querySelector(`[data-word='${found}']`);
    const findName = words.find(element => element.name == clickedCell.innerHTML);

    
    if (clickedCell.classList.contains('active')){
	    if(findName.status == 'red') {
	      redPoints--;
	      document.getElementById("redPoints").innerHTML = redPoints;
	      clickedCell.classList.add('red');
	    }else if (findName.status == 'blue') {
	      bluePoints--;
	      document.getElementById("bluePoints").innerHTML = bluePoints;
	      clickedCell.classList.add('blue');
	    }else if (findName.status == 'bomb') {
	    	explosion();
	    }else if (findName.status == 'neutral'){
	    	clickedCell.classList.add('neutral');
	    }

	    if (redPoints == 0) {
	    	redPoints++
	    	alert('RED WON MA MAN');
	    }
	    if (bluePoints == 0) {
	    	bluePoints++
	    	alert('BLUE WON MA MAN');    	
	    }
	    clickedCell.classList.remove('active');
	}
	let clickdCell = document.querySelector(`[data-word='${found}']`)
}

function spymaster(){
	const foundSpy = words.forEach((element,index) => {
		if(element.status == 'red'){
			boxes[index].classList.toggle('spyRed');

		}else if(element.status == 'blue'){
			boxes[index].classList.toggle('spyBlue');

		}else if(element.status == 'bomb'){
			boxes[index].classList.toggle('spyBomb');

		}else if(element.status == 'neutral'){
			boxes[index].classList.toggle('spyNeutral');
			
		}
	});
}

function explosion(){
	theBody = document.getElementById("YES");
	theBody.classList.add("hide");
	alert('OOOH NO! \nI THINK YOU CLICKED ON THE BOMB \nBUT I`M NOT EXACTELY SURE');
	document.body.style.backgroundImage = "url('https://media.giphy.com/media/jp8ULEy5ciznZwUFAM/giphy.gif')";
}


function triggerClickedCell() {
	const clickedWord = event.target.innerText
	 
	//sending jason to websocket server

	let data = {
		word: clickedWord
	}
	socket.emit('trigger-Clicked-Cell', data);
}

socket.on('clicked-cell', showColor);