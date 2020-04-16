let cards = document.getElementsByClassName("card");

function reveal() {
	for (var i = 0 ; i < cards.length; i++) {
		cards[i].classList.add("visible");
	}
}

