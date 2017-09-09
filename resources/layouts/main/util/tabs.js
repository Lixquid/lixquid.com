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
      window.tabActivePage = this.dataset.target;
      return ev.preventDefault();
    });
  }

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VzL2xheW91dHMvbWFpbi91dGlsL3RhYnMuanMiLCJzb3VyY2VzIjpbInJlc291cmNlcy9sYXlvdXRzL21haW4vdXRpbC90YWJzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0FBQUE7QUFBQSxPQUFBLHFDQUFBOztJQUNDLENBQUMsQ0FBQyxnQkFBRixDQUFtQixPQUFuQixFQUE0QixTQUFFLEVBQUY7QUFFM0IsVUFBQTtBQUFBO0FBQUEsV0FBQSx3Q0FBQTs7UUFDQyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQWIsQ0FBb0IsUUFBcEI7QUFERDtNQUVBLElBQUMsQ0FBQSxTQUFTLENBQUMsR0FBWCxDQUFlLFFBQWY7QUFFQTtBQUFBLFdBQUEsd0NBQUE7O1FBQ0MsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFULEdBQW1CO0FBRHBCO01BR0EsUUFBUSxDQUFDLGNBQVQsQ0FBeUIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxNQUFsQyxDQUEwQyxDQUFDLEtBQUssQ0FBQyxPQUFqRCxHQUEyRDtNQUMzRCxNQUFNLENBQUMsYUFBUCxHQUF1QixJQUFDLENBQUEsT0FBTyxDQUFDO2FBRWhDLEVBQUUsQ0FBQyxjQUFILENBQUE7SUFaMkIsQ0FBNUI7QUFERDtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZm9yIGUgaW4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggXCJ0YWItLW5hdlwiIClcblx0ZS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgKCBldiApIC0+XG5cblx0XHRmb3IgZWkgaW4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSBcInRhYi0tbmF2XCJcblx0XHRcdGVpLmNsYXNzTGlzdC5yZW1vdmUgXCJhY3RpdmVcIlxuXHRcdEBjbGFzc0xpc3QuYWRkIFwiYWN0aXZlXCJcblxuXHRcdGZvciBlaSBpbiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lIFwidGFiLS1wYWdlXCJcblx0XHRcdGVpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIEBkYXRhc2V0LnRhcmdldCApLnN0eWxlLmRpc3BsYXkgPSBcIlwiXG5cdFx0d2luZG93LnRhYkFjdGl2ZVBhZ2UgPSBAZGF0YXNldC50YXJnZXRcblxuXHRcdGV2LnByZXZlbnREZWZhdWx0KClcbiJdfQ==
