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
    var nums, x;
    nums = (function() {
      var k, ref, results;
      results = [];
      for (x = k = 1, ref = max; 1 <= ref ? k <= ref : k >= ref; x = 1 <= ref ? ++k : --k) {
        results.push(x);
      }
      return results;
    })();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9jb2RlYnJlYWtlci9pbmRleC5qcyIsInNvdXJjZXMiOlsiZ2FkZ2V0cy9jb2RlYnJlYWtlci9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7QUFBQSxNQUFBLHNNQUFBO0lBQUE7O0VBQUEsU0FBQSxHQUFZLENBQUEsQ0FBRyxhQUFIOztFQUNaLGFBQUEsR0FBZ0IsQ0FBQSxDQUFHLG1CQUFIOztFQUNoQixVQUFBLEdBQWEsQ0FBQSxDQUFHLGNBQUg7O0VBQ2IsV0FBQSxHQUFjLENBQUEsQ0FBRyxlQUFIOztFQUNkLFVBQUEsR0FBYSxDQUFBLENBQUcsY0FBSDs7RUFDYixXQUFBLEdBQWMsQ0FBQSxDQUFHLGVBQUg7O0VBQ2QsT0FBQSxHQUFVLENBQUEsQ0FBRyxzQkFBSDs7RUFDVixJQUFBLEdBQU8sQ0FBQSxDQUFHLG1CQUFIOztFQUNQLE9BQUEsR0FBVSxDQUFBLENBQUcsc0JBQUg7O0VBRVYsSUFBQSxHQUFPOztFQUlQLGdCQUFBLEdBQW1CLFNBQUUsR0FBRixFQUFPLEdBQVA7QUFDbEIsUUFBQTtBQUFFO1NBQTBDLHNFQUExQzttQkFBQSxJQUFJLENBQUMsS0FBTCxDQUFZLElBQUksQ0FBQyxNQUFMLENBQUEsQ0FBQSxHQUFnQixHQUFoQixHQUFzQixDQUFsQztBQUFBOztFQURnQjs7RUFHbkIsc0JBQUEsR0FBeUIsU0FBRSxHQUFGLEVBQU8sR0FBUDtBQUV4QixRQUFBO0lBQUEsSUFBQTs7QUFBUztXQUFXLDhFQUFYO3FCQUFBO0FBQUE7OztBQUNULFdBQU8sSUFBSztFQUhZOztFQUt6QixzQkFBQSxHQUF5QixTQUFFLEdBQUY7QUFDeEIsUUFBQTtBQUFFO1NBQVcsOEVBQVg7bUJBQUE7QUFBQTs7RUFEc0I7O0VBR3pCLGVBQUEsR0FBa0IsU0FBQTtJQUNqQixJQUFHLENBQUksT0FBTyxDQUFDLElBQVIsQ0FBYyxTQUFkLENBQVA7QUFDQyxhQUREOztJQUVBLElBQUcsUUFBQSxDQUFVLElBQUksQ0FBQyxHQUFM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aUIsVUFBakIsRUFBNkIsSUFBN0I7YUFDQSxXQUFXLENBQUMsSUFBWixDQUFrQixVQUFsQixFQUE4QixJQUE5QixFQVREO0tBQUEsTUFBQTthQVdDLFdBQVcsQ0FBQyxPQUFaLENBQW9CLDBFQUFBLEdBRWdCLElBQUksQ0FBQyxPQUZyQixHQUU2QixrQ0FGN0IsR0FHRSxDQUFDLEtBQUssQ0FBQyxJQUFOLENBQVcsR0FBWCxDQUFELENBSEYsR0FHbUIsOEZBSG5CLEdBTXNCLE9BTnRCLEdBTThCLHlHQU45QixHQVNzQixJQVR0QixHQVMyQix5SEFUM0IsR0FhZCxDQUFDLElBQUksQ0FBQyxNQUFMLEdBQWMsT0FBZCxHQUF3QixJQUF6QixDQWJjLEdBYWdCLGlEQWJwQyxFQVhEOztFQTdCZ0IsQ0FBakI7O0VBNERBLENBQUEsQ0FBRyxjQUFILENBQW1CLENBQUMsS0FBcEIsQ0FBMEIsU0FBQTtJQUN6QixJQUFHLE9BQUEsQ0FBUyw0Q0FBVCxDQUFIO2FBQ0MsU0FBQSxDQUFBLEVBREQ7O0VBRHlCLENBQTFCOztFQUlBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLFNBQUE7SUFDakIsSUFBRyxPQUFBLENBQVMsbUNBQVQsQ0FBSDtNQUNDLFVBQVUsQ0FBQyxJQUFYLENBQWlCLFVBQWpCLEVBQTZCLElBQTdCO01BQ0EsV0FBVyxDQUFDLElBQVosQ0FBa0IsVUFBbEIsRUFBOEIsSUFBOUI7YUFDQSxXQUFXLENBQUMsT0FBWixDQUFvQiwwR0FBQSxHQUdFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFiLENBQWtCLEdBQWxCLENBQUQsQ0FIRixHQUcwQixpQkFIOUMsRUFIRDs7RUFEaUIsQ0FBbEI7QUF2S0EiLCJzb3VyY2VzQ29udGVudCI6WyIjIyBFbGVtZW50cyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5lR2FtZUNhcmQgPSAkKCBcIiNnYW1lLS1jYXJkXCIgKVxuZUdhbWVJbnB1dFJvdyA9ICQoIFwiI2dhbWUtLWlucHV0LS1yb3dcIiApXG5lR2FtZUVycm9yID0gJCggXCIjZ2FtZS0tZXJyb3JcIiApXG5lR2FtZU91dHB1dCA9ICQoIFwiI2dhbWUtLW91dHB1dFwiIClcbmVHYW1lR3Vlc3MgPSAkKCBcIiNnYW1lLS1ndWVzc1wiIClcbmVHYW1lR2l2ZXVwID0gJCggXCIjZ2FtZS0tZ2l2ZXVwXCIgKVxuc0Ftb3VudCA9ICQoIFwiI2NvZGVicmVha2VyLS1hbW91bnRcIiApXG5zTWF4ID0gJCggXCIjY29kZWJyZWFrZXItLW1heFwiIClcbnNVbmlxdWUgPSAkKCBcIiNjb2RlYnJlYWtlci0tdW5pcXVlXCIgKVxuXG5nYW1lID0gbnVsbFxuXG4jIyBGdW5jdGlvbnMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5nZW5lcmF0ZUludGVnZXJzID0gKCBhbXQsIG1heCApIC0+XG5cdCggTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIG1heCArIDEgKSBmb3IgWzEuLmFtdF0gKVxuXG5nZW5lcmF0ZVVuaXF1ZUludGVnZXJzID0gKCBhbXQsIG1heCApIC0+XG5cdCMgVE9ETzogU2h1ZmZsZSB0aGlzIGFycmF5XG5cdG51bXMgPSAoIHggZm9yIHggaW4gWzEuLm1heF0gKVxuXHRyZXR1cm4gbnVtc1suLi5hbXRdXG5cbmdlbmVyYXRlTnVtYmVyU2VxdWVuY2UgPSAoIGFtdCApIC0+XG5cdCggeCBmb3IgeCBpbiBbMS4uYW10XSApXG5cbmNoZWNrTWF4U2V0dGluZyA9IC0+XG5cdGlmIG5vdCBzVW5pcXVlLnByb3AoIFwiY2hlY2tlZFwiIClcblx0XHRyZXR1cm5cblx0aWYgcGFyc2VJbnQoIHNNYXgudmFsKCkgKSA8IHBhcnNlSW50KCBzQW1vdW50LnZhbCgpIClcblx0XHRhbGVydCggXCJNYXhpbXVtIHZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIGFtb3VudCBvZlxuXHRcdFx0bnVtYmVycyB0byBzb2x2ZSFcIiApXG5cdFx0c01heC52YWwoIHNBbW91bnQudmFsKCkgKVxuXG5yZXNldEdhbWUgPSAtPlxuXHRhbW91bnQgPSBwYXJzZUludCggc0Ftb3VudC52YWwoKSApXG5cdG1heCA9IHBhcnNlSW50KCBzTWF4LnZhbCgpIClcblx0dW5pcXVlID0gc1VuaXF1ZS5wcm9wKCBcImNoZWNrZWRcIiApXG5cblx0aWYgbm90IGFtb3VudCBvciBhbW91bnQgPCAxIG9yIG5vdCBtYXggb3IgbWF4IDwgMlxuXHRcdHJldHVyblxuXG5cdGdhbWUgPVxuXHRcdGFtb3VudDogYW1vdW50XG5cdFx0bWF4OiBtYXhcblx0XHR1bmlxdWU6IHVuaXF1ZVxuXHRcdG51bWJlcnM6IGlmIHVuaXF1ZSB0aGVuIGdlbmVyYXRlVW5pcXVlSW50ZWdlcnMoIGFtb3VudCwgbWF4ICkgZWxzZVxuXHRcdFx0Z2VuZXJhdGVJbnRlZ2VycyggYW1vdW50LCBtYXggKVxuXHRcdGd1ZXNzZXM6IDBcblx0XHRoaW50czogMFxuXG5cdGVHYW1lT3V0cHV0LmVtcHR5KClcblx0ZUdhbWVHdWVzcy5wcm9wKCBcImRpc2FibGVkXCIsIGZhbHNlIClcblx0ZUdhbWVHaXZldXAucHJvcCggXCJkaXNhYmxlZFwiLCBmYWxzZSApXG5cdGVHYW1lSW5wdXRSb3cuZW1wdHkoKVxuXG5cdHNpemUgPSBpZiBhbW91bnQgPCA1XG5cdFx0XHRcImNvbFwiXG5cdFx0ZWxzZSBpZiBhbW91bnQgPCA3XG5cdFx0XHRcImNvbC1zbVwiXG5cdFx0ZWxzZSBpZiBhbW91bnQgPCA5XG5cdFx0XHRcImNvbC1tZFwiXG5cdFx0ZWxzZSBcImNvbC0xMiBtdC0yXCJcblx0Zm9yIGkgaW4gWzEuLmFtb3VudF1cblx0XHRlR2FtZUlucHV0Um93LmFwcGVuZCBcIlwiXCJcblx0XHRcdDxkaXYgY2xhc3M9XCIje3NpemV9XCI+XG5cdFx0XHRcdDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cImdhbWUtLWlucHV0LS0je2l9XCI+XG5cdFx0XHRcdFx0I3tcblx0XHRcdFx0XHQoIGZvciBqIGluIFsxLi5tYXhdXG5cdFx0XHRcdFx0XHRcIjxvcHRpb24+I3tqfTwvb3B0aW9uPlwiICkuam9pbiggXCJcIiApXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQ8L3NlbGVjdD5cblx0XHRcdDwvZGl2PlxuXHRcdFwiXCJcIlxucmVzZXRHYW1lKClcblxuIyMgRXZlbnRzICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuc0Ftb3VudC5jaGFuZ2UgLT5cblx0YW1vdW50ID0gcGFyc2VJbnQoICQoIHRoaXMgKS52YWwoKSApXG5cdGlmIG5vdCBhbW91bnQ/XG5cdFx0YWxlcnQgXCJBbW91bnQgbXVzdCBiZSBzZXQgdG8gYSB2YWxpZCBpbnRlZ2VyIVwiXG5cdFx0cmV0dXJuIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblx0aWYgYW1vdW50IDwgMVxuXHRcdGFsZXJ0IFwiQW1vdW50IG11c3QgYmUgc2V0IHRvIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIDAhXCJcblx0XHRyZXR1cm4gZXZlbnQucHJldmVudERlZmF1bHQoKVxuXHRjaGVja01heFNldHRpbmcoKVxuXHRyZXNldEdhbWUoKVxuXG5zTWF4LmNoYW5nZSAtPlxuXHRtYXggPSBwYXJzZUludCggJCggdGhpcyApLnZhbCgpIClcblx0aWYgbm90IG1heD9cblx0XHRhbGVydCBcIk1heGltdW0gbXVzdCBiZSBzZXQgdG8gYSB2YWxpZCBpbnRlZ2VyIVwiXG5cdFx0cmV0dXJuIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblx0aWYgbWF4IDwgMlxuXHRcdGFsZXJ0IFwiTWF4aW11bSBtdXN0IGJlIHNldCB0byBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiAxIVwiXG5cdFx0cmV0dXJuIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblx0Y2hlY2tNYXhTZXR0aW5nKClcblx0cmVzZXRHYW1lKClcblxuc1VuaXF1ZS5jaGFuZ2UgLT5cblx0Y2hlY2tNYXhTZXR0aW5nKClcblx0cmVzZXRHYW1lKClcblxuZUdhbWVHdWVzcy5jbGljayAtPlxuXHRndWVzcyA9IFtdXG5cdGZvciBpIGluIFsxLi5nYW1lLmFtb3VudF1cblx0XHRhbXQgPSBwYXJzZUludCggJCggXCIjZ2FtZS0taW5wdXQtLSN7aX1cIiApLnZhbCgpIClcblx0XHRyZXR1cm4gaWYgbm90IGFtdFxuXHRcdGlmIGdhbWUudW5pcXVlIGFuZCBhbXQgaW4gZ3Vlc3Ncblx0XHRcdGVHYW1lRXJyb3Iuc2hvdygpXG5cdFx0XHRlR2FtZUVycm9yLnRleHQgXCJZb3VyIGd1ZXNzIG11c3Qgb25seSBjb25zaXN0IG9mIHVuaXF1ZSBudW1iZXJzIVxuXHRcdFx0XHQoI3thbXR9IGlzIHJlcGVhdGVkKVwiXG5cdFx0XHRyZXR1cm5cblx0XHRlbHNlXG5cdFx0XHRlR2FtZUVycm9yLmhpZGUoKVxuXHRcdFx0Z3Vlc3MucHVzaCBhbXRcblxuXHRjb3JyZWN0ID0gMFxuXHRuZWFyID0gMFxuXHRnYW1lLmd1ZXNzZXMrK1xuXG5cdGN1cm51bXMgPSBnYW1lLm51bWJlcnNbLi5dXG5cdGZvciBuLCBpIGluIGd1ZXNzXG5cdFx0aWYgY3VybnVtc1tpXSA9PSBuXG5cdFx0XHRjb3JyZWN0Kytcblx0XHRcdGN1cm51bXNbaV0gPSBudWxsXG5cblx0Zm9yIG4gaW4gZ3Vlc3Ncblx0XHRpZiAoIGl4ID0gY3VybnVtcy5pbmRleE9mKCBuICkgKSA+IC0xXG5cdFx0XHRuZWFyKytcblx0XHRcdGN1cm51bXNbaXhdID0gbnVsbFxuXG5cdGlmIGNvcnJlY3QgPT0gZ2FtZS5hbW91bnRcblx0XHRlR2FtZU91dHB1dC5wcmVwZW5kIFwiXCJcIlxuXHRcdFx0PGRpdiBjbGFzcz1cImNhcmQgY2FyZC1ib2R5IG10LTIgYmctc3VjY2VzcyB0ZXh0LWxpZ2h0XCI+XG5cdFx0XHRcdDxzbWFsbD5HdWVzcyAje2dhbWUuZ3Vlc3Nlc308L3NtYWxsPlxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cImxlYWRcIj4je2d1ZXNzLmpvaW4oXCIgXCIpfTwvc3Bhbj5cblx0XHRcdFx0PHNwYW4+QWxsIGNvcnJlY3QhPC9zcGFuPlxuXHRcdFx0PC9kaXY+XG5cdFx0XCJcIlwiXG5cdFx0ZUdhbWVHdWVzcy5wcm9wKCBcImRpc2FibGVkXCIsIHRydWUgKVxuXHRcdGVHYW1lR2l2ZXVwLnByb3AoIFwiZGlzYWJsZWRcIiwgdHJ1ZSApXG5cdGVsc2Vcblx0XHRlR2FtZU91dHB1dC5wcmVwZW5kIFwiXCJcIlxuXHRcdFx0PGRpdiBjbGFzcz1cImNhcmQgY2FyZC1ib2R5IG10LTJcIj5cblx0XHRcdFx0PHNtYWxsIGNsYXNzPVwidGV4dC1tdXRlZFwiPkd1ZXNzICN7Z2FtZS5ndWVzc2VzfTwvc21hbGw+XG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwibGVhZFwiPiN7Z3Vlc3Muam9pbihcIiBcIil9PC9zcGFuPlxuXHRcdFx0XHQ8c3Bhbj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInRleHQtc3VjY2Vzc1wiPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJsZWFkIGZvbnQtd2VpZ2h0LWJvbGRcIj4je2NvcnJlY3R9PC9zcGFuPlxuXHRcdFx0XHRcdFx0Y29ycmVjdDwvc3Bhbj4sXG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJ0ZXh0LXdhcm5pbmdcIj5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwibGVhZCBmb250LXdlaWdodC1ib2xkXCI+I3tuZWFyfTwvc3Bhbj5cblx0XHRcdFx0XHRcdGluIHRoZSB3cm9uZyBwbGFjZTwvc3Bhbj4sXG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJsZWFkIGZvbnQtd2VpZ2h0LWJvbGRcIj5cblx0XHRcdFx0XHRcdFx0I3tnYW1lLmFtb3VudCAtIGNvcnJlY3QgLSBuZWFyfVxuXHRcdFx0XHRcdFx0PC9zcGFuPiBpbmNvcnJlY3Q8L3NwYW4+XG5cdFx0XHRcdDwvc3Bhbj5cblx0XHRcdDwvZGl2PlxuXHRcdFwiXCJcIlxuXG5cbiQoIFwiI2dhbWUtLXJlc2V0XCIgKS5jbGljayAtPlxuXHRpZiBjb25maXJtKCBcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBzdGFydCBhIG5ldyBnYW1lP1wiIClcblx0XHRyZXNldEdhbWUoKVxuXG5lR2FtZUdpdmV1cC5jbGljayAtPlxuXHRpZiBjb25maXJtKCBcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBnaXZlIHVwP1wiIClcblx0XHRlR2FtZUd1ZXNzLnByb3AoIFwiZGlzYWJsZWRcIiwgdHJ1ZSApXG5cdFx0ZUdhbWVHaXZldXAucHJvcCggXCJkaXNhYmxlZFwiLCB0cnVlIClcblx0XHRlR2FtZU91dHB1dC5wcmVwZW5kIFwiXCJcIlxuXHRcdFx0PGRpdiBjbGFzcz1cImNhcmQgY2FyZC1ib2R5IG10LTIgYmctd2FybmluZ1wiPlxuXHRcdFx0XHQ8c21hbGw+R2F2ZSBVcCAtIEFuc3dlcjwvc21hbGw+XG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwibGVhZFwiPiN7Z2FtZS5udW1iZXJzLmpvaW4oXCIgXCIpfTwvc3Bhbj5cblx0XHRcdDwvZGl2PlxuXHRcdFwiXCJcIlxuIl19
