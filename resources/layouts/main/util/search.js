(function() {
  var buildList, buildPagination, currentPage, eCancel, eCancelContainer, eInput, eList, ePagination, getItemList, matchesSearch, maximumPage, sortList;

  ePagination = document.getElementById("search--pagination");

  eList = document.getElementById("search--list");

  eInput = document.getElementById("search--input");

  eCancelContainer = document.getElementById("search--cancel--container");

  eCancel = document.getElementById("search--cancel");

  currentPage = 1;

  maximumPage = 1;

  matchesSearch = function(e) {
    var input;
    input = eInput.value;
    if (input === "") {
      return true;
    }
    if (!e.dataset.title) {
      return false;
    }
    if (input.startsWith("tag:")) {
      return e.dataset.tags.toLowerCase().split("|").indexOf(input.substr(4).toLowerCase()) > -1;
    }
    return e.textContent.toLowerCase().includes(input.toLowerCase());
  };

  getItemList = function() {
    var e, j, len, list, ref;
    list = [];
    ref = eList.children;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VzL2xheW91dHMvbWFpbi91dGlsL3NlYXJjaC5qcyIsInNvdXJjZXMiOlsicmVzb3VyY2VzL2xheW91dHMvbWFpbi91dGlsL3NlYXJjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7QUFBQSxNQUFBOztFQUFBLFdBQUEsR0FBYyxRQUFRLENBQUMsY0FBVCxDQUF3QixvQkFBeEI7O0VBQ2QsS0FBQSxHQUFRLFFBQVEsQ0FBQyxjQUFULENBQXdCLGNBQXhCOztFQUNSLE1BQUEsR0FBUyxRQUFRLENBQUMsY0FBVCxDQUF3QixlQUF4Qjs7RUFDVCxnQkFBQSxHQUFtQixRQUFRLENBQUMsY0FBVCxDQUF3QiwyQkFBeEI7O0VBQ25CLE9BQUEsR0FBVSxRQUFRLENBQUMsY0FBVCxDQUF3QixnQkFBeEI7O0VBSVYsV0FBQSxHQUFjOztFQUNkLFdBQUEsR0FBYzs7RUFJZCxhQUFBLEdBQWdCLFNBQUUsQ0FBRjtBQUNmLFFBQUE7SUFBQSxLQUFBLEdBQVEsTUFBTSxDQUFDO0lBQ2YsSUFBZSxLQUFBLEtBQVMsRUFBeEI7QUFBQSxhQUFPLEtBQVA7O0lBQ0EsSUFBZ0IsQ0FBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQTlCO0FBQUEsYUFBTyxNQUFQOztJQUNBLElBQUcsS0FBSyxDQUFDLFVBQU4sQ0FBa0IsTUFBbEIsQ0FBSDtBQUNDLGFBQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBZixDQUFBLENBQ04sQ0FBQyxLQURLLENBQ0UsR0FERixDQUNPLENBQUMsT0FEUixDQUNpQixLQUFLLENBQUMsTUFBTixDQUFjLENBQWQsQ0FBaUIsQ0FBQyxXQUFsQixDQUFBLENBRGpCLENBQUEsR0FDcUQsQ0FBQyxFQUY5RDs7QUFHQSxXQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsV0FBZCxDQUFBLENBQTJCLENBQUMsUUFBNUIsQ0FBc0MsS0FBSyxDQUFDLFdBQU4sQ0FBQSxDQUF0QztFQVBROztFQVNoQixXQUFBLEdBQWMsU0FBQTtB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PSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcInNlYXJjaC0tcGFnaW5hdGlvblwiXG5lTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwic2VhcmNoLS1saXN0XCJcbmVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwic2VhcmNoLS1pbnB1dFwiXG5lQ2FuY2VsQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJzZWFyY2gtLWNhbmNlbC0tY29udGFpbmVyXCJcbmVDYW5jZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcInNlYXJjaC0tY2FuY2VsXCJcblxuIyMgVmFyaWFibGVzICMjXG5cbmN1cnJlbnRQYWdlID0gMVxubWF4aW11bVBhZ2UgPSAxXG5cbiMjIFNlYXJjaCAjI1xuXG5tYXRjaGVzU2VhcmNoID0gKCBlICkgLT5cblx0aW5wdXQgPSBlSW5wdXQudmFsdWVcblx0cmV0dXJuIHRydWUgaWYgaW5wdXQgPT0gXCJcIlxuXHRyZXR1cm4gZmFsc2UgaWYgbm90IGUuZGF0YXNldC50aXRsZVxuXHRpZiBpbnB1dC5zdGFydHNXaXRoKCBcInRhZzpcIiApXG5cdFx0cmV0dXJuIGUuZGF0YXNldC50YWdzLnRvTG93ZXJDYXNlKClcblx0XHRcdC5zcGxpdCggXCJ8XCIgKS5pbmRleE9mKCBpbnB1dC5zdWJzdHIoIDQgKS50b0xvd2VyQ2FzZSgpICkgPiAtMVxuXHRyZXR1cm4gZS50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCBpbnB1dC50b0xvd2VyQ2FzZSgpIClcblxuZ2V0SXRlbUxpc3QgPSAtPlxuXHRsaXN0ID0gW11cblxuXHRmb3IgZSBpbiBlTGlzdC5jaGlsZHJlblxuXHRcdGlmIG5vdCBtYXRjaGVzU2VhcmNoKCBlIClcblx0XHRcdGUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cdFx0XHRjb250aW51ZVxuXHRcdGUuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0XHRsaXN0LnB1c2ggZVxuXG5cdHJldHVybiBsaXN0XG5cbiMjIFBhZ2luYXRpb24gIyNcblxuYnVpbGRMaXN0ID0gKCBwYWdlICkgLT5cblx0Zm9yIGUsIGkgaW4gZ2V0SXRlbUxpc3QoKVxuXHRcdGUubGlzdEluZGV4ID0gaVxuXHRcdG1heGltdW1QYWdlID0gTWF0aC5jZWlsKCAoIGkgKyAxICkgLyAxMCApXG5cblx0XHRpZiBwYWdlICogMTAgLSAxMSA8IGUubGlzdEluZGV4IDwgcGFnZSAqIDEwXG5cdFx0XHQjIGUuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0XHRlbHNlXG5cdFx0XHRlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXG5idWlsZFBhZ2luYXRpb24gPSAoIHBhZ2UgKSAtPlxuXHRwYWdlID0gbWF4aW11bVBhZ2UgaWYgcGFnZSA+IG1heGltdW1QYWdlXG5cblx0Y3VycmVudFBhZ2UgPSBwYWdlXG5cdGlmIG1heGltdW1QYWdlID09IDFcblx0XHRlUGFnaW5hdGlvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblx0XHRyZXR1cm5cblx0ZWxzZVxuXHRcdGVQYWdpbmF0aW9uLnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cblx0ZVBhZ2luYXRpb24uaW5uZXJIVE1MID0gXCJcIlxuXG5cdGNsaWNrRXYgPSAoIHBhZ2UgKSAtPlxuXHRcdHJldHVybiAtPlxuXHRcdFx0YnVpbGRMaXN0KCBwYWdlIClcblx0XHRcdGJ1aWxkUGFnaW5hdGlvbiggcGFnZSApXG5cblx0ZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwibGlcIlxuXHRlbi5jbGFzc0xpc3QgPSBbIFwicGFnZS1pdGVtXCIgXVxuXHRlUGFnaW5hdGlvbi5hcHBlbmRDaGlsZCggZW4gKVxuXG5cdGVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImFcIlxuXHRlYS5ocmVmID0gXCIjXCJcblx0ZWEuY2xhc3NMaXN0ID0gWyBcInBhZ2UtbGlua1wiIF1cblx0ZWEudGV4dENvbnRlbnQgPSBcIlByZXZpb3VzXCJcblx0ZW4uYXBwZW5kQ2hpbGQoIGVhIClcblxuXHRpZiBwYWdlID09IDFcblx0XHRlYS50YWJJbmRleCA9IC0xXG5cdFx0ZW4uY2xhc3NMaXN0LmFkZCggXCJkaXNhYmxlZFwiIClcblx0ZWxzZVxuXHRcdGVhLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCBjbGlja0V2KCBwYWdlIC0gMSApXG5cblx0Zm9yIGkgaW4gWyAxIC4uIG1heGltdW1QYWdlIF1cblx0XHRlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJsaVwiXG5cdFx0ZW4uY2xhc3NMaXN0ID0gWyBcInBhZ2UtaXRlbVwiIF1cblx0XHRlUGFnaW5hdGlvbi5hcHBlbmRDaGlsZCggZW4gKVxuXG5cdFx0ZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiYVwiXG5cdFx0ZWEuaHJlZiA9IFwiI1wiXG5cdFx0ZWEuY2xhc3NMaXN0ID0gWyBcInBhZ2UtbGlua1wiIF1cblx0XHRlYS50ZXh0Q29udGVudCA9IGlcblx0XHRlbi5hcHBlbmRDaGlsZCggZWEgKVxuXG5cdFx0aWYgcGFnZSA9PSBpXG5cdFx0XHRlbi5jbGFzc0xpc3QuYWRkKCBcImFjdGl2ZVwiIClcblx0XHRlbHNlXG5cdFx0XHRlYS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgY2xpY2tFdiggaSApXG5cblx0ZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwibGlcIlxuXHRlbi5jbGFzc0xpc3QgPSBbIFwicGFnZS1pdGVtXCIgXVxuXHRlUGFnaW5hdGlvbi5hcHBlbmRDaGlsZCggZW4gKVxuXG5cdGVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImFcIlxuXHRlYS5ocmVmID0gXCIjXCJcblx0ZWEuY2xhc3NMaXN0ID0gWyBcInBhZ2UtbGlua1wiIF1cblx0ZWEudGV4dENvbnRlbnQgPSBcIk5leHRcIlxuXHRlbi5hcHBlbmRDaGlsZCggZWEgKVxuXG5cdGlmIHBhZ2UgPT0gbWF4aW11bVBhZ2Vcblx0XHRlYS50YWJJbmRleCA9IC0xXG5cdFx0ZW4uY2xhc3NMaXN0LmFkZCggXCJkaXNhYmxlZFwiIClcblx0ZWxzZVxuXHRcdGVhLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCBjbGlja0V2KCBwYWdlICsgMSApXG5cbmJ1aWxkTGlzdCggMSApXG5idWlsZFBhZ2luYXRpb24oIDEgKVxuXG5zb3J0TGlzdCA9IC0+XG5cdGlmIGVJbnB1dC52YWx1ZSAhPSBcIlwiXG5cdFx0ZUNhbmNlbENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRlbHNlXG5cdFx0ZUNhbmNlbENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblxuXHRidWlsZExpc3QoIGN1cnJlbnRQYWdlIClcblx0YnVpbGRQYWdpbmF0aW9uKCBjdXJyZW50UGFnZSApXG5cbmVJbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiaW5wdXRcIiwgc29ydExpc3RcblxuZUNhbmNlbC5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgLT5cblx0ZUlucHV0LnZhbHVlID0gXCJcIlxuXHRzb3J0TGlzdCgpXG4iXX0=
