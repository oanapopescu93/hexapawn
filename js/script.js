var game;
var canvas_width = 600;
var canvas_height = 600;
var box = [canvas_width/3, canvas_height/3]
var piece = 100;
var canvas, ctx;
var font = 'bold 20px sans-serif';

var game_squares = [];
var game_pieces_you = [];
var game_pieces_enemy = [];
var make_move = 0;
var move = 0;
var piece_selected;
var enemy_moves = [];
var my_selected_piece; 
var message = '';
var game_history = [];
var who_array = [];

$(document).ready(function(){
	enemy_moves = enemy_moves_data;
	
	var date = new Date();
	date = date.getFullYear();
	$('#copyright_year').text(date);

	setTimeout(function(){
		game = new hex_game('canvas_hexapawn');
		game.ready();
		
		$('#button_instructions').off('click').on('click', function(event) {
			$('#instructions_container').toggleClass('open');
		});
		$('.close').off('click').on('click', function(event) {
			$('#instructions_container').removeClass('open');
		});
		
		$('#button_restart').off('click').on('click', function(event) {
			game.restart();
		});
	}, 100);	
});

function hex_game(id){
	var self = this;
    var div_id = '#'+id;    
	
	this.ready = function(){
        $(div_id).append('<canvas></canvas>');
		self.enemy_moves_data();
		self.main_structure();		
	}
	
	this.restart = function(){
		game_pieces_you = [];
		game_pieces_enemy = [];
		make_move = 0;
		move = 0;
		game_history = [];

		self.drawSquares();
        self.drawPieces();
	}
	
	this.main_structure = function(){
        self.createCanvas(canvas_width, canvas_height);
        self.drawSquares();
        self.drawPieces();
        self.game_click();
    }

	this.enemy_moves_data = function(){  
		var cookie_history = document.cookie.split('; ')
		for(var i in cookie_history){			
			if(typeof getCookie(cookie_history[i]) != "undefined" || getCookie(cookie_history[i]) == "" || getCookie(cookie_history[i]) == null || getCookie(cookie_history[i]) == "null"){
				var index = cookie_history[i].indexOf("=");
				var name = cookie_history[i].substr(0, index);
				var value = cookie_history[i].substr(index+1, cookie_history.length);
				for(var j in enemy_moves){
					for(var k in enemy_moves[j]){
						if(enemy_moves[j][k].pattern_id == name){
							console.log(enemy_moves[j][k])
							for(var t in enemy_moves[j][k].choice){
								if(value == enemy_moves[j][k].choice[t].c){
									//distroy choices that made enemy lose
									enemy_moves[j][k].choice.splice(t, 1); 
								}	
							}
						}
					}
				}
			}
		}
    }

    this.createCanvas = function(canvas_width, canvas_height){        
		canvas = $("canvas")[0];
		ctx = canvas.getContext("2d");	
		
		if (window.innerWidth < 960){
			if(window.innerHeight < window.innerWidth){
				//small landscape				
				canvas_width = 600;
				canvas_height = 600;
				piece = 100;
				font = 'bold 20px sans-serif';				
			} else {
				//small portrait
				canvas_width = 300;
				canvas_height = 300;
				piece = 50;
				font = 'bold 16px sans-serif';
			}			
		} else {
			//big
			canvas_width = 600;
			canvas_height = 600;
			piece = 100;
			font = 'bold 20px sans-serif';
		}
		box = [canvas_width/3, canvas_height/3]
		canvas.width  = canvas_width;
		canvas.height = canvas_height;
	}

    this.drawSquares = function(){
        ctx.clearRect(0,0, canvas_width, canvas_height);
        for(var i=0; i<3; i++){
            for(var j=0; j<3; j++){
                draw_rect(i*box[0], j*box[1], box[0], box[1], 'black', 2, 'red')
                var obj = {x: i*box[0], y: j*box[1], width: box[0], height: box[1]}
                game_squares.push(obj);
            }
        }
    }

    this.drawPieces = function(piece_selected={}){ 
        var space = [-10, 5];
        var obj = {};
        var new_game = false;
        if(game_pieces_you.length == 0){
            new_game = true;
        }
		if(Object.keys(piece_selected).length != 0){
			draw_rect(piece_selected.x, piece_selected.y, box[0], box[1], 'rgba(255, 0, 0, 0.1)', 0, 'transparent');
		}
		
        for(var i=0; i<3; i++){
            if(new_game){
				//enemy            
				self.drawPiece(i*box[0]+box[0]/2, 0*box[1]+box[1]/2, piece/2, 0, piece, false, 'black', 2, 'red', 'B'+i, i*box[0]+box[0]/2+space[0], 0*box[1]+box[1]/2+space[1], 'red');
				obj = {i: i, x: i*box[0], y: 0*box[1], width:piece, height:piece, eaten: false}
				game_pieces_enemy.push(obj);
				//you
                self.drawPiece(i*box[0]+box[0]/2, 2*box[1]+box[1]/2, piece/2, 0, piece, false, 'red', 2, 'red', 'A'+i, i*box[0]+box[0]/2+space[0], 2*box[1]+box[1]/2+space[1], 'black');
                obj = {i: i, x: i*box[0], y: 2*box[1], width:piece, height:piece, eaten: false}
                game_pieces_you.push(obj);
            } else {
				//enemy  
				if(game_pieces_enemy[i].eaten == false){
					self.drawPiece(game_pieces_enemy[i].x+box[0]/2, game_pieces_enemy[i].y+box[1]/2, piece/2, 0, piece, false, 'black', 2, 'red', 'B'+i, game_pieces_enemy[i].x+box[0]/2+space[0], game_pieces_enemy[i].y+box[1]/2+space[1], 'red');
				}
				//you
				if(game_pieces_you[i].eaten == false){
					self.drawPiece(game_pieces_you[i].x+box[0]/2, game_pieces_you[i].y+box[1]/2, game_pieces_you[i].width/4, 0, piece, false, 'red', 2, 'red', 'A'+i, game_pieces_you[i].x+box[0]/2+space[0], game_pieces_you[i].y+box[1]/2+space[1], 'black');
				}
			} 
        }
    }

    this.drawPiece = function(x, y, r,sAngle,eAngle,counterclockwise, fillStyle, lineWidth, strokeStyle, text, text_x, text_y, text_color){
		ctx.shadowBlur = 10;		
		draw_dot(x, y, r,sAngle,eAngle,counterclockwise, fillStyle, lineWidth, strokeStyle);
		ctx.shadowBlur = 0;
		ctx.fillStyle = text_color;
        ctx.font = font; 
		ctx.fillText(text, text_x, text_y);
	}	

    this.game_click = function(){
		$(div_id+' canvas').off('click').on('click', function(event) {
			self.canvas_click(canvas, event);
		});
		$(div_id+' canvas').off('mousemove').on('mousemove', function(event) {
			var mousePos = getMousePos(canvas, event);	
			$(div_id+' canvas').css('cursor', "default")
			for(var i in game_pieces_you){
				var obj = game_pieces_you[i];
				obj.width = box[0];
				obj.height = box[1];
				if (isInside(mousePos,obj)) {
					$(div_id+' canvas').css('cursor', "pointer")				
				} 
			}
		});
	}
	
    this.canvas_click = function(canvas, event){		
		var mousePos = getMousePos(canvas, event); 
		
        for(var i in game_squares){
            var obj = game_squares[i];
            if (isInside(mousePos,obj)) {
                if(make_move == 1){
                    if(self.validate_move(my_selected_piece, obj, game_pieces_enemy)){
						make_move = 0;
                        if(self.attack_move(game_pieces_enemy, obj)){							
							//attack
							for(var i in game_pieces_enemy){
								if(game_pieces_enemy[i].x == obj.x && game_pieces_enemy[i].y == obj.y){
									game_pieces_enemy[i].width = 0;
									game_pieces_enemy[i].height = 0;
									game_pieces_enemy[i].eaten = true;
								}
							}
						} else {
							//just move piece		
						} 
						self.change_your_pos(obj, piece_selected);			
						var check_win = self.check_win(game_pieces_you, game_pieces_enemy, false);

						if(typeof check_win == "undefined"){
							if(my_selected_piece.x == obj.x && my_selected_piece.y == obj.y){
								//selected a piece then you changed your mind	
							} else {
								//select a piece then you move it							
								self.enemy_makes_move();
								check_win = self.check_win(game_pieces_you, game_pieces_enemy, true);
								if(typeof check_win !== "undefined"){
									self.end_game(check_win + ' won!!!', 1000, check_win);
								}	
							}
						} else {	
							self.end_game(check_win + ' won!!!', 1000, check_win);
						}
						
						self.drawSquares();
						self.drawPieces();		
                    } else {
						//some errors
						self.end_game(message, 0);
                    }                  
                } else {		
					my_selected_piece = obj;	
                    for(var i in game_pieces_you){
                        if(game_pieces_you[i].x == obj.x && game_pieces_you[i].y == obj.y){
                            if(make_move == 0){
                                make_move++;
                                piece_selected = game_pieces_you[i];
								self.drawSquares();
								self.drawPieces(piece_selected);
                            } 
                            break;                     
                        }
                    }
                }
                break;
            } 
        }
    }

	this.end_game = function(text, milisecs, who){
		if(typeof who != "undefined"){
			who_array.push(who);		
		}
		
		if(who == "you"){
			deleteAllCookies();
			for(var i in game_history){			
				setCookie(game_history[i].pattern_id,game_history[i].choice,30)
			}
		}

		$('#win_array').empty();		
		for(var i in who_array){
			if(i == who_array.length-1){
				$('#win_array').append(who_array[i])
			} else {
				$('#win_array').append(who_array[i]+', ')
			}
		}

		setTimeout(function(){
			alert(text)
		}, milisecs);
	}

    this.enemy_makes_move = function(){ 
        var choices; 
		var not_eaten_you = 0;
		var not_eaten_enemy = 0;
		
		for(var i in game_pieces_you){
			if(!game_pieces_you[i].eaten){
				not_eaten_you++
			}
			if(!game_pieces_enemy[i].eaten){
				not_eaten_enemy++
			}
		}

        for(var i in enemy_moves[move]){
            var pattern = enemy_moves[move][i].pattern; 
			
            //find pattern you
			var t_you=0;
			for(var j in pattern.you){
				for(var k in game_pieces_you){
					if(pattern.you[j].x == game_pieces_you[k].x && pattern.you[j].y == game_pieces_you[k].y){
						t_you++
						break;
					}
				}
			}
			
			//find pattern enemy
			var t_enemy=0;
			for(var j in pattern.enemy){
				for(var k in game_pieces_enemy){
					if(pattern.enemy[j].x == game_pieces_enemy[k].x && pattern.enemy[j].y == game_pieces_enemy[k].y){
						t_enemy++
						break;
					}
				}
			}
			
			if(t_you == pattern.you.length && t_enemy == pattern.enemy.length && t_you == not_eaten_you && t_enemy == not_eaten_enemy){
				choices = enemy_moves[move][i].choice;
				var min = 0;
				var max = choices.length-1;		
				var random_choice = Math.floor((Math.random() * max) + min);
				self.conflict(choices[random_choice])				
				var x = {pattern_id:enemy_moves[move][i].pattern_id, choice:choices[random_choice].c}
				game_history.push(x)
				move++;
				break;				
			} 
        }        
    }

    this.attack_move = function(game_pieces, obj){
        var attack = false;        
        for(var i in game_pieces){
            if(game_pieces[i].x == obj.x && game_pieces[i].y == obj.y){
                attack = true;
                break;                     
            }
        }
        return attack;
    }

	this.check_win = function(game_pieces_you, game_pieces_enemy, move){
		var game_win;		
		
		//out of moves
		if(move){
			var out_of_moves = 0;
			var not_eaten = 0;
			for(var i in game_pieces_you){
				if(!game_pieces_you[i].eaten){
					not_eaten++;
					for(var j in game_pieces_enemy){
						if(!game_pieces_enemy[j].eaten){
							if(game_pieces_you[i].x == game_pieces_enemy[j].x && game_pieces_you[i].y-200 == game_pieces_enemy[j].y){
								out_of_moves++;
							}
						}
					}
				}
			}
			if(not_eaten == out_of_moves){
				game_win = 'enemy';
			}
		}

		var t_you = 0;
		for(var i in game_pieces_you){
			if(game_pieces_you[i].eaten){
				t_you++;
			}
		}
		if(t_you == game_pieces_you.length){
			//if all your pieces are eaten
			game_win = 'enemy';
		} else {
			var t_enemy = 0;
			for(var i in game_pieces_enemy){
				if(game_pieces_enemy[i].eaten){
					t_enemy++;
				}
			}
			if(t_enemy == game_pieces_enemy.length){
				//if all enemy pieces are eaten
				game_win = 'you';
			} else {
				//if you arrived at the top
				for(var i in game_pieces_you){
					if(game_pieces_you[i].y == 0){
						game_win = 'you';
						break;
					}
				}
				//if enemy arrived at the bottom
				for(var i in game_pieces_enemy){
					if(game_pieces_enemy[i].y == 400){
						game_win = 'enemy';
						break
					}
				}
			}
		}		
		
		return game_win;
	}
	
	this.validate_move = function(prev, next, game_pieces_enemy){
        var validate = false; 
		var x1, x2, y1, y2;
		if(typeof prev != "undefined" && typeof next != "undefined"){
			x1 = prev.x;
			y1 = prev.y;
			x2 = next.x;
			y2 = next.y;
		}
		
		if(y2 > y1){
			//check back moves	
			message = "Invalid move! You can't move back.";
		} else if(y2 == y1 && x2 != x1){
			//check left/right moves	
			message = "Invalid move! You can't move left or right.";
		} else if((x1+200==x2 && y1-200==y2) || (x1-200==x2 && y1-200==y2)){
			//check diagonal moves			
			for(var i in game_pieces_enemy){
				if(x2 == game_pieces_enemy[i].x && y2 == game_pieces_enemy[i].y){
					validate = true;
					break;
				} else {
					message = "Invalid move! You can't move diagonally if you don't attack.";
				}
			}
		} else if(x2 == x1 && y2 != y1){
			//check up moves to attack
			validate = true
			for(var i in game_pieces_enemy){
				if(game_pieces_enemy[i].x == x1 && game_pieces_enemy[i].y == y2){
					validate = false;
					message = "Invalid move! You can only attack on diagonal.";
					break;
				}
			}			
		} else {
			validate = true
		}

        return validate;
    }

    this.change_your_pos = function(obj, piece_selected){
        piece_selected.x = obj.x;
        piece_selected.y = obj.y;
    }
	
	this.conflict = function(choice){	
		for(var i in game_pieces_you){
			if(!game_pieces_you[i].eaten){
				if(game_pieces_you[i].x == choice.x2 && game_pieces_you[i].y == choice.y2){
					game_pieces_you[i].width = 0;
					game_pieces_you[i].height = 0;
					game_pieces_you[i].eaten = true;
				}
			}
		}		
		for(var i in game_pieces_enemy){
			if(game_pieces_enemy[i].x == choice.x1 && game_pieces_enemy[i].y == choice.y1){
				game_pieces_enemy[i].x = choice.x2;
				game_pieces_enemy[i].y = choice.y2;
				break;
			}
		}
	}
}

function getMousePos(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}	
function isInside(mousePos, obj){
	return mousePos.x > obj.x && mousePos.x < obj.x + obj.width && mousePos.y < obj.y + obj.height && mousePos.y > obj.y
}

function draw_dot(x, y, r,sAngle,eAngle,counterclockwise, fillStyle, lineWidth, strokeStyle){
	ctx.beginPath();
	ctx.arc(x, y, r, sAngle, eAngle, counterclockwise);
	ctx.fillStyle = fillStyle;
	if(strokeStyle !== ""){
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = strokeStyle;
		ctx.stroke();
	}		
	ctx.fill();
	ctx.closePath();
}
function draw_rect(x, y, width, height, fillStyle, lineWidth, strokeStyle){
	ctx.beginPath();
	ctx.rect(x, y, width, height);
	ctx.fillStyle = fillStyle;
	if(strokeStyle !== ""){
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = strokeStyle;
		ctx.stroke();
	}		
	ctx.fill();
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
    }
    return "";
}
function setCookie(cname,cvalue,exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
