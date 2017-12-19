(function() {
  var e, i, len, ref;

  ref = document.getElementsByClassName("tab--nav");
  for (i = 0, len = ref.length; i < len; i++) {
    e = ref[i];
    if (window.tabActivePage == null) {
      window.tabActivePage = e.dataset.target;
    }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VzL2xheW91dHMvbWFpbi91dGlsL3RhYnMuanMiLCJzb3VyY2VzIjpbInJlc291cmNlcy9sYXlvdXRzL21haW4vdXRpbC90YWJzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0FBQUE7QUFBQSxPQUFBLHFDQUFBOztJQUNDLElBQU8sNEJBQVA7TUFDQyxNQUFNLENBQUMsYUFBUCxHQUF1QixDQUFDLENBQUMsT0FBTyxDQUFDLE9BRGxDOztJQUVBLENBQUMsQ0FBQyxnQkFBRixDQUFtQixPQUFuQixFQUE0QixTQUFFLEVBQUY7QUFFM0IsVUFBQTtBQUFBO0FBQUEsV0FBQSx3Q0FBQTs7UUFDQyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQWIsQ0FBb0IsUUFBcEI7QUFERDtNQUVBLElBQUMsQ0FBQSxTQUFTLENBQUMsR0FBWCxDQUFlLFFBQWY7QUFFQTtBQUFBLFdBQUEsd0NBQUE7O1FBQ0MsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFULEdBQW1CO0FBRHBCO01BR0EsUUFBUSxDQUFDLGNBQVQsQ0FBeUIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxNQUFsQyxDQUEwQyxDQUFDLEtBQUssQ0FBQyxPQUFqRCxHQUEyRDtNQUMzRCxNQUFNLENBQUMsYUFBUCxHQUF1QixJQUFDLENBQUEsT0FBTyxDQUFDO2FBRWhDLEVBQUUsQ0FBQyxjQUFILENBQUE7SUFaMkIsQ0FBNUI7QUFIRDtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZm9yIGUgaW4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggXCJ0YWItLW5hdlwiIClcblx0aWYgbm90IHdpbmRvdy50YWJBY3RpdmVQYWdlP1xuXHRcdHdpbmRvdy50YWJBY3RpdmVQYWdlID0gZS5kYXRhc2V0LnRhcmdldFxuXHRlLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAoIGV2ICkgLT5cblxuXHRcdGZvciBlaSBpbiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lIFwidGFiLS1uYXZcIlxuXHRcdFx0ZWkuY2xhc3NMaXN0LnJlbW92ZSBcImFjdGl2ZVwiXG5cdFx0QGNsYXNzTGlzdC5hZGQgXCJhY3RpdmVcIlxuXG5cdFx0Zm9yIGVpIGluIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgXCJ0YWItLXBhZ2VcIlxuXHRcdFx0ZWkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggQGRhdGFzZXQudGFyZ2V0ICkuc3R5bGUuZGlzcGxheSA9IFwiXCJcblx0XHR3aW5kb3cudGFiQWN0aXZlUGFnZSA9IEBkYXRhc2V0LnRhcmdldFxuXG5cdFx0ZXYucHJldmVudERlZmF1bHQoKVxuIl19
