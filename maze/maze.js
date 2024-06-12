$(document).ready(function() {
    let gameLost = false;

    $(".boundary").on("mouseover", function() {
        $(".boundary").addClass("youlose");
        gameLost = true;
    });

    $("#start").on("click", function() {
        $(".boundary").removeClass("youlose");
        $("#status").text("Move your mouse over the \"S\" to begin.");
        gameLost = false;
    });

    $("#end").on("mouseover", function() {
        if (!gameLost) {
            alert("You win!");
        }
    });

    $("#maze").on("mouseleave", function() {
        if (!gameLost) {
            $(".boundary").addClass("youlose");
            gameLost = true;
        }
    });
});
