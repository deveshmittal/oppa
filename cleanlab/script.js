$(document).ready(function(){
    let intervalIds = [];

    $('#start').click(function(){
        clearExistingIntervals();  // Clear any existing intervals to prevent multiple interval issues

        var width = parseInt($('#width').val());
        var growth = parseInt($('#growth').val());
        var interval = parseInt($('#interval').val());
        var numberCircles = parseInt($('#numberCircles').val());

        for (var i = 0; i < numberCircles; i++) {
            var circle = $('<div class="circle"></div>').css({
                width: width,
                height: width,
                backgroundColor: getRandomColor(),
                top: Math.random() * ($(window).height() - width),
                left: Math.random() * ($(window).width() - width)
            });

            $('body').append(circle);
        }

        var intervalId = setInterval(function(){
            $('.circle').each(function(){
                var newSize = $(this).width() + growth;
                $(this).width(newSize);
                $(this).height(newSize);
            });
        }, interval);
        intervalIds.push(intervalId);
    });

    $('#clear').click(function(){
        clearExistingIntervals();
        $('.circle').remove();
    });

    $(document).on('click', '.circle', function(){
        $(this).remove();
    });

    $(document).on('mousemove', '.circle', function(){
        $(this).fadeTo('fast', 0.5);
    });

    $(document).on('mouseleave', '.circle', function(){
        $(this).fadeTo('fast', 1);
    });

    function clearExistingIntervals() {
        intervalIds.forEach(function(id) {
            clearInterval(id);
        });
        intervalIds = [];
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
