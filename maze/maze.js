/* jshint esversion: 6 */
$(document).ready(function() {
    "use strict";

    let $boundaries = $(".boundary");
    let $maze = $("#maze");
    let $status = $("#status");
    let $start = $("#start");
    let $end = $("#end");

    $boundaries.mouseenter(function() {
       lose();
    });

    $maze.mouseleave(function () {
        lose();
    });

    let lose = function() {
        if (!$boundaries.hasClass("youlose")) {
            $boundaries.addClass("youlose");
            if ($boundaries.hasClass("started")) {
                $boundaries.removeClass("started");
            }
            updateStatus("Sorry, you lost. :[");
        }
    };

    let updateStatus = function(msg) {
        $status.text(msg);
    };

    $end.mouseenter(function () {
        if (!$boundaries.hasClass("youlose")) {
            if ($boundaries.hasClass("started")) {
                updateStatus("You win! :]");
            }
        }
    });

    $start.click(function () {
        if ($boundaries.hasClass("youlose")) {
            $boundaries.removeClass("youlose");
            if (!$boundaries.hasClass("started")) {
                $boundaries.addClass("started");
            }
            updateStatus("You are playing now.");
        }
    });

});
