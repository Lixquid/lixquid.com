(function() {
  var activeDiv, eBruteDiv, eDictDiv, eEvalDiv, eNavBrute, eNavDict, eNavEval, eOutputDiv, eOutputError, eOutputText, generateBrutePassword, generateDictPassword, hideAllNavs, randomArray,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  eNavBrute = document.getElementById("nav--brute");

  eNavDict = document.getElementById("nav--dict");

  eNavEval = document.getElementById("nav--eval");

  eBruteDiv = document.getElementById("brute--div");

  eDictDiv = document.getElementById("dict--div");

  eEvalDiv = document.getElementById("eval--div");

  eOutputDiv = document.getElementById("output--div");

  eOutputError = document.getElementById("output--error");

  eOutputText = document.getElementById("output--text");

  activeDiv = eBruteDiv;

  generateBrutePassword = function() {};

  generateDictPassword = function() {};

  hideAllNavs = function() {
    eNavBrute.classList.remove("active");
    eNavDict.classList.remove("active");
    eNavEval.classList.remove("active");
    eBruteDiv.style.display = "none";
    eDictDiv.style.display = "none";
    eEvalDiv.style.display = "none";
    return eOutputDiv.style.display = "none";
  };

  eNavBrute.addEventListener("click", function() {
    if (activeDiv === eBruteDiv) {
      return;
    }
    hideAllNavs();
    eNavBrute.classList.add("active");
    eBruteDiv.style.display = null;
    eOutputDiv.style.display = null;
    activeDiv = eBruteDiv;
    return generateBrutePassword();
  });

  eNavDict.addEventListener("click", function() {
    if (activeDiv === eDictDiv) {
      return;
    }
    hideAllNavs();
    eNavDict.classList.add("active");
    eDictDiv.style.display = null;
    eOutputDiv.style.display = null;
    activeDiv = eDictDiv;
    return generateDictPassword();
  });

  eNavEval.addEventListener("click", function() {
    if (activeDiv === eEvalDiv) {
      return;
    }
    hideAllNavs();
    eNavEval.classList.add("active");
    eEvalDiv.style.display = null;
    return activeDiv = eEvalDiv;
  });

  document.getElementById("output--refresh").addEventListener("click", function() {
    if (activeDiv === eBruteDiv) {
      generateBrutePassword();
    }
    if (activeDiv === eDictDiv) {
      return generateDictPassword();
    }
  });

  document.getElementById("output--copy").addEventListener("click", function() {
    eOutputText.select();
    document.execCommand("copy");
    return eOutputText.focus();
  });

  randomArray = function(array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  (function() {
    var ambiguousCharacters, buildAndGenerate, eAdvDiv, eAmbiguous, eDigits, eLength, eLower, eMinDigits, eSymbols, eUpper, generateValidCharacters, showError, shuffleArray, validCharacters, validDigits;
    eAdvDiv = document.getElementById("brute--adv--div");
    document.getElementById("brute--adv--toggle").addEventListener("click", function() {
      if (eAdvDiv.style.display) {
        return eAdvDiv.style.display = null;
      } else {
        return eAdvDiv.style.display = "none";
      }
    });
    eLength = document.getElementById("brute--length");
    eUpper = document.getElementById("brute--upper");
    eLower = document.getElementById("brute--lower");
    eDigits = document.getElementById("brute--digits");
    eSymbols = document.getElementById("brute--symbols");
    eAmbiguous = document.getElementById("brute--ambiguous");
    eMinDigits = document.getElementById("brute--mindigits");
    validCharacters = [];
    validDigits = [];
    ambiguousCharacters = ['B', 'G', 'I', 'O', 'Q', 'D', 'S', 'Z', 'l', '8', '6', '1', '0', '5', '2'];
    generateValidCharacters = function() {
      var c, i, j, results;
      validCharacters = [];
      validDigits = [];
      results = [];
      for (i = j = 33; j <= 126; i = ++j) {
        c = String.fromCharCode(i);
        if (indexOf.call(ambiguousCharacters, c) >= 0 && eAmbiguous.checked) {
          continue;
        }
        if ((48 <= i && i <= 57)) {
          if (!eDigits.checked) {
            continue;
          }
          validCharacters.push(c);
          results.push(validDigits.push(c));
        } else if ((65 <= i && i <= 90)) {
          if (!eUpper.checked) {
            continue;
          }
          results.push(validCharacters.push(c));
        } else if ((97 <= i && i <= 122)) {
          if (!eLower.checked) {
            continue;
          }
          results.push(validCharacters.push(c));
        } else if (eSymbols.checked) {
          results.push(validCharacters.push(c));
        } else {
          results.push(void 0);
        }
      }
      return results;
    };
    generateValidCharacters();
    shuffleArray = function(array) {
      var c, i, ref;
      c = array.length;
      while (c > 0) {
        i = Math.floor(Math.random() * c);
        c--;
        ref = [array[i], array[c]], array[c] = ref[0], array[i] = ref[1];
      }
      return array;
    };
    showError = function(str) {
      eOutputError.style.display = null;
      eOutputError.innerHTML = str;
      throw eOutputError;
    };
    generateBrutePassword = function() {
      var ex, j, k, length, minDigits, out, ref, ref1;
      try {
        length = parseInt(eLength.value);
        minDigits = parseInt(eMinDigits.value);
        if (isNaN(length)) {
          throw "Password length must be an integer";
        }
        if (length <= 0) {
          throw "Password length must be greater than zero";
        }
        if (isNaN(minDigits)) {
          minDigits = 0;
        }
        if (minDigits < 0) {
          throw "Minimum Digits must be zero or greater";
        }
        if (minDigits > length) {
          minDigits = length;
        }
        if (minDigits > 0) {
          eDigits.checked = true;
          generateValidCharacters();
        }
        if (!eUpper.checked && !eLower.checked && !eDigits.checked && !eSymbols.checked) {
          eLower.checked = true;
          generateValidCharacters();
        }
        out = [];
        if (minDigits > 0) {
          for (j = 1, ref = minDigits; 1 <= ref ? j <= ref : j >= ref; 1 <= ref ? j++ : j--) {
            out.push(randomArray(validDigits));
          }
        }
        if (length > minDigits) {
          for (k = 1, ref1 = length - minDigits; 1 <= ref1 ? k <= ref1 : k >= ref1; 1 <= ref1 ? k++ : k--) {
            out.push(randomArray(validCharacters));
          }
        }
        shuffleArray(out);
        return eOutputText.value = out.join("");
      } catch (error) {
        ex = error;
        if (typeof ex === "string") {
          eOutputError.style.display = null;
          eOutputError.innerHTML = ex;
        }
        throw ex;
      }
    };
    buildAndGenerate = function() {
      generateValidCharacters();
      return generateBrutePassword();
    };
    eUpper.addEventListener("change", buildAndGenerate);
    eLower.addEventListener("change", buildAndGenerate);
    eSymbols.addEventListener("change", buildAndGenerate);
    eAmbiguous.addEventListener("change", buildAndGenerate);
    eLength.addEventListener("change", generateBrutePassword);
    eMinDigits.addEventListener("change", generateBrutePassword);
    return eDigits.addEventListener("change", function() {
      if (!this.checked) {
        eMinDigits.value = 0;
      }
      return buildAndGenerate();
    });
  })();

  generateBrutePassword();

  (function() {
    var eDownloading, eWords, loadWordList, wordList;
    eWords = document.getElementById("dict--words");
    eDownloading = document.getElementById("dict--downloading");
    wordList = null;
    loadWordList = function() {
      var req;
      if (wordList === 0) {
        return;
      }
      wordList = 0;
      req = new XMLHttpRequest;
      req.overrideMimeType("application/json");
      req.open("GET", "wordlist.json");
      req.onload = function() {
        if (req.readyState !== 4) {
          return;
        }
        if (req.status === 200) {
          wordList = JSON.parse(req.responseText);
          eDownloading.style.display = "none";
          return generateDictPassword();
        } else {
          eOutputError.style.display = null;
          eOutputError.innerHTML = "Error when downloading word list";
          return wordList = null;
        }
      };
      return req.send(null);
    };
    generateDictPassword = function() {
      var ex, j, out, ref, words;
      try {
        words = parseInt(eWords.value);
        if (isNaN(words)) {
          throw "Word count must be an integer";
        }
        if (words <= 0) {
          throw "Word count must be greater than zero";
        }
        if (!wordList) {
          loadWordList();
          return;
        }
        out = [];
        for (j = 1, ref = words; 1 <= ref ? j <= ref : j >= ref; 1 <= ref ? j++ : j--) {
          out.push(randomArray(wordList).toLowerCase());
        }
        return eOutputText.value = out.join(" ");
      } catch (error) {
        ex = error;
        if (typeof ex === "string") {
          eOutputError.style.display = null;
          eOutputError.innerHTML = ex;
        }
        return console.error(ex);
      }
    };
    return eWords.addEventListener("change", generateDictPassword);
  })();

  return;

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9wYXNzd29yZHRvb2wvaW5kZXguanMiLCJzb3VyY2VzIjpbImdhZGdldHMvcGFzc3dvcmR0b29sL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtBQUFBLE1BQUEscUxBQUE7SUFBQTs7RUFBQSxTQUFBLEdBQVksUUFBUSxDQUFDLGNBQVQsQ0FBd0IsWUFBeEI7O0VBQ1osUUFBQSxHQUFXLFFBQVEsQ0FBQyxjQUFULENBQXdCLFdBQXhCOztFQUNYLFFBQUEsR0FBVyxRQUFRLENBQUMsY0FBVCxDQUF3QixXQUF4Qjs7RUFDWCxTQUFBLEdBQVksUUFBUSxDQUFDLGNBQVQsQ0FBd0IsWUFBeEI7O0VBQ1osUUFBQSxHQUFXLFFBQVEsQ0FBQyxjQUFULENBQXdCLFdBQXhCOztFQUNYLFFBQUEsR0FBVyxRQUFRLENBQUMsY0FBVCxDQUF3QixXQUF4Qjs7RUFDWCxVQUFBLEdBQWEsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsYUFBeEI7O0VBQ2IsWUFBQSxHQUFlLFFBQVEsQ0FBQyxjQUFULENBQXdCLGVBQXhCOztFQUNmLFdBQUEsR0FBYyxRQUFRLENBQUMsY0FBVCxDQUF3QixjQUF4Qjs7RUFFZCxTQUFBLEdBQVk7O0VBRVoscUJBQUEsR0FBd0IsU0FBQSxHQUFBOztFQUN4QixvQkFBQSxHQUF1QixTQUFBLEdBQUE7O0VBRXZCLFdBQUEsR0FBYyxTQUFBO0lBQ2IsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFwQixDQUEyQixRQUEzQjtJQUNBLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBbkIsQ0FBMEIsUUFBMUI7SUFDQSxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQW5CLENBQTBCLFFBQTFCO0lBQ0EsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFoQixHQUEwQjtJQUMxQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsR0FBeUI7SUFDekIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLEdBQXlCO1dBQ3pCLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FB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UUFFQyxLQUFBLEdBQVEsUUFBQSxDQUFVLE1BQU0sQ0FBQyxLQUFqQjtRQUVSLElBQUcsS0FBQSxDQUFPLEtBQVAsQ0FBSDtBQUNDLGdCQUFNLGdDQURQOztRQUVBLElBQUcsS0FBQSxJQUFTLENBQVo7QUFDQyxnQkFBTSx1Q0FEUDs7UUFFQSxJQUFHLENBQUksUUFBUDtVQUNDLFlBQUEsQ0FBQTtBQUNBLGlCQUZEOztRQUtBLEdBQUEsR0FBTTtBQUVOLGFBQUksd0VBQUo7VUFDQyxHQUFHLENBQUMsSUFBSixDQUFTLFdBQUEsQ0FBYSxRQUFiLENBQXVCLENBQUMsV0FBeEIsQ0FBQSxDQUFUO0FBREQ7ZUFHQSxXQUFXLENBQUMsS0FBWixHQUFvQixHQUFHLENBQUMsSUFBSixDQUFTLEdBQVQsRUFsQnJCO09BQUEsYUFBQTtRQW1CTTtRQUNMLElBQUcsT0FBUSxFQUFSLEtBQWdCLFFBQW5CO1VBQ0MsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFuQixHQUE2QjtVQUM3QixZQUFZLENBQUMsU0FBYixHQUF5QixHQUYxQjs7ZUFHQSxPQUFPLENBQUMsS0FBUixDQUFjLEVBQWQsRUF2QkQ7O0lBRHNCO1dBNEJ2QixNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0Msb0JBQWxDO0VBM0RFLENBQUEsQ0FBSCxDQUFBOztBQTZEQTtBQWxSQSIsInNvdXJjZXNDb250ZW50IjpbIiMjIENPTU1PTiAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmVOYXZCcnV0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwibmF2LS1icnV0ZVwiXG5lTmF2RGljdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwibmF2LS1kaWN0XCJcbmVOYXZFdmFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJuYXYtLWV2YWxcIlxuZUJydXRlRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJicnV0ZS0tZGl2XCJcbmVEaWN0RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJkaWN0LS1kaXZcIlxuZUV2YWxEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImV2YWwtLWRpdlwiXG5lT3V0cHV0RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJvdXRwdXQtLWRpdlwiXG5lT3V0cHV0RXJyb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcIm91dHB1dC0tZXJyb3JcIlxuZU91dHB1dFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcIm91dHB1dC0tdGV4dFwiXG5cbmFjdGl2ZURpdiA9IGVCcnV0ZURpdlxuXG5nZW5lcmF0ZUJydXRlUGFzc3dvcmQgPSAtPlxuZ2VuZXJhdGVEaWN0UGFzc3dvcmQgPSAtPlxuXG5oaWRlQWxsTmF2cyA9IC0+XG5cdGVOYXZCcnV0ZS5jbGFzc0xpc3QucmVtb3ZlIFwiYWN0aXZlXCJcblx0ZU5hdkRpY3QuY2xhc3NMaXN0LnJlbW92ZSBcImFjdGl2ZVwiXG5cdGVOYXZFdmFsLmNsYXNzTGlzdC5yZW1vdmUgXCJhY3RpdmVcIlxuXHRlQnJ1dGVEaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cdGVEaWN0RGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXHRlRXZhbERpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblx0ZU91dHB1dERpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblxuZU5hdkJydXRlLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXHRyZXR1cm4gaWYgYWN0aXZlRGl2ID09IGVCcnV0ZURpdlxuXG5cdGhpZGVBbGxOYXZzKClcblx0ZU5hdkJydXRlLmNsYXNzTGlzdC5hZGQgXCJhY3RpdmVcIlxuXHRlQnJ1dGVEaXYuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0ZU91dHB1dERpdi5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRhY3RpdmVEaXYgPSBlQnJ1dGVEaXZcblx0Z2VuZXJhdGVCcnV0ZVBhc3N3b3JkKClcblxuZU5hdkRpY3QuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdHJldHVybiBpZiBhY3RpdmVEaXYgPT0gZURpY3REaXZcblxuXHRoaWRlQWxsTmF2cygpXG5cdGVOYXZEaWN0LmNsYXNzTGlzdC5hZGQgXCJhY3RpdmVcIlxuXHRlRGljdERpdi5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRlT3V0cHV0RGl2LnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdGFjdGl2ZURpdiA9IGVEaWN0RGl2XG5cdGdlbmVyYXRlRGljdFBhc3N3b3JkKClcblxuZU5hdkV2YWwuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdHJldHVybiBpZiBhY3RpdmVEaXYgPT0gZUV2YWxEaXZcblxuXHRoaWRlQWxsTmF2cygpXG5cdGVOYXZFdmFsLmNsYXNzTGlzdC5hZGQgXCJhY3RpdmVcIlxuXHRlRXZhbERpdi5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRhY3RpdmVEaXYgPSBlRXZhbERpdlxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJvdXRwdXQtLXJlZnJlc2hcIiApLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXHRpZiBhY3RpdmVEaXYgPT0gZUJydXRlRGl2XG5cdFx0Z2VuZXJhdGVCcnV0ZVBhc3N3b3JkKClcblx0aWYgYWN0aXZlRGl2ID09IGVEaWN0RGl2XG5cdFx0Z2VuZXJhdGVEaWN0UGFzc3dvcmQoKVxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJvdXRwdXQtLWNvcHlcIiApLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXHRlT3V0cHV0VGV4dC5zZWxlY3QoKVxuXHRkb2N1bWVudC5leGVjQ29tbWFuZCBcImNvcHlcIlxuXHRlT3V0cHV0VGV4dC5mb2N1cygpXG5cbnJhbmRvbUFycmF5ID0gKCBhcnJheSApIC0+XG5cdGFycmF5WyBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogYXJyYXkubGVuZ3RoICkgXVxuXG5cbiMjIEJSVVRFICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmRvIC0+XG5cblx0IyMgQWR2YW5jZWQgT3B0aW9ucyBEaXNwbGF5ICMjXG5cblx0ZUFkdkRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYnJ1dGUtLWFkdi0tZGl2XCJcblxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJicnV0ZS0tYWR2LS10b2dnbGVcIiApLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXHRcdGlmIGVBZHZEaXYuc3R5bGUuZGlzcGxheVxuXHRcdFx0ZUFkdkRpdi5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRcdGVsc2Vcblx0XHRcdGVBZHZEaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cblx0IyMgRWxlbWVudHMgIyNcblxuXHRlTGVuZ3RoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJicnV0ZS0tbGVuZ3RoXCJcblx0ZVVwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJicnV0ZS0tdXBwZXJcIlxuXHRlTG93ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImJydXRlLS1sb3dlclwiXG5cdGVEaWdpdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImJydXRlLS1kaWdpdHNcIlxuXHRlU3ltYm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYnJ1dGUtLXN5bWJvbHNcIlxuXHRlQW1iaWd1b3VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJicnV0ZS0tYW1iaWd1b3VzXCJcblx0ZU1pbkRpZ2l0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYnJ1dGUtLW1pbmRpZ2l0c1wiXG5cblx0dmFsaWRDaGFyYWN0ZXJzID0gW11cblx0dmFsaWREaWdpdHMgPSBbXVxuXG5cdCMjIEZ1bmN0aW9ucyAjI1xuXG5cdGFtYmlndW91c0NoYXJhY3RlcnMgPSBbXG5cdFx0J0InLCAnRycsICdJJywgJ08nLCAnUScsICdEJywgJ1MnLCAnWidcblx0XHQnbCdcblx0XHQnOCcsICc2JywgJzEnLCAnMCcsICc1JywgJzInXG5cdF1cblxuXHRnZW5lcmF0ZVZhbGlkQ2hhcmFjdGVycyA9IC0+XG5cdFx0dmFsaWRDaGFyYWN0ZXJzID0gW11cblx0XHR2YWxpZERpZ2l0cyA9IFtdXG5cblx0XHRmb3IgaSBpbiBbMzMuLjEyNl1cblx0XHRcdGMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCBpIClcblxuXHRcdFx0Y29udGludWUgaWYgYyBpbiBhbWJpZ3VvdXNDaGFyYWN0ZXJzIGFuZCBlQW1iaWd1b3VzLmNoZWNrZWRcblxuXHRcdFx0aWYgNDggPD0gaSA8PSA1N1xuXHRcdFx0XHRjb250aW51ZSBpZiBub3QgZURpZ2l0cy5jaGVja2VkXG5cdFx0XHRcdHZhbGlkQ2hhcmFjdGVycy5wdXNoIGNcblx0XHRcdFx0dmFsaWREaWdpdHMucHVzaCBjXG5cdFx0XHRlbHNlIGlmIDY1IDw9IGkgPD0gOTBcblx0XHRcdFx0Y29udGludWUgaWYgbm90IGVVcHBlci5jaGVja2VkXG5cdFx0XHRcdHZhbGlkQ2hhcmFjdGVycy5wdXNoIGNcblx0XHRcdGVsc2UgaWYgOTcgPD0gaSA8PSAxMjJcblx0XHRcdFx0Y29udGludWUgaWYgbm90IGVMb3dlci5jaGVja2VkXG5cdFx0XHRcdHZhbGlkQ2hhcmFjdGVycy5wdXNoIGNcblx0XHRcdGVsc2UgaWYgZVN5bWJvbHMuY2hlY2tlZFxuXHRcdFx0XHR2YWxpZENoYXJhY3RlcnMucHVzaCBjXG5cblx0Z2VuZXJhdGVWYWxpZENoYXJhY3RlcnMoKVxuXG5cdCMjIEdlbmVyYXRpb24gQWxnb3JpdGhtICMjXG5cblx0c2h1ZmZsZUFycmF5ID0gKCBhcnJheSApIC0+XG5cdFx0YyA9IGFycmF5Lmxlbmd0aFxuXHRcdHdoaWxlIGMgPiAwXG5cdFx0XHRpID0gTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIGMgKVxuXG5cdFx0XHRjLS1cblxuXHRcdFx0WyBhcnJheVtjXSwgYXJyYXlbaV0gXSA9IFsgYXJyYXlbaV0sIGFycmF5W2NdIF1cblxuXHRcdHJldHVybiBhcnJheVxuXG5cdHNob3dFcnJvciA9ICggc3RyICkgLT5cblx0XHRlT3V0cHV0RXJyb3Iuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0XHRlT3V0cHV0RXJyb3IuaW5uZXJIVE1MID0gc3RyXG5cdFx0dGhyb3cgZU91dHB1dEVycm9yXG5cblx0Z2VuZXJhdGVCcnV0ZVBhc3N3b3JkID0gLT5cblx0XHR0cnlcblx0XHRcdCMjIFZhbGlkYXRpb25cblx0XHRcdGxlbmd0aCA9IHBhcnNlSW50KCBlTGVuZ3RoLnZhbHVlIClcblx0XHRcdG1pbkRpZ2l0cyA9IHBhcnNlSW50KCBlTWluRGlnaXRzLnZhbHVlIClcblxuXHRcdFx0aWYgaXNOYU4oIGxlbmd0aCApXG5cdFx0XHRcdHRocm93IFwiUGFzc3dvcmQgbGVuZ3RoIG11c3QgYmUgYW4gaW50ZWdlclwiXG5cdFx0XHRpZiBsZW5ndGggPD0gMFxuXHRcdFx0XHR0aHJvdyBcIlBhc3N3b3JkIGxlbmd0aCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvXCJcblx0XHRcdGlmIGlzTmFOKCBtaW5EaWdpdHMgKVxuXHRcdFx0XHRtaW5EaWdpdHMgPSAwXG5cdFx0XHRpZiBtaW5EaWdpdHMgPCAwXG5cdFx0XHRcdHRocm93IFwiTWluaW11bSBEaWdpdHMgbXVzdCBiZSB6ZXJvIG9yIGdyZWF0ZXJcIlxuXHRcdFx0aWYgbWluRGlnaXRzID4gbGVuZ3RoXG5cdFx0XHRcdG1pbkRpZ2l0cyA9IGxlbmd0aFxuXHRcdFx0aWYgbWluRGlnaXRzID4gMFxuXHRcdFx0XHRlRGlnaXRzLmNoZWNrZWQgPSB0cnVlXG5cdFx0XHRcdGdlbmVyYXRlVmFsaWRDaGFyYWN0ZXJzKClcblxuXHRcdFx0aWYgbm90IGVVcHBlci5jaGVja2VkIGFuZFxuXHRcdFx0XHRub3QgZUxvd2VyLmNoZWNrZWQgYW5kXG5cdFx0XHRcdG5vdCBlRGlnaXRzLmNoZWNrZWQgYW5kXG5cdFx0XHRcdG5vdCBlU3ltYm9scy5jaGVja2VkXG5cblx0XHRcdFx0XHRlTG93ZXIuY2hlY2tlZCA9IHRydWVcblx0XHRcdFx0XHRnZW5lcmF0ZVZhbGlkQ2hhcmFjdGVycygpXG5cblx0XHRcdCMjIEV4ZWN1dGlvblxuXHRcdFx0b3V0ID0gW11cblxuXHRcdFx0aWYgbWluRGlnaXRzID4gMFxuXHRcdFx0XHRmb3IgWzEuLm1pbkRpZ2l0c11cblx0XHRcdFx0XHRvdXQucHVzaCByYW5kb21BcnJheSggdmFsaWREaWdpdHMgKVxuXHRcdFx0aWYgbGVuZ3RoID4gbWluRGlnaXRzXG5cdFx0XHRcdGZvciBbMS4uKCBsZW5ndGggLSBtaW5EaWdpdHMgKV1cblx0XHRcdFx0XHRvdXQucHVzaCByYW5kb21BcnJheSggdmFsaWRDaGFyYWN0ZXJzIClcblxuXHRcdFx0c2h1ZmZsZUFycmF5KCBvdXQgKVxuXG5cdFx0XHRlT3V0cHV0VGV4dC52YWx1ZSA9IG91dC5qb2luIFwiXCJcblx0XHRjYXRjaCBleFxuXHRcdFx0aWYgdHlwZW9mKCBleCApID09IFwic3RyaW5nXCJcblx0XHRcdFx0ZU91dHB1dEVycm9yLnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdFx0XHRcdGVPdXRwdXRFcnJvci5pbm5lckhUTUwgPSBleFxuXHRcdFx0dGhyb3cgZXhcblxuXHQjIyBFdmVudHMgIyNcblxuXHRidWlsZEFuZEdlbmVyYXRlID0gLT5cblx0XHRnZW5lcmF0ZVZhbGlkQ2hhcmFjdGVycygpXG5cdFx0Z2VuZXJhdGVCcnV0ZVBhc3N3b3JkKClcblx0ZVVwcGVyLmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgYnVpbGRBbmRHZW5lcmF0ZVxuXHRlTG93ZXIuYWRkRXZlbnRMaXN0ZW5lciBcImNoYW5nZVwiLCBidWlsZEFuZEdlbmVyYXRlXG5cdGVTeW1ib2xzLmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgYnVpbGRBbmRHZW5lcmF0ZVxuXHRlQW1iaWd1b3VzLmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgYnVpbGRBbmRHZW5lcmF0ZVxuXG5cdGVMZW5ndGguYWRkRXZlbnRMaXN0ZW5lciBcImNoYW5nZVwiLCBnZW5lcmF0ZUJydXRlUGFzc3dvcmRcblx0ZU1pbkRpZ2l0cy5hZGRFdmVudExpc3RlbmVyIFwiY2hhbmdlXCIsIGdlbmVyYXRlQnJ1dGVQYXNzd29yZFxuXG5cdGVEaWdpdHMuYWRkRXZlbnRMaXN0ZW5lciBcImNoYW5nZVwiLCAtPlxuXHRcdGlmIG5vdCBAY2hlY2tlZFxuXHRcdFx0ZU1pbkRpZ2l0cy52YWx1ZSA9IDBcblx0XHRidWlsZEFuZEdlbmVyYXRlKClcblxuZ2VuZXJhdGVCcnV0ZVBhc3N3b3JkKClcblxuIyMgRElDVElPTkFSWSAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZG8gLT5cblxuXHQjIyBFbGVtZW50cyAjI1xuXG5cdGVXb3JkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiZGljdC0td29yZHNcIlxuXHRlRG93bmxvYWRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImRpY3QtLWRvd25sb2FkaW5nXCJcblxuXHR3b3JkTGlzdCA9IG51bGxcblxuXHQjIyBHZW5lcmF0aW9uIEFsZ29yaXRobSAjI1xuXG5cdGxvYWRXb3JkTGlzdCA9IC0+XG5cdFx0aWYgd29yZExpc3QgPT0gMFxuXHRcdFx0cmV0dXJuXG5cdFx0d29yZExpc3QgPSAwXG5cblx0XHRyZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3Rcblx0XHRyZXEub3ZlcnJpZGVNaW1lVHlwZSBcImFwcGxpY2F0aW9uL2pzb25cIlxuXHRcdHJlcS5vcGVuIFwiR0VUXCIsIFwid29yZGxpc3QuanNvblwiXG5cdFx0cmVxLm9ubG9hZCA9IC0+XG5cdFx0XHRyZXR1cm4gaWYgcmVxLnJlYWR5U3RhdGUgIT0gNFxuXHRcdFx0aWYgcmVxLnN0YXR1cyA9PSAyMDBcblx0XHRcdFx0d29yZExpc3QgPSBKU09OLnBhcnNlKCByZXEucmVzcG9uc2VUZXh0IClcblx0XHRcdFx0ZURvd25sb2FkaW5nLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXHRcdFx0XHRnZW5lcmF0ZURpY3RQYXNzd29yZCgpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGVPdXRwdXRFcnJvci5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRcdFx0XHRlT3V0cHV0RXJyb3IuaW5uZXJIVE1MID0gXCJFcnJvciB3aGVuIGRvd25sb2FkaW5nIHdvcmQgbGlzdFwiXG5cdFx0XHRcdHdvcmRMaXN0ID0gbnVsbFxuXHRcdHJlcS5zZW5kIG51bGxcblxuXHRnZW5lcmF0ZURpY3RQYXNzd29yZCA9IC0+XG5cdFx0dHJ5XG5cdFx0XHQjIyBWYWxpZGF0aW9uXG5cdFx0XHR3b3JkcyA9IHBhcnNlSW50KCBlV29yZHMudmFsdWUgKVxuXG5cdFx0XHRpZiBpc05hTiggd29yZHMgKVxuXHRcdFx0XHR0aHJvdyBcIldvcmQgY291bnQgbXVzdCBiZSBhbiBpbnRlZ2VyXCJcblx0XHRcdGlmIHdvcmRzIDw9IDBcblx0XHRcdFx0dGhyb3cgXCJXb3JkIGNvdW50IG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm9cIlxuXHRcdFx0aWYgbm90IHdvcmRMaXN0XG5cdFx0XHRcdGxvYWRXb3JkTGlzdCgpXG5cdFx0XHRcdHJldHVyblxuXG5cdFx0XHQjIyBFeGVjdXRpb25cblx0XHRcdG91dCA9IFtdXG5cblx0XHRcdGZvciBbMS4ud29yZHNdXG5cdFx0XHRcdG91dC5wdXNoIHJhbmRvbUFycmF5KCB3b3JkTGlzdCApLnRvTG93ZXJDYXNlKClcblxuXHRcdFx0ZU91dHB1dFRleHQudmFsdWUgPSBvdXQuam9pbiBcIiBcIlxuXHRcdGNhdGNoIGV4XG5cdFx0XHRpZiB0eXBlb2YoIGV4ICkgPT0gXCJzdHJpbmdcIlxuXHRcdFx0XHRlT3V0cHV0RXJyb3Iuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0XHRcdFx0ZU91dHB1dEVycm9yLmlubmVySFRNTCA9IGV4XG5cdFx0XHRjb25zb2xlLmVycm9yIGV4XG5cblx0IyMgRXZlbnRzICMjXG5cblx0ZVdvcmRzLmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgZ2VuZXJhdGVEaWN0UGFzc3dvcmRcblxucmV0dXJuXG4iXX0=
