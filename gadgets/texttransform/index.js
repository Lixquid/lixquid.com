(function() {
  var eFilter, eInput, eOutput, eOutputDiv, sInline, transforms;

  transforms = null;

  sInline = document.getElementById("texttransform--inline");

  eInput = document.getElementById("input--input");

  eFilter = document.getElementById("input--filter");

  eOutput = document.getElementById("input--output");

  eOutputDiv = document.getElementById("input--output--div");

  console.log(sInline.checked);

  if (sInline.checked) {
    eOutputDiv.style.display = "none";
  } else {
    eOutputDiv.style.display = "";
  }

  sInline.addEventListener("change", function() {
    if (this.checked) {
      return eOutputDiv.style.display = "none";
    } else {
      return eOutputDiv.style.display = "";
    }
  });

  document.getElementById("input--go").addEventListener("click", function() {
    var filter;
    filter = eFilter.value;
    if (!transforms[filter]) {
      return;
    }
    if (sInline.checked) {
      return eInput.value = transforms[filter](eInput.value);
    } else {
      return eOutput.value = transforms[filter](eInput.value);
    }
  });

  transforms = {
    uppercase: function(s) {
      return s.toUpperCase();
    },
    lowercase: function(s) {
      return s.toLowerCase();
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy90ZXh0dHJhbnNmb3JtL2luZGV4LmpzIiwic291cmNlcyI6WyJnYWRnZXRzL3RleHR0cmFuc2Zvcm0vaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxVQUFBLEdBQWE7O0VBRWIsT0FBQSxHQUFVLFFBQVEsQ0FBQyxjQUFULENBQXdCLHVCQUF4Qjs7RUFDVixNQUFBLEdBQVMsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsY0FBeEI7O0VBQ1QsT0FBQSxHQUFVLFFBQVEsQ0FBQyxjQUFULENBQXdCLGVBQXhCOztFQUNWLE9BQUEsR0FBVSxRQUFRLENBQUMsY0FBVCxDQUF3QixlQUF4Qjs7RUFDVixVQUFBLEdBQWEsUUFBUSxDQUFDLGNBQVQsQ0FBd0Isb0JBQXhCOztFQUViLE9BQU8sQ0FBQyxHQUFSLENBQVksT0FBTyxDQUFDLE9BQXBCOztFQUNBLElBQUcsT0FBTyxDQUFDLE9BQVg7SUFDQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQWpCLEdBQTJCLE9BRDVCO0dBQUEsTUFBQTtJQUdDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBakIsR0FBMkIsR0FINUI7OztFQUlBLE9BQU8sQ0FBQyxnQkFBUixDQUF5QixRQUF6QixFQUFtQyxTQUFBO0lBQ2xDLElBQUcsSUFBQyxDQUFBLE9BQUo7YUFDQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQWpCLEdBQTJCLE9BRDVCO0tBQUEsTUFBQTthQUdDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBakIsR0FBMkIsR0FINUI7O0VBRGtDLENBQW5DOztFQU1BLFFBQVEsQ0FBQyxjQUFULENBQXlCLFdBQXpCLENBQXNDLENBQUMsZ0JBQXZDLENBQXdELE9BQXhELEVBQWlFLFNBQUE7QUFDaEUsUUFBQTtJQUFBLE1BQUEsR0FBUyxPQUFPLENBQUM7SUFDakIsSUFBVSxDQUFJLFVBQVksQ0FBQSxNQUFBLENBQTFCO0FBQUEsYUFBQTs7SUFFQSxJQUFHLE9BQU8sQ0FBQyxPQUFYO2FBQ0MsTUFBTSxDQUFDLEtBQVAsR0FBZSxVQUFZLENBQUEsTUFBQSxDQUFaLENBQXNCLE1BQU0sQ0FBQyxLQUE3QixFQURoQjtLQUFBLE1BQUE7YUFHQyxPQUFPLENBQUMsS0FBUixHQUFnQixVQUFZLENBQUEsTUFBQSxDQUFaLENBQXNCLE1BQU0sQ0FBQyxLQUE3QixFQUhqQjs7RUFKZ0UsQ0FBakU7O0VBV0EsVUFBQSxHQUNDO0lBQUEsU0FBQSxFQUFXLFNBQUUsQ0FBRjthQUFTLENBQUMsQ0FBQyxXQUFGLENBQUE7SUFBVCxDQUFYO0lBQ0EsU0FBQSxFQUFXLFNBQUUsQ0FBRjthQUFTLENBQUMsQ0FBQyxXQUFGLENBQUE7SUFBVCxDQURYOztBQS9CRCIsInNvdXJjZXNDb250ZW50IjpbInRyYW5zZm9ybXMgPSBudWxsXG5cbnNJbmxpbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcInRleHR0cmFuc2Zvcm0tLWlubGluZVwiXG5lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImlucHV0LS1pbnB1dFwiXG5lRmlsdGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJpbnB1dC0tZmlsdGVyXCJcbmVPdXRwdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImlucHV0LS1vdXRwdXRcIlxuZU91dHB1dERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiaW5wdXQtLW91dHB1dC0tZGl2XCJcblxuY29uc29sZS5sb2cgc0lubGluZS5jaGVja2VkXG5pZiBzSW5saW5lLmNoZWNrZWRcblx0ZU91dHB1dERpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcbmVsc2Vcblx0ZU91dHB1dERpdi5zdHlsZS5kaXNwbGF5ID0gXCJcIlxuc0lubGluZS5hZGRFdmVudExpc3RlbmVyIFwiY2hhbmdlXCIsIC0+XG5cdGlmIEBjaGVja2VkXG5cdFx0ZU91dHB1dERpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblx0ZWxzZVxuXHRcdGVPdXRwdXREaXYuc3R5bGUuZGlzcGxheSA9IFwiXCJcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwiaW5wdXQtLWdvXCIgKS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgLT5cblx0ZmlsdGVyID0gZUZpbHRlci52YWx1ZVxuXHRyZXR1cm4gaWYgbm90IHRyYW5zZm9ybXNbIGZpbHRlciBdXG5cblx0aWYgc0lubGluZS5jaGVja2VkXG5cdFx0ZUlucHV0LnZhbHVlID0gdHJhbnNmb3Jtc1sgZmlsdGVyIF0oIGVJbnB1dC52YWx1ZSApXG5cdGVsc2Vcblx0XHRlT3V0cHV0LnZhbHVlID0gdHJhbnNmb3Jtc1sgZmlsdGVyIF0oIGVJbnB1dC52YWx1ZSApXG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMgVFJBTlNGT1JNUyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbnRyYW5zZm9ybXMgPVxuXHR1cHBlcmNhc2U6ICggcyApIC0+IHMudG9VcHBlckNhc2UoKVxuXHRsb3dlcmNhc2U6ICggcyApIC0+IHMudG9Mb3dlckNhc2UoKVxuIl19
