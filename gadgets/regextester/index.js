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
    var k, results, v;
    results = [];
    for (k in regexFlags) {
      v = regexFlags[k];
      if (v) {
        results.push(k);
      }
    }
    return results;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9yZWdleHRlc3Rlci9pbmRleC5qcyIsInNvdXJjZXMiOlsiZ2FkZ2V0cy9yZWdleHRlc3Rlci9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7QUFBQSxNQUFBOztFQUFBLFVBQUEsR0FDQztJQUFBLENBQUEsRUFBRyxLQUFIO0lBQ0EsQ0FBQSxFQUFHLEtBREg7SUFFQSxDQUFBLEVBQUcsS0FGSDtJQUdBLENBQUEsRUFBRyxLQUhIOzs7RUFPRCxhQUFBLEdBQWdCLFFBQVEsQ0FBQyxjQUFULENBQXdCLGdCQUF4Qjs7RUFDaEIsV0FBQSxHQUFjLFFBQVEsQ0FBQyxjQUFULENBQXdCLGNBQXhCOztFQUNkLFdBQUEsR0FBYyxRQUFRLENBQUMsY0FBVCxDQUF3QixjQUF4Qjs7RUFDZCxVQUFBLEdBQWEsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsYUFBeEI7O0VBQ2IsWUFBQSxHQUFlLFFBQVEsQ0FBQyxjQUFULENBQXdCLGVBQXhCOztFQUNmLGFBQUEsR0FBZ0IsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsZ0JBQXhCOztFQUNoQixhQUFBLEdBQWdCLFFBQVEsQ0FBQyxjQUFULENBQXdCLGdCQUF4Qjs7RUFDaEIsZUFBQSxHQUFrQixRQUFRLENBQUMsY0FBVCxDQUF3QixrQkFBeEI7O0VBQ2xCLHVCQUFBLEdBQTBCLFFBQVEsQ0FBQyxjQUFULENBQXdCLDRCQUF4Qjs7RUFDMUIsU0FBQSxHQUFZLFFBQVEsQ0FBQyxjQUFULENBQXdCLFlBQXhCOztFQUNaLFVBQUEsR0FBYSxRQUFRLENBQUMsY0FBVCxDQUF3QixhQUF4Qjs7RUFDYixNQUFBLEdBQVMsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsT0FBeEI7O0VBSVQsU0FBQSxHQUFZLFNBQUE7QUFBRyxRQUFBO0FBQUE7U0FBQSxlQUFBOztVQUE4QjtxQkFBOUI7O0FBQUE7O0VBQUg7O0VBQ1osZUFBQSxHQUFrQixTQUFBO1dBQUcsYUFBYSxDQUFDLFNBQWQsR0FBMEIsR0FBQSxHQUFNLFNBQUEs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QWlCLEtBQWpCO3FCQUVBLFVBQVUsQ0FBQyxXQUFYLENBQXdCLEdBQXhCO0FBUEQ7cUJBSEQ7O0VBM0RtRSxDQUFwRTtBQXZEQSIsInNvdXJjZXNDb250ZW50IjpbIiMjIFZhcmlhYmxlcyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbnJlZ2V4RmxhZ3MgPVxuXHRnOiBmYWxzZVxuXHRpOiBmYWxzZVxuXHRtOiBmYWxzZVxuXHR1OiBmYWxzZVxuXG4jIyBFbGVtZW50cyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5lRHJvcGRvd25UZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJkcm9wZG93bi0tdGV4dFwiXG5lSW5wdXRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiaW5wdXQtLWlucHV0XCJcbmVJbnB1dFJlZ2V4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJpbnB1dC0tcmVnZXhcIlxuZVNpbmdsZURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwic2luZ2xlLS1kaXZcIlxuZVNpbmdsZU1hdGNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJzaW5nbGUtLW1hdGNoXCJcbmVTaW5nbGVHcm91cHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcInNpbmdsZS0tZ3JvdXBzXCJcbmVTaW5nbGVUb2dnbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcInNpbmdsZS0tdG9nZ2xlXCJcbmVTaW5nbGVQb3NpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwic2luZ2xlLS1wb3NpdGlvblwiXG5lU2luZ2xlUG9zaXRpb25Db250ZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwic2luZ2xlLS1wb3NpdGlvbi0tY29udGVudHNcIlxuZU11bHRpRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJtdWx0aS0tZGl2XCJcbmVNdWx0aUxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcIm11bHRpLS1saXN0XCJcbmVFcnJvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiZXJyb3JcIlxuXG4jIyBGdW5jdGlvbnMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5mbGFnc1RleHQgPSAtPiBrIGZvciBrLCB2IG9mIHJlZ2V4RmxhZ3Mgd2hlbiB2XG51cGRhdGVGbGFnc1RleHQgPSAtPiBlRHJvcGRvd25UZXh0LmlubmVyVGV4dCA9IFwiL1wiICsgZmxhZ3NUZXh0KClcblxuIyMgRXZlbnRzICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwiZHJvcGRvd24tLWZsYWdzXCIgKS5hZGRFdmVudExpc3RlbmVyKFxuXHRcImNsaWNrLmJzLmRyb3Bkb3duXCIsXG5cdCggZXYgKSAtPlxuXHRcdGV2LnN0b3BQcm9wYWdhdGlvbigpXG5cdFx0ZXYucHJldmVudERlZmF1bHQoKVxuKVxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwiZmxhZy0tZ1wiICkuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdHJlZ2V4RmxhZ3MuZyA9IG5vdCByZWdleEZsYWdzLmdcblx0dXBkYXRlRmxhZ3NUZXh0KClcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBcImZsYWctLWlcIiApLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXHRyZWdleEZsYWdzLmkgPSBub3QgcmVnZXhGbGFncy5pXG5cdHVwZGF0ZUZsYWdzVGV4dCgpXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJmbGFnLS1tXCIgKS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgLT5cblx0cmVnZXhGbGFncy5tID0gbm90IHJlZ2V4RmxhZ3MubVxuXHR1cGRhdGVGbGFnc1RleHQoKVxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwiZmxhZy0tdVwiICkuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdHJlZ2V4RmxhZ3MudSA9IG5vdCByZWdleEZsYWdzLnVcblx0dXBkYXRlRmxhZ3NUZXh0KClcblxuZVNpbmdsZVRvZ2dsZS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgLT5cblx0aWYgZVNpbmdsZVBvc2l0aW9uLnN0eWxlLmRpc3BsYXlcblx0XHRlU2luZ2xlUG9zaXRpb24uc3R5bGUuZGlzcGxheSA9IG51bGxcblx0XHRlU2luZ2xlVG9nZ2xlLmNsYXNzTGlzdC5hZGQoIFwiX3RvZ2dsZWRcIiApXG5cdGVsc2Vcblx0XHRlU2luZ2xlUG9zaXRpb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cdFx0ZVNpbmdsZVRvZ2dsZS5jbGFzc0xpc3QucmVtb3ZlKCBcIl90b2dnbGVkXCIgKVxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJpbnB1dC0tbWF0Y2hcIiApLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXG5cdGVFcnJvci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblx0ZU11bHRpRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXHRlU2luZ2xlRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXG5cdHRyeVxuXHRcdGRhdGEgPSBlSW5wdXRJbnB1dC52YWx1ZS5tYXRjaChcblx0XHRcdG5ldyBSZWdFeHAoIGVJbnB1dFJlZ2V4LnZhbHVlLCBmbGFnc1RleHQoKSApIClcblx0Y2F0Y2ggZXhcblx0XHRlRXJyb3Iuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0XHRlRXJyb3IuaW5uZXJUZXh0ID0gXCJSZWdleCBpbnB1dCBpcyBub3QgdmFsaWQhXCJcblx0XHRjb25zb2xlLmVycm9yIGV4XG5cdFx0cmV0dXJuXG5cblx0IyMgTm8gbWF0Y2hcblxuXHRpZiBub3QgZGF0YVxuXHRcdGVFcnJvci5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRcdGVFcnJvci5pbm5lclRleHQgPSBcIk5vIE1hdGNoZXMgRm91bmRcIlxuXHRcdHJldHVyblxuXG5cdCMjIFNpbmdsZVxuXG5cdGlmIG5vdCByZWdleEZsYWdzLmdcblx0XHRlU2luZ2xlRGl2LnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdFx0ZVNpbmdsZU1hdGNoLmlubmVyVGV4dCA9IGRhdGFbMF1cblxuXHRcdGlmIGRhdGEubGVuZ3RoID09IDFcblx0XHRcdGVTaW5nbGVHcm91cHMuaW5uZXJUZXh0ID0gXCJObyBncm91cHMgY2FwdHVyZWRcIlxuXHRcdGVsc2Vcblx0XHRcdGVTaW5nbGVHcm91cHMuaW5uZXJIVE1MID0gXCJcIlxuXHRcdFx0Zm9yIGdyb3VwLCBudW0gaW4gZGF0YSB3aGVuIG51bSAhPSAwXG5cdFx0XHRcdGVDb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImNvZGVcIlxuXHRcdFx0XHRlQ29kZS5pbm5lclRleHQgPSBncm91cFxuXG5cdFx0XHRcdGVMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJsaVwiXG5cdFx0XHRcdGVMaS5hcHBlbmRDaGlsZCggZUNvZGUgKVxuXG5cdFx0XHRcdGVTaW5nbGVHcm91cHMuYXBwZW5kQ2hpbGQoIGVMaSApXG5cblx0XHRlU2luZ2xlUG9zaXRpb25Db250ZW50cy5pbm5lckhUTUwgPSBcIlwiXG5cblx0XHRlU2luZ2xlUG9zaXRpb25Db250ZW50cy5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXG5cdFx0XHRkYXRhLmlucHV0LnN1YnN0ciggMCwgZGF0YS5pbmRleCApXG5cdFx0KSApXG5cblx0XHRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcInN0cm9uZ1wiXG5cdFx0ZS5pbm5lclRleHQgPSBkYXRhLmlucHV0LnN1YnN0ciggZGF0YS5pbmRleCwgZGF0YVswXS5sZW5ndGggKVxuXHRcdGVTaW5nbGVQb3NpdGlvbkNvbnRlbnRzLmFwcGVuZENoaWxkKCBlIClcblxuXHRcdGVTaW5nbGVQb3NpdGlvbkNvbnRlbnRzLmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcblx0XHRcdGRhdGEuaW5wdXQuc3Vic3RyKCBkYXRhLmluZGV4ICsgZGF0YVswXS5sZW5ndGggKVxuXHRcdCkgKVxuXG5cdFx0cmV0dXJuXG5cblx0IyMgTXVsdGlcblxuXHRpZiByZWdleEZsYWdzLmdcblx0XHRlTXVsdGlEaXYuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0XHRlTXVsdGlMaXN0LmlubmVySFRNTCA9IFwiXCJcblx0XHRmb3IgbWF0Y2ggaW4gZGF0YVxuXHRcdFx0ZUNvZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiY29kZVwiXG5cdFx0XHRlQ29kZS5pbm5lclRleHQgPSBtYXRjaFxuXG5cdFx0XHRlTGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwibGlcIlxuXHRcdFx0ZUxpLmFwcGVuZENoaWxkKCBlQ29kZSApXG5cblx0XHRcdGVNdWx0aUxpc3QuYXBwZW5kQ2hpbGQoIGVMaSApXG4iXX0=
