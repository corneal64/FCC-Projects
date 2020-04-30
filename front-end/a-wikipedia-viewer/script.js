$(".glyphicon-search").on("click", function() {
	$(".glyphicon-search").fadeOut();
	$("#input").fadeIn();
	$("#submit").fadeIn();
	$("#searchbox").addClass("animated fadeInDown");
	
});

var searchTerm = '';

$("#submit").on("click", function() {
	$("#wikibox").empty();
	searchTerm = $("#input").val();
	wikiQuery();
});

function wikiQuery() {

	var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrlimit=10&prop=extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + searchTerm + "&callback=?";

	$.ajax({
		dataType: "json",
		url: url,
		success: function(wikipedia) {
			var wikiPages = wikipedia.query.pages;
			var pageIds = Object.keys(wikiPages);
			var wikiLink = 'https://en.wikipedia.org/?curid=';

			for (i = 0; i < pageIds.length; i++) {

				wikiLink += wikiPages[pageIds[i]].pageid;

				$("#wikibox").append("<div class='wikibox'><a href='" + wikiLink + "' target='_blank'><div class='title'><h2>" + wikiPages[pageIds[i]].title + "</h2></div><div class='snippet'><h4>" + wikiPages[pageIds[i]].extract + "</h4></div></a></div>");

				wikiLink = 'https://en.wikipedia.org/?curid=';
			}
		}
	});
};