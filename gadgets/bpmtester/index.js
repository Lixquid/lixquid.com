(function() {
  var beatCount, beatLen, beats, eInputBeat, eInputReset, eOutputBeats, eOutputBpm, eOutputPeriod, eOutputProgress, lastBeat, sPeriod, triggerBeat;

  eOutputBpm = document.getElementById("output--bpm");

  eOutputPeriod = document.getElementById("output--period");

  eOutputProgress = document.getElementById("output--progress");

  eOutputBeats = document.getElementById("output--beats");

  eInputBeat = document.getElementById("input--beat");

  eInputReset = document.getElementById("input--reset");

  sPeriod = document.getElementById("bpmtester--period");

  beats = [];

  beatCount = 0;

  lastBeat = null;

  beatLen = function() {
    var val;
    val = parseInt(sPeriod.value);
    if ((val == null) || isNaN(val) || val < 2) {
      return 1;
    }
    return val - 1;
  };

  triggerBeat = function() {
    var avg;
    beatCount++;
    if (lastBeat == null) {
      lastBeat = new Date;
      return;
    }
    beats.push(new Date - lastBeat);
    if (beats.length > beatLen()) {
      beats.shift();
    }
    avg = beats.reduce(function(a, b) {
      return a + b;
    }) / beats.length;
    eOutputBpm.value = Math.floor(1000 * 60 / avg);
    eOutputPeriod.value = Math.floor(avg);
    eOutputBeats.value = beatCount;
    eOutputProgress.style.width = (beats.length / beatLen()) * 100 + "%";
    if (beats.length === beatLen()) {
      eOutputProgress.innerText = "Scan Complete";
      eOutputProgress.classList.add("bg-success");
    } else {
      eOutputProgress.innerText = "Scanning: " + (beats.length + 1) + " / " + (beatLen() + 1);
    }
    return lastBeat = new Date;
  };

  document.getElementById("input--beat").addEventListener("click", triggerBeat);

  document.getElementById("input--reset").addEventListener("click", function() {
    beats = [];
    beatCount = 0;
    lastBeat = null;
    eOutputBpm.value = "";
    eOutputBeats.value = "";
    eOutputPeriod.value = "";
    eOutputProgress.style.width = 0;
    return eOutputProgress.classList.remove("bg-success");
  });

  document.addEventListener("keydown", function(e) {
    if (e.keyCode !== 16) {
      return;
    }
    return triggerBeat();
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9icG10ZXN0ZXIvaW5kZXguanMiLCJzb3VyY2VzIjpbImdhZGdldHMvYnBtdGVzdGVyL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtBQUFBLE1BQUE7O0VBQUEsVUFBQSxHQUFhLFFBQVEsQ0FBQyxjQUFULENBQXdCLGFBQXhCOztFQUNiLGFBQUEsR0FBZ0IsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsZ0JBQXhCOztFQUNoQixlQUFBLEdBQWtCLFFBQVEsQ0FBQyxjQUFULENBQXdCLGtCQUF4Qjs7RUFDbEIsWUFBQSxHQUFlLFFBQVEsQ0FBQyxjQUFULENBQXdCLGVBQXhCOztFQUNmLFVBQUEsR0FBYSxRQUFRLENBQUMsY0FBVCxDQUF3QixhQUF4Qjs7RUFDYixXQUFBLEdBQWMsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsY0FBeEI7O0VBQ2QsT0FBQSxHQUFVLFFBQVEsQ0FBQyxjQUFULENBQXdCLG1CQUF4Qjs7RUFJVixLQUFBLEdBQVE7O0VBQ1IsU0FBQSxHQUFZOztFQUNaLFFBQUEsR0FBVzs7RUFFWCxPQUFBLEdBQVUsU0FBQTtBQUNULFFBQUE7SUFBQSxHQUFBLEdBQU0sUUFBQSxDQUFVLE9BQU8sQ0FBQyxLQUFsQjtJQUNOLElBQU8sYUFBSixJQUFZLEtBQUEsQ0FBTyxHQUFQLENBQVosSUFBNEIsR0FBQSxHQUFNLENBQXJDO0FBQ0MsYUFBTyxFQURSOztBQUVBLFdBQU8sR0FBQSxHQUFNO0VBSko7O0VBTVYsV0FBQSxHQUFjLFNBQUE7QUFDYixRQUFBO0lBQUEsU0FBQTtJQUNBLElBQU8sZ0JBQVA7TUFDQyxRQUFBLEdBQVcsSUFBSTtBQUNmLGFBRkQ7O0lBSUEsS0FBSyxDQUFDLElBQU4sQ0FBWSxJQUFJLElBQUosR0FBVyxRQUF2QjtJQUNBLElBQUcsS0FBSyxDQUFDLE1BQU4sR0FBZSxPQUFBLENBQUEsQ0FBbEI7TUFDQyxLQUFLLENBQUMsS0FBTixDQUFBLEVBREQ7O0lBR0EsR0FBQSxHQUFNLEtBQUssQ0FBQyxNQUFOLENBQWMsU0FBRSxDQUFGLEVBQUssQ0FBTDthQUFZLENBQUEsR0FBSTtJQUFoQixDQUFkLENBQUEsR0FBb0MsS0FBSyxDQUFDO0lBRWhELFVBQVUsQ0FBQyxLQUFYLGNBQW1CLElBQUEsR0FBTyxLQUFNO0lBQ2hDLGFBQWEsQ0FBQyxLQUFkLEdBQXNCLElBQUksQ0FBQyxLQUFMLENBQVksR0FBWjtJQUN0QixZQUFZLENBQUMsS0FBYixHQUFxQjtJQUVyQixlQUFlLENBQUMsS0FBSyxDQUFDLEtBQXRCLEdBQThCLENBQUUsS0FBSyxDQUFDLE1BQU4sR0FBZSxPQUFBLENBQUEsQ0FBakIsQ0FBQSxHQUErQixHQUEvQixHQUFxQztJQUNuRSxJQUFHLEtBQUssQ0FBQyxNQUFOLEtBQWdCLE9BQUEsQ0FBQSxDQUFuQjtNQUNDLGVBQWUsQ0FBQyxTQUFoQixHQUE0QjtNQUM1QixlQUFlLENBQUMsU0FBUyxDQUFDLEdBQTFCLENBQThCLFlBQTlCLEVBRkQ7S0FBQSxNQUFBO01BSUMsZUFBZSxDQUFDLFNBQWhCLEdBQTRCLFlBQUEsR0FDaEIsQ0FBQyxLQUFLLENBQUMsTUFBTixHQUFlLENBQWhCLENBRGdCLEdBQ0UsS0FERixHQUNNLENBQUMsT0FBQSxDQUFBLENBQUEsR0FBWSxDQUFiLEVBTG5DOztXQVNBLFFBQUEsR0FBVyxJQUFJO0VBMUJGOztFQThCZCxRQUFRLENBQUMsY0FBVCxDQUF5QixhQUF6QixDQUF3QyxDQUFDLGdCQUF6QyxDQUEwRCxPQUExRCxFQUFtRSxXQUFuRTs7RUFFQSxRQUFRLENBQUMsY0FBVCxDQUF5QixjQUF6QixDQUF5QyxDQUFDLGdCQUExQyxDQUEyRCxPQUEzRCxFQUFvRSxTQUFBO0lBQ25FLEtBQUEsR0FBUTtJQUNSLFNBQUEsR0FBWTtJQUNaLFFBQUEsR0FBVztJQUNYLFVBQVUsQ0FBQyxLQUFYLEdBQW1CO0lBQ25CLFlBQVksQ0FBQyxLQUFiLEdBQXFCO0lBQ3JCLGFBQWEsQ0FBQyxLQUFkLEdBQXNCO0lBQ3RCLGVBQWUsQ0FBQyxLQUFLLENBQUMsS0FBdEIsR0FBOEI7V0FDOUIsZUFBZSxDQUFDLFNBQVMsQ0FBQyxNQUExQixDQUFpQyxZQUFqQztFQVJtRSxDQUFwRTs7RUFVQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsU0FBMUIsRUFBcUMsU0FBRSxDQUFGO0lBQ3BDLElBQVUsQ0FBQyxDQUFDLE9BQUYsS0FBYSxFQUF2QjtBQUFBLGFBQUE7O1dBRUEsV0FBQSxDQUFBO0VBSG9DLENBQXJDO0FBOURBIiwic291cmNlc0NvbnRlbnQiOlsiIyMgRWxlbWVudHMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZU91dHB1dEJwbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwib3V0cHV0LS1icG1cIlxuZU91dHB1dFBlcmlvZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwib3V0cHV0LS1wZXJpb2RcIlxuZU91dHB1dFByb2dyZXNzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJvdXRwdXQtLXByb2dyZXNzXCJcbmVPdXRwdXRCZWF0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwib3V0cHV0LS1iZWF0c1wiXG5lSW5wdXRCZWF0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJpbnB1dC0tYmVhdFwiXG5lSW5wdXRSZXNldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiaW5wdXQtLXJlc2V0XCJcbnNQZXJpb2QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImJwbXRlc3Rlci0tcGVyaW9kXCJcblxuIyMgRnVuY3Rpb25zICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuYmVhdHMgPSBbXVxuYmVhdENvdW50ID0gMFxubGFzdEJlYXQgPSBudWxsXG5cbmJlYXRMZW4gPSAtPlxuXHR2YWwgPSBwYXJzZUludCggc1BlcmlvZC52YWx1ZSApXG5cdGlmIG5vdCB2YWw/IG9yIGlzTmFOKCB2YWwgKSBvciB2YWwgPCAyXG5cdFx0cmV0dXJuIDFcblx0cmV0dXJuIHZhbCAtIDFcblxudHJpZ2dlckJlYXQgPSAtPlxuXHRiZWF0Q291bnQrK1xuXHRpZiBub3QgbGFzdEJlYXQ/XG5cdFx0bGFzdEJlYXQgPSBuZXcgRGF0ZVxuXHRcdHJldHVyblxuXG5cdGJlYXRzLnB1c2goIG5ldyBEYXRlIC0gbGFzdEJlYXQgKVxuXHRpZiBiZWF0cy5sZW5ndGggPiBiZWF0TGVuKClcblx0XHRiZWF0cy5zaGlmdCgpXG5cblx0YXZnID0gYmVhdHMucmVkdWNlKCAoIGEsIGIgKSAtPiBhICsgYiApIC8gYmVhdHMubGVuZ3RoXG5cblx0ZU91dHB1dEJwbS52YWx1ZSA9IDEwMDAgKiA2MCAvLyBhdmdcblx0ZU91dHB1dFBlcmlvZC52YWx1ZSA9IE1hdGguZmxvb3IoIGF2ZyApXG5cdGVPdXRwdXRCZWF0cy52YWx1ZSA9IGJlYXRDb3VudFxuXG5cdGVPdXRwdXRQcm9ncmVzcy5zdHlsZS53aWR0aCA9ICggYmVhdHMubGVuZ3RoIC8gYmVhdExlbigpICkgKiAxMDAgKyBcIiVcIlxuXHRpZiBiZWF0cy5sZW5ndGggPT0gYmVhdExlbigpXG5cdFx0ZU91dHB1dFByb2dyZXNzLmlubmVyVGV4dCA9IFwiU2NhbiBDb21wbGV0ZVwiXG5cdFx0ZU91dHB1dFByb2dyZXNzLmNsYXNzTGlzdC5hZGQgXCJiZy1zdWNjZXNzXCJcblx0ZWxzZVxuXHRcdGVPdXRwdXRQcm9ncmVzcy5pbm5lclRleHQgPSBcIlxuXHRcdFx0U2Nhbm5pbmc6ICN7YmVhdHMubGVuZ3RoICsgMX0gLyAje2JlYXRMZW4oKSArIDF9XG5cdFx0XCJcblxuXG5cdGxhc3RCZWF0ID0gbmV3IERhdGVcblxuIyMgRXZlbnRzICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwiaW5wdXQtLWJlYXRcIiApLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCB0cmlnZ2VyQmVhdFxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJpbnB1dC0tcmVzZXRcIiApLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXHRiZWF0cyA9IFtdXG5cdGJlYXRDb3VudCA9IDBcblx0bGFzdEJlYXQgPSBudWxsXG5cdGVPdXRwdXRCcG0udmFsdWUgPSBcIlwiXG5cdGVPdXRwdXRCZWF0cy52YWx1ZSA9IFwiXCJcblx0ZU91dHB1dFBlcmlvZC52YWx1ZSA9IFwiXCJcblx0ZU91dHB1dFByb2dyZXNzLnN0eWxlLndpZHRoID0gMFxuXHRlT3V0cHV0UHJvZ3Jlc3MuY2xhc3NMaXN0LnJlbW92ZSBcImJnLXN1Y2Nlc3NcIlxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyIFwia2V5ZG93blwiLCAoIGUgKSAtPlxuXHRyZXR1cm4gaWYgZS5rZXlDb2RlICE9IDE2XG5cblx0dHJpZ2dlckJlYXQoKVxuIl19
