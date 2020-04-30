$(document).ready(function () {
	$.getJSON(`https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand`, function (data) {
		let index = randomIndex();

		$("#quote").append(data[index].content.rendered);
		$("#author").append("<p>— " + data[index].title.rendered + "</p>")
	});

	$("#button").on("click", function () {
		var tweetText = "href='https://twitter.com/intent/tweet?text=";

		$.getJSON(`https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand`, function (data) {
			let index = randomIndex();
			let color = getColor();

			$("#quote").html(data[index].content.rendered);
			$("#author").html("<p>— " + data[index].title.rendered + "</p>");
			$("body").css("background-color", color);
			$("#quote").css("color", color);
			$("#author").css("color", color);
			$(".btn-default").css("background-color", color);
			tweetText += $("#quote").text() + $("#author").text() + "'";
			$("#tweet").html("<a class='btn btn-primary btn-sm' " + tweetText + ">Tweet</a>");
			$(".btn-sm").css("background-color", color);
		});
	});
});

function randomIndex() {
	startIndex = 0;
	stopIndex = 9;

	return Math.floor(Math.random() * (stopIndex - startIndex + 1) + startIndex);
}

function getColor() {
	const colorlist = ["#a7708c", "#f6766d", "#ff6541", "#420420", "#5d478b", "#ab051e", "#00bfff", "#e300ff", "#003b6f", "#12455f", "#5f2c12", "#2f4c35", "#2e1c87", "#75871c", "#547687", "#8a6da0", "#9a8331", "#15635a", "#fdc824", "#209ccc", "#123456", "#73afb7", "#a8a9ad", "#1a3967", "#5c2b86", "#007de3", "#c61331", "#760033", "#e31e50", "#e5781d", "#7ee51d", "#1daee5", "#a300ff", "#bec532", "#e857e2", "#55c51b", "#dfa700", "#e26262", "#de96d1", "#799f7b", "#ac33a4", "#fcc15c", "#4ee44e", "#ffbdbd", "#c9c9ff"];

	const color = Math.floor((Math.random() * 44) + 1);
	return colorlist[color];
}