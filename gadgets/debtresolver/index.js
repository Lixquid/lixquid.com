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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9kZWJ0cmVzb2x2ZXIvaW5kZXguanMiLCJzb3VyY2VzIjpbImdhZGdldHMvZGVidHJlc29sdmVyL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtBQUFBLE1BQUE7O0VBQUEsSUFBQSxHQUFPLFFBQVEsQ0FBQyxjQUFULENBQXdCLFVBQXhCOztFQUNQLFVBQUEsR0FBYSxRQUFRLENBQUMsY0FBVCxDQUF3QixhQUF4Qjs7RUFDYixTQUFBLEdBQVksUUFBUSxDQUFDLGNBQVQsQ0FBd0IsWUFBeEI7O0VBQ1osYUFBQSxHQUFnQixRQUFRLENBQUMsY0FBVCxDQUF3QixnQkFBeEI7O0VBQ2hCLFVBQUEsR0FBYSxRQUFRLENBQUMsY0FBVCxDQUF3Qix5QkFBeEI7O0VBSWIsV0FBQSxHQUFjLFNBQUUsR0FBRjtBQUNiLFFBQUE7SUFBQSxTQUFBLEdBQVksUUFBQSxDQUFVLFVBQVYsQ0FBQSxJQUEwQjtBQUN0QyxXQUFPLFFBQUEsQ0FBVSxVQUFBLENBQVksR0FBWixDQUFBLFlBQW9CLElBQU0sVUFBcEMsQ0FBQSxZQUFrRCxJQUFNO0VBRmxEOztFQU1kLFNBQVMsQ0FBQyxnQkFBVixDQUEyQixPQUEzQixFQUFvQyxTQUFBO0FBQ25DLFFBQUE7SUFBQSxDQUFBLEdBQUksSUFBSSxDQUFDLFNBQUwsQ0FBZ0IsSUFBaEI7SUFDSixDQUFDLENBQUMsS0FBSyxDQUFDLE9BQVIsR0FBa0I7SUFDbEIsQ0FBQyxDQUFDLEVBQUYsR0FBTztJQUVQLENBQUMsQ0FBQyxnQkFBRixDQUFvQixlQUFwQixDQUFzQyxDQUFBLENBQUEsQ0FBRSxDQUFDLGdCQUF6QyxDQUEwRCxPQUExRCxFQUFtRSxTQUFBO01BQ2xFLENBQUMsQ0FBQyxVQUFVLENBQUMsV0FBYixDQUEwQixDQUExQjtNQUNBLElBQUcsUUFBUSxDQUFDLHNCQUFULENBQWlDLFlBQWpDLENBQStDLENBQUMsTUFBaEQsSUFBMEQsQ0FBN0Q7ZUFDQyxhQUFhLENBQUMsUUFBZCxHQUF5QixLQUQxQjs7SUFGa0UsQ0FBbkU7SUFLQSxVQUFVLENBQUMsWUFBWCxDQUF5QixDQUF6QixFQUE0QixTQUE1QjtXQUNBLGFBQWEsQ0FBQyxRQUFkLEdBQXlCO0VBWFUsQ0FBcEM7O0VBYUEsYUFBYSxDQUFDLGdCQUFkLENBQStCLE9BQS9CLEVBQXdDLFNBQUE7QUFFdkMsUUFBQTtJQUFBLE1BQUEsR0FBUztBQUlUO0FBQUEsU0FBQSxxQ0FBQTs7TUFDQyxJQUFZLEdBQUcsQ0FBQyxFQUFKLEtBQVUsVUFBdEI7QUFBQSxpQkFBQTs7TUFFQSxJQUFBLEdBQU8sR0FBRyxDQUFDLGdCQUFKLENBQXNCLGNBQXRCLENBQXVDLENBQUEsQ0FBQSxDQUFFLENBQUM7TUFDakQsTUFBQSxHQUFTLFdBQUEsQ0FBYSxHQUFHLENBQUMsZ0JBQUosQ0FBc0IsZ0JBQXRCLENBQXlDLENBQUEsQ0FBQSxDQUFFLENBQUMsS0FBekQ7TUFDVCxFQUFBLEdBQUssR0FBRyxDQUFDLGdCQUFKLENBQXNCLFlBQXRCLENBQXFDLENBQUEsQ0FBQSxDQUFFLENBQUM7TUFFN0MsSUFBWSxDQUFJLElBQUosSUFBWSxDQUFJLE1BQWhCLElBQTBCLENBQUksRUFBMUM7QUFBQSxpQkFBQTs7TUFFQSxJQUF3QixvQkFBeEI7UUFBQSxNQUFPLENBQUEsSUFBQSxDQUFQLEdBQWUsRUFBZjs7TUFDQSxJQUFzQixrQkFBdEI7UUFBQSxNQUFPLENBQUEsRUFBQSxDQUFQLEdBQWEsRUFBYjs7TUFDQSxNQUFPLENBQUEsSUFBQSxDQUFQLElBQWdCO01BQ2hCLE1BQU8sQ0FBQSxFQUFBLENBQVAsSUFBYztBQVpmO0lBZ0JBLE1BQUEsR0FBUztBQUVULFNBQUEsZ0JBQUE7O01BRUMsSUFBRyxJQUFBLElBQVEsQ0FBWDtBQUNDLGlCQUREOztNQUdBLElBQUEsR0FBTyxDQUFDO0FBQ1IsV0FBQSxrQkFBQTs7UUFHQyxJQUFHLEtBQUEsSUFBUyxDQUFaO0FBQ0MsbUJBREQ7O1FBR0EsSUFBRyxLQUFBLElBQVMsSUFBWjtVQUVDLE1BQVEsQ0FBQSxRQUFBLENBQVIsSUFBc0I7VUFDdEIsTUFBUSxDQUFBLE1BQUEsQ0FBUixHQUFtQjs7WUFFbkIsTUFBUSxDQUFBLE1BQUEsSUFBWTs7VUFDcEIsTUFBUSxDQUFBLE1BQUEsQ0FBVSxDQUFBLFFBQUEsQ0FBbEIsR0FBK0IsS0FOaEM7U0FBQSxNQUFBO1VBU0MsTUFBUSxDQUFBLFFBQUEsQ0FBUixHQUFxQjtVQUNyQixNQUFRLENBQUEsTUFBQSxDQUFSLElBQW9COztZQUVwQixNQUFRLENBQUEsTUFBQSxJQUFZOztVQUNwQixNQUFRLENBQUEsTUFBQSxDQUFVLENBQUEsUUFBQSxDQUFsQixHQUErQixNQWJoQzs7UUFlQSxJQUFBLEdBQU8sQ0FBQyxNQUFRLENBQUEsTUFBQTtRQUNoQixJQUFHLElBQUEsS0FBUSxDQUFYO0FBQ0MsZ0JBREQ7O0FBdEJEO01BeUJBLElBQUcsSUFBQSxLQUFRLENBQVg7UUFDQyxPQUFPLENBQUMsS0FBUixDQUFjLGVBQWQ7QUFDQSxlQUZEOztBQS9CRDtXQW1DQSxRQUFRLENBQUMsY0FBVCxDQUF5QixjQUF6QixDQUF5QyxDQUFDLFNBQTFDLEdBQXNEOztBQUNyRDtXQUFBLGdCQUFBOzs7O0FBQ0M7ZUFBQSxxQkFBQTs7MEJBQ0ksTUFBRCxHQUFRLFNBQVIsR0FBaUIsS0FBakIsR0FBdUIsTUFBdkIsR0FBNkI7QUFEaEM7OztBQUREOztRQURxRCxDQUlyRCxDQUFDLElBSm9ELENBSTlDLElBSjhDO0VBM0RmLENBQXhDO0FBM0JBIiwic291cmNlc0NvbnRlbnQiOlsiIyMgRWxlbWVudHMgIyNcblxuZVJlZiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwicmVmLS1yb3dcIlxuZUlucHV0TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiaW5wdXQtLWxpc3RcIlxuZUlucHV0TmV3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJpbnB1dC0tbmV3XCJcbmVJbnB1dFJlc29sdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImlucHV0LS1yZXNvbHZlXCJcbnNQcmVjaXNpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImRlYnRyZXNvbHZlci0tcHJlY2lzaW9uXCJcblxuIyMgRnVuY3Rpb25zICMjXG5cbnBhcnNlTnVtYmVyID0gKCBzdHIgKSAtPlxuXHRwcmVjaXNpb24gPSBwYXJzZUludCggc1ByZWNpc2lvbiApIG9yIDJcblx0cmV0dXJuIHBhcnNlSW50KCBwYXJzZUZsb2F0KCBzdHIgKSAqIDEwICoqIHByZWNpc2lvbiApIC8gMTAgKiogcHJlY2lzaW9uXG5cbiMjIEV2ZW50cyAjI1xuXG5lSW5wdXROZXcuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdGUgPSBlUmVmLmNsb25lTm9kZSggdHJ1ZSApXG5cdGUuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0ZS5pZCA9IG51bGxcblxuXHRlLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiLmlucHV0LS1jbG9zZVwiIClbMF0uYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdFx0ZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBlIClcblx0XHRpZiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBcImlucHV0LS1yb3dcIiApLmxlbmd0aCA8PSAxXG5cdFx0XHRlSW5wdXRSZXNvbHZlLmRpc2FibGVkID0gdHJ1ZVxuXG5cdGVJbnB1dExpc3QuaW5zZXJ0QmVmb3JlKCBlLCBlSW5wdXROZXcgKVxuXHRlSW5wdXRSZXNvbHZlLmRpc2FibGVkID0gZmFsc2VcblxuZUlucHV0UmVzb2x2ZS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgLT5cblxuXHR2YWx1ZXMgPSB7fVxuXG5cdCMgQnVpbGRcblxuXHRmb3Igcm93IGluIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoIFwiaW5wdXQtLXJvd1wiIClcblx0XHRjb250aW51ZSBpZiByb3cuaWQgPT0gXCJyZWYtLXJvd1wiXG5cblx0XHRmcm9tID0gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoIFwiLmlucHV0LS1mcm9tXCIgKVswXS52YWx1ZVxuXHRcdGFtb3VudCA9IHBhcnNlTnVtYmVyKCByb3cucXVlcnlTZWxlY3RvckFsbCggXCIuaW5wdXQtLWFtb3VudFwiIClbMF0udmFsdWUgKVxuXHRcdHRvID0gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoIFwiLmlucHV0LS10b1wiIClbMF0udmFsdWVcblxuXHRcdGNvbnRpbnVlIGlmIG5vdCBmcm9tIG9yIG5vdCBhbW91bnQgb3Igbm90IHRvXG5cblx0XHR2YWx1ZXNbZnJvbV0gPSAwIGlmIG5vdCB2YWx1ZXNbZnJvbV0/XG5cdFx0dmFsdWVzW3RvXSA9IDAgaWYgbm90IHZhbHVlc1t0b10/XG5cdFx0dmFsdWVzW2Zyb21dIC09IGFtb3VudFxuXHRcdHZhbHVlc1t0b10gKz0gYW1vdW50XG5cblx0IyBSZXNvbHZlXG5cblx0b3V0cHV0ID0ge31cblxuXHRmb3IgZGVidG9yLCBkZWJ0IG9mIHZhbHVlc1xuXHRcdCMgT25seSByZXNvbHZlIHBlb3BsZSB0aGF0IGFjdHVhbGx5IGhhdmUgZGVidFxuXHRcdGlmIGRlYnQgPj0gMFxuXHRcdFx0Y29udGludWVcblxuXHRcdGRlYnQgPSAtZGVidFxuXHRcdGZvciBjcmVkaXRvciwgdmFsdWUgb2YgdmFsdWVzXG5cblx0XHRcdCMgT25seSBtb3ZlIGRlYnQgdG8gcGVvcGxlIGluIGNyZWRpdFxuXHRcdFx0aWYgdmFsdWUgPD0gMFxuXHRcdFx0XHRjb250aW51ZVxuXG5cdFx0XHRpZiB2YWx1ZSA+PSBkZWJ0XG5cdFx0XHRcdCMgRGVidG9yIGNsZWFyZWRcblx0XHRcdFx0dmFsdWVzWyBjcmVkaXRvciBdIC09IGRlYnRcblx0XHRcdFx0dmFsdWVzWyBkZWJ0b3IgXSA9IDBcblxuXHRcdFx0XHRvdXRwdXRbIGRlYnRvciBdID89IHt9XG5cdFx0XHRcdG91dHB1dFsgZGVidG9yIF1bIGNyZWRpdG9yIF0gPSBkZWJ0XG5cdFx0XHRlbHNlXG5cdFx0XHRcdCMgQ3JlZGl0b3Igb3V0IG9mIGNyZWRpdFxuXHRcdFx0XHR2YWx1ZXNbIGNyZWRpdG9yIF0gPSAwXG5cdFx0XHRcdHZhbHVlc1sgZGVidG9yIF0gKz0gdmFsdWVcblxuXHRcdFx0XHRvdXRwdXRbIGRlYnRvciBdID89IHt9XG5cdFx0XHRcdG91dHB1dFsgZGVidG9yIF1bIGNyZWRpdG9yIF0gPSB2YWx1ZVxuXG5cdFx0XHRkZWJ0ID0gLXZhbHVlc1sgZGVidG9yIF1cblx0XHRcdGlmIGRlYnQgPT0gMFxuXHRcdFx0XHRicmVha1xuXG5cdFx0aWYgZGVidCAhPSAwXG5cdFx0XHRjb25zb2xlLmVycm9yIFwiTk9OLVpFUk8gREVCVFwiXG5cdFx0XHRyZXR1cm5cblxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJvdXRwdXQtLXRlbXBcIiApLmlubmVyVGV4dCA9IChcblx0XHRmb3IgZGVidG9yLCBjcmVkaXRvcnMgb2Ygb3V0cHV0XG5cdFx0XHRmb3IgY3JlZGl0b3IsIHZhbHVlIG9mIGNyZWRpdG9yc1xuXHRcdFx0XHRcIiN7ZGVidG9yfSBnaXZlcyAje3ZhbHVlfSB0byAje2NyZWRpdG9yfVwiXG5cdCkuam9pbiggXCJcXG5cIiApXG4iXX0=
