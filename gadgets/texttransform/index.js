(function() {
  var _id, eFilter, eInput, eOutput, eOutputDiv, genMapTransform, genStringTransform, sInline, transforms;

  transforms = {};

  sInline = document.getElementById("texttransform--inline");

  eInput = document.getElementById("input--input");

  eFilter = document.getElementById("input--filter");

  eOutput = document.getElementById("input--output");

  eOutputDiv = document.getElementById("input--output--div");

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

  genMapTransform = function(charmap) {
    return function(s) {
      var c;
      return ((function() {
        var i, len, ref, results;
        results = [];
        for (i = 0, len = s.length; i < len; i++) {
          c = s[i];
          results.push((ref = charmap[c]) != null ? ref : c);
        }
        return results;
      })()).join("");
    };
  };

  genStringTransform = function(input) {
    var i, out, x;
    out = {};
    for (x = i = 0; i < 94; x = ++i) {
      if (input[x] == null) {
        return genMapTransform(out);
      }
      out[String.fromCharCode(32 + x)] = input[x];
    }
    return genMapTransform(out);
  };

  transforms.uppercase = function(s) {
    return s.toUpperCase();
  };

  transforms.lowercase = function(s) {
    return s.toLowerCase();
  };

  transforms.uriencode = function(s) {
    return encodeURIComponent(s);
  };

  transforms.uridecode = function(s) {
    return decodeURIComponent(s.replace("+", " "));
  };

  _id = "\ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";

  transforms.rot5 = genStringTransform("\ !\"#$%&'()*+,-./5678901234:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~");

  transforms.rot13 = genStringTransform("\ !\"#$%&'()*+,-./0123456789:;<=>?@NOPQRSTUVWXYZABCDEFGHIJKLM[\\]^_`nopqrstuvwxyzabcdefghijklm{|}~");

  transforms.rot135 = genStringTransform("\ !\"#$%&'()*+,-./5678901234:;<=>?@NOPQRSTUVWXYZABCDEFGHIJKLM[\\]^_`nopqrstuvwxyzabcdefghijklm{|}~");

  transforms.rot47 = genStringTransform("\ PQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNO");

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy90ZXh0dHJhbnNmb3JtL2luZGV4LmpzIiwic291cmNlcyI6WyJnYWRnZXRzL3RleHR0cmFuc2Zvcm0vaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxVQUFBLEdBQWE7O0VBRWIsT0FBQSxHQUFVLFFBQVEsQ0FBQyxjQUFULENBQXdCLHVCQUF4Qjs7RUFDVixNQUFBLEdBQVMsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsY0FBeEI7O0VBQ1QsT0FBQSxHQUFVLFFBQVEsQ0FBQyxjQUFULENBQXdCLGVBQXhCOztFQUNWLE9BQUEsR0FBVSxRQUFRLENBQUMsY0FBVCxDQUF3QixlQUF4Qjs7RUFDVixVQUFBLEdBQWEsUUFBUSxDQUFDLGNBQVQsQ0FBd0Isb0JBQXhCOztFQUViLElBQUcsT0FBTyxDQUFDLE9BQVg7SUFDQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQWpCLEdBQTJCLE9BRDVCO0dBQUEsTUFBQTtJQUdDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBakIsR0FBMkIsR0FINUI7OztFQUlBLE9BQU8sQ0FBQyxnQkFBUixDQUF5QixRQUF6QixFQUFtQyxTQUFBO0lBQ2xDLElBQUcsSUFBQyxDQUFBLE9BQUo7YUFDQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQWpCLEdBQTJCLE9BRDVCO0tBQUEsTUFBQTthQUdDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBakIsR0FBMkIsR0FINUI7O0VBRGtDLENBQW5DOztFQU1BLFFBQVEsQ0FBQyxjQUFULENBQXlCLFdBQXpCLENBQXNDLENBQUMsZ0JBQXZDLENBQXdELE9BQXhELEVBQWlFLFNBQUE7QUFDaEUsUUFBQTtJQUFBLE1BQUEsR0FBUyxPQUFPLENBQUM7SUFDakIsSUFBVSxDQUFJLFVBQVksQ0FBQSxNQUFBLENBQTFCO0FBQUEsYUFBQTs7SUFFQSxJQUFHLE9BQU8sQ0FBQyxPQUFYO2FBQ0MsTUFBTSxDQUFDLEtBQVAsR0FBZSxVQUFZLENBQUEsTUFBQSxDQUFaLENBQXNCLE1BQU0sQ0FBQyxLQUE3QixFQURoQjtLQUFBLE1BQUE7YUFHQyxPQUFPLENBQUMsS0FBUixHQUFnQixVQUFZLENBQUEsTUFBQSxDQUFaLENBQXNCLE1BQU0sQ0FBQyxLQUE3QixFQUhqQjs7RUFKZ0UsQ0FBakU7O0VBV0EsZUFBQSxHQUFrQixTQUFFLE9BQUY7QUFDakIsV0FBTyxTQUFFLENBQUY7QUFDTixVQUFBO2FBQUE7O0FBQUU7YUFBQSxtQ0FBQTs7MERBQWU7QUFBZjs7VUFBRixDQUErQixDQUFDLElBQWhDLENBQXNDLEVBQXRDO0lBRE07RUFEVTs7RUFLbEIsa0JBQUEsR0FBcUIsU0FBRSxLQUFGO0FBQ3BCLFFBQUE7SUFBQSxHQUFBLEdBQU07QUFDTixTQUFTLDBCQUFUO01BQ0MsSUFBTyxnQkFBUDtBQUNDLGVBQU8sZUFBQSxDQUFpQixHQUFqQixFQURSOztNQUVBLEdBQUssQ0FBQSxNQUFNLENBQUMsWUFBUCxDQUFxQixFQUFBLEdBQUssQ0FBMUIsQ0FBQSxDQUFMLEdBQXVDLEtBQU0sQ0FBQSxDQUFBO0FBSDlDO0FBSUEsV0FBTyxlQUFBLENBQWlCLEdBQWpCO0VBTmE7O0VBVXJCLFVBQVUsQ0FBQyxTQUFYLEdBQXVCLFNBQUUsQ0FBRjtXQUFTLENBQUMsQ0FBQyxXQUFGLENBQUE7RUFBVDs7RUFDdkIsVUFBVSxDQUFDLFNBQVgsR0FBdUIsU0FBRSxDQUFGO1dBQVMsQ0FBQyxDQUFDLFdBQUYsQ0FBQTtFQUFUOztFQUN2QixVQUFVLENBQUMsU0FBWCxHQUF1QixTQUFFLENBQUY7V0FBUyxrQkFBQSxDQUFvQixDQUFwQjtFQUFUOztFQUN2QixVQUFVLENBQUMsU0FBWCxHQUF1QixTQUFFLENBQUY7V0FBUyxrQkFBQSxDQUFvQixDQUFDLENBQUMsT0FBRixDQUFXLEdBQVgsRUFBZ0IsR0FBaEIsQ0FBcEI7RUFBVDs7RUFJdkIsR0FBQSxHQUFNOztFQVVOLFVBQVUsQ0FBQyxJQUFYLEdBQWtCLGtCQUFBLENBQW1CLG9HQUFuQjs7RUFTbEIsVUFBVSxDQUFDLEtBQVgsR0FBbUIsa0JBQUEsQ0FBbUIsb0dBQW5COztFQVVuQixVQUFVLENBQUMsTUFBWCxHQUFvQixrQkFBQSxDQUFtQixvR0FBbkI7O0VBVXBCLFVBQVUsQ0FBQyxLQUFYLEdBQW1CLGtCQUFBLENBQW1CLG9HQUFuQjtBQTFGbkIiLCJzb3VyY2VzQ29udGVudCI6WyJ0cmFuc2Zvcm1zID0ge31cblxuc0lubGluZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwidGV4dHRyYW5zZm9ybS0taW5saW5lXCJcbmVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiaW5wdXQtLWlucHV0XCJcbmVGaWx0ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImlucHV0LS1maWx0ZXJcIlxuZU91dHB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiaW5wdXQtLW91dHB1dFwiXG5lT3V0cHV0RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJpbnB1dC0tb3V0cHV0LS1kaXZcIlxuXG5pZiBzSW5saW5lLmNoZWNrZWRcblx0ZU91dHB1dERpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcbmVsc2Vcblx0ZU91dHB1dERpdi5zdHlsZS5kaXNwbGF5ID0gXCJcIlxuc0lubGluZS5hZGRFdmVudExpc3RlbmVyIFwiY2hhbmdlXCIsIC0+XG5cdGlmIEBjaGVja2VkXG5cdFx0ZU91dHB1dERpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblx0ZWxzZVxuXHRcdGVPdXRwdXREaXYuc3R5bGUuZGlzcGxheSA9IFwiXCJcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwiaW5wdXQtLWdvXCIgKS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgLT5cblx0ZmlsdGVyID0gZUZpbHRlci52YWx1ZVxuXHRyZXR1cm4gaWYgbm90IHRyYW5zZm9ybXNbIGZpbHRlciBdXG5cblx0aWYgc0lubGluZS5jaGVja2VkXG5cdFx0ZUlucHV0LnZhbHVlID0gdHJhbnNmb3Jtc1sgZmlsdGVyIF0oIGVJbnB1dC52YWx1ZSApXG5cdGVsc2Vcblx0XHRlT3V0cHV0LnZhbHVlID0gdHJhbnNmb3Jtc1sgZmlsdGVyIF0oIGVJbnB1dC52YWx1ZSApXG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyBUUkFOU0ZPUk0gSEVMUEVSUyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmdlbk1hcFRyYW5zZm9ybSA9ICggY2hhcm1hcCApIC0+XG5cdHJldHVybiAoIHMgKSAtPlxuXHRcdCggY2hhcm1hcFsgYyBdID8gYyBmb3IgYyBpbiBzICkuam9pbiggXCJcIiApXG5cbiMgTG93ZXJjYXNlIGEteiwgVXBwZXJjYXNlIGEteiwgbnVtYmVycyAwLTlcbmdlblN0cmluZ1RyYW5zZm9ybSA9ICggaW5wdXQgKSAtPlxuXHRvdXQgPSB7fVxuXHRmb3IgeCBpbiBbMC4uLjk0XVxuXHRcdGlmIG5vdCBpbnB1dFt4XT9cblx0XHRcdHJldHVybiBnZW5NYXBUcmFuc2Zvcm0oIG91dCApXG5cdFx0b3V0WyBTdHJpbmcuZnJvbUNoYXJDb2RlKCAzMiArIHggKSBdID0gaW5wdXRbeF1cblx0cmV0dXJuIGdlbk1hcFRyYW5zZm9ybSggb3V0IClcblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIFNJTVBMRSBUUkFOU0ZPUk1TICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxudHJhbnNmb3Jtcy51cHBlcmNhc2UgPSAoIHMgKSAtPiBzLnRvVXBwZXJDYXNlKClcbnRyYW5zZm9ybXMubG93ZXJjYXNlID0gKCBzICkgLT4gcy50b0xvd2VyQ2FzZSgpXG50cmFuc2Zvcm1zLnVyaWVuY29kZSA9ICggcyApIC0+IGVuY29kZVVSSUNvbXBvbmVudCggcyApXG50cmFuc2Zvcm1zLnVyaWRlY29kZSA9ICggcyApIC0+IGRlY29kZVVSSUNvbXBvbmVudCggcy5yZXBsYWNlKCBcIitcIiwgXCIgXCIgKSApXG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyBDSEFSQUNURVIgTUFQIFRSQU5TRk9STVMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbl9pZCA9IFwiXG5cXCAhXFxcIiMkJSYnKCkqKywtLi9cXFxuMDEyMzQ1Njc4OVxcXG46Ozw9Pj9AXFxcbkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXFxcbltcXFxcXV5fYFxcXG5hYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5elxcXG57fH1+XG5cIlxuXG50cmFuc2Zvcm1zLnJvdDUgPSBnZW5TdHJpbmdUcmFuc2Zvcm0gXCJcblxcICFcXFwiIyQlJicoKSorLC0uL1xcXG41Njc4OTAxMjM0XFxcbjo7PD0+P0BcXFxuQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpcXFxuW1xcXFxdXl9gXFxcbmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XFxcbnt8fX5cblwiXG50cmFuc2Zvcm1zLnJvdDEzID0gZ2VuU3RyaW5nVHJhbnNmb3JtIFwiXG5cXCAhXFxcIiMkJSYnKCkqKywtLi9cXFxuMDEyMzQ1Njc4OVxcXG46Ozw9Pj9AXFxcbk5PUFFSU1RVVldYWVpBQkNERUZHSElKS0xNXFxcbltcXFxcXV5fYFxcXG5ub3BxcnN0dXZ3eHl6YWJjZGVmZ2hpamtsbVxcXG57fH1+XG5cIlxuXG50cmFuc2Zvcm1zLnJvdDEzNSA9IGdlblN0cmluZ1RyYW5zZm9ybSBcIlxuXFwgIVxcXCIjJCUmJygpKissLS4vXFxcbjU2Nzg5MDEyMzRcXFxuOjs8PT4/QFxcXG5OT1BRUlNUVVZXWFlaQUJDREVGR0hJSktMTVxcXG5bXFxcXF1eX2BcXFxubm9wcXJzdHV2d3h5emFiY2RlZmdoaWprbG1cXFxue3x9flxuXCJcblxudHJhbnNmb3Jtcy5yb3Q0NyA9IGdlblN0cmluZ1RyYW5zZm9ybSBcIlxuXFwgUFFSU1RVVldYWVpcXFxuW1xcXFxdXl9gXFxcbmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XFxcbnt8fX4hXFxcIiMkJSYnKCkqKywtLi9cXFxuMDEyMzQ1Njc4OVxcXG46Ozw9Pj9AXFxcbkFCQ0RFRkdISUpLTE1OT1xuXCJcbiJdfQ==
