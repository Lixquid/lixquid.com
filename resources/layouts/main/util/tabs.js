(function() {
  var e, i, len, ref;

  ref = document.getElementsByClassName("tab--nav");
  for (i = 0, len = ref.length; i < len; i++) {
    e = ref[i];
    e.addEventListener("click", function(ev) {
      var ei, j, k, len1, len2, ref1, ref2;
      ref1 = document.getElementsByClassName("tab--nav");
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        ei = ref1[j];
        ei.classList.remove("active");
      }
      this.classList.add("active");
      ref2 = document.getElementsByClassName("tab--page");
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        ei = ref2[k];
        ei.style.display = "none";
      }
      document.getElementById(this.dataset.target).style.display = "";
      return ev.preventDefault();
    });
  }

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VzL2xheW91dHMvbWFpbi91dGlsL3RhYnMuanMiLCJzb3VyY2VzIjpbInJlc291cmNlcy9sYXlvdXRzL21haW4vdXRpbC90YWJzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0FBQUE7QUFBQSxPQUFBLHFDQUFBOztJQUNDLENBQUMsQ0FBQyxnQkFBRixDQUFtQixPQUFuQixFQUE0QixTQUFFLEVBQUY7QUFFM0IsVUFBQTtBQUFBO0FBQUEsV0FBQSx3Q0FBQTs7UUFDQyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQWIsQ0FBb0IsUUFBcEI7QUFERDtNQUVBLElBQUMsQ0FBQSxTQUFTLENBQUMsR0FBWCxDQUFlLFFBQWY7QUFFQTtBQUFBLFdBQUEsd0NBQUE7O1FBQ0MsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFULEdBQW1CO0FBRHBCO01BR0EsUUFBUSxDQUFDLGNBQVQsQ0FBeUIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxNQUFsQyxDQUEwQyxDQUFDLEtBQUssQ0FBQyxPQUFqRCxHQUEyRDthQUUzRCxFQUFFLENBQUMsY0FBSCxDQUFBO0lBWDJCLENBQTVCO0FBREQ7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImZvciBlIGluIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoIFwidGFiLS1uYXZcIiApXG5cdGUuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsICggZXYgKSAtPlxuXG5cdFx0Zm9yIGVpIGluIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgXCJ0YWItLW5hdlwiXG5cdFx0XHRlaS5jbGFzc0xpc3QucmVtb3ZlIFwiYWN0aXZlXCJcblx0XHRAY2xhc3NMaXN0LmFkZCBcImFjdGl2ZVwiXG5cblx0XHRmb3IgZWkgaW4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSBcInRhYi0tcGFnZVwiXG5cdFx0XHRlaS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBAZGF0YXNldC50YXJnZXQgKS5zdHlsZS5kaXNwbGF5ID0gXCJcIlxuXG5cdFx0ZXYucHJldmVudERlZmF1bHQoKVxuIl19
