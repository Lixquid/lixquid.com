(function() {
  var childrenList, fn, i, j, len, len1, li, list, ref, ref1;

  childrenList = function(el, selector) {
    var e, i, len, output, ref;
    output = [];
    ref = el.children;
    for (i = 0, len = ref.length; i < len; i++) {
      e = ref[i];
      if ((e.matches || e.matchesSelect || e.msMatchesSelect || e.mozMatchesSelect || e.webkitMatchesSelect || e.oMatchesSelect).call(e, selector)) {
        output.push(e);
      }
    }
    return output;
  };

  ref = document.getElementsByClassName("dropdown--list");
  for (i = 0, len = ref.length; i < len; i++) {
    list = ref[i];
    ref1 = childrenList(list, "li");
    fn = function(li) {
      var contents, k, l, len2, len3, link, ref2, ref3, results;
      ref2 = childrenList(li, ".dropdown--list--contents");
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        contents = ref2[k];
        contents.style.display = "none";
      }
      ref3 = childrenList(li, ".dropdown--list--toggle");
      results = [];
      for (l = 0, len3 = ref3.length; l < len3; l++) {
        link = ref3[l];
        results.push(link.addEventListener("click", function(ev) {
          var con, len4, m, ref4, results1;
          ev.preventDefault();
          li.classList.toggle("_toggled");
          ref4 = childrenList(li, ".dropdown--list--contents");
          results1 = [];
          for (m = 0, len4 = ref4.length; m < len4; m++) {
            con = ref4[m];
            if (con.style.display === "none") {
              results1.push(con.style.display = null);
            } else {
              results1.push(con.style.display = "none");
            }
          }
          return results1;
        }));
      }
      return results;
    };
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      li = ref1[j];
      fn(li);
    }
  }

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VzL2xheW91dHMvbWFpbi91dGlsL2Ryb3Bkb3dubGlzdC5qcyIsInNvdXJjZXMiOlsicmVzb3VyY2VzL2xheW91dHMvbWFpbi91dGlsL2Ryb3Bkb3dubGlzdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLFlBQUEsR0FBZSxTQUFFLEVBQUYsRUFBTSxRQUFOO0FBQ2QsUUFBQTtJQUFBLE1BQUEsR0FBUztBQUNUO0FBQUEsU0FBQSxxQ0FBQTs7TUFDQyxJQUFvQixDQUFFLENBQUMsQ0FBQyxPQUFGLElBQ3JCLENBQUMsQ0FBQyxhQURtQixJQUVyQixDQUFDLENBQUMsZUFGbUIsSUFHckIsQ0FBQyxDQUFDLGdCQUhtQixJQUlyQixDQUFDLENBQUMsbUJBSm1CLElBS3JCLENBQUMsQ0FBQyxjQUxpQixDQUtELENBQUMsSUFMQSxDQUtNLENBTE4sRUFLUyxRQUxULENBQXBCO1FBQUEsTUFBTSxDQUFDLElBQVAsQ0FBYSxDQUFiLEVBQUE7O0FBREQ7QUFRQSxXQUFPO0VBVk87O0FBWWY7QUFBQSxPQUFBLHFDQUFBOztBQUNDO1NBQ0ksU0FBRSxFQUFGO0FBQ0YsVUFBQTtBQUFBO0FBQUEsV0FBQSx3Q0FBQTs7UUFDQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsR0FBeUI7QUFEMUI7QUFFQTtBQUFBO1dBQUEsd0NBQUE7O3FCQUNDLElBQUksQ0FBQyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixTQUFFLEVBQUY7QUFDOUIsY0FBQTtVQUFBLEVBQUUsQ0FBQyxjQUFILENBQUE7VUFDQSxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQWIsQ0FBb0IsVUFBcEI7QUFDQTtBQUFBO2VBQUEsd0NBQUE7O1lBQ0MsSUFBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQVYsS0FBcUIsTUFBeEI7NEJBQ0MsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFWLEdBQW9CLE1BRHJCO2FBQUEsTUFBQTs0QkFHQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQVYsR0FBb0IsUUFIckI7O0FBREQ7O1FBSDhCLENBQS9CO0FBREQ7O0lBSEU7QUFESixTQUFBLHdDQUFBOztTQUNNO0FBRE47QUFERDtBQVpBIiwic291cmNlc0NvbnRlbnQiOlsiY2hpbGRyZW5MaXN0ID0gKCBlbCwgc2VsZWN0b3IgKSAtPlxuXHRvdXRwdXQgPSBbXVxuXHRmb3IgZSBpbiBlbC5jaGlsZHJlblxuXHRcdG91dHB1dC5wdXNoKCBlICkgaWYgKCBlLm1hdGNoZXMgb3Jcblx0XHRcdGUubWF0Y2hlc1NlbGVjdCBvclxuXHRcdFx0ZS5tc01hdGNoZXNTZWxlY3Qgb3Jcblx0XHRcdGUubW96TWF0Y2hlc1NlbGVjdCBvclxuXHRcdFx0ZS53ZWJraXRNYXRjaGVzU2VsZWN0IG9yXG5cdFx0XHRlLm9NYXRjaGVzU2VsZWN0ICkuY2FsbCggZSwgc2VsZWN0b3IgKVxuXG5cdHJldHVybiBvdXRwdXRcblxuZm9yIGxpc3QgaW4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSBcImRyb3Bkb3duLS1saXN0XCJcblx0Zm9yIGxpIGluIGNoaWxkcmVuTGlzdCggbGlzdCwgXCJsaVwiIClcblx0XHRkbyAoIGxpICkgLT5cblx0XHRcdGZvciBjb250ZW50cyBpbiBjaGlsZHJlbkxpc3QoIGxpLCBcIi5kcm9wZG93bi0tbGlzdC0tY29udGVudHNcIiApXG5cdFx0XHRcdGNvbnRlbnRzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXHRcdFx0Zm9yIGxpbmsgaW4gY2hpbGRyZW5MaXN0KCBsaSwgXCIuZHJvcGRvd24tLWxpc3QtLXRvZ2dsZVwiIClcblx0XHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgKCBldiApIC0+XG5cdFx0XHRcdFx0ZXYucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRcdGxpLmNsYXNzTGlzdC50b2dnbGUgXCJfdG9nZ2xlZFwiXG5cdFx0XHRcdFx0Zm9yIGNvbiBpbiBjaGlsZHJlbkxpc3QoIGxpLCBcIi5kcm9wZG93bi0tbGlzdC0tY29udGVudHNcIiApXG5cdFx0XHRcdFx0XHRpZiBjb24uc3R5bGUuZGlzcGxheSA9PSBcIm5vbmVcIlxuXHRcdFx0XHRcdFx0XHRjb24uc3R5bGUuZGlzcGxheSA9IG51bGxcblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0Y29uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuIl19
