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
      } else if (n > -7) {
        return (Math.pow(10, n) * 100) + "%";
      } else {
        return "10^" + Math.floor(n + 2) + " %";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9wYXNzd29yZHRvb2wvaW5kZXguanMiLCJzb3VyY2VzIjpbImdhZGdldHMvcGFzc3dvcmR0b29sL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtBQUFBLE1BQUEsa05BQUE7SUFBQTs7RUFBQSxNQUFNLENBQUMsb0JBQVAsR0FBOEI7O0VBRTlCLFNBQUEsR0FBWSxRQUFRLENBQUMsY0FBVCxDQUF3QixZQUF4Qjs7RUFDWixRQUFBLEdBQVcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsV0FBeEI7O0VBQ1gsUUFBQSxHQUFXLFFBQVEsQ0FBQyxjQUFULENBQXdCLFdBQXhCOztFQUNYLFNBQUEsR0FBWSxRQUFRLENBQUMsY0FBVCxDQUF3QixZQUF4Qjs7RUFDWixRQUFBLEdBQVcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsV0FBeEI7O0VBQ1gsUUFBQSxHQUFXLFFBQVEsQ0FBQyxjQUFULENBQXdCLFdBQXhCOztFQUNYLFVBQUEsR0FBYSxRQUFRLENBQUMsY0FBVCxDQUF3QixhQUF4Qjs7RUFDYixZQUFBLEdBQWUsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsZUFBeEI7O0VBQ2YsV0FBQSxHQUFjLFFBQVEsQ0FBQyxjQUFULENBQXdCLGNBQXhCOztFQUNkLFVBQUEsR0FBYSxRQUFRLENBQUMsY0FBVCxDQUF3QixhQUF4Qjs7RUFFYixTQUFBLEdBQVk7O0VBRVoscUJBQUEsR0FBd0IsU0FBQSxHQUFBOztFQUN4QixvQkFBQSxHQUF1QixTQUFBLEdBQUE7O0VBQ3ZCLGVBQUEsR0FBa0IsU0FBQSxHQUFBOztFQUVsQixXQUFBLEdBQWMsU0FBQTtJQUNiLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBcEIsQ0FBMkIsUUFBM0I7SUFDQSxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQW5CLENBQTBCLFFBQTFCO0lBQ0EsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFuQixDQUEwQixRQUExQjtJQUNBLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBaEIsR0FBMEI7SUFD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ZCxFQXhCRDs7SUFEc0I7V0E2QnZCLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxvQkFBbEM7RUE1REUsQ0FBQSxDQUFILENBQUE7O0VBOERBLFVBQVUsQ0FBQyxnQkFBWCxDQUE0QixRQUE1QixFQUFzQyxTQUFBO0lBQ3JDLFdBQVcsQ0FBQyxLQUFaLEdBQW9CLFVBQVUsQ0FBQztXQUMvQixlQUFBLENBQUE7RUFGcUMsQ0FBdEM7QUFyWUEiLCJzb3VyY2VzQ29udGVudCI6WyIjIyBDT01NT04gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG53aW5kb3cuRElTQUJMRV9aWENWQk5fTElNSVQgPSBmYWxzZVxuXG5lTmF2QnJ1dGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcIm5hdi0tYnJ1dGVcIlxuZU5hdkRpY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcIm5hdi0tZGljdFwiXG5lTmF2RXZhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwibmF2LS1ldmFsXCJcbmVCcnV0ZURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYnJ1dGUtLWRpdlwiXG5lRGljdERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiZGljdC0tZGl2XCJcbmVFdmFsRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJldmFsLS1kaXZcIlxuZU91dHB1dERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwib3V0cHV0LS1kaXZcIlxuZU91dHB1dEVycm9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJvdXRwdXQtLWVycm9yXCJcbmVPdXRwdXRUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJvdXRwdXQtLXRleHRcIlxuZUV2YWxJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiZXZhbC0taW5wdXRcIlxuXG5hY3RpdmVEaXYgPSBlQnJ1dGVEaXZcblxuZ2VuZXJhdGVCcnV0ZVBhc3N3b3JkID0gLT5cbmdlbmVyYXRlRGljdFBhc3N3b3JkID0gLT5cbmFuYWx5emVTdHJlbmd0aCA9IC0+XG5cbmhpZGVBbGxOYXZzID0gLT5cblx0ZU5hdkJydXRlLmNsYXNzTGlzdC5yZW1vdmUgXCJhY3RpdmVcIlxuXHRlTmF2RGljdC5jbGFzc0xpc3QucmVtb3ZlIFwiYWN0aXZlXCJcblx0ZU5hdkV2YWwuY2xhc3NMaXN0LnJlbW92ZSBcImFjdGl2ZVwiXG5cdGVCcnV0ZURpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblx0ZURpY3REaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cdGVFdmFsRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXHRlT3V0cHV0RGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXG5lTmF2QnJ1dGUuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdHJldHVybiBpZiBhY3RpdmVEaXYgPT0gZUJydXRlRGl2XG5cblx0aGlkZUFsbE5hdnMoKVxuXHRlTmF2QnJ1dGUuY2xhc3NMaXN0LmFkZCBcImFjdGl2ZVwiXG5cdGVCcnV0ZURpdi5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRlT3V0cHV0RGl2LnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdGFjdGl2ZURpdiA9IGVCcnV0ZURpdlxuXHRnZW5lcmF0ZUJydXRlUGFzc3dvcmQoKVxuXG5lTmF2RGljdC5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgLT5cblx0cmV0dXJuIGlmIGFjdGl2ZURpdiA9PSBlRGljdERpdlxuXG5cdGhpZGVBbGxOYXZzKClcblx0ZU5hdkRpY3QuY2xhc3NMaXN0LmFkZCBcImFjdGl2ZVwiXG5cdGVEaWN0RGl2LnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdGVPdXRwdXREaXYuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0YWN0aXZlRGl2ID0gZURpY3REaXZcblx0Z2VuZXJhdGVEaWN0UGFzc3dvcmQoKVxuXG5lTmF2RXZhbC5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgLT5cblx0cmV0dXJuIGlmIGFjdGl2ZURpdiA9PSBlRXZhbERpdlxuXG5cdGhpZGVBbGxOYXZzKClcblx0ZU5hdkV2YWwuY2xhc3NMaXN0LmFkZCBcImFjdGl2ZVwiXG5cdGVFdmFsRGl2LnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdGFjdGl2ZURpdiA9IGVFdmFsRGl2XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBcIm91dHB1dC0tcmVmcmVzaFwiICkuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdGlmIGFjdGl2ZURpdiA9PSBlQnJ1dGVEaXZcblx0XHRnZW5lcmF0ZUJydXRlUGFzc3dvcmQoKVxuXHRpZiBhY3RpdmVEaXYgPT0gZURpY3REaXZcblx0XHRnZW5lcmF0ZURpY3RQYXNzd29yZCgpXG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBcIm91dHB1dC0tY29weVwiICkuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdGVPdXRwdXRUZXh0LnNlbGVjdCgpXG5cdGRvY3VtZW50LmV4ZWNDb21tYW5kIFwiY29weVwiXG5cdGVPdXRwdXRUZXh0LmZvY3VzKClcblxucmFuZG9tQXJyYXkgPSAoIGFycmF5ICkgLT5cblx0YXJyYXlbIE1hdGguZmxvb3IoIE1hdGgucmFuZG9tKCkgKiBhcnJheS5sZW5ndGggKSBdXG5cbiMjIFNUUkVOR1RIIEFOQUxZU0lTICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmRvIC0+XG5cblx0ZUVycm9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhbi0tZXJyb3JcIlxuXHRlT3V0cHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhbi0tZGl2LS1vdXRwdXRcIlxuXHRlR3Vlc3NlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLWd1ZXNzZXNcIlxuXHRlU3RyZW5ndGg9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLXN0cmVuZ3RoXCJcblx0ZVdhcm5pbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImFuLS13YXJuaW5nXCJcblx0ZVN1Z2dlc3Rpb25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhbi0tc3VnZ2VzdGlvbnNcIlxuXHRlQ3JhY2sxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhbi0tY3JhY2stLTFcIlxuXHRlQ3JhY2syID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhbi0tY3JhY2stLTJcIlxuXHRlQ3JhY2szID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhbi0tY3JhY2stLTNcIlxuXHRlQ3JhY2s0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhbi0tY3JhY2stLTRcIlxuXHRlQ3JhY2s1ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhbi0tY3JhY2stLTVcIlxuXG5cdHN0cmVuZ3RoVGV4dHMgPSBbXG5cdFx0XCJVbnN1aXRhYmxlXCJcblx0XHRcIlBvb3JcIlxuXHRcdFwiQWRlcXVhdGVcIlxuXHRcdFwiR29vZFwiXG5cdFx0XCJFeGNlbGxlbnRcIlxuXHRdXG5cdHN0cmVuZ3RoQ2xhc3NlcyA9IFtcblx0XHRcImJnLWRhbmdlclwiXG5cdFx0XCJiZy13YXJuaW5nXCJcblx0XHRcImJnLXdhcm5pbmdcIlxuXHRcdFwiYmctc3VjY2Vzc1wiXG5cdFx0XCJiZy1zdWNjZXNzXCJcblx0XVxuXG5cdG5pY2VUaW1lID0gKCB0ICkgLT5cblx0XHRwID0gKCBuLCBzICkgLT5cblx0XHRcdGlmIE1hdGguZmxvb3IoIG4gKSA9PSAxXG5cdFx0XHRcdHJldHVybiBNYXRoLmZsb29yKCBuICkgKyBcIiBcIiArIHNcblx0XHRcdGVsc2Vcblx0XHRcdFx0cmV0dXJuIE1hdGguZmxvb3IoIG4gKSArIFwiIFwiICsgcyArIFwic1wiXG5cblx0XHRpZiB0IDwgMVxuXHRcdFx0cmV0dXJuIFwiTGVzcyB0aGFuIGEgc2Vjb25kXCJcblx0XHRpZiB0IDwgNjBcblx0XHRcdHJldHVybiBwIHQsIFwic2Vjb25kXCJcblx0XHRpZiB0IDwgMzYwMFxuXHRcdFx0cmV0dXJuIHAgdC82MCwgXCJtaW51dGVcIlxuXHRcdGlmIHQgPCA4NjQwMFxuXHRcdFx0cmV0dXJuIHAgdC8zNjAwLCBcImhvdXJcIlxuXHRcdGlmIHQgPCAzMTUzNjAwMFxuXHRcdFx0cmV0dXJuIHAgdC84NjQwMCwgXCJkYXlcIlxuXHRcdGlmIHQgPCAzMTUzNjAwMDAwXG5cdFx0XHRyZXR1cm4gcCB0LzMxNTM2MDAwLCBcInllYXJcIlxuXHRcdHJldHVybiBcIkNlbnR1cmllc1wiXG5cblx0ZW5lcmd5X2luX3VuaXZlcnNlID0gOTEuOTU0MjQyNTA5NDM5MzI0ODc0NTkwMDU1ODA2NTEwMjMwNjE4NDAwMjU3NzI4MzgxMzkxXG5cdHRoZXJtb0xvZyA9ICggaW5wdXQgKSAtPlxuXHRcdG4gPSBpbnB1dCAtIGVuZXJneV9pbl91bml2ZXJzZVxuXG5cdFx0aWYgbiA+IDBcblx0XHRcdCMgZ29vZCBsb3JkXG5cdFx0XHRyZXR1cm4gXCJSZXF1aXJlcyBtb3JlIGVuZXJneSB0aGFuIGF2YWlsYWJsZSBpbiB0aGUgdW5pdmVyc2VcIlxuXHRcdGVsc2UgaWYgbiA+IC03XG5cdFx0XHRyZXR1cm4gKCAxMCAqKiBuICogMTAwICkgKyBcIiVcIlxuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBcIjEwXlwiICsgTWF0aC5mbG9vciggbiArIDIgKSArIFwiICVcIlxuXG5cdGFuYWx5emVTdHJlbmd0aCA9IC0+XG5cdFx0cmV0dXJuIGlmIG5vdCB6eGN2Ym5cblxuXHRcdHB3ID0gZU91dHB1dFRleHQudmFsdWVcblxuXHRcdGlmIHB3Lmxlbmd0aCA+IDEwMCBhbmQgbm90IHdpbmRvdy5ESVNBQkxFX1pYQ1ZCTl9MSU1JVFxuXHRcdFx0ZUVycm9yLnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdFx0XHRlT3V0cHV0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXHRcdFx0cmV0dXJuXG5cblx0XHRlRXJyb3Iuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cdFx0ZU91dHB1dC5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXG5cdFx0ZGF0YSA9IHp4Y3ZibiggcHcgKVxuXG5cdFx0ZUd1ZXNzZXMudmFsdWUgPSBNYXRoLmZsb29yKCBkYXRhLmd1ZXNzZXMgKVxuXHRcdGVTdHJlbmd0aC5zdHlsZS53aWR0aCA9XG5cdFx0XHRNYXRoLm1pbiggZGF0YS5ndWVzc2VzX2xvZzEwICogMTAsIDEwMCApICsgXCIlXCJcblx0XHRlU3RyZW5ndGguaW5uZXJUZXh0ID0gc3RyZW5ndGhUZXh0c1sgZGF0YS5zY29yZSBdXG5cdFx0ZVN0cmVuZ3RoLmNsYXNzTGlzdCA9IFwicHJvZ3Jlc3MtYmFyIFwiICsgc3RyZW5ndGhDbGFzc2VzWyBkYXRhLnNjb3JlIF1cblxuXHRcdGlmIGRhdGEuZmVlZGJhY2sud2FybmluZ1xuXHRcdFx0ZVdhcm5pbmcuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0XHRcdGVXYXJuaW5nLmlubmVySFRNTCA9IFwiPHN0cm9uZz5XYXJuaW5nPC9zdHJvbmc+PGJyIC8+XCIgK1xuXHRcdFx0XHRkYXRhLmZlZWRiYWNrLndhcm5pbmdcblx0XHRlbHNlXG5cdFx0XHRlV2FybmluZy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblxuXHRcdGVTdWdnZXN0aW9ucy5pbm5lckhUTUwgPSBcIlwiXG5cdFx0aWYgZGF0YS5mZWVkYmFjay5zdWdnZXN0aW9ucy5sZW5ndGggPiAwXG5cdFx0XHRmb3Igc3RyIGluIGRhdGEuZmVlZGJhY2suc3VnZ2VzdGlvbnNcblx0XHRcdFx0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJkaXZcIlxuXHRcdFx0XHRlLmNsYXNzTGlzdCA9IFwiYWxlcnQgYWxlcnQtaW5mb1wiXG5cdFx0XHRcdGUuaW5uZXJIVE1MID0gXCI8c3Ryb25nPlN1Z2dlc3Rpb248L3N0cm9uZz48YnIgLz5cIiArIHN0clxuXHRcdFx0XHRlU3VnZ2VzdGlvbnMuYXBwZW5kQ2hpbGQoIGUgKVxuXG5cdFx0ZUNyYWNrMS52YWx1ZSA9XG5cdFx0XHRkYXRhLmNyYWNrX3RpbWVzX2Rpc3BsYXkub25saW5lX3Rocm90dGxpbmdfMTAwX3Blcl9ob3VyXG5cdFx0ZUNyYWNrMi52YWx1ZSA9XG5cdFx0XHRkYXRhLmNyYWNrX3RpbWVzX2Rpc3BsYXkub25saW5lX25vX3Rocm90dGxpbmdfMTBfcGVyX3NlY29uZFxuXHRcdGVDcmFjazMudmFsdWUgPVxuXHRcdFx0ZGF0YS5jcmFja190aW1lc19kaXNwbGF5Lm9mZmxpbmVfc2xvd19oYXNoaW5nXzFlNF9wZXJfc2Vjb25kXG5cdFx0ZUNyYWNrNC52YWx1ZSA9XG5cdFx0XHRkYXRhLmNyYWNrX3RpbWVzX2Rpc3BsYXkub2ZmbGluZV9mYXN0X2hhc2hpbmdfMWUxMF9wZXJfc2Vjb25kXG5cdFx0ZUNyYWNrNS52YWx1ZSA9IHRoZXJtb0xvZyggZGF0YS5ndWVzc2VzX2xvZzEwIClcblxuIyMgQlJVVEUgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZG8gLT5cblxuXHQjIyBBZHZhbmNlZCBPcHRpb25zIERpc3BsYXkgIyNcblxuXHRlQWR2RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJicnV0ZS0tYWR2LS1kaXZcIlxuXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBcImJydXRlLS1hZHYtLXRvZ2dsZVwiICkuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdFx0aWYgZUFkdkRpdi5zdHlsZS5kaXNwbGF5XG5cdFx0XHRlQWR2RGl2LnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdFx0ZWxzZVxuXHRcdFx0ZUFkdkRpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblxuXHQjIyBFbGVtZW50cyAjI1xuXG5cdGVMZW5ndGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImJydXRlLS1sZW5ndGhcIlxuXHRlVXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImJydXRlLS11cHBlclwiXG5cdGVMb3dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYnJ1dGUtLWxvd2VyXCJcblx0ZURpZ2l0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYnJ1dGUtLWRpZ2l0c1wiXG5cdGVTeW1ib2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJicnV0ZS0tc3ltYm9sc1wiXG5cdGVBbWJpZ3VvdXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImJydXRlLS1hbWJpZ3VvdXNcIlxuXHRlTWluRGlnaXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJicnV0ZS0tbWluZGlnaXRzXCJcblxuXHR2YWxpZENoYXJhY3RlcnMgPSBbXVxuXHR2YWxpZERpZ2l0cyA9IFtdXG5cblx0IyMgRnVuY3Rpb25zICMjXG5cblx0YW1iaWd1b3VzQ2hhcmFjdGVycyA9IFtcblx0XHQnQicsICdHJywgJ0knLCAnTycsICdRJywgJ0QnLCAnUycsICdaJ1xuXHRcdCdsJ1xuXHRcdCc4JywgJzYnLCAnMScsICcwJywgJzUnLCAnMidcblx0XVxuXG5cdGdlbmVyYXRlVmFsaWRDaGFyYWN0ZXJzID0gLT5cblx0XHR2YWxpZENoYXJhY3RlcnMgPSBbXVxuXHRcdHZhbGlkRGlnaXRzID0gW11cblxuXHRcdGZvciBpIGluIFszMy4uMTI2XVxuXHRcdFx0YyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoIGkgKVxuXG5cdFx0XHRjb250aW51ZSBpZiBjIGluIGFtYmlndW91c0NoYXJhY3RlcnMgYW5kIGVBbWJpZ3VvdXMuY2hlY2tlZFxuXG5cdFx0XHRpZiA0OCA8PSBpIDw9IDU3XG5cdFx0XHRcdGNvbnRpbnVlIGlmIG5vdCBlRGlnaXRzLmNoZWNrZWRcblx0XHRcdFx0dmFsaWRDaGFyYWN0ZXJzLnB1c2ggY1xuXHRcdFx0XHR2YWxpZERpZ2l0cy5wdXNoIGNcblx0XHRcdGVsc2UgaWYgNjUgPD0gaSA8PSA5MFxuXHRcdFx0XHRjb250aW51ZSBpZiBub3QgZVVwcGVyLmNoZWNrZWRcblx0XHRcdFx0dmFsaWRDaGFyYWN0ZXJzLnB1c2ggY1xuXHRcdFx0ZWxzZSBpZiA5NyA8PSBpIDw9IDEyMlxuXHRcdFx0XHRjb250aW51ZSBpZiBub3QgZUxvd2VyLmNoZWNrZWRcblx0XHRcdFx0dmFsaWRDaGFyYWN0ZXJzLnB1c2ggY1xuXHRcdFx0ZWxzZSBpZiBlU3ltYm9scy5jaGVja2VkXG5cdFx0XHRcdHZhbGlkQ2hhcmFjdGVycy5wdXNoIGNcblxuXHRnZW5lcmF0ZVZhbGlkQ2hhcmFjdGVycygpXG5cblx0IyMgR2VuZXJhdGlvbiBBbGdvcml0aG0gIyNcblxuXHRzaHVmZmxlQXJyYXkgPSAoIGFycmF5ICkgLT5cblx0XHRjID0gYXJyYXkubGVuZ3RoXG5cdFx0d2hpbGUgYyA+IDBcblx0XHRcdGkgPSBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogYyApXG5cblx0XHRcdGMtLVxuXG5cdFx0XHRbIGFycmF5W2NdLCBhcnJheVtpXSBdID0gWyBhcnJheVtpXSwgYXJyYXlbY10gXVxuXG5cdFx0cmV0dXJuIGFycmF5XG5cblx0c2hvd0Vycm9yID0gKCBzdHIgKSAtPlxuXHRcdGVPdXRwdXRFcnJvci5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRcdGVPdXRwdXRFcnJvci5pbm5lckhUTUwgPSBzdHJcblx0XHR0aHJvdyBlT3V0cHV0RXJyb3JcblxuXHRnZW5lcmF0ZUJydXRlUGFzc3dvcmQgPSAtPlxuXHRcdHRyeVxuXHRcdFx0IyMgVmFsaWRhdGlvblxuXHRcdFx0bGVuZ3RoID0gcGFyc2VJbnQoIGVMZW5ndGgudmFsdWUgKVxuXHRcdFx0bWluRGlnaXRzID0gcGFyc2VJbnQoIGVNaW5EaWdpdHMudmFsdWUgKVxuXG5cdFx0XHRpZiBpc05hTiggbGVuZ3RoIClcblx0XHRcdFx0dGhyb3cgXCJQYXNzd29yZCBsZW5ndGggbXVzdCBiZSBhbiBpbnRlZ2VyXCJcblx0XHRcdGlmIGxlbmd0aCA8PSAwXG5cdFx0XHRcdHRocm93IFwiUGFzc3dvcmQgbGVuZ3RoIG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm9cIlxuXHRcdFx0aWYgaXNOYU4oIG1pbkRpZ2l0cyApXG5cdFx0XHRcdG1pbkRpZ2l0cyA9IDBcblx0XHRcdGlmIG1pbkRpZ2l0cyA8IDBcblx0XHRcdFx0dGhyb3cgXCJNaW5pbXVtIERpZ2l0cyBtdXN0IGJlIHplcm8gb3IgZ3JlYXRlclwiXG5cdFx0XHRpZiBtaW5EaWdpdHMgPiBsZW5ndGhcblx0XHRcdFx0bWluRGlnaXRzID0gbGVuZ3RoXG5cdFx0XHRpZiBtaW5EaWdpdHMgPiAwXG5cdFx0XHRcdGVEaWdpdHMuY2hlY2tlZCA9IHRydWVcblx0XHRcdFx0Z2VuZXJhdGVWYWxpZENoYXJhY3RlcnMoKVxuXG5cdFx0XHRpZiBub3QgZVVwcGVyLmNoZWNrZWQgYW5kXG5cdFx0XHRcdG5vdCBlTG93ZXIuY2hlY2tlZCBhbmRcblx0XHRcdFx0bm90IGVEaWdpdHMuY2hlY2tlZCBhbmRcblx0XHRcdFx0bm90IGVTeW1ib2xzLmNoZWNrZWRcblxuXHRcdFx0XHRcdGVMb3dlci5jaGVja2VkID0gdHJ1ZVxuXHRcdFx0XHRcdGdlbmVyYXRlVmFsaWRDaGFyYWN0ZXJzKClcblxuXHRcdFx0IyMgRXhlY3V0aW9uXG5cdFx0XHRvdXQgPSBbXVxuXG5cdFx0XHRpZiBtaW5EaWdpdHMgPiAwXG5cdFx0XHRcdGZvciBbMS4ubWluRGlnaXRzXVxuXHRcdFx0XHRcdG91dC5wdXNoIHJhbmRvbUFycmF5KCB2YWxpZERpZ2l0cyApXG5cdFx0XHRpZiBsZW5ndGggPiBtaW5EaWdpdHNcblx0XHRcdFx0Zm9yIFsxLi4oIGxlbmd0aCAtIG1pbkRpZ2l0cyApXVxuXHRcdFx0XHRcdG91dC5wdXNoIHJhbmRvbUFycmF5KCB2YWxpZENoYXJhY3RlcnMgKVxuXG5cdFx0XHRzaHVmZmxlQXJyYXkoIG91dCApXG5cblx0XHRcdGVPdXRwdXRUZXh0LnZhbHVlID0gb3V0LmpvaW4gXCJcIlxuXHRcdFx0YW5hbHl6ZVN0cmVuZ3RoKClcblx0XHRjYXRjaCBleFxuXHRcdFx0aWYgdHlwZW9mKCBleCApID09IFwic3RyaW5nXCJcblx0XHRcdFx0ZU91dHB1dEVycm9yLnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdFx0XHRcdGVPdXRwdXRFcnJvci5pbm5lckhUTUwgPSBleFxuXHRcdFx0dGhyb3cgZXhcblxuXHQjIyBFdmVudHMgIyNcblxuXHRidWlsZEFuZEdlbmVyYXRlID0gLT5cblx0XHRnZW5lcmF0ZVZhbGlkQ2hhcmFjdGVycygpXG5cdFx0Z2VuZXJhdGVCcnV0ZVBhc3N3b3JkKClcblx0ZVVwcGVyLmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgYnVpbGRBbmRHZW5lcmF0ZVxuXHRlTG93ZXIuYWRkRXZlbnRMaXN0ZW5lciBcImNoYW5nZVwiLCBidWlsZEFuZEdlbmVyYXRlXG5cdGVTeW1ib2xzLmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgYnVpbGRBbmRHZW5lcmF0ZVxuXHRlQW1iaWd1b3VzLmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgYnVpbGRBbmRHZW5lcmF0ZVxuXG5cdGVMZW5ndGguYWRkRXZlbnRMaXN0ZW5lciBcImNoYW5nZVwiLCBnZW5lcmF0ZUJydXRlUGFzc3dvcmRcblx0ZU1pbkRpZ2l0cy5hZGRFdmVudExpc3RlbmVyIFwiY2hhbmdlXCIsIGdlbmVyYXRlQnJ1dGVQYXNzd29yZFxuXG5cdGVEaWdpdHMuYWRkRXZlbnRMaXN0ZW5lciBcImNoYW5nZVwiLCAtPlxuXHRcdGlmIG5vdCBAY2hlY2tlZFxuXHRcdFx0ZU1pbkRpZ2l0cy52YWx1ZSA9IDBcblx0XHRidWlsZEFuZEdlbmVyYXRlKClcblxuZ2VuZXJhdGVCcnV0ZVBhc3N3b3JkKClcblxuIyMgRElDVElPTkFSWSAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZG8gLT5cblxuXHQjIyBFbGVtZW50cyAjI1xuXG5cdGVXb3JkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiZGljdC0td29yZHNcIlxuXHRlRG93bmxvYWRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImRpY3QtLWRvd25sb2FkaW5nXCJcblxuXHR3b3JkTGlzdCA9IG51bGxcblxuXHQjIyBHZW5lcmF0aW9uIEFsZ29yaXRobSAjI1xuXG5cdGxvYWRXb3JkTGlzdCA9IC0+XG5cdFx0aWYgd29yZExpc3QgPT0gMFxuXHRcdFx0cmV0dXJuXG5cdFx0d29yZExpc3QgPSAwXG5cblx0XHRyZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3Rcblx0XHRyZXEub3ZlcnJpZGVNaW1lVHlwZSBcImFwcGxpY2F0aW9uL2pzb25cIlxuXHRcdHJlcS5vcGVuIFwiR0VUXCIsIFwid29yZGxpc3QuanNvblwiXG5cdFx0cmVxLm9ubG9hZCA9IC0+XG5cdFx0XHRyZXR1cm4gaWYgcmVxLnJlYWR5U3RhdGUgIT0gNFxuXHRcdFx0aWYgcmVxLnN0YXR1cyA9PSAyMDBcblx0XHRcdFx0d29yZExpc3QgPSBKU09OLnBhcnNlKCByZXEucmVzcG9uc2VUZXh0IClcblx0XHRcdFx0ZURvd25sb2FkaW5nLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXHRcdFx0XHRnZW5lcmF0ZURpY3RQYXNzd29yZCgpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGVPdXRwdXRFcnJvci5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRcdFx0XHRlT3V0cHV0RXJyb3IuaW5uZXJIVE1MID0gXCJFcnJvciB3aGVuIGRvd25sb2FkaW5nIHdvcmQgbGlzdFwiXG5cdFx0XHRcdHdvcmRMaXN0ID0gbnVsbFxuXHRcdHJlcS5zZW5kIG51bGxcblxuXHRnZW5lcmF0ZURpY3RQYXNzd29yZCA9IC0+XG5cdFx0dHJ5XG5cdFx0XHQjIyBWYWxpZGF0aW9uXG5cdFx0XHR3b3JkcyA9IHBhcnNlSW50KCBlV29yZHMudmFsdWUgKVxuXG5cdFx0XHRpZiBpc05hTiggd29yZHMgKVxuXHRcdFx0XHR0aHJvdyBcIldvcmQgY291bnQgbXVzdCBiZSBhbiBpbnRlZ2VyXCJcblx0XHRcdGlmIHdvcmRzIDw9IDBcblx0XHRcdFx0dGhyb3cgXCJXb3JkIGNvdW50IG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm9cIlxuXHRcdFx0aWYgbm90IHdvcmRMaXN0XG5cdFx0XHRcdGxvYWRXb3JkTGlzdCgpXG5cdFx0XHRcdHJldHVyblxuXG5cdFx0XHQjIyBFeGVjdXRpb25cblx0XHRcdG91dCA9IFtdXG5cblx0XHRcdGZvciBbMS4ud29yZHNdXG5cdFx0XHRcdG91dC5wdXNoIHJhbmRvbUFycmF5KCB3b3JkTGlzdCApLnRvTG93ZXJDYXNlKClcblxuXHRcdFx0ZU91dHB1dFRleHQudmFsdWUgPSBvdXQuam9pbiBcIiBcIlxuXHRcdFx0YW5hbHl6ZVN0cmVuZ3RoKClcblx0XHRjYXRjaCBleFxuXHRcdFx0aWYgdHlwZW9mKCBleCApID09IFwic3RyaW5nXCJcblx0XHRcdFx0ZU91dHB1dEVycm9yLnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdFx0XHRcdGVPdXRwdXRFcnJvci5pbm5lckhUTUwgPSBleFxuXHRcdFx0Y29uc29sZS5lcnJvciBleFxuXG5cdCMjIEV2ZW50cyAjI1xuXG5cdGVXb3Jkcy5hZGRFdmVudExpc3RlbmVyIFwiY2hhbmdlXCIsIGdlbmVyYXRlRGljdFBhc3N3b3JkXG5cbmVFdmFsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lciBcImNoYW5nZVwiLCAtPlxuXHRlT3V0cHV0VGV4dC52YWx1ZSA9IGVFdmFsSW5wdXQudmFsdWVcblx0YW5hbHl6ZVN0cmVuZ3RoKClcbiJdfQ==
