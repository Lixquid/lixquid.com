(function() {
  var activeDiv, analyzeStrength, eBruteDiv, eDictDiv, eEvalDiv, eEvalInput, eNavBrute, eNavDict, eNavEval, eOutputDiv, eOutputError, eOutputText, generateBrutePassword, generateDictPassword, hideAllNavs, randomArray,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  window.DISABLE_ZXCVBN_LIMIT = false;

  eNavBrute = document.getElementById("nav--brute");

  eNavDict = document.getElementById("nav--dict");

  eNavEval = document.getElementById("nav--eval");

  eBruteDiv = document.getElementById("brute--div");

  eDictDiv = document.getElementById("dict--div");

  eEvalDiv = document.getElementById("eval--div");

  eOutputDiv = document.getElementById("output--div");

  eOutputError = document.getElementById("output--error");

  eOutputText = document.getElementById("output--text");

  eEvalInput = document.getElementById("eval--input");

  activeDiv = eBruteDiv;

  generateBrutePassword = function() {};

  generateDictPassword = function() {};

  analyzeStrength = function() {};

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
    var eCrack1, eCrack2, eCrack3, eCrack4, eCrack5, eError, eGuesses, eOutput, eStrength, eSuggestions, eWarning, energy_in_universe, niceTime, strengthClasses, strengthTexts, thermoLog;
    eError = document.getElementById("an--error");
    eOutput = document.getElementById("an--div--output");
    eGuesses = document.getElementById("an--guesses");
    eStrength = document.getElementById("an--strength");
    eWarning = document.getElementById("an--warning");
    eSuggestions = document.getElementById("an--suggestions");
    eCrack1 = document.getElementById("an--crack--1");
    eCrack2 = document.getElementById("an--crack--2");
    eCrack3 = document.getElementById("an--crack--3");
    eCrack4 = document.getElementById("an--crack--4");
    eCrack5 = document.getElementById("an--crack--5");
    strengthTexts = ["Unsuitable", "Poor", "Adequate", "Good", "Excellent"];
    strengthClasses = ["bg-danger", "bg-warning", "bg-warning", "bg-success", "bg-success"];
    niceTime = function(t) {
      var p;
      p = function(n, s) {
        if (Math.floor(n) === 1) {
          return Math.floor(n) + " " + s;
        } else {
          return Math.floor(n) + " " + s + "s";
        }
      };
      if (t < 1) {
        return "Less than a second";
      }
      if (t < 60) {
        return p(t, "second");
      }
      if (t < 3600) {
        return p(t / 60, "minute");
      }
      if (t < 86400) {
        return p(t / 3600, "hour");
      }
      if (t < 31536000) {
        return p(t / 86400, "day");
      }
      if (t < 3153600000) {
        return p(t / 31536000, "year");
      }
      return "Centuries";
    };
    energy_in_universe = 91.954242509439324874590055806510230618400257728381391;
    thermoLog = function(input) {
      var n;
      n = input - energy_in_universe;
      if (n > 0) {
        return "Requires more energy than available in the universe";
      } else {
        return "Factor " + Math.abs(n) + " (base 10)";
      }
    };
    return analyzeStrength = function() {
      var data, e, j, len, pw, ref, str;
      if (!zxcvbn) {
        return;
      }
      pw = eOutputText.value;
      if (pw.length > 100 && !window.DISABLE_ZXCVBN_LIMIT) {
        eError.style.display = null;
        eOutput.style.display = "none";
        return;
      }
      eError.style.display = "none";
      eOutput.style.display = null;
      data = zxcvbn(pw);
      eGuesses.value = Math.floor(data.guesses);
      eStrength.style.width = Math.min(data.guesses_log10 * 10, 100) + "%";
      eStrength.innerText = strengthTexts[data.score];
      eStrength.classList = "progress-bar " + strengthClasses[data.score];
      if (data.feedback.warning) {
        eWarning.style.display = null;
        eWarning.innerHTML = "<strong>Warning</strong><br />" + data.feedback.warning;
      } else {
        eWarning.style.display = "none";
      }
      eSuggestions.innerHTML = "";
      if (data.feedback.suggestions.length > 0) {
        ref = data.feedback.suggestions;
        for (j = 0, len = ref.length; j < len; j++) {
          str = ref[j];
          e = document.createElement("div");
          e.classList = "alert alert-info";
          e.innerHTML = "<strong>Suggestion</strong><br />" + str;
          eSuggestions.appendChild(e);
        }
      }
      eCrack1.value = data.crack_times_display.online_throttling_100_per_hour;
      eCrack2.value = data.crack_times_display.online_no_throttling_10_per_second;
      eCrack3.value = data.crack_times_display.offline_slow_hashing_1e4_per_second;
      eCrack4.value = data.crack_times_display.offline_fast_hashing_1e10_per_second;
      return eCrack5.value = thermoLog(data.guesses_log10);
    };
  })();

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
        eOutputText.value = out.join("");
        return analyzeStrength();
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
        eOutputText.value = out.join(" ");
        return analyzeStrength();
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

  eEvalInput.addEventListener("change", function() {
    eOutputText.value = eEvalInput.value;
    return analyzeStrength();
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9wYXNzd29yZHRvb2wvaW5kZXguanMiLCJzb3VyY2VzIjpbImdhZGdldHMvcGFzc3dvcmR0b29sL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtBQUFBLE1BQUEsa05BQUE7SUFBQTs7RUFBQSxNQUFNLENBQUMsb0JBQVAsR0FBOEI7O0VBRTlCLFNBQUEsR0FBWSxRQUFRLENBQUMsY0FBVCxDQUF3QixZQUF4Qjs7RUFDWixRQUFBLEdBQVcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsV0FBeEI7O0VBQ1gsUUFBQSxHQUFXLFFBQVEsQ0FBQyxjQUFULENBQXdCLFdBQXhCOztFQUNYLFNBQUEsR0FBWSxRQUFRLENBQUMsY0FBVCxDQUF3QixZQUF4Qjs7RUFDWixRQUFBLEdBQVcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsV0FBeEI7O0VBQ1gsUUFBQSxHQUFXLFFBQVEsQ0FBQyxjQUFULENBQXdCLFdBQXhCOztFQUNYLFVBQUEsR0FBYSxRQUFRLENBQUMsY0FBVCxDQUF3QixhQUF4Qjs7RUFDYixZQUFBLEdBQWUsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsZUFBeEI7O0VBQ2YsV0FBQSxHQUFjLFFBQVEsQ0FBQyxjQUFULENBQXdCLGNBQXhCOztFQUNkLFVBQUEsR0FBYSxRQUFRLENBQUMsY0FBVCxDQUF3QixhQUF4Qjs7RUFFYixTQUFBLEdBQVk7O0VBRVoscUJBQUEsR0FBd0IsU0FBQSxHQUFBOztFQUN4QixvQkFBQSxHQUF1QixTQUFBLEdBQUE7O0VBQ3ZCLGVBQUEsR0FBa0IsU0FBQSxHQUFBOztFQUVsQixXQUFBLEdBQWMsU0FBQTtJQUNiLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBcEIsQ0FBMkIsUUFBM0I7SUFDQSxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQW5CLENBQTBCLFFBQTFCO0lBQ0EsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFuQixDQUEwQixRQUExQjtJQUNBLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBaEIsR0FBMEI7SUFD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QUMsZ0JBQVgsQ0FBNEIsUUFBNUIsRUFBc0MsU0FBQTtJQUNyQyxXQUFXLENBQUMsS0FBWixHQUFvQixVQUFVLENBQUM7V0FDL0IsZUFBQSxDQUFBO0VBRnFDLENBQXRDO0FBbllBIiwic291cmNlc0NvbnRlbnQiOlsiIyMgQ09NTU9OICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxud2luZG93LkRJU0FCTEVfWlhDVkJOX0xJTUlUID0gZmFsc2VcblxuZU5hdkJydXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJuYXYtLWJydXRlXCJcbmVOYXZEaWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJuYXYtLWRpY3RcIlxuZU5hdkV2YWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcIm5hdi0tZXZhbFwiXG5lQnJ1dGVEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImJydXRlLS1kaXZcIlxuZURpY3REaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImRpY3QtLWRpdlwiXG5lRXZhbERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiZXZhbC0tZGl2XCJcbmVPdXRwdXREaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcIm91dHB1dC0tZGl2XCJcbmVPdXRwdXRFcnJvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwib3V0cHV0LS1lcnJvclwiXG5lT3V0cHV0VGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwib3V0cHV0LS10ZXh0XCJcbmVFdmFsSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImV2YWwtLWlucHV0XCJcblxuYWN0aXZlRGl2ID0gZUJydXRlRGl2XG5cbmdlbmVyYXRlQnJ1dGVQYXNzd29yZCA9IC0+XG5nZW5lcmF0ZURpY3RQYXNzd29yZCA9IC0+XG5hbmFseXplU3RyZW5ndGggPSAtPlxuXG5oaWRlQWxsTmF2cyA9IC0+XG5cdGVOYXZCcnV0ZS5jbGFzc0xpc3QucmVtb3ZlIFwiYWN0aXZlXCJcblx0ZU5hdkRpY3QuY2xhc3NMaXN0LnJlbW92ZSBcImFjdGl2ZVwiXG5cdGVOYXZFdmFsLmNsYXNzTGlzdC5yZW1vdmUgXCJhY3RpdmVcIlxuXHRlQnJ1dGVEaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cdGVEaWN0RGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXHRlRXZhbERpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblx0ZU91dHB1dERpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblxuZU5hdkJydXRlLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXHRyZXR1cm4gaWYgYWN0aXZlRGl2ID09IGVCcnV0ZURpdlxuXG5cdGhpZGVBbGxOYXZzKClcblx0ZU5hdkJydXRlLmNsYXNzTGlzdC5hZGQgXCJhY3RpdmVcIlxuXHRlQnJ1dGVEaXYuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0ZU91dHB1dERpdi5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRhY3RpdmVEaXYgPSBlQnJ1dGVEaXZcblx0Z2VuZXJhdGVCcnV0ZVBhc3N3b3JkKClcblxuZU5hdkRpY3QuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdHJldHVybiBpZiBhY3RpdmVEaXYgPT0gZURpY3REaXZcblxuXHRoaWRlQWxsTmF2cygpXG5cdGVOYXZEaWN0LmNsYXNzTGlzdC5hZGQgXCJhY3RpdmVcIlxuXHRlRGljdERpdi5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRlT3V0cHV0RGl2LnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdGFjdGl2ZURpdiA9IGVEaWN0RGl2XG5cdGdlbmVyYXRlRGljdFBhc3N3b3JkKClcblxuZU5hdkV2YWwuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdHJldHVybiBpZiBhY3RpdmVEaXYgPT0gZUV2YWxEaXZcblxuXHRoaWRlQWxsTmF2cygpXG5cdGVOYXZFdmFsLmNsYXNzTGlzdC5hZGQgXCJhY3RpdmVcIlxuXHRlRXZhbERpdi5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRhY3RpdmVEaXYgPSBlRXZhbERpdlxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJvdXRwdXQtLXJlZnJlc2hcIiApLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXHRpZiBhY3RpdmVEaXYgPT0gZUJydXRlRGl2XG5cdFx0Z2VuZXJhdGVCcnV0ZVBhc3N3b3JkKClcblx0aWYgYWN0aXZlRGl2ID09IGVEaWN0RGl2XG5cdFx0Z2VuZXJhdGVEaWN0UGFzc3dvcmQoKVxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJvdXRwdXQtLWNvcHlcIiApLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXHRlT3V0cHV0VGV4dC5zZWxlY3QoKVxuXHRkb2N1bWVudC5leGVjQ29tbWFuZCBcImNvcHlcIlxuXHRlT3V0cHV0VGV4dC5mb2N1cygpXG5cbnJhbmRvbUFycmF5ID0gKCBhcnJheSApIC0+XG5cdGFycmF5WyBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogYXJyYXkubGVuZ3RoICkgXVxuXG4jIyBTVFJFTkdUSCBBTkFMWVNJUyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5kbyAtPlxuXG5cdGVFcnJvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLWVycm9yXCJcblx0ZU91dHB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLWRpdi0tb3V0cHV0XCJcblx0ZUd1ZXNzZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImFuLS1ndWVzc2VzXCJcblx0ZVN0cmVuZ3RoPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImFuLS1zdHJlbmd0aFwiXG5cdGVXYXJuaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhbi0td2FybmluZ1wiXG5cdGVTdWdnZXN0aW9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLXN1Z2dlc3Rpb25zXCJcblx0ZUNyYWNrMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLWNyYWNrLS0xXCJcblx0ZUNyYWNrMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLWNyYWNrLS0yXCJcblx0ZUNyYWNrMyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLWNyYWNrLS0zXCJcblx0ZUNyYWNrNCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLWNyYWNrLS00XCJcblx0ZUNyYWNrNSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLWNyYWNrLS01XCJcblxuXHRzdHJlbmd0aFRleHRzID0gW1xuXHRcdFwiVW5zdWl0YWJsZVwiXG5cdFx0XCJQb29yXCJcblx0XHRcIkFkZXF1YXRlXCJcblx0XHRcIkdvb2RcIlxuXHRcdFwiRXhjZWxsZW50XCJcblx0XVxuXHRzdHJlbmd0aENsYXNzZXMgPSBbXG5cdFx0XCJiZy1kYW5nZXJcIlxuXHRcdFwiYmctd2FybmluZ1wiXG5cdFx0XCJiZy13YXJuaW5nXCJcblx0XHRcImJnLXN1Y2Nlc3NcIlxuXHRcdFwiYmctc3VjY2Vzc1wiXG5cdF1cblxuXHRuaWNlVGltZSA9ICggdCApIC0+XG5cdFx0cCA9ICggbiwgcyApIC0+XG5cdFx0XHRpZiBNYXRoLmZsb29yKCBuICkgPT0gMVxuXHRcdFx0XHRyZXR1cm4gTWF0aC5mbG9vciggbiApICsgXCIgXCIgKyBzXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHJldHVybiBNYXRoLmZsb29yKCBuICkgKyBcIiBcIiArIHMgKyBcInNcIlxuXG5cdFx0aWYgdCA8IDFcblx0XHRcdHJldHVybiBcIkxlc3MgdGhhbiBhIHNlY29uZFwiXG5cdFx0aWYgdCA8IDYwXG5cdFx0XHRyZXR1cm4gcCB0LCBcInNlY29uZFwiXG5cdFx0aWYgdCA8IDM2MDBcblx0XHRcdHJldHVybiBwIHQvNjAsIFwibWludXRlXCJcblx0XHRpZiB0IDwgODY0MDBcblx0XHRcdHJldHVybiBwIHQvMzYwMCwgXCJob3VyXCJcblx0XHRpZiB0IDwgMzE1MzYwMDBcblx0XHRcdHJldHVybiBwIHQvODY0MDAsIFwiZGF5XCJcblx0XHRpZiB0IDwgMzE1MzYwMDAwMFxuXHRcdFx0cmV0dXJuIHAgdC8zMTUzNjAwMCwgXCJ5ZWFyXCJcblx0XHRyZXR1cm4gXCJDZW50dXJpZXNcIlxuXG5cdGVuZXJneV9pbl91bml2ZXJzZSA9IDkxLjk1NDI0MjUwOTQzOTMyNDg3NDU5MDA1NTgwNjUxMDIzMDYxODQwMDI1NzcyODM4MTM5MVxuXHR0aGVybW9Mb2cgPSAoIGlucHV0ICkgLT5cblx0XHRuID0gaW5wdXQgLSBlbmVyZ3lfaW5fdW5pdmVyc2VcblxuXHRcdGlmIG4gPiAwXG5cdFx0XHQjIGdvb2QgbG9yZFxuXHRcdFx0cmV0dXJuIFwiUmVxdWlyZXMgbW9yZSBlbmVyZ3kgdGhhbiBhdmFpbGFibGUgaW4gdGhlIHVuaXZlcnNlXCJcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gXCJGYWN0b3IgXCIgKyBNYXRoLmFicyggbiApICsgXCIgKGJhc2UgMTApXCJcblxuXHRhbmFseXplU3RyZW5ndGggPSAtPlxuXHRcdHJldHVybiBpZiBub3QgenhjdmJuXG5cblx0XHRwdyA9IGVPdXRwdXRUZXh0LnZhbHVlXG5cblx0XHRpZiBwdy5sZW5ndGggPiAxMDAgYW5kIG5vdCB3aW5kb3cuRElTQUJMRV9aWENWQk5fTElNSVRcblx0XHRcdGVFcnJvci5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRcdFx0ZU91dHB1dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblx0XHRcdHJldHVyblxuXG5cdFx0ZUVycm9yLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXHRcdGVPdXRwdXQuc3R5bGUuZGlzcGxheSA9IG51bGxcblxuXHRcdGRhdGEgPSB6eGN2Ym4oIHB3IClcblxuXHRcdGVHdWVzc2VzLnZhbHVlID0gTWF0aC5mbG9vciggZGF0YS5ndWVzc2VzIClcblx0XHRlU3RyZW5ndGguc3R5bGUud2lkdGggPVxuXHRcdFx0TWF0aC5taW4oIGRhdGEuZ3Vlc3Nlc19sb2cxMCAqIDEwLCAxMDAgKSArIFwiJVwiXG5cdFx0ZVN0cmVuZ3RoLmlubmVyVGV4dCA9IHN0cmVuZ3RoVGV4dHNbIGRhdGEuc2NvcmUgXVxuXHRcdGVTdHJlbmd0aC5jbGFzc0xpc3QgPSBcInByb2dyZXNzLWJhciBcIiArIHN0cmVuZ3RoQ2xhc3Nlc1sgZGF0YS5zY29yZSBdXG5cblx0XHRpZiBkYXRhLmZlZWRiYWNrLndhcm5pbmdcblx0XHRcdGVXYXJuaW5nLnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdFx0XHRlV2FybmluZy5pbm5lckhUTUwgPSBcIjxzdHJvbmc+V2FybmluZzwvc3Ryb25nPjxiciAvPlwiICtcblx0XHRcdFx0ZGF0YS5mZWVkYmFjay53YXJuaW5nXG5cdFx0ZWxzZVxuXHRcdFx0ZVdhcm5pbmcuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cblx0XHRlU3VnZ2VzdGlvbnMuaW5uZXJIVE1MID0gXCJcIlxuXHRcdGlmIGRhdGEuZmVlZGJhY2suc3VnZ2VzdGlvbnMubGVuZ3RoID4gMFxuXHRcdFx0Zm9yIHN0ciBpbiBkYXRhLmZlZWRiYWNrLnN1Z2dlc3Rpb25zXG5cdFx0XHRcdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiZGl2XCJcblx0XHRcdFx0ZS5jbGFzc0xpc3QgPSBcImFsZXJ0IGFsZXJ0LWluZm9cIlxuXHRcdFx0XHRlLmlubmVySFRNTCA9IFwiPHN0cm9uZz5TdWdnZXN0aW9uPC9zdHJvbmc+PGJyIC8+XCIgKyBzdHJcblx0XHRcdFx0ZVN1Z2dlc3Rpb25zLmFwcGVuZENoaWxkKCBlIClcblxuXHRcdGVDcmFjazEudmFsdWUgPVxuXHRcdFx0ZGF0YS5jcmFja190aW1lc19kaXNwbGF5Lm9ubGluZV90aHJvdHRsaW5nXzEwMF9wZXJfaG91clxuXHRcdGVDcmFjazIudmFsdWUgPVxuXHRcdFx0ZGF0YS5jcmFja190aW1lc19kaXNwbGF5Lm9ubGluZV9ub190aHJvdHRsaW5nXzEwX3Blcl9zZWNvbmRcblx0XHRlQ3JhY2szLnZhbHVlID1cblx0XHRcdGRhdGEuY3JhY2tfdGltZXNfZGlzcGxheS5vZmZsaW5lX3Nsb3dfaGFzaGluZ18xZTRfcGVyX3NlY29uZFxuXHRcdGVDcmFjazQudmFsdWUgPVxuXHRcdFx0ZGF0YS5jcmFja190aW1lc19kaXNwbGF5Lm9mZmxpbmVfZmFzdF9oYXNoaW5nXzFlMTBfcGVyX3NlY29uZFxuXHRcdGVDcmFjazUudmFsdWUgPSB0aGVybW9Mb2coIGRhdGEuZ3Vlc3Nlc19sb2cxMCApXG5cbiMjIEJSVVRFICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmRvIC0+XG5cblx0IyMgQWR2YW5jZWQgT3B0aW9ucyBEaXNwbGF5ICMjXG5cblx0ZUFkdkRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYnJ1dGUtLWFkdi0tZGl2XCJcblxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJicnV0ZS0tYWR2LS10b2dnbGVcIiApLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXHRcdGlmIGVBZHZEaXYuc3R5bGUuZGlzcGxheVxuXHRcdFx0ZUFkdkRpdi5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRcdGVsc2Vcblx0XHRcdGVBZHZEaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cblx0IyMgRWxlbWVudHMgIyNcblxuXHRlTGVuZ3RoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJicnV0ZS0tbGVuZ3RoXCJcblx0ZVVwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJicnV0ZS0tdXBwZXJcIlxuXHRlTG93ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImJydXRlLS1sb3dlclwiXG5cdGVEaWdpdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImJydXRlLS1kaWdpdHNcIlxuXHRlU3ltYm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYnJ1dGUtLXN5bWJvbHNcIlxuXHRlQW1iaWd1b3VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJicnV0ZS0tYW1iaWd1b3VzXCJcblx0ZU1pbkRpZ2l0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYnJ1dGUtLW1pbmRpZ2l0c1wiXG5cblx0dmFsaWRDaGFyYWN0ZXJzID0gW11cblx0dmFsaWREaWdpdHMgPSBbXVxuXG5cdCMjIEZ1bmN0aW9ucyAjI1xuXG5cdGFtYmlndW91c0NoYXJhY3RlcnMgPSBbXG5cdFx0J0InLCAnRycsICdJJywgJ08nLCAnUScsICdEJywgJ1MnLCAnWidcblx0XHQnbCdcblx0XHQnOCcsICc2JywgJzEnLCAnMCcsICc1JywgJzInXG5cdF1cblxuXHRnZW5lcmF0ZVZhbGlkQ2hhcmFjdGVycyA9IC0+XG5cdFx0dmFsaWRDaGFyYWN0ZXJzID0gW11cblx0XHR2YWxpZERpZ2l0cyA9IFtdXG5cblx0XHRmb3IgaSBpbiBbMzMuLjEyNl1cblx0XHRcdGMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCBpIClcblxuXHRcdFx0Y29udGludWUgaWYgYyBpbiBhbWJpZ3VvdXNDaGFyYWN0ZXJzIGFuZCBlQW1iaWd1b3VzLmNoZWNrZWRcblxuXHRcdFx0aWYgNDggPD0gaSA8PSA1N1xuXHRcdFx0XHRjb250aW51ZSBpZiBub3QgZURpZ2l0cy5jaGVja2VkXG5cdFx0XHRcdHZhbGlkQ2hhcmFjdGVycy5wdXNoIGNcblx0XHRcdFx0dmFsaWREaWdpdHMucHVzaCBjXG5cdFx0XHRlbHNlIGlmIDY1IDw9IGkgPD0gOTBcblx0XHRcdFx0Y29udGludWUgaWYgbm90IGVVcHBlci5jaGVja2VkXG5cdFx0XHRcdHZhbGlkQ2hhcmFjdGVycy5wdXNoIGNcblx0XHRcdGVsc2UgaWYgOTcgPD0gaSA8PSAxMjJcblx0XHRcdFx0Y29udGludWUgaWYgbm90IGVMb3dlci5jaGVja2VkXG5cdFx0XHRcdHZhbGlkQ2hhcmFjdGVycy5wdXNoIGNcblx0XHRcdGVsc2UgaWYgZVN5bWJvbHMuY2hlY2tlZFxuXHRcdFx0XHR2YWxpZENoYXJhY3RlcnMucHVzaCBjXG5cblx0Z2VuZXJhdGVWYWxpZENoYXJhY3RlcnMoKVxuXG5cdCMjIEdlbmVyYXRpb24gQWxnb3JpdGhtICMjXG5cblx0c2h1ZmZsZUFycmF5ID0gKCBhcnJheSApIC0+XG5cdFx0YyA9IGFycmF5Lmxlbmd0aFxuXHRcdHdoaWxlIGMgPiAwXG5cdFx0XHRpID0gTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIGMgKVxuXG5cdFx0XHRjLS1cblxuXHRcdFx0WyBhcnJheVtjXSwgYXJyYXlbaV0gXSA9IFsgYXJyYXlbaV0sIGFycmF5W2NdIF1cblxuXHRcdHJldHVybiBhcnJheVxuXG5cdHNob3dFcnJvciA9ICggc3RyICkgLT5cblx0XHRlT3V0cHV0RXJyb3Iuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0XHRlT3V0cHV0RXJyb3IuaW5uZXJIVE1MID0gc3RyXG5cdFx0dGhyb3cgZU91dHB1dEVycm9yXG5cblx0Z2VuZXJhdGVCcnV0ZVBhc3N3b3JkID0gLT5cblx0XHR0cnlcblx0XHRcdCMjIFZhbGlkYXRpb25cblx0XHRcdGxlbmd0aCA9IHBhcnNlSW50KCBlTGVuZ3RoLnZhbHVlIClcblx0XHRcdG1pbkRpZ2l0cyA9IHBhcnNlSW50KCBlTWluRGlnaXRzLnZhbHVlIClcblxuXHRcdFx0aWYgaXNOYU4oIGxlbmd0aCApXG5cdFx0XHRcdHRocm93IFwiUGFzc3dvcmQgbGVuZ3RoIG11c3QgYmUgYW4gaW50ZWdlclwiXG5cdFx0XHRpZiBsZW5ndGggPD0gMFxuXHRcdFx0XHR0aHJvdyBcIlBhc3N3b3JkIGxlbmd0aCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvXCJcblx0XHRcdGlmIGlzTmFOKCBtaW5EaWdpdHMgKVxuXHRcdFx0XHRtaW5EaWdpdHMgPSAwXG5cdFx0XHRpZiBtaW5EaWdpdHMgPCAwXG5cdFx0XHRcdHRocm93IFwiTWluaW11bSBEaWdpdHMgbXVzdCBiZSB6ZXJvIG9yIGdyZWF0ZXJcIlxuXHRcdFx0aWYgbWluRGlnaXRzID4gbGVuZ3RoXG5cdFx0XHRcdG1pbkRpZ2l0cyA9IGxlbmd0aFxuXHRcdFx0aWYgbWluRGlnaXRzID4gMFxuXHRcdFx0XHRlRGlnaXRzLmNoZWNrZWQgPSB0cnVlXG5cdFx0XHRcdGdlbmVyYXRlVmFsaWRDaGFyYWN0ZXJzKClcblxuXHRcdFx0aWYgbm90IGVVcHBlci5jaGVja2VkIGFuZFxuXHRcdFx0XHRub3QgZUxvd2VyLmNoZWNrZWQgYW5kXG5cdFx0XHRcdG5vdCBlRGlnaXRzLmNoZWNrZWQgYW5kXG5cdFx0XHRcdG5vdCBlU3ltYm9scy5jaGVja2VkXG5cblx0XHRcdFx0XHRlTG93ZXIuY2hlY2tlZCA9IHRydWVcblx0XHRcdFx0XHRnZW5lcmF0ZVZhbGlkQ2hhcmFjdGVycygpXG5cblx0XHRcdCMjIEV4ZWN1dGlvblxuXHRcdFx0b3V0ID0gW11cblxuXHRcdFx0aWYgbWluRGlnaXRzID4gMFxuXHRcdFx0XHRmb3IgWzEuLm1pbkRpZ2l0c11cblx0XHRcdFx0XHRvdXQucHVzaCByYW5kb21BcnJheSggdmFsaWREaWdpdHMgKVxuXHRcdFx0aWYgbGVuZ3RoID4gbWluRGlnaXRzXG5cdFx0XHRcdGZvciBbMS4uKCBsZW5ndGggLSBtaW5EaWdpdHMgKV1cblx0XHRcdFx0XHRvdXQucHVzaCByYW5kb21BcnJheSggdmFsaWRDaGFyYWN0ZXJzIClcblxuXHRcdFx0c2h1ZmZsZUFycmF5KCBvdXQgKVxuXG5cdFx0XHRlT3V0cHV0VGV4dC52YWx1ZSA9IG91dC5qb2luIFwiXCJcblx0XHRcdGFuYWx5emVTdHJlbmd0aCgpXG5cdFx0Y2F0Y2ggZXhcblx0XHRcdGlmIHR5cGVvZiggZXggKSA9PSBcInN0cmluZ1wiXG5cdFx0XHRcdGVPdXRwdXRFcnJvci5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRcdFx0XHRlT3V0cHV0RXJyb3IuaW5uZXJIVE1MID0gZXhcblx0XHRcdHRocm93IGV4XG5cblx0IyMgRXZlbnRzICMjXG5cblx0YnVpbGRBbmRHZW5lcmF0ZSA9IC0+XG5cdFx0Z2VuZXJhdGVWYWxpZENoYXJhY3RlcnMoKVxuXHRcdGdlbmVyYXRlQnJ1dGVQYXNzd29yZCgpXG5cdGVVcHBlci5hZGRFdmVudExpc3RlbmVyIFwiY2hhbmdlXCIsIGJ1aWxkQW5kR2VuZXJhdGVcblx0ZUxvd2VyLmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgYnVpbGRBbmRHZW5lcmF0ZVxuXHRlU3ltYm9scy5hZGRFdmVudExpc3RlbmVyIFwiY2hhbmdlXCIsIGJ1aWxkQW5kR2VuZXJhdGVcblx0ZUFtYmlndW91cy5hZGRFdmVudExpc3RlbmVyIFwiY2hhbmdlXCIsIGJ1aWxkQW5kR2VuZXJhdGVcblxuXHRlTGVuZ3RoLmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgZ2VuZXJhdGVCcnV0ZVBhc3N3b3JkXG5cdGVNaW5EaWdpdHMuYWRkRXZlbnRMaXN0ZW5lciBcImNoYW5nZVwiLCBnZW5lcmF0ZUJydXRlUGFzc3dvcmRcblxuXHRlRGlnaXRzLmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgLT5cblx0XHRpZiBub3QgQGNoZWNrZWRcblx0XHRcdGVNaW5EaWdpdHMudmFsdWUgPSAwXG5cdFx0YnVpbGRBbmRHZW5lcmF0ZSgpXG5cbmdlbmVyYXRlQnJ1dGVQYXNzd29yZCgpXG5cbiMjIERJQ1RJT05BUlkgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmRvIC0+XG5cblx0IyMgRWxlbWVudHMgIyNcblxuXHRlV29yZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImRpY3QtLXdvcmRzXCJcblx0ZURvd25sb2FkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJkaWN0LS1kb3dubG9hZGluZ1wiXG5cblx0d29yZExpc3QgPSBudWxsXG5cblx0IyMgR2VuZXJhdGlvbiBBbGdvcml0aG0gIyNcblxuXHRsb2FkV29yZExpc3QgPSAtPlxuXHRcdGlmIHdvcmRMaXN0ID09IDBcblx0XHRcdHJldHVyblxuXHRcdHdvcmRMaXN0ID0gMFxuXG5cdFx0cmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0XG5cdFx0cmVxLm92ZXJyaWRlTWltZVR5cGUgXCJhcHBsaWNhdGlvbi9qc29uXCJcblx0XHRyZXEub3BlbiBcIkdFVFwiLCBcIndvcmRsaXN0Lmpzb25cIlxuXHRcdHJlcS5vbmxvYWQgPSAtPlxuXHRcdFx0cmV0dXJuIGlmIHJlcS5yZWFkeVN0YXRlICE9IDRcblx0XHRcdGlmIHJlcS5zdGF0dXMgPT0gMjAwXG5cdFx0XHRcdHdvcmRMaXN0ID0gSlNPTi5wYXJzZSggcmVxLnJlc3BvbnNlVGV4dCApXG5cdFx0XHRcdGVEb3dubG9hZGluZy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblx0XHRcdFx0Z2VuZXJhdGVEaWN0UGFzc3dvcmQoKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRlT3V0cHV0RXJyb3Iuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0XHRcdFx0ZU91dHB1dEVycm9yLmlubmVySFRNTCA9IFwiRXJyb3Igd2hlbiBkb3dubG9hZGluZyB3b3JkIGxpc3RcIlxuXHRcdFx0XHR3b3JkTGlzdCA9IG51bGxcblx0XHRyZXEuc2VuZCBudWxsXG5cblx0Z2VuZXJhdGVEaWN0UGFzc3dvcmQgPSAtPlxuXHRcdHRyeVxuXHRcdFx0IyMgVmFsaWRhdGlvblxuXHRcdFx0d29yZHMgPSBwYXJzZUludCggZVdvcmRzLnZhbHVlIClcblxuXHRcdFx0aWYgaXNOYU4oIHdvcmRzIClcblx0XHRcdFx0dGhyb3cgXCJXb3JkIGNvdW50IG11c3QgYmUgYW4gaW50ZWdlclwiXG5cdFx0XHRpZiB3b3JkcyA8PSAwXG5cdFx0XHRcdHRocm93IFwiV29yZCBjb3VudCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvXCJcblx0XHRcdGlmIG5vdCB3b3JkTGlzdFxuXHRcdFx0XHRsb2FkV29yZExpc3QoKVxuXHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0IyMgRXhlY3V0aW9uXG5cdFx0XHRvdXQgPSBbXVxuXG5cdFx0XHRmb3IgWzEuLndvcmRzXVxuXHRcdFx0XHRvdXQucHVzaCByYW5kb21BcnJheSggd29yZExpc3QgKS50b0xvd2VyQ2FzZSgpXG5cblx0XHRcdGVPdXRwdXRUZXh0LnZhbHVlID0gb3V0LmpvaW4gXCIgXCJcblx0XHRcdGFuYWx5emVTdHJlbmd0aCgpXG5cdFx0Y2F0Y2ggZXhcblx0XHRcdGlmIHR5cGVvZiggZXggKSA9PSBcInN0cmluZ1wiXG5cdFx0XHRcdGVPdXRwdXRFcnJvci5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRcdFx0XHRlT3V0cHV0RXJyb3IuaW5uZXJIVE1MID0gZXhcblx0XHRcdGNvbnNvbGUuZXJyb3IgZXhcblxuXHQjIyBFdmVudHMgIyNcblxuXHRlV29yZHMuYWRkRXZlbnRMaXN0ZW5lciBcImNoYW5nZVwiLCBnZW5lcmF0ZURpY3RQYXNzd29yZFxuXG5lRXZhbElucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgLT5cblx0ZU91dHB1dFRleHQudmFsdWUgPSBlRXZhbElucHV0LnZhbHVlXG5cdGFuYWx5emVTdHJlbmd0aCgpXG4iXX0=
