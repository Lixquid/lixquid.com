(function() {
  var e, i, len, ref, setItem;

  localStorage.setItem("__storage_test__", "__storage_test__");

  localStorage.removeItem("__storage_test__");

  setItem = function(e) {
    if (e.type === "checkbox") {
      if (localStorage.getItem(e.id) == null) {
        e.checked = e.dataset["default"] === "";
      } else {
        e.checked = localStorage.getItem(e.id) === "true";
      }
    }
    if (e.type === "text" || e.type === "number") {
      if (localStorage.getItem(e.id) == null) {
        return e.value = e.dataset["default"];
      } else {
        return e.value = localStorage.getItem(e.id);
      }
    }
  };

  ref = document.getElementsByClassName("settings--setting");
  for (i = 0, len = ref.length; i < len; i++) {
    e = ref[i];
    setItem(e);
    if (e.type === "checkbox") {
      e.addEventListener("change", function() {
        return localStorage.setItem(this.id, this.checked);
      });
    }
    if (e.type === "text" || e.type === "number") {
      e.addEventListener("change", function() {
        return localStorage.setItem(this.id, this.value);
      });
    }
  }

  document.getElementById("settings--reset").addEventListener("click", function(ev) {
    var j, len1, ref1;
    ref1 = document.getElementsByClassName("settings--setting");
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      e = ref1[j];
      localStorage.removeItem(e.id);
      setItem(e);
    }
    return ev.preventDefault();
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VzL2xheW91dHMvbWFpbi91dGlsL3NldHRpbmdzLmpzIiwic291cmNlcyI6WyJyZXNvdXJjZXMvbGF5b3V0cy9tYWluL3V0aWwvc2V0dGluZ3MuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0FBQUEsTUFBQTs7RUFBQSxZQUFZLENBQUMsT0FBYixDQUFzQixrQkFBdEIsRUFBMEMsa0JBQTFDOztFQUNBLFlBQVksQ0FBQyxVQUFiLENBQXlCLGtCQUF6Qjs7RUFFQSxPQUFBLEdBQVUsU0FBRSxDQUFGO0lBQ1QsSUFBRyxDQUFDLENBQUMsSUFBRixLQUFVLFVBQWI7TUFDQyxJQUFPLGtDQUFQO1FBQ0MsQ0FBQyxDQUFDLE9BQUYsR0FBWSxDQUFDLENBQUMsT0FBTyxFQUFDLE9BQUQsRUFBVCxLQUFxQixHQURsQztPQUFBLE1BQUE7UUFHQyxDQUFDLENBQUMsT0FBRixHQUFZLFlBQVksQ0FBQyxPQUFiLENBQXNCLENBQUMsQ0FBQyxFQUF4QixDQUFBLEtBQWdDLE9BSDdDO09BREQ7O0lBS0EsSUFBRyxDQUFDLENBQUMsSUFBRixLQUFVLE1BQVYsSUFBb0IsQ0FBQyxDQUFDLElBQUYsS0FBVSxRQUFqQztNQUNDLElBQU8sa0NBQVA7ZUFDQyxDQUFDLENBQUMsS0FBRixHQUFVLENBQUMsQ0FBQyxPQUFPLEVBQUMsT0FBRCxHQURwQjtPQUFBLE1BQUE7ZUFHQyxDQUFDLENBQUMsS0FBRixHQUFVLFlBQVksQ0FBQyxPQUFiLENBQXNCLENBQUMsQ0FBQyxFQUF4QixFQUhYO09BREQ7O0VBTlM7O0FBWVY7QUFBQSxPQUFBLHFDQUFBOztJQUNDLE9BQUEsQ0FBUyxDQUFUO0lBQ0EsSUFBRyxDQUFDLENBQUMsSUFBRixLQUFVLFVBQWI7TUFDQyxDQUFDLENBQUMsZ0JBQUYsQ0FBbUIsUUFBbkIsRUFBNkIsU0FBQTtlQUM1QixZQUFZLENBQUMsT0FBYixDQUFzQixJQUFDLENBQUEsRUFBdkIsRUFBMkIsSUFBQyxDQUFBLE9BQTVCO01BRDRCLENBQTdCLEVBREQ7O0lBR0EsSUFBRyxDQUFDLENBQUMsSUFBRixLQUFVLE1BQVYsSUFBb0IsQ0FBQyxDQUFDLElBQUYsS0FBVSxRQUFqQztNQUNDLENBQUMsQ0FBQyxnQkFBRixDQUFtQixRQUFuQixFQUE2QixTQUFBO2VBQzVCLFlBQVksQ0FBQyxPQUFiLENBQXNCLElBQUMsQ0FBQSxFQUF2QixFQUEyQixJQUFDLENBQUEsS0FBNUI7TUFENEIsQ0FBN0IsRUFERDs7QUFMRDs7RUFTQSxRQUFRLENBQUMsY0FBVCxDQUF5QixpQkFBekIsQ0FBNEMsQ0FBQyxnQkFBN0MsQ0FBOEQsT0FBOUQsRUFBdUUsU0FBRSxFQUFGO0FBQ3RFLFFBQUE7QUFBQTtBQUFBLFNBQUEsd0NBQUE7O01BQ0MsWUFBWSxDQUFDLFVBQWIsQ0FBeUIsQ0FBQyxDQUFDLEVBQTNCO01BQ0EsT0FBQSxDQUFTLENBQVQ7QUFGRDtXQUlBLEVBQUUsQ0FBQyxjQUFILENBQUE7RUFMc0UsQ0FBdkU7QUF4QkEiLCJzb3VyY2VzQ29udGVudCI6WyIjIyBUZXN0IGlmIGxvY2FsU3RvcmFnZSBpcyBhdmFpbGFibGVcbmxvY2FsU3RvcmFnZS5zZXRJdGVtKCBcIl9fc3RvcmFnZV90ZXN0X19cIiwgXCJfX3N0b3JhZ2VfdGVzdF9fXCIgKVxubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oIFwiX19zdG9yYWdlX3Rlc3RfX1wiIClcblxuc2V0SXRlbSA9ICggZSApIC0+XG5cdGlmIGUudHlwZSA9PSBcImNoZWNrYm94XCJcblx0XHRpZiBub3QgbG9jYWxTdG9yYWdlLmdldEl0ZW0oIGUuaWQgKT9cblx0XHRcdGUuY2hlY2tlZCA9IGUuZGF0YXNldC5kZWZhdWx0ID09IFwiXCJcblx0XHRlbHNlXG5cdFx0XHRlLmNoZWNrZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSggZS5pZCApID09IFwidHJ1ZVwiXG5cdGlmIGUudHlwZSA9PSBcInRleHRcIiBvciBlLnR5cGUgPT0gXCJudW1iZXJcIlxuXHRcdGlmIG5vdCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSggZS5pZCApP1xuXHRcdFx0ZS52YWx1ZSA9IGUuZGF0YXNldC5kZWZhdWx0XG5cdFx0ZWxzZVxuXHRcdFx0ZS52YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCBlLmlkIClcblxuZm9yIGUgaW4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSBcInNldHRpbmdzLS1zZXR0aW5nXCJcblx0c2V0SXRlbSggZSApXG5cdGlmIGUudHlwZSA9PSBcImNoZWNrYm94XCJcblx0XHRlLmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgLT5cblx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCBAaWQsIEBjaGVja2VkIClcblx0aWYgZS50eXBlID09IFwidGV4dFwiIHx8IGUudHlwZSA9PSBcIm51bWJlclwiXG5cdFx0ZS5hZGRFdmVudExpc3RlbmVyIFwiY2hhbmdlXCIsIC0+XG5cdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSggQGlkLCBAdmFsdWUgKVxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJzZXR0aW5ncy0tcmVzZXRcIiApLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAoIGV2ICkgLT5cblx0Zm9yIGUgaW4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSBcInNldHRpbmdzLS1zZXR0aW5nXCJcblx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSggZS5pZCApXG5cdFx0c2V0SXRlbSggZSApXG5cblx0ZXYucHJldmVudERlZmF1bHQoKVxuIl19
