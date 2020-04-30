var game = {
	count: 1,
	possibilities: ['red', 'green', 'yellow', 'blue'],
	currentGame: [],
	playerInput: [],
	winMessages: ['Awesome!', "That's amazing!", "Keep going!", "You're doing great!", "Nice!", "Epic!", "Marvelous!", "Wonderful!", "Excellent!", "Fabulous!"],
	sounds: {
		red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
		green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
		yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
		blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
	},
	strict: false,
	sound: true
};

$(document).ready(function() {

	initializeGame();

	$("#sound").on("click", function() {
		if ($("#volume").hasClass("glyphicon-volume-up")) {

			$("#volume").removeClass("glyphicon-volume-up");
			$("#volume").addClass("glyphicon-volume-off");
			game.sound = false;

		} else {
			$("#volume").addClass("glyphicon-volume-up");
			game.sound = true;
		}

	});

	$(".menu").on("click", function() {
		$(".buttons").addClass("animated fadeInDown");
		$(".buttons").toggle();
	});

	$("#btn1").click(function() {
		if ($("#btn1").hasClass("stopped")) {
			$("#btn1").removeClass("stopped");
			$("#btn1").addClass("started");
			$("#btn1").text("Restart");
			$("#btn1").removeClass("btn-success");
			$("#btn1").addClass("btn-danger");
			$(".box").css({
				"pointer-events": "auto"
			});
			startGame();
		} else if ($("#btn1").hasClass("started")) {
			stopGame();
		};
	});

	$("#strictMode").click(function() {
		if (!game.strict) {
			game.strict = true;
			$(this).text("Strict Mode");
		} else {
			game.strict = false;
			$(this).text("Normal Mode");
		};
	});

	$(".box").click(function() {
		lightUp($(this).attr("id"));
		game.playerInput.push($(this).attr("id"));
		checkGameState();
	});
});

// Checks current game status;
function checkGameState() {

	if (game.strict) {
		if (game.playerInput.length === game.currentGame.length) {
			if (_.isEqual(game.currentGame, game.playerInput)) {
				game.count++;
				if (game.count <= 20) {

					$("#message").text(pickAWord() + " Next Level!");
					$("#message").addClass("animated swing");

					nextLevel();
					showMoves(game.currentGame);
				} else {
					$("#message").text("Congratulations! You Won!");
					$("#message").addClass("animated swing");
					if (playAgain()) {
						$("#yes").click(function() {
							startGame();

							$("#message").text("");
							$("#message").text("");
							$("#level").text(" LEVEL " + game.count);

						});
						$("#no").click(function() {

							$("#message").text("");
							$("#message").text("");
							stopGame();
						});
					};
				};
			} else {

				$("#message").text("Ouch!! Back to level 1");
				$("#message").addClass("animated swing");

				startGame();
				$("#level").text(" LEVEL " + game.count);
			};
		};
	} else {
		if (game.playerInput.length === game.currentGame.length) {
			if (_.isEqual(game.currentGame, game.playerInput)) {
				game.count++;
				if (game.count <= 20) {

					$("#message").text(pickAWord() + " Next Level!");
					$("#message").addClass("animated swing");

					nextLevel();
					showMoves(game.currentGame);
				} else {
					$("#message").text("Congratulations! You Won!");
					$("#message").addClass("animated swing");

					if (playAgain()) {
						$(".box").css({
							"pointer-events": "none"
						});
						$("#yes").click(function() {
							startGame();
							$("#level").text(" LEVEL " + game.count);
						});
						$("#no").click(function() {
							stopGame();
						});
					}
				}
			} else {
				$("#level").text(" LEVEL " + game.count);

				$("#message").text("Opps... that's not correct. Try Again!");
				$("#message").addClass("animated swing");

				clearPlayerInput();
				showMoves(game.currentGame);
			};
		};
	};
};

function initializeGame() {

	$(".box").css({
		"pointer-events": "none"
	});
};

// New level sequence and setup;
function nextLevel() {
	generateMove();

	clearPlayerInput();

	if ($("#message").hasClass("animated swing")) {
		window.setTimeout(function() {
			$("#message").removeClass("animated swing");
		}, 800);
	};
};

// Generates a new color;
function generateMove() {
	game.currentGame.push(game.possibilities[(Math.floor(Math.random() * 4))]);
};

function pickAWord() {
	return game.winMessages[(Math.floor(Math.random() * 10))];
};

// Clears the player inputs array;
function clearPlayerInput() {
	game.playerInput = [];
};

// Resets the entire game;
function startGame() {
	game.count = 1;
	game.currentGame = [];
	game.playerInput = [];
	generateMove();
	showMoves(game.currentGame);
	$(".box").css({
		"pointer-events": "auto"
	});
};

function stopGame() {
	game.count = 1;
	game.currentGame = [];
	game.playerInput = [];
	$("#btn1").removeClass("started");
	$("#btn1").addClass("stopped");
	$("#btn1").text("Start");
	$(".box").attr('disabled', 'disabled');
	$("#level").text("");
	$("#message").text("");
	$(".box").css({
		"pointer-events": "none"
	});
	//Refresh browser for codepen!
	location.reload(true);
};

function showMoves(moves) {
	$("#level").text(" Level " + game.count);
	var i = 0;
	var $interval = setInterval(function() {
		lightUp(moves[i]);
		i++;
		if (i >= moves.length) {
			clearInterval($interval);
		}
	}, 1000);
};

function lightUp(color) {
	var $color = $("#" + color).addClass("animated pulse");

	if (game.sound) {
		playSound(color);
	};

	window.setTimeout(function() {
		$color.removeClass("animated pulse");
	}, 800);
};

function playSound(color) {
	game.sounds[color].play();
};

function playAgain() {
	$("#message").html('<div><h1>Congratulations! You Won!</h1><h2>Play Again?</h2><button class="btn btn-default btn-sm" id="yes">Yes</button><button class="btn btn-default btn-sm" id="no">No</button></div>');
	return true;
};