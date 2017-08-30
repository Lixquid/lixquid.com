(function() {
  var buildList, buildPagination, currentPage, eCancel, eCancelContainer, eInput, ePagination, getItemList, matchesSearch, maximumPage, sortList;

  ePagination = document.getElementById("search--pagination");

  eInput = document.getElementById("search--input");

  eCancelContainer = document.getElementById("search--cancel--container");

  eCancel = document.getElementById("search--cancel");

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

  sortList = function() {
    if (eInput.value !== "") {
      eCancelContainer.style.display = null;
    } else {
      eCancelContainer.style.display = "none";
    }
    buildList(currentPage);
    return buildPagination(currentPage);
  };

  eInput.addEventListener("input", sortList);

  eCancel.addEventListener("click", function() {
    eInput.value = "";
    return sortList();
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VzL2xheW91dHMvbWFpbi91dGlsL3NlYXJjaC5qcyIsInNvdXJjZXMiOlsicmVzb3VyY2VzL2xheW91dHMvbWFpbi91dGlsL3NlYXJjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7QUFBQSxNQUFBOztFQUFBLFdBQUEsR0FBYyxRQUFRLENBQUMsY0FBVCxDQUF3QixvQkFBeEI7O0VBQ2QsTUFBQSxHQUFTLFFBQVEsQ0FBQyxjQUFULENBQXdCLGVBQXhCOztFQUNULGdCQUFBLEdBQW1CLFFBQVEsQ0FBQyxjQUFULENBQXdCLDJCQUF4Qjs7RUFDbkIsT0FBQSxHQUFVLFFBQVEsQ0FBQyxjQUFULENBQXdCLGdCQUF4Qjs7RUFJVixXQUFBLEdBQWM7O0VBQ2QsV0FBQSxHQUFjOztFQUlkLGFBQUEsR0FBZ0IsU0FBRSxDQUFGO0lBQ2YsSUFBZSxNQUFNLENBQUMsS0FBUCxLQUFnQixFQUEvQjtBQUFBLGFBQU8sS0FBUDs7SUFDQSxJQUFnQixDQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBOUI7QUFBQSxhQUFPLE1BQVA7O0FBQ0EsV0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFoQixDQUEwQixNQUFNLENBQUMsS0FBakM7RUFIUTs7RUFLaEIsV0FBQSxHQUFjLFNBQUE7QUFDYixRQUFBO0lBQUEsSUFBQSxHQUFPO0FBRVA7QUFBQSxTQUFBLHFDQUFBOztNQUNDLElBQUcsQ0FBSSxhQUFBLENBQWUsQ0FBZixDQUFQO1FBQ0MsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFSLEdBQWtCO0FBQ2xCLGlCQUZEOztNQUdBLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBUixHQUFrQjtNQUNsQixJQUFJLENBQUMsSUFBTCxDQUFVLENBQVY7QUFMRDtBQU9BLFdBQU87RUFWTTs7RUFjZCxTQUFBLEdBQVksU0FBRSxJQUFGO0FBQ1gsUUFBQTtBQUFBO0FBQUE7U0FBQSw2Q0FBQTs7TUFDQyxDQUFDLENBQUMsU0FBRixHQUFjO01B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V0FBWDtNQUNDLEVBQUUsQ0FBQyxRQUFILEdBQWMsQ0FBQzthQUNmLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBYixDQUFrQixVQUFsQixFQUZEO0tBQUEsTUFBQTthQUlDLEVBQUUsQ0FBQyxnQkFBSCxDQUFvQixPQUFwQixFQUE2QixPQUFBLENBQVMsSUFBQSxHQUFPLENBQWhCLENBQTdCLEVBSkQ7O0VBM0RpQjs7RUFpRWxCLFNBQUEsQ0FBVyxDQUFYOztFQUNBLGVBQUEsQ0FBaUIsQ0FBakI7O0VBRUEsUUFBQSxHQUFXLFNBQUE7SUFDVixJQUFHLE1BQU0sQ0FBQyxLQUFQLEtBQWdCLEVBQW5CO01BQ0MsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE9BQXZCLEdBQWlDLEtBRGxDO0tBQUEsTUFBQTtNQUdDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxPQUF2QixHQUFpQyxPQUhsQzs7SUFLQSxTQUFBLENBQVcsV0FBWDtXQUNBLGVBQUEsQ0FBaUIsV0FBakI7RUFQVTs7RUFTWCxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsUUFBakM7O0VBRUEsT0FBTyxDQUFDLGdCQUFSLENBQXlCLE9BQXpCLEVBQWtDLFNBQUE7SUFDakMsTUFBTSxDQUFDLEtBQVAsR0FBZTtXQUNmLFFBQUEsQ0FBQTtFQUZpQyxDQUFsQztBQXpIQSIsInNvdXJjZXNDb250ZW50IjpbIiMjIEVsZW1lbnRzICMjXG5cbmVQYWdpbmF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJzZWFyY2gtLXBhZ2luYXRpb25cIlxuZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJzZWFyY2gtLWlucHV0XCJcbmVDYW5jZWxDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcInNlYXJjaC0tY2FuY2VsLS1jb250YWluZXJcIlxuZUNhbmNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwic2VhcmNoLS1jYW5jZWxcIlxuXG4jIyBWYXJpYWJsZXMgIyNcblxuY3VycmVudFBhZ2UgPSAxXG5tYXhpbXVtUGFnZSA9IDFcblxuIyMgU2VhcmNoICMjXG5cbm1hdGNoZXNTZWFyY2ggPSAoIGUgKSAtPlxuXHRyZXR1cm4gdHJ1ZSBpZiBlSW5wdXQudmFsdWUgPT0gXCJcIlxuXHRyZXR1cm4gZmFsc2UgaWYgbm90IGUuZGF0YXNldC50aXRsZVxuXHRyZXR1cm4gZS5kYXRhc2V0LnRpdGxlLmluY2x1ZGVzKCBlSW5wdXQudmFsdWUgKVxuXG5nZXRJdGVtTGlzdCA9IC0+XG5cdGxpc3QgPSBbXVxuXG5cdGZvciBlIGluIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgXCJzZWFyY2gtLWl0ZW1cIlxuXHRcdGlmIG5vdCBtYXRjaGVzU2VhcmNoKCBlIClcblx0XHRcdGUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cdFx0XHRjb250aW51ZVxuXHRcdGUuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0XHRsaXN0LnB1c2ggZVxuXG5cdHJldHVybiBsaXN0XG5cbiMjIFBhZ2luYXRpb24gIyNcblxuYnVpbGRMaXN0ID0gKCBwYWdlICkgLT5cblx0Zm9yIGUsIGkgaW4gZ2V0SXRlbUxpc3QoKVxuXHRcdGUubGlzdEluZGV4ID0gaVxuXHRcdG1heGltdW1QYWdlID0gTWF0aC5jZWlsKCAoIGkgKyAxICkgLyAxMCApXG5cdFx0Y29uc29sZS5sb2cgbWF4aW11bVBhZ2VcblxuXHRcdGlmIHBhZ2UgKiAxMCAtIDExIDwgZS5saXN0SW5kZXggPCBwYWdlICogMTBcblx0XHRcdCMgZS5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRcdGVsc2Vcblx0XHRcdGUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cbmJ1aWxkUGFnaW5hdGlvbiA9ICggcGFnZSApIC0+XG5cdHBhZ2UgPSBtYXhpbXVtUGFnZSBpZiBwYWdlID4gbWF4aW11bVBhZ2VcblxuXHRjdXJyZW50UGFnZSA9IHBhZ2Vcblx0aWYgbWF4aW11bVBhZ2UgPT0gMVxuXHRcdGVQYWdpbmF0aW9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXHRcdHJldHVyblxuXHRlbHNlXG5cdFx0ZVBhZ2luYXRpb24uc3R5bGUuZGlzcGxheSA9IG51bGxcblxuXHRlUGFnaW5hdGlvbi5pbm5lckhUTUwgPSBcIlwiXG5cblx0Y2xpY2tFdiA9ICggcGFnZSApIC0+XG5cdFx0cmV0dXJuIC0+XG5cdFx0XHRidWlsZExpc3QoIHBhZ2UgKVxuXHRcdFx0YnVpbGRQYWdpbmF0aW9uKCBwYWdlIClcblxuXHRlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJsaVwiXG5cdGVuLmNsYXNzTGlzdCA9IFsgXCJwYWdlLWl0ZW1cIiBdXG5cdGVQYWdpbmF0aW9uLmFwcGVuZENoaWxkKCBlbiApXG5cblx0ZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiYVwiXG5cdGVhLmhyZWYgPSBcIiNcIlxuXHRlYS5jbGFzc0xpc3QgPSBbIFwicGFnZS1saW5rXCIgXVxuXHRlYS50ZXh0Q29udGVudCA9IFwiUHJldmlvdXNcIlxuXHRlbi5hcHBlbmRDaGlsZCggZWEgKVxuXG5cdGlmIHBhZ2UgPT0gMVxuXHRcdGVhLnRhYkluZGV4ID0gLTFcblx0XHRlbi5jbGFzc0xpc3QuYWRkKCBcImRpc2FibGVkXCIgKVxuXHRlbHNlXG5cdFx0ZWEuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIGNsaWNrRXYoIHBhZ2UgLSAxIClcblxuXHRmb3IgaSBpbiBbIDEgLi4gbWF4aW11bVBhZ2UgXVxuXHRcdGVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImxpXCJcblx0XHRlbi5jbGFzc0xpc3QgPSBbIFwicGFnZS1pdGVtXCIgXVxuXHRcdGVQYWdpbmF0aW9uLmFwcGVuZENoaWxkKCBlbiApXG5cblx0XHRlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJhXCJcblx0XHRlYS5ocmVmID0gXCIjXCJcblx0XHRlYS5jbGFzc0xpc3QgPSBbIFwicGFnZS1saW5rXCIgXVxuXHRcdGVhLnRleHRDb250ZW50ID0gaVxuXHRcdGVuLmFwcGVuZENoaWxkKCBlYSApXG5cblx0XHRpZiBwYWdlID09IGlcblx0XHRcdGVuLmNsYXNzTGlzdC5hZGQoIFwiYWN0aXZlXCIgKVxuXHRcdGVsc2Vcblx0XHRcdGVhLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCBjbGlja0V2KCBpIClcblxuXHRlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJsaVwiXG5cdGVuLmNsYXNzTGlzdCA9IFsgXCJwYWdlLWl0ZW1cIiBdXG5cdGVQYWdpbmF0aW9uLmFwcGVuZENoaWxkKCBlbiApXG5cblx0ZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiYVwiXG5cdGVhLmhyZWYgPSBcIiNcIlxuXHRlYS5jbGFzc0xpc3QgPSBbIFwicGFnZS1saW5rXCIgXVxuXHRlYS50ZXh0Q29udGVudCA9IFwiTmV4dFwiXG5cdGVuLmFwcGVuZENoaWxkKCBlYSApXG5cblx0aWYgcGFnZSA9PSBtYXhpbXVtUGFnZVxuXHRcdGVhLnRhYkluZGV4ID0gLTFcblx0XHRlbi5jbGFzc0xpc3QuYWRkKCBcImRpc2FibGVkXCIgKVxuXHRlbHNlXG5cdFx0ZWEuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIGNsaWNrRXYoIHBhZ2UgKyAxIClcblxuYnVpbGRMaXN0KCAxIClcbmJ1aWxkUGFnaW5hdGlvbiggMSApXG5cbnNvcnRMaXN0ID0gLT5cblx0aWYgZUlucHV0LnZhbHVlICE9IFwiXCJcblx0XHRlQ2FuY2VsQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdGVsc2Vcblx0XHRlQ2FuY2VsQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXG5cdGJ1aWxkTGlzdCggY3VycmVudFBhZ2UgKVxuXHRidWlsZFBhZ2luYXRpb24oIGN1cnJlbnRQYWdlIClcblxuZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJpbnB1dFwiLCBzb3J0TGlzdFxuXG5lQ2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXHRlSW5wdXQudmFsdWUgPSBcIlwiXG5cdHNvcnRMaXN0KClcbiJdfQ==
