
function Card(pair, id, value) {
	
    this.id = id,
    this.pair = pair,
    this.class = "card",
    this.averse = "+",
    this.reverse = "-"+value+"-",
    this.clicked = 0,
    this.getElement = "."+this.class,
    this.onclick = 'clickCard(\'#idCard-'+this.id+'\')',
    this.onmouseover = 'checkIfDwoSelected()',

    this.show = function(){
        var data = ' data-clicked='+this.clicked+' data-reverse="'+this.reverse+'" data-averse="'+this.averse+'" data-pair="'+this.pair+'"';
		var html = '<div class="box-card" >';
		html+= '<div '+data+' id="idCard-'+this.id+'" class="'+this.class+'" onclick="'+this.onclick+'" onblur="'+this.onmouseover+'">'+this.reverse+'</div>';
		html+= '</div>';
        return html;
    }
}
