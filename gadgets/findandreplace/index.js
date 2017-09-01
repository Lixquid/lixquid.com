(function() {
  var eCase, eEscapes, eFind, eInput, eRegex, eReplace, eWhole, escapeInput, escapeReplace;

  eFind = document.getElementById("input--find");

  eReplace = document.getElementById("input--replace");

  eCase = document.getElementById("input--case");

  eWhole = document.getElementById("input--whole");

  eRegex = document.getElementById("input--regex");

  eEscapes = document.getElementById("input--escapes");

  eInput = document.getElementById("input--input");

  escapeInput = function(str) {
    return str.replace(/[^a-zA-Z0-9 ]/, "\\$&");
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
    regex = new RegExp(input, "g" + (eCase.checked ? "i" : ""));
    return eInput.value = eInput.value.replace(regex, replace);
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9maW5kYW5kcmVwbGFjZS9pbmRleC5qcyIsInNvdXJjZXMiOlsiZ2FkZ2V0cy9maW5kYW5kcmVwbGFjZS9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7QUFBQSxNQUFBOztFQUFBLEtBQUEsR0FBUSxRQUFRLENBQUMsY0FBVCxDQUF3QixhQUF4Qjs7RUFDUixRQUFBLEdBQVcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsZ0JBQXhCOztFQUNYLEtBQUEsR0FBUSxRQUFRLENBQUMsY0FBVCxDQUF3QixhQUF4Qjs7RUFDUixNQUFBLEdBQVMsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsY0FBeEI7O0VBQ1QsTUFBQSxHQUFTLFFBQVEsQ0FBQyxjQUFULENBQXdCLGNBQXhCOztFQUNULFFBQUEsR0FBVyxRQUFRLENBQUMsY0FBVCxDQUF3QixnQkFBeEI7O0VBQ1gsTUFBQSxHQUFTLFFBQVEsQ0FBQyxjQUFULENBQXdCLGNBQXhCOztFQUlULFdBQUEsR0FBYyxTQUFFLEdBQUY7V0FBVyxHQUFHLENBQUMsT0FBSixDQUFZLGVBQVosRUFBNkIsTUFBN0I7RUFBWDs7RUFDZCxhQUFBLEdBQWdCLFNBQUUsR0FBRjtXQUFXLEdBQUcsQ0FBQyxPQUFKLENBQVksS0FBWixFQUFtQixNQUFuQjtFQUFYOztFQUloQixRQUFRLENBQUMsY0FBVCxDQUF5QixjQUF6QixDQUF5QyxDQUFDLGdCQUExQyxDQUEyRCxPQUEzRCxFQUFvRSxTQUFBO0FBQ25FLFFBQUE7SUFBQSxLQUFBLEdBQVEsS0FBSyxDQUFDO0lBQ2QsT0FBQSxHQUFVLFFBQVEsQ0FBQztJQUVuQixJQUFHLENBQUksTUFBTSxDQUFDLE9BQWQ7TUFDQyxLQUFBLEdBQVEsV0FBQSxDQUFhLEtBQWIsRUFEVDs7SUFFQSxJQUFHLE1BQU0sQ0FBQyxPQUFWO01BQ0MsS0FBQSxHQUFRLEtBQUEsR0FBUSxLQUFSLEdBQWdCLE1BRHpCOztJQUVBLElBQUcsQ0FBSSxRQUFRLENBQUMsT0FBaEI7TUFDQyxPQUFBLEdBQVUsYUFBQSxDQUFlLE9BQWYsRUFEWDs7SUFHQSxLQUFBLEdBQVEsSUFBSSxNQUFKLENBQVksS0FBWixFQUFtQixHQUFBLEdBQU0sQ0FBSyxLQUFLLENBQUMsT0FBVCxHQUFzQixHQUF0QixHQUErQixFQUFqQyxDQUF6QjtXQUVSLE1BQU0sQ0FBQyxLQUFQLEdBQWUsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFiLENBQXNCLEtBQXRCLEVBQTZCLE9BQTdCO0VBYm9ELENBQXBFO0FBZkEiLCJzb3VyY2VzQ29udGVudCI6WyIjIyBFbGVtZW50cyAjI1xuXG5lRmluZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiaW5wdXQtLWZpbmRcIlxuZVJlcGxhY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImlucHV0LS1yZXBsYWNlXCJcbmVDYXNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJpbnB1dC0tY2FzZVwiXG5lV2hvbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImlucHV0LS13aG9sZVwiXG5lUmVnZXggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImlucHV0LS1yZWdleFwiXG5lRXNjYXBlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiaW5wdXQtLWVzY2FwZXNcIlxuZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJpbnB1dC0taW5wdXRcIlxuXG4jIyBGdW5jdGlvbnMgIyNcblxuZXNjYXBlSW5wdXQgPSAoIHN0ciApIC0+IHN0ci5yZXBsYWNlIC9bXmEtekEtWjAtOSBdLywgXCJcXFxcJCZcIlxuZXNjYXBlUmVwbGFjZSA9ICggc3RyICkgLT4gc3RyLnJlcGxhY2UgL1xcJC9nLCBcIiQkJCRcIlxuXG4jIyBFdmVudHMgIyNcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwiaW5wdXQtLW1hdGNoXCIgKS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgLT5cblx0aW5wdXQgPSBlRmluZC52YWx1ZVxuXHRyZXBsYWNlID0gZVJlcGxhY2UudmFsdWVcblxuXHRpZiBub3QgZVJlZ2V4LmNoZWNrZWRcblx0XHRpbnB1dCA9IGVzY2FwZUlucHV0KCBpbnB1dCApXG5cdGlmIGVXaG9sZS5jaGVja2VkXG5cdFx0aW5wdXQgPSBcIlxcXFxiXCIgKyBpbnB1dCArIFwiXFxcXGJcIlxuXHRpZiBub3QgZUVzY2FwZXMuY2hlY2tlZFxuXHRcdHJlcGxhY2UgPSBlc2NhcGVSZXBsYWNlKCByZXBsYWNlIClcblxuXHRyZWdleCA9IG5ldyBSZWdFeHAoIGlucHV0LCBcImdcIiArICggaWYgZUNhc2UuY2hlY2tlZCB0aGVuIFwiaVwiIGVsc2UgXCJcIiApIClcblxuXHRlSW5wdXQudmFsdWUgPSBlSW5wdXQudmFsdWUucmVwbGFjZSggcmVnZXgsIHJlcGxhY2UgKVxuIl19
