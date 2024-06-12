/* jshint esversion: 6 */
$(document).ready(function() {
    "use strict";

    let $boundary = $(".boundary");
    let $maze = $("#maze");
    let $status = $("#status");
    let $start = $("#start");
    let $end = $("#end");

    let lostMessage = function() {
        if (!$boundary.hasClass("youlose")) {
            $boundary.addClass("youlose");
            $boundary.removeClass("started");
            updateStatus("Sorry, you lost. :[");
        }
    };

    let updateStatus = function(msg) {
        $status.text(msg);
    };

    $boundary.mouseenter(function() {
        lostMessage();
    });

    $maze.mouseleave(function() {
        lostMessage();
    });

    $end.mouseenter(function() {
        if (!$boundary.hasClass("youlose") && $boundary.hasClass("started")) {
            updateStatus("You win! :]");
        }
    });

    $start.click(function() {
        $boundary.removeClass("youlose");
        $boundary.addClass("started");
        updateStatus("You are playing now.");
    });
});
