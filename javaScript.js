    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
    
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        }
    
        return array;
  }


    function clickCard(id){

        clicked = $(id).attr('data-clicked');
        disabled = $(id).attr('data-disabled');
        
        if(disabled != 1)
        {
            if(clicked == 1)
            {
                $(id)
                    .attr('data-clicked','0')
                    .css('color', 'orange')
                    .animate({
                        'font-size': '0px',
                        'padding': '0',
                        'height': '1px',
                        'margin-top': '50px',
                    })
                    .animate({
                        'padding-top': '40%',
                        'height': '60px',
                        'margin-top': '0px'
                    })
                    .css('color', '#222');
            } 
            else 
            {
                $(id)
                    .attr('data-clicked','1')
                    .attr('data-selected','1')
                    .css('color', 'orange')
                    .animate({
                        'padding': '0',
                        'height': '1px',
                        'margin-top': '50px',
                    })
                    .animate({
                        'font-size': '1em',
                        'padding-top': '40%',
                        'height': '60px',
                        'margin-top': '0px'
                    })
                    .css('color', '#222');
            }
        }
    }

    function addPoints() {
        var ile = $('#points').html();
        var points = parseInt(ile);
        points++;
        $('#points').html(points);
    }

    function checkIfThisPair() {
        var i = 0;
        var pair = [];
        $('div[data-selected=1]').each(function()
        {
            pair[i] = $(this).attr('data-pair');
            i++;
        })

        if(pair[0] == pair[1])
        {
            addPoints();
            return 1;
        }
        else
            return 0;
    }

    function checkIfDwoSelected() {
        
        if($('div[data-selected=1]').length == 2)
        {
            if(checkIfThisPair())
            {
                $('div[data-selected=1]').delay(2000).each(function(){
                    $(this).css({
                        'background-color' : 'rgb(110, 238, 121)',
                        'border' : '2px solid rgb(49, 138, 56)',})
                    .removeAttr('data-selected')
                    .attr('data-disabled','1');
                })
            }
            else
            {
                $('div[data-selected=1]').delay(2000).each(function(){
                    $(this).attr('data-selected','0').click();
                })
            }
        }
    }

    function setMaxPoint(max) {
        $('#maxPoint').html(max);
    }

    /**
     * tworzy tablice wartości z odpowiednio sformatowanej treści pliku
     */
    function createArrayMemory(string) {
        
        var firstArray = [];
        var secondArray = [];
        /* var patt1 = /\r?\n|\r/;
        var result = string.match(patt1); */
        var stringAfterReplace = string.replace("\r\n", "");

        firstArray = stringAfterReplace.split(',');

        var valueArray = [];
        $.each(firstArray, function(k,v){
            secondArray[k] = v.split('-');
        })
        return secondArray;
    }


$(document).ready(function() {

    $.get('memory.txt', function(data) {

        var i=0;
        var ArrayMemory = [];
        ArrayMemory = createArrayMemory(data);
        setMaxPoint(ArrayMemory.length);
        console.log('ArrayMemory');
        console.log(ArrayMemory);
        var cards = [];
        $.each(ArrayMemory, function(k, v) {
            if(v.length >= 2)
            {
                    cards[i++] = new Card(k, i, v[0]);
                    cards[i++] = new Card(k, i, v[1]);
            }
        })
        console.log('cards');
        console.log(cards);
        var cardSort = [];
        cardSort = shuffle(cards);
    
        var htmlCards = '';
        $.each(cardSort, function(k, v){
            htmlCards+= v.show();
        })
        $('.cards').html(htmlCards);

     }, 'text');

});
