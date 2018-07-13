(function () {
    var _container = null;

    function gen(container, width, height) {
        console.log("generate field", container, width, height);
        var table = $('<table/>');
        for (var row = 0; row < height; ++row) {
            var tr = $('<tr/>');
            for (var col = 0; col < width; ++col) {
                var td = $('<td></td>');
                tr.append(td);

                td.click(function () {
                    triggerCell(this, 'active');
                });
                td.dblclick(function () {
                    triggerCell(this, 'wall', { multi: true, trugger: true });
                });
            }
            table.append(tr);
        }

        _container = $(container);
        _container.empty().append(table);

        triggerCell(table.find('td:first'), 'start');
        triggerCell(table.find('td:first'), 'active');
        triggerCell(table.find('td:last'), 'finish');
    }

    function triggerCell(cell, className, opt) {
        opt = opt || {};
        if (!opt.multi) {
            _container.find('.' + className).removeClass(className);
        }
        var cellVariable = $(cell);
        cellVariable.toggleClass(className);
    }

    function getData() {
        var tablerows = _container.find('tr');
        var start = {};
        var finish = {};
        var dataRows = $.map(tablerows, function (tr, rowIndex) {
            var tablecells = $(tr).find('td');
            var dataCells = $.map(tablecells, function (td, colIndex) {
                if ($(td).hasClass('start')) {
                    start.row = rowIndex;
                    start.col = colIndex;
                };
                if ($(td).hasClass('finish')) {
                    finish.row = rowIndex;
                    finish.col = colIndex;
                };
                return {
                    val: $(td).hasClass('wall') ? 1 : 0
                };
            });
            return { cells: dataCells };
        });

        return {
            rows: dataRows,
            start: start,
            finish: finish
        };
    }

    function showResult(result) {
        _container.find('.path').removeClass('path');

        for (var i = 0; i < result.length; ++i) {
            $($(_container.find('tr')[result[i].row]).find('td')[result[i].col]).addClass('path');
        }
    }

    window.AStarFieldDesigner = {
        generate: gen,
        setStart: function () {
            triggerCell(_container.find('td.active'), 'start');
        },
        setFinish: function () {
            triggerCell(_container.find('td.active'), 'finish');
        },
        getFieldData: getData,
        showResult: showResult
    };

})();