(function() {
  var checkMaxSetting, eGameCard, eGameError, eGameGiveup, eGameGuess, eGameInputRow, eGameOutput, game, generateIntegers, generateNumberSequence, generateUniqueIntegers, resetGame, sAmount, sMax, sUnique,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  eGameCard = $("#game--card");

  eGameInputRow = $("#game--input--row");

  eGameError = $("#game--error");

  eGameOutput = $("#game--output");

  eGameGuess = $("#game--guess");

  eGameGiveup = $("#game--giveup");

  sAmount = $("#codebreaker--amount");

  sMax = $("#codebreaker--max");

  sUnique = $("#codebreaker--unique");

  game = null;

  generateIntegers = function(amt, max) {
    var k, ref, results;
    results = [];
    for (k = 1, ref = amt; 1 <= ref ? k <= ref : k >= ref; 1 <= ref ? k++ : k--) {
      results.push(Math.floor(Math.random() * max + 1));
    }
    return results;
  };

  generateUniqueIntegers = function(amt, max) {
    var i, j, k, nums, ref, ref1, x;
    nums = (function() {
      var k, ref, results;
      results = [];
      for (x = k = 1, ref = max; 1 <= ref ? k <= ref : k >= ref; x = 1 <= ref ? ++k : --k) {
        results.push(x);
      }
      return results;
    })();
    for (i = k = ref = nums.length - 1; k >= 1; i = k += -1) {
      j = Math.floor(Math.random() * (i + 1));
      ref1 = [nums[j], nums[i]], nums[i] = ref1[0], nums[j] = ref1[1];
    }
    return nums.slice(0, amt);
  };

  generateNumberSequence = function(amt) {
    var k, ref, results, x;
    results = [];
    for (x = k = 1, ref = amt; 1 <= ref ? k <= ref : k >= ref; x = 1 <= ref ? ++k : --k) {
      results.push(x);
    }
    return results;
  };

  checkMaxSetting = function() {
    if (!sUnique.prop("checked")) {
      return;
    }
    if (parseInt(sMax.val()) < parseInt(sAmount.val())) {
      alert("Maximum value must be greater than or equal to amount of numbers to solve!");
      return sMax.val(sAmount.val());
    }
  };

  resetGame = function() {
    var amount, i, j, k, max, ref, results, size, unique;
    amount = parseInt(sAmount.val());
    max = parseInt(sMax.val());
    unique = sUnique.prop("checked");
    if (!amount || amount < 1 || !max || max < 2) {
      return;
    }
    game = {
      amount: amount,
      max: max,
      unique: unique,
      numbers: unique ? generateUniqueIntegers(amount, max) : generateIntegers(amount, max),
      guesses: 0,
      hints: 0
    };
    eGameOutput.empty();
    eGameGuess.prop("disabled", false);
    eGameGiveup.prop("disabled", false);
    eGameInputRow.empty();
    size = amount < 5 ? "col" : amount < 7 ? "col-sm" : amount < 9 ? "col-md" : "col-12 mt-2";
    results = [];
    for (i = k = 1, ref = amount; 1 <= ref ? k <= ref : k >= ref; i = 1 <= ref ? ++k : --k) {
      results.push(eGameInputRow.append("<div class=\"" + size + "\">\n	<select class=\"form-control\" id=\"game--input--" + i + "\">\n		" + (((function() {
        var l, ref1, results1;
        results1 = [];
        for (j = l = 1, ref1 = max; 1 <= ref1 ? l <= ref1 : l >= ref1; j = 1 <= ref1 ? ++l : --l) {
          results1.push("<option>" + j + "</option>");
        }
        return results1;
      })()).join("")) + "\n	</select>\n</div>"));
    }
    return results;
  };

  resetGame();

  sAmount.change(function() {
    var amount;
    amount = parseInt($(this).val());
    if (amount == null) {
      alert("Amount must be set to a valid integer!");
      return event.preventDefault();
    }
    if (amount < 1) {
      alert("Amount must be set to an integer greater than 0!");
      return event.preventDefault();
    }
    checkMaxSetting();
    return resetGame();
  });

  sMax.change(function() {
    var max;
    max = parseInt($(this).val());
    if (max == null) {
      alert("Maximum must be set to a valid integer!");
      return event.preventDefault();
    }
    if (max < 2) {
      alert("Maximum must be set to an integer greater than 1!");
      return event.preventDefault();
    }
    checkMaxSetting();
    return resetGame();
  });

  sUnique.change(function() {
    checkMaxSetting();
    return resetGame();
  });

  eGameGuess.click(function() {
    var amt, correct, curnums, guess, i, ix, k, l, len, len1, m, n, near, ref;
    guess = [];
    for (i = k = 1, ref = game.amount; 1 <= ref ? k <= ref : k >= ref; i = 1 <= ref ? ++k : --k) {
      amt = parseInt($("#game--input--" + i).val());
      if (!amt) {
        return;
      }
      if (game.unique && indexOf.call(guess, amt) >= 0) {
        eGameError.show();
        eGameError.text("Your guess must only consist of unique numbers! (" + amt + " is repeated)");
        return;
      } else {
        eGameError.hide();
        guess.push(amt);
      }
    }
    correct = 0;
    near = 0;
    game.guesses++;
    curnums = game.numbers.slice(0);
    for (i = l = 0, len = guess.length; l < len; i = ++l) {
      n = guess[i];
      if (curnums[i] === n) {
        correct++;
        curnums[i] = null;
      }
    }
    for (m = 0, len1 = guess.length; m < len1; m++) {
      n = guess[m];
      if ((ix = curnums.indexOf(n)) > -1) {
        near++;
        curnums[ix] = null;
      }
    }
    if (correct === game.amount) {
      eGameOutput.prepend("<div class=\"card card-body mt-2 bg-success text-light\">\n	<small>Guess " + game.guesses + "</small>\n	<span class=\"lead\">" + (guess.join(" ")) + "</span>\n	<span>All correct!</span>\n</div>");
      eGameGuess.prop("disabled", true);
      return eGameGiveup.prop("disabled", true);
    } else {
      return eGameOutput.prepend("<div class=\"card card-body mt-2\">\n	<small class=\"text-muted\">Guess " + game.guesses + "</small>\n	<span class=\"lead\">" + (guess.join(" ")) + "</span>\n	<span>\n		<span class=\"text-success\">\n			<span class=\"lead font-weight-bold\">" + correct + "</span>\n			correct</span>,\n		<span class=\"text-warning\">\n			<span class=\"lead font-weight-bold\">" + near + "</span>\n			in the wrong place</span>,\n		<span class=\"text-danger\">\n			<span class=\"lead font-weight-bold\">\n				" + (game.amount - correct - near) + "\n			</span> incorrect</span>\n	</span>\n</div>");
    }
  });

  $("#game--reset").click(function() {
    if (confirm("Are you sure you want to start a new game?")) {
      return resetGame();
    }
  });

  eGameGiveup.click(function() {
    if (confirm("Are you sure you want to give up?")) {
      eGameGuess.prop("disabled", true);
      eGameGiveup.prop("disabled", true);
      return eGameOutput.prepend("<div class=\"card card-body mt-2 bg-warning\">\n	<small>Gave Up - Answer</small>\n	<span class=\"lead\">" + (game.numbers.join(" ")) + "</span>\n</div>");
    }
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9jb2RlYnJlYWtlci9pbmRleC5qcyIsInNvdXJjZXMiOlsiZ2FkZ2V0cy9jb2RlYnJlYWtlci9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7QUFBQSxNQUFBLHNNQUFBO0lBQUE7O0VBQUEsU0FBQSxHQUFZLENBQUEsQ0FBRyxhQUFIOztFQUNaLGFBQUEsR0FBZ0IsQ0FBQSxDQUFHLG1CQUFIOztFQUNoQixVQUFBLEdBQWEsQ0FBQSxDQUFHLGNBQUg7O0VBQ2IsV0FBQSxHQUFjLENBQUEsQ0FBRyxlQUFIOztFQUNkLFVBQUEsR0FBYSxDQUFBLENBQUcsY0FBSDs7RUFDYixXQUFBLEdBQWMsQ0FBQSxDQUFHLGVBQUg7O0VBQ2QsT0FBQSxHQUFVLENBQUEsQ0FBRyxzQkFBSDs7RUFDVixJQUFBLEdBQU8sQ0FBQSxDQUFHLG1CQUFIOztFQUNQLE9BQUEsR0FBVSxDQUFBLENBQUcsc0JBQUg7O0VBRVYsSUFBQSxHQUFPOztFQUlQLGdCQUFBLEdBQW1CLFNBQUUsR0FBRixFQUFPLEdBQVA7QUFDbEIsUUFBQTtBQUFFO1NBQTBDLHNFQUExQzttQkFBQSxJQUFJLENBQUMsS0FBTCxDQUFZLElBQUksQ0FBQyxNQUFMLENBQUEsQ0FBQSxHQUFnQixHQUFoQixHQUFzQixDQUFsQztBQUFBOztFQURnQjs7RUFHbkIsc0JBQUEsR0FBeUIsU0FBRSxHQUFGLEVBQU8sR0FBUDtBQUN4QixRQUFBO0lBQUEsSUFBQTs7QUFBUztXQUFXLDhFQUFYO3FCQUFBO0FBQUE7OztBQUNULFNBQVMsa0RBQVQ7TUFDQyxDQUFBLEdBQUksSUFBSSxDQUFDLEtBQUwsQ0FBWSxJQUFJLENBQUMsTUFBTCxDQUFBLENBQUEsR0FBZ0IsQ0FBRSxDQUFBLEdBQUksQ0FBTixDQUE1QjtNQUNKLE9BQXVCLENBQUUsSUFBSyxDQUFBLENBQUEsQ0FBUCxFQUFXLElBQUssQ0FBQSxDQUFBLENBQWhCLENBQXZCLEVBQUUsSUFBSyxDQUFBLENBQUEsV0FBUCxFQUFXLElB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Q0FBa0IsR0FBbEIsQ0FBRCxDQUhGLEdBRzBCLGlCQUg5QyxFQUhEOztFQURpQixDQUFsQjtBQXpLQSIsInNvdXJjZXNDb250ZW50IjpbIiMjIEVsZW1lbnRzICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmVHYW1lQ2FyZCA9ICQoIFwiI2dhbWUtLWNhcmRcIiApXG5lR2FtZUlucHV0Um93ID0gJCggXCIjZ2FtZS0taW5wdXQtLXJvd1wiIClcbmVHYW1lRXJyb3IgPSAkKCBcIiNnYW1lLS1lcnJvclwiIClcbmVHYW1lT3V0cHV0ID0gJCggXCIjZ2FtZS0tb3V0cHV0XCIgKVxuZUdhbWVHdWVzcyA9ICQoIFwiI2dhbWUtLWd1ZXNzXCIgKVxuZUdhbWVHaXZldXAgPSAkKCBcIiNnYW1lLS1naXZldXBcIiApXG5zQW1vdW50ID0gJCggXCIjY29kZWJyZWFrZXItLWFtb3VudFwiIClcbnNNYXggPSAkKCBcIiNjb2RlYnJlYWtlci0tbWF4XCIgKVxuc1VuaXF1ZSA9ICQoIFwiI2NvZGVicmVha2VyLS11bmlxdWVcIiApXG5cbmdhbWUgPSBudWxsXG5cbiMjIEZ1bmN0aW9ucyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmdlbmVyYXRlSW50ZWdlcnMgPSAoIGFtdCwgbWF4ICkgLT5cblx0KCBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogbWF4ICsgMSApIGZvciBbMS4uYW10XSApXG5cbmdlbmVyYXRlVW5pcXVlSW50ZWdlcnMgPSAoIGFtdCwgbWF4ICkgLT5cblx0bnVtcyA9ICggeCBmb3IgeCBpbiBbMS4ubWF4XSApXG5cdGZvciBpIGluIFsoIG51bXMubGVuZ3RoIC0gMSApLi4xXSBieSAtMVxuXHRcdGogPSBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogKCBpICsgMSApIClcblx0XHRbIG51bXNbaV0sIG51bXNbal0gXSA9IFsgbnVtc1tqXSwgbnVtc1tpXSBdXG5cdHJldHVybiBudW1zWy4uLmFtdF1cblxuZ2VuZXJhdGVOdW1iZXJTZXF1ZW5jZSA9ICggYW10ICkgLT5cblx0KCB4IGZvciB4IGluIFsxLi5hbXRdIClcblxuY2hlY2tNYXhTZXR0aW5nID0gLT5cblx0aWYgbm90IHNVbmlxdWUucHJvcCggXCJjaGVja2VkXCIgKVxuXHRcdHJldHVyblxuXHRpZiBwYXJzZUludCggc01heC52YWwoKSApIDwgcGFyc2VJbnQoIHNBbW91bnQudmFsKCkgKVxuXHRcdGFsZXJ0KCBcIk1heGltdW0gdmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gYW1vdW50IG9mXG5cdFx0XHRudW1iZXJzIHRvIHNvbHZlIVwiIClcblx0XHRzTWF4LnZhbCggc0Ftb3VudC52YWwoKSApXG5cbnJlc2V0R2FtZSA9IC0+XG5cdGFtb3VudCA9IHBhcnNlSW50KCBzQW1vdW50LnZhbCgpIClcblx0bWF4ID0gcGFyc2VJbnQoIHNNYXgudmFsKCkgKVxuXHR1bmlxdWUgPSBzVW5pcXVlLnByb3AoIFwiY2hlY2tlZFwiIClcblxuXHRpZiBub3QgYW1vdW50IG9yIGFtb3VudCA8IDEgb3Igbm90IG1heCBvciBtYXggPCAyXG5cdFx0cmV0dXJuXG5cblx0Z2FtZSA9XG5cdFx0YW1vdW50OiBhbW91bnRcblx0XHRtYXg6IG1heFxuXHRcdHVuaXF1ZTogdW5pcXVlXG5cdFx0bnVtYmVyczogaWYgdW5pcXVlIHRoZW4gZ2VuZXJhdGVVbmlxdWVJbnRlZ2VycyggYW1vdW50LCBtYXggKSBlbHNlXG5cdFx0XHRnZW5lcmF0ZUludGVnZXJzKCBhbW91bnQsIG1heCApXG5cdFx0Z3Vlc3NlczogMFxuXHRcdGhpbnRzOiAwXG5cblx0ZUdhbWVPdXRwdXQuZW1wdHkoKVxuXHRlR2FtZUd1ZXNzLnByb3AoIFwiZGlzYWJsZWRcIiwgZmFsc2UgKVxuXHRlR2FtZUdpdmV1cC5wcm9wKCBcImRpc2FibGVkXCIsIGZhbHNlIClcblx0ZUdhbWVJbnB1dFJvdy5lbXB0eSgpXG5cblx0c2l6ZSA9IGlmIGFtb3VudCA8IDVcblx0XHRcdFwiY29sXCJcblx0XHRlbHNlIGlmIGFtb3VudCA8IDdcblx0XHRcdFwiY29sLXNtXCJcblx0XHRlbHNlIGlmIGFtb3VudCA8IDlcblx0XHRcdFwiY29sLW1kXCJcblx0XHRlbHNlIFwiY29sLTEyIG10LTJcIlxuXHRmb3IgaSBpbiBbMS4uYW1vdW50XVxuXHRcdGVHYW1lSW5wdXRSb3cuYXBwZW5kIFwiXCJcIlxuXHRcdFx0PGRpdiBjbGFzcz1cIiN7c2l6ZX1cIj5cblx0XHRcdFx0PHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwiZ2FtZS0taW5wdXQtLSN7aX1cIj5cblx0XHRcdFx0XHQje1xuXHRcdFx0XHRcdCggZm9yIGogaW4gWzEuLm1heF1cblx0XHRcdFx0XHRcdFwiPG9wdGlvbj4je2p9PC9vcHRpb24+XCIgKS5qb2luKCBcIlwiIClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdDwvc2VsZWN0PlxuXHRcdFx0PC9kaXY+XG5cdFx0XCJcIlwiXG5yZXNldEdhbWUoKVxuXG4jIyBFdmVudHMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5zQW1vdW50LmNoYW5nZSAtPlxuXHRhbW91bnQgPSBwYXJzZUludCggJCggdGhpcyApLnZhbCgpIClcblx0aWYgbm90IGFtb3VudD9cblx0XHRhbGVydCBcIkFtb3VudCBtdXN0IGJlIHNldCB0byBhIHZhbGlkIGludGVnZXIhXCJcblx0XHRyZXR1cm4gZXZlbnQucHJldmVudERlZmF1bHQoKVxuXHRpZiBhbW91bnQgPCAxXG5cdFx0YWxlcnQgXCJBbW91bnQgbXVzdCBiZSBzZXQgdG8gYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gMCFcIlxuXHRcdHJldHVybiBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cdGNoZWNrTWF4U2V0dGluZygpXG5cdHJlc2V0R2FtZSgpXG5cbnNNYXguY2hhbmdlIC0+XG5cdG1heCA9IHBhcnNlSW50KCAkKCB0aGlzICkudmFsKCkgKVxuXHRpZiBub3QgbWF4P1xuXHRcdGFsZXJ0IFwiTWF4aW11bSBtdXN0IGJlIHNldCB0byBhIHZhbGlkIGludGVnZXIhXCJcblx0XHRyZXR1cm4gZXZlbnQucHJldmVudERlZmF1bHQoKVxuXHRpZiBtYXggPCAyXG5cdFx0YWxlcnQgXCJNYXhpbXVtIG11c3QgYmUgc2V0IHRvIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIDEhXCJcblx0XHRyZXR1cm4gZXZlbnQucHJldmVudERlZmF1bHQoKVxuXHRjaGVja01heFNldHRpbmcoKVxuXHRyZXNldEdhbWUoKVxuXG5zVW5pcXVlLmNoYW5nZSAtPlxuXHRjaGVja01heFNldHRpbmcoKVxuXHRyZXNldEdhbWUoKVxuXG5lR2FtZUd1ZXNzLmNsaWNrIC0+XG5cdGd1ZXNzID0gW11cblx0Zm9yIGkgaW4gWzEuLmdhbWUuYW1vdW50XVxuXHRcdGFtdCA9IHBhcnNlSW50KCAkKCBcIiNnYW1lLS1pbnB1dC0tI3tpfVwiICkudmFsKCkgKVxuXHRcdHJldHVybiBpZiBub3QgYW10XG5cdFx0aWYgZ2FtZS51bmlxdWUgYW5kIGFtdCBpbiBndWVzc1xuXHRcdFx0ZUdhbWVFcnJvci5zaG93KClcblx0XHRcdGVHYW1lRXJyb3IudGV4dCBcIllvdXIgZ3Vlc3MgbXVzdCBvbmx5IGNvbnNpc3Qgb2YgdW5pcXVlIG51bWJlcnMhXG5cdFx0XHRcdCgje2FtdH0gaXMgcmVwZWF0ZWQpXCJcblx0XHRcdHJldHVyblxuXHRcdGVsc2Vcblx0XHRcdGVHYW1lRXJyb3IuaGlkZSgpXG5cdFx0XHRndWVzcy5wdXNoIGFtdFxuXG5cdGNvcnJlY3QgPSAwXG5cdG5lYXIgPSAwXG5cdGdhbWUuZ3Vlc3NlcysrXG5cblx0Y3VybnVtcyA9IGdhbWUubnVtYmVyc1suLl1cblx0Zm9yIG4sIGkgaW4gZ3Vlc3Ncblx0XHRpZiBjdXJudW1zW2ldID09IG5cblx0XHRcdGNvcnJlY3QrK1xuXHRcdFx0Y3VybnVtc1tpXSA9IG51bGxcblxuXHRmb3IgbiBpbiBndWVzc1xuXHRcdGlmICggaXggPSBjdXJudW1zLmluZGV4T2YoIG4gKSApID4gLTFcblx0XHRcdG5lYXIrK1xuXHRcdFx0Y3VybnVtc1tpeF0gPSBudWxsXG5cblx0aWYgY29ycmVjdCA9PSBnYW1lLmFtb3VudFxuXHRcdGVHYW1lT3V0cHV0LnByZXBlbmQgXCJcIlwiXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiY2FyZCBjYXJkLWJvZHkgbXQtMiBiZy1zdWNjZXNzIHRleHQtbGlnaHRcIj5cblx0XHRcdFx0PHNtYWxsPkd1ZXNzICN7Z2FtZS5ndWVzc2VzfTwvc21hbGw+XG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwibGVhZFwiPiN7Z3Vlc3Muam9pbihcIiBcIil9PC9zcGFuPlxuXHRcdFx0XHQ8c3Bhbj5BbGwgY29ycmVjdCE8L3NwYW4+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcIlwiXCJcblx0XHRlR2FtZUd1ZXNzLnByb3AoIFwiZGlzYWJsZWRcIiwgdHJ1ZSApXG5cdFx0ZUdhbWVHaXZldXAucHJvcCggXCJkaXNhYmxlZFwiLCB0cnVlIClcblx0ZWxzZVxuXHRcdGVHYW1lT3V0cHV0LnByZXBlbmQgXCJcIlwiXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiY2FyZCBjYXJkLWJvZHkgbXQtMlwiPlxuXHRcdFx0XHQ8c21hbGwgY2xhc3M9XCJ0ZXh0LW11dGVkXCI+R3Vlc3MgI3tnYW1lLmd1ZXNzZXN9PC9zbWFsbD5cblx0XHRcdFx0PHNwYW4gY2xhc3M9XCJsZWFkXCI+I3tndWVzcy5qb2luKFwiIFwiKX08L3NwYW4+XG5cdFx0XHRcdDxzcGFuPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwidGV4dC1zdWNjZXNzXCI+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImxlYWQgZm9udC13ZWlnaHQtYm9sZFwiPiN7Y29ycmVjdH08L3NwYW4+XG5cdFx0XHRcdFx0XHRjb3JyZWN0PC9zcGFuPixcblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInRleHQtd2FybmluZ1wiPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJsZWFkIGZvbnQtd2VpZ2h0LWJvbGRcIj4je25lYXJ9PC9zcGFuPlxuXHRcdFx0XHRcdFx0aW4gdGhlIHdyb25nIHBsYWNlPC9zcGFuPixcblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCI+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImxlYWQgZm9udC13ZWlnaHQtYm9sZFwiPlxuXHRcdFx0XHRcdFx0XHQje2dhbWUuYW1vdW50IC0gY29ycmVjdCAtIG5lYXJ9XG5cdFx0XHRcdFx0XHQ8L3NwYW4+IGluY29ycmVjdDwvc3Bhbj5cblx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0PC9kaXY+XG5cdFx0XCJcIlwiXG5cblxuJCggXCIjZ2FtZS0tcmVzZXRcIiApLmNsaWNrIC0+XG5cdGlmIGNvbmZpcm0oIFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHN0YXJ0IGEgbmV3IGdhbWU/XCIgKVxuXHRcdHJlc2V0R2FtZSgpXG5cbmVHYW1lR2l2ZXVwLmNsaWNrIC0+XG5cdGlmIGNvbmZpcm0oIFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGdpdmUgdXA/XCIgKVxuXHRcdGVHYW1lR3Vlc3MucHJvcCggXCJkaXNhYmxlZFwiLCB0cnVlIClcblx0XHRlR2FtZUdpdmV1cC5wcm9wKCBcImRpc2FibGVkXCIsIHRydWUgKVxuXHRcdGVHYW1lT3V0cHV0LnByZXBlbmQgXCJcIlwiXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiY2FyZCBjYXJkLWJvZHkgbXQtMiBiZy13YXJuaW5nXCI+XG5cdFx0XHRcdDxzbWFsbD5HYXZlIFVwIC0gQW5zd2VyPC9zbWFsbD5cblx0XHRcdFx0PHNwYW4gY2xhc3M9XCJsZWFkXCI+I3tnYW1lLm51bWJlcnMuam9pbihcIiBcIil9PC9zcGFuPlxuXHRcdFx0PC9kaXY+XG5cdFx0XCJcIlwiXG4iXX0=
