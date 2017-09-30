(function() {
  var change_prec, eInputList, eInputNew, eInputResolve, eRef, parseNumber, sPrecision;

  eRef = document.getElementById("ref--row");

  eInputList = document.getElementById("input--list");

  eInputNew = document.getElementById("input--new");

  eInputResolve = document.getElementById("input--resolve");

  sPrecision = document.getElementById("debtresolver--precision");

  parseNumber = function(str) {
    var precision, ref;
    precision = (ref = parseInt(sPrecision.value)) != null ? ref : 2;
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

  change_prec = function() {
    var e, i, len, precision, ref, ref1, results;
    precision = (ref = parseInt(sPrecision.value)) != null ? ref : 2;
    ref1 = document.getElementsByClassName("input--amount");
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      e = ref1[i];
      e.placeholder = "0" + (precision > 0 ? "." : "") + "0".repeat(precision);
      console.log(e.placeholder);
      results.push(e.step = Math.pow(0.1, precision));
    }
    return results;
  };

  sPrecision.addEventListener("change", change_prec);

  change_prec();

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9kZWJ0cmVzb2x2ZXIvaW5kZXguanMiLCJzb3VyY2VzIjpbImdhZGdldHMvZGVidHJlc29sdmVyL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtBQUFBLE1BQUE7O0VBQUEsSUFBQSxHQUFPLFFBQVEsQ0FBQyxjQUFULENBQXdCLFVBQXhCOztFQUNQLFVBQUEsR0FBYSxRQUFRLENBQUMsY0FBVCxDQUF3QixhQUF4Qjs7RUFDYixTQUFBLEdBQVksUUFBUSxDQUFDLGNBQVQsQ0FBd0IsWUFBeEI7O0VBQ1osYUFBQSxHQUFnQixRQUFRLENBQUMsY0FBVCxDQUF3QixnQkFBeEI7O0VBQ2hCLFVBQUEsR0FBYSxRQUFRLENBQUMsY0FBVCxDQUF3Qix5QkFBeEI7O0VBSWIsV0FBQSxHQUFjLFNBQUUsR0FBRjtBQUNiLFFBQUE7SUFBQSxTQUFBLHNEQUEyQztBQUMzQyxXQUFPLFFBQUEsQ0FBVSxVQUFBLENBQVksR0FBWixDQUFBLFlBQW9CLElBQU0sVUFBcEMsQ0FBQSxZQUFrRCxJQUFNO0VBRmxEOztFQU1kLFNBQVMsQ0FBQyxnQkFBVixDQUEyQixPQUEzQixFQUFvQyxTQUFBO0FBQ25DLFFBQUE7SUFBQSxDQUFBLEdBQUksSUFBSSxDQUFDLFNBQUwsQ0FBZ0IsSUFBaEI7SUFDSixDQUFDLENBQUMsS0FBSyxDQUFDLE9BQVIsR0FBa0I7SUFDbEIsQ0FBQyxDQUFDLEVBQUYsR0FBTztJQUVQLENBQUMsQ0FBQyxnQkFBRixDQUFvQixlQUFwQixDQUFzQyxDQUFBLENBQUEsQ0FBRSxDQUFDLGdCQUF6QyxDQUEwRCxPQUExRCxFQUFtRSxTQUFBO01BQ2xFLENBQUMsQ0FBQyxVQUFVLENBQUMsV0FBYixDQUEwQixDQUExQjtNQUNBLElBQUcsUUFBUSxDQUFDLHNCQUFULENBQWlDLFlBQWpDLENBQStDLENBQUMsTUFBaEQsSUFBMEQsQ0FBN0Q7ZUFDQyxhQUFhLENBQUMsUUFBZCxHQUF5QixLQUQxQjs7SUFGa0UsQ0FBbkU7SUFLQSxV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Q0FJckQsQ0FBQyxJQUpvRCxDQUk5QyxJQUo4QztFQTNEZixDQUF4QztBQXRDQSIsInNvdXJjZXNDb250ZW50IjpbIiMjIEVsZW1lbnRzICMjXG5cbmVSZWYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcInJlZi0tcm93XCJcbmVJbnB1dExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImlucHV0LS1saXN0XCJcbmVJbnB1dE5ldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiaW5wdXQtLW5ld1wiXG5lSW5wdXRSZXNvbHZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJpbnB1dC0tcmVzb2x2ZVwiXG5zUHJlY2lzaW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJkZWJ0cmVzb2x2ZXItLXByZWNpc2lvblwiXG5cbiMjIEZ1bmN0aW9ucyAjI1xuXG5wYXJzZU51bWJlciA9ICggc3RyICkgLT5cblx0cHJlY2lzaW9uID0gcGFyc2VJbnQoIHNQcmVjaXNpb24udmFsdWUgKSA/IDJcblx0cmV0dXJuIHBhcnNlSW50KCBwYXJzZUZsb2F0KCBzdHIgKSAqIDEwICoqIHByZWNpc2lvbiApIC8gMTAgKiogcHJlY2lzaW9uXG5cbiMjIEV2ZW50cyAjI1xuXG5lSW5wdXROZXcuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdGUgPSBlUmVmLmNsb25lTm9kZSggdHJ1ZSApXG5cdGUuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0ZS5pZCA9IG51bGxcblxuXHRlLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiLmlucHV0LS1jbG9zZVwiIClbMF0uYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdFx0ZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBlIClcblx0XHRpZiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBcImlucHV0LS1yb3dcIiApLmxlbmd0aCA8PSAxXG5cdFx0XHRlSW5wdXRSZXNvbHZlLmRpc2FibGVkID0gdHJ1ZVxuXG5cdGVJbnB1dExpc3QuaW5zZXJ0QmVmb3JlKCBlLCBlSW5wdXROZXcgKVxuXHRlSW5wdXRSZXNvbHZlLmRpc2FibGVkID0gZmFsc2VcblxuY2hhbmdlX3ByZWMgPSAtPlxuXHRwcmVjaXNpb24gPSBwYXJzZUludCggc1ByZWNpc2lvbi52YWx1ZSApID8gMlxuXHRmb3IgZSBpbiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBcImlucHV0LS1hbW91bnRcIiApXG5cdFx0ZS5wbGFjZWhvbGRlciA9IFwiMFwiICtcblx0XHRcdCggaWYgcHJlY2lzaW9uID4gMCB0aGVuIFwiLlwiIGVsc2UgXCJcIiApICtcblx0XHRcdFwiMFwiLnJlcGVhdCBwcmVjaXNpb25cblx0XHRjb25zb2xlLmxvZyBlLnBsYWNlaG9sZGVyXG5cdFx0ZS5zdGVwID0gMC4xICoqIHByZWNpc2lvblxuc1ByZWNpc2lvbi5hZGRFdmVudExpc3RlbmVyIFwiY2hhbmdlXCIsIGNoYW5nZV9wcmVjXG5jaGFuZ2VfcHJlYygpXG5cbmVJbnB1dFJlc29sdmUuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cblx0dmFsdWVzID0ge31cblxuXHQjIEJ1aWxkXG5cblx0Zm9yIHJvdyBpbiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBcImlucHV0LS1yb3dcIiApXG5cdFx0Y29udGludWUgaWYgcm93LmlkID09IFwicmVmLS1yb3dcIlxuXG5cdFx0ZnJvbSA9IHJvdy5xdWVyeVNlbGVjdG9yQWxsKCBcIi5pbnB1dC0tZnJvbVwiIClbMF0udmFsdWVcblx0XHRhbW91bnQgPSBwYXJzZU51bWJlciggcm93LnF1ZXJ5U2VsZWN0b3JBbGwoIFwiLmlucHV0LS1hbW91bnRcIiApWzBdLnZhbHVlIClcblx0XHR0byA9IHJvdy5xdWVyeVNlbGVjdG9yQWxsKCBcIi5pbnB1dC0tdG9cIiApWzBdLnZhbHVlXG5cblx0XHRjb250aW51ZSBpZiBub3QgZnJvbSBvciBub3QgYW1vdW50IG9yIG5vdCB0b1xuXG5cdFx0dmFsdWVzW2Zyb21dID0gMCBpZiBub3QgdmFsdWVzW2Zyb21dP1xuXHRcdHZhbHVlc1t0b10gPSAwIGlmIG5vdCB2YWx1ZXNbdG9dP1xuXHRcdHZhbHVlc1tmcm9tXSAtPSBhbW91bnRcblx0XHR2YWx1ZXNbdG9dICs9IGFtb3VudFxuXG5cdCMgUmVzb2x2ZVxuXG5cdG91dHB1dCA9IHt9XG5cblx0Zm9yIGRlYnRvciwgZGVidCBvZiB2YWx1ZXNcblx0XHQjIE9ubHkgcmVzb2x2ZSBwZW9wbGUgdGhhdCBhY3R1YWxseSBoYXZlIGRlYnRcblx0XHRpZiBkZWJ0ID49IDBcblx0XHRcdGNvbnRpbnVlXG5cblx0XHRkZWJ0ID0gLWRlYnRcblx0XHRmb3IgY3JlZGl0b3IsIHZhbHVlIG9mIHZhbHVlc1xuXG5cdFx0XHQjIE9ubHkgbW92ZSBkZWJ0IHRvIHBlb3BsZSBpbiBjcmVkaXRcblx0XHRcdGlmIHZhbHVlIDw9IDBcblx0XHRcdFx0Y29udGludWVcblxuXHRcdFx0aWYgdmFsdWUgPj0gZGVidFxuXHRcdFx0XHQjIERlYnRvciBjbGVhcmVkXG5cdFx0XHRcdHZhbHVlc1sgY3JlZGl0b3IgXSAtPSBkZWJ0XG5cdFx0XHRcdHZhbHVlc1sgZGVidG9yIF0gPSAwXG5cblx0XHRcdFx0b3V0cHV0WyBkZWJ0b3IgXSA/PSB7fVxuXHRcdFx0XHRvdXRwdXRbIGRlYnRvciBdWyBjcmVkaXRvciBdID0gZGVidFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHQjIENyZWRpdG9yIG91dCBvZiBjcmVkaXRcblx0XHRcdFx0dmFsdWVzWyBjcmVkaXRvciBdID0gMFxuXHRcdFx0XHR2YWx1ZXNbIGRlYnRvciBdICs9IHZhbHVlXG5cblx0XHRcdFx0b3V0cHV0WyBkZWJ0b3IgXSA/PSB7fVxuXHRcdFx0XHRvdXRwdXRbIGRlYnRvciBdWyBjcmVkaXRvciBdID0gdmFsdWVcblxuXHRcdFx0ZGVidCA9IC12YWx1ZXNbIGRlYnRvciBdXG5cdFx0XHRpZiBkZWJ0ID09IDBcblx0XHRcdFx0YnJlYWtcblxuXHRcdGlmIGRlYnQgIT0gMFxuXHRcdFx0Y29uc29sZS5lcnJvciBcIk5PTi1aRVJPIERFQlRcIlxuXHRcdFx0cmV0dXJuXG5cblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwib3V0cHV0LS10ZW1wXCIgKS5pbm5lclRleHQgPSAoXG5cdFx0Zm9yIGRlYnRvciwgY3JlZGl0b3JzIG9mIG91dHB1dFxuXHRcdFx0Zm9yIGNyZWRpdG9yLCB2YWx1ZSBvZiBjcmVkaXRvcnNcblx0XHRcdFx0XCIje2RlYnRvcn0gZ2l2ZXMgI3t2YWx1ZX0gdG8gI3tjcmVkaXRvcn1cIlxuXHQpLmpvaW4oIFwiXFxuXCIgKVxuIl19
