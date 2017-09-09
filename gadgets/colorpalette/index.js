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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9jb2xvcnBhbGV0dGUvaW5kZXguanMiLCJzb3VyY2VzIjpbImdhZGdldHMvY29sb3JwYWxldHRlL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsT0FBQSxHQUFVLFFBQVEsQ0FBQyxjQUFULENBQXdCLGVBQXhCOztFQUNWLFdBQUEsR0FBYyxRQUFRLENBQUMsY0FBVCxDQUF3QixjQUF4Qjs7QUFFZDtBQUFBLE9BQUEscUNBQUE7O0lBQ0MsRUFBRSxDQUFDLGdCQUFILENBQW9CLE9BQXBCLEVBQTZCLFNBQUE7TUFDNUIsT0FBTyxDQUFDLEtBQVIsR0FBZ0IsSUFBSSxDQUFDLFlBQUwsQ0FBbUIsWUFBbkI7TUFDaEIsT0FBTyxDQUFDLEtBQVIsQ0FBQTtNQUNBLE9BQU8sQ0FBQyxNQUFSLENBQUE7TUFDQSxJQUFHLFdBQVcsQ0FBQyxPQUFmO2VBQ0MsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsTUFBckIsRUFERDs7SUFKNEIsQ0FBN0I7QUFERDs7O0FBUUE7Ozs7Ozs7Ozs7Ozs7O0FBWEEiLCJzb3VyY2VzQ29udGVudCI6WyJlT3V0cHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJvdXRwdXQtLWlucHV0XCJcbmVPdXRwdXRDb3B5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJvdXRwdXQtLWNvcHlcIlxuXG5mb3IgZWwgaW4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggXCJwYWxldHRlLS1jb2xvclwiIClcblx0ZWwuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIC0+XG5cdFx0ZU91dHB1dC52YWx1ZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCBcImRhdGEtY29sb3JcIiApXG5cdFx0ZU91dHB1dC5mb2N1cygpXG5cdFx0ZU91dHB1dC5zZWxlY3QoKVxuXHRcdGlmIGVPdXRwdXRDb3B5LmNoZWNrZWRcblx0XHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kIFwiY29weVwiXG5cbiMjI1xuZm9yIGUgaW4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggXCJwYWxldHRlLS1uYXZcIiApXG5cdGUuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsICggZXYgKSAtPlxuXHRcdGZvciBlaSBpbiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBcInBhbGV0dGUtLW5hdlwiIClcblx0XHRcdGVpLmNsYXNzTGlzdC5yZW1vdmUgXCJhY3RpdmVcIlxuXHRcdEBjbGFzc0xpc3QuYWRkIFwiYWN0aXZlXCJcblxuXHRcdGZvciBlaSBpbiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBcInBhbGV0dGUtLXRhYmxlXCIgKVxuXHRcdFx0ZWkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcblx0XHRcdFwicGFsZXR0ZS0tZGl2LS0je0BkYXRhc2V0LnRhcmdldH1cIiApLnN0eWxlLmRpc3BsYXkgPSBcIlwiXG5cdFx0ZXYucHJldmVudERlZmF1bHQoKVxuIyMjXG4iXX0=
