(function() {
  var $dropdownText, $inputInput, $inputRegex, $output, $outputList, getFlagsText, regexFlags, updateFlagsButton;

  regexFlags = {
    g: false,
    i: false,
    m: false,
    u: false
  };

  $dropdownText = $("#dropdown--text");

  $inputInput = $("#input--input");

  $inputRegex = $("#input--regex");

  $output = $("#output");

  $outputList = $("#output--list");

  getFlagsText = function() {
    return (regexFlags.g ? "g" : "") + (regexFlags.i ? "i" : "") + (regexFlags.m ? "m" : "") + (regexFlags.u ? "u" : "");
  };

  updateFlagsButton = function() {
    return $dropdownText.text("/" + getFlagsText());
  };

  $("#dropdown--flags").on("click.bs.dropdown", function(e) {
    e.stopPropagation();
    return e.preventDefault();
  });

  $("#flag--g").click(function() {
    regexFlags.g = !regexFlags.g;
    return updateFlagsButton();
  });

  $("#flag--i").click(function() {
    regexFlags.i = !regexFlags.i;
    return updateFlagsButton();
  });

  $("#flag--m").click(function() {
    regexFlags.m = !regexFlags.m;
    return updateFlagsButton();
  });

  $("#flag--u").click(function() {
    regexFlags.u = !regexFlags.u;
    return updateFlagsButton();
  });

  $("#input--match").click(function() {
    var i, len, match, matches, results;
    $output.removeClass("invisible");
    $outputList.empty();
    matches = $inputInput.val().match(new RegExp($inputRegex.val(), getFlagsText()));
    if (matches != null) {
      results = [];
      for (i = 0, len = matches.length; i < len; i++) {
        match = matches[i];
        results.push($outputList.append($("<li>").append($("<code>").text(match))));
      }
      return results;
    } else {
      return $("<div>").addClass("alert alert-danger").text("No matches found").appendTo($outputList);
    }
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9yZWdleHRlc3Rlci9pbmRleC5qcyIsInNvdXJjZXMiOlsiZ2FkZ2V0cy9yZWdleHRlc3Rlci9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7QUFBQSxNQUFBOztFQUFBLFVBQUEsR0FDQztJQUFBLENBQUEsRUFBRyxLQUFIO0lBQ0EsQ0FBQSxFQUFHLEtBREg7SUFFQSxDQUFBLEVBQUcsS0FGSDtJQUdBLENBQUEsRUFBRyxLQUhIOzs7RUFPRCxhQUFBLEdBQWdCLENBQUEsQ0FBRyxpQkFBSDs7RUFDaEIsV0FBQSxHQUFjLENBQUEsQ0FBRyxlQUFIOztFQUNkLFdBQUEsR0FBYyxDQUFBLENBQUcsZUFBSDs7RUFDZCxPQUFBLEdBQVUsQ0FBQSxDQUFHLFNBQUg7O0VBQ1YsV0FBQSxHQUFjLENBQUEsQ0FBRyxlQUFIOztFQUlkLFlBQUEsR0FBZSxTQUFBO1dBQ2QsQ0FBSyxVQUFVLENBQUMsQ0FBZCxHQUFxQixHQUFyQixHQUE4QixFQUFoQyxDQUFBLEdBQ0EsQ0FBSyxVQUFVLENBQUMsQ0FBZCxHQUFxQixHQUFyQixHQUE4QixFQUFoQyxDQURBLEdBRUEsQ0FBSyxVQUFVLENBQUMsQ0FBZCxHQUFxQixHQUFyQixHQUE4QixFQUFoQyxDQUZBLEdBR0EsQ0FBSyxVQUFVLENBQUMsQ0FBZCxHQUFxQixHQUFyQixHQUE4QixFQUFoQztFQUpjOztFQU1mLGlCQUFBLEdBQW9CLFNBQUE7V0FDbkIsYUFBYSxDQUFDLElBQWQsQ0FBb0IsR0FBQSxHQUFNLFlBQUEsQ0FBQSxDQUExQjtFQURtQjs7RUFLcEIsQ0FBQSxDQUFHLGtCQUFILENBQXVCLENBQUMsRUFBeEIsQ0FBMkIsbUJBQTNCLEVBQWdELFNBQUUsQ0FBRjtJQUMvQyxDQUFDLENBQUMsZUFBRixDQUFBO1dBQ0EsQ0FBQyxDQUFDLGNBQUYsQ0FBQTtFQUYrQyxDQUFoRDs7RUFJQSxDQUFBLENBQUcsVUFBSCxDQUFlLENBQUMsS0FBaEIsQ0FBc0IsU0FBQTtJQUNyQixVQUFVLENBQUMsQ0FBWCxHQUFlLENBQUksVUFBVSxDQUFDO1dBQzlCLGlCQUFBLENBQUE7RUFGcUIsQ0FBdEI7O0VBR0EsQ0FBQSxDQUFHLFVBQUgsQ0FBZSxDQUFDLEtBQWhCLENBQXNCLFNBQUE7SUFDckIsVUFBVSxDQUFDLENBQVgsR0FBZSxDQUFJLFVBQVUsQ0FBQztXQUM5QixpQkFBQSxDQUFBO0VBRnFCLENBQXRCOztFQUdBLENBQUEsQ0FBRyxVQUFILENBQWUsQ0FBQyxLQUFoQixDQUFzQixTQUFBO0lBQ3JCLFVBQVUsQ0FBQyxDQUFYLEdBQWUsQ0FBSSxVQUFVLENBQUM7V0FDOUIsaUJBQUEsQ0FBQTtFQUZxQixDQUF0Qjs7RUFHQSxDQUFBLENBQUcsVUFBSCxDQUFlLENBQUMsS0FBaEIsQ0FBc0IsU0FBQTtJQUNyQixVQUFVLENBQUMsQ0FBWCxHQUFlLENBQUksVUFBVSxDQUFDO1dBQzlCLGlCQUFBLENBQUE7RUFGcUIsQ0FBdEI7O0VBSUEsQ0FBQSxDQUFHLGVBQUgsQ0FBb0IsQ0FBQyxLQUFyQixDQUEyQixTQUFBO0FBQzFCLFFBQUE7SUFBQSxPQUFPLENBQUMsV0FBUixDQUFvQixXQUFwQjtJQUVBLFdBQVcsQ0FBQyxLQUFaLENBQUE7SUFDQSxPQUFBLEdBQVUsV0FBVyxDQUFDLEdBQVosQ0FBQSxDQUFpQixDQUFDLEtBQWxCLENBQ1QsSUFBSSxNQUFKLENBQVksV0FBVyxDQUFDLEdBQVosQ0FBQSxDQUFaLEVBQStCLFlBQUEsQ0FBQSxDQUEvQixDQURTO0lBR1YsSUFBRyxlQUFIO0FBQ0M7V0FBQSx5Q0FBQTs7cUJBQ0MsV0FBVyxDQUFDLE1BQVosQ0FBbUIsQ0FBQSxDQUFHLE1BQUgsQ0FBVyxDQUFDLE1BQVosQ0FBbUIsQ0FBQSxDQUFHLFFBQUgsQ0FBYSxDQUFDLElBQWQsQ0FBb0IsS0FBcEIsQ0FBbkIsQ0FBbkI7QUFERDtxQkFERDtLQUFBLE1BQUE7YUFJQyxDQUFBLENBQUcsT0FBSCxDQUNDLENBQUMsUUFERixDQUNZLG9CQURaLENBRUMsQ0FBQyxJQUZGLENBRVEsa0JBRlIsQ0FHQyxDQUFDLFFBSEYsQ0FHWSxXQUhaLEVBSkQ7O0VBUDBCLENBQTNCO0FBNUNBIiwic291cmNlc0NvbnRlbnQiOlsiIyBWYXJpYWJsZXNcblxucmVnZXhGbGFncyA9XG5cdGc6IGZhbHNlXG5cdGk6IGZhbHNlXG5cdG06IGZhbHNlXG5cdHU6IGZhbHNlXG5cbiMgRWxlbWVudHNcblxuJGRyb3Bkb3duVGV4dCA9ICQoIFwiI2Ryb3Bkb3duLS10ZXh0XCIgKVxuJGlucHV0SW5wdXQgPSAkKCBcIiNpbnB1dC0taW5wdXRcIiApXG4kaW5wdXRSZWdleCA9ICQoIFwiI2lucHV0LS1yZWdleFwiIClcbiRvdXRwdXQgPSAkKCBcIiNvdXRwdXRcIiApXG4kb3V0cHV0TGlzdCA9ICQoIFwiI291dHB1dC0tbGlzdFwiIClcblxuIyBGdW5jdGlvbnNcblxuZ2V0RmxhZ3NUZXh0ID0gLT5cblx0KCBpZiByZWdleEZsYWdzLmcgdGhlbiBcImdcIiBlbHNlIFwiXCIgKSArXG5cdCggaWYgcmVnZXhGbGFncy5pIHRoZW4gXCJpXCIgZWxzZSBcIlwiICkgK1xuXHQoIGlmIHJlZ2V4RmxhZ3MubSB0aGVuIFwibVwiIGVsc2UgXCJcIiApICtcblx0KCBpZiByZWdleEZsYWdzLnUgdGhlbiBcInVcIiBlbHNlIFwiXCIgKVxuXG51cGRhdGVGbGFnc0J1dHRvbiA9IC0+XG5cdCRkcm9wZG93blRleHQudGV4dCggXCIvXCIgKyBnZXRGbGFnc1RleHQoKSApXG5cbiMgRXZlbnRzXG5cbiQoIFwiI2Ryb3Bkb3duLS1mbGFnc1wiICkub24gXCJjbGljay5icy5kcm9wZG93blwiLCAoIGUgKSAtPlxuXHRlLnN0b3BQcm9wYWdhdGlvbigpXG5cdGUucHJldmVudERlZmF1bHQoKVxuXG4kKCBcIiNmbGFnLS1nXCIgKS5jbGljayAtPlxuXHRyZWdleEZsYWdzLmcgPSBub3QgcmVnZXhGbGFncy5nXG5cdHVwZGF0ZUZsYWdzQnV0dG9uKClcbiQoIFwiI2ZsYWctLWlcIiApLmNsaWNrIC0+XG5cdHJlZ2V4RmxhZ3MuaSA9IG5vdCByZWdleEZsYWdzLmlcblx0dXBkYXRlRmxhZ3NCdXR0b24oKVxuJCggXCIjZmxhZy0tbVwiICkuY2xpY2sgLT5cblx0cmVnZXhGbGFncy5tID0gbm90IHJlZ2V4RmxhZ3MubVxuXHR1cGRhdGVGbGFnc0J1dHRvbigpXG4kKCBcIiNmbGFnLS11XCIgKS5jbGljayAtPlxuXHRyZWdleEZsYWdzLnUgPSBub3QgcmVnZXhGbGFncy51XG5cdHVwZGF0ZUZsYWdzQnV0dG9uKClcblxuJCggXCIjaW5wdXQtLW1hdGNoXCIgKS5jbGljayAtPlxuXHQkb3V0cHV0LnJlbW92ZUNsYXNzIFwiaW52aXNpYmxlXCJcblxuXHQkb3V0cHV0TGlzdC5lbXB0eSgpXG5cdG1hdGNoZXMgPSAkaW5wdXRJbnB1dC52YWwoKS5tYXRjaChcblx0XHRuZXcgUmVnRXhwKCAkaW5wdXRSZWdleC52YWwoKSwgZ2V0RmxhZ3NUZXh0KCkgKVxuXHQpXG5cdGlmIG1hdGNoZXM/XG5cdFx0Zm9yIG1hdGNoIGluIG1hdGNoZXNcblx0XHRcdCRvdXRwdXRMaXN0LmFwcGVuZCAkKCBcIjxsaT5cIiApLmFwcGVuZCAkKCBcIjxjb2RlPlwiICkudGV4dCggbWF0Y2ggKVxuXHRlbHNlXG5cdFx0JCggXCI8ZGl2PlwiIClcblx0XHRcdC5hZGRDbGFzcyggXCJhbGVydCBhbGVydC1kYW5nZXJcIiApXG5cdFx0XHQudGV4dCggXCJObyBtYXRjaGVzIGZvdW5kXCIgKVxuXHRcdFx0LmFwcGVuZFRvKCAkb3V0cHV0TGlzdCApXG4iXX0=
