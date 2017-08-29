(function() {
  var buildList, buildPagination, ePagination, maximumPage;

  ePagination = document.getElementById("search--pagination");

  maximumPage = 1;

  buildList = function(page) {
    var e, i, j, len, ref, ref1, results;
    ref = document.getElementsByClassName("search--item");
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      e = ref[i];
      if (e.listIndex == null) {
        e.listIndex = i;
        maximumPage = Math.ceil((i + 1) / 10);
      }
      if ((page * 10 - 11 < (ref1 = e.listIndex) && ref1 < page * 10)) {
        results.push(e.style.display = null);
      } else {
        results.push(e.style.display = "none");
      }
    }
    return results;
  };

  buildPagination = function(page) {
    var clickEv, ea, en, i, j, ref;
    if (maximumPage === 1) {
      ePagination.style.display = "none";
      return;
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

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VzL2xheW91dHMvbWFpbi91dGlsL3NlYXJjaC5qcyIsInNvdXJjZXMiOlsicmVzb3VyY2VzL2xheW91dHMvbWFpbi91dGlsL3NlYXJjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7QUFBQSxNQUFBOztFQUFBLFdBQUEsR0FBYyxRQUFRLENBQUMsY0FBVCxDQUF3QixvQkFBeEI7O0VBSWQsV0FBQSxHQUFjOztFQUVkLFNBQUEsR0FBWSxTQUFFLElBQUY7QUFDWCxRQUFBO0FBQUE7QUFBQTtTQUFBLDZDQUFBOztNQUNDLElBQU8sbUJBQVA7UUFDQyxDQUFDLENBQUMsU0FBRixHQUFjO1FBQ2QsV0FBQSxHQUFjLElBQUksQ0FBQyxJQUFMLENBQVcsQ0FBRSxDQUFBLEdBQUksQ0FBTixDQUFBLEdBQVksRUFBdkIsRUFGZjs7TUFJQSxJQUFHLENBQUEsSUFBQSxHQUFPLEVBQVAsR0FBWSxFQUFaLFdBQWlCLENBQUMsQ0FBQyxVQUFuQixRQUFBLEdBQStCLElBQUEsR0FBTyxFQUF0QyxDQUFIO3FCQUNDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBUixHQUFrQixNQURuQjtPQUFBLE1BQUE7cUJBR0MsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFSLEdBQWtCLFFBSG5COztBQUxEOztFQURXOztFQVdaLGVBQUEsR0FBa0IsU0FBRSxJQUFGO0FBQ2pCLFFBQUE7SUFBQSxJQUFHLFdBQUEsS0FBZSxDQUFsQjtNQUNDLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBbEIsR0FBNEI7QUFDNUIsYUFGRDs7SUFJQSxXQUFXLENBQUMsU0FBWixHQUF3QjtJQUV4QixPQUFBLEdBQVUsU0FBRSxJQUFGO0FBQ1QsYUFBTyxTQUFBO1FBQ04sU0FBQSxDQUFXLElBQVg7ZUFDQSxlQUFBLENBQWlCLElBQWpCO01BRk07SUFERTtJQUtWLEVBQUEsR0FBSyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QjtJQUNMLEVBQUUsQ0FBQyxTQUFILEdBQWUsQ0FBRSxXQUFGO0lBQ2YsV0FBVyxDQUFDLFdBQVosQ0FBeUIsRUFBekI7SUFFQSxFQUFBLEdBQUssUUFBUSxDQUFDLGFBQVQsQ0FBdUIsR0FBdkI7SUFDTCxFQUFFLENBQUMsSUFBSCxHQUFVO0lBQ1YsRUFBRSxDQUFDLFNBQUgsR0FBZSxDQUFFLFdBQUY7SUFDZixFQUFFLENBQUMsV0FBSCxHQUFpQjtJQUNqQixFQUFFLENBQUMsV0FBSCxDQUFnQixFQUFoQjtJQUVBLElBQUcsSUFBQSxLQUFRLENBQVg7TUFDQyxFQUFFLENBQUMsUUFBSCxHQUFjLENBQUM7TUFDZixFQUFFLENBQUMsU0FBUyxDQUFDLEdBQWIsQ0FBa0IsVUFBbEIsRUFGRDtLQUFBLE1BQUE7TUFJQyxFQUFFLENBQUMsZ0JBQUgsQ0FBb0IsT0FBcEIsRUFBNkIsT0FBQSxDQUFTLElBQUEsR0FBTyxDQUFoQixDQUE3QixFQUpEOztBQU1BLFNBQVMsc0ZBQVQ7TUFDQyxFQUFBLEdBQUssUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkI7TUFDTCxFQUFFLENBQUMsU0FBSCxHQUFlLENBQUUsV0FBRjtNQUNmLFdBQVcsQ0FBQyxXQUFaLENBQXlCLEVBQXpCO01BRUEsRUFBQSxHQUFLLFFBQVEsQ0FBQyxhQUFULENBQXVCLEdBQXZCO01BQ0wsRUFBRSxDQUFDLElBQUgsR0FBVTtNQUNWLEVBQUUsQ0FBQyxTQUFILEdBQWUsQ0FBRSxXQUFGO01BQ2YsRUFBRSxDQUFDLFdBQUgsR0FBaUI7TUFDakIsRUFBRSxDQUFDLFdBQUgsQ0FBZ0IsRUFBaEI7TUFFQSxJQUFHLElBQUEsS0FBUSxDQUFYO1FBQ0MsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFiLENBQWtCLFFBQWxCLEVBREQ7T0FBQSxNQUFBO1FBR0MsRUFBRSxDQUFDLGdCQUFILENBQW9CLE9BQXBCLEVBQTZCLE9BQUEsQ0FBUyxDQUFULENBQTdCLEVBSEQ7O0FBWEQ7SUFnQkEsRUFBQSxHQUFLLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCO0lBQ0wsRUFBRSxDQUFDLFNBQUgsR0FBZSxDQUFFLFdBQUY7SUFDZixXQUFXLENBQUMsV0FBWixDQUF5QixFQUF6QjtJQUVBLEVBQUEsR0FBSyxRQUFRLENBQUMsYUFBVCxDQUF1QixHQUF2QjtJQUNMLEVBQUUsQ0FBQyxJQUFILEdBQVU7SUFDVixFQUFFLENBQUMsU0FBSCxHQUFlLENBQUUsV0FBRjtJQUNmLEVBQUUsQ0FBQyxXQUFILEdBQWlCO0lBQ2pCLEVBQUUsQ0FBQyxXQUFILENBQWdCLEVBQWhCO0lBRUEsSUFBRyxJQUFBLEtBQVEsV0FBWDtNQUNDLEVBQUUsQ0FBQyxRQUFILEdBQWMsQ0FBQzthQUNmLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBYixDQUFrQixVQUFsQixFQUZEO0tBQUEsTUFBQTthQUlDLEVBQUUsQ0FBQyxnQkFBSCxDQUFvQixPQUFwQixFQUE2QixPQUFBLENBQVMsSUFBQSxHQUFPLENBQWhCLENBQTdCLEVBSkQ7O0VBdERpQjs7RUE4RGxCLFNBQUEsQ0FBVyxDQUFYOztFQUNBLGVBQUEsQ0FBaUIsQ0FBakI7QUFoRkEiLCJzb3VyY2VzQ29udGVudCI6WyIjIyBFbGVtZW50cyAjI1xuXG5lUGFnaW5hdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwic2VhcmNoLS1wYWdpbmF0aW9uXCJcblxuIyMgRnVuY3Rpb25zICMjXG5cbm1heGltdW1QYWdlID0gMVxuXG5idWlsZExpc3QgPSAoIHBhZ2UgKSAtPlxuXHRmb3IgZSwgaSBpbiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lIFwic2VhcmNoLS1pdGVtXCJcblx0XHRpZiBub3QgZS5saXN0SW5kZXg/XG5cdFx0XHRlLmxpc3RJbmRleCA9IGlcblx0XHRcdG1heGltdW1QYWdlID0gTWF0aC5jZWlsKCAoIGkgKyAxICkgLyAxMCApXG5cblx0XHRpZiBwYWdlICogMTAgLSAxMSA8IGUubGlzdEluZGV4IDwgcGFnZSAqIDEwXG5cdFx0XHRlLnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdFx0ZWxzZVxuXHRcdFx0ZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblxuYnVpbGRQYWdpbmF0aW9uID0gKCBwYWdlICkgLT5cblx0aWYgbWF4aW11bVBhZ2UgPT0gMVxuXHRcdGVQYWdpbmF0aW9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXHRcdHJldHVyblxuXG5cdGVQYWdpbmF0aW9uLmlubmVySFRNTCA9IFwiXCJcblxuXHRjbGlja0V2ID0gKCBwYWdlICkgLT5cblx0XHRyZXR1cm4gLT5cblx0XHRcdGJ1aWxkTGlzdCggcGFnZSApXG5cdFx0XHRidWlsZFBhZ2luYXRpb24oIHBhZ2UgKVxuXG5cdGVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImxpXCJcblx0ZW4uY2xhc3NMaXN0ID0gWyBcInBhZ2UtaXRlbVwiIF1cblx0ZVBhZ2luYXRpb24uYXBwZW5kQ2hpbGQoIGVuIClcblxuXHRlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJhXCJcblx0ZWEuaHJlZiA9IFwiI1wiXG5cdGVhLmNsYXNzTGlzdCA9IFsgXCJwYWdlLWxpbmtcIiBdXG5cdGVhLnRleHRDb250ZW50ID0gXCJQcmV2aW91c1wiXG5cdGVuLmFwcGVuZENoaWxkKCBlYSApXG5cblx0aWYgcGFnZSA9PSAxXG5cdFx0ZWEudGFiSW5kZXggPSAtMVxuXHRcdGVuLmNsYXNzTGlzdC5hZGQoIFwiZGlzYWJsZWRcIiApXG5cdGVsc2Vcblx0XHRlYS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgY2xpY2tFdiggcGFnZSAtIDEgKVxuXG5cdGZvciBpIGluIFsgMSAuLiBtYXhpbXVtUGFnZSBdXG5cdFx0ZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwibGlcIlxuXHRcdGVuLmNsYXNzTGlzdCA9IFsgXCJwYWdlLWl0ZW1cIiBdXG5cdFx0ZVBhZ2luYXRpb24uYXBwZW5kQ2hpbGQoIGVuIClcblxuXHRcdGVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImFcIlxuXHRcdGVhLmhyZWYgPSBcIiNcIlxuXHRcdGVhLmNsYXNzTGlzdCA9IFsgXCJwYWdlLWxpbmtcIiBdXG5cdFx0ZWEudGV4dENvbnRlbnQgPSBpXG5cdFx0ZW4uYXBwZW5kQ2hpbGQoIGVhIClcblxuXHRcdGlmIHBhZ2UgPT0gaVxuXHRcdFx0ZW4uY2xhc3NMaXN0LmFkZCggXCJhY3RpdmVcIiApXG5cdFx0ZWxzZVxuXHRcdFx0ZWEuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIGNsaWNrRXYoIGkgKVxuXG5cdGVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImxpXCJcblx0ZW4uY2xhc3NMaXN0ID0gWyBcInBhZ2UtaXRlbVwiIF1cblx0ZVBhZ2luYXRpb24uYXBwZW5kQ2hpbGQoIGVuIClcblxuXHRlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJhXCJcblx0ZWEuaHJlZiA9IFwiI1wiXG5cdGVhLmNsYXNzTGlzdCA9IFsgXCJwYWdlLWxpbmtcIiBdXG5cdGVhLnRleHRDb250ZW50ID0gXCJOZXh0XCJcblx0ZW4uYXBwZW5kQ2hpbGQoIGVhIClcblxuXHRpZiBwYWdlID09IG1heGltdW1QYWdlXG5cdFx0ZWEudGFiSW5kZXggPSAtMVxuXHRcdGVuLmNsYXNzTGlzdC5hZGQoIFwiZGlzYWJsZWRcIiApXG5cdGVsc2Vcblx0XHRlYS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgY2xpY2tFdiggcGFnZSArIDEgKVxuXG4jIyBCdWlsZCAjI1xuXG5idWlsZExpc3QoIDEgKVxuYnVpbGRQYWdpbmF0aW9uKCAxIClcbiJdfQ==
