(function() {
  var buildList, buildPagination, currentPage, eCancel, eCancelContainer, eInput, eList, ePagination, getItemList, getPageNum, getSearch, matchesSearch, maximumPage, replacePageNum, replaceSearch, sortList;

  ePagination = document.getElementById("search--pagination");

  eList = document.getElementById("search--list");

  eInput = document.getElementById("search--input");

  eCancelContainer = document.getElementById("search--cancel--container");

  eCancel = document.getElementById("search--cancel");

  currentPage = 1;

  maximumPage = 1;

  getPageNum = function() {
    var match, num;
    if (!window.location.hash) {
      return 1;
    }
    match = window.location.hash.match(/page=(\d+)/);
    if (!match) {
      return 1;
    }
    num = parseInt(match[1]);
    if (!num) {
      return 1;
    }
    return num;
  };

  getSearch = function() {
    var match;
    if (!window.location.hash) {
      return null;
    }
    match = window.location.hash.match(/search=([^&]+)/);
    if (!match) {
      return null;
    }
    return match[1];
  };

  replacePageNum = function(n) {
    var match;
    if (!window.location.hash) {
      return "#page=" + n;
    }
    match = window.location.hash.match(/page=\d+/);
    if (!match) {
      return window.location.hash + ("&page=" + n);
    }
    return window.location.hash.replace(/page=\d+/, "page=" + n);
  };

  replaceSearch = function(str) {
    var match;
    if (!window.location.hash) {
      return "#search=" + str;
    }
    match = window.location.hash.match(/search=[^&]+/);
    if (!match) {
      return window.location.hash + "&search=" + str;
    }
    return window.location.hash.replace(/search=[^&]+/, "search=" + str);
  };

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
    ea.classList = ["page-link"];
    ea.textContent = "Previous";
    en.appendChild(ea);
    if (page === 1) {
      ea.tabIndex = -1;
      en.classList.add("disabled");
      ea.href = replacePageNum(page);
    } else {
      ea.addEventListener("click", clickEv(page - 1));
      ea.href = replacePageNum(page - 1);
    }
    for (i = j = 1, ref = maximumPage; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      en = document.createElement("li");
      en.classList = ["page-item"];
      ePagination.appendChild(en);
      ea = document.createElement("a");
      ea.href = replacePageNum(i);
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
    ea.classList = ["page-link"];
    ea.textContent = "Next";
    en.appendChild(ea);
    if (page === maximumPage) {
      ea.tabIndex = -1;
      en.classList.add("disabled");
      return ea.href = replacePageNum(page);
    } else {
      ea.addEventListener("click", clickEv(page + 1));
      return ea.href = replacePageNum(page + 1);
    }
  };

  sortList = function() {
    if (eInput.value !== "") {
      eCancelContainer.style.display = null;
    } else {
      eCancelContainer.style.display = "none";
    }
    window.location.hash = replaceSearch(eInput.value);
    buildList(currentPage);
    return buildPagination(currentPage);
  };

  eInput.addEventListener("input", sortList);

  eCancel.addEventListener("click", function() {
    eInput.value = "";
    return sortList();
  });

  eInput.value = getSearch();

  buildList(getPageNum());

  buildPagination(getPageNum());

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VzL2xheW91dHMvbWFpbi91dGlsL3NlYXJjaC5qcyIsInNvdXJjZXMiOlsicmVzb3VyY2VzL2xheW91dHMvbWFpbi91dGlsL3NlYXJjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7QUFBQSxNQUFBOztFQUFBLFdBQUEsR0FBYyxRQUFRLENBQUMsY0FBVCxDQUF3QixvQkFBeEI7O0VBQ2QsS0FBQSxHQUFRLFFBQVEsQ0FBQyxjQUFULENBQXdCLGNBQXhCOztFQUNSLE1BQUEsR0FBUyxRQUFRLENBQUMsY0FBVCxDQUF3QixlQUF4Qjs7RUFDVCxnQkFBQSxHQUFtQixRQUFRLENBQUMsY0FBVCxDQUF3QiwyQkFBeEI7O0VBQ25CLE9BQUEsR0FBVSxRQUFRLENBQUMsY0FBVCxDQUF3QixnQkFBeEI7O0VBSVYsV0FBQSxHQUFjOztFQUNkLFdBQUEsR0FBYzs7RUFJZCxVQUFBLEdBQWEsU0FBQTtBQUNaLFFBQUE7SUFBQSxJQUFZLENBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFoQztBQUFBLGFBQU8sRUFBUDs7SUFDQSxLQUFBLEdBQVEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBckIsQ0FBMkIsWUFBM0I7SUFDUixJQUFZLENBQUksS0FBaEI7QUFBQSxhQUFPLEVBQVA7O0lBQ0EsR0FBQSxHQUFNLFFBQUEsQ0FBVSxLQUFNLENBQUEsQ0FBQSxDQUFoQjtJQUNOLElBQVksQ0FBSSxHQUFoQjtBQUFBLGFBQU8sRUFBUDs7QUFDQSxXQUFPO0VBTks7O0VBUWIsU0FBQSxHQUFZLFNBQUE7QUFDWCxRQUFBO0lBQUEsSUFBZSxDQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBbkM7QUFBQSxhQUFPLEtBQVA7O0lBQ0EsS0FBQSxHQUFRLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQXJCLENBQTJCLGdCQUEzQjtJQUNSLElBQWUsQ0FBSSxLQUFuQjtBQUFBLGFBQU8sS0FBUDs7QUFDQSxXQUFPLEtBQU0sQ0FB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QSxHQUFXLFNBQUE7SUFDVixJQUFHLE1BQU0sQ0FBQyxLQUFQLEtBQWdCLEVBQW5CO01BQ0MsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE9BQXZCLEdBQWlDLEtBRGxDO0tBQUEsTUFBQTtNQUdDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxPQUF2QixHQUFpQyxPQUhsQzs7SUFLQSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQWhCLEdBQXVCLGFBQUEsQ0FBZSxNQUFNLENBQUMsS0FBdEI7SUFDdkIsU0FBQSxDQUFXLFdBQVg7V0FDQSxlQUFBLENBQWlCLFdBQWpCO0VBUlU7O0VBVVgsTUFBTSxDQUFDLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFFBQWpDOztFQUVBLE9BQU8sQ0FBQyxnQkFBUixDQUF5QixPQUF6QixFQUFrQyxTQUFBO0lBQ2pDLE1BQU0sQ0FBQyxLQUFQLEdBQWU7V0FDZixRQUFBLENBQUE7RUFGaUMsQ0FBbEM7O0VBSUEsTUFBTSxDQUFDLEtBQVAsR0FBZSxTQUFBLENBQUE7O0VBQ2YsU0FBQSxDQUFXLFVBQUEsQ0FBQSxDQUFYOztFQUNBLGVBQUEsQ0FBaUIsVUFBQSxDQUFBLENBQWpCO0FBaktBIiwic291cmNlc0NvbnRlbnQiOlsiIyMgRWxlbWVudHMgIyNcblxuZVBhZ2luYXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcInNlYXJjaC0tcGFnaW5hdGlvblwiXG5lTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwic2VhcmNoLS1saXN0XCJcbmVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwic2VhcmNoLS1pbnB1dFwiXG5lQ2FuY2VsQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJzZWFyY2gtLWNhbmNlbC0tY29udGFpbmVyXCJcbmVDYW5jZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcInNlYXJjaC0tY2FuY2VsXCJcblxuIyMgVmFyaWFibGVzICMjXG5cbmN1cnJlbnRQYWdlID0gMVxubWF4aW11bVBhZ2UgPSAxXG5cbiMjIEFuY2hvciBNdWx0aXBsZXhpbmcgIyNcblxuZ2V0UGFnZU51bSA9IC0+XG5cdHJldHVybiAxIGlmIG5vdCB3aW5kb3cubG9jYXRpb24uaGFzaFxuXHRtYXRjaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLm1hdGNoIC9wYWdlPShcXGQrKS9cblx0cmV0dXJuIDEgaWYgbm90IG1hdGNoXG5cdG51bSA9IHBhcnNlSW50KCBtYXRjaFsxXSApXG5cdHJldHVybiAxIGlmIG5vdCBudW1cblx0cmV0dXJuIG51bVxuXG5nZXRTZWFyY2ggPSAtPlxuXHRyZXR1cm4gbnVsbCBpZiBub3Qgd2luZG93LmxvY2F0aW9uLmhhc2hcblx0bWF0Y2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaC5tYXRjaCAvc2VhcmNoPShbXiZdKykvXG5cdHJldHVybiBudWxsIGlmIG5vdCBtYXRjaFxuXHRyZXR1cm4gbWF0Y2hbMV1cblxucmVwbGFjZVBhZ2VOdW0gPSAoIG4gKSAtPlxuXHRyZXR1cm4gXCIjcGFnZT0je259XCIgaWYgbm90IHdpbmRvdy5sb2NhdGlvbi5oYXNoXG5cdG1hdGNoID0gd2luZG93LmxvY2F0aW9uLmhhc2gubWF0Y2ggL3BhZ2U9XFxkKy9cblx0aWYgbm90IG1hdGNoXG5cdFx0cmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5oYXNoICsgXCImcGFnZT0je259XCJcblx0cmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoIC9wYWdlPVxcZCsvLCBcInBhZ2U9I3tufVwiIClcblxucmVwbGFjZVNlYXJjaCA9ICggc3RyICkgLT5cblx0cmV0dXJuIFwiI3NlYXJjaD1cIiArIHN0ciBpZiBub3Qgd2luZG93LmxvY2F0aW9uLmhhc2hcblx0bWF0Y2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaC5tYXRjaCAvc2VhcmNoPVteJl0rL1xuXHRpZiBub3QgbWF0Y2hcblx0XHRyZXR1cm4gd2luZG93LmxvY2F0aW9uLmhhc2ggKyBcIiZzZWFyY2g9XCIgKyBzdHJcblx0cmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoIC9zZWFyY2g9W14mXSsvLCBcInNlYXJjaD1cIiArIHN0ciApXG5cbiMjIFNlYXJjaCAjI1xuXG5tYXRjaGVzU2VhcmNoID0gKCBlICkgLT5cblx0aW5wdXQgPSBlSW5wdXQudmFsdWVcblx0cmV0dXJuIHRydWUgaWYgaW5wdXQgPT0gXCJcIlxuXHRyZXR1cm4gZmFsc2UgaWYgbm90IGUuZGF0YXNldC50aXRsZVxuXHRpZiBpbnB1dC5zdGFydHNXaXRoKCBcInRhZzpcIiApXG5cdFx0cmV0dXJuIGUuZGF0YXNldC50YWdzLnRvTG93ZXJDYXNlKClcblx0XHRcdC5zcGxpdCggXCJ8XCIgKS5pbmRleE9mKCBpbnB1dC5zdWJzdHIoIDQgKS50b0xvd2VyQ2FzZSgpICkgPiAtMVxuXHRyZXR1cm4gZS50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCBpbnB1dC50b0xvd2VyQ2FzZSgpIClcblxuZ2V0SXRlbUxpc3QgPSAtPlxuXHRsaXN0ID0gW11cblxuXHRmb3IgZSBpbiBlTGlzdC5jaGlsZHJlblxuXHRcdGlmIG5vdCBtYXRjaGVzU2VhcmNoKCBlIClcblx0XHRcdGUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cdFx0XHRjb250aW51ZVxuXHRcdGUuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0XHRsaXN0LnB1c2ggZVxuXG5cdHJldHVybiBsaXN0XG5cbiMjIFBhZ2luYXRpb24gIyNcblxuYnVpbGRMaXN0ID0gKCBwYWdlICkgLT5cblx0Zm9yIGUsIGkgaW4gZ2V0SXRlbUxpc3QoKVxuXHRcdGUubGlzdEluZGV4ID0gaVxuXHRcdG1heGltdW1QYWdlID0gTWF0aC5jZWlsKCAoIGkgKyAxICkgLyAxMCApXG5cblx0XHRpZiBwYWdlICogMTAgLSAxMSA8IGUubGlzdEluZGV4IDwgcGFnZSAqIDEwXG5cdFx0XHQjIGUuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0XHRlbHNlXG5cdFx0XHRlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXG5idWlsZFBhZ2luYXRpb24gPSAoIHBhZ2UgKSAtPlxuXHRwYWdlID0gbWF4aW11bVBhZ2UgaWYgcGFnZSA+IG1heGltdW1QYWdlXG5cblx0Y3VycmVudFBhZ2UgPSBwYWdlXG5cdGlmIG1heGltdW1QYWdlID09IDFcblx0XHRlUGFnaW5hdGlvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblx0XHRyZXR1cm5cblx0ZWxzZVxuXHRcdGVQYWdpbmF0aW9uLnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cblx0ZVBhZ2luYXRpb24uaW5uZXJIVE1MID0gXCJcIlxuXG5cdGNsaWNrRXYgPSAoIHBhZ2UgKSAtPlxuXHRcdHJldHVybiAtPlxuXHRcdFx0YnVpbGRMaXN0KCBwYWdlIClcblx0XHRcdGJ1aWxkUGFnaW5hdGlvbiggcGFnZSApXG5cblx0ZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwibGlcIlxuXHRlbi5jbGFzc0xpc3QgPSBbIFwicGFnZS1pdGVtXCIgXVxuXHRlUGFnaW5hdGlvbi5hcHBlbmRDaGlsZCggZW4gKVxuXG5cdGVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImFcIlxuXHRlYS5jbGFzc0xpc3QgPSBbIFwicGFnZS1saW5rXCIgXVxuXHRlYS50ZXh0Q29udGVudCA9IFwiUHJldmlvdXNcIlxuXHRlbi5hcHBlbmRDaGlsZCggZWEgKVxuXG5cdGlmIHBhZ2UgPT0gMVxuXHRcdGVhLnRhYkluZGV4ID0gLTFcblx0XHRlbi5jbGFzc0xpc3QuYWRkKCBcImRpc2FibGVkXCIgKVxuXHRcdGVhLmhyZWYgPSByZXBsYWNlUGFnZU51bSggcGFnZSApXG5cdGVsc2Vcblx0XHRlYS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgY2xpY2tFdiggcGFnZSAtIDEgKVxuXHRcdGVhLmhyZWYgPSByZXBsYWNlUGFnZU51bSggcGFnZSAtIDEgKVxuXG5cdGZvciBpIGluIFsgMSAuLiBtYXhpbXVtUGFnZSBdXG5cdFx0ZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwibGlcIlxuXHRcdGVuLmNsYXNzTGlzdCA9IFsgXCJwYWdlLWl0ZW1cIiBdXG5cdFx0ZVBhZ2luYXRpb24uYXBwZW5kQ2hpbGQoIGVuIClcblxuXHRcdGVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImFcIlxuXHRcdGVhLmhyZWYgPSByZXBsYWNlUGFnZU51bSggaSApXG5cdFx0ZWEuY2xhc3NMaXN0ID0gWyBcInBhZ2UtbGlua1wiIF1cblx0XHRlYS50ZXh0Q29udGVudCA9IGlcblx0XHRlbi5hcHBlbmRDaGlsZCggZWEgKVxuXG5cdFx0aWYgcGFnZSA9PSBpXG5cdFx0XHRlbi5jbGFzc0xpc3QuYWRkKCBcImFjdGl2ZVwiIClcblx0XHRlbHNlXG5cdFx0XHRlYS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgY2xpY2tFdiggaSApXG5cblx0ZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwibGlcIlxuXHRlbi5jbGFzc0xpc3QgPSBbIFwicGFnZS1pdGVtXCIgXVxuXHRlUGFnaW5hdGlvbi5hcHBlbmRDaGlsZCggZW4gKVxuXG5cdGVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImFcIlxuXHRlYS5jbGFzc0xpc3QgPSBbIFwicGFnZS1saW5rXCIgXVxuXHRlYS50ZXh0Q29udGVudCA9IFwiTmV4dFwiXG5cdGVuLmFwcGVuZENoaWxkKCBlYSApXG5cblx0aWYgcGFnZSA9PSBtYXhpbXVtUGFnZVxuXHRcdGVhLnRhYkluZGV4ID0gLTFcblx0XHRlbi5jbGFzc0xpc3QuYWRkKCBcImRpc2FibGVkXCIgKVxuXHRcdGVhLmhyZWYgPSByZXBsYWNlUGFnZU51bSggcGFnZSApXG5cdGVsc2Vcblx0XHRlYS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgY2xpY2tFdiggcGFnZSArIDEgKVxuXHRcdGVhLmhyZWYgPSByZXBsYWNlUGFnZU51bSggcGFnZSArIDEgKVxuXG5zb3J0TGlzdCA9IC0+XG5cdGlmIGVJbnB1dC52YWx1ZSAhPSBcIlwiXG5cdFx0ZUNhbmNlbENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRlbHNlXG5cdFx0ZUNhbmNlbENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblxuXHR3aW5kb3cubG9jYXRpb24uaGFzaCA9IHJlcGxhY2VTZWFyY2goIGVJbnB1dC52YWx1ZSApXG5cdGJ1aWxkTGlzdCggY3VycmVudFBhZ2UgKVxuXHRidWlsZFBhZ2luYXRpb24oIGN1cnJlbnRQYWdlIClcblxuZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJpbnB1dFwiLCBzb3J0TGlzdFxuXG5lQ2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXHRlSW5wdXQudmFsdWUgPSBcIlwiXG5cdHNvcnRMaXN0KClcblxuZUlucHV0LnZhbHVlID0gZ2V0U2VhcmNoKClcbmJ1aWxkTGlzdCggZ2V0UGFnZU51bSgpIClcbmJ1aWxkUGFnaW5hdGlvbiggZ2V0UGFnZU51bSgpIClcbiJdfQ==
