/***********************
* Adobe Edge Animate Composition Actions
*
* Edit this file with caution, being careful to preserve 
* function signatures and comments starting with 'Edge' to maintain the 
* ability to interact with these actions from within Adobe Edge Animate
*
***********************/

var hits = 0;
var totalHits = 0;
var done = false;

/* frame functions */

// restart
function restart() {
	location.reload();
}

// correctAnswer
function correctAnswer() {
	var actualContent = $('#Stage').html();
	$("#Stage").html('<img src="images/solution.png" width="100%" height="100%" />').promise().done(function () {
		$(this).click(function () {
			restart();
		}).css({
			cursor: 'pointer',
		});
		$('#Stage img').on('load', function () {
			//$('#Stage').center();
		});
	});
}

// check
function check () {
	// Compare initial and actual array values and alert if done
	if (done) {
		console.log(hits, totalHits, 'Kész! Ügyes vagy!');
		parent.feedBackFromJs("5", 'Kész! Ügyes vagy!');
	} else {
		console.log(hits, totalHits, 'Még nem vagy kész, folytasd!');
		parent.feedBackFromJs("1", 'Még nem vagy kész, folytasd!');
	}
}

(function($, Edge, compId){
var Composition = Edge.Composition, Symbol = Edge.Symbol; // aliases for commonly used Edge classes

   //Edge symbol: 'stage'
   (function(symbolName) {
      
      Symbol.bindElementAction(compId, symbolName, "document", "compositionReady", function(sym, e) {
         init();
         
         sym.finalScore = 0;
         
         function init () {
         
         	var board = {};
         
         	// define list of 25 (random?) numbers 
         
         	var n = 25;
         	var numbers = [];
         	var ready = false;
         	var shuffles = 0;
         
         	for (var i = 1; i < n-1; i++) {
         		numbers.push(i+1);
         	}
         
         	// shuffle array and check if the puzzle can be solved
         
         	while (!ready) {
         		shuffle(numbers);
         		shuffles++;
         		console.log("Shuffle №"+shuffles);
         		if ( ((numbers[6]%2) && (numbers[10]%2)) && ((numbers[12]%2) && (numbers[16]%2)) ) {
         			ready = true;
         		} 
         	}
         
         	//console.log(numbers);
         	numbers.push(n);
         	numbers.unshift(1);
         	//console.log(numbers);
         
         	// build the board_n object up from numbers 1 to 25
         	for (var i = 0; i < n; i++) {
         		var v = numbers[i];
         		board["field_"+(i+1)] = {
         			count: i+1,
         			column: (i + 5) % 5 + 1,
         			row: Math.floor(i / 5) + 1,
         			number: v,
         			isOdd: v%2
         		};
         	}
         
         
         	// add row, and column numbers, 
         	// check if can be devided by 2, 
         	// add the result to the isEven property
         
         	//console.log(board);
         
         	var possibleClicks = [1];
         
         	$.each(board,function(key,object){
         		var symbol = sym.getSymbol('board').getSymbol(key); //
         		var jQElement = sym.getSymbol('board').$(key);
         
         		symbol.$('number').html(object.number);
         		if (object.count%2) {
         			symbol.$('base').css('background','rgba(0,0,0,.25)');
         		}
         
         		jQElement.css('cursor','pointer').click(function(e){
         
         			totalHits++;
         
         			if (arrayContains(object.count,possibleClicks) && object.isOdd) {
         				$('.fields').css('background','transparent');
         				jQElement.css('background','rgba(50,255,0,.5)');
         				TweenMax.to(symbol.$('tick'),.5,{scale:1,autoAlpha:1,ease:Elastic.easeOut});
         				possibleClicks = possibleNextFields(object);
         				//console.log(possibleClicks);
         				hits++;
         				updateScore (hits,totalHits);
         				//console.log("+++"+object.count+"+++");
         
         				if (object.count == 25) {
         
         					if (totalHits < 6) {
         						sym.finalScore = 5;
         						sym.$('Score').html("Gratulálok, ügyes vagy! ("+hits+" / "+totalHits+")");
         					} else if (totalHits <= 10) {
         						sym.finalScore = 4;
         						sym.$('Score').html("Hurrá, célba jutottál! ("+hits+" / "+totalHits+")");
         					} else if (totalHits > 10) {
         						sym.finalScore = 3;
         						sym.$('Score').html("Huh, végre célba jutottál! ("+hits+" / "+totalHits+")");
         					}
         
         					sym.$('board').children().css('cursor','default').off();
         				}
         
         			} else if (arrayContains(object.count,possibleClicks) && !object.isOdd) {
         				updateScore (hits,totalHits);
         				TweenMax.fromTo(jQElement, .5, {background: 'rgba(200,255,0,.5)'}, {background: 'rgba(200,255,0,0)', onComplete: function () {
         					jQElement.css('background','transparent');
         				}});
         			 	TweenMax.to(symbol.$('cross'),.5,{scale:1,autoAlpha:1,ease:Elastic.easeOut});
         			 	$(this).css('cursor','default').off();
         			} else {
         				updateScore (hits,totalHits);
         				TweenMax.fromTo(jQElement, .5, {background: 'rgba(255,20,0,.5)'}, {background: 'rgba(255,20,0,0)', onComplete: function () {
         					jQElement.css('background','transparent');
         				}});
         				jQElement.css('background','rgba(50,255,0,.5)');
         			}
         
         		})
         
         	});
         
         	function arrayContains(number, array) {
         		return array.indexOf(number) != -1 ? true : false;
         	}
         
         	function updateScore (hits,totalHits) {
         		sym.$('Score').html("Eddig "+hits+" helyes lépés "+totalHits+" kattintásból");
         	}
         
         	function possibleNextFields(object) {
         		var list = [];
         		var d = [];
         		var count = object.count;
         		var row = object.row;
         		var column = object.column;
         
         		var allPositions = [3, -7, 7, -3, 11, 9, -11, -9];
         
         		console.log('position: ',row, column)
         
         		if (column > 2) {
         			d.push(3);
         			d.push(-7);
         			console.log('column > 2',d);
         		} 
         
         		if (column < 4) {
         			d.push(7);
         			d.push(-3);
         			console.log('column < 4',d);
         		} 
         
         		if (row > 2) {
         			if (column !=5) {
         				d.push(-9);
         			}
         			if (column !=1) {
         				d.push(-11);
         			}
         			console.log('row > 2',d);
         		} 
         
         		if (row < 4) {
         			if (column !=1) {
         				d.push(9);
         			}
         			if (column !=5) {
         				d.push(11);
         			}
         			console.log('row < 4',d);
         		}
         
         		$.each(d,function(i,v) {
         			var number = count+v;
         			if (number < 26 && number > 0) {
         				list.push(number);
         			}
         		});
         
         		return list;
         	}
         }
         
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

      });
      //Edge binding end

   })("stage");
   //Edge symbol end:'stage'

   //=========================================================
   
   //Edge symbol: 'click'
   (function(symbolName) {   
   
   })("click");
   //Edge symbol end:'click'

   //=========================================================
   
   //Edge symbol: 'board'
   (function(symbolName) {   
   
   })("board");
   //Edge symbol end:'board'

   //=========================================================

   //=========================================================
   
   //Edge symbol: 'modal'
   (function(symbolName) {   
   
   })("modal");
   //Edge symbol end:'modal'

   //=========================================================
   
   //Edge symbol: 'buttons'
   (function(symbolName) {   
   
   })("buttons");
   //Edge symbol end:'buttons'

   //=========================================================
   
   //Edge symbol: 'btn_answer'
   (function(symbolName) {   
   
   })("btn_answer");
   //Edge symbol end:'btn_answer'

   //=========================================================
   
   //Edge symbol: 'btn_restart'
   (function(symbolName) {   
   
   })("btn_restart");
   //Edge symbol end:'btn_restart'

   //=========================================================
   
   //Edge symbol: 'btn_check'
   (function(symbolName) {   
   
   })("btn_check");
   //Edge symbol end:'btn_check'

   //=========================================================
   
   //Edge symbol: 'btn_close'
   (function(symbolName) {   
   
   })("btn_close");
   //Edge symbol end:'btn_close'

   //=========================================================

   //=========================================================

   //=========================================================
   
   //Edge symbol: 'modal'
   (function(symbolName) {   
   
   })("modal_1");
   //Edge symbol end:'modal_1'

   //=========================================================
   
   //Edge symbol: 'buttons'
   (function(symbolName) {   
   
   })("buttons_1");
   //Edge symbol end:'buttons_1'

   //=========================================================
   
   //Edge symbol: 'btn_check_1'
   (function(symbolName) {   
   
   })("btn_answer_1");
   //Edge symbol end:'btn_answer_1'

   //=========================================================
   
   //Edge symbol: 'evaluationFrame'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.getSymbol('buttons').$('btn_check').css('cursor','pointer').click(check);
         sym.getSymbol('buttons').$('btn_answer').css('cursor','pointer').click(correctAnswer);
         sym.getSymbol('buttons').$('btn_restart').css('cursor','pointer').click(restart);
         
         // restart
         function restart () {
         	location.reload();
         }
         
         // correctAnswer
         function correctAnswer () {
         	var actualContent = $('#Stage').html();
         
         	$("#Stage").html('<img src="images/solution.png" />');
         	$('#Stage img').on('load', function () {
         		$(this).click(function () {
         			restart();
         		}).css({
         			cursor: 'pointer',
         		});
         	});
         }
         
         // check
         function check () {
         	var finalScore = sym.getParentSymbol().finalScore;
         
         	if (finalScore == 5) {
         		showModal('Brávó, a lehető legkevesebb lépésből megoldottad a feladatot!','happy');
         	} else if (finalScore == 4) {
         		showModal('Ügyes vagy, de gondoltad volna, hogy 5 lépésből is meg lehet oldani a feladatot? Próbáld újra!','happy');
         	} else if (finalScore == 3) {
         		showModal('Kerülővel, de megvan, gondoltad volna, hogy 5 lépésből is meg lehet oldani? Megpróbálod újra?','neutral');
         	} else if (finalScore == 2) {
         		showModal('Alig van jó megoldásod, gyakorolj többet!','neutral');
         	} else if (finalScore == 1) {
         		showModal('Sok gyakorlásra van még szükséged!','sad');
         	} else {
         		showModal('Még nem vagy kész, folytasd!','neutral');
         	}
         }
         
         function showModal (message, smiley) {
         	var globEase = Back;
         	var smiley = smiley;
         	var modal = sym.getSymbol('modal');
         	modal.$(smiley).show();
         	modal.$('text').html(message);
         	TweenMax.fromTo(sym.$('blind'),.5,{autoAlpha:0},{display:'block', autoAlpha:1, ease:globEase.easeOut});
         	TweenMax.fromTo(modal.ele, .5, {scale:0, autoAlpha:0}, {display:'block', scale:1, autoAlpha:1, ease:globEase.easeOut, onComplete: function() {
         			modal.$('btn_close').css('cursor','pointer').click(function() {
         				$(this).off();
         				TweenMax.to(modal.ele, .5, {scale:0, autoAlpha:0, ease:globEase.easeOut});
         				TweenMax.to(sym.$('blind'), .5, {autoAlpha:0, ease:globEase.easeOut, onComplete: function () {
         					modal.$(smiley).hide();
         				}});
         			});
         		}	
         	});
         }

      });
      //Edge binding end

   })("comp_evaluator");
   //Edge symbol end:'comp_evaluator'

   //=========================================================
   
   //Edge symbol: 'btn_answer_1'
   (function(symbolName) {   
   
   })("btn_restart_1");
   //Edge symbol end:'btn_restart_1'

   //=========================================================
   
   //Edge symbol: 'btn_check'
   (function(symbolName) {   
   
   })("btn_check_1");
   //Edge symbol end:'btn_check_1'

   //=========================================================
   
   //Edge symbol: 'btn_close'
   (function(symbolName) {   
   
   })("btn_close_1");
   //Edge symbol end:'btn_close_1'

})(window.jQuery || AdobeEdge.$, AdobeEdge, "EDGE-2603602");

