(function() {
  var eOutput, eOutputCopy, el, i, len, ref;

  eOutput = document.getElementById("output--input");

  eOutputCopy = document.getElementById("output--copy");

  ref = document.getElementsByClassName("palette--color");
  for (i = 0, len = ref.length; i < len; i++) {
    el = ref[i];
    el.addEventListener("click", function() {
      eOutput.value = this.getAttribute("data-color");
      eOutput.focus();
      eOutput.select();
      if (eOutputCopy.checked) {
        return document.execCommand("copy");
      }
    });
  }

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9jb2xvcnBhbGV0dGUvaW5kZXguanMiLCJzb3VyY2VzIjpbImdhZGdldHMvY29sb3JwYWxldHRlL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsT0FBQSxHQUFVLFFBQVEsQ0FBQyxjQUFULENBQXdCLGVBQXhCOztFQUNWLFdBQUEsR0FBYyxRQUFRLENBQUMsY0FBVCxDQUF3QixjQUF4Qjs7QUFFZDtBQUFBLE9BQUEscUNBQUE7O0lBQ0MsRUFBRSxDQUFDLGdCQUFILENBQW9CLE9BQXBCLEVBQTZCLFNBQUE7TUFDNUIsT0FBTyxDQUFDLEtBQVIsR0FBZ0IsSUFBSSxDQUFDLFlBQUwsQ0FBbUIsWUFBbkI7TUFDaEIsT0FBTyxDQUFDLEtBQVIsQ0FBQTtNQUNBLE9BQU8sQ0FBQyxNQUFSLENBQUE7TUFDQSxJQUFHLFdBQVcsQ0FBQyxPQUFmO2VBQ0MsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsTUFBckIsRUFERDs7SUFKNEIsQ0FBN0I7QUFERDtBQUhBIiwic291cmNlc0NvbnRlbnQiOlsiZU91dHB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwib3V0cHV0LS1pbnB1dFwiXG5lT3V0cHV0Q29weSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwib3V0cHV0LS1jb3B5XCJcblxuZm9yIGVsIGluIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoIFwicGFsZXR0ZS0tY29sb3JcIiApXG5cdGVsLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXHRcdGVPdXRwdXQudmFsdWUgPSB0aGlzLmdldEF0dHJpYnV0ZSggXCJkYXRhLWNvbG9yXCIgKVxuXHRcdGVPdXRwdXQuZm9jdXMoKVxuXHRcdGVPdXRwdXQuc2VsZWN0KClcblx0XHRpZiBlT3V0cHV0Q29weS5jaGVja2VkXG5cdFx0XHRkb2N1bWVudC5leGVjQ29tbWFuZCBcImNvcHlcIlxuIl19
