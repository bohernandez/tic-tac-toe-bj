var app = angular.module('tictactoe', []);

app.controller('gamecontroller', function ($scope) {
    
    
    var cells = ['','','','','','','','',''];
    var currentMark = 'o';
    var empty = true;
    /* try without scope */
    moves = 1;
    gameover = false;
    grid = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    $scope.playerOneScore = 0;
    $scope.playerTwoScore = 0;
    
    $scope.cells = cells;
    
    $scope.drawMark = function(index){
        if (gameover == false && cells[index] == ''){
            if (currentMark == 'o') {
                $scope.cells[index] = 'x';
                currentMark = 'x';
            } else {
                $scope.cells[index] = 'o';
                currentMark = 'o';
            }
            var row = Math.floor(index/3);
            var column = (index % 3);
            grid[row][column] = currentMark;
            if (gameover == false) evaluateWin();
            
        }
       
    }
    
    
    var evaluateWin = function() {
        //alert("here!!");
        var num_d_x = 0, num_d_o=0, diag_cel="";
        var num_di_x = 0, num_di_o=0, diagInv_cel="";
        var flag_draw = false;
        
        
        for (var i=0; i < grid.length ; i++) {
            diag_cel = grid[i][i];
            if (diag_cel == 'x') num_d_x++;
            else if (diag_cel == 'o') num_d_o++;
            
            diagInv_cel = grid[i][(grid.length-1)-i];
            if (diagInv_cel == 'x') num_di_x++;
            else if (diagInv_cel == 'o') num_di_o++;
            
            var num_x = 0, num_o=0, row_cel="";
            var num_c_x = 0, num_c_o=0, col_cel="";
            
            
            for (var j=0; j < grid[i].length ; j++) {
                row_cel = grid[i][j];
                if (row_cel == 'x') num_x++;
                else if (row_cel == 'o') num_o++;
                
                col_cel = grid[j][i];
                if (col_cel == 'x') num_c_x++; 
                else if (col_cel == 'o') num_c_o++;
            }
            
            
            if ((num_x == grid.length) || (num_c_x == grid.length) || (num_d_x == grid.length) || (num_di_x == grid.length)){
                xwin();
            } else if((num_o == grid.length) || (num_c_o == grid.length) || (num_d_o == grid.length) || (num_di_o == grid.length)){
                owin();
            }
        }
        
        if (moves == 9 && gameover != true) {
			var messagebox = document.getElementById('message');
			$scope.playerOneMessage = "draw...";
			$scope.playerTwoMessage = "draw...";
		} else {
			moves += 1;
		}
	}

	$scope.setName1 = function(player1) {
		$scope.player1 = '';
	}

	$scope.setName2 = function(player2) {
		$scope.player2 = '';
	}

	var xwin = function () {
		$scope.playerOneMessage = $scope.player1 + " wins!";
		gameover = true;
		$scope.playerOneScore += 1;
	}

	var owin = function () {
		$scope.playerTwoMessage = $scope.player2 + " wins!";
		gameover = true;
		$scope.playerTwoScore += 1;
	}

	$scope.clearBoard = function() {
		for (var j = 0; j < cells.length; j++) {
			$scope.cells[j] = '';
		}
		$scope.playerOneMessage = "";
		$scope.playerTwoMessage = "";
		currentMark = 'o';
		var empty = true;
		moves = 1;
		gameover = false;
		grid = [
				[ "" , "" , "" ],
				[ "" , "" , "" ],
				[ "" , "" , "" ]
		];
	};
	
    
});