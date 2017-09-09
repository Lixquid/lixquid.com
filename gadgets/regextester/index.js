(function() {
  var eDropdownText, eError, eInputInput, eInputRegex, eMultiDiv, eMultiList, eSingleDiv, eSingleGroups, eSingleMatch, eSinglePosition, eSinglePositionContents, eSingleToggle, flagsText, regexFlags, updateFlagsText;

  regexFlags = {
    g: false,
    i: false,
    m: false,
    u: false
  };

  eDropdownText = document.getElementById("dropdown--text");

  eInputInput = document.getElementById("input--input");

  eInputRegex = document.getElementById("input--regex");

  eSingleDiv = document.getElementById("single--div");

  eSingleMatch = document.getElementById("single--match");

  eSingleGroups = document.getElementById("single--groups");

  eSingleToggle = document.getElementById("single--toggle");

  eSinglePosition = document.getElementById("single--position");

  eSinglePositionContents = document.getElementById("single--position--contents");

  eMultiDiv = document.getElementById("multi--div");

  eMultiList = document.getElementById("multi--list");

  eError = document.getElementById("error");

  flagsText = function() {
    var k, v;
    return ((function() {
      var results;
      results = [];
      for (k in regexFlags) {
        v = regexFlags[k];
        if (v) {
          results.push(k);
        }
      }
      return results;
    })()).join("");
  };

  updateFlagsText = function() {
    return eDropdownText.innerText = "/" + flagsText();
  };

  document.getElementById("dropdown--flags").addEventListener("click.bs.dropdown", function(ev) {
    ev.stopPropagation();
    return ev.preventDefault();
  });

  document.getElementById("flag--g").addEventListener("click", function() {
    regexFlags.g = !regexFlags.g;
    return updateFlagsText();
  });

  document.getElementById("flag--i").addEventListener("click", function() {
    regexFlags.i = !regexFlags.i;
    return updateFlagsText();
  });

  document.getElementById("flag--m").addEventListener("click", function() {
    regexFlags.m = !regexFlags.m;
    return updateFlagsText();
  });

  document.getElementById("flag--u").addEventListener("click", function() {
    regexFlags.u = !regexFlags.u;
    return updateFlagsText();
  });

  eSingleToggle.addEventListener("click", function() {
    if (eSinglePosition.style.display) {
      eSinglePosition.style.display = null;
      return eSingleToggle.classList.add("_toggled");
    } else {
      eSinglePosition.style.display = "none";
      return eSingleToggle.classList.remove("_toggled");
    }
  });

  document.getElementById("input--match").addEventListener("click", function() {
    var data, e, eCode, eLi, ex, group, i, j, len, len1, match, num, results;
    eError.style.display = "none";
    eMultiDiv.style.display = "none";
    eSingleDiv.style.display = "none";
    try {
      data = eInputInput.value.match(new RegExp(eInputRegex.value, flagsText()));
    } catch (error) {
      ex = error;
      eError.style.display = null;
      eError.innerText = "Regex input is not valid!";
      console.error(ex);
      return;
    }
    if (!data) {
      eError.style.display = null;
      eError.innerText = "No Matches Found";
      return;
    }
    if (!regexFlags.g) {
      eSingleDiv.style.display = null;
      eSingleMatch.innerText = data[0];
      if (data.length === 1) {
        eSingleGroups.innerText = "No groups captured";
      } else {
        eSingleGroups.innerHTML = "";
        for (num = i = 0, len = data.length; i < len; num = ++i) {
          group = data[num];
          if (!(num !== 0)) {
            continue;
          }
          eCode = document.createElement("code");
          eCode.innerText = group;
          eLi = document.createElement("li");
          eLi.appendChild(eCode);
          eSingleGroups.appendChild(eLi);
        }
      }
      eSinglePositionContents.innerHTML = "";
      eSinglePositionContents.appendChild(document.createTextNode(data.input.substr(0, data.index)));
      e = document.createElement("strong");
      e.innerText = data.input.substr(data.index, data[0].length);
      eSinglePositionContents.appendChild(e);
      eSinglePositionContents.appendChild(document.createTextNode(data.input.substr(data.index + data[0].length)));
      return;
    }
    if (regexFlags.g) {
      eMultiDiv.style.display = null;
      eMultiList.innerHTML = "";
      results = [];
      for (j = 0, len1 = data.length; j < len1; j++) {
        match = data[j];
        eCode = document.createElement("code");
        eCode.innerText = match;
        eLi = document.createElement("li");
        eLi.appendChild(eCode);
        results.push(eMultiList.appendChild(eLi));
      }
      return results;
    }
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9yZWdleHRlc3Rlci9pbmRleC5qcyIsInNvdXJjZXMiOlsiZ2FkZ2V0cy9yZWdleHRlc3Rlci9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7QUFBQSxNQUFBOztFQUFBLFVBQUEsR0FDQztJQUFBLENBQUEsRUFBRyxLQUFIO0lBQ0EsQ0FBQSxFQUFHLEtBREg7SUFFQSxDQUFBLEVBQUcsS0FGSDtJQUdBLENBQUEsRUFBRyxLQUhIOzs7RUFPRCxhQUFBLEdBQWdCLFFBQVEsQ0FBQyxjQUFULENBQXdCLGdCQUF4Qjs7RUFDaEIsV0FBQSxHQUFjLFFBQVEsQ0FBQyxjQUFULENBQXdCLGNBQXhCOztFQUNkLFdBQUEsR0FBYyxRQUFRLENBQUMsY0FBVCxDQUF3QixjQUF4Qjs7RUFDZCxVQUFBLEdBQWEsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsYUFBeEI7O0VBQ2IsWUFBQSxHQUFlLFFBQVEsQ0FBQyxjQUFULENBQXdCLGVBQXhCOztFQUNmLGFBQUEsR0FBZ0IsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsZ0JBQXhCOztFQUNoQixhQUFBLEdBQWdCLFFBQVEsQ0FBQyxjQUFULENBQXdCLGdCQUF4Qjs7RUFDaEIsZUFBQSxHQUFrQixRQUFRLENBQUMsY0FBVCxDQUF3QixrQkFBeEI7O0VBQ2xCLHVCQUFBLEdBQTBCLFFBQVEsQ0FBQyxjQUFULENBQXdCLDRCQUF4Qjs7RUFDMUIsU0FBQSxHQUFZLFFBQVEsQ0FBQyxjQUFULENBQXdCLFlBQXhCOztFQUNaLFVBQUEsR0FBYSxRQUFRLENBQUMsY0FBVCxDQUF3QixhQUF4Qjs7RUFDYixNQUFBLEdBQVMsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsT0FBeEI7O0VBSVQsU0FBQSxHQUFZLFNBQUE7QUFBRyxRQUFBO1dBQUE7O0FBQUU7V0FBQSxlQUFBOztZQUE4Qjt1QkFBOUI7O0FBQUE7O1FBQUYsQ0FBbUMsQ0FBQyxJQUFwQyxDQUEwQyxFQUExQztFQUFIOztFQUNaLGVBQUEsR0FBa0IsU0FBQTtX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LGFBQVQsQ0FBdUIsSUFBdkI7UUFDTixHQUFHLENBQUMsV0FBSixDQUFpQixLQUFqQjtxQkFFQSxVQUFVLENBQUMsV0FBWCxDQUF3QixHQUF4QjtBQVBEO3FCQUhEOztFQTNEbUUsQ0FBcEU7QUF2REEiLCJzb3VyY2VzQ29udGVudCI6WyIjIyBWYXJpYWJsZXMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5yZWdleEZsYWdzID1cblx0ZzogZmFsc2Vcblx0aTogZmFsc2Vcblx0bTogZmFsc2Vcblx0dTogZmFsc2VcblxuIyMgRWxlbWVudHMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZURyb3Bkb3duVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiZHJvcGRvd24tLXRleHRcIlxuZUlucHV0SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImlucHV0LS1pbnB1dFwiXG5lSW5wdXRSZWdleCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiaW5wdXQtLXJlZ2V4XCJcbmVTaW5nbGVEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcInNpbmdsZS0tZGl2XCJcbmVTaW5nbGVNYXRjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwic2luZ2xlLS1tYXRjaFwiXG5lU2luZ2xlR3JvdXBzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJzaW5nbGUtLWdyb3Vwc1wiXG5lU2luZ2xlVG9nZ2xlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJzaW5nbGUtLXRvZ2dsZVwiXG5lU2luZ2xlUG9zaXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcInNpbmdsZS0tcG9zaXRpb25cIlxuZVNpbmdsZVBvc2l0aW9uQ29udGVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcInNpbmdsZS0tcG9zaXRpb24tLWNvbnRlbnRzXCJcbmVNdWx0aURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwibXVsdGktLWRpdlwiXG5lTXVsdGlMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJtdWx0aS0tbGlzdFwiXG5lRXJyb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImVycm9yXCJcblxuIyMgRnVuY3Rpb25zICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZmxhZ3NUZXh0ID0gLT4gKCBrIGZvciBrLCB2IG9mIHJlZ2V4RmxhZ3Mgd2hlbiB2ICkuam9pbiggXCJcIiApXG51cGRhdGVGbGFnc1RleHQgPSAtPiBlRHJvcGRvd25UZXh0LmlubmVyVGV4dCA9IFwiL1wiICsgZmxhZ3NUZXh0KClcblxuIyMgRXZlbnRzICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwiZHJvcGRvd24tLWZsYWdzXCIgKS5hZGRFdmVudExpc3RlbmVyKFxuXHRcImNsaWNrLmJzLmRyb3Bkb3duXCIsXG5cdCggZXYgKSAtPlxuXHRcdGV2LnN0b3BQcm9wYWdhdGlvbigpXG5cdFx0ZXYucHJldmVudERlZmF1bHQoKVxuKVxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwiZmxhZy0tZ1wiICkuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdHJlZ2V4RmxhZ3MuZyA9IG5vdCByZWdleEZsYWdzLmdcblx0dXBkYXRlRmxhZ3NUZXh0KClcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBcImZsYWctLWlcIiApLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXHRyZWdleEZsYWdzLmkgPSBub3QgcmVnZXhGbGFncy5pXG5cdHVwZGF0ZUZsYWdzVGV4dCgpXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJmbGFnLS1tXCIgKS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgLT5cblx0cmVnZXhGbGFncy5tID0gbm90IHJlZ2V4RmxhZ3MubVxuXHR1cGRhdGVGbGFnc1RleHQoKVxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwiZmxhZy0tdVwiICkuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdHJlZ2V4RmxhZ3MudSA9IG5vdCByZWdleEZsYWdzLnVcblx0dXBkYXRlRmxhZ3NUZXh0KClcblxuZVNpbmdsZVRvZ2dsZS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgLT5cblx0aWYgZVNpbmdsZVBvc2l0aW9uLnN0eWxlLmRpc3BsYXlcblx0XHRlU2luZ2xlUG9zaXRpb24uc3R5bGUuZGlzcGxheSA9IG51bGxcblx0XHRlU2luZ2xlVG9nZ2xlLmNsYXNzTGlzdC5hZGQoIFwiX3RvZ2dsZWRcIiApXG5cdGVsc2Vcblx0XHRlU2luZ2xlUG9zaXRpb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cdFx0ZVNpbmdsZVRvZ2dsZS5jbGFzc0xpc3QucmVtb3ZlKCBcIl90b2dnbGVkXCIgKVxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJpbnB1dC0tbWF0Y2hcIiApLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXG5cdGVFcnJvci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblx0ZU11bHRpRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXHRlU2luZ2xlRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXG5cdHRyeVxuXHRcdGRhdGEgPSBlSW5wdXRJbnB1dC52YWx1ZS5tYXRjaChcblx0XHRcdG5ldyBSZWdFeHAoIGVJbnB1dFJlZ2V4LnZhbHVlLCBmbGFnc1RleHQoKSApIClcblx0Y2F0Y2ggZXhcblx0XHRlRXJyb3Iuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0XHRlRXJyb3IuaW5uZXJUZXh0ID0gXCJSZWdleCBpbnB1dCBpcyBub3QgdmFsaWQhXCJcblx0XHRjb25zb2xlLmVycm9yIGV4XG5cdFx0cmV0dXJuXG5cblx0IyMgTm8gbWF0Y2hcblxuXHRpZiBub3QgZGF0YVxuXHRcdGVFcnJvci5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRcdGVFcnJvci5pbm5lclRleHQgPSBcIk5vIE1hdGNoZXMgRm91bmRcIlxuXHRcdHJldHVyblxuXG5cdCMjIFNpbmdsZVxuXG5cdGlmIG5vdCByZWdleEZsYWdzLmdcblx0XHRlU2luZ2xlRGl2LnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdFx0ZVNpbmdsZU1hdGNoLmlubmVyVGV4dCA9IGRhdGFbMF1cblxuXHRcdGlmIGRhdGEubGVuZ3RoID09IDFcblx0XHRcdGVTaW5nbGVHcm91cHMuaW5uZXJUZXh0ID0gXCJObyBncm91cHMgY2FwdHVyZWRcIlxuXHRcdGVsc2Vcblx0XHRcdGVTaW5nbGVHcm91cHMuaW5uZXJIVE1MID0gXCJcIlxuXHRcdFx0Zm9yIGdyb3VwLCBudW0gaW4gZGF0YSB3aGVuIG51bSAhPSAwXG5cdFx0XHRcdGVDb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImNvZGVcIlxuXHRcdFx0XHRlQ29kZS5pbm5lclRleHQgPSBncm91cFxuXG5cdFx0XHRcdGVMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJsaVwiXG5cdFx0XHRcdGVMaS5hcHBlbmRDaGlsZCggZUNvZGUgKVxuXG5cdFx0XHRcdGVTaW5nbGVHcm91cHMuYXBwZW5kQ2hpbGQoIGVMaSApXG5cblx0XHRlU2luZ2xlUG9zaXRpb25Db250ZW50cy5pbm5lckhUTUwgPSBcIlwiXG5cblx0XHRlU2luZ2xlUG9zaXRpb25Db250ZW50cy5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXG5cdFx0XHRkYXRhLmlucHV0LnN1YnN0ciggMCwgZGF0YS5pbmRleCApXG5cdFx0KSApXG5cblx0XHRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcInN0cm9uZ1wiXG5cdFx0ZS5pbm5lclRleHQgPSBkYXRhLmlucHV0LnN1YnN0ciggZGF0YS5pbmRleCwgZGF0YVswXS5sZW5ndGggKVxuXHRcdGVTaW5nbGVQb3NpdGlvbkNvbnRlbnRzLmFwcGVuZENoaWxkKCBlIClcblxuXHRcdGVTaW5nbGVQb3NpdGlvbkNvbnRlbnRzLmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcblx0XHRcdGRhdGEuaW5wdXQuc3Vic3RyKCBkYXRhLmluZGV4ICsgZGF0YVswXS5sZW5ndGggKVxuXHRcdCkgKVxuXG5cdFx0cmV0dXJuXG5cblx0IyMgTXVsdGlcblxuXHRpZiByZWdleEZsYWdzLmdcblx0XHRlTXVsdGlEaXYuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0XHRlTXVsdGlMaXN0LmlubmVySFRNTCA9IFwiXCJcblx0XHRmb3IgbWF0Y2ggaW4gZGF0YVxuXHRcdFx0ZUNvZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiY29kZVwiXG5cdFx0XHRlQ29kZS5pbm5lclRleHQgPSBtYXRjaFxuXG5cdFx0XHRlTGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwibGlcIlxuXHRcdFx0ZUxpLmFwcGVuZENoaWxkKCBlQ29kZSApXG5cblx0XHRcdGVNdWx0aUxpc3QuYXBwZW5kQ2hpbGQoIGVMaSApXG4iXX0=
