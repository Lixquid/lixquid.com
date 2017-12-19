(function() {
  var addLeadingZero, computeColour, toHex;

  addLeadingZero = function(s) {
    if (s.length < 2) {
      return "0" + s;
    } else {
      return s;
    }
  };

  toHex = function(r, g, b) {
    var ref;
    if (typeof r !== "number") {
      ref = r, r = ref[0], g = ref[1], b = ref[2];
    }
    return addLeadingZero(r.toString(16).toUpperCase()) + addLeadingZero(g.toString(16).toUpperCase()) + addLeadingZero(b.toString(16).toUpperCase());
  };

  computeColour = function() {
    var col, match, ref;
    col = [0, 0, 0];
    if ((ref = this.id) === "colour--rgb--r" || ref === "colour--rgb--g" || ref === "colour--rgb--b") {
      col[0] = Math.min(255, Math.max(0, parseInt(document.getElementById("colour--rgb--r").value) || 0));
      col[1] = Math.min(255, Math.max(0, parseInt(document.getElementById("colour--rgb--g").value) || 0));
      col[2] = Math.min(255, Math.max(0, parseInt(document.getElementById("colour--rgb--b").value) || 0));
    } else if (this.id === "colour--hex") {
      match = document.getElementById("colour--hex").value.match(/^\s*\#?(?:([0-9a-f])([0-9a-f])([0-9a-f])|([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2}))\s*$/i);
      if (!match) {
        document.getElementById("colour--hex").classList.add("is-invalid");
        return;
      }
      if (match[1]) {
        col[0] = parseInt(match[1] + match[1], 16);
        col[1] = parseInt(match[2] + match[2], 16);
        col[2] = parseInt(match[3] + match[3], 16);
      } else {
        col[0] = parseInt(match[4], 16);
        col[1] = parseInt(match[5], 16);
        col[2] = parseInt(match[6], 16);
        console.log(match);
      }
    }
    document.getElementById("colour--rgb--r").value = col[0];
    document.getElementById("colour--rgb--g").value = col[1];
    document.getElementById("colour--rgb--b").value = col[2];
    document.getElementById("colour--hex").value = toHex(col);
    document.getElementById("colour--hex").classList.remove("is-invalid");
    document.getElementById("colour--display--card").style.backgroundColor = "#" + toHex(col);
    document.getElementById("colour--display--lightbg").style.color = "#" + toHex(col);
    return document.getElementById("colour--display--darkbg").style.color = "#" + toHex(col);
  };

  document.getElementById("colour--rgb--r").addEventListener("change", computeColour);

  document.getElementById("colour--rgb--g").addEventListener("change", computeColour);

  document.getElementById("colour--rgb--b").addEventListener("change", computeColour);

  document.getElementById("colour--hex").addEventListener("change", computeColour);

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9jb252ZXJ0ZXIvaW5kZXguanMiLCJzb3VyY2VzIjpbImdhZGdldHMvY29udmVydGVyL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtBQUFBLE1BQUE7O0VBQUEsY0FBQSxHQUFpQixTQUFFLENBQUY7SUFDaEIsSUFBRyxDQUFDLENBQUMsTUFBRixHQUFXLENBQWQ7YUFDQyxHQUFBLEdBQUksRUFETDtLQUFBLE1BQUE7YUFHQyxFQUhEOztFQURnQjs7RUFLakIsS0FBQSxHQUFRLFNBQUUsQ0FBRixFQUFLLENBQUwsRUFBUSxDQUFSO0FBQ1AsUUFBQTtJQUFBLElBQUcsT0FBTyxDQUFQLEtBQVksUUFBZjtNQUNDLE1BQWMsQ0FBZCxFQUFFLFVBQUYsRUFBSyxVQUFMLEVBQVEsV0FEVDs7QUFFQSxXQUFPLGNBQUEsQ0FBZ0IsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxFQUFYLENBQWMsQ0FBQyxXQUFmLENBQUEsQ0FBaEIsQ0FBQSxHQUNOLGNBQUEsQ0FBZ0IsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxFQUFYLENBQWMsQ0FBQyxXQUFmLENBQUEsQ0FBaEIsQ0FETSxHQUVOLGNBQUEsQ0FBZ0IsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxFQUFYLENBQWMsQ0FBQyxXQUFmLENBQUEsQ0FBaEI7RUFMTTs7RUFPUixhQUFBLEdBQWdCLFNBQUE7QUFDZixRQUFBO0lBQUEsR0FBQSxHQUFNLENBQUUsQ0FBRixFQUFLLENBQUwsRUFBUSxDQUFSO0lBQ04sV0FBRyxJQUFDLENBQUEsR0FBRCxLQUFTLGdCQUFULElBQUEsR0FBQSxLQUEyQixnQkFBM0IsSUFBQSxHQUFBLEtBQTZDLGdCQUFoRDtNQUNDLEdBQUksQ0FBQSxDQUFBLENBQUosR0FBUyxJQUFJLENBQUMsR0FBTCxDQUFVLEdBQVYsRUFBZSxJQUFJLENBQUMsR0FBTCxDQUFVLENBQVYsRUFBYSxRQUFBLENBQ3BDLFFBQVEsQ0FBQyxjQUFULENBQXlCLGdCQUF6QixDQUEyQyxDQUFDLEtBRFIs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QUFBLENBQU8sR0FBUDtFQWxEUTs7RUFvRGhCLFFBQVEsQ0FBQyxjQUFULENBQXlCLGdCQUF6QixDQUNDLENBQUMsZ0JBREYsQ0FDb0IsUUFEcEIsRUFDOEIsYUFEOUI7O0VBRUEsUUFBUSxDQUFDLGNBQVQsQ0FBeUIsZ0JBQXpCLENBQ0MsQ0FBQyxnQkFERixDQUNvQixRQURwQixFQUM4QixhQUQ5Qjs7RUFFQSxRQUFRLENBQUMsY0FBVCxDQUF5QixnQkFBekIsQ0FDQyxDQUFDLGdCQURGLENBQ29CLFFBRHBCLEVBQzhCLGFBRDlCOztFQUVBLFFBQVEsQ0FBQyxjQUFULENBQXlCLGFBQXpCLENBQ0MsQ0FBQyxnQkFERixDQUNvQixRQURwQixFQUM4QixhQUQ5QjtBQXRFQSIsInNvdXJjZXNDb250ZW50IjpbIiMjIENvbG91ciAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmFkZExlYWRpbmdaZXJvID0gKCBzICkgLT5cblx0aWYgcy5sZW5ndGggPCAyXG5cdFx0XCIwI3tzfVwiXG5cdGVsc2Vcblx0XHRzXG50b0hleCA9ICggciwgZywgYiApIC0+XG5cdGlmIHR5cGVvZiByICE9IFwibnVtYmVyXCJcblx0XHRbIHIsIGcsIGIgXSA9IHJcblx0cmV0dXJuIGFkZExlYWRpbmdaZXJvKCByLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpICkgK1xuXHRcdGFkZExlYWRpbmdaZXJvKCBnLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpICkgK1xuXHRcdGFkZExlYWRpbmdaZXJvKCBiLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpIClcblxuY29tcHV0ZUNvbG91ciA9IC0+XG5cdGNvbCA9IFsgMCwgMCwgMCBdXG5cdGlmIEBpZCBpbiBbIFwiY29sb3VyLS1yZ2ItLXJcIiwgXCJjb2xvdXItLXJnYi0tZ1wiLCBcImNvbG91ci0tcmdiLS1iXCIgXVxuXHRcdGNvbFswXSA9IE1hdGgubWluKCAyNTUsIE1hdGgubWF4KCAwLCBwYXJzZUludChcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBcImNvbG91ci0tcmdiLS1yXCIgKS52YWx1ZVxuXHRcdCkgb3IgMCApIClcblx0XHRjb2xbMV0gPSBNYXRoLm1pbiggMjU1LCBNYXRoLm1heCggMCwgcGFyc2VJbnQoXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJjb2xvdXItLXJnYi0tZ1wiICkudmFsdWVcblx0XHQpIG9yIDAgKSApXG5cdFx0Y29sWzJdID0gTWF0aC5taW4oIDI1NSwgTWF0aC5tYXgoIDAsIHBhcnNlSW50KFxuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwiY29sb3VyLS1yZ2ItLWJcIiApLnZhbHVlXG5cdFx0KSBvciAwICkgKVxuXHRlbHNlIGlmIEBpZCA9PSBcImNvbG91ci0taGV4XCJcblx0XHRtYXRjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBcImNvbG91ci0taGV4XCIgKS52YWx1ZS5tYXRjaCAvLy9cblx0XHRcdF4gXFxzKiBcXCM/XG5cdFx0XHQoPzpcblx0XHRcdFx0KCBbMC05YS1mXSApXG5cdFx0XHRcdCggWzAtOWEtZl0gKVxuXHRcdFx0XHQoIFswLTlhLWZdIClcblx0XHRcdHxcblx0XHRcdFx0KCBbMC05YS1mXXsyfSApXG5cdFx0XHRcdCggWzAtOWEtZl17Mn0gKVxuXHRcdFx0XHQoIFswLTlhLWZdezJ9IClcblx0XHRcdClcblx0XHRcdFxccyogJFxuXHRcdC8vL2lcblx0XHRpZiBub3QgbWF0Y2hcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBcImNvbG91ci0taGV4XCIgKS5jbGFzc0xpc3QuYWRkIFwiaXMtaW52YWxpZFwiXG5cdFx0XHRyZXR1cm5cblxuXHRcdGlmIG1hdGNoWzFdXG5cdFx0XHRjb2xbMF0gPSBwYXJzZUludCggbWF0Y2hbMV0gKyBtYXRjaFsxXSwgMTYgKVxuXHRcdFx0Y29sWzFdID0gcGFyc2VJbnQoIG1hdGNoWzJdICsgbWF0Y2hbMl0sIDE2IClcblx0XHRcdGNvbFsyXSA9IHBhcnNlSW50KCBtYXRjaFszXSArIG1hdGNoWzNdLCAxNiApXG5cdFx0ZWxzZVxuXHRcdFx0Y29sWzBdID0gcGFyc2VJbnQoIG1hdGNoWzRdLCAxNiApXG5cdFx0XHRjb2xbMV0gPSBwYXJzZUludCggbWF0Y2hbNV0sIDE2IClcblx0XHRcdGNvbFsyXSA9IHBhcnNlSW50KCBtYXRjaFs2XSwgMTYgKVxuXHRcdFx0Y29uc29sZS5sb2cgbWF0Y2hcblxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJjb2xvdXItLXJnYi0tclwiICkudmFsdWUgPSBjb2xbMF1cblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwiY29sb3VyLS1yZ2ItLWdcIiApLnZhbHVlID0gY29sWzFdXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBcImNvbG91ci0tcmdiLS1iXCIgKS52YWx1ZSA9IGNvbFsyXVxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJjb2xvdXItLWhleFwiICkudmFsdWUgPSB0b0hleCggY29sIClcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwiY29sb3VyLS1oZXhcIiApLmNsYXNzTGlzdC5yZW1vdmUgXCJpcy1pbnZhbGlkXCJcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwiY29sb3VyLS1kaXNwbGF5LS1jYXJkXCIgKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPVxuXHRcdFwiI1wiICsgdG9IZXgoIGNvbCApXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBcImNvbG91ci0tZGlzcGxheS0tbGlnaHRiZ1wiICkuc3R5bGUuY29sb3IgPVxuXHRcdFwiI1wiICsgdG9IZXgoIGNvbCApXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBcImNvbG91ci0tZGlzcGxheS0tZGFya2JnXCIgKS5zdHlsZS5jb2xvciA9XG5cdFx0XCIjXCIgKyB0b0hleCggY29sIClcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwiY29sb3VyLS1yZ2ItLXJcIiApXG5cdC5hZGRFdmVudExpc3RlbmVyKCBcImNoYW5nZVwiLCBjb21wdXRlQ29sb3VyIClcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBcImNvbG91ci0tcmdiLS1nXCIgKVxuXHQuYWRkRXZlbnRMaXN0ZW5lciggXCJjaGFuZ2VcIiwgY29tcHV0ZUNvbG91ciApXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJjb2xvdXItLXJnYi0tYlwiIClcblx0LmFkZEV2ZW50TGlzdGVuZXIoIFwiY2hhbmdlXCIsIGNvbXB1dGVDb2xvdXIgKVxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwiY29sb3VyLS1oZXhcIiApXG5cdC5hZGRFdmVudExpc3RlbmVyKCBcImNoYW5nZVwiLCBjb21wdXRlQ29sb3VyIClcbiJdfQ==
