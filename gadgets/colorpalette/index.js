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
    e.addEventListener("click", function() {
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
      return document.getElementById("palette--div--" + this.dataset.target).style.display = "";
    });
  }

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9jb2xvcnBhbGV0dGUvaW5kZXguanMiLCJzb3VyY2VzIjpbImdhZGdldHMvY29sb3JwYWxldHRlL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsT0FBQSxHQUFVLFFBQVEsQ0FBQyxjQUFULENBQXdCLGVBQXhCOztFQUNWLFdBQUEsR0FBYyxRQUFRLENBQUMsY0FBVCxDQUF3QixjQUF4Qjs7QUFFZDtBQUFBLE9BQUEscUNBQUE7O0lBQ0MsRUFBRSxDQUFDLGdCQUFILENBQW9CLE9BQXBCLEVBQTZCLFNBQUE7TUFDNUIsT0FBTyxDQUFDLEtBQVIsR0FBZ0IsSUFBSSxDQUFDLFlBQUwsQ0FBbUIsWUFBbkI7TUFDaEIsT0FBTyxDQUFDLEtBQVIsQ0FBQTtNQUNBLE9BQU8sQ0FBQyxNQUFSLENBQUE7TUFDQSxJQUFHLFdBQVcsQ0FBQyxPQUFmO2VBQ0MsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsTUFBckIsRUFERDs7SUFKNEIsQ0FBN0I7QUFERDs7QUFRQTtBQUFBLE9BQUEsd0NBQUE7O0lBQ0MsQ0FBQyxDQUFDLGdCQUFGLENBQW1CLE9BQW5CLEVBQTRCLFNBQUE7QUFDM0IsVUFBQTtBQUFBO0FBQUEsV0FBQSx3Q0FBQTs7UUFDQyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQWIsQ0FBb0IsUUFBcEI7QUFERDtNQUVBLElBQUMsQ0FBQSxTQUFTLENBQUMsR0FBWCxDQUFlLFFBQWY7QUFFQTtBQUFBLFdBQUEsd0NBQUE7O1FBQ0MsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFULEdBQW1CO0FBRHBCO2FBR0EsUUFBUSxDQUFDLGNBQVQsQ0FDQyxnQkFBQSxHQUFpQixJQUFDLENBQUEsT0FBTyxDQUFDLE1BRDNCLENBQ3FDLENBQUMsS0FBSyxDQUFDLE9BRDVDLEdBQ3NEO0lBVDNCLENBQTVCO0FBREQ7QUFYQSIsInNvdXJjZXNDb250ZW50IjpbImVPdXRwdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcIm91dHB1dC0taW5wdXRcIlxyXG5lT3V0cHV0Q29weSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwib3V0cHV0LS1jb3B5XCJcclxuXHJcbmZvciBlbCBpbiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBcInBhbGV0dGUtLWNvbG9yXCIgKVxyXG5cdGVsLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxyXG5cdFx0ZU91dHB1dC52YWx1ZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCBcImRhdGEtY29sb3JcIiApXHJcblx0XHRlT3V0cHV0LmZvY3VzKClcclxuXHRcdGVPdXRwdXQuc2VsZWN0KClcclxuXHRcdGlmIGVPdXRwdXRDb3B5LmNoZWNrZWRcclxuXHRcdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQgXCJjb3B5XCJcclxuXHJcbmZvciBlIGluIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoIFwicGFsZXR0ZS0tbmF2XCIgKVxyXG5cdGUuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XHJcblx0XHRmb3IgZWkgaW4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggXCJwYWxldHRlLS1uYXZcIiApXHJcblx0XHRcdGVpLmNsYXNzTGlzdC5yZW1vdmUgXCJhY3RpdmVcIlxyXG5cdFx0QGNsYXNzTGlzdC5hZGQgXCJhY3RpdmVcIlxyXG5cclxuXHRcdGZvciBlaSBpbiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBcInBhbGV0dGUtLXRhYmxlXCIgKVxyXG5cdFx0XHRlaS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuXHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuXHRcdFx0XCJwYWxldHRlLS1kaXYtLSN7QGRhdGFzZXQudGFyZ2V0fVwiICkuc3R5bGUuZGlzcGxheSA9IFwiXCJcclxuIl19
