(function() {
  var el, elOutput, i, len, ref;

  elOutput = document.getElementById("output--input");

  ref = document.getElementsByClassName("palette--color");
  for (i = 0, len = ref.length; i < len; i++) {
    el = ref[i];
    el.addEventListener("click", function() {
      elOutput.value = this.getAttribute("data-color");
      elOutput.focus();
      return elOutput.select();
    });
  }

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9jb2xvcnBhbGV0dGUvaW5kZXguanMiLCJzb3VyY2VzIjpbImdhZGdldHMvY29sb3JwYWxldHRlL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsUUFBQSxHQUFXLFFBQVEsQ0FBQyxjQUFULENBQXdCLGVBQXhCOztBQUVYO0FBQUEsT0FBQSxxQ0FBQTs7SUFDQyxFQUFFLENBQUMsZ0JBQUgsQ0FBb0IsT0FBcEIsRUFBNkIsU0FBQTtNQUM1QixRQUFRLENBQUMsS0FBVCxHQUFpQixJQUFJLENBQUMsWUFBTCxDQUFtQixZQUFuQjtNQUNqQixRQUFRLENBQUMsS0FBVCxDQUFBO2FBQ0EsUUFBUSxDQUFDLE1BQVQsQ0FBQTtJQUg0QixDQUE3QjtBQUREO0FBRkEiLCJzb3VyY2VzQ29udGVudCI6WyJlbE91dHB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwib3V0cHV0LS1pbnB1dFwiXG5cbmZvciBlbCBpbiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBcInBhbGV0dGUtLWNvbG9yXCIgKVxuXHRlbC5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgLT5cblx0XHRlbE91dHB1dC52YWx1ZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCBcImRhdGEtY29sb3JcIiApXG5cdFx0ZWxPdXRwdXQuZm9jdXMoKVxuXHRcdGVsT3V0cHV0LnNlbGVjdCgpXG4iXX0=
