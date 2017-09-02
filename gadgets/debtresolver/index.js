(function() {
  var eInputList, eInputNew, eRef, parseNumber, sPrecision;

  eRef = document.getElementById("ref--row");

  eInputList = document.getElementById("input--list");

  eInputNew = document.getElementById("input--new");

  sPrecision = document.getElementById("debtresolver--precision");

  parseNumber = function(str) {
    var precision;
    precision = parseInt(sPrecision) || 2;
    return parseInt(parseFloat(str) * Math.pow(10, precision)) / Math.pow(10, precision);
  };

  eInputNew.addEventListener("click", function() {
    var e;
    e = eRef.cloneNode(true);
    e.style.display = null;
    e.id = null;
    e.querySelectorAll(".input--close")[0].addEventListener("click", function() {
      return e.parentNode.removeChild(e);
    });
    return eInputList.insertBefore(e, eInputNew);
  });

  document.getElementById("input--resolve").addEventListener("click", function() {
    var amount, creditor, creditors, debt, debtor, from, i, len, output, ref, row, to, value, values;
    values = {};
    ref = document.getElementsByClassName("input--row");
    for (i = 0, len = ref.length; i < len; i++) {
      row = ref[i];
      if (row.id === "ref--row") {
        continue;
      }
      from = row.querySelectorAll(".input--from")[0].value;
      amount = parseNumber(row.querySelectorAll(".input--amount")[0].value);
      to = row.querySelectorAll(".input--to")[0].value;
      if (!from || !amount || !to) {
        continue;
      }
      if (values[from] == null) {
        values[from] = 0;
      }
      if (values[to] == null) {
        values[to] = 0;
      }
      values[from] -= amount;
      values[to] += amount;
    }
    output = {};
    for (debtor in values) {
      debt = values[debtor];
      if (debt >= 0) {
        continue;
      }
      debt = -debt;
      for (creditor in values) {
        value = values[creditor];
        if (value <= 0) {
          continue;
        }
        if (value >= debt) {
          values[creditor] -= debt;
          values[debtor] = 0;
          if (output[debtor] == null) {
            output[debtor] = {};
          }
          output[debtor][creditor] = debt;
        } else {
          values[creditor] = 0;
          values[debtor] += value;
          if (output[debtor] == null) {
            output[debtor] = {};
          }
          output[debtor][creditor] = value;
        }
        debt = -values[debtor];
        if (debt === 0) {
          break;
        }
      }
      if (debt !== 0) {
        console.error("NON-ZERO DEBT");
        return;
      }
    }
    return document.getElementById("output--temp").innerText = ((function() {
      var results;
      results = [];
      for (debtor in output) {
        creditors = output[debtor];
        results.push((function() {
          var results1;
          results1 = [];
          for (creditor in creditors) {
            value = creditors[creditor];
            results1.push(debtor + " gives " + value + " to " + creditor);
          }
          return results1;
        })());
      }
      return results;
    })()).join("\n");
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9kZWJ0cmVzb2x2ZXIvaW5kZXguanMiLCJzb3VyY2VzIjpbImdhZGdldHMvZGVidHJlc29sdmVyL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtBQUFBLE1BQUE7O0VBQUEsSUFBQSxHQUFPLFFBQVEsQ0FBQyxjQUFULENBQXdCLFVBQXhCOztFQUNQLFVBQUEsR0FBYSxRQUFRLENBQUMsY0FBVCxDQUF3QixhQUF4Qjs7RUFDYixTQUFBLEdBQVksUUFBUSxDQUFDLGNBQVQsQ0FBd0IsWUFBeEI7O0VBQ1osVUFBQSxHQUFhLFFBQVEsQ0FBQyxjQUFULENBQXdCLHlCQUF4Qjs7RUFJYixXQUFBLEdBQWMsU0FBRSxHQUFGO0FBQ2IsUUFBQTtJQUFBLFNBQUEsR0FBWSxRQUFBLENBQVUsVUFBVixDQUFBLElBQTBCO0FBQ3RDLFdBQU8sUUFBQSxDQUFVLFVBQUEsQ0FBWSxHQUFaLENBQUEsWUFBb0IsSUFBTSxVQUFwQyxDQUFBLFlBQWtELElBQU07RUFGbEQ7O0VBTWQsU0FBUyxDQUFDLGdCQUFWLENBQTJCLE9BQTNCLEVBQW9DLFNBQUE7QUFDbkMsUUFBQTtJQUFBLENBQUEsR0FBSSxJQUFJLENBQUMsU0FBTCxDQUFnQixJQUFoQjtJQUNKLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBUixHQUFrQjtJQUNsQixDQUFDLENBQUMsRUFBRixHQUFPO0lBRVAsQ0FBQyxDQUFDLGdCQUFGLENBQW9CLGVBQXBCLENBQXNDLENBQUEsQ0FBQSxDQUFFLENBQUMsZ0JBQXpDLENBQTBELE9BQTFELEVBQW1FLFNBQUE7YUFDbEUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxXQUFiLENBQTBCLENBQTFCO0lBRGtFLENBQW5FO1dBR0EsVUFBVSxDQUFDLFlBQVgsQ0FBeUIsQ0FBekIsRUFBNEIsU0FBNUI7RUFSbUMsQ0FBcEM7O0VBVUEsUUFBUSxDQUFDLGNBQVQsQ0FBeUIsZ0JBQXpCLENBQTJDLENBQUMsZ0JBQTVDLENBQTZELE9BQTdELEVBQXNFLFNBQUE7QUFFckUsUUFBQTtJQUFBLE1BQUEsR0FBUztBQUlUO0FBQUEsU0FBQSxxQ0FBQTs7TUFDQyxJQUFZLEdBQUcsQ0FBQyxFQUFKLEtBQVUsVUFBdEI7QUFBQSxpQkFBQTs7TUFFQSxJQUFBLEdBQU8sR0FBRyxDQUFDLGdCQUFKLENBQXNCLGNBQXRCLENBQXVDLENBQUEsQ0FBQSxDQUFFLENBQUM7TUFDakQsTUFBQSxHQUFTLFdBQUEsQ0FBYSxHQUFHLENBQUMsZ0JBQUosQ0FBc0IsZ0JBQXRCLENBQXlDLENBQUEsQ0FBQSxDQUFFLENBQUMsS0FBekQ7TUFDVCxFQUFBLEdBQUssR0FBRyxDQUFDLGdCQUFKLENBQXNCLFlBQXRCLENBQXFDLENBQUEsQ0FBQSxDQUFFLENBQUM7TUFFN0MsSUFBWSxDQUFJLElBQUosSUFBWSxDQUFJLE1BQWhCLElBQTBCLENBQUksRUFBMUM7QUFBQSxpQkFBQTs7TUFFQSxJQUF3QixvQkFBeEI7UUFBQSxNQUFPLENBQUEsSUFBQSxDQUFQLEdBQWUsRUFBZjs7TUFDQSxJQUFzQixrQkFBdEI7UUFBQSxNQUFPLENBQUEsRUFBQSxDQUFQLEdBQWEsRUFBYjs7TUFDQSxNQUFPLENBQUEsSUFBQSxDQUFQLElBQWdCO01BQ2hCLE1BQU8sQ0FBQSxFQUFBLENBQVAsSUFBYztBQVpmO0lBZ0JBLE1BQUEsR0FBUztBQUVULFNBQUEsZ0JBQUE7O01BRUMsSUFBRyxJQUFBLElBQVEsQ0FBWDtBQUNDLGlCQUREOztNQUdBLElBQUEsR0FBTyxDQUFDO0FBQ1IsV0FBQSxrQkFBQTs7UUFHQyxJQUFHLEtBQUEsSUFBUyxDQUFaO0FBQ0MsbUJBREQ7O1FBR0EsSUFBRyxLQUFBLElBQVMsSUFBWjtVQUVDLE1BQVEsQ0FBQSxRQUFBLENBQVIsSUFBc0I7VUFDdEIsTUFBUSxDQUFBLE1BQUEsQ0FBUixHQUFtQjs7WUFFbkIsTUFBUSxDQUFBLE1BQUEsSUFBWTs7VUFDcEIsTUFBUSxDQUFBLE1BQUEsQ0FBVSxDQUFBLFFBQUEsQ0FBbEIsR0FBK0IsS0FOaEM7U0FBQSxNQUFBO1VBU0MsTUFBUSxDQUFBLFFBQUEsQ0FBUixHQUFxQjtVQUNyQixNQUFRLENBQUEsTUFBQSxDQUFSLElBQW9COztZQUVwQixNQUFRLENBQUEsTUFBQSxJQUFZOztVQUNwQixNQUFRLENBQUEsTUFBQSxDQUFVLENBQUEsUUFBQSxDQUFsQixHQUErQixNQWJoQzs7UUFlQSxJQUFBLEdBQU8sQ0FBQyxNQUFRLENBQUEsTUFBQTtRQUNoQixJQUFHLElBQUEsS0FBUSxDQUFYO0FBQ0MsZ0JBREQ7O0FBdEJEO01BeUJBLElBQUcsSUFBQSxLQUFRLENBQVg7UUFDQyxPQUFPLENBQUMsS0FBUixDQUFjLGVBQWQ7QUFDQSxlQUZEOztBQS9CRDtXQW1DQSxRQUFRLENBQUMsY0FBVCxDQUF5QixjQUF6QixDQUF5QyxDQUFDLFNBQTFDLEdBQXNEOztBQUNyRDtXQUFBLGdCQUFBOzs7O0FBQ0M7ZUFBQSxxQkFBQTs7MEJBQ0ksTUFBRCxHQUFRLFNBQVIsR0FBaUIsS0FBakIsR0FBdUIsTUFBdkIsR0FBNkI7QUFEaEM7OztBQUREOztRQURxRCxDQUlyRCxDQUFDLElBSm9ELENBSTlDLElBSjhDO0VBM0RlLENBQXRFO0FBdkJBIiwic291cmNlc0NvbnRlbnQiOlsiIyMgRWxlbWVudHMgIyNcblxuZVJlZiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwicmVmLS1yb3dcIlxuZUlucHV0TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiaW5wdXQtLWxpc3RcIlxuZUlucHV0TmV3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJpbnB1dC0tbmV3XCJcbnNQcmVjaXNpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImRlYnRyZXNvbHZlci0tcHJlY2lzaW9uXCJcblxuIyMgRnVuY3Rpb25zICMjXG5cbnBhcnNlTnVtYmVyID0gKCBzdHIgKSAtPlxuXHRwcmVjaXNpb24gPSBwYXJzZUludCggc1ByZWNpc2lvbiApIG9yIDJcblx0cmV0dXJuIHBhcnNlSW50KCBwYXJzZUZsb2F0KCBzdHIgKSAqIDEwICoqIHByZWNpc2lvbiApIC8gMTAgKiogcHJlY2lzaW9uXG5cbiMjIEV2ZW50cyAjI1xuXG5lSW5wdXROZXcuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdGUgPSBlUmVmLmNsb25lTm9kZSggdHJ1ZSApXG5cdGUuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0ZS5pZCA9IG51bGxcblxuXHRlLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiLmlucHV0LS1jbG9zZVwiIClbMF0uYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdFx0ZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBlIClcblxuXHRlSW5wdXRMaXN0Lmluc2VydEJlZm9yZSggZSwgZUlucHV0TmV3IClcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwiaW5wdXQtLXJlc29sdmVcIiApLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXG5cdHZhbHVlcyA9IHt9XG5cblx0IyBCdWlsZFxuXG5cdGZvciByb3cgaW4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggXCJpbnB1dC0tcm93XCIgKVxuXHRcdGNvbnRpbnVlIGlmIHJvdy5pZCA9PSBcInJlZi0tcm93XCJcblxuXHRcdGZyb20gPSByb3cucXVlcnlTZWxlY3RvckFsbCggXCIuaW5wdXQtLWZyb21cIiApWzBdLnZhbHVlXG5cdFx0YW1vdW50ID0gcGFyc2VOdW1iZXIoIHJvdy5xdWVyeVNlbGVjdG9yQWxsKCBcIi5pbnB1dC0tYW1vdW50XCIgKVswXS52YWx1ZSApXG5cdFx0dG8gPSByb3cucXVlcnlTZWxlY3RvckFsbCggXCIuaW5wdXQtLXRvXCIgKVswXS52YWx1ZVxuXG5cdFx0Y29udGludWUgaWYgbm90IGZyb20gb3Igbm90IGFtb3VudCBvciBub3QgdG9cblxuXHRcdHZhbHVlc1tmcm9tXSA9IDAgaWYgbm90IHZhbHVlc1tmcm9tXT9cblx0XHR2YWx1ZXNbdG9dID0gMCBpZiBub3QgdmFsdWVzW3RvXT9cblx0XHR2YWx1ZXNbZnJvbV0gLT0gYW1vdW50XG5cdFx0dmFsdWVzW3RvXSArPSBhbW91bnRcblxuXHQjIFJlc29sdmVcblxuXHRvdXRwdXQgPSB7fVxuXG5cdGZvciBkZWJ0b3IsIGRlYnQgb2YgdmFsdWVzXG5cdFx0IyBPbmx5IHJlc29sdmUgcGVvcGxlIHRoYXQgYWN0dWFsbHkgaGF2ZSBkZWJ0XG5cdFx0aWYgZGVidCA+PSAwXG5cdFx0XHRjb250aW51ZVxuXG5cdFx0ZGVidCA9IC1kZWJ0XG5cdFx0Zm9yIGNyZWRpdG9yLCB2YWx1ZSBvZiB2YWx1ZXNcblxuXHRcdFx0IyBPbmx5IG1vdmUgZGVidCB0byBwZW9wbGUgaW4gY3JlZGl0XG5cdFx0XHRpZiB2YWx1ZSA8PSAwXG5cdFx0XHRcdGNvbnRpbnVlXG5cblx0XHRcdGlmIHZhbHVlID49IGRlYnRcblx0XHRcdFx0IyBEZWJ0b3IgY2xlYXJlZFxuXHRcdFx0XHR2YWx1ZXNbIGNyZWRpdG9yIF0gLT0gZGVidFxuXHRcdFx0XHR2YWx1ZXNbIGRlYnRvciBdID0gMFxuXG5cdFx0XHRcdG91dHB1dFsgZGVidG9yIF0gPz0ge31cblx0XHRcdFx0b3V0cHV0WyBkZWJ0b3IgXVsgY3JlZGl0b3IgXSA9IGRlYnRcblx0XHRcdGVsc2Vcblx0XHRcdFx0IyBDcmVkaXRvciBvdXQgb2YgY3JlZGl0XG5cdFx0XHRcdHZhbHVlc1sgY3JlZGl0b3IgXSA9IDBcblx0XHRcdFx0dmFsdWVzWyBkZWJ0b3IgXSArPSB2YWx1ZVxuXG5cdFx0XHRcdG91dHB1dFsgZGVidG9yIF0gPz0ge31cblx0XHRcdFx0b3V0cHV0WyBkZWJ0b3IgXVsgY3JlZGl0b3IgXSA9IHZhbHVlXG5cblx0XHRcdGRlYnQgPSAtdmFsdWVzWyBkZWJ0b3IgXVxuXHRcdFx0aWYgZGVidCA9PSAwXG5cdFx0XHRcdGJyZWFrXG5cblx0XHRpZiBkZWJ0ICE9IDBcblx0XHRcdGNvbnNvbGUuZXJyb3IgXCJOT04tWkVSTyBERUJUXCJcblx0XHRcdHJldHVyblxuXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBcIm91dHB1dC0tdGVtcFwiICkuaW5uZXJUZXh0ID0gKFxuXHRcdGZvciBkZWJ0b3IsIGNyZWRpdG9ycyBvZiBvdXRwdXRcblx0XHRcdGZvciBjcmVkaXRvciwgdmFsdWUgb2YgY3JlZGl0b3JzXG5cdFx0XHRcdFwiI3tkZWJ0b3J9IGdpdmVzICN7dmFsdWV9IHRvICN7Y3JlZGl0b3J9XCJcblx0KS5qb2luKCBcIlxcblwiIClcbiJdfQ==
