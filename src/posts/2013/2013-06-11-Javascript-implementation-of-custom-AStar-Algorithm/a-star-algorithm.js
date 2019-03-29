(function() {
  var _openList = [];
  var _closedList = [];
  var _currentCell = null;

  /*fieldData expected to be in following format:
        {
            rows: [
                cells: [
                    {val: 0}, //val 0 - show that the cell is empty
                    {val: 1}, //val 1 - cell is busy and can't be used
                    ...
                ],
                ...
            ],
            start: {    //index of start point
                row: 0,
                col: 0
            },
            finish: {    //index of finish point
                row: 0,
                col: 0
            }
        }
        */
  function run(fieldData) {
    console.log("AStarAlgorithm run", fieldData);

    _openList = [];
    _closedList = [];
    _currentCell = null;

    fieldData.start.F = 0;
    fieldData.start.H = 0;
    fieldData.start.G = 0;
    _openList.push(fieldData.start); // 1
    var iteration = 0;
    while (iteration < 1000) {
      ++iteration;
      var minFI = getMinFCellIndex(); // 2-a
      _currentCell = _openList[minFI];
      _closedList.push(_currentCell); // 2-b
      _currentCell.closed = true;

      if (_currentCell.row == fieldData.finish.row && _currentCell.col == fieldData.finish.col) {
        //finish point in the closed list;
        break;
      }

      _openList.splice(minFI, 1); //remove current from open list

      //Check neighbours
      var c = _currentCell;
      var neighbours = [
        { row: c.row - 1, col: c.col - 1, G: 14 },
        { row: c.row - 1, col: c.col, G: 10 },
        { row: c.row - 1, col: c.col + 1, G: 14 },
        { row: c.row, col: c.col - 1, G: 10 },
        /*{ row: c.row, col: c.col}, */ { row: c.row, col: c.col + 1, G: 10 },
        { row: c.row + 1, col: c.col - 1, G: 14 },
        { row: c.row + 1, col: c.col, G: 10 },
        { row: c.row + 1, col: c.col + 1, G: 14 }
      ];
      for (var ni = 0; ni < neighbours.length; ++ni) {
        //2-c
        var nC = neighbours[ni];
        if (nC.row < 0 || nC.row > fieldData.rows.length - 1) {
          continue; //out of field case
        }
        if (nC.col < 0 || nC.col > fieldData.rows[nC.row].cells.length - 1) {
          continue; //out of field case
        }
        var cell = fieldData.rows[nC.row].cells[nC.col];
        if (cell.val == 1) {
          continue; //cell is busy
        }
        if (cell.closed) {
          continue; //cell in  _closedList
        }
        cell.row = nC.row;
        cell.col = nC.col;

        if (!cell.open) {
          // 2-c-2
          _openList.push(cell);
          cell.open = true;
          cell.parent = _currentCell;
          cell.G = nC.G;
          cell.H = getH(cell, fieldData.finish);
          cell.F = cell.G + cell.H;
        } else {
          // 2-c-3
          if (nC.G < cell.G) {
            cell.G = nC.G;
            cell.F = cell.G + cell.H;
            cell.parent = _currentCell;
          }
        }
      }
    }

    // Get the result chain
    var p = _currentCell;
    var result = [];
    while (p != null) {
      result.push(p);
      p = p.parent;
    }

    return {
      iterations: iteration,
      count: result.length,
      cells: result
    };
  }

  function getH(c1, c2) {
    return 10 * (Math.abs(c1.row - c2.row) + Math.abs(c1.col - c2.col));
  }

  function getMinFCellIndex() {
    var minIndex = 0;
    var minFValue = _openList[0].F;
    for (var i = 1; i < _openList.length; ++i) {
      if (_openList[i].F < minFValue) {
        minIndex = i;
        minFValue = _openList[i].F;
      }
    }
    return minIndex;
  }

  window.AStarAlgorithm = {
    run: run
  };
})();
