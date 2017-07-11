(function() {
  var $flagDisplay, $inputRegex, $inputText, regex_flags, updateFlags;

  regex_flags = {};

  window.getFlags = function() {
    var k, v;
    return ((function() {
      var results;
      results = [];
      for (k in regex_flags) {
        v = regex_flags[k];
        if (v) {
          results.push(k);
        }
      }
      return results;
    })()).join("");
  };

  $flagDisplay = $("#flag--display");

  updateFlags = function() {
    return $flagDisplay.text("/" + getFlags());
  };

  $("#opt--global").on("change", function() {
    regex_flags.g = $(this).prop("checked");
    return updateFlags();
  });

  $("#opt--ignorecase").on("change", function() {
    regex_flags.i = $(this).prop("checked");
    return updateFlags();
  });

  $("#opt--multiline").on("change", function() {
    regex_flags.m = $(this).prop("checked");
    return updateFlags();
  });

  $("#opt--sticky").on("change", function() {
    regex_flags.y = $(this).prop("checked");
    return updateFlags();
  });

  $("#opt--unicode").on("change", function() {
    regex_flags.u = $(this).prop("checked");
    return updateFlags();
  });

  $inputText = $("#regex--inputtext");

  $inputRegex = $("#regex--inputregex");

  $("#regex--test").click(function() {
    return $("#output--output").text(JSON.stringify($inputText.val().match(new RegExp($inputRegex.val(), getFlags()))));
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9yZWdleHRlc3Rlci9pbmRleC5qcyIsInNvdXJjZXMiOlsiZ2FkZ2V0cy9yZWdleHRlc3Rlci9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLFdBQUEsR0FBYzs7RUFFZCxNQUFNLENBQUMsUUFBUCxHQUFrQixTQUFBO0FBQ2pCLFFBQUE7QUFBQSxXQUFPOztBQUFFO1dBQUEsZ0JBQUE7O1lBQStCO3VCQUEvQjs7QUFBQTs7UUFBRixDQUFvQyxDQUFDLElBQXJDLENBQTBDLEVBQTFDO0VBRFU7O0VBR2xCLFlBQUEsR0FBZSxDQUFBLENBQUcsZ0JBQUg7O0VBQ2YsV0FBQSxHQUFjLFNBQUE7V0FDYixZQUFZLENBQUMsSUFBYixDQUFtQixHQUFBLEdBQU0sUUFBQSxDQUFBLENBQXpCO0VBRGE7O0VBR2QsQ0FBQSxDQUFHLGNBQUgsQ0FBbUIsQ0FBQyxFQUFwQixDQUF1QixRQUF2QixFQUFpQyxTQUFBO0lBQ2hDLFdBQVcsQ0FBQyxDQUFaLEdBQWdCLENBQUEsQ0FBRyxJQUFILENBQVMsQ0FBQyxJQUFWLENBQWdCLFNBQWhCO1dBQ2hCLFdBQUEsQ0FBQTtFQUZnQyxDQUFqQzs7RUFHQSxDQUFBLENBQUcsa0JBQUgsQ0FBdUIsQ0FBQyxFQUF4QixDQUEyQixRQUEzQixFQUFxQyxTQUFBO0lBQ3BDLFdBQVcsQ0FBQyxDQUFaLEdBQWdCLENBQUEsQ0FBRyxJQUFILENBQVMsQ0FBQyxJQUFWLENBQWdCLFNBQWhCO1dBQ2hCLFdBQUEsQ0FBQTtFQUZvQyxDQUFyQzs7RUFHQSxDQUFBLENBQUcsaUJBQUgsQ0FBc0IsQ0FBQyxFQUF2QixDQUEwQixRQUExQixFQUFvQyxTQUFBO0lBQ25DLFdBQVcsQ0FBQyxDQUFaLEdBQWdCLENBQUEsQ0FBRyxJQUFILENBQVMsQ0FBQyxJQUFWLENBQWdCLFNBQWhCO1dBQ2hCLFdBQUEsQ0FBQTtFQUZtQyxDQUFwQzs7RUFHQSxDQUFBLENBQUcsY0FBSCxDQUFtQixDQUFDLEVBQXBCLENBQXVCLFFBQXZCLEVBQWlDLFNBQUE7SUFDaEMsV0FBVyxDQUFDLENBQVosR0FBZ0IsQ0FBQSxDQUFHLElBQUgsQ0FBUyxDQUFDLElBQVYsQ0FBZ0IsU0FBaEI7V0FDaEIsV0FBQSxDQUFBO0VBRmdDLENBQWpDOztFQUdBLENBQUEsQ0FBRyxlQUFILENBQW9CLENBQUMsRUFBckIsQ0FBd0IsUUFBeEIsRUFBa0MsU0FBQTtJQUNqQyxXQUFXLENBQUMsQ0FBWixHQUFnQixDQUFBLENBQUcsSUFBSCxDQUFTLENBQUMsSUFBVixDQUFnQixTQUFoQjtXQUNoQixXQUFBLENBQUE7RUFGaUMsQ0FBbEM7O0VBSUEsVUFBQSxHQUFhLENBQUEsQ0FBRyxtQkFBSDs7RUFDYixXQUFBLEdBQWMsQ0FBQSxDQUFHLG9CQUFIOztFQUNkLENBQUEsQ0FBRyxjQUFILENBQW1CLENBQUMsS0FBcEIsQ0FBMEIsU0FBQTtXQUN6QixDQUFBLENBQUcsaUJBQUgsQ0FBc0IsQ0FBQyxJQUF2QixDQUE2QixJQUFJLENBQUMsU0FBTCxDQUFnQixVQUFVLENBQUMsR0FBWCxDQUFBLENBQWdCLENBQUMsS0FBakIsQ0FDNUMsSUFBSSxNQUFKLENBQVksV0FBVyxDQUFDLEdBQVosQ0FBQSxDQUFaLEVBQStCLFFBQUEsQ0FBQSxDQUEvQixDQUQ0QyxDQUFoQixDQUE3QjtFQUR5QixDQUExQjtBQTNCQSIsInNvdXJjZXNDb250ZW50IjpbInJlZ2V4X2ZsYWdzID0ge31cblxud2luZG93LmdldEZsYWdzID0gLT5cblx0cmV0dXJuICggayBmb3IgaywgdiBvZiByZWdleF9mbGFncyB3aGVuIHYgKS5qb2luKFwiXCIpXG5cbiRmbGFnRGlzcGxheSA9ICQoIFwiI2ZsYWctLWRpc3BsYXlcIiApXG51cGRhdGVGbGFncyA9IC0+XG5cdCRmbGFnRGlzcGxheS50ZXh0KCBcIi9cIiArIGdldEZsYWdzKCkpXG5cbiQoIFwiI29wdC0tZ2xvYmFsXCIgKS5vbiBcImNoYW5nZVwiLCAtPlxuXHRyZWdleF9mbGFncy5nID0gJCggdGhpcyApLnByb3AoIFwiY2hlY2tlZFwiIClcblx0dXBkYXRlRmxhZ3MoKVxuJCggXCIjb3B0LS1pZ25vcmVjYXNlXCIgKS5vbiBcImNoYW5nZVwiLCAtPlxuXHRyZWdleF9mbGFncy5pID0gJCggdGhpcyApLnByb3AoIFwiY2hlY2tlZFwiIClcblx0dXBkYXRlRmxhZ3MoKVxuJCggXCIjb3B0LS1tdWx0aWxpbmVcIiApLm9uIFwiY2hhbmdlXCIsIC0+XG5cdHJlZ2V4X2ZsYWdzLm0gPSAkKCB0aGlzICkucHJvcCggXCJjaGVja2VkXCIgKVxuXHR1cGRhdGVGbGFncygpXG4kKCBcIiNvcHQtLXN0aWNreVwiICkub24gXCJjaGFuZ2VcIiwgLT5cblx0cmVnZXhfZmxhZ3MueSA9ICQoIHRoaXMgKS5wcm9wKCBcImNoZWNrZWRcIiApXG5cdHVwZGF0ZUZsYWdzKClcbiQoIFwiI29wdC0tdW5pY29kZVwiICkub24gXCJjaGFuZ2VcIiwgLT5cblx0cmVnZXhfZmxhZ3MudSA9ICQoIHRoaXMgKS5wcm9wKCBcImNoZWNrZWRcIiApXG5cdHVwZGF0ZUZsYWdzKClcblxuJGlucHV0VGV4dCA9ICQoIFwiI3JlZ2V4LS1pbnB1dHRleHRcIiApXG4kaW5wdXRSZWdleCA9ICQoIFwiI3JlZ2V4LS1pbnB1dHJlZ2V4XCIgKVxuJCggXCIjcmVnZXgtLXRlc3RcIiApLmNsaWNrIC0+XG5cdCQoIFwiI291dHB1dC0tb3V0cHV0XCIgKS50ZXh0KCBKU09OLnN0cmluZ2lmeSggJGlucHV0VGV4dC52YWwoKS5tYXRjaChcblx0XHRuZXcgUmVnRXhwKCAkaW5wdXRSZWdleC52YWwoKSwgZ2V0RmxhZ3MoKSApXG5cdCkgKSApXG4iXX0=
