
/*
Easter Eggs:

zxcvbn's output will be put in the "zxcvbnOutput" global variable.

The 100 character limit to strength analysis can be bypassed by setting the
global variable "DISABLED_ZXCVBN_LIMIT" to true.
 */

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
    var analyzeToken, eCrack1, eCrack2, eCrack3, eCrack4, eCrack5, eError, eGuesses, eHelpDiv, eHelpToggle, eOutput, eSeqList, eSeqOutput, eStrength, eSuggestions, eWarning, energy_in_universe, niceTime, strengthClasses, strengthTexts, thermoLog;
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
    eSeqList = document.getElementById("an--seq--list");
    eSeqOutput = document.getElementById("an--seq--output");
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
    analyzeToken = function(token) {
      var k, v;
      return eSeqOutput.innerText = ((function() {
        var results;
        results = [];
        for (k in token) {
          v = token[k];
          if (typeof v !== "object") {
            results.push(k + ": " + v);
          }
        }
        return results;
      })()).join("\n");
    };
    analyzeStrength = function() {
      var data, e, j, l, len, len1, pw, ref, ref1, results, seg, str;
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
      eCrack5.value = thermoLog(data.guesses_log10);
      eSeqList.innerHTML = "";
      eSeqOutput.innerHTML = "";
      ref1 = data.sequence;
      results = [];
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        seg = ref1[l];
        results.push((function(seg) {
          var ec;
          e = document.createElement("a");
          e.href = "#";
          e.innerText = seg.token;
          e.addEventListener("click", function(e) {
            analyzeToken(seg);
            return e.preventDefault();
          });
          ec = document.createElement("code");
          ec.appendChild(e);
          return eSeqList.appendChild(ec);
        })(seg));
      }
      return results;
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
      var ex, j, l, length, minDigits, out, ref, ref1;
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
          for (l = 1, ref1 = length - minDigits; 1 <= ref1 ? l <= ref1 : l >= ref1; 1 <= ref1 ? l++ : l--) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9wYXNzd29yZHRvb2wvaW5kZXguanMiLCJzb3VyY2VzIjpbImdhZGdldHMvcGFzc3dvcmR0b29sL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7OztBQUFBO0FBQUEsTUFBQSxrTkFBQTtJQUFBOztFQVdBLE1BQU0sQ0FBQyxvQkFBUCxHQUE4Qjs7RUFFOUIsU0FBQSxHQUFZLFFBQVEsQ0FBQyxjQUFULENBQXdCLFlBQXhCOztFQUNaLFFBQUEsR0FBVyxRQUFRLENBQUMsY0FBVCxDQUF3QixXQUF4Qjs7RUFDWCxRQUFBLEdBQVcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsV0FBeEI7O0VBQ1gsU0FBQSxHQUFZLFFBQVEsQ0FBQyxjQUFULENBQXdCLFlBQXhCOztFQUNaLFFBQUEsR0FBVyxRQUFRLENBQUMsY0FBVCxDQUF3QixXQUF4Qjs7RUFDWCxRQUFBLEdBQVcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsV0FBeEI7O0VBQ1gsVUFBQSxHQUFhLFFBQVEsQ0FBQyxjQUFULENBQXdCLGFBQXhCOztFQUNiLFlBQUEsR0FBZSxRQUFRLENBQUMsY0FBVCxDQUF3QixlQUF4Qjs7RUFDZixXQUFBLEdBQWMsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsY0FBeEI7O0VBQ2QsVUFBQSxHQUFhLFFBQVEsQ0FBQyxjQUFULENBQXdCLGFBQXhCOztFQUViLFNBQUEsR0FBWTs7RUFFWixxQkFBQSxHQUF3QixTQUFBLEdBQUE7O0VBQ3hCLG9CQUFBLEdBQXVCLFNBQUEsR0FBQTs7RUFDdkIsZUFBQSxHQUFrQixTQUFBLEdBQUE7O0VBRWxCLFdBQUEsR0FBYyxTQUFBO0lBQ2IsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFwQixDQUEyQixRQUEzQjtJQUNBLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBbkIsQ0FBMEIsUUFBMUI7SUFDQSxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQW5CLENBQTBCLFFBQTFCO0lBQ0EsU0FBUyxDQUFDLEtBQUssQ0FBQyxP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QSxHQUFNO0FBRU4sYUFBSSx3RUFBSjtVQUNDLEdBQUcsQ0FBQyxJQUFKLENBQVMsV0FBQSxDQUFhLFFBQWIsQ0FBdUIsQ0FBQyxXQUF4QixDQUFBLENBQVQ7QUFERDtRQUdBLFdBQVcsQ0FBQyxLQUFaLEdBQW9CLEdBQUcsQ0FBQyxJQUFKLENBQVMsR0FBVDtlQUNwQixlQUFBLENBQUEsRUFuQkQ7T0FBQSxhQUFBO1FBb0JNO1FBQ0wsSUFBRyxPQUFRLEVBQVIsS0FBZ0IsUUFBbkI7VUFDQyxZQUFZLENBQUMsS0FBSyxDQUFDLE9BQW5CLEdBQTZCO1VBQzdCLFlBQVksQ0FBQyxTQUFiLEdBQXlCLEdBRjFCOztlQUdBLE9BQU8sQ0FBQyxLQUFSLENBQWMsRUFBZCxFQXhCRDs7SUFEc0I7V0E2QnZCLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxvQkFBbEM7RUE1REUsQ0FBQSxDQUFILENBQUE7O0VBOERBLFVBQVUsQ0FBQyxnQkFBWCxDQUE0QixRQUE1QixFQUFzQyxTQUFBO0lBQ3JDLFdBQVcsQ0FBQyxLQUFaLEdBQW9CLFVBQVUsQ0FBQztXQUMvQixlQUFBLENBQUE7RUFGcUMsQ0FBdEM7QUF0YkEiLCJzb3VyY2VzQ29udGVudCI6WyIjIyNcbkVhc3RlciBFZ2dzOlxuXG56eGN2Ym4ncyBvdXRwdXQgd2lsbCBiZSBwdXQgaW4gdGhlIFwienhjdmJuT3V0cHV0XCIgZ2xvYmFsIHZhcmlhYmxlLlxuXG5UaGUgMTAwIGNoYXJhY3RlciBsaW1pdCB0byBzdHJlbmd0aCBhbmFseXNpcyBjYW4gYmUgYnlwYXNzZWQgYnkgc2V0dGluZyB0aGVcbmdsb2JhbCB2YXJpYWJsZSBcIkRJU0FCTEVEX1pYQ1ZCTl9MSU1JVFwiIHRvIHRydWUuXG4jIyNcblxuIyMgQ09NTU9OICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxud2luZG93LkRJU0FCTEVfWlhDVkJOX0xJTUlUID0gZmFsc2VcblxuZU5hdkJydXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJuYXYtLWJydXRlXCJcbmVOYXZEaWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJuYXYtLWRpY3RcIlxuZU5hdkV2YWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcIm5hdi0tZXZhbFwiXG5lQnJ1dGVEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImJydXRlLS1kaXZcIlxuZURpY3REaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImRpY3QtLWRpdlwiXG5lRXZhbERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiZXZhbC0tZGl2XCJcbmVPdXRwdXREaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcIm91dHB1dC0tZGl2XCJcbmVPdXRwdXRFcnJvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwib3V0cHV0LS1lcnJvclwiXG5lT3V0cHV0VGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwib3V0cHV0LS10ZXh0XCJcbmVFdmFsSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImV2YWwtLWlucHV0XCJcblxuYWN0aXZlRGl2ID0gZUJydXRlRGl2XG5cbmdlbmVyYXRlQnJ1dGVQYXNzd29yZCA9IC0+XG5nZW5lcmF0ZURpY3RQYXNzd29yZCA9IC0+XG5hbmFseXplU3RyZW5ndGggPSAtPlxuXG5oaWRlQWxsTmF2cyA9IC0+XG5cdGVOYXZCcnV0ZS5jbGFzc0xpc3QucmVtb3ZlIFwiYWN0aXZlXCJcblx0ZU5hdkRpY3QuY2xhc3NMaXN0LnJlbW92ZSBcImFjdGl2ZVwiXG5cdGVOYXZFdmFsLmNsYXNzTGlzdC5yZW1vdmUgXCJhY3RpdmVcIlxuXHRlQnJ1dGVEaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cdGVEaWN0RGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXHRlRXZhbERpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblx0ZU91dHB1dERpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblxuZU5hdkJydXRlLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXHRyZXR1cm4gaWYgYWN0aXZlRGl2ID09IGVCcnV0ZURpdlxuXG5cdGhpZGVBbGxOYXZzKClcblx0ZU5hdkJydXRlLmNsYXNzTGlzdC5hZGQgXCJhY3RpdmVcIlxuXHRlQnJ1dGVEaXYuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0ZU91dHB1dERpdi5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRhY3RpdmVEaXYgPSBlQnJ1dGVEaXZcblx0Z2VuZXJhdGVCcnV0ZVBhc3N3b3JkKClcblxuZU5hdkRpY3QuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdHJldHVybiBpZiBhY3RpdmVEaXYgPT0gZURpY3REaXZcblxuXHRoaWRlQWxsTmF2cygpXG5cdGVOYXZEaWN0LmNsYXNzTGlzdC5hZGQgXCJhY3RpdmVcIlxuXHRlRGljdERpdi5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRlT3V0cHV0RGl2LnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdGFjdGl2ZURpdiA9IGVEaWN0RGl2XG5cdGdlbmVyYXRlRGljdFBhc3N3b3JkKClcblxuZU5hdkV2YWwuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdHJldHVybiBpZiBhY3RpdmVEaXYgPT0gZUV2YWxEaXZcblxuXHRoaWRlQWxsTmF2cygpXG5cdGVOYXZFdmFsLmNsYXNzTGlzdC5hZGQgXCJhY3RpdmVcIlxuXHRlRXZhbERpdi5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRhY3RpdmVEaXYgPSBlRXZhbERpdlxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJvdXRwdXQtLXJlZnJlc2hcIiApLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXHRpZiBhY3RpdmVEaXYgPT0gZUJydXRlRGl2XG5cdFx0Z2VuZXJhdGVCcnV0ZVBhc3N3b3JkKClcblx0aWYgYWN0aXZlRGl2ID09IGVEaWN0RGl2XG5cdFx0Z2VuZXJhdGVEaWN0UGFzc3dvcmQoKVxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJvdXRwdXQtLWNvcHlcIiApLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXHRlT3V0cHV0VGV4dC5zZWxlY3QoKVxuXHRkb2N1bWVudC5leGVjQ29tbWFuZCBcImNvcHlcIlxuXHRlT3V0cHV0VGV4dC5mb2N1cygpXG5cbnJhbmRvbUFycmF5ID0gKCBhcnJheSApIC0+XG5cdGFycmF5WyBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogYXJyYXkubGVuZ3RoICkgXVxuXG4jIyBTVFJFTkdUSCBBTkFMWVNJUyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5kbyAtPlxuXG5cdGVFcnJvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLWVycm9yXCJcblx0ZU91dHB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLWRpdi0tb3V0cHV0XCJcblx0ZUd1ZXNzZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImFuLS1ndWVzc2VzXCJcblx0ZVN0cmVuZ3RoPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImFuLS1zdHJlbmd0aFwiXG5cdGVXYXJuaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhbi0td2FybmluZ1wiXG5cdGVTdWdnZXN0aW9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLXN1Z2dlc3Rpb25zXCJcblx0ZUNyYWNrMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLWNyYWNrLS0xXCJcblx0ZUNyYWNrMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLWNyYWNrLS0yXCJcblx0ZUNyYWNrMyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLWNyYWNrLS0zXCJcblx0ZUNyYWNrNCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLWNyYWNrLS00XCJcblx0ZUNyYWNrNSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLWNyYWNrLS01XCJcblx0ZUhlbHBUb2dnbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImFuLS1oZWxwLS10b2dnbGVcIlxuXHRlSGVscERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLWhlbHAtLWRpdlwiXG5cdGVTZXFMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhbi0tc2VxLS1saXN0XCJcblx0ZVNlcU91dHB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLXNlcS0tb3V0cHV0XCJcblxuXHRzdHJlbmd0aFRleHRzID0gW1xuXHRcdFwiVW5zdWl0YWJsZVwiXG5cdFx0XCJQb29yXCJcblx0XHRcIkFkZXF1YXRlXCJcblx0XHRcIkdvb2RcIlxuXHRcdFwiRXhjZWxsZW50XCJcblx0XVxuXHRzdHJlbmd0aENsYXNzZXMgPSBbXG5cdFx0XCJiZy1kYW5nZXJcIlxuXHRcdFwiYmctd2FybmluZ1wiXG5cdFx0XCJiZy13YXJuaW5nXCJcblx0XHRcImJnLXN1Y2Nlc3NcIlxuXHRcdFwiYmctc3VjY2Vzc1wiXG5cdF1cblxuXHRuaWNlVGltZSA9ICggdCApIC0+XG5cdFx0cCA9ICggbiwgcyApIC0+XG5cdFx0XHRpZiBNYXRoLmZsb29yKCBuICkgPT0gMVxuXHRcdFx0XHRyZXR1cm4gTWF0aC5mbG9vciggbiApICsgXCIgXCIgKyBzXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHJldHVybiBNYXRoLmZsb29yKCBuICkgKyBcIiBcIiArIHMgKyBcInNcIlxuXG5cdFx0aWYgdCA8IDFcblx0XHRcdHJldHVybiBcIkxlc3MgdGhhbiBhIHNlY29uZFwiXG5cdFx0aWYgdCA8IDYwXG5cdFx0XHRyZXR1cm4gcCB0LCBcInNlY29uZFwiXG5cdFx0aWYgdCA8IDM2MDBcblx0XHRcdHJldHVybiBwIHQvNjAsIFwibWludXRlXCJcblx0XHRpZiB0IDwgODY0MDBcblx0XHRcdHJldHVybiBwIHQvMzYwMCwgXCJob3VyXCJcblx0XHRpZiB0IDwgMzE1MzYwMDBcblx0XHRcdHJldHVybiBwIHQvODY0MDAsIFwiZGF5XCJcblx0XHRpZiB0IDwgMzE1MzYwMDAwMFxuXHRcdFx0cmV0dXJuIHAgdC8zMTUzNjAwMCwgXCJ5ZWFyXCJcblx0XHRyZXR1cm4gXCJDZW50dXJpZXNcIlxuXG5cdGVuZXJneV9pbl91bml2ZXJzZSA9IDkxLjk1NDI0MjUwOTQzOTMyNDg3NDU5MDA1NTgwNjUxMDIzMDYxODQwMDI1NzcyODM4MTM5MVxuXHR0aGVybW9Mb2cgPSAoIGlucHV0ICkgLT5cblx0XHRuID0gaW5wdXQgLSBlbmVyZ3lfaW5fdW5pdmVyc2VcblxuXHRcdGlmIG4gPiAwXG5cdFx0XHQjIGdvb2QgbG9yZFxuXHRcdFx0cmV0dXJuIFwiUmVxdWlyZXMgbW9yZSBlbmVyZ3kgdGhhbiBhdmFpbGFibGUgaW4gdGhlIHVuaXZlcnNlXCJcblx0XHRlbHNlIGlmIG4gPiAtN1xuXHRcdFx0cmV0dXJuICggMTAgKiogbiAqIDEwMCApICsgXCIlXCJcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gXCIxMF5cIiArIE1hdGguZmxvb3IoIG4gKyAyICkgKyBcIiAlXCJcblxuXHRhbmFseXplVG9rZW4gPSAoIHRva2VuICkgLT5cblx0XHRlU2VxT3V0cHV0LmlubmVyVGV4dCA9IChcblx0XHRcdGsgKyBcIjogXCIgKyB2IGZvciBrLCB2IG9mIHRva2VuIHdoZW4gdHlwZW9mKCB2ICkgIT0gXCJvYmplY3RcIlxuXHRcdCkuam9pbiggXCJcXG5cIiApXG5cblx0YW5hbHl6ZVN0cmVuZ3RoID0gLT5cblx0XHRyZXR1cm4gaWYgbm90IHp4Y3ZiblxuXG5cdFx0cHcgPSBlT3V0cHV0VGV4dC52YWx1ZVxuXG5cdFx0aWYgcHcubGVuZ3RoID4gMTAwIGFuZCBub3Qgd2luZG93LkRJU0FCTEVfWlhDVkJOX0xJTUlUXG5cdFx0XHRlRXJyb3Iuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0XHRcdGVPdXRwdXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cdFx0XHRyZXR1cm5cblxuXHRcdGVFcnJvci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblx0XHRlT3V0cHV0LnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cblx0XHRkYXRhID0genhjdmJuKCBwdyApXG5cdFx0d2luZG93Lnp4Y3Zibk91dHB1dCA9IGRhdGFcblxuXHRcdGVHdWVzc2VzLnZhbHVlID0gTWF0aC5mbG9vciggZGF0YS5ndWVzc2VzIClcblx0XHRlU3RyZW5ndGguc3R5bGUud2lkdGggPVxuXHRcdFx0TWF0aC5taW4oIGRhdGEuZ3Vlc3Nlc19sb2cxMCAqIDEwLCAxMDAgKSArIFwiJVwiXG5cdFx0ZVN0cmVuZ3RoLmlubmVyVGV4dCA9IHN0cmVuZ3RoVGV4dHNbIGRhdGEuc2NvcmUgXVxuXHRcdGVTdHJlbmd0aC5jbGFzc0xpc3QgPSBcInByb2dyZXNzLWJhciBcIiArIHN0cmVuZ3RoQ2xhc3Nlc1sgZGF0YS5zY29yZSBdXG5cblx0XHRpZiBkYXRhLmZlZWRiYWNrLndhcm5pbmdcblx0XHRcdGVXYXJuaW5nLnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdFx0XHRlV2FybmluZy5pbm5lckhUTUwgPSBcIjxzdHJvbmc+V2FybmluZzwvc3Ryb25nPjxiciAvPlwiICtcblx0XHRcdFx0ZGF0YS5mZWVkYmFjay53YXJuaW5nXG5cdFx0ZWxzZVxuXHRcdFx0ZVdhcm5pbmcuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cblx0XHRlU3VnZ2VzdGlvbnMuaW5uZXJIVE1MID0gXCJcIlxuXHRcdGlmIGRhdGEuZmVlZGJhY2suc3VnZ2VzdGlvbnMubGVuZ3RoID4gMFxuXHRcdFx0Zm9yIHN0ciBpbiBkYXRhLmZlZWRiYWNrLnN1Z2dlc3Rpb25zXG5cdFx0XHRcdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiZGl2XCJcblx0XHRcdFx0ZS5jbGFzc0xpc3QgPSBcImFsZXJ0IGFsZXJ0LWluZm9cIlxuXHRcdFx0XHRlLmlubmVySFRNTCA9IFwiPHN0cm9uZz5TdWdnZXN0aW9uPC9zdHJvbmc+PGJyIC8+XCIgKyBzdHJcblx0XHRcdFx0ZVN1Z2dlc3Rpb25zLmFwcGVuZENoaWxkKCBlIClcblxuXHRcdGVDcmFjazEudmFsdWUgPVxuXHRcdFx0ZGF0YS5jcmFja190aW1lc19kaXNwbGF5Lm9ubGluZV90aHJvdHRsaW5nXzEwMF9wZXJfaG91clxuXHRcdGVDcmFjazIudmFsdWUgPVxuXHRcdFx0ZGF0YS5jcmFja190aW1lc19kaXNwbGF5Lm9ubGluZV9ub190aHJvdHRsaW5nXzEwX3Blcl9zZWNvbmRcblx0XHRlQ3JhY2szLnZhbHVlID1cblx0XHRcdGRhdGEuY3JhY2tfdGltZXNfZGlzcGxheS5vZmZsaW5lX3Nsb3dfaGFzaGluZ18xZTRfcGVyX3NlY29uZFxuXHRcdGVDcmFjazQudmFsdWUgPVxuXHRcdFx0ZGF0YS5jcmFja190aW1lc19kaXNwbGF5Lm9mZmxpbmVfZmFzdF9oYXNoaW5nXzFlMTBfcGVyX3NlY29uZFxuXHRcdGVDcmFjazUudmFsdWUgPSB0aGVybW9Mb2coIGRhdGEuZ3Vlc3Nlc19sb2cxMCApXG5cblx0XHRlU2VxTGlzdC5pbm5lckhUTUwgPSBcIlwiXG5cdFx0ZVNlcU91dHB1dC5pbm5lckhUTUwgPSBcIlwiXG5cdFx0Zm9yIHNlZyBpbiBkYXRhLnNlcXVlbmNlXG5cblx0XHRcdGRvICggc2VnICkgLT5cblx0XHRcdFx0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJhXCJcblx0XHRcdFx0ZS5ocmVmID0gXCIjXCJcblx0XHRcdFx0ZS5pbm5lclRleHQgPSBzZWcudG9rZW5cblx0XHRcdFx0ZS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgKCBlICkgLT5cblx0XHRcdFx0XHRhbmFseXplVG9rZW4oIHNlZyApXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cblx0XHRcdFx0ZWMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiY29kZVwiXG5cdFx0XHRcdGVjLmFwcGVuZENoaWxkKCBlIClcblxuXHRcdFx0XHRlU2VxTGlzdC5hcHBlbmRDaGlsZCggZWMgKVxuXG5cdGVIZWxwVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXHRcdGlmIGVIZWxwRGl2LnN0eWxlLmRpc3BsYXlcblx0XHRcdGVIZWxwRGl2LnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdFx0XHRlSGVscFRvZ2dsZS5jbGFzc0xpc3QuYWRkIFwiX3RvZ2dsZWRcIlxuXHRcdGVsc2Vcblx0XHRcdGVIZWxwRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXHRcdFx0ZUhlbHBUb2dnbGUuY2xhc3NMaXN0LnJlbW92ZSBcIl90b2dnbGVkXCJcblxuIyMgQlJVVEUgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZG8gLT5cblxuXHQjIyBBZHZhbmNlZCBPcHRpb25zIERpc3BsYXkgIyNcblxuXHRlQWR2VG9nZ2xlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJicnV0ZS0tYWR2LS10b2dnbGVcIlxuXHRlQWR2RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJicnV0ZS0tYWR2LS1kaXZcIlxuXG5cdGVBZHZUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdFx0aWYgZUFkdkRpdi5zdHlsZS5kaXNwbGF5XG5cdFx0XHRlQWR2RGl2LnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdFx0XHRlQWR2VG9nZ2xlLmNsYXNzTGlzdC5hZGQgXCJfdG9nZ2xlZFwiXG5cdFx0ZWxzZVxuXHRcdFx0ZUFkdkRpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblx0XHRcdGVBZHZUb2dnbGUuY2xhc3NMaXN0LnJlbW92ZSBcIl90b2dnbGVkXCJcblxuXHQjIyBFbGVtZW50cyAjI1xuXG5cdGVMZW5ndGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImJydXRlLS1sZW5ndGhcIlxuXHRlVXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImJydXRlLS11cHBlclwiXG5cdGVMb3dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYnJ1dGUtLWxvd2VyXCJcblx0ZURpZ2l0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYnJ1dGUtLWRpZ2l0c1wiXG5cdGVTeW1ib2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJicnV0ZS0tc3ltYm9sc1wiXG5cdGVBbWJpZ3VvdXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImJydXRlLS1hbWJpZ3VvdXNcIlxuXHRlTWluRGlnaXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJicnV0ZS0tbWluZGlnaXRzXCJcblxuXHR2YWxpZENoYXJhY3RlcnMgPSBbXVxuXHR2YWxpZERpZ2l0cyA9IFtdXG5cblx0IyMgRnVuY3Rpb25zICMjXG5cblx0YW1iaWd1b3VzQ2hhcmFjdGVycyA9IFtcblx0XHQnQicsICdHJywgJ0knLCAnTycsICdRJywgJ0QnLCAnUycsICdaJ1xuXHRcdCdsJ1xuXHRcdCc4JywgJzYnLCAnMScsICcwJywgJzUnLCAnMidcblx0XVxuXG5cdGdlbmVyYXRlVmFsaWRDaGFyYWN0ZXJzID0gLT5cblx0XHR2YWxpZENoYXJhY3RlcnMgPSBbXVxuXHRcdHZhbGlkRGlnaXRzID0gW11cblxuXHRcdGZvciBpIGluIFszMy4uMTI2XVxuXHRcdFx0YyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoIGkgKVxuXG5cdFx0XHRjb250aW51ZSBpZiBjIGluIGFtYmlndW91c0NoYXJhY3RlcnMgYW5kIGVBbWJpZ3VvdXMuY2hlY2tlZFxuXG5cdFx0XHRpZiA0OCA8PSBpIDw9IDU3XG5cdFx0XHRcdGNvbnRpbnVlIGlmIG5vdCBlRGlnaXRzLmNoZWNrZWRcblx0XHRcdFx0dmFsaWRDaGFyYWN0ZXJzLnB1c2ggY1xuXHRcdFx0XHR2YWxpZERpZ2l0cy5wdXNoIGNcblx0XHRcdGVsc2UgaWYgNjUgPD0gaSA8PSA5MFxuXHRcdFx0XHRjb250aW51ZSBpZiBub3QgZVVwcGVyLmNoZWNrZWRcblx0XHRcdFx0dmFsaWRDaGFyYWN0ZXJzLnB1c2ggY1xuXHRcdFx0ZWxzZSBpZiA5NyA8PSBpIDw9IDEyMlxuXHRcdFx0XHRjb250aW51ZSBpZiBub3QgZUxvd2VyLmNoZWNrZWRcblx0XHRcdFx0dmFsaWRDaGFyYWN0ZXJzLnB1c2ggY1xuXHRcdFx0ZWxzZSBpZiBlU3ltYm9scy5jaGVja2VkXG5cdFx0XHRcdHZhbGlkQ2hhcmFjdGVycy5wdXNoIGNcblxuXHRnZW5lcmF0ZVZhbGlkQ2hhcmFjdGVycygpXG5cblx0IyMgR2VuZXJhdGlvbiBBbGdvcml0aG0gIyNcblxuXHRzaHVmZmxlQXJyYXkgPSAoIGFycmF5ICkgLT5cblx0XHRjID0gYXJyYXkubGVuZ3RoXG5cdFx0d2hpbGUgYyA+IDBcblx0XHRcdGkgPSBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogYyApXG5cblx0XHRcdGMtLVxuXG5cdFx0XHRbIGFycmF5W2NdLCBhcnJheVtpXSBdID0gWyBhcnJheVtpXSwgYXJyYXlbY10gXVxuXG5cdFx0cmV0dXJuIGFycmF5XG5cblx0c2hvd0Vycm9yID0gKCBzdHIgKSAtPlxuXHRcdGVPdXRwdXRFcnJvci5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRcdGVPdXRwdXRFcnJvci5pbm5lckhUTUwgPSBzdHJcblx0XHR0aHJvdyBlT3V0cHV0RXJyb3JcblxuXHRnZW5lcmF0ZUJydXRlUGFzc3dvcmQgPSAtPlxuXHRcdHRyeVxuXHRcdFx0IyMgVmFsaWRhdGlvblxuXHRcdFx0bGVuZ3RoID0gcGFyc2VJbnQoIGVMZW5ndGgudmFsdWUgKVxuXHRcdFx0bWluRGlnaXRzID0gcGFyc2VJbnQoIGVNaW5EaWdpdHMudmFsdWUgKVxuXG5cdFx0XHRpZiBpc05hTiggbGVuZ3RoIClcblx0XHRcdFx0dGhyb3cgXCJQYXNzd29yZCBsZW5ndGggbXVzdCBiZSBhbiBpbnRlZ2VyXCJcblx0XHRcdGlmIGxlbmd0aCA8PSAwXG5cdFx0XHRcdHRocm93IFwiUGFzc3dvcmQgbGVuZ3RoIG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm9cIlxuXHRcdFx0aWYgaXNOYU4oIG1pbkRpZ2l0cyApXG5cdFx0XHRcdG1pbkRpZ2l0cyA9IDBcblx0XHRcdGlmIG1pbkRpZ2l0cyA8IDBcblx0XHRcdFx0dGhyb3cgXCJNaW5pbXVtIERpZ2l0cyBtdXN0IGJlIHplcm8gb3IgZ3JlYXRlclwiXG5cdFx0XHRpZiBtaW5EaWdpdHMgPiBsZW5ndGhcblx0XHRcdFx0bWluRGlnaXRzID0gbGVuZ3RoXG5cdFx0XHRpZiBtaW5EaWdpdHMgPiAwXG5cdFx0XHRcdGVEaWdpdHMuY2hlY2tlZCA9IHRydWVcblx0XHRcdFx0Z2VuZXJhdGVWYWxpZENoYXJhY3RlcnMoKVxuXG5cdFx0XHRpZiBub3QgZVVwcGVyLmNoZWNrZWQgYW5kXG5cdFx0XHRcdG5vdCBlTG93ZXIuY2hlY2tlZCBhbmRcblx0XHRcdFx0bm90IGVEaWdpdHMuY2hlY2tlZCBhbmRcblx0XHRcdFx0bm90IGVTeW1ib2xzLmNoZWNrZWRcblxuXHRcdFx0XHRcdGVMb3dlci5jaGVja2VkID0gdHJ1ZVxuXHRcdFx0XHRcdGdlbmVyYXRlVmFsaWRDaGFyYWN0ZXJzKClcblxuXHRcdFx0IyMgRXhlY3V0aW9uXG5cdFx0XHRvdXQgPSBbXVxuXG5cdFx0XHRpZiBtaW5EaWdpdHMgPiAwXG5cdFx0XHRcdGZvciBbMS4ubWluRGlnaXRzXVxuXHRcdFx0XHRcdG91dC5wdXNoIHJhbmRvbUFycmF5KCB2YWxpZERpZ2l0cyApXG5cdFx0XHRpZiBsZW5ndGggPiBtaW5EaWdpdHNcblx0XHRcdFx0Zm9yIFsxLi4oIGxlbmd0aCAtIG1pbkRpZ2l0cyApXVxuXHRcdFx0XHRcdG91dC5wdXNoIHJhbmRvbUFycmF5KCB2YWxpZENoYXJhY3RlcnMgKVxuXG5cdFx0XHRzaHVmZmxlQXJyYXkoIG91dCApXG5cblx0XHRcdGVPdXRwdXRUZXh0LnZhbHVlID0gb3V0LmpvaW4gXCJcIlxuXHRcdFx0YW5hbHl6ZVN0cmVuZ3RoKClcblx0XHRjYXRjaCBleFxuXHRcdFx0aWYgdHlwZW9mKCBleCApID09IFwic3RyaW5nXCJcblx0XHRcdFx0ZU91dHB1dEVycm9yLnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdFx0XHRcdGVPdXRwdXRFcnJvci5pbm5lckhUTUwgPSBleFxuXHRcdFx0dGhyb3cgZXhcblxuXHQjIyBFdmVudHMgIyNcblxuXHRidWlsZEFuZEdlbmVyYXRlID0gLT5cblx0XHRnZW5lcmF0ZVZhbGlkQ2hhcmFjdGVycygpXG5cdFx0Z2VuZXJhdGVCcnV0ZVBhc3N3b3JkKClcblx0ZVVwcGVyLmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgYnVpbGRBbmRHZW5lcmF0ZVxuXHRlTG93ZXIuYWRkRXZlbnRMaXN0ZW5lciBcImNoYW5nZVwiLCBidWlsZEFuZEdlbmVyYXRlXG5cdGVTeW1ib2xzLmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgYnVpbGRBbmRHZW5lcmF0ZVxuXHRlQW1iaWd1b3VzLmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgYnVpbGRBbmRHZW5lcmF0ZVxuXG5cdGVMZW5ndGguYWRkRXZlbnRMaXN0ZW5lciBcImNoYW5nZVwiLCBnZW5lcmF0ZUJydXRlUGFzc3dvcmRcblx0ZU1pbkRpZ2l0cy5hZGRFdmVudExpc3RlbmVyIFwiY2hhbmdlXCIsIGdlbmVyYXRlQnJ1dGVQYXNzd29yZFxuXG5cdGVEaWdpdHMuYWRkRXZlbnRMaXN0ZW5lciBcImNoYW5nZVwiLCAtPlxuXHRcdGlmIG5vdCBAY2hlY2tlZFxuXHRcdFx0ZU1pbkRpZ2l0cy52YWx1ZSA9IDBcblx0XHRidWlsZEFuZEdlbmVyYXRlKClcblxuZ2VuZXJhdGVCcnV0ZVBhc3N3b3JkKClcblxuIyMgRElDVElPTkFSWSAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZG8gLT5cblxuXHQjIyBFbGVtZW50cyAjI1xuXG5cdGVXb3JkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiZGljdC0td29yZHNcIlxuXHRlRG93bmxvYWRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImRpY3QtLWRvd25sb2FkaW5nXCJcblxuXHR3b3JkTGlzdCA9IG51bGxcblxuXHQjIyBHZW5lcmF0aW9uIEFsZ29yaXRobSAjI1xuXG5cdGxvYWRXb3JkTGlzdCA9IC0+XG5cdFx0aWYgd29yZExpc3QgPT0gMFxuXHRcdFx0cmV0dXJuXG5cdFx0d29yZExpc3QgPSAwXG5cblx0XHRyZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3Rcblx0XHRyZXEub3ZlcnJpZGVNaW1lVHlwZSBcImFwcGxpY2F0aW9uL2pzb25cIlxuXHRcdHJlcS5vcGVuIFwiR0VUXCIsIFwid29yZGxpc3QuanNvblwiXG5cdFx0cmVxLm9ubG9hZCA9IC0+XG5cdFx0XHRyZXR1cm4gaWYgcmVxLnJlYWR5U3RhdGUgIT0gNFxuXHRcdFx0aWYgcmVxLnN0YXR1cyA9PSAyMDBcblx0XHRcdFx0d29yZExpc3QgPSBKU09OLnBhcnNlKCByZXEucmVzcG9uc2VUZXh0IClcblx0XHRcdFx0ZURvd25sb2FkaW5nLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXHRcdFx0XHRnZW5lcmF0ZURpY3RQYXNzd29yZCgpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGVPdXRwdXRFcnJvci5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRcdFx0XHRlT3V0cHV0RXJyb3IuaW5uZXJIVE1MID0gXCJFcnJvciB3aGVuIGRvd25sb2FkaW5nIHdvcmQgbGlzdFwiXG5cdFx0XHRcdHdvcmRMaXN0ID0gbnVsbFxuXHRcdHJlcS5zZW5kIG51bGxcblxuXHRnZW5lcmF0ZURpY3RQYXNzd29yZCA9IC0+XG5cdFx0dHJ5XG5cdFx0XHQjIyBWYWxpZGF0aW9uXG5cdFx0XHR3b3JkcyA9IHBhcnNlSW50KCBlV29yZHMudmFsdWUgKVxuXG5cdFx0XHRpZiBpc05hTiggd29yZHMgKVxuXHRcdFx0XHR0aHJvdyBcIldvcmQgY291bnQgbXVzdCBiZSBhbiBpbnRlZ2VyXCJcblx0XHRcdGlmIHdvcmRzIDw9IDBcblx0XHRcdFx0dGhyb3cgXCJXb3JkIGNvdW50IG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm9cIlxuXHRcdFx0aWYgbm90IHdvcmRMaXN0XG5cdFx0XHRcdGxvYWRXb3JkTGlzdCgpXG5cdFx0XHRcdHJldHVyblxuXG5cdFx0XHQjIyBFeGVjdXRpb25cblx0XHRcdG91dCA9IFtdXG5cblx0XHRcdGZvciBbMS4ud29yZHNdXG5cdFx0XHRcdG91dC5wdXNoIHJhbmRvbUFycmF5KCB3b3JkTGlzdCApLnRvTG93ZXJDYXNlKClcblxuXHRcdFx0ZU91dHB1dFRleHQudmFsdWUgPSBvdXQuam9pbiBcIiBcIlxuXHRcdFx0YW5hbHl6ZVN0cmVuZ3RoKClcblx0XHRjYXRjaCBleFxuXHRcdFx0aWYgdHlwZW9mKCBleCApID09IFwic3RyaW5nXCJcblx0XHRcdFx0ZU91dHB1dEVycm9yLnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdFx0XHRcdGVPdXRwdXRFcnJvci5pbm5lckhUTUwgPSBleFxuXHRcdFx0Y29uc29sZS5lcnJvciBleFxuXG5cdCMjIEV2ZW50cyAjI1xuXG5cdGVXb3Jkcy5hZGRFdmVudExpc3RlbmVyIFwiY2hhbmdlXCIsIGdlbmVyYXRlRGljdFBhc3N3b3JkXG5cbmVFdmFsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lciBcImNoYW5nZVwiLCAtPlxuXHRlT3V0cHV0VGV4dC52YWx1ZSA9IGVFdmFsSW5wdXQudmFsdWVcblx0YW5hbHl6ZVN0cmVuZ3RoKClcbiJdfQ==
