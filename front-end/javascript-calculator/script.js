var lastScreenValue = "";

// Adds numbers and math operators to the display.
$(".char").on("click", function() {
	$("#screen").val($("#screen").val() + $(this).attr('value'));
});

// prevents diplay of length > 16, tranquates result to 3dp if answer is in decimals, replaces % to divided by 100.
$("#equals").on("click", function() {
	var screenValue = $("#screen").val().replace("%", "/100");
	var toDisplay = eval(screenValue);

	if ($("#screen").val().length > 16) {
		$("#screen").val("Limit Exceeded!");
	} else {
		if (screenValue.indexOf(".") > 0) {
			$("#screen").val(toDisplay.toFixed(3));
		} else {
			$("#screen").val(toDisplay);
		}
	}
});

// clears the display.
$("#clear").on("click", function() {
	lastScreenValue = $("#screen").val();
	$("#screen").val("");
});

// restores previous screen value.
$("#answer").on("click", function() {
	$("#screen").val(lastScreenValue);
});

// deletes one character from screen on click.
$("#erase").on("click", function() {
	var screenValue = $("#screen").val();
	$("#screen").val(screenValue.substring(0, screenValue.length - 1));
});