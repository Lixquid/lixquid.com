(function() {
  var eCase, eEscapes, eFind, eInput, eMultiline, eRegex, eReplace, eWhole, escapeInput, escapeReplace;

  eFind = document.getElementById("input--find");

  eReplace = document.getElementById("input--replace");

  eCase = document.getElementById("input--case");

  eWhole = document.getElementById("input--whole");

  eRegex = document.getElementById("input--regex");

  eMultiline = document.getElementById("input--multiline");

  eEscapes = document.getElementById("input--escapes");

  eInput = document.getElementById("input--input");

  escapeInput = function(str) {
    return str.replace(/[^a-zA-Z0-9 ]/g, "\\$&");
  };

  escapeReplace = function(str) {
    return str.replace(/\$/g, "$$$$");
  };

  document.getElementById("input--match").addEventListener("click", function() {
    var input, regex, replace;
    input = eFind.value;
    replace = eReplace.value;
    if (!eRegex.checked) {
      input = escapeInput(input);
    }
    if (eWhole.checked) {
      input = "\\b" + input + "\\b";
    }
    if (!eEscapes.checked) {
      replace = escapeReplace(replace);
    }
    regex = new RegExp(input, "g" + (eCase.checked ? "i" : "") + (eMultiline.checked ? "m" : ""));
    return eInput.value = eInput.value.replace(regex, replace);
  });

  eRegex.addEventListener("change", function() {
    if (eRegex.checked) {
      eFind.style.fontFamily = "monospace";
    } else {
      eFind.style.fontFamily = null;
    }
    return eMultiline.disabled = !eRegex.checked;
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9maW5kYW5kcmVwbGFjZS9pbmRleC5qcyIsInNvdXJjZXMiOlsiZ2FkZ2V0cy9maW5kYW5kcmVwbGFjZS9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7QUFBQSxNQUFBOztFQUFBLEtBQUEsR0FBUSxRQUFRLENBQUMsY0FBVCxDQUF3QixhQUF4Qjs7RUFDUixRQUFBLEdBQVcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsZ0JBQXhCOztFQUNYLEtBQUEsR0FBUSxRQUFRLENBQUMsY0FBVCxDQUF3QixhQUF4Qjs7RUFDUixNQUFBLEdBQVMsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsY0FBeEI7O0VBQ1QsTUFBQSxHQUFTLFFBQVEsQ0FBQyxjQUFULENBQXdCLGNBQXhCOztFQUNULFVBQUEsR0FBYSxRQUFRLENBQUMsY0FBVCxDQUF3QixrQkFBeEI7O0VBQ2IsUUFBQSxHQUFXLFFBQVEsQ0FBQyxjQUFULENBQXdCLGdCQUF4Qjs7RUFDWCxNQUFBLEdBQVMsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsY0FBeEI7O0VBSVQsV0FBQSxHQUFjLFNBQUUsR0FBRjtXQUFXLEdBQUcsQ0FBQyxPQUFKLENBQVksZ0JBQVosRUFBOEIsTUFBOUI7RUFBWDs7RUFDZCxhQUFBLEdBQWdCLFNBQUUsR0FBRjtXQUFXLEdBQUcsQ0FBQyxPQUFKLENBQVksS0FBWixFQUFtQixNQUFuQjtFQUFYOztFQUloQixRQUFRLENBQUMsY0FBVCxDQUF5QixjQUF6QixDQUF5QyxDQUFDLGdCQUExQyxDQUEyRCxPQUEzRCxFQUFvRSxTQUFBO0FBQ25FLFFBQUE7SUFBQSxLQUFBLEdBQVEsS0FBSyxDQUFDO0lBQ2QsT0FBQSxHQUFVLFFBQVEsQ0FBQztJQUVuQixJQUFHLENBQUksTUFBTSxDQUFDLE9BQWQ7TUFDQyxLQUFBLEdBQVEsV0FBQSxDQUFhLEtBQWIsRUFEVDs7SUFFQSxJQUFHLE1BQU0sQ0FBQyxPQUFWO01BQ0MsS0FBQSxHQUFRLEtBQUEsR0FBUSxLQUFSLEdBQWdCLE1BRHpCOztJQUVBLElBQUcsQ0FBSSxRQUFRLENBQUMsT0FBaEI7TUFDQyxPQUFBLEdBQVUsYUFBQSxDQUFlLE9BQWYsRUFEWDs7SUFHQSxLQUFBLEdBQVEsSUFBSSxNQUFKLENBQVksS0FBWixFQUFtQixHQUFBLEdBQzFCLENBQUssS0FBSyxDQUFDLE9BQVQsR0FBc0IsR0FBdEIsR0FBK0IsRUFBakMsQ0FEMEIsR0FFMUIsQ0FBSyxVQUFVLENBQUMsT0FBZCxHQUEyQixHQUEzQixHQUFvQyxFQUF0QyxDQUZPO1dBS1IsTUFBTSxDQUFDLEtBQVAsR0FBZSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQWIsQ0FBc0IsS0FBdEIsRUFBNkIsT0FBN0I7RUFoQm9ELENBQXBFOztFQWtCQSxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsU0FBQTtJQUNqQyxJQUFHLE1BQU0sQ0FBQyxPQUFWO01BQ0MsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFaLEdBQXlCLFlBRDFCO0tBQUEsTUFBQTtNQUdDLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBWixHQUF5QixLQUgxQjs7V0FJQSxVQUFVLENBQUMsUUFBWCxHQUFzQixDQUFJLE1BQU0sQ0FBQztFQUxBLENBQWxDO0FBbENBIiwic291cmNlc0NvbnRlbnQiOlsiIyMgRWxlbWVudHMgIyNcblxuZUZpbmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImlucHV0LS1maW5kXCJcbmVSZXBsYWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJpbnB1dC0tcmVwbGFjZVwiXG5lQ2FzZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiaW5wdXQtLWNhc2VcIlxuZVdob2xlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJpbnB1dC0td2hvbGVcIlxuZVJlZ2V4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJpbnB1dC0tcmVnZXhcIlxuZU11bHRpbGluZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiaW5wdXQtLW11bHRpbGluZVwiXG5lRXNjYXBlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiaW5wdXQtLWVzY2FwZXNcIlxuZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJpbnB1dC0taW5wdXRcIlxuXG4jIyBGdW5jdGlvbnMgIyNcblxuZXNjYXBlSW5wdXQgPSAoIHN0ciApIC0+IHN0ci5yZXBsYWNlIC9bXmEtekEtWjAtOSBdL2csIFwiXFxcXCQmXCJcbmVzY2FwZVJlcGxhY2UgPSAoIHN0ciApIC0+IHN0ci5yZXBsYWNlIC9cXCQvZywgXCIkJCQkXCJcblxuIyMgRXZlbnRzICMjXG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBcImlucHV0LS1tYXRjaFwiICkuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdGlucHV0ID0gZUZpbmQudmFsdWVcblx0cmVwbGFjZSA9IGVSZXBsYWNlLnZhbHVlXG5cblx0aWYgbm90IGVSZWdleC5jaGVja2VkXG5cdFx0aW5wdXQgPSBlc2NhcGVJbnB1dCggaW5wdXQgKVxuXHRpZiBlV2hvbGUuY2hlY2tlZFxuXHRcdGlucHV0ID0gXCJcXFxcYlwiICsgaW5wdXQgKyBcIlxcXFxiXCJcblx0aWYgbm90IGVFc2NhcGVzLmNoZWNrZWRcblx0XHRyZXBsYWNlID0gZXNjYXBlUmVwbGFjZSggcmVwbGFjZSApXG5cblx0cmVnZXggPSBuZXcgUmVnRXhwKCBpbnB1dCwgXCJnXCIgK1xuXHRcdCggaWYgZUNhc2UuY2hlY2tlZCB0aGVuIFwiaVwiIGVsc2UgXCJcIiApICtcblx0XHQoIGlmIGVNdWx0aWxpbmUuY2hlY2tlZCB0aGVuIFwibVwiIGVsc2UgXCJcIiApXG5cdClcblxuXHRlSW5wdXQudmFsdWUgPSBlSW5wdXQudmFsdWUucmVwbGFjZSggcmVnZXgsIHJlcGxhY2UgKVxuXG5lUmVnZXguYWRkRXZlbnRMaXN0ZW5lciBcImNoYW5nZVwiLCAtPlxuXHRpZiBlUmVnZXguY2hlY2tlZFxuXHRcdGVGaW5kLnN0eWxlLmZvbnRGYW1pbHkgPSBcIm1vbm9zcGFjZVwiXG5cdGVsc2Vcblx0XHRlRmluZC5zdHlsZS5mb250RmFtaWx5ID0gbnVsbFxuXHRlTXVsdGlsaW5lLmRpc2FibGVkID0gbm90IGVSZWdleC5jaGVja2VkXG4iXX0=
