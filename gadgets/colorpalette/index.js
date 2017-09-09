(function() {
  var e, eOutput, eOutputCopy, el, i, j, len, len1, ref, ref1;

  eOutput = document.getElementById("output--input");

  eOutputCopy = document.getElementById("output--copy");

  ref = document.getElementsByClassName("palette--color");
  for (i = 0, len = ref.length; i < len; i++) {
    el = ref[i];
    el.addEventListener("click", function() {
      eOutput.value = this.getAttribute("data-color");
      eOutput.focus();
      eOutput.select();
      if (eOutputCopy.checked) {
        return document.execCommand("copy");
      }
    });
  }

  ref1 = document.getElementsByClassName("palette--nav");
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    e = ref1[j];
    e.addEventListener("click", function(ev) {
      var ei, k, l, len2, len3, ref2, ref3;
      ref2 = document.getElementsByClassName("palette--nav");
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        ei = ref2[k];
        ei.classList.remove("active");
      }
      this.classList.add("active");
      ref3 = document.getElementsByClassName("palette--table");
      for (l = 0, len3 = ref3.length; l < len3; l++) {
        ei = ref3[l];
        ei.style.display = "none";
      }
      document.getElementById("palette--div--" + this.dataset.target).style.display = "";
      return ev.preventDefault();
    });
  }

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9jb2xvcnBhbGV0dGUvaW5kZXguanMiLCJzb3VyY2VzIjpbImdhZGdldHMvY29sb3JwYWxldHRlL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsT0FBQSxHQUFVLFFBQVEsQ0FBQyxjQUFULENBQXdCLGVBQXhCOztFQUNWLFdBQUEsR0FBYyxRQUFRLENBQUMsY0FBVCxDQUF3QixjQUF4Qjs7QUFFZDtBQUFBLE9BQUEscUNBQUE7O0lBQ0MsRUFBRSxDQUFDLGdCQUFILENBQW9CLE9BQXBCLEVBQTZCLFNBQUE7TUFDNUIsT0FBTyxDQUFDLEtBQVIsR0FBZ0IsSUFBSSxDQUFDLFlBQUwsQ0FBbUIsWUFBbkI7TUFDaEIsT0FBTyxDQUFDLEtBQVIsQ0FBQTtNQUNBLE9BQU8sQ0FBQyxNQUFSLENBQUE7TUFDQSxJQUFHLFdBQVcsQ0FBQyxPQUFmO2VBQ0MsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsTUFBckIsRUFERDs7SUFKNEIsQ0FBN0I7QUFERDs7QUFRQTtBQUFBLE9BQUEsd0NBQUE7O0lBQ0MsQ0FBQyxDQUFDLGdCQUFGLENBQW1CLE9BQW5CLEVBQTRCLFNBQUUsRUFBRjtBQUMzQixVQUFBO0FBQUE7QUFBQSxXQUFBLHdDQUFBOztRQUNDLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBYixDQUFvQixRQUFwQjtBQUREO01BRUEsSUFBQyxDQUFBLFNBQVMsQ0FBQyxHQUFYLENBQWUsUUFBZjtBQUVBO0FBQUEsV0FBQSx3Q0FBQTs7UUFDQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQVQsR0FBbUI7QUFEcEI7TUFHQSxRQUFRLENBQUMsY0FBVCxDQUNDLGdCQUFBLEdBQWlCLElBQUMsQ0FBQSxPQUFPLENBQUMsTUFEM0IsQ0FDcUMsQ0FBQyxLQUFLLENBQUMsT0FENUMsR0FDc0Q7YUFDdEQsRUFBRSxDQUFDLGNBQUgsQ0FBQTtJQVYyQixDQUE1QjtBQUREO0FBWEEiLCJzb3VyY2VzQ29udGVudCI6WyJlT3V0cHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJvdXRwdXQtLWlucHV0XCJcbmVPdXRwdXRDb3B5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJvdXRwdXQtLWNvcHlcIlxuXG5mb3IgZWwgaW4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggXCJwYWxldHRlLS1jb2xvclwiIClcblx0ZWwuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdFx0ZU91dHB1dC52YWx1ZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCBcImRhdGEtY29sb3JcIiApXG5cdFx0ZU91dHB1dC5mb2N1cygpXG5cdFx0ZU91dHB1dC5zZWxlY3QoKVxuXHRcdGlmIGVPdXRwdXRDb3B5LmNoZWNrZWRcblx0XHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kIFwiY29weVwiXG5cbmZvciBlIGluIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoIFwicGFsZXR0ZS0tbmF2XCIgKVxuXHRlLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAoIGV2ICkgLT5cblx0XHRmb3IgZWkgaW4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggXCJwYWxldHRlLS1uYXZcIiApXG5cdFx0XHRlaS5jbGFzc0xpc3QucmVtb3ZlIFwiYWN0aXZlXCJcblx0XHRAY2xhc3NMaXN0LmFkZCBcImFjdGl2ZVwiXG5cblx0XHRmb3IgZWkgaW4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggXCJwYWxldHRlLS10YWJsZVwiIClcblx0XHRcdGVpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG5cdFx0XHRcInBhbGV0dGUtLWRpdi0tI3tAZGF0YXNldC50YXJnZXR9XCIgKS5zdHlsZS5kaXNwbGF5ID0gXCJcIlxuXHRcdGV2LnByZXZlbnREZWZhdWx0KClcbiJdfQ==
