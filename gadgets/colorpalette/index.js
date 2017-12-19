(function() {
  var eOutput, eOutputCopy, eOutputHex, eOutputRGB, el, i, len, ref;

  eOutput = document.getElementById("output--input");

  eOutputCopy = document.getElementById("output--copy");

  eOutputHex = document.getElementById("output--hex");

  eOutputRGB = document.getElementById("output--rgb");

  ref = document.getElementsByClassName("palette--color");
  for (i = 0, len = ref.length; i < len; i++) {
    el = ref[i];
    el.addEventListener("click", function() {
      if (eOutputHex.checked) {
        eOutput.value = "#" + this.getAttribute("data-color-hex");
      } else {
        eOutput.value = this.getAttribute("data-color-r") + ", " + this.getAttribute("data-color-g") + ", " + this.getAttribute("data-color-b");
      }
      eOutput.focus();
      eOutput.select();
      if (eOutputCopy.checked) {
        return document.execCommand("copy");
      }
    });
  }


  /*
  for e in document.getElementsByClassName( "palette--nav" )
  	e.addEventListener "click", ( ev ) ->
  		for ei in document.getElementsByClassName( "palette--nav" )
  			ei.classList.remove "active"
  		@classList.add "active"
  
  		for ei in document.getElementsByClassName( "palette--table" )
  			ei.style.display = "none"
  
  		document.getElementById(
  			"palette--div--#{@dataset.target}" ).style.display = ""
  		ev.preventDefault()
   */

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9jb2xvcnBhbGV0dGUvaW5kZXguanMiLCJzb3VyY2VzIjpbImdhZGdldHMvY29sb3JwYWxldHRlL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsT0FBQSxHQUFVLFFBQVEsQ0FBQyxjQUFULENBQXdCLGVBQXhCOztFQUNWLFdBQUEsR0FBYyxRQUFRLENBQUMsY0FBVCxDQUF3QixjQUF4Qjs7RUFDZCxVQUFBLEdBQWEsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsYUFBeEI7O0VBQ2IsVUFBQSxHQUFhLFFBQVEsQ0FBQyxjQUFULENBQXdCLGFBQXhCOztBQUViO0FBQUEsT0FBQSxxQ0FBQTs7SUFDQyxFQUFFLENBQUMsZ0JBQUgsQ0FBb0IsT0FBcEIsRUFBNkIsU0FBQTtNQUM1QixJQUFHLFVBQVUsQ0FBQyxPQUFkO1FBQ0MsT0FBTyxDQUFDLEtBQVIsR0FBZ0IsR0FBQSxHQUFNLElBQUksQ0FBQyxZQUFMLENBQW1CLGdCQUFuQixFQUR2QjtPQUFBLE1BQUE7UUFHQyxPQUFPLENBQUMsS0FBUixHQUFnQixJQUFJLENBQUMsWUFBTCxDQUFtQixjQUFuQixDQUFBLEdBQXNDLElBQXRDLEdBQ2YsSUFBSSxDQUFDLFlBQUwsQ0FBbUIsY0FBbkIsQ0FEZSxHQUN1QixJQUR2QixHQUVmLElBQUksQ0FBQyxZQUFMLENBQW1CLGNBQW5CLEVBTEY7O01BTUEsT0FBTyxDQUFDLEtBQVIsQ0FBQTtNQUNBLE9BQU8sQ0FBQyxNQUFSLENBQUE7TUFDQSxJQUFHLFdBQVcsQ0FBQyxPQUFmO2VBQ0MsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsTUFBckIsRUFERDs7SUFUNEIsQ0FBN0I7QUFERDs7O0FBYUE7Ozs7Ozs7Ozs7Ozs7O0FBbEJBIiwic291cmNlc0NvbnRlbnQiOlsiZU91dHB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwib3V0cHV0LS1pbnB1dFwiXG5lT3V0cHV0Q29weSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwib3V0cHV0LS1jb3B5XCJcbmVPdXRwdXRIZXggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcIm91dHB1dC0taGV4XCJcbmVPdXRwdXRSR0IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcIm91dHB1dC0tcmdiXCJcblxuZm9yIGVsIGluIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoIFwicGFsZXR0ZS0tY29sb3JcIiApXG5cdGVsLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAtPlxuXHRcdGlmIGVPdXRwdXRIZXguY2hlY2tlZFxuXHRcdFx0ZU91dHB1dC52YWx1ZSA9IFwiI1wiICsgdGhpcy5nZXRBdHRyaWJ1dGUoIFwiZGF0YS1jb2xvci1oZXhcIiApXG5cdFx0ZWxzZVxuXHRcdFx0ZU91dHB1dC52YWx1ZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCBcImRhdGEtY29sb3ItclwiICkgKyBcIiwgXCIgK1xuXHRcdFx0XHR0aGlzLmdldEF0dHJpYnV0ZSggXCJkYXRhLWNvbG9yLWdcIiApICsgXCIsIFwiICtcblx0XHRcdFx0dGhpcy5nZXRBdHRyaWJ1dGUoIFwiZGF0YS1jb2xvci1iXCIgKVxuXHRcdGVPdXRwdXQuZm9jdXMoKVxuXHRcdGVPdXRwdXQuc2VsZWN0KClcblx0XHRpZiBlT3V0cHV0Q29weS5jaGVja2VkXG5cdFx0XHRkb2N1bWVudC5leGVjQ29tbWFuZCBcImNvcHlcIlxuXG4jIyNcbmZvciBlIGluIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoIFwicGFsZXR0ZS0tbmF2XCIgKVxuXHRlLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAoIGV2ICkgLT5cblx0XHRmb3IgZWkgaW4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggXCJwYWxldHRlLS1uYXZcIiApXG5cdFx0XHRlaS5jbGFzc0xpc3QucmVtb3ZlIFwiYWN0aXZlXCJcblx0XHRAY2xhc3NMaXN0LmFkZCBcImFjdGl2ZVwiXG5cblx0XHRmb3IgZWkgaW4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggXCJwYWxldHRlLS10YWJsZVwiIClcblx0XHRcdGVpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG5cdFx0XHRcInBhbGV0dGUtLWRpdi0tI3tAZGF0YXNldC50YXJnZXR9XCIgKS5zdHlsZS5kaXNwbGF5ID0gXCJcIlxuXHRcdGV2LnByZXZlbnREZWZhdWx0KClcbiMjI1xuIl19
