// Variables to hold time data
var workTime = 25;
var breakTime = 5;
var workDuration = workTime * 60;
var breakDuration = breakTime * 60;

// Default display for work clock
var workClock = $('#workTime').FlipClock(1500, {
  autoStart: false,
  countdown: true,
  clockFace: "MinuteCounter"
});

// Default display for break clock
var breakClock = $('#breakTime').FlipClock(300, {
  autoStart: false,
  countdown: true,
  clockFace: "MinuteCounter"
});

// Start button function
$("#startClock").on("click", function() {
  $("#startClock").addClass("disabled");
  $("#stopClock").removeClass("disabled");
  $("#breakMinus").addClass("disabled");
  $("#breakPlus").addClass("disabled");
  $("#durationMinus").addClass("disabled");
  $("#durationPlus").addClass("disabled");
  workClock.start(function() {
    if (workClock.getTime().time === 1) {
      $.playSound('https://res.cloudinary.com/corneal64/raw/upload/v1470065444/timeUp_imj92p');

      breakClock.start(function() {
        if (breakClock.getTime().time === 1) {
          $("#breakMinus").removeClass("disabled");
          $("#breakPlus").removeClass("disabled");
          $("#durationMinus").removeClass("disabled");
          $("#durationPlus").removeClass("disabled");
          $("#stopClock").addClass("disabled");
          $("#startClock").removeClass("disabled");
          $.playSound('https://res.cloudinary.com/corneal64/raw/upload/v1470065444/timeUp_imj92p');
        }
      });
    }
  });
});

// Stop button function
$("#stopClock").on("click", function() {
  workClock.stop();
  $("#startClock").removeClass("disabled");
  $("#stopClock").addClass("disabled");
})

// Duration Plus function
$("#durationPlus").on("click", function() {
  if (workClock.getTime().time === 59 && $("#durationMinus").hasClass("disabled")) {
    $("#durationMinus").removeClass("disabled");
    workTime += 1;
    workDuration = workTime * 60;
    workClock.setTime(workDuration);
  } else {
    workTime += 1;
    workDuration = workTime * 60;
    workClock.setTime(workDuration);
  }
});

// Duration Minus Function
$("#durationMinus").on("click", function() {
  if (workClock.getTime().time === 59) {
    $("#durationMinus").addClass("disabled");
  } else {
    workTime -= 1;
    workDuration = workTime * 60;
    workClock.setTime(workDuration);
  }
});

// Break Plus Function
$("#breakPlus").on("click", function() {
  if (breakClock.getTime().time === 59 && $("#breakMinus").hasClass("disabled")) {
    $("#breakMinus").removeClass("disabled");
    breakTime += 1;
    breakDuration = breakTime * 60;
    breakClock.setTime(breakDuration);
  } else {
    breakTime += 1;
    breakDuration = breakTime * 60;
    breakClock.setTime(breakDuration);
  }
});

// Break Minus Function
$("#breakMinus").on("click", function() {
  if (breakClock.getTime().time === 59) {
    $("#breakMinus").addClass("disabled");
  } else {
    breakTime -= 1;
    breakDuration = breakTime * 60;
    breakClock.setTime(breakDuration);
  }
});

// Reset Function
$("#resetClock").on("click", function() {
  if ($("#breakMinus").hasClass("disabled") || $("#durationMinus").hasClass("disabled")) {
    $("#breakMinus").removeClass("disabled");
    $("#durationMinus").removeClass("disabled");
  }

  $("#startClock").removeClass("disabled");
  $("#stopClock").addClass("disabled");
  $("#breakPlus").removeClass("disabled");
  $("#durationPlus").removeClass("disabled");

  workClock.stop();
  breakClock.stop();
  workTime = 25;
  breakTime = 5;
  workClock.setTime(1500);
  breakClock.setTime(300);
});


/**
 * @author Alexander Manzyuk <admsev@gmail.com>
 * Copyright (c) 2012 Alexander Manzyuk - released under MIT License
 * https://github.com/admsev/jquery-play-sound
 * Usage: $.playSound('http://example.org/sound');
 **/

(function($) {

  $.extend({
    playSound: function() {
      return $(
        '<audio autoplay="autoplay" style="display:none;">' +
        '<source src="' + arguments[0] + '.mp3" />' +
        '<source src="' + arguments[0] + '.ogg" />' +
        '<embed src="' + arguments[0] + '.mp3" hidden="true" autostart="true" loop="false" class="playSound" />' +
        '</audio>'
      ).appendTo('body');
    }
  });

})(jQuery);