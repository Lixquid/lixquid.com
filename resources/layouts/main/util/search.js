(function() {
  var buildList, buildPagination, currentPage, eInput, ePagination, getItemList, matchesSearch, maximumPage;

  ePagination = document.getElementById("search--pagination");

  eInput = document.getElementById("search--input");

  currentPage = 1;

  maximumPage = 1;

  matchesSearch = function(e) {
    if (eInput.value === "") {
      return true;
    }
    if (!e.dataset.title) {
      return false;
    }
    return e.dataset.title.includes(eInput.value);
  };

  getItemList = function() {
    var e, j, len, list, ref;
    list = [];
    ref = document.getElementsByClassName("search--item");
    for (j = 0, len = ref.length; j < len; j++) {
      e = ref[j];
      if (!matchesSearch(e)) {
        e.style.display = "none";
        continue;
      }
      e.style.display = null;
      list.push(e);
    }
    return list;
  };

  buildList = function(page) {
    var e, i, j, len, ref, ref1, results;
    ref = getItemList();
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      e = ref[i];
      e.listIndex = i;
      maximumPage = Math.ceil((i + 1) / 10);
      console.log(maximumPage);
      if ((page * 10 - 11 < (ref1 = e.listIndex) && ref1 < page * 10)) {

      } else {
        results.push(e.style.display = "none");
      }
    }
    return results;
  };

  buildPagination = function(page) {
    var clickEv, ea, en, i, j, ref;
    if (page > maximumPage) {
      page = maximumPage;
    }
    currentPage = page;
    if (maximumPage === 1) {
      ePagination.style.display = "none";
      return;
    } else {
      ePagination.style.display = null;
    }
    ePagination.innerHTML = "";
    clickEv = function(page) {
      return function() {
        buildList(page);
        return buildPagination(page);
      };
    };
    en = document.createElement("li");
    en.classList = ["page-item"];
    ePagination.appendChild(en);
    ea = document.createElement("a");
    ea.href = "#";
    ea.classList = ["page-link"];
    ea.textContent = "Previous";
    en.appendChild(ea);
    if (page === 1) {
      ea.tabIndex = -1;
      en.classList.add("disabled");
    } else {
      ea.addEventListener("click", clickEv(page - 1));
    }
    for (i = j = 1, ref = maximumPage; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      en = document.createElement("li");
      en.classList = ["page-item"];
      ePagination.appendChild(en);
      ea = document.createElement("a");
      ea.href = "#";
      ea.classList = ["page-link"];
      ea.textContent = i;
      en.appendChild(ea);
      if (page === i) {
        en.classList.add("active");
      } else {
        ea.addEventListener("click", clickEv(i));
      }
    }
    en = document.createElement("li");
    en.classList = ["page-item"];
    ePagination.appendChild(en);
    ea = document.createElement("a");
    ea.href = "#";
    ea.classList = ["page-link"];
    ea.textContent = "Next";
    en.appendChild(ea);
    if (page === maximumPage) {
      ea.tabIndex = -1;
      return en.classList.add("disabled");
    } else {
      return ea.addEventListener("click", clickEv(page + 1));
    }
  };

  buildList(1);

  buildPagination(1);

  eInput.addEventListener("change", function() {
    buildList(currentPage);
    return buildPagination(currentPage);
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VzL2xheW91dHMvbWFpbi91dGlsL3NlYXJjaC5qcyIsInNvdXJjZXMiOlsicmVzb3VyY2VzL2xheW91dHMvbWFpbi91dGlsL3NlYXJjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7QUFBQSxNQUFBOztFQUFBLFdBQUEsR0FBYyxRQUFRLENBQUMsY0FBVCxDQUF3QixvQkFBeEI7O0VBQ2QsTUFBQSxHQUFTLFFBQVEsQ0FBQyxjQUFULENBQXdCLGVBQXhCOztFQUlULFdBQUEsR0FBYzs7RUFDZCxXQUFBLEdBQWM7O0VBSWQsYUFBQSxHQUFnQixTQUFFLENBQUY7SUFDZixJQUFlLE1BQU0sQ0FBQyxLQUFQLEtBQWdCLEVBQS9CO0FBQUEsYUFBTyxLQUFQOztJQUNBLElBQWdCLENBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUE5QjtBQUFBLGFBQU8sTUFBUDs7QUFDQSxXQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQWhCLENBQTBCLE1BQU0sQ0FBQyxLQUFqQztFQUhROztFQUtoQixXQUFBLEdBQWMsU0FBQTtBQUNiLFFBQUE7SUFBQSxJQUFBLEdBQU87QUFFUDtBQUFBLFNBQUEscUNBQUE7O01BQ0MsSUFBRyxDQUFJLGFBQUEsQ0FBZSxDQUFmLENBQVA7UUFDQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQVIsR0FBa0I7QUFDbEIsaUJBRkQ7O01BR0EsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFSLEdBQWtCO01BQ2xCLElBQUksQ0FBQyxJQUFMLENBQVUsQ0FBVjtBQUxEO0FBT0EsV0FBTztFQVZNOztFQWNkLFNBQUEsR0FBWSxTQUFFLElBQUY7QUFDWCxRQUFBO0FBQUE7QUFBQTtTQUFBLDZDQUFBOztNQUNDLENBQUMsQ0FBQyxTQUFGLEdBQWM7TUFDZCxXQUFBLEdBQWMsSUFBSSxDQUFDLElBQUwsQ0FBVyxDQUFFLENBQUEsR0FBSSxDQUFOLENBQUEsR0FBWSxFQUF2QjtNQUNkLE9BQU8sQ0FBQyxHQUFSLENB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O2FBSUMsRUFBRSxDQUFDLGdCQUFILENBQW9CLE9BQXBCLEVBQTZCLE9BQUEsQ0FBUyxJQUFBLEdBQU8sQ0FBaEIsQ0FBN0IsRUFKRDs7RUEzRGlCOztFQWlFbEIsU0FBQSxDQUFXLENBQVg7O0VBQ0EsZUFBQSxDQUFpQixDQUFqQjs7RUFFQSxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsU0FBQTtJQUNqQyxTQUFBLENBQVcsV0FBWDtXQUNBLGVBQUEsQ0FBaUIsV0FBakI7RUFGaUMsQ0FBbEM7QUE1R0EiLCJzb3VyY2VzQ29udGVudCI6WyIjIyBFbGVtZW50cyAjI1xuXG5lUGFnaW5hdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwic2VhcmNoLS1wYWdpbmF0aW9uXCJcbmVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwic2VhcmNoLS1pbnB1dFwiXG5cbiMjIFZhcmlhYmxlcyAjI1xuXG5jdXJyZW50UGFnZSA9IDFcbm1heGltdW1QYWdlID0gMVxuXG4jIyBTZWFyY2ggIyNcblxubWF0Y2hlc1NlYXJjaCA9ICggZSApIC0+XG5cdHJldHVybiB0cnVlIGlmIGVJbnB1dC52YWx1ZSA9PSBcIlwiXG5cdHJldHVybiBmYWxzZSBpZiBub3QgZS5kYXRhc2V0LnRpdGxlXG5cdHJldHVybiBlLmRhdGFzZXQudGl0bGUuaW5jbHVkZXMoIGVJbnB1dC52YWx1ZSApXG5cbmdldEl0ZW1MaXN0ID0gLT5cblx0bGlzdCA9IFtdXG5cblx0Zm9yIGUgaW4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSBcInNlYXJjaC0taXRlbVwiXG5cdFx0aWYgbm90IG1hdGNoZXNTZWFyY2goIGUgKVxuXHRcdFx0ZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblx0XHRcdGNvbnRpbnVlXG5cdFx0ZS5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRcdGxpc3QucHVzaCBlXG5cblx0cmV0dXJuIGxpc3RcblxuIyMgUGFnaW5hdGlvbiAjI1xuXG5idWlsZExpc3QgPSAoIHBhZ2UgKSAtPlxuXHRmb3IgZSwgaSBpbiBnZXRJdGVtTGlzdCgpXG5cdFx0ZS5saXN0SW5kZXggPSBpXG5cdFx0bWF4aW11bVBhZ2UgPSBNYXRoLmNlaWwoICggaSArIDEgKSAvIDEwIClcblx0XHRjb25zb2xlLmxvZyBtYXhpbXVtUGFnZVxuXG5cdFx0aWYgcGFnZSAqIDEwIC0gMTEgPCBlLmxpc3RJbmRleCA8IHBhZ2UgKiAxMFxuXHRcdFx0IyBlLnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdFx0ZWxzZVxuXHRcdFx0ZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblxuYnVpbGRQYWdpbmF0aW9uID0gKCBwYWdlICkgLT5cblx0cGFnZSA9IG1heGltdW1QYWdlIGlmIHBhZ2UgPiBtYXhpbXVtUGFnZVxuXG5cdGN1cnJlbnRQYWdlID0gcGFnZVxuXHRpZiBtYXhpbXVtUGFnZSA9PSAxXG5cdFx0ZVBhZ2luYXRpb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cdFx0cmV0dXJuXG5cdGVsc2Vcblx0XHRlUGFnaW5hdGlvbi5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXG5cdGVQYWdpbmF0aW9uLmlubmVySFRNTCA9IFwiXCJcblxuXHRjbGlja0V2ID0gKCBwYWdlICkgLT5cblx0XHRyZXR1cm4gLT5cblx0XHRcdGJ1aWxkTGlzdCggcGFnZSApXG5cdFx0XHRidWlsZFBhZ2luYXRpb24oIHBhZ2UgKVxuXG5cdGVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImxpXCJcblx0ZW4uY2xhc3NMaXN0ID0gWyBcInBhZ2UtaXRlbVwiIF1cblx0ZVBhZ2luYXRpb24uYXBwZW5kQ2hpbGQoIGVuIClcblxuXHRlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJhXCJcblx0ZWEuaHJlZiA9IFwiI1wiXG5cdGVhLmNsYXNzTGlzdCA9IFsgXCJwYWdlLWxpbmtcIiBdXG5cdGVhLnRleHRDb250ZW50ID0gXCJQcmV2aW91c1wiXG5cdGVuLmFwcGVuZENoaWxkKCBlYSApXG5cblx0aWYgcGFnZSA9PSAxXG5cdFx0ZWEudGFiSW5kZXggPSAtMVxuXHRcdGVuLmNsYXNzTGlzdC5hZGQoIFwiZGlzYWJsZWRcIiApXG5cdGVsc2Vcblx0XHRlYS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgY2xpY2tFdiggcGFnZSAtIDEgKVxuXG5cdGZvciBpIGluIFsgMSAuLiBtYXhpbXVtUGFnZSBdXG5cdFx0ZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwibGlcIlxuXHRcdGVuLmNsYXNzTGlzdCA9IFsgXCJwYWdlLWl0ZW1cIiBdXG5cdFx0ZVBhZ2luYXRpb24uYXBwZW5kQ2hpbGQoIGVuIClcblxuXHRcdGVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImFcIlxuXHRcdGVhLmhyZWYgPSBcIiNcIlxuXHRcdGVhLmNsYXNzTGlzdCA9IFsgXCJwYWdlLWxpbmtcIiBdXG5cdFx0ZWEudGV4dENvbnRlbnQgPSBpXG5cdFx0ZW4uYXBwZW5kQ2hpbGQoIGVhIClcblxuXHRcdGlmIHBhZ2UgPT0gaVxuXHRcdFx0ZW4uY2xhc3NMaXN0LmFkZCggXCJhY3RpdmVcIiApXG5cdFx0ZWxzZVxuXHRcdFx0ZWEuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIGNsaWNrRXYoIGkgKVxuXG5cdGVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImxpXCJcblx0ZW4uY2xhc3NMaXN0ID0gWyBcInBhZ2UtaXRlbVwiIF1cblx0ZVBhZ2luYXRpb24uYXBwZW5kQ2hpbGQoIGVuIClcblxuXHRlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJhXCJcblx0ZWEuaHJlZiA9IFwiI1wiXG5cdGVhLmNsYXNzTGlzdCA9IFsgXCJwYWdlLWxpbmtcIiBdXG5cdGVhLnRleHRDb250ZW50ID0gXCJOZXh0XCJcblx0ZW4uYXBwZW5kQ2hpbGQoIGVhIClcblxuXHRpZiBwYWdlID09IG1heGltdW1QYWdlXG5cdFx0ZWEudGFiSW5kZXggPSAtMVxuXHRcdGVuLmNsYXNzTGlzdC5hZGQoIFwiZGlzYWJsZWRcIiApXG5cdGVsc2Vcblx0XHRlYS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgY2xpY2tFdiggcGFnZSArIDEgKVxuXG5idWlsZExpc3QoIDEgKVxuYnVpbGRQYWdpbmF0aW9uKCAxIClcblxuZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgLT5cblx0YnVpbGRMaXN0KCBjdXJyZW50UGFnZSApXG5cdGJ1aWxkUGFnaW5hdGlvbiggY3VycmVudFBhZ2UgKVxuIl19
