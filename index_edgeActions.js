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
         
         	var board = {
         		field_1:{count:1, column:1, row:1, isObject:true, name:'start'},
         		field_2:{count:2, column:2, row:1, isObject:false, name:'bokor'},
         		field_3:{count:3, column:3, row:1, isObject:false, name:'macska'},
         		field_4:{count:4, column:4, row:1, isObject:false, name:'hal'},
         		field_5:{count:5, column:5, row:1, isObject:true, name:'babakocsi'},
         
         		field_6:{count:6,column:1, row:2, isObject:false, name:'csiga'},
         		field_7:{count:7,column:2, row:2, isObject:true, name:'kocka'},
         		field_8:{count:8,column:3, row:2, isObject:true, name:'labda'},
         		field_9:{count:9,column:4, row:2, isObject:false, name:'kutya'},
         		field_10:{count:10,column:5, row:2, isObject:false, name:'kacsa'},
         
         		field_11:{count:11,column:1, row:3, isObject:true, name:'kocsi'},
         		field_12:{count:12,column:2, row:3, isObject:false, name:'fa'},
         		field_13:{count:13,column:3, row:3, isObject:true, name:'lámpa'},
         		field_14:{count:14,column:4, row:3, isObject:true, name:'bögre'},
         		field_15:{count:15, column:5, row:3, isObject:false, name:'katica'},
         
         		field_16:{count:16,column:1, row:4, isObject:true, name:'esernyő'},
         		field_17:{count:17,column:2, row:4, isObject:false, name:'virág'},
         		field_18:{count:18,column:3, row:4, isObject:true, name:'gumikacsa'},
         		field_19:{count:19,column:4, row:4, isObject:false, name:'sün'},
         		field_20:{count:20,column:5, row:4, isObject:false, name:'béka'},
         
         		field_21:{count:21,column:1, row:5, isObject:false, name:'mókus'},
         		field_22:{count:22,column:2, row:5, isObject:true, name:'locsolókanna'},
         		field_23:{count:23,column:3, row:5, isObject:false, name:'csecsemő'},
         		field_24:{count:24,column:4, row:5, isObject:false, name:'fenyő'},
         		field_25:{count:25,column:5, row:5, isObject:true, name:'cél'}
         	}
         
         	console.log(board);
         
         	var possibleClicks = [1];
         
         	$.each(board,function(name,value){
         
         		var symbol = sym.getSymbol('board').getSymbol(name);
         		var jQSymbol = sym.getSymbol('board').$(name);
         		var object = value;
         
         		symbol.$('number').html(value.count);
         
         		jQSymbol.css('cursor','pointer').click(function(e){
         
         			totalHits++;
         
         			if (arrayContains(object.count,possibleClicks) && object.isObject) {
         				$('.fields').css('background','transparent');
         				jQSymbol.css('background','rgba(50,255,0,.2)');
         				TweenMax.to(symbol.$('tick'),.5,{scale:1,autoAlpha:1,ease:Elastic.easeOut});
         				possibleClicks = possibleNextFields(object);
         				console.log(possibleClicks);
         				hits++;
         				updateScore (hits,totalHits);
         				console.log("+++"+object.count+"+++");
         
         				if (object.count == 25) {
         					sym.finalScore = 5;
         					sym.$('Score').html("Hurrá, célba jutottál! ("+hits+" / "+totalHits+")");
         					sym.$('board').children().css('cursor','default').off();
         				}
         
         			} else if (arrayContains(object.count,possibleClicks) && !object.isObject) {
         				updateScore (hits,totalHits);
         			 	TweenMax.to(symbol.$('cross'),.5,{scale:1,autoAlpha:1,ease:Elastic.easeOut});
         			 	$(this).css('cursor','default').off();
         			}
         
         		})
         
         	});
         
         	function arrayContains(number, array) {
         		return array.indexOf(number) != -1 ? true : false;
         	}
         
         	function updateScore (hits,totalHits) {
         		sym.$('Score').html(hits+" / "+totalHits);
         	}
         
         	function possibleNextFields(object) {
         		var list = [];
         		var d = [];
         		var object = object;
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
         		showModal('Tökéletes!','happy');
         	} else if (finalScore == 4) {
         		showModal('Ügyes vagy, megoldásod nem tökéletes, figyelj jobban!','neutral');
         	} else if (finalScore == 3) {
         		showModal('Szedd össze magad, lesz ez jobb is!','neutral');
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

