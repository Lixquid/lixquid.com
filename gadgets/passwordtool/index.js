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
    var eCrack1, eCrack2, eCrack3, eCrack4, eCrack5, eError, eGuesses, eHelpDiv, eHelpToggle, eOutput, eStrength, eSuggestions, eWarning, energy_in_universe, niceTime, strengthClasses, strengthTexts, thermoLog;
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
    eHelpToggle = document.getElementById("an--help--toggle");
    eHelpDiv = document.getElementById("an--help--div");
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
    analyzeStrength = function() {
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
      window.zxcvbnOutput = data;
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
    return eHelpToggle.addEventListener("click", function() {
      if (eHelpDiv.style.display) {
        eHelpDiv.style.display = null;
        return eHelpToggle.classList.add("_toggled");
      } else {
        eHelpDiv.style.display = "none";
        return eHelpToggle.classList.remove("_toggled");
      }
    });
  })();

  (function() {
    var ambiguousCharacters, buildAndGenerate, eAdvDiv, eAdvToggle, eAmbiguous, eDigits, eLength, eLower, eMinDigits, eSymbols, eUpper, generateValidCharacters, showError, shuffleArray, validCharacters, validDigits;
    eAdvToggle = document.getElementById("brute--adv--toggle");
    eAdvDiv = document.getElementById("brute--adv--div");
    eAdvToggle.addEventListener("click", function() {
      if (eAdvDiv.style.display) {
        eAdvDiv.style.display = null;
        return eAdvToggle.classList.add("_toggled");
      } else {
        eAdvDiv.style.display = "none";
        return eAdvToggle.classList.remove("_toggled");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9wYXNzd29yZHRvb2wvaW5kZXguanMiLCJzb3VyY2VzIjpbImdhZGdldHMvcGFzc3dvcmR0b29sL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtBQUFBLE1BQUEsa05BQUE7SUFBQTs7RUFBQSxNQUFNLENBQUMsb0JBQVAsR0FBOEI7O0VBRTlCLFNBQUEsR0FBWSxRQUFRLENBQUMsY0FBVCxDQUF3QixZQUF4Qjs7RUFDWixRQUFBLEdBQVcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsV0FBeEI7O0VBQ1gsUUFBQSxHQUFXLFFBQVEsQ0FBQyxjQUFULENBQXdCLFdBQXhCOztFQUNYLFNBQUEsR0FBWSxRQUFRLENBQUMsY0FBVCxDQUF3QixZQUF4Qjs7RUFDWixRQUFBLEdBQVcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsV0FBeEI7O0VBQ1gsUUFBQSxHQUFXLFFBQVEsQ0FBQyxjQUFULENBQXdCLFdBQXhCOztFQUNYLFVBQUEsR0FBYSxRQUFRLENBQUMsY0FBVCxDQUF3QixhQUF4Qjs7RUFDYixZQUFBLEdBQWUsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsZUFBeEI7O0VBQ2YsV0FBQSxHQUFjLFFBQVEsQ0FBQyxjQUFULENBQXdCLGNBQXhCOztFQUNkLFVBQUEsR0FBYSxRQUFRLENBQUMsY0FBVCxDQUF3QixhQUF4Qjs7RUFFYixTQUFBLEdBQVk7O0VBRVoscUJBQUEsR0FBd0IsU0FBQSxHQUFBOztFQUN4QixvQkFBQSxHQUF1QixTQUFBLEdBQUE7O0VBQ3ZCLGVBQUEsR0FBa0IsU0FBQSxHQUFBOztFQUVsQixXQUFBLEdBQWMsU0FBQTtJQUNiLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBcEIsQ0FBMkIsUUFBM0I7SUFDQSxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQW5CLENBQTBCLFFBQTFCO0lBQ0EsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFuQixDQUEwQixRQUExQjtJQUNBLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBaEIsR0FBMEI7SUFD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QUFBLENBQVUsTUFBTSxDQUFDLEtBQWpCO1FBRVIsSUFBRyxLQUFBLENBQU8sS0FBUCxDQUFIO0FBQ0MsZ0JBQU0sZ0NBRFA7O1FBRUEsSUFBRyxLQUFBLElBQVMsQ0FBWjtBQUNDLGdCQUFNLHVDQURQOztRQUVBLElBQUcsQ0FBSSxRQUFQO1VBQ0MsWUFBQSxDQUFBO0FBQ0EsaUJBRkQ7O1FBS0EsR0FBQSxHQUFNO0FBRU4sYUFBSSx3RUFBSjtVQUNDLEdBQUcsQ0FBQyxJQUFKLENBQVMsV0FBQSxDQUFhLFFBQWIsQ0FBdUIsQ0FBQyxXQUF4QixDQUFBLENBQVQ7QUFERDtRQUdBLFdBQVcsQ0FBQyxLQUFaLEdBQW9CLEdBQUcsQ0FBQyxJQUFKLENBQVMsR0FBVDtlQUNwQixlQUFBLENBQUEsRUFuQkQ7T0FBQSxhQUFBO1FBb0JNO1FBQ0wsSUFBRyxPQUFRLEVBQVIsS0FBZ0IsUUFBbkI7VUFDQyxZQUFZLENBQUMsS0FBSyxDQUFDLE9BQW5CLEdBQTZCO1VBQzdCLFlBQVksQ0FBQyxTQUFiLEdBQXlCLEdBRjFCOztlQUdBLE9BQU8sQ0FBQyxLQUFSLENBQWMsRUFBZCxFQXhCRDs7SUFEc0I7V0E2QnZCLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxvQkFBbEM7RUE1REUsQ0FBQSxDQUFILENBQUE7O0VBOERBLFVBQVUsQ0FBQyxnQkFBWCxDQUE0QixRQUE1QixFQUFzQyxTQUFBO0lBQ3JDLFdBQVcsQ0FBQyxLQUFaLEdBQW9CLFVBQVUsQ0FBQztXQUMvQixlQUFBLENBQUE7RUFGcUMsQ0FBdEM7QUFuWkEiLCJzb3VyY2VzQ29udGVudCI6WyIjIyBDT01NT04gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG53aW5kb3cuRElTQUJMRV9aWENWQk5fTElNSVQgPSBmYWxzZVxuXG5lTmF2QnJ1dGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcIm5hdi0tYnJ1dGVcIlxuZU5hdkRpY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcIm5hdi0tZGljdFwiXG5lTmF2RXZhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwibmF2LS1ldmFsXCJcbmVCcnV0ZURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYnJ1dGUtLWRpdlwiXG5lRGljdERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiZGljdC0tZGl2XCJcbmVFdmFsRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJldmFsLS1kaXZcIlxuZU91dHB1dERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwib3V0cHV0LS1kaXZcIlxuZU91dHB1dEVycm9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJvdXRwdXQtLWVycm9yXCJcbmVPdXRwdXRUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJvdXRwdXQtLXRleHRcIlxuZUV2YWxJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiZXZhbC0taW5wdXRcIlxuXG5hY3RpdmVEaXYgPSBlQnJ1dGVEaXZcblxuZ2VuZXJhdGVCcnV0ZVBhc3N3b3JkID0gLT5cbmdlbmVyYXRlRGljdFBhc3N3b3JkID0gLT5cbmFuYWx5emVTdHJlbmd0aCA9IC0+XG5cbmhpZGVBbGxOYXZzID0gLT5cblx0ZU5hdkJydXRlLmNsYXNzTGlzdC5yZW1vdmUgXCJhY3RpdmVcIlxuXHRlTmF2RGljdC5jbGFzc0xpc3QucmVtb3ZlIFwiYWN0aXZlXCJcblx0ZU5hdkV2YWwuY2xhc3NMaXN0LnJlbW92ZSBcImFjdGl2ZVwiXG5cdGVCcnV0ZURpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblx0ZURpY3REaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cdGVFdmFsRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXHRlT3V0cHV0RGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXG5lTmF2QnJ1dGUuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdHJldHVybiBpZiBhY3RpdmVEaXYgPT0gZUJydXRlRGl2XG5cblx0aGlkZUFsbE5hdnMoKVxuXHRlTmF2QnJ1dGUuY2xhc3NMaXN0LmFkZCBcImFjdGl2ZVwiXG5cdGVCcnV0ZURpdi5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRlT3V0cHV0RGl2LnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdGFjdGl2ZURpdiA9IGVCcnV0ZURpdlxuXHRnZW5lcmF0ZUJydXRlUGFzc3dvcmQoKVxuXG5lTmF2RGljdC5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgLT5cblx0cmV0dXJuIGlmIGFjdGl2ZURpdiA9PSBlRGljdERpdlxuXG5cdGhpZGVBbGxOYXZzKClcblx0ZU5hdkRpY3QuY2xhc3NMaXN0LmFkZCBcImFjdGl2ZVwiXG5cdGVEaWN0RGl2LnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdGVPdXRwdXREaXYuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0YWN0aXZlRGl2ID0gZURpY3REaXZcblx0Z2VuZXJhdGVEaWN0UGFzc3dvcmQoKVxuXG5lTmF2RXZhbC5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgLT5cblx0cmV0dXJuIGlmIGFjdGl2ZURpdiA9PSBlRXZhbERpdlxuXG5cdGhpZGVBbGxOYXZzKClcblx0ZU5hdkV2YWwuY2xhc3NMaXN0LmFkZCBcImFjdGl2ZVwiXG5cdGVFdmFsRGl2LnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdGFjdGl2ZURpdiA9IGVFdmFsRGl2XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBcIm91dHB1dC0tcmVmcmVzaFwiICkuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdGlmIGFjdGl2ZURpdiA9PSBlQnJ1dGVEaXZcblx0XHRnZW5lcmF0ZUJydXRlUGFzc3dvcmQoKVxuXHRpZiBhY3RpdmVEaXYgPT0gZURpY3REaXZcblx0XHRnZW5lcmF0ZURpY3RQYXNzd29yZCgpXG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBcIm91dHB1dC0tY29weVwiICkuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdGVPdXRwdXRUZXh0LnNlbGVjdCgpXG5cdGRvY3VtZW50LmV4ZWNDb21tYW5kIFwiY29weVwiXG5cdGVPdXRwdXRUZXh0LmZvY3VzKClcblxucmFuZG9tQXJyYXkgPSAoIGFycmF5ICkgLT5cblx0YXJyYXlbIE1hdGguZmxvb3IoIE1hdGgucmFuZG9tKCkgKiBhcnJheS5sZW5ndGggKSBdXG5cbiMjIFNUUkVOR1RIIEFOQUxZU0lTICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmRvIC0+XG5cblx0ZUVycm9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhbi0tZXJyb3JcIlxuXHRlT3V0cHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhbi0tZGl2LS1vdXRwdXRcIlxuXHRlR3Vlc3NlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLWd1ZXNzZXNcIlxuXHRlU3RyZW5ndGg9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLXN0cmVuZ3RoXCJcblx0ZVdhcm5pbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImFuLS13YXJuaW5nXCJcblx0ZVN1Z2dlc3Rpb25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhbi0tc3VnZ2VzdGlvbnNcIlxuXHRlQ3JhY2sxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhbi0tY3JhY2stLTFcIlxuXHRlQ3JhY2syID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhbi0tY3JhY2stLTJcIlxuXHRlQ3JhY2szID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhbi0tY3JhY2stLTNcIlxuXHRlQ3JhY2s0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhbi0tY3JhY2stLTRcIlxuXHRlQ3JhY2s1ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhbi0tY3JhY2stLTVcIlxuXHRlSGVscFRvZ2dsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLWhlbHAtLXRvZ2dsZVwiXG5cdGVIZWxwRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhbi0taGVscC0tZGl2XCJcblxuXHRzdHJlbmd0aFRleHRzID0gW1xuXHRcdFwiVW5zdWl0YWJsZVwiXG5cdFx0XCJQb29yXCJcblx0XHRcIkFkZXF1YXRlXCJcblx0XHRcIkdvb2RcIlxuXHRcdFwiRXhjZWxsZW50XCJcblx0XVxuXHRzdHJlbmd0aENsYXNzZXMgPSBbXG5cdFx0XCJiZy1kYW5nZXJcIlxuXHRcdFwiYmctd2FybmluZ1wiXG5cdFx0XCJiZy13YXJuaW5nXCJcblx0XHRcImJnLXN1Y2Nlc3NcIlxuXHRcdFwiYmctc3VjY2Vzc1wiXG5cdF1cblxuXHRuaWNlVGltZSA9ICggdCApIC0+XG5cdFx0cCA9ICggbiwgcyApIC0+XG5cdFx0XHRpZiBNYXRoLmZsb29yKCBuICkgPT0gMVxuXHRcdFx0XHRyZXR1cm4gTWF0aC5mbG9vciggbiApICsgXCIgXCIgKyBzXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHJldHVybiBNYXRoLmZsb29yKCBuICkgKyBcIiBcIiArIHMgKyBcInNcIlxuXG5cdFx0aWYgdCA8IDFcblx0XHRcdHJldHVybiBcIkxlc3MgdGhhbiBhIHNlY29uZFwiXG5cdFx0aWYgdCA8IDYwXG5cdFx0XHRyZXR1cm4gcCB0LCBcInNlY29uZFwiXG5cdFx0aWYgdCA8IDM2MDBcblx0XHRcdHJldHVybiBwIHQvNjAsIFwibWludXRlXCJcblx0XHRpZiB0IDwgODY0MDBcblx0XHRcdHJldHVybiBwIHQvMzYwMCwgXCJob3VyXCJcblx0XHRpZiB0IDwgMzE1MzYwMDBcblx0XHRcdHJldHVybiBwIHQvODY0MDAsIFwiZGF5XCJcblx0XHRpZiB0IDwgMzE1MzYwMDAwMFxuXHRcdFx0cmV0dXJuIHAgdC8zMTUzNjAwMCwgXCJ5ZWFyXCJcblx0XHRyZXR1cm4gXCJDZW50dXJpZXNcIlxuXG5cdGVuZXJneV9pbl91bml2ZXJzZSA9IDkxLjk1NDI0MjUwOTQzOTMyNDg3NDU5MDA1NTgwNjUxMDIzMDYxODQwMDI1NzcyODM4MTM5MVxuXHR0aGVybW9Mb2cgPSAoIGlucHV0ICkgLT5cblx0XHRuID0gaW5wdXQgLSBlbmVyZ3lfaW5fdW5pdmVyc2VcblxuXHRcdGlmIG4gPiAwXG5cdFx0XHQjIGdvb2QgbG9yZFxuXHRcdFx0cmV0dXJuIFwiUmVxdWlyZXMgbW9yZSBlbmVyZ3kgdGhhbiBhdmFpbGFibGUgaW4gdGhlIHVuaXZlcnNlXCJcblx0XHRlbHNlIGlmIG4gPiAtN1xuXHRcdFx0cmV0dXJuICggMTAgKiogbiAqIDEwMCApICsgXCIlXCJcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gXCIxMF5cIiArIE1hdGguZmxvb3IoIG4gKyAyICkgKyBcIiAlXCJcblxuXHRhbmFseXplU3RyZW5ndGggPSAtPlxuXHRcdHJldHVybiBpZiBub3QgenhjdmJuXG5cblx0XHRwdyA9IGVPdXRwdXRUZXh0LnZhbHVlXG5cblx0XHRpZiBwdy5sZW5ndGggPiAxMDAgYW5kIG5vdCB3aW5kb3cuRElTQUJMRV9aWENWQk5fTElNSVRcblx0XHRcdGVFcnJvci5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRcdFx0ZU91dHB1dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblx0XHRcdHJldHVyblxuXG5cdFx0ZUVycm9yLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXHRcdGVPdXRwdXQuc3R5bGUuZGlzcGxheSA9IG51bGxcblxuXHRcdGRhdGEgPSB6eGN2Ym4oIHB3IClcblx0XHR3aW5kb3cuenhjdmJuT3V0cHV0ID0gZGF0YVxuXG5cdFx0ZUd1ZXNzZXMudmFsdWUgPSBNYXRoLmZsb29yKCBkYXRhLmd1ZXNzZXMgKVxuXHRcdGVTdHJlbmd0aC5zdHlsZS53aWR0aCA9XG5cdFx0XHRNYXRoLm1pbiggZGF0YS5ndWVzc2VzX2xvZzEwICogMTAsIDEwMCApICsgXCIlXCJcblx0XHRlU3RyZW5ndGguaW5uZXJUZXh0ID0gc3RyZW5ndGhUZXh0c1sgZGF0YS5zY29yZSBdXG5cdFx0ZVN0cmVuZ3RoLmNsYXNzTGlzdCA9IFwicHJvZ3Jlc3MtYmFyIFwiICsgc3RyZW5ndGhDbGFzc2VzWyBkYXRhLnNjb3JlIF1cblxuXHRcdGlmIGRhdGEuZmVlZGJhY2sud2FybmluZ1xuXHRcdFx0ZVdhcm5pbmcuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0XHRcdGVXYXJuaW5nLmlubmVySFRNTCA9IFwiPHN0cm9uZz5XYXJuaW5nPC9zdHJvbmc+PGJyIC8+XCIgK1xuXHRcdFx0XHRkYXRhLmZlZWRiYWNrLndhcm5pbmdcblx0XHRlbHNlXG5cdFx0XHRlV2FybmluZy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblxuXHRcdGVTdWdnZXN0aW9ucy5pbm5lckhUTUwgPSBcIlwiXG5cdFx0aWYgZGF0YS5mZWVkYmFjay5zdWdnZXN0aW9ucy5sZW5ndGggPiAwXG5cdFx0XHRmb3Igc3RyIGluIGRhdGEuZmVlZGJhY2suc3VnZ2VzdGlvbnNcblx0XHRcdFx0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJkaXZcIlxuXHRcdFx0XHRlLmNsYXNzTGlzdCA9IFwiYWxlcnQgYWxlcnQtaW5mb1wiXG5cdFx0XHRcdGUuaW5uZXJIVE1MID0gXCI8c3Ryb25nPlN1Z2dlc3Rpb248L3N0cm9uZz48YnIgLz5cIiArIHN0clxuXHRcdFx0XHRlU3VnZ2VzdGlvbnMuYXBwZW5kQ2hpbGQoIGUgKVxuXG5cdFx0ZUNyYWNrMS52YWx1ZSA9XG5cdFx0XHRkYXRhLmNyYWNrX3RpbWVzX2Rpc3BsYXkub25saW5lX3Rocm90dGxpbmdfMTAwX3Blcl9ob3VyXG5cdFx0ZUNyYWNrMi52YWx1ZSA9XG5cdFx0XHRkYXRhLmNyYWNrX3RpbWVzX2Rpc3BsYXkub25saW5lX25vX3Rocm90dGxpbmdfMTBfcGVyX3NlY29uZFxuXHRcdGVDcmFjazMudmFsdWUgPVxuXHRcdFx0ZGF0YS5jcmFja190aW1lc19kaXNwbGF5Lm9mZmxpbmVfc2xvd19oYXNoaW5nXzFlNF9wZXJfc2Vjb25kXG5cdFx0ZUNyYWNrNC52YWx1ZSA9XG5cdFx0XHRkYXRhLmNyYWNrX3RpbWVzX2Rpc3BsYXkub2ZmbGluZV9mYXN0X2hhc2hpbmdfMWUxMF9wZXJfc2Vjb25kXG5cdFx0ZUNyYWNrNS52YWx1ZSA9IHRoZXJtb0xvZyggZGF0YS5ndWVzc2VzX2xvZzEwIClcblxuXHRlSGVscFRvZ2dsZS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgLT5cblx0XHRpZiBlSGVscERpdi5zdHlsZS5kaXNwbGF5XG5cdFx0XHRlSGVscERpdi5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRcdFx0ZUhlbHBUb2dnbGUuY2xhc3NMaXN0LmFkZCBcIl90b2dnbGVkXCJcblx0XHRlbHNlXG5cdFx0XHRlSGVscERpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblx0XHRcdGVIZWxwVG9nZ2xlLmNsYXNzTGlzdC5yZW1vdmUgXCJfdG9nZ2xlZFwiXG5cbiMjIEJSVVRFICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmRvIC0+XG5cblx0IyMgQWR2YW5jZWQgT3B0aW9ucyBEaXNwbGF5ICMjXG5cblx0ZUFkdlRvZ2dsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYnJ1dGUtLWFkdi0tdG9nZ2xlXCJcblx0ZUFkdkRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYnJ1dGUtLWFkdi0tZGl2XCJcblxuXHRlQWR2VG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXHRcdGlmIGVBZHZEaXYuc3R5bGUuZGlzcGxheVxuXHRcdFx0ZUFkdkRpdi5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRcdFx0ZUFkdlRvZ2dsZS5jbGFzc0xpc3QuYWRkIFwiX3RvZ2dsZWRcIlxuXHRcdGVsc2Vcblx0XHRcdGVBZHZEaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cdFx0XHRlQWR2VG9nZ2xlLmNsYXNzTGlzdC5yZW1vdmUgXCJfdG9nZ2xlZFwiXG5cblx0IyMgRWxlbWVudHMgIyNcblxuXHRlTGVuZ3RoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJicnV0ZS0tbGVuZ3RoXCJcblx0ZVVwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJicnV0ZS0tdXBwZXJcIlxuXHRlTG93ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImJydXRlLS1sb3dlclwiXG5cdGVEaWdpdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImJydXRlLS1kaWdpdHNcIlxuXHRlU3ltYm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYnJ1dGUtLXN5bWJvbHNcIlxuXHRlQW1iaWd1b3VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJicnV0ZS0tYW1iaWd1b3VzXCJcblx0ZU1pbkRpZ2l0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYnJ1dGUtLW1pbmRpZ2l0c1wiXG5cblx0dmFsaWRDaGFyYWN0ZXJzID0gW11cblx0dmFsaWREaWdpdHMgPSBbXVxuXG5cdCMjIEZ1bmN0aW9ucyAjI1xuXG5cdGFtYmlndW91c0NoYXJhY3RlcnMgPSBbXG5cdFx0J0InLCAnRycsICdJJywgJ08nLCAnUScsICdEJywgJ1MnLCAnWidcblx0XHQnbCdcblx0XHQnOCcsICc2JywgJzEnLCAnMCcsICc1JywgJzInXG5cdF1cblxuXHRnZW5lcmF0ZVZhbGlkQ2hhcmFjdGVycyA9IC0+XG5cdFx0dmFsaWRDaGFyYWN0ZXJzID0gW11cblx0XHR2YWxpZERpZ2l0cyA9IFtdXG5cblx0XHRmb3IgaSBpbiBbMzMuLjEyNl1cblx0XHRcdGMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCBpIClcblxuXHRcdFx0Y29udGludWUgaWYgYyBpbiBhbWJpZ3VvdXNDaGFyYWN0ZXJzIGFuZCBlQW1iaWd1b3VzLmNoZWNrZWRcblxuXHRcdFx0aWYgNDggPD0gaSA8PSA1N1xuXHRcdFx0XHRjb250aW51ZSBpZiBub3QgZURpZ2l0cy5jaGVja2VkXG5cdFx0XHRcdHZhbGlkQ2hhcmFjdGVycy5wdXNoIGNcblx0XHRcdFx0dmFsaWREaWdpdHMucHVzaCBjXG5cdFx0XHRlbHNlIGlmIDY1IDw9IGkgPD0gOTBcblx0XHRcdFx0Y29udGludWUgaWYgbm90IGVVcHBlci5jaGVja2VkXG5cdFx0XHRcdHZhbGlkQ2hhcmFjdGVycy5wdXNoIGNcblx0XHRcdGVsc2UgaWYgOTcgPD0gaSA8PSAxMjJcblx0XHRcdFx0Y29udGludWUgaWYgbm90IGVMb3dlci5jaGVja2VkXG5cdFx0XHRcdHZhbGlkQ2hhcmFjdGVycy5wdXNoIGNcblx0XHRcdGVsc2UgaWYgZVN5bWJvbHMuY2hlY2tlZFxuXHRcdFx0XHR2YWxpZENoYXJhY3RlcnMucHVzaCBjXG5cblx0Z2VuZXJhdGVWYWxpZENoYXJhY3RlcnMoKVxuXG5cdCMjIEdlbmVyYXRpb24gQWxnb3JpdGhtICMjXG5cblx0c2h1ZmZsZUFycmF5ID0gKCBhcnJheSApIC0+XG5cdFx0YyA9IGFycmF5Lmxlbmd0aFxuXHRcdHdoaWxlIGMgPiAwXG5cdFx0XHRpID0gTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIGMgKVxuXG5cdFx0XHRjLS1cblxuXHRcdFx0WyBhcnJheVtjXSwgYXJyYXlbaV0gXSA9IFsgYXJyYXlbaV0sIGFycmF5W2NdIF1cblxuXHRcdHJldHVybiBhcnJheVxuXG5cdHNob3dFcnJvciA9ICggc3RyICkgLT5cblx0XHRlT3V0cHV0RXJyb3Iuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0XHRlT3V0cHV0RXJyb3IuaW5uZXJIVE1MID0gc3RyXG5cdFx0dGhyb3cgZU91dHB1dEVycm9yXG5cblx0Z2VuZXJhdGVCcnV0ZVBhc3N3b3JkID0gLT5cblx0XHR0cnlcblx0XHRcdCMjIFZhbGlkYXRpb25cblx0XHRcdGxlbmd0aCA9IHBhcnNlSW50KCBlTGVuZ3RoLnZhbHVlIClcblx0XHRcdG1pbkRpZ2l0cyA9IHBhcnNlSW50KCBlTWluRGlnaXRzLnZhbHVlIClcblxuXHRcdFx0aWYgaXNOYU4oIGxlbmd0aCApXG5cdFx0XHRcdHRocm93IFwiUGFzc3dvcmQgbGVuZ3RoIG11c3QgYmUgYW4gaW50ZWdlclwiXG5cdFx0XHRpZiBsZW5ndGggPD0gMFxuXHRcdFx0XHR0aHJvdyBcIlBhc3N3b3JkIGxlbmd0aCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvXCJcblx0XHRcdGlmIGlzTmFOKCBtaW5EaWdpdHMgKVxuXHRcdFx0XHRtaW5EaWdpdHMgPSAwXG5cdFx0XHRpZiBtaW5EaWdpdHMgPCAwXG5cdFx0XHRcdHRocm93IFwiTWluaW11bSBEaWdpdHMgbXVzdCBiZSB6ZXJvIG9yIGdyZWF0ZXJcIlxuXHRcdFx0aWYgbWluRGlnaXRzID4gbGVuZ3RoXG5cdFx0XHRcdG1pbkRpZ2l0cyA9IGxlbmd0aFxuXHRcdFx0aWYgbWluRGlnaXRzID4gMFxuXHRcdFx0XHRlRGlnaXRzLmNoZWNrZWQgPSB0cnVlXG5cdFx0XHRcdGdlbmVyYXRlVmFsaWRDaGFyYWN0ZXJzKClcblxuXHRcdFx0aWYgbm90IGVVcHBlci5jaGVja2VkIGFuZFxuXHRcdFx0XHRub3QgZUxvd2VyLmNoZWNrZWQgYW5kXG5cdFx0XHRcdG5vdCBlRGlnaXRzLmNoZWNrZWQgYW5kXG5cdFx0XHRcdG5vdCBlU3ltYm9scy5jaGVja2VkXG5cblx0XHRcdFx0XHRlTG93ZXIuY2hlY2tlZCA9IHRydWVcblx0XHRcdFx0XHRnZW5lcmF0ZVZhbGlkQ2hhcmFjdGVycygpXG5cblx0XHRcdCMjIEV4ZWN1dGlvblxuXHRcdFx0b3V0ID0gW11cblxuXHRcdFx0aWYgbWluRGlnaXRzID4gMFxuXHRcdFx0XHRmb3IgWzEuLm1pbkRpZ2l0c11cblx0XHRcdFx0XHRvdXQucHVzaCByYW5kb21BcnJheSggdmFsaWREaWdpdHMgKVxuXHRcdFx0aWYgbGVuZ3RoID4gbWluRGlnaXRzXG5cdFx0XHRcdGZvciBbMS4uKCBsZW5ndGggLSBtaW5EaWdpdHMgKV1cblx0XHRcdFx0XHRvdXQucHVzaCByYW5kb21BcnJheSggdmFsaWRDaGFyYWN0ZXJzIClcblxuXHRcdFx0c2h1ZmZsZUFycmF5KCBvdXQgKVxuXG5cdFx0XHRlT3V0cHV0VGV4dC52YWx1ZSA9IG91dC5qb2luIFwiXCJcblx0XHRcdGFuYWx5emVTdHJlbmd0aCgpXG5cdFx0Y2F0Y2ggZXhcblx0XHRcdGlmIHR5cGVvZiggZXggKSA9PSBcInN0cmluZ1wiXG5cdFx0XHRcdGVPdXRwdXRFcnJvci5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRcdFx0XHRlT3V0cHV0RXJyb3IuaW5uZXJIVE1MID0gZXhcblx0XHRcdHRocm93IGV4XG5cblx0IyMgRXZlbnRzICMjXG5cblx0YnVpbGRBbmRHZW5lcmF0ZSA9IC0+XG5cdFx0Z2VuZXJhdGVWYWxpZENoYXJhY3RlcnMoKVxuXHRcdGdlbmVyYXRlQnJ1dGVQYXNzd29yZCgpXG5cdGVVcHBlci5hZGRFdmVudExpc3RlbmVyIFwiY2hhbmdlXCIsIGJ1aWxkQW5kR2VuZXJhdGVcblx0ZUxvd2VyLmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgYnVpbGRBbmRHZW5lcmF0ZVxuXHRlU3ltYm9scy5hZGRFdmVudExpc3RlbmVyIFwiY2hhbmdlXCIsIGJ1aWxkQW5kR2VuZXJhdGVcblx0ZUFtYmlndW91cy5hZGRFdmVudExpc3RlbmVyIFwiY2hhbmdlXCIsIGJ1aWxkQW5kR2VuZXJhdGVcblxuXHRlTGVuZ3RoLmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgZ2VuZXJhdGVCcnV0ZVBhc3N3b3JkXG5cdGVNaW5EaWdpdHMuYWRkRXZlbnRMaXN0ZW5lciBcImNoYW5nZVwiLCBnZW5lcmF0ZUJydXRlUGFzc3dvcmRcblxuXHRlRGlnaXRzLmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgLT5cblx0XHRpZiBub3QgQGNoZWNrZWRcblx0XHRcdGVNaW5EaWdpdHMudmFsdWUgPSAwXG5cdFx0YnVpbGRBbmRHZW5lcmF0ZSgpXG5cbmdlbmVyYXRlQnJ1dGVQYXNzd29yZCgpXG5cbiMjIERJQ1RJT05BUlkgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmRvIC0+XG5cblx0IyMgRWxlbWVudHMgIyNcblxuXHRlV29yZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImRpY3QtLXdvcmRzXCJcblx0ZURvd25sb2FkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJkaWN0LS1kb3dubG9hZGluZ1wiXG5cblx0d29yZExpc3QgPSBudWxsXG5cblx0IyMgR2VuZXJhdGlvbiBBbGdvcml0aG0gIyNcblxuXHRsb2FkV29yZExpc3QgPSAtPlxuXHRcdGlmIHdvcmRMaXN0ID09IDBcblx0XHRcdHJldHVyblxuXHRcdHdvcmRMaXN0ID0gMFxuXG5cdFx0cmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0XG5cdFx0cmVxLm92ZXJyaWRlTWltZVR5cGUgXCJhcHBsaWNhdGlvbi9qc29uXCJcblx0XHRyZXEub3BlbiBcIkdFVFwiLCBcIndvcmRsaXN0Lmpzb25cIlxuXHRcdHJlcS5vbmxvYWQgPSAtPlxuXHRcdFx0cmV0dXJuIGlmIHJlcS5yZWFkeVN0YXRlICE9IDRcblx0XHRcdGlmIHJlcS5zdGF0dXMgPT0gMjAwXG5cdFx0XHRcdHdvcmRMaXN0ID0gSlNPTi5wYXJzZSggcmVxLnJlc3BvbnNlVGV4dCApXG5cdFx0XHRcdGVEb3dubG9hZGluZy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblx0XHRcdFx0Z2VuZXJhdGVEaWN0UGFzc3dvcmQoKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRlT3V0cHV0RXJyb3Iuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0XHRcdFx0ZU91dHB1dEVycm9yLmlubmVySFRNTCA9IFwiRXJyb3Igd2hlbiBkb3dubG9hZGluZyB3b3JkIGxpc3RcIlxuXHRcdFx0XHR3b3JkTGlzdCA9IG51bGxcblx0XHRyZXEuc2VuZCBudWxsXG5cblx0Z2VuZXJhdGVEaWN0UGFzc3dvcmQgPSAtPlxuXHRcdHRyeVxuXHRcdFx0IyMgVmFsaWRhdGlvblxuXHRcdFx0d29yZHMgPSBwYXJzZUludCggZVdvcmRzLnZhbHVlIClcblxuXHRcdFx0aWYgaXNOYU4oIHdvcmRzIClcblx0XHRcdFx0dGhyb3cgXCJXb3JkIGNvdW50IG11c3QgYmUgYW4gaW50ZWdlclwiXG5cdFx0XHRpZiB3b3JkcyA8PSAwXG5cdFx0XHRcdHRocm93IFwiV29yZCBjb3VudCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvXCJcblx0XHRcdGlmIG5vdCB3b3JkTGlzdFxuXHRcdFx0XHRsb2FkV29yZExpc3QoKVxuXHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0IyMgRXhlY3V0aW9uXG5cdFx0XHRvdXQgPSBbXVxuXG5cdFx0XHRmb3IgWzEuLndvcmRzXVxuXHRcdFx0XHRvdXQucHVzaCByYW5kb21BcnJheSggd29yZExpc3QgKS50b0xvd2VyQ2FzZSgpXG5cblx0XHRcdGVPdXRwdXRUZXh0LnZhbHVlID0gb3V0LmpvaW4gXCIgXCJcblx0XHRcdGFuYWx5emVTdHJlbmd0aCgpXG5cdFx0Y2F0Y2ggZXhcblx0XHRcdGlmIHR5cGVvZiggZXggKSA9PSBcInN0cmluZ1wiXG5cdFx0XHRcdGVPdXRwdXRFcnJvci5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRcdFx0XHRlT3V0cHV0RXJyb3IuaW5uZXJIVE1MID0gZXhcblx0XHRcdGNvbnNvbGUuZXJyb3IgZXhcblxuXHQjIyBFdmVudHMgIyNcblxuXHRlV29yZHMuYWRkRXZlbnRMaXN0ZW5lciBcImNoYW5nZVwiLCBnZW5lcmF0ZURpY3RQYXNzd29yZFxuXG5lRXZhbElucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgLT5cblx0ZU91dHB1dFRleHQudmFsdWUgPSBlRXZhbElucHV0LnZhbHVlXG5cdGFuYWx5emVTdHJlbmd0aCgpXG4iXX0=
