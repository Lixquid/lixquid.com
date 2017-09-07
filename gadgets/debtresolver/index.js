(function() {
  var eInputList, eInputNew, eInputResolve, eRef, parseNumber, sPrecision;

  eRef = document.getElementById("ref--row");

  eInputList = document.getElementById("input--list");

  eInputNew = document.getElementById("input--new");

  eInputResolve = document.getElementById("input--resolve");

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
      e.parentNode.removeChild(e);
      if (document.getElementsByClassName("input--row").length <= 1) {
        return eInputResolve.disabled = true;
      }
    });
    eInputList.insertBefore(e, eInputNew);
    return eInputResolve.disabled = false;
  });

  eInputResolve.addEventListener("click", function() {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9kZWJ0cmVzb2x2ZXIvaW5kZXguanMiLCJzb3VyY2VzIjpbImdhZGdldHMvZGVidHJlc29sdmVyL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtBQUFBLE1BQUE7O0VBQUEsSUFBQSxHQUFPLFFBQVEsQ0FBQyxjQUFULENBQXdCLFVBQXhCOztFQUNQLFVBQUEsR0FBYSxRQUFRLENBQUMsY0FBVCxDQUF3QixhQUF4Qjs7RUFDYixTQUFBLEdBQVksUUFBUSxDQUFDLGNBQVQsQ0FBd0IsWUFBeEI7O0VBQ1osYUFBQSxHQUFnQixRQUFRLENBQUMsY0FBVCxDQUF3QixnQkFBeEI7O0VBQ2hCLFVBQUEsR0FBYSxRQUFRLENBQUMsY0FBVCxDQUF3Qix5QkFBeEI7O0VBSWIsV0FBQSxHQUFjLFNBQUUsR0FBRjtBQUNiLFFBQUE7SUFBQSxTQUFBLEdBQVksUUFBQSxDQUFVLFVBQVYsQ0FBQSxJQUEwQjtBQUN0QyxXQUFPLFFBQUEsQ0FBVSxVQUFBLENBQVksR0FBWixDQUFBLFlBQW9CLElBQU0sVUFBcEMsQ0FBQSxZQUFrRCxJQUFNO0VBRmxEOztFQU1kLFNBQVMsQ0FBQyxnQkFBVixDQUEyQixPQUEzQixFQUFvQyxTQUFBO0FBQ25DLFFBQUE7SUFBQSxDQUFBLEdBQUksSUFBSSxDQUFDLFNBQUwsQ0FBZ0IsSUFBaEI7SUFDSixDQUFDLENBQUMsS0FBSyxDQUFDLE9BQVIsR0FBa0I7SUFDbEIsQ0FBQyxDQUFDLEVBQUYsR0FBTztJQUVQLENBQUMsQ0FBQyxnQkFBRixDQUFvQixlQUFwQixDQUFzQyxDQUFBLENBQUEsQ0FBRSxDQUFDLGdCQUF6QyxDQUEwRCxPQUExRCxFQUFtRSxTQUFBO01BQ2xFLENBQUMsQ0FBQyxVQUFVLENBQUMsV0FBYixDQUEwQixDQUExQjtNQUNBLElBQUcsUUFBUSxDQUFDLHNCQUFULENBQWlDLFlBQWpDLENBQStDLENBQUMsTUFBaEQsSUFBMEQsQ0FBN0Q7ZUFDQyxhQUFhLENBQUMsUUFBZCxHQUF5QixLQUQxQjs7SUFGa0UsQ0FBbkU7SUFLQSxVQUFVLENBQUMsWUFBWCxDQUF5QixDQUF6QixFQUE0QixTQUE1QjtXQUNBLGFBQWEsQ0FBQyxRQUFkLEdBQXlCO0VBWFUsQ0FBcEM7O0VBYUEsYUFBYSxDQUFDLGdCQUFkLENBQStCLE9BQS9CLEVBQXdDLFNBQUE7QUFFdkMsUUFBQTtJQUFBLE1BQUEsR0FBUztBQUlUO0FBQUEsU0FBQSxxQ0FBQTs7TUFDQyxJQUFZLEdBQUcsQ0FBQyxFQUFKLEtBQVUsVUFBdEI7QUFBQSxpQkFBQTs7TUFFQSxJQUFBLEdBQU8sR0FBRyxDQUFDLGdCQUFKLENBQXNCLGNBQXRCLENBQXVDLENBQUEsQ0FBQSxDQUFFLENBQUM7TUFDakQsTUFBQSxHQUFTLFdBQUEsQ0FBYSxHQUFHLENBQUMsZ0JBQUosQ0FBc0IsZ0JBQXRCLENBQXlDLENBQUEsQ0FBQSxDQUFFLENBQUMsS0FBekQ7TUFDVCxFQUFBLEdBQUssR0FBRyxDQUFDLGdCQUFKLENBQXNCLFlBQXRCLENBQXFDLENBQUEsQ0FBQSxDQUFFLENBQUM7TUFFN0MsSUFBWSxDQUFJLElBQUosSUFBWSxDQUFJLE1BQWhCLElBQTBCLENBQUksRUFBMUM7QUFBQSxpQkFBQTs7TUFFQSxJQUF3QixvQkFBeEI7UUFBQSxNQUFPLENBQUEsSUFBQSxDQUFQLEdBQWUsRUFBZjs7TUFDQSxJQUFzQixrQkFBdEI7UUFBQSxNQUFPLENBQUEsRUFBQSxDQUFQLEdBQWEsRUFBYjs7TUFDQSxNQUFPLENBQUEsSUFBQSxDQUFQLElBQWdCO01BQ2hCLE1BQU8sQ0FBQSxFQUFBLENBQVAsSUFBYztBQVpmO0lBZ0JBLE1BQUEsR0FBUztBQUVULFNBQUEsZ0JBQUE7O01BRUMsSUFBRyxJQUFBLElBQVEsQ0FBWDtBQUNDLGlCQUREOztNQUdBLElBQUEsR0FBTyxDQUFDO0FBQ1IsV0FBQSxrQkFBQTs7UUFHQyxJQUFHLEtBQUEsSUFBUyxDQUFaO0FBQ0MsbUJBREQ7O1FBR0EsSUFBRyxLQUFBLElBQVMsSUFBWjtVQUVDLE1BQVEsQ0FBQSxRQUFBLENBQVIsSUFBc0I7VUFDdEIsTUFBUSxDQUFBLE1BQUEsQ0FBUixHQUFtQjs7WUFFbkIsTUFBUSxDQUFBLE1BQUEsSUFBWTs7VUFDcEIsTUFBUSxDQUFBLE1BQUEsQ0FBVSxDQUFBLFFBQUEsQ0FBbEIsR0FBK0IsS0FOaEM7U0FBQSxNQUFBO1VBU0MsTUFBUSxDQUFBLFFBQUEsQ0FBUixHQUFxQjtVQUNyQixNQUFRLENBQUEsTUFBQSxDQUFSLElBQW9COztZQUVwQixNQUFRLENBQUEsTUFBQSxJQUFZOztVQUNwQixNQUFRLENBQUEsTUFBQSxDQUFVLENBQUEsUUFBQSxDQUFsQixHQUErQixNQWJoQzs7UUFlQSxJQUFBLEdBQU8sQ0FBQyxNQUFRLENBQUEsTUFBQTtRQUNoQixJQUFHLElBQUEsS0FBUSxDQUFYO0FBQ0MsZ0JBREQ7O0FBdEJEO01BeUJBLElBQUcsSUFBQSxLQUFRLENBQVg7UUFDQyxPQUFPLENBQUMsS0FBUixDQUFjLGVBQWQ7QUFDQSxlQUZEOztBQS9CRDtXQW1DQSxRQUFRLENBQUMsY0FBVCxDQUF5QixjQUF6QixDQUF5QyxDQUFDLFNBQTFDLEdBQXNEOztBQUNyRDtXQUFBLGdCQUFBOzs7O0FBQ0M7ZUFBQSxxQkFBQTs7MEJBQ0ksTUFBRCxHQUFRLFNBQVIsR0FBaUIsS0FBakIsR0FBdUIsTUFBdkIsR0FBNkI7QUFEaEM7OztBQUREOztRQURxRCxDQUlyRCxDQUFDLElBSm9ELENBSTlDLElBSjhDO0VBM0RmLENBQXhDO0FBM0JBIiwic291cmNlc0NvbnRlbnQiOlsiIyMgRWxlbWVudHMgIyNcclxuXHJcbmVSZWYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcInJlZi0tcm93XCJcclxuZUlucHV0TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiaW5wdXQtLWxpc3RcIlxyXG5lSW5wdXROZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImlucHV0LS1uZXdcIlxyXG5lSW5wdXRSZXNvbHZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJpbnB1dC0tcmVzb2x2ZVwiXHJcbnNQcmVjaXNpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImRlYnRyZXNvbHZlci0tcHJlY2lzaW9uXCJcclxuXHJcbiMjIEZ1bmN0aW9ucyAjI1xyXG5cclxucGFyc2VOdW1iZXIgPSAoIHN0ciApIC0+XHJcblx0cHJlY2lzaW9uID0gcGFyc2VJbnQoIHNQcmVjaXNpb24gKSBvciAyXHJcblx0cmV0dXJuIHBhcnNlSW50KCBwYXJzZUZsb2F0KCBzdHIgKSAqIDEwICoqIHByZWNpc2lvbiApIC8gMTAgKiogcHJlY2lzaW9uXHJcblxyXG4jIyBFdmVudHMgIyNcclxuXHJcbmVJbnB1dE5ldy5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgLT5cclxuXHRlID0gZVJlZi5jbG9uZU5vZGUoIHRydWUgKVxyXG5cdGUuc3R5bGUuZGlzcGxheSA9IG51bGxcclxuXHRlLmlkID0gbnVsbFxyXG5cclxuXHRlLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiLmlucHV0LS1jbG9zZVwiIClbMF0uYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XHJcblx0XHRlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIGUgKVxyXG5cdFx0aWYgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggXCJpbnB1dC0tcm93XCIgKS5sZW5ndGggPD0gMVxyXG5cdFx0XHRlSW5wdXRSZXNvbHZlLmRpc2FibGVkID0gdHJ1ZVxyXG5cclxuXHRlSW5wdXRMaXN0Lmluc2VydEJlZm9yZSggZSwgZUlucHV0TmV3IClcclxuXHRlSW5wdXRSZXNvbHZlLmRpc2FibGVkID0gZmFsc2VcclxuXHJcbmVJbnB1dFJlc29sdmUuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XHJcblxyXG5cdHZhbHVlcyA9IHt9XHJcblxyXG5cdCMgQnVpbGRcclxuXHJcblx0Zm9yIHJvdyBpbiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBcImlucHV0LS1yb3dcIiApXHJcblx0XHRjb250aW51ZSBpZiByb3cuaWQgPT0gXCJyZWYtLXJvd1wiXHJcblxyXG5cdFx0ZnJvbSA9IHJvdy5xdWVyeVNlbGVjdG9yQWxsKCBcIi5pbnB1dC0tZnJvbVwiIClbMF0udmFsdWVcclxuXHRcdGFtb3VudCA9IHBhcnNlTnVtYmVyKCByb3cucXVlcnlTZWxlY3RvckFsbCggXCIuaW5wdXQtLWFtb3VudFwiIClbMF0udmFsdWUgKVxyXG5cdFx0dG8gPSByb3cucXVlcnlTZWxlY3RvckFsbCggXCIuaW5wdXQtLXRvXCIgKVswXS52YWx1ZVxyXG5cclxuXHRcdGNvbnRpbnVlIGlmIG5vdCBmcm9tIG9yIG5vdCBhbW91bnQgb3Igbm90IHRvXHJcblxyXG5cdFx0dmFsdWVzW2Zyb21dID0gMCBpZiBub3QgdmFsdWVzW2Zyb21dP1xyXG5cdFx0dmFsdWVzW3RvXSA9IDAgaWYgbm90IHZhbHVlc1t0b10/XHJcblx0XHR2YWx1ZXNbZnJvbV0gLT0gYW1vdW50XHJcblx0XHR2YWx1ZXNbdG9dICs9IGFtb3VudFxyXG5cclxuXHQjIFJlc29sdmVcclxuXHJcblx0b3V0cHV0ID0ge31cclxuXHJcblx0Zm9yIGRlYnRvciwgZGVidCBvZiB2YWx1ZXNcclxuXHRcdCMgT25seSByZXNvbHZlIHBlb3BsZSB0aGF0IGFjdHVhbGx5IGhhdmUgZGVidFxyXG5cdFx0aWYgZGVidCA+PSAwXHJcblx0XHRcdGNvbnRpbnVlXHJcblxyXG5cdFx0ZGVidCA9IC1kZWJ0XHJcblx0XHRmb3IgY3JlZGl0b3IsIHZhbHVlIG9mIHZhbHVlc1xyXG5cclxuXHRcdFx0IyBPbmx5IG1vdmUgZGVidCB0byBwZW9wbGUgaW4gY3JlZGl0XHJcblx0XHRcdGlmIHZhbHVlIDw9IDBcclxuXHRcdFx0XHRjb250aW51ZVxyXG5cclxuXHRcdFx0aWYgdmFsdWUgPj0gZGVidFxyXG5cdFx0XHRcdCMgRGVidG9yIGNsZWFyZWRcclxuXHRcdFx0XHR2YWx1ZXNbIGNyZWRpdG9yIF0gLT0gZGVidFxyXG5cdFx0XHRcdHZhbHVlc1sgZGVidG9yIF0gPSAwXHJcblxyXG5cdFx0XHRcdG91dHB1dFsgZGVidG9yIF0gPz0ge31cclxuXHRcdFx0XHRvdXRwdXRbIGRlYnRvciBdWyBjcmVkaXRvciBdID0gZGVidFxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0IyBDcmVkaXRvciBvdXQgb2YgY3JlZGl0XHJcblx0XHRcdFx0dmFsdWVzWyBjcmVkaXRvciBdID0gMFxyXG5cdFx0XHRcdHZhbHVlc1sgZGVidG9yIF0gKz0gdmFsdWVcclxuXHJcblx0XHRcdFx0b3V0cHV0WyBkZWJ0b3IgXSA/PSB7fVxyXG5cdFx0XHRcdG91dHB1dFsgZGVidG9yIF1bIGNyZWRpdG9yIF0gPSB2YWx1ZVxyXG5cclxuXHRcdFx0ZGVidCA9IC12YWx1ZXNbIGRlYnRvciBdXHJcblx0XHRcdGlmIGRlYnQgPT0gMFxyXG5cdFx0XHRcdGJyZWFrXHJcblxyXG5cdFx0aWYgZGVidCAhPSAwXHJcblx0XHRcdGNvbnNvbGUuZXJyb3IgXCJOT04tWkVSTyBERUJUXCJcclxuXHRcdFx0cmV0dXJuXHJcblxyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBcIm91dHB1dC0tdGVtcFwiICkuaW5uZXJUZXh0ID0gKFxyXG5cdFx0Zm9yIGRlYnRvciwgY3JlZGl0b3JzIG9mIG91dHB1dFxyXG5cdFx0XHRmb3IgY3JlZGl0b3IsIHZhbHVlIG9mIGNyZWRpdG9yc1xyXG5cdFx0XHRcdFwiI3tkZWJ0b3J9IGdpdmVzICN7dmFsdWV9IHRvICN7Y3JlZGl0b3J9XCJcclxuXHQpLmpvaW4oIFwiXFxuXCIgKVxyXG4iXX0=
