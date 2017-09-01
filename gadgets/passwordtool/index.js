
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
    var analyzeToken, eCrack1, eCrack2, eCrack3, eCrack4, eCrack5, eError, eGuesses, eHelpDiv, eHelpToggle, eOutput, eSeqList, eSeqOutput, eStrength, eSuggestions, eWarning, energyUse, niceTime, strengthClasses, strengthTexts;
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
    energyUse = function(guesses) {
      guesses *= 0.036;
      if (guesses < 0.11) {
        return "Less than a coin falling 1 metre";
      }
      if (guesses < 4.22e3) {
        return "Less than 1 gram of TNT";
      } else if (guesses < 9e3) {
        return "Less than an alkaline AA battery";
      } else if (guesses < 4.2e6) {
        return "Less than 1 kilogram of TNT";
      } else if (guesses < 3.7e7) {
        return "Less than $1 of electricity";
      } else if (guesses < 6.3e7) {
        return "Less than 1kg at escape velocity";
      } else if (guesses < 5e9) {
        return "Less than 1 lightning bolt";
      } else if (guesses < 3.3e9) {
        return "Less than 1 lifetime of heartbeats";
      } else if (guesses < 4.2e9) {
        return "Less than 1 ton of TNT";
      } else if (guesses < 8.8e10) {
        return "Less than the fission of 1 gram of Uranium-235";
      } else if (guesses < 6.3e13) {
        return "Less than the Little Boy atomic bomb";
      } else if (guesses < 9e13) {
        return "Less than the mass-energy of 1 gram of matter";
      } else if (guesses < 6e14) {
        return "Less than 1 second of output from a hurricane";
      } else if (guesses < 4.2e15) {
        return "Less than 1 megaton of TNT";
      } else if (guesses < 1.7e17) {
        return "Less than 1 second of the earth's total solar energy input";
      } else if (guesses < 5e20) {
        return "Less than one year of the earth's energy consumption";
      } else if (guesses < 7.9e21) {
        return "Less than the world's entire petroleum reserves";
      } else if (guesses < 1.5e22) {
        return "Less than one day of the earth's total solar energy input";
      } else if (guesses < 5.5e24) {
        return "Less than one year of the earth's total solar energy input";
      } else if (guesses < 6e25) {
        return "Less than the energy in a solar flare";
      } else if (guesses < 3.8e26) {
        return "Less than one second of the Sun's energy output";
      } else if (guesses < 3.3e31) {
        return "Less than one day of the Sun's energy output";
      } else if (guesses < 5.4e41) {
        return "Less than the mass-energy of the earth";
      } else if (guesses < 1.2e44) {
        return "Less than the total lifetime energy output of the Sun";
      } else if (guesses < 1.5e44) {
        return "Less than one supernova";
      } else if (guesses < 1e46) {
        return "Less than one hypernova";
      } else if (guesses < 1.8e47) {
        return "Less than the mass-energy of the Sun";
      } else if (guesses < 1e59) {
        return "Less than the mass-energy of the Milky Way";
      } else if (guesses < 1e62) {
        return "Less than the mass-energy of the Virgo Supercluster";
      } else if (guesses < 1e69) {
        return "Less than the mass-energy of the observable universe";
      } else {
        return "More than the mass-energy of the observable universe";
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
      eCrack5.value = energyUse(data.guesses);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9wYXNzd29yZHRvb2wvaW5kZXguanMiLCJzb3VyY2VzIjpbImdhZGdldHMvcGFzc3dvcmR0b29sL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7OztBQUFBO0FBQUEsTUFBQSxrTkFBQTtJQUFBOztFQVdBLE1BQU0sQ0FBQyxvQkFBUCxHQUE4Qjs7RUFFOUIsU0FBQSxHQUFZLFFBQVEsQ0FBQyxjQUFULENBQXdCLFlBQXhCOztFQUNaLFFBQUEsR0FBVyxRQUFRLENBQUMsY0FBVCxDQUF3QixXQUF4Qjs7RUFDWCxRQUFBLEdBQVcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsV0FBeEI7O0VBQ1gsU0FBQSxHQUFZLFFBQVEsQ0FBQyxjQUFULENBQXdCLFlBQXhCOztFQUNaLFFBQUEsR0FBVyxRQUFRLENBQUMsY0FBVCxDQUF3QixXQUF4Qjs7RUFDWCxRQUFBLEdBQVcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsV0FBeEI7O0VBQ1gsVUFBQSxHQUFhLFFBQVEsQ0FBQyxjQUFULENBQXdCLGFBQXhCOztFQUNiLFlBQUEsR0FBZSxRQUFRLENBQUMsY0FBVCxDQUF3QixlQUF4Qjs7RUFDZixXQUFBLEdBQWMsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsY0FBeEI7O0VBQ2QsVUFBQSxHQUFhLFFBQVEsQ0FBQyxjQUFULENBQXdCLGFBQXhCOztFQUViLFNBQUEsR0FBWTs7RUFFWixxQkFBQSxHQUF3QixTQUFBLEdBQUE7O0VBQ3hCLG9CQUFBLEdBQXVCLFNBQUEsR0FBQTs7RUFDdkIsZUFBQSxHQUFrQixTQUFBLEdBQUE7O0VBRWxCLFdBQUEsR0FBYyxTQUFBO0lBQ2IsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFwQixDQUEyQixRQUEzQjtJQUNBLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBbkIsQ0FBMEIsUUFBMUI7SUFDQSxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQW5CLENBQTBCLFFBQTFCO0lBQ0EsU0FBUyxDQUFDLEtBQUssQ0FBQyxP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QUMsSUFBSixDQUFTLElBQVQ7SUFsQmM7SUFvQmYsb0JBQUEsR0FBdUIsU0FBQTtBQUN0QixVQUFBO0FBQUE7UUFFQyxLQUFBLEdBQVEsUUFBQSxDQUFVLE1BQU0sQ0FBQyxLQUFqQjtRQUVSLElBQUcsS0FBQSxDQUFPLEtBQVAsQ0FBSDtBQUNDLGdCQUFNLGdDQURQOztRQUVBLElBQUcsS0FBQSxJQUFTLENBQVo7QUFDQyxnQkFBTSx1Q0FEUDs7UUFFQSxJQUFHLENBQUksUUFBUDtVQUNDLFlBQUEsQ0FBQTtBQUNBLGlCQUZEOztRQUtBLEdBQUEsR0FBTTtBQUVOLGFBQUksd0VBQUo7VUFDQyxHQUFHLENBQUMsSUFBSixDQUFTLFdBQUEsQ0FBYSxRQUFiLENBQXVCLENBQUMsV0FBeEIsQ0FBQSxDQUFUO0FBREQ7UUFHQSxXQUFXLENBQUMsS0FBWixHQUFvQixHQUFHLENBQUMsSUFBSixDQUFTLEdBQVQ7ZUFDcEIsZUFBQSxDQUFBLEVBbkJEO09BQUEsYUFBQTtRQW9CTTtRQUNMLElBQUcsT0FBUSxFQUFSLEtBQWdCLFFBQW5CO1VBQ0MsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFuQixHQUE2QjtVQUM3QixZQUFZLENBQUMsU0FBYixHQUF5QixHQUYxQjs7ZUFHQSxPQUFPLENBQUMsS0FBUixDQUFjLEVBQWQsRUF4QkQ7O0lBRHNCO1dBNkJ2QixNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0Msb0JBQWxDO0VBNURFLENBQUEsQ0FBSCxDQUFBOztFQThEQSxVQUFVLENBQUMsZ0JBQVgsQ0FBNEIsUUFBNUIsRUFBc0MsU0FBQTtJQUNyQyxXQUFXLENBQUMsS0FBWixHQUFvQixVQUFVLENBQUM7V0FDL0IsZUFBQSxDQUFBO0VBRnFDLENBQXRDO0FBOWVBIiwic291cmNlc0NvbnRlbnQiOlsiIyMjXG5FYXN0ZXIgRWdnczpcblxuenhjdmJuJ3Mgb3V0cHV0IHdpbGwgYmUgcHV0IGluIHRoZSBcInp4Y3Zibk91dHB1dFwiIGdsb2JhbCB2YXJpYWJsZS5cblxuVGhlIDEwMCBjaGFyYWN0ZXIgbGltaXQgdG8gc3RyZW5ndGggYW5hbHlzaXMgY2FuIGJlIGJ5cGFzc2VkIGJ5IHNldHRpbmcgdGhlXG5nbG9iYWwgdmFyaWFibGUgXCJESVNBQkxFRF9aWENWQk5fTElNSVRcIiB0byB0cnVlLlxuIyMjXG5cbiMjIENPTU1PTiAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbndpbmRvdy5ESVNBQkxFX1pYQ1ZCTl9MSU1JVCA9IGZhbHNlXG5cbmVOYXZCcnV0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwibmF2LS1icnV0ZVwiXG5lTmF2RGljdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwibmF2LS1kaWN0XCJcbmVOYXZFdmFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJuYXYtLWV2YWxcIlxuZUJydXRlRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJicnV0ZS0tZGl2XCJcbmVEaWN0RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJkaWN0LS1kaXZcIlxuZUV2YWxEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImV2YWwtLWRpdlwiXG5lT3V0cHV0RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJvdXRwdXQtLWRpdlwiXG5lT3V0cHV0RXJyb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcIm91dHB1dC0tZXJyb3JcIlxuZU91dHB1dFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcIm91dHB1dC0tdGV4dFwiXG5lRXZhbElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJldmFsLS1pbnB1dFwiXG5cbmFjdGl2ZURpdiA9IGVCcnV0ZURpdlxuXG5nZW5lcmF0ZUJydXRlUGFzc3dvcmQgPSAtPlxuZ2VuZXJhdGVEaWN0UGFzc3dvcmQgPSAtPlxuYW5hbHl6ZVN0cmVuZ3RoID0gLT5cblxuaGlkZUFsbE5hdnMgPSAtPlxuXHRlTmF2QnJ1dGUuY2xhc3NMaXN0LnJlbW92ZSBcImFjdGl2ZVwiXG5cdGVOYXZEaWN0LmNsYXNzTGlzdC5yZW1vdmUgXCJhY3RpdmVcIlxuXHRlTmF2RXZhbC5jbGFzc0xpc3QucmVtb3ZlIFwiYWN0aXZlXCJcblx0ZUJydXRlRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXHRlRGljdERpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblx0ZUV2YWxEaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cdGVPdXRwdXREaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cbmVOYXZCcnV0ZS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgLT5cblx0cmV0dXJuIGlmIGFjdGl2ZURpdiA9PSBlQnJ1dGVEaXZcblxuXHRoaWRlQWxsTmF2cygpXG5cdGVOYXZCcnV0ZS5jbGFzc0xpc3QuYWRkIFwiYWN0aXZlXCJcblx0ZUJydXRlRGl2LnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdGVPdXRwdXREaXYuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0YWN0aXZlRGl2ID0gZUJydXRlRGl2XG5cdGdlbmVyYXRlQnJ1dGVQYXNzd29yZCgpXG5cbmVOYXZEaWN0LmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXHRyZXR1cm4gaWYgYWN0aXZlRGl2ID09IGVEaWN0RGl2XG5cblx0aGlkZUFsbE5hdnMoKVxuXHRlTmF2RGljdC5jbGFzc0xpc3QuYWRkIFwiYWN0aXZlXCJcblx0ZURpY3REaXYuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0ZU91dHB1dERpdi5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRhY3RpdmVEaXYgPSBlRGljdERpdlxuXHRnZW5lcmF0ZURpY3RQYXNzd29yZCgpXG5cbmVOYXZFdmFsLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXHRyZXR1cm4gaWYgYWN0aXZlRGl2ID09IGVFdmFsRGl2XG5cblx0aGlkZUFsbE5hdnMoKVxuXHRlTmF2RXZhbC5jbGFzc0xpc3QuYWRkIFwiYWN0aXZlXCJcblx0ZUV2YWxEaXYuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0YWN0aXZlRGl2ID0gZUV2YWxEaXZcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwib3V0cHV0LS1yZWZyZXNoXCIgKS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgLT5cblx0aWYgYWN0aXZlRGl2ID09IGVCcnV0ZURpdlxuXHRcdGdlbmVyYXRlQnJ1dGVQYXNzd29yZCgpXG5cdGlmIGFjdGl2ZURpdiA9PSBlRGljdERpdlxuXHRcdGdlbmVyYXRlRGljdFBhc3N3b3JkKClcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwib3V0cHV0LS1jb3B5XCIgKS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgLT5cblx0ZU91dHB1dFRleHQuc2VsZWN0KClcblx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQgXCJjb3B5XCJcblx0ZU91dHB1dFRleHQuZm9jdXMoKVxuXG5yYW5kb21BcnJheSA9ICggYXJyYXkgKSAtPlxuXHRhcnJheVsgTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIGFycmF5Lmxlbmd0aCApIF1cblxuIyMgU1RSRU5HVEggQU5BTFlTSVMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZG8gLT5cblxuXHRlRXJyb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImFuLS1lcnJvclwiXG5cdGVPdXRwdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImFuLS1kaXYtLW91dHB1dFwiXG5cdGVHdWVzc2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhbi0tZ3Vlc3Nlc1wiXG5cdGVTdHJlbmd0aD0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhbi0tc3RyZW5ndGhcIlxuXHRlV2FybmluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLXdhcm5pbmdcIlxuXHRlU3VnZ2VzdGlvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImFuLS1zdWdnZXN0aW9uc1wiXG5cdGVDcmFjazEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImFuLS1jcmFjay0tMVwiXG5cdGVDcmFjazIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImFuLS1jcmFjay0tMlwiXG5cdGVDcmFjazMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImFuLS1jcmFjay0tM1wiXG5cdGVDcmFjazQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImFuLS1jcmFjay0tNFwiXG5cdGVDcmFjazUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImFuLS1jcmFjay0tNVwiXG5cdGVIZWxwVG9nZ2xlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJhbi0taGVscC0tdG9nZ2xlXCJcblx0ZUhlbHBEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImFuLS1oZWxwLS1kaXZcIlxuXHRlU2VxTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYW4tLXNlcS0tbGlzdFwiXG5cdGVTZXFPdXRwdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImFuLS1zZXEtLW91dHB1dFwiXG5cblx0c3RyZW5ndGhUZXh0cyA9IFtcblx0XHRcIlVuc3VpdGFibGVcIlxuXHRcdFwiUG9vclwiXG5cdFx0XCJBZGVxdWF0ZVwiXG5cdFx0XCJHb29kXCJcblx0XHRcIkV4Y2VsbGVudFwiXG5cdF1cblx0c3RyZW5ndGhDbGFzc2VzID0gW1xuXHRcdFwiYmctZGFuZ2VyXCJcblx0XHRcImJnLXdhcm5pbmdcIlxuXHRcdFwiYmctd2FybmluZ1wiXG5cdFx0XCJiZy1zdWNjZXNzXCJcblx0XHRcImJnLXN1Y2Nlc3NcIlxuXHRdXG5cblx0bmljZVRpbWUgPSAoIHQgKSAtPlxuXHRcdHAgPSAoIG4sIHMgKSAtPlxuXHRcdFx0aWYgTWF0aC5mbG9vciggbiApID09IDFcblx0XHRcdFx0cmV0dXJuIE1hdGguZmxvb3IoIG4gKSArIFwiIFwiICsgc1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyZXR1cm4gTWF0aC5mbG9vciggbiApICsgXCIgXCIgKyBzICsgXCJzXCJcblxuXHRcdGlmIHQgPCAxXG5cdFx0XHRyZXR1cm4gXCJMZXNzIHRoYW4gYSBzZWNvbmRcIlxuXHRcdGlmIHQgPCA2MFxuXHRcdFx0cmV0dXJuIHAgdCwgXCJzZWNvbmRcIlxuXHRcdGlmIHQgPCAzNjAwXG5cdFx0XHRyZXR1cm4gcCB0LzYwLCBcIm1pbnV0ZVwiXG5cdFx0aWYgdCA8IDg2NDAwXG5cdFx0XHRyZXR1cm4gcCB0LzM2MDAsIFwiaG91clwiXG5cdFx0aWYgdCA8IDMxNTM2MDAwXG5cdFx0XHRyZXR1cm4gcCB0Lzg2NDAwLCBcImRheVwiXG5cdFx0aWYgdCA8IDMxNTM2MDAwMDBcblx0XHRcdHJldHVybiBwIHQvMzE1MzYwMDAsIFwieWVhclwiXG5cdFx0cmV0dXJuIFwiQ2VudHVyaWVzXCJcblxuXHRlbmVyZ3lVc2UgPSAoIGd1ZXNzZXMgKSAtPlxuXHRcdGd1ZXNzZXMgKj0gMC4wMzZcblxuXHRcdGlmIGd1ZXNzZXMgPCAwLjExXG5cdFx0XHRyZXR1cm4gXCJMZXNzIHRoYW4gYSBjb2luIGZhbGxpbmcgMSBtZXRyZVwiXG5cdFx0aWYgZ3Vlc3NlcyA8IDQuMjJlM1xuXHRcdFx0cmV0dXJuIFwiTGVzcyB0aGFuIDEgZ3JhbSBvZiBUTlRcIlxuXHRcdGVsc2UgaWYgZ3Vlc3NlcyA8IDllM1xuXHRcdFx0cmV0dXJuIFwiTGVzcyB0aGFuIGFuIGFsa2FsaW5lIEFBIGJhdHRlcnlcIlxuXHRcdGVsc2UgaWYgZ3Vlc3NlcyA8IDQuMmU2XG5cdFx0XHRyZXR1cm4gXCJMZXNzIHRoYW4gMSBraWxvZ3JhbSBvZiBUTlRcIlxuXHRcdGVsc2UgaWYgZ3Vlc3NlcyA8IDMuN2U3XG5cdFx0XHRyZXR1cm4gXCJMZXNzIHRoYW4gJDEgb2YgZWxlY3RyaWNpdHlcIlxuXHRcdGVsc2UgaWYgZ3Vlc3NlcyA8IDYuM2U3XG5cdFx0XHRyZXR1cm4gXCJMZXNzIHRoYW4gMWtnIGF0IGVzY2FwZSB2ZWxvY2l0eVwiXG5cdFx0ZWxzZSBpZiBndWVzc2VzIDwgNWU5XG5cdFx0XHRyZXR1cm4gXCJMZXNzIHRoYW4gMSBsaWdodG5pbmcgYm9sdFwiXG5cdFx0ZWxzZSBpZiBndWVzc2VzIDwgMy4zZTlcblx0XHRcdHJldHVybiBcIkxlc3MgdGhhbiAxIGxpZmV0aW1lIG9mIGhlYXJ0YmVhdHNcIlxuXHRcdGVsc2UgaWYgZ3Vlc3NlcyA8IDQuMmU5XG5cdFx0XHRyZXR1cm4gXCJMZXNzIHRoYW4gMSB0b24gb2YgVE5UXCJcblx0XHRlbHNlIGlmIGd1ZXNzZXMgPCA4LjhlMTBcblx0XHRcdHJldHVybiBcIkxlc3MgdGhhbiB0aGUgZmlzc2lvbiBvZiAxIGdyYW0gb2YgVXJhbml1bS0yMzVcIlxuXHRcdGVsc2UgaWYgZ3Vlc3NlcyA8IDYuM2UxM1xuXHRcdFx0cmV0dXJuIFwiTGVzcyB0aGFuIHRoZSBMaXR0bGUgQm95IGF0b21pYyBib21iXCJcblx0XHRlbHNlIGlmIGd1ZXNzZXMgPCA5ZTEzXG5cdFx0XHRyZXR1cm4gXCJMZXNzIHRoYW4gdGhlIG1hc3MtZW5lcmd5IG9mIDEgZ3JhbSBvZiBtYXR0ZXJcIlxuXHRcdGVsc2UgaWYgZ3Vlc3NlcyA8IDZlMTRcblx0XHRcdHJldHVybiBcIkxlc3MgdGhhbiAxIHNlY29uZCBvZiBvdXRwdXQgZnJvbSBhIGh1cnJpY2FuZVwiXG5cdFx0ZWxzZSBpZiBndWVzc2VzIDwgNC4yZTE1XG5cdFx0XHRyZXR1cm4gXCJMZXNzIHRoYW4gMSBtZWdhdG9uIG9mIFROVFwiXG5cdFx0ZWxzZSBpZiBndWVzc2VzIDwgMS43ZTE3XG5cdFx0XHRyZXR1cm4gXCJMZXNzIHRoYW4gMSBzZWNvbmQgb2YgdGhlIGVhcnRoJ3MgdG90YWwgc29sYXIgZW5lcmd5IGlucHV0XCJcblx0XHRlbHNlIGlmIGd1ZXNzZXMgPCA1ZTIwXG5cdFx0XHRyZXR1cm4gXCJMZXNzIHRoYW4gb25lIHllYXIgb2YgdGhlIGVhcnRoJ3MgZW5lcmd5IGNvbnN1bXB0aW9uXCJcblx0XHRlbHNlIGlmIGd1ZXNzZXMgPCA3LjllMjFcblx0XHRcdHJldHVybiBcIkxlc3MgdGhhbiB0aGUgd29ybGQncyBlbnRpcmUgcGV0cm9sZXVtIHJlc2VydmVzXCJcblx0XHRlbHNlIGlmIGd1ZXNzZXMgPCAxLjVlMjJcblx0XHRcdHJldHVybiBcIkxlc3MgdGhhbiBvbmUgZGF5IG9mIHRoZSBlYXJ0aCdzIHRvdGFsIHNvbGFyIGVuZXJneSBpbnB1dFwiXG5cdFx0ZWxzZSBpZiBndWVzc2VzIDwgNS41ZTI0XG5cdFx0XHRyZXR1cm4gXCJMZXNzIHRoYW4gb25lIHllYXIgb2YgdGhlIGVhcnRoJ3MgdG90YWwgc29sYXIgZW5lcmd5IGlucHV0XCJcblx0XHRlbHNlIGlmIGd1ZXNzZXMgPCA2ZTI1XG5cdFx0XHRyZXR1cm4gXCJMZXNzIHRoYW4gdGhlIGVuZXJneSBpbiBhIHNvbGFyIGZsYXJlXCJcblx0XHRlbHNlIGlmIGd1ZXNzZXMgPCAzLjhlMjZcblx0XHRcdHJldHVybiBcIkxlc3MgdGhhbiBvbmUgc2Vjb25kIG9mIHRoZSBTdW4ncyBlbmVyZ3kgb3V0cHV0XCJcblx0XHRlbHNlIGlmIGd1ZXNzZXMgPCAzLjNlMzFcblx0XHRcdHJldHVybiBcIkxlc3MgdGhhbiBvbmUgZGF5IG9mIHRoZSBTdW4ncyBlbmVyZ3kgb3V0cHV0XCJcblx0XHRlbHNlIGlmIGd1ZXNzZXMgPCA1LjRlNDFcblx0XHRcdHJldHVybiBcIkxlc3MgdGhhbiB0aGUgbWFzcy1lbmVyZ3kgb2YgdGhlIGVhcnRoXCJcblx0XHRlbHNlIGlmIGd1ZXNzZXMgPCAxLjJlNDRcblx0XHRcdHJldHVybiBcIkxlc3MgdGhhbiB0aGUgdG90YWwgbGlmZXRpbWUgZW5lcmd5IG91dHB1dCBvZiB0aGUgU3VuXCJcblx0XHRlbHNlIGlmIGd1ZXNzZXMgPCAxLjVlNDRcblx0XHRcdHJldHVybiBcIkxlc3MgdGhhbiBvbmUgc3VwZXJub3ZhXCJcblx0XHRlbHNlIGlmIGd1ZXNzZXMgPCAxZTQ2XG5cdFx0XHRyZXR1cm4gXCJMZXNzIHRoYW4gb25lIGh5cGVybm92YVwiXG5cdFx0ZWxzZSBpZiBndWVzc2VzIDwgMS44ZTQ3XG5cdFx0XHRyZXR1cm4gXCJMZXNzIHRoYW4gdGhlIG1hc3MtZW5lcmd5IG9mIHRoZSBTdW5cIlxuXHRcdGVsc2UgaWYgZ3Vlc3NlcyA8IDFlNTlcblx0XHRcdHJldHVybiBcIkxlc3MgdGhhbiB0aGUgbWFzcy1lbmVyZ3kgb2YgdGhlIE1pbGt5IFdheVwiXG5cdFx0ZWxzZSBpZiBndWVzc2VzIDwgMWU2MlxuXHRcdFx0cmV0dXJuIFwiTGVzcyB0aGFuIHRoZSBtYXNzLWVuZXJneSBvZiB0aGUgVmlyZ28gU3VwZXJjbHVzdGVyXCJcblx0XHRlbHNlIGlmIGd1ZXNzZXMgPCAxZTY5XG5cdFx0XHRyZXR1cm4gXCJMZXNzIHRoYW4gdGhlIG1hc3MtZW5lcmd5IG9mIHRoZSBvYnNlcnZhYmxlIHVuaXZlcnNlXCJcblx0XHRlbHNlXG5cdFx0XHQjIGdvb2QgbG9yZFxuXHRcdFx0cmV0dXJuIFwiTW9yZSB0aGFuIHRoZSBtYXNzLWVuZXJneSBvZiB0aGUgb2JzZXJ2YWJsZSB1bml2ZXJzZVwiXG5cblxuXHRhbmFseXplVG9rZW4gPSAoIHRva2VuICkgLT5cblx0XHRlU2VxT3V0cHV0LmlubmVyVGV4dCA9IChcblx0XHRcdGsgKyBcIjogXCIgKyB2IGZvciBrLCB2IG9mIHRva2VuIHdoZW4gdHlwZW9mKCB2ICkgIT0gXCJvYmplY3RcIlxuXHRcdCkuam9pbiggXCJcXG5cIiApXG5cblx0YW5hbHl6ZVN0cmVuZ3RoID0gLT5cblx0XHRyZXR1cm4gaWYgbm90IHp4Y3ZiblxuXG5cdFx0cHcgPSBlT3V0cHV0VGV4dC52YWx1ZVxuXG5cdFx0aWYgcHcubGVuZ3RoID4gMTAwIGFuZCBub3Qgd2luZG93LkRJU0FCTEVfWlhDVkJOX0xJTUlUXG5cdFx0XHRlRXJyb3Iuc3R5bGUuZGlzcGxheSA9IG51bGxcblx0XHRcdGVPdXRwdXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cdFx0XHRyZXR1cm5cblxuXHRcdGVFcnJvci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblx0XHRlT3V0cHV0LnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cblx0XHRkYXRhID0genhjdmJuKCBwdyApXG5cdFx0d2luZG93Lnp4Y3Zibk91dHB1dCA9IGRhdGFcblxuXHRcdGVHdWVzc2VzLnZhbHVlID0gTWF0aC5mbG9vciggZGF0YS5ndWVzc2VzIClcblx0XHRlU3RyZW5ndGguc3R5bGUud2lkdGggPVxuXHRcdFx0TWF0aC5taW4oIGRhdGEuZ3Vlc3Nlc19sb2cxMCAqIDEwLCAxMDAgKSArIFwiJVwiXG5cdFx0ZVN0cmVuZ3RoLmlubmVyVGV4dCA9IHN0cmVuZ3RoVGV4dHNbIGRhdGEuc2NvcmUgXVxuXHRcdGVTdHJlbmd0aC5jbGFzc0xpc3QgPSBcInByb2dyZXNzLWJhciBcIiArIHN0cmVuZ3RoQ2xhc3Nlc1sgZGF0YS5zY29yZSBdXG5cblx0XHRpZiBkYXRhLmZlZWRiYWNrLndhcm5pbmdcblx0XHRcdGVXYXJuaW5nLnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdFx0XHRlV2FybmluZy5pbm5lckhUTUwgPSBcIjxzdHJvbmc+V2FybmluZzwvc3Ryb25nPjxiciAvPlwiICtcblx0XHRcdFx0ZGF0YS5mZWVkYmFjay53YXJuaW5nXG5cdFx0ZWxzZVxuXHRcdFx0ZVdhcm5pbmcuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cblx0XHRlU3VnZ2VzdGlvbnMuaW5uZXJIVE1MID0gXCJcIlxuXHRcdGlmIGRhdGEuZmVlZGJhY2suc3VnZ2VzdGlvbnMubGVuZ3RoID4gMFxuXHRcdFx0Zm9yIHN0ciBpbiBkYXRhLmZlZWRiYWNrLnN1Z2dlc3Rpb25zXG5cdFx0XHRcdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiZGl2XCJcblx0XHRcdFx0ZS5jbGFzc0xpc3QgPSBcImFsZXJ0IGFsZXJ0LWluZm9cIlxuXHRcdFx0XHRlLmlubmVySFRNTCA9IFwiPHN0cm9uZz5TdWdnZXN0aW9uPC9zdHJvbmc+PGJyIC8+XCIgKyBzdHJcblx0XHRcdFx0ZVN1Z2dlc3Rpb25zLmFwcGVuZENoaWxkKCBlIClcblxuXHRcdGVDcmFjazEudmFsdWUgPVxuXHRcdFx0ZGF0YS5jcmFja190aW1lc19kaXNwbGF5Lm9ubGluZV90aHJvdHRsaW5nXzEwMF9wZXJfaG91clxuXHRcdGVDcmFjazIudmFsdWUgPVxuXHRcdFx0ZGF0YS5jcmFja190aW1lc19kaXNwbGF5Lm9ubGluZV9ub190aHJvdHRsaW5nXzEwX3Blcl9zZWNvbmRcblx0XHRlQ3JhY2szLnZhbHVlID1cblx0XHRcdGRhdGEuY3JhY2tfdGltZXNfZGlzcGxheS5vZmZsaW5lX3Nsb3dfaGFzaGluZ18xZTRfcGVyX3NlY29uZFxuXHRcdGVDcmFjazQudmFsdWUgPVxuXHRcdFx0ZGF0YS5jcmFja190aW1lc19kaXNwbGF5Lm9mZmxpbmVfZmFzdF9oYXNoaW5nXzFlMTBfcGVyX3NlY29uZFxuXHRcdGVDcmFjazUudmFsdWUgPSBlbmVyZ3lVc2UoIGRhdGEuZ3Vlc3NlcyApXG5cblx0XHRlU2VxTGlzdC5pbm5lckhUTUwgPSBcIlwiXG5cdFx0ZVNlcU91dHB1dC5pbm5lckhUTUwgPSBcIlwiXG5cdFx0Zm9yIHNlZyBpbiBkYXRhLnNlcXVlbmNlXG5cblx0XHRcdGRvICggc2VnICkgLT5cblx0XHRcdFx0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJhXCJcblx0XHRcdFx0ZS5ocmVmID0gXCIjXCJcblx0XHRcdFx0ZS5pbm5lclRleHQgPSBzZWcudG9rZW5cblx0XHRcdFx0ZS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgKCBlICkgLT5cblx0XHRcdFx0XHRhbmFseXplVG9rZW4oIHNlZyApXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cblx0XHRcdFx0ZWMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiY29kZVwiXG5cdFx0XHRcdGVjLmFwcGVuZENoaWxkKCBlIClcblxuXHRcdFx0XHRlU2VxTGlzdC5hcHBlbmRDaGlsZCggZWMgKVxuXG5cdGVIZWxwVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXHRcdGlmIGVIZWxwRGl2LnN0eWxlLmRpc3BsYXlcblx0XHRcdGVIZWxwRGl2LnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdFx0XHRlSGVscFRvZ2dsZS5jbGFzc0xpc3QuYWRkIFwiX3RvZ2dsZWRcIlxuXHRcdGVsc2Vcblx0XHRcdGVIZWxwRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXHRcdFx0ZUhlbHBUb2dnbGUuY2xhc3NMaXN0LnJlbW92ZSBcIl90b2dnbGVkXCJcblxuIyMgQlJVVEUgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZG8gLT5cblxuXHQjIyBBZHZhbmNlZCBPcHRpb25zIERpc3BsYXkgIyNcblxuXHRlQWR2VG9nZ2xlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJicnV0ZS0tYWR2LS10b2dnbGVcIlxuXHRlQWR2RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJicnV0ZS0tYWR2LS1kaXZcIlxuXG5cdGVBZHZUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdFx0aWYgZUFkdkRpdi5zdHlsZS5kaXNwbGF5XG5cdFx0XHRlQWR2RGl2LnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdFx0XHRlQWR2VG9nZ2xlLmNsYXNzTGlzdC5hZGQgXCJfdG9nZ2xlZFwiXG5cdFx0ZWxzZVxuXHRcdFx0ZUFkdkRpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblx0XHRcdGVBZHZUb2dnbGUuY2xhc3NMaXN0LnJlbW92ZSBcIl90b2dnbGVkXCJcblxuXHQjIyBFbGVtZW50cyAjI1xuXG5cdGVMZW5ndGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImJydXRlLS1sZW5ndGhcIlxuXHRlVXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImJydXRlLS11cHBlclwiXG5cdGVMb3dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYnJ1dGUtLWxvd2VyXCJcblx0ZURpZ2l0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiYnJ1dGUtLWRpZ2l0c1wiXG5cdGVTeW1ib2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJicnV0ZS0tc3ltYm9sc1wiXG5cdGVBbWJpZ3VvdXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImJydXRlLS1hbWJpZ3VvdXNcIlxuXHRlTWluRGlnaXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJicnV0ZS0tbWluZGlnaXRzXCJcblxuXHR2YWxpZENoYXJhY3RlcnMgPSBbXVxuXHR2YWxpZERpZ2l0cyA9IFtdXG5cblx0IyMgRnVuY3Rpb25zICMjXG5cblx0YW1iaWd1b3VzQ2hhcmFjdGVycyA9IFtcblx0XHQnQicsICdHJywgJ0knLCAnTycsICdRJywgJ0QnLCAnUycsICdaJ1xuXHRcdCdsJ1xuXHRcdCc4JywgJzYnLCAnMScsICcwJywgJzUnLCAnMidcblx0XVxuXG5cdGdlbmVyYXRlVmFsaWRDaGFyYWN0ZXJzID0gLT5cblx0XHR2YWxpZENoYXJhY3RlcnMgPSBbXVxuXHRcdHZhbGlkRGlnaXRzID0gW11cblxuXHRcdGZvciBpIGluIFszMy4uMTI2XVxuXHRcdFx0YyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoIGkgKVxuXG5cdFx0XHRjb250aW51ZSBpZiBjIGluIGFtYmlndW91c0NoYXJhY3RlcnMgYW5kIGVBbWJpZ3VvdXMuY2hlY2tlZFxuXG5cdFx0XHRpZiA0OCA8PSBpIDw9IDU3XG5cdFx0XHRcdGNvbnRpbnVlIGlmIG5vdCBlRGlnaXRzLmNoZWNrZWRcblx0XHRcdFx0dmFsaWRDaGFyYWN0ZXJzLnB1c2ggY1xuXHRcdFx0XHR2YWxpZERpZ2l0cy5wdXNoIGNcblx0XHRcdGVsc2UgaWYgNjUgPD0gaSA8PSA5MFxuXHRcdFx0XHRjb250aW51ZSBpZiBub3QgZVVwcGVyLmNoZWNrZWRcblx0XHRcdFx0dmFsaWRDaGFyYWN0ZXJzLnB1c2ggY1xuXHRcdFx0ZWxzZSBpZiA5NyA8PSBpIDw9IDEyMlxuXHRcdFx0XHRjb250aW51ZSBpZiBub3QgZUxvd2VyLmNoZWNrZWRcblx0XHRcdFx0dmFsaWRDaGFyYWN0ZXJzLnB1c2ggY1xuXHRcdFx0ZWxzZSBpZiBlU3ltYm9scy5jaGVja2VkXG5cdFx0XHRcdHZhbGlkQ2hhcmFjdGVycy5wdXNoIGNcblxuXHRnZW5lcmF0ZVZhbGlkQ2hhcmFjdGVycygpXG5cblx0IyMgR2VuZXJhdGlvbiBBbGdvcml0aG0gIyNcblxuXHRzaHVmZmxlQXJyYXkgPSAoIGFycmF5ICkgLT5cblx0XHRjID0gYXJyYXkubGVuZ3RoXG5cdFx0d2hpbGUgYyA+IDBcblx0XHRcdGkgPSBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogYyApXG5cblx0XHRcdGMtLVxuXG5cdFx0XHRbIGFycmF5W2NdLCBhcnJheVtpXSBdID0gWyBhcnJheVtpXSwgYXJyYXlbY10gXVxuXG5cdFx0cmV0dXJuIGFycmF5XG5cblx0c2hvd0Vycm9yID0gKCBzdHIgKSAtPlxuXHRcdGVPdXRwdXRFcnJvci5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRcdGVPdXRwdXRFcnJvci5pbm5lckhUTUwgPSBzdHJcblx0XHR0aHJvdyBlT3V0cHV0RXJyb3JcblxuXHRnZW5lcmF0ZUJydXRlUGFzc3dvcmQgPSAtPlxuXHRcdHRyeVxuXHRcdFx0IyMgVmFsaWRhdGlvblxuXHRcdFx0bGVuZ3RoID0gcGFyc2VJbnQoIGVMZW5ndGgudmFsdWUgKVxuXHRcdFx0bWluRGlnaXRzID0gcGFyc2VJbnQoIGVNaW5EaWdpdHMudmFsdWUgKVxuXG5cdFx0XHRpZiBpc05hTiggbGVuZ3RoIClcblx0XHRcdFx0dGhyb3cgXCJQYXNzd29yZCBsZW5ndGggbXVzdCBiZSBhbiBpbnRlZ2VyXCJcblx0XHRcdGlmIGxlbmd0aCA8PSAwXG5cdFx0XHRcdHRocm93IFwiUGFzc3dvcmQgbGVuZ3RoIG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm9cIlxuXHRcdFx0aWYgaXNOYU4oIG1pbkRpZ2l0cyApXG5cdFx0XHRcdG1pbkRpZ2l0cyA9IDBcblx0XHRcdGlmIG1pbkRpZ2l0cyA8IDBcblx0XHRcdFx0dGhyb3cgXCJNaW5pbXVtIERpZ2l0cyBtdXN0IGJlIHplcm8gb3IgZ3JlYXRlclwiXG5cdFx0XHRpZiBtaW5EaWdpdHMgPiBsZW5ndGhcblx0XHRcdFx0bWluRGlnaXRzID0gbGVuZ3RoXG5cdFx0XHRpZiBtaW5EaWdpdHMgPiAwXG5cdFx0XHRcdGVEaWdpdHMuY2hlY2tlZCA9IHRydWVcblx0XHRcdFx0Z2VuZXJhdGVWYWxpZENoYXJhY3RlcnMoKVxuXG5cdFx0XHRpZiBub3QgZVVwcGVyLmNoZWNrZWQgYW5kXG5cdFx0XHRcdG5vdCBlTG93ZXIuY2hlY2tlZCBhbmRcblx0XHRcdFx0bm90IGVEaWdpdHMuY2hlY2tlZCBhbmRcblx0XHRcdFx0bm90IGVTeW1ib2xzLmNoZWNrZWRcblxuXHRcdFx0XHRcdGVMb3dlci5jaGVja2VkID0gdHJ1ZVxuXHRcdFx0XHRcdGdlbmVyYXRlVmFsaWRDaGFyYWN0ZXJzKClcblxuXHRcdFx0IyMgRXhlY3V0aW9uXG5cdFx0XHRvdXQgPSBbXVxuXG5cdFx0XHRpZiBtaW5EaWdpdHMgPiAwXG5cdFx0XHRcdGZvciBbMS4ubWluRGlnaXRzXVxuXHRcdFx0XHRcdG91dC5wdXNoIHJhbmRvbUFycmF5KCB2YWxpZERpZ2l0cyApXG5cdFx0XHRpZiBsZW5ndGggPiBtaW5EaWdpdHNcblx0XHRcdFx0Zm9yIFsxLi4oIGxlbmd0aCAtIG1pbkRpZ2l0cyApXVxuXHRcdFx0XHRcdG91dC5wdXNoIHJhbmRvbUFycmF5KCB2YWxpZENoYXJhY3RlcnMgKVxuXG5cdFx0XHRzaHVmZmxlQXJyYXkoIG91dCApXG5cblx0XHRcdGVPdXRwdXRUZXh0LnZhbHVlID0gb3V0LmpvaW4gXCJcIlxuXHRcdFx0YW5hbHl6ZVN0cmVuZ3RoKClcblx0XHRjYXRjaCBleFxuXHRcdFx0aWYgdHlwZW9mKCBleCApID09IFwic3RyaW5nXCJcblx0XHRcdFx0ZU91dHB1dEVycm9yLnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdFx0XHRcdGVPdXRwdXRFcnJvci5pbm5lckhUTUwgPSBleFxuXHRcdFx0dGhyb3cgZXhcblxuXHQjIyBFdmVudHMgIyNcblxuXHRidWlsZEFuZEdlbmVyYXRlID0gLT5cblx0XHRnZW5lcmF0ZVZhbGlkQ2hhcmFjdGVycygpXG5cdFx0Z2VuZXJhdGVCcnV0ZVBhc3N3b3JkKClcblx0ZVVwcGVyLmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgYnVpbGRBbmRHZW5lcmF0ZVxuXHRlTG93ZXIuYWRkRXZlbnRMaXN0ZW5lciBcImNoYW5nZVwiLCBidWlsZEFuZEdlbmVyYXRlXG5cdGVTeW1ib2xzLmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgYnVpbGRBbmRHZW5lcmF0ZVxuXHRlQW1iaWd1b3VzLmFkZEV2ZW50TGlzdGVuZXIgXCJjaGFuZ2VcIiwgYnVpbGRBbmRHZW5lcmF0ZVxuXG5cdGVMZW5ndGguYWRkRXZlbnRMaXN0ZW5lciBcImNoYW5nZVwiLCBnZW5lcmF0ZUJydXRlUGFzc3dvcmRcblx0ZU1pbkRpZ2l0cy5hZGRFdmVudExpc3RlbmVyIFwiY2hhbmdlXCIsIGdlbmVyYXRlQnJ1dGVQYXNzd29yZFxuXG5cdGVEaWdpdHMuYWRkRXZlbnRMaXN0ZW5lciBcImNoYW5nZVwiLCAtPlxuXHRcdGlmIG5vdCBAY2hlY2tlZFxuXHRcdFx0ZU1pbkRpZ2l0cy52YWx1ZSA9IDBcblx0XHRidWlsZEFuZEdlbmVyYXRlKClcblxuZ2VuZXJhdGVCcnV0ZVBhc3N3b3JkKClcblxuIyMgRElDVElPTkFSWSAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZG8gLT5cblxuXHQjIyBFbGVtZW50cyAjI1xuXG5cdGVXb3JkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiZGljdC0td29yZHNcIlxuXHRlRG93bmxvYWRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImRpY3QtLWRvd25sb2FkaW5nXCJcblxuXHR3b3JkTGlzdCA9IG51bGxcblxuXHQjIyBHZW5lcmF0aW9uIEFsZ29yaXRobSAjI1xuXG5cdGxvYWRXb3JkTGlzdCA9IC0+XG5cdFx0aWYgd29yZExpc3QgPT0gMFxuXHRcdFx0cmV0dXJuXG5cdFx0d29yZExpc3QgPSAwXG5cblx0XHRyZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3Rcblx0XHRyZXEub3ZlcnJpZGVNaW1lVHlwZSBcImFwcGxpY2F0aW9uL2pzb25cIlxuXHRcdHJlcS5vcGVuIFwiR0VUXCIsIFwid29yZGxpc3QuanNvblwiXG5cdFx0cmVxLm9ubG9hZCA9IC0+XG5cdFx0XHRyZXR1cm4gaWYgcmVxLnJlYWR5U3RhdGUgIT0gNFxuXHRcdFx0aWYgcmVxLnN0YXR1cyA9PSAyMDBcblx0XHRcdFx0d29yZExpc3QgPSBKU09OLnBhcnNlKCByZXEucmVzcG9uc2VUZXh0IClcblx0XHRcdFx0ZURvd25sb2FkaW5nLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXHRcdFx0XHRnZW5lcmF0ZURpY3RQYXNzd29yZCgpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGVPdXRwdXRFcnJvci5zdHlsZS5kaXNwbGF5ID0gbnVsbFxuXHRcdFx0XHRlT3V0cHV0RXJyb3IuaW5uZXJIVE1MID0gXCJFcnJvciB3aGVuIGRvd25sb2FkaW5nIHdvcmQgbGlzdFwiXG5cdFx0XHRcdHdvcmRMaXN0ID0gbnVsbFxuXHRcdHJlcS5zZW5kIG51bGxcblxuXHRnZW5lcmF0ZURpY3RQYXNzd29yZCA9IC0+XG5cdFx0dHJ5XG5cdFx0XHQjIyBWYWxpZGF0aW9uXG5cdFx0XHR3b3JkcyA9IHBhcnNlSW50KCBlV29yZHMudmFsdWUgKVxuXG5cdFx0XHRpZiBpc05hTiggd29yZHMgKVxuXHRcdFx0XHR0aHJvdyBcIldvcmQgY291bnQgbXVzdCBiZSBhbiBpbnRlZ2VyXCJcblx0XHRcdGlmIHdvcmRzIDw9IDBcblx0XHRcdFx0dGhyb3cgXCJXb3JkIGNvdW50IG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm9cIlxuXHRcdFx0aWYgbm90IHdvcmRMaXN0XG5cdFx0XHRcdGxvYWRXb3JkTGlzdCgpXG5cdFx0XHRcdHJldHVyblxuXG5cdFx0XHQjIyBFeGVjdXRpb25cblx0XHRcdG91dCA9IFtdXG5cblx0XHRcdGZvciBbMS4ud29yZHNdXG5cdFx0XHRcdG91dC5wdXNoIHJhbmRvbUFycmF5KCB3b3JkTGlzdCApLnRvTG93ZXJDYXNlKClcblxuXHRcdFx0ZU91dHB1dFRleHQudmFsdWUgPSBvdXQuam9pbiBcIiBcIlxuXHRcdFx0YW5hbHl6ZVN0cmVuZ3RoKClcblx0XHRjYXRjaCBleFxuXHRcdFx0aWYgdHlwZW9mKCBleCApID09IFwic3RyaW5nXCJcblx0XHRcdFx0ZU91dHB1dEVycm9yLnN0eWxlLmRpc3BsYXkgPSBudWxsXG5cdFx0XHRcdGVPdXRwdXRFcnJvci5pbm5lckhUTUwgPSBleFxuXHRcdFx0Y29uc29sZS5lcnJvciBleFxuXG5cdCMjIEV2ZW50cyAjI1xuXG5cdGVXb3Jkcy5hZGRFdmVudExpc3RlbmVyIFwiY2hhbmdlXCIsIGdlbmVyYXRlRGljdFBhc3N3b3JkXG5cbmVFdmFsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lciBcImNoYW5nZVwiLCAtPlxuXHRlT3V0cHV0VGV4dC52YWx1ZSA9IGVFdmFsSW5wdXQudmFsdWVcblx0YW5hbHl6ZVN0cmVuZ3RoKClcbiJdfQ==
