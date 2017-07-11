(function() {
  var $clockDate, $clockTime, updateClock;

  $clockDate = $("#clock--date");

  $clockTime = $("#clock--time");

  updateClock = function() {
    var now;
    now = new Date;
    $clockTime.text(now.format(config.clock_twelvehour ? "mediumTime" : "isoTime"));
    return $clockDate.text(now.format("dddd, mmmm dS, yyyy"));
  };

  setInterval(updateClock, 100);

  mainSetting("clock_twelvehour", function() {
    if (config.clock_twelvehour) {
      $clockTime.addClass("_12hour");
    } else {
      $clockTime.removeClass("_12hour");
    }
    return updateClock();
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FkZ2V0cy9jbG9jay9pbmRleC5qcyIsInNvdXJjZXMiOlsiZ2FkZ2V0cy9jbG9jay9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7QUFBQSxNQUFBOztFQUFBLFVBQUEsR0FBYSxDQUFBLENBQUcsY0FBSDs7RUFDYixVQUFBLEdBQWEsQ0FBQSxDQUFHLGNBQUg7O0VBRWIsV0FBQSxHQUFjLFNBQUE7QUFDYixRQUFBO0lBQUEsR0FBQSxHQUFNLElBQUk7SUFDVixVQUFVLENBQUMsSUFBWCxDQUFpQixHQUFHLENBQUMsTUFBSixDQUNiLE1BQU0sQ0FBQyxnQkFBVixHQUFnQyxZQUFoQyxHQUFrRCxTQURsQyxDQUFqQjtXQUVBLFVBQVUsQ0FBQyxJQUFYLENBQWlCLEdBQUcsQ0FBQyxNQUFKLENBQVkscUJBQVosQ0FBakI7RUFKYTs7RUFNZCxXQUFBLENBQWEsV0FBYixFQUEwQixHQUExQjs7RUFJQSxXQUFBLENBQVksa0JBQVosRUFBZ0MsU0FBQTtJQUMvQixJQUFHLE1BQU0sQ0FBQyxnQkFBVjtNQUNDLFVBQVUsQ0FBQyxRQUFYLENBQXFCLFNBQXJCLEVBREQ7S0FBQSxNQUFBO01BR0MsVUFBVSxDQUFDLFdBQVgsQ0FBd0IsU0FBeEIsRUFIRDs7V0FJQSxXQUFBLENBQUE7RUFMK0IsQ0FBaEM7QUFiQSIsInNvdXJjZXNDb250ZW50IjpbIiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyBDbG9jayAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbiRjbG9ja0RhdGUgPSAkKCBcIiNjbG9jay0tZGF0ZVwiIClcbiRjbG9ja1RpbWUgPSAkKCBcIiNjbG9jay0tdGltZVwiIClcblxudXBkYXRlQ2xvY2sgPSAtPlxuXHRub3cgPSBuZXcgRGF0ZVxuXHQkY2xvY2tUaW1lLnRleHQoIG5vdy5mb3JtYXQoXG5cdFx0aWYgY29uZmlnLmNsb2NrX3R3ZWx2ZWhvdXIgdGhlbiBcIm1lZGl1bVRpbWVcIiBlbHNlIFwiaXNvVGltZVwiICkgKVxuXHQkY2xvY2tEYXRlLnRleHQoIG5vdy5mb3JtYXQoIFwiZGRkZCwgbW1tbSBkUywgeXl5eVwiICkgKVxuXG5zZXRJbnRlcnZhbCggdXBkYXRlQ2xvY2ssIDEwMCApXG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIFNldHRpbmdzICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbm1haW5TZXR0aW5nIFwiY2xvY2tfdHdlbHZlaG91clwiLCAtPlxuXHRpZiBjb25maWcuY2xvY2tfdHdlbHZlaG91clxuXHRcdCRjbG9ja1RpbWUuYWRkQ2xhc3MoIFwiXzEyaG91clwiIClcblx0ZWxzZVxuXHRcdCRjbG9ja1RpbWUucmVtb3ZlQ2xhc3MoIFwiXzEyaG91clwiIClcblx0dXBkYXRlQ2xvY2soKVxuIl19
