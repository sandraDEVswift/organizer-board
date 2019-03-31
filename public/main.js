$(document).ready(function() {
    postit()
});

//to set sticky notes height
var postit = function() {
    let board =  $('.board'), small = $('.small'), smallHeight = small.width(), big = $('.big'), bigHeight = big.width()
    let height = board.width()
    board.css('height', height + 'px')
    small.css('height', smallHeight + 'px')
    big.css('height', bigHeight + 'px')
}






