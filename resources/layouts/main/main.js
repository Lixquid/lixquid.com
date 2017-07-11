(function() {
  var $body, $extNav, $mainFullscreenClose, $mainMain, fullscreenTimeout, quotes;

  $(function() {
    return $('[data-toggle="tooltip"]').tooltip();
  });

  $extNav = $("#main--ext-nav");

  if (localStorage.getItem("main--ext-nav--hidden")) {
    $extNav.hide();
  }

  $("#main--ext-toggle").click(function() {
    $extNav.toggle();
    if (localStorage.getItem("main--ext-nav--hidden")) {
      return localStorage.removeItem("main--ext-nav--hidden");
    } else {
      return localStorage.setItem("main--ext-nav--hidden", true);
    }
  });

  $mainMain = $("#main--main");

  $body = $("body");

  $("#main--darkmode").click(function() {
    $mainMain.toggleClass("bg-inverse text-white");
    return $body.toggleClass("_darkmode");
  });

  $mainFullscreenClose = $("#main--fullscreen--close");

  fullscreenTimeout = null;

  $("#main--fullscreen").click(function() {
    $body.toggleClass("_fullscreen");
    $mainFullscreenClose.show();
    return fullscreenTimeout = setTimeout(function() {
      return $mainFullscreenClose.css({
        opacity: 0
      });
    }, 3000);
  });

  $($mainFullscreenClose).click(function() {
    $body.removeClass("_fullscreen");
    fullscreenTimeout = null;
    return $mainFullscreenClose.hide();
  });

  $body.on("mousemove", function() {
    if (!fullscreenTimeout) {
      return;
    }
    $mainFullscreenClose.css({
      opacity: 1
    });
    clearTimeout(fullscreenTimeout);
    return fullscreenTimeout = setTimeout(function() {
      return $mainFullscreenClose.css({
        opacity: 0
      });
    }, 3000);
  });

  if ($("#main--settings--modal").length > 0) {
    window.config = {};
    $(".setting--control").each(function() {
      var $c, id, nosave, storedValue;
      $c = $(this);
      id = $c.attr("data-id");
      nosave = $c.attr("data-nosave");
      switch ($c.attr("data-type")) {
        case "boolean":
          storedValue = localStorage.getItem(id) === "true";
          if ((storedValue != null) && !nosave) {
            $c.prop("checked", storedValue);
            window.config[id] = storedValue;
          } else {
            storedValue = $c.prop("checked");
            window.config[id] = storedValue;
            if (!nosave) {
              try {
                localStorage.setItem(id, storedValue);
              } catch (error) {}
            }
          }
          return $c.on("change", function() {
            window.config[id] = $c.prop("checked");
            if (!nosave) {
              try {
                return localStorage.setItem(id, window.config[id]);
              } catch (error) {}
            }
          });
        case "text":
          storedValue = localStorage.getItem(id);
          if ((storedValue != null) && !nosave) {
            $c.val(storedValue);
            window.config[id] = storedValue;
          } else {
            storedValue = $c.val();
            window.config[id] = storedValue;
            if (!nosave) {
              try {
                localStorage.setItem(id, storedValue);
              } catch (error) {}
            }
          }
          return $c.on("change", function() {
            window.config[id] = $c.val();
            if (!nosave) {
              try {
                return localStorage.setItem(id, window.config[id]);
              } catch (error) {}
            }
          });
      }
    });
    $("#main--settings--reset").click(function() {
      if (confirm("Are you sure you want to reset all settings?")) {
        $(".setting--control").each(function() {
          if ($(this).attr("data-nosave")) {
            return;
          }
          try {
            return localStorage.removeItem($(this).attr("data-id"));
          } catch (error) {}
        });
        return location.reload();
      }
    });
  }

  window.mainSetting = function(id, fn) {
    fn(true);
    return $(".setting--control[data-id='" + id + "']").on("change", function() {
      return fn(false);
    });
  };

  quotes = ["Metal Gear?", "This isn't a car", "It's like the reverse corkscrew, but you spin me", "Certified Penetration Tester", "\"I'm still nippy :(\"", "\"I should add that to the site footer.\"", "ok hello", "Software Developers were seen shouting at a bus", "Get out of the lift", "Achieved with CSS3", "I would", "it is a mystery", "sometimes I wonder if science thinks about me as much as I think about it idk", "hue", "And away we go", "mvp", "rip in peace", "You are the Dancing Queen<br />Lettuce Scream<br />Holy Submarine", "( ͡° ͜ʖ ͡°)", "Reticulating Splines", "You wouldn't download a website", "sitty thing??", "Work harder. Get a car.", "I solemnly swear I am up to no good.", "Game of the Year", "Britishname Complicated", "nyello", "i lied", "That's moderately Raven", "Snaaaaaaaake!", "Not enough minerals", "Spawn more Overlords", "ayyyyyy", "But what is the plural of Haggis?", "You're not even a real journalism.", "[website intensifies]", "*Angrily fixes Bow Tie*", "And the crowd goes mild", "well, yes", "Why does my tea taste like flowers?", "&gt; tfw your almonds aren't activated", "You have to be there to be not square", "\"I'm happy with my Fisher Price sized Return key\"", "smell my hair", "Best Chick Flick: Chicken Run", "how do u face ur problem if ur problem is ur face??", "why fall in love when u can fall asleep", "*you're", "with great power comes great electricity bill", "7/11 was a part time job", "there was an attempt", "u did a do", "Be aware of me!", "The Alright Wall Of China", "You've still got spots!", "It was me. I let the dogs out.", "Humanity was born without claws, without fangs, without scales.<br />So we forged them in fire and crafted them of steel.", "Oh yes, lot's of yeah.", "Ah, the Rolls Royce. Truly the Rolls Royce of automobiles.", "Geth do not *intentionally* infiltrate.", "/dev/null", "kill yourself or die trying", "well hello there", "not so fast mister", "yes i'll hold", "now playing", "music enabled for 009", "Have you tried turning it off and on again?", "You wouldn't shoot a policeman", "0118 999 881 999 119 725.. 3", "I'll just put it here with the rest of the fire.", "Fire - exclamation mark - fire - exclamation mark - help me - exclamation mark.<br />Looking forward to hearing from you.", "I don't know if it's the loss of blood or the melting plastic from the monitor, but I feel great!", "Good morning, that's a nice tnetennba.", "I'm not a window cleaner!", "\"My mum's on Friendface. She has put down her current mood as 'sensual'.\"", "Elevator's not worthy.", "woomy", "They say taupe is very soothing.", "This city deserves a better class of criminal.", "The Lamborghini, then. Much more subtle.", "I would lose weight but I hate losing", "He kissed my bottom, Your Honor.", "\"Wow, this is the kind of car you see on commercials.\"", "Shut up Judge!", "Gay probe coming to save me. Got it.", "No amount of careful design by NASA can get around a determined arsonist with a tank of pure oxygen.", "Everything you type is being broadcast live all over the world.<br />Look! A pair of boobs! -> (.Y.)", "\"Brought product to surface of Mars. It stopped working. 0/10.\"", "Yes, of course duct tape works in a near-vacuum. Duct tape works anywhere. Duct tape is magic and should be worshipped.", "As with most of life's problems, this one can be solved by a box of pure radiation.", "Only an idiot would keep that thing near the Hab. So anyway, I brought it back to the Hab.", "Problem is (follow me closely here, the science is pretty complicated), if I cut a hole in the Hab, the air won't stay inside anymore.", "All the subtlety and finesse of a napalm enema.", "\"I'm running away with your wife!\", \"Great!\"", "If you see my wife, tell her I said \"Hello\".", "\"I'm not a vegetarian because I love animals, I'm vegetarian because I hate plants.\"", "Make up looks pretty on the outside, but it doesn't hide the ugly on the inside.<br />Unless you eat it.", "Education is important but big biceps are importanter.", "Just because you're trash doesn't mean you can't do great things. It's garbage can, not garbage cannot.", "\"Oh, it doesn't like being stuck in the past.\"", "I haven't eated since the last time I eated.", "\"There's actually more cells in our brains than there are brains in our entire body\"", "<code>Bug 000871 [projectiles] - babies fall to death when born on stairs</code>", "<code>This is a menacing iron spike. This object menaces with spikes of iron.</code>", "<code>Bug 5971: Fat dwarves eating causes lag</code>", "<code>Bug 6817: 'Behold, mortal. I am a diving being.'</code>", "<code>'I died.' 'The Weather looks to be fine today.' 'I heard that I died.'</code>", "<code>'In a time before time, I killed me.' -Human with nothing else to gossip about</code>"];

  $("#main--footer--quote").html(quotes[Math.floor(Math.random() * quotes.length)]);

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VzL2xheW91dHMvbWFpbi9tYWluLmpzIiwic291cmNlcyI6WyJyZXNvdXJjZXMvbGF5b3V0cy9tYWluL21haW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0FBQUEsTUFBQTs7RUFBQSxDQUFBLENBQUUsU0FBQTtXQUNELENBQUEsQ0FBRyx5QkFBSCxDQUE4QixDQUFDLE9BQS9CLENBQUE7RUFEQyxDQUFGOztFQUtBLE9BQUEsR0FBVSxDQUFBLENBQUcsZ0JBQUg7O0VBRVYsSUFBRyxZQUFZLENBQUMsT0FBYixDQUFzQix1QkFBdEIsQ0FBSDtJQUNDLE9BQU8sQ0FBQyxJQUFSLENBQUEsRUFERDs7O0VBR0EsQ0FBQSxDQUFHLG1CQUFILENBQXdCLENBQUMsS0FBekIsQ0FBK0IsU0FBQTtJQUM5QixPQUFPLENBQUMsTUFBUixDQUFBO0lBQ0EsSUFBRyxZQUFZLENBQUMsT0FBYixDQUFzQix1QkFBdEIsQ0FBSDthQUNDLFlBQVksQ0FBQyxVQUFiLENBQXlCLHVCQUF6QixFQUREO0tBQUEsTUFBQTthQUdDLFlBQVksQ0FBQyxPQUFiLENBQXNCLHVCQUF0QixFQUErQyxJQUEvQyxFQUhEOztFQUY4QixDQUEvQjs7RUFTQSxTQUFBLEdBQVksQ0FBQSxDQUFHLGFBQUg7O0VBQ1osS0FBQSxHQUFRLENBQUEsQ0FBRyxNQUFIOztFQUVSLENBQUEsQ0FBRyxpQkFBSCxDQUFzQixDQUFDLEtBQXZCLENBQTZCLFNBQUE7SUFDNUIsU0FBUyxDQUFDLFdBQVYsQ0FBdUIsdUJBQXZCO1dBQ0EsS0FBSyxDQUFDLFdBQU4sQ0FBbUIsV0FBbkI7RUFGNEIsQ0FBN0I7O0VBTUEsb0JBQUEsR0FBdUIsQ0FBQSxDQUFHLDBCQUFIOztFQUN2QixpQkFBQSxHQUFvQjs7RUFFcEIsQ0FBQSxDQUFHLG1CQUFILENBQXdCLENBQUMsS0FBekIsQ0FBK0IsU0FBQTtJQUM5QixLQUFLLENBQUMsV0FBTixDQUFtQixhQUFuQjtJQUNBLG9CQUFvQixDQUFDLElBQXJC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RUFrRlIsdUNBbEZRLEVBbUZSLGtDQW5GUSxFQW9GUiwwREFwRlEsRUFxRlIsZ0JBckZRLEVBc0ZSLHNDQXRGUSxFQXVGUixzR0F2RlEsRUF3RlIsc0dBeEZRLEVBeUZSLG1FQXpGUSxFQTBGUix5SEExRlEsRUEyRlIscUZBM0ZRLEVBNEZSLDRGQTVGUSxFQTZGUix3SUE3RlEsRUE4RlIsaURBOUZRLEVBK0ZSLGtEQS9GUSxFQWdHUixnREFoR1EsRUFpR1Isd0ZBakdRLEVBa0dSLDBHQWxHUSxFQW1HUix3REFuR1EsRUFvR1IseUdBcEdRLEVBcUdSLGtEQXJHUSxFQXNHUiw4Q0F0R1EsRUF1R1Isd0ZBdkdRLEVBd0dSLGtGQXhHUSxFQXlHUixzRkF6R1EsRUEwR1Isc0RBMUdRLEVBMkdSLCtEQTNHUSxFQTRHUixxRkE1R1EsRUE2R1IsNkZBN0dROztFQWdIVCxDQUFBLENBQUcsc0JBQUgsQ0FBMkIsQ0FBQyxJQUE1QixDQUNDLE1BQVEsQ0FBQSxJQUFJLENBQUMsS0FBTCxDQUFZLElBQUksQ0FBQyxNQUFMLENBQUEsQ0FBQSxHQUFnQixNQUFNLENBQUMsTUFBbkMsQ0FBQSxDQURUO0FBak9BIiwic291cmNlc0NvbnRlbnQiOlsiIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyBCb290c3RyYXAgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuJCAtPlxuXHQkKCAnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScgKS50b29sdGlwKClcblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyBFeHRlbmRlZCBOYXZiYXIgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuJGV4dE5hdiA9ICQoIFwiI21haW4tLWV4dC1uYXZcIiApXG5cbmlmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCBcIm1haW4tLWV4dC1uYXYtLWhpZGRlblwiIClcblx0JGV4dE5hdi5oaWRlKClcblxuJCggXCIjbWFpbi0tZXh0LXRvZ2dsZVwiICkuY2xpY2sgLT5cblx0JGV4dE5hdi50b2dnbGUoKVxuXHRpZiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSggXCJtYWluLS1leHQtbmF2LS1oaWRkZW5cIiApXG5cdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oIFwibWFpbi0tZXh0LW5hdi0taGlkZGVuXCIgKVxuXHRlbHNlXG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oIFwibWFpbi0tZXh0LW5hdi0taGlkZGVuXCIsIHRydWUgKVxuXG5cblxuJG1haW5NYWluID0gJCggXCIjbWFpbi0tbWFpblwiIClcbiRib2R5ID0gJCggXCJib2R5XCIgKVxuXG4kKCBcIiNtYWluLS1kYXJrbW9kZVwiICkuY2xpY2sgLT5cblx0JG1haW5NYWluLnRvZ2dsZUNsYXNzKCBcImJnLWludmVyc2UgdGV4dC13aGl0ZVwiIClcblx0JGJvZHkudG9nZ2xlQ2xhc3MoIFwiX2Rhcmttb2RlXCIgKVxuXG4jIyBGdWxsc2NyZWVuICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuJG1haW5GdWxsc2NyZWVuQ2xvc2UgPSAkKCBcIiNtYWluLS1mdWxsc2NyZWVuLS1jbG9zZVwiIClcbmZ1bGxzY3JlZW5UaW1lb3V0ID0gbnVsbFxuXG4kKCBcIiNtYWluLS1mdWxsc2NyZWVuXCIgKS5jbGljayAtPlxuXHQkYm9keS50b2dnbGVDbGFzcyggXCJfZnVsbHNjcmVlblwiIClcblx0JG1haW5GdWxsc2NyZWVuQ2xvc2Uuc2hvdygpXG5cdGZ1bGxzY3JlZW5UaW1lb3V0ID0gc2V0VGltZW91dCggLT5cblx0XHQkbWFpbkZ1bGxzY3JlZW5DbG9zZS5jc3MoIG9wYWNpdHk6IDAgKVxuXHQsIDMwMDAgKVxuXG4kKCAkbWFpbkZ1bGxzY3JlZW5DbG9zZSApLmNsaWNrIC0+XG5cdCRib2R5LnJlbW92ZUNsYXNzKCBcIl9mdWxsc2NyZWVuXCIgKVxuXHRmdWxsc2NyZWVuVGltZW91dCA9IG51bGxcblx0JG1haW5GdWxsc2NyZWVuQ2xvc2UuaGlkZSgpXG5cbiRib2R5Lm9uIFwibW91c2Vtb3ZlXCIsIC0+XG5cdGlmIG5vdCBmdWxsc2NyZWVuVGltZW91dFxuXHRcdHJldHVyblxuXG5cdCRtYWluRnVsbHNjcmVlbkNsb3NlLmNzcyggb3BhY2l0eTogMSApXG5cblx0Y2xlYXJUaW1lb3V0KCBmdWxsc2NyZWVuVGltZW91dCApXG5cdGZ1bGxzY3JlZW5UaW1lb3V0ID0gc2V0VGltZW91dCggLT5cblx0XHQkbWFpbkZ1bGxzY3JlZW5DbG9zZS5jc3MoIG9wYWNpdHk6IDAgKVxuXHQsIDMwMDAgKVxuXG5cblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMgU2V0dGluZ3MgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuaWYgJCggXCIjbWFpbi0tc2V0dGluZ3MtLW1vZGFsXCIgKS5sZW5ndGggPiAwXG5cdHdpbmRvdy5jb25maWcgPSB7fVxuXG5cdCQoIFwiLnNldHRpbmctLWNvbnRyb2xcIiApLmVhY2ggLT5cblx0XHQkYyA9ICQoIHRoaXMgKVxuXHRcdGlkID0gJGMuYXR0ciggXCJkYXRhLWlkXCIgKVxuXHRcdG5vc2F2ZSA9ICRjLmF0dHIoIFwiZGF0YS1ub3NhdmVcIiApXG5cblx0XHRzd2l0Y2ggJGMuYXR0ciggXCJkYXRhLXR5cGVcIiApXG5cdFx0XHR3aGVuIFwiYm9vbGVhblwiXG5cdFx0XHRcdHN0b3JlZFZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oIGlkICkgPT0gXCJ0cnVlXCJcblx0XHRcdFx0aWYgc3RvcmVkVmFsdWU/IGFuZCBub3Qgbm9zYXZlXG5cdFx0XHRcdFx0JGMucHJvcCggXCJjaGVja2VkXCIsIHN0b3JlZFZhbHVlIClcblx0XHRcdFx0XHR3aW5kb3cuY29uZmlnWyBpZCBdID0gc3RvcmVkVmFsdWVcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHN0b3JlZFZhbHVlID0gJGMucHJvcCggXCJjaGVja2VkXCIgKVxuXHRcdFx0XHRcdHdpbmRvdy5jb25maWdbIGlkIF0gPSBzdG9yZWRWYWx1ZVxuXHRcdFx0XHRcdGlmIG5vdCBub3NhdmVcblx0XHRcdFx0XHRcdHRyeSBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSggaWQsIHN0b3JlZFZhbHVlIClcblxuXHRcdFx0XHQkYy5vbiBcImNoYW5nZVwiLCAtPlxuXHRcdFx0XHRcdHdpbmRvdy5jb25maWdbIGlkIF0gPSAkYy5wcm9wKCBcImNoZWNrZWRcIiApXG5cdFx0XHRcdFx0aWYgbm90IG5vc2F2ZVxuXHRcdFx0XHRcdFx0dHJ5IGxvY2FsU3RvcmFnZS5zZXRJdGVtKCBpZCwgd2luZG93LmNvbmZpZ1sgaWQgXSApXG5cdFx0XHR3aGVuIFwidGV4dFwiXG5cdFx0XHRcdHN0b3JlZFZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oIGlkIClcblx0XHRcdFx0aWYgc3RvcmVkVmFsdWU/IGFuZCBub3Qgbm9zYXZlXG5cdFx0XHRcdFx0JGMudmFsKCBzdG9yZWRWYWx1ZSApXG5cdFx0XHRcdFx0d2luZG93LmNvbmZpZ1sgaWQgXSA9IHN0b3JlZFZhbHVlXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRzdG9yZWRWYWx1ZSA9ICRjLnZhbCgpXG5cdFx0XHRcdFx0d2luZG93LmNvbmZpZ1sgaWQgXSA9IHN0b3JlZFZhbHVlXG5cdFx0XHRcdFx0aWYgbm90IG5vc2F2ZVxuXHRcdFx0XHRcdFx0dHJ5IGxvY2FsU3RvcmFnZS5zZXRJdGVtKCBpZCwgc3RvcmVkVmFsdWUgKVxuXG5cdFx0XHRcdCRjLm9uIFwiY2hhbmdlXCIsIC0+XG5cdFx0XHRcdFx0d2luZG93LmNvbmZpZ1sgaWQgXSA9ICRjLnZhbCgpXG5cdFx0XHRcdFx0aWYgbm90IG5vc2F2ZVxuXHRcdFx0XHRcdFx0dHJ5IGxvY2FsU3RvcmFnZS5zZXRJdGVtKCBpZCwgd2luZG93LmNvbmZpZ1sgaWQgXSApXG5cblx0JCggXCIjbWFpbi0tc2V0dGluZ3MtLXJlc2V0XCIgKS5jbGljayAtPlxuXHRcdGlmIGNvbmZpcm0oIFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHJlc2V0IGFsbCBzZXR0aW5ncz9cIiApXG5cdFx0XHQkKCBcIi5zZXR0aW5nLS1jb250cm9sXCIgKS5lYWNoIC0+XG5cdFx0XHRcdGlmICQoIHRoaXMgKS5hdHRyKCBcImRhdGEtbm9zYXZlXCIgKVxuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHR0cnkgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oICQoIHRoaXMgKS5hdHRyKCBcImRhdGEtaWRcIiApIClcblx0XHRcdGxvY2F0aW9uLnJlbG9hZCgpXG5cbndpbmRvdy5tYWluU2V0dGluZyA9ICggaWQsIGZuICkgLT5cblx0Zm4oIHRydWUgKVxuXHQkKCBcIi5zZXR0aW5nLS1jb250cm9sW2RhdGEtaWQ9JyN7aWR9J11cIiApLm9uIFwiY2hhbmdlXCIsIC0+IGZuKCBmYWxzZSApXG5cblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIFF1b3RlICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxucXVvdGVzID0gW1xuXHRcIk1ldGFsIEdlYXI/XCJcblx0XCJUaGlzIGlzbid0IGEgY2FyXCJcblx0XCJJdCdzIGxpa2UgdGhlIHJldmVyc2UgY29ya3NjcmV3LCBidXQgeW91IHNwaW4gbWVcIlxuXHRcIkNlcnRpZmllZCBQZW5ldHJhdGlvbiBUZXN0ZXJcIlxuXHRcIlxcXCJJJ20gc3RpbGwgbmlwcHkgOihcXFwiXCJcblx0XCJcXFwiSSBzaG91bGQgYWRkIHRoYXQgdG8gdGhlIHNpdGUgZm9vdGVyLlxcXCJcIlxuXHRcIm9rIGhlbGxvXCJcblx0XCJTb2Z0d2FyZSBEZXZlbG9wZXJzIHdlcmUgc2VlbiBzaG91dGluZyBhdCBhIGJ1c1wiXG5cdFwiR2V0IG91dCBvZiB0aGUgbGlmdFwiXG5cdFwiQWNoaWV2ZWQgd2l0aCBDU1MzXCJcblx0XCJJIHdvdWxkXCJcblx0XCJpdCBpcyBhIG15c3RlcnlcIlxuXHRcInNvbWV0aW1lcyBJIHdvbmRlciBpZiBzY2llbmNlIHRoaW5rcyBhYm91dCBtZSBhcyBtdWNoIGFzIEkgdGhpbmsgYWJvdXQgaXQgaWRrXCJcblx0XCJodWVcIlxuXHRcIkFuZCBhd2F5IHdlIGdvXCJcblx0XCJtdnBcIlxuXHRcInJpcCBpbiBwZWFjZVwiXG5cdFwiWW91IGFyZSB0aGUgRGFuY2luZyBRdWVlbjxiciAvPkxldHR1Y2UgU2NyZWFtPGJyIC8+SG9seSBTdWJtYXJpbmVcIlxuXHRcIiggzaHCsCDNnMqWIM2hwrApXCJcblx0XCJSZXRpY3VsYXRpbmcgU3BsaW5lc1wiXG5cdFwiWW91IHdvdWxkbid0IGRvd25sb2FkIGEgd2Vic2l0ZVwiXG5cdFwic2l0dHkgdGhpbmc/P1wiXG5cdFwiV29yayBoYXJkZXIuIEdldCBhIGNhci5cIlxuXHRcIkkgc29sZW1ubHkgc3dlYXIgSSBhbSB1cCB0byBubyBnb29kLlwiXG5cdFwiR2FtZSBvZiB0aGUgWWVhclwiXG5cdFwiQnJpdGlzaG5hbWUgQ29tcGxpY2F0ZWRcIlxuXHRcIm55ZWxsb1wiXG5cdFwiaSBsaWVkXCJcblx0XCJUaGF0J3MgbW9kZXJhdGVseSBSYXZlblwiXG5cdFwiU25hYWFhYWFhYWtlIVwiXG5cdFwiTm90IGVub3VnaCBtaW5lcmFsc1wiXG5cdFwiU3Bhd24gbW9yZSBPdmVybG9yZHNcIlxuXHRcImF5eXl5eXlcIlxuXHRcIkJ1dCB3aGF0IGlzIHRoZSBwbHVyYWwgb2YgSGFnZ2lzP1wiXG5cdFwiWW91J3JlIG5vdCBldmVuIGEgcmVhbCBqb3VybmFsaXNtLlwiXG5cdFwiW3dlYnNpdGUgaW50ZW5zaWZpZXNdXCJcblx0XCIqQW5ncmlseSBmaXhlcyBCb3cgVGllKlwiXG5cdFwiQW5kIHRoZSBjcm93ZCBnb2VzIG1pbGRcIlxuXHRcIndlbGwsIHllc1wiXG5cdFwiV2h5IGRvZXMgbXkgdGVhIHRhc3RlIGxpa2UgZmxvd2Vycz9cIlxuXHRcIiZndDsgdGZ3IHlvdXIgYWxtb25kcyBhcmVuJ3QgYWN0aXZhdGVkXCJcblx0XCJZb3UgaGF2ZSB0byBiZSB0aGVyZSB0byBiZSBub3Qgc3F1YXJlXCJcblx0XCJcXFwiSSdtIGhhcHB5IHdpdGggbXkgRmlzaGVyIFByaWNlIHNpemVkIFJldHVybiBrZXlcXFwiXCJcblx0XCJzbWVsbCBteSBoYWlyXCJcblx0XCJCZXN0IENoaWNrIEZsaWNrOiBDaGlja2VuIFJ1blwiXG5cdFwiaG93IGRvIHUgZmFjZSB1ciBwcm9ibGVtIGlmIHVyIHByb2JsZW0gaXMgdXIgZmFjZT8/XCJcblx0XCJ3aHkgZmFsbCBpbiBsb3ZlIHdoZW4gdSBjYW4gZmFsbCBhc2xlZXBcIlxuXHRcIip5b3UncmVcIlxuXHRcIndpdGggZ3JlYXQgcG93ZXIgY29tZXMgZ3JlYXQgZWxlY3RyaWNpdHkgYmlsbFwiXG5cdFwiNy8xMSB3YXMgYSBwYXJ0IHRpbWUgam9iXCJcblx0XCJ0aGVyZSB3YXMgYW4gYXR0ZW1wdFwiXG5cdFwidSBkaWQgYSBkb1wiXG5cdFwiQmUgYXdhcmUgb2YgbWUhXCJcblx0XCJUaGUgQWxyaWdodCBXYWxsIE9mIENoaW5hXCJcblx0XCJZb3UndmUgc3RpbGwgZ290IHNwb3RzIVwiXG5cdFwiSXQgd2FzIG1lLiBJIGxldCB0aGUgZG9ncyBvdXQuXCJcblx0XCJIdW1hbml0eSB3YXMgYm9ybiB3aXRob3V0IGNsYXdzLCB3aXRob3V0IGZhbmdzLCB3aXRob3V0IHNjYWxlcy48YnIgLz5TbyB3ZSBmb3JnZWQgdGhlbSBpbiBmaXJlIGFuZCBjcmFmdGVkIHRoZW0gb2Ygc3RlZWwuXCJcblx0XCJPaCB5ZXMsIGxvdCdzIG9mIHllYWguXCJcblx0XCJBaCwgdGhlIFJvbGxzIFJveWNlLiBUcnVseSB0aGUgUm9sbHMgUm95Y2Ugb2YgYXV0b21vYmlsZXMuXCJcblx0XCJHZXRoIGRvIG5vdCAqaW50ZW50aW9uYWxseSogaW5maWx0cmF0ZS5cIlxuXHRcIi9kZXYvbnVsbFwiXG5cdFwia2lsbCB5b3Vyc2VsZiBvciBkaWUgdHJ5aW5nXCJcblx0XCJ3ZWxsIGhlbGxvIHRoZXJlXCJcblx0XCJub3Qgc28gZmFzdCBtaXN0ZXJcIlxuXHRcInllcyBpJ2xsIGhvbGRcIlxuXHRcIm5vdyBwbGF5aW5nXCJcblx0XCJtdXNpYyBlbmFibGVkIGZvciAwMDlcIlxuXHRcIkhhdmUgeW91IHRyaWVkIHR1cm5pbmcgaXQgb2ZmIGFuZCBvbiBhZ2Fpbj9cIlxuXHRcIllvdSB3b3VsZG4ndCBzaG9vdCBhIHBvbGljZW1hblwiXG5cdFwiMDExOCA5OTkgODgxIDk5OSAxMTkgNzI1Li4gM1wiXG5cdFwiSSdsbCBqdXN0IHB1dCBpdCBoZXJlIHdpdGggdGhlIHJlc3Qgb2YgdGhlIGZpcmUuXCJcblx0XCJGaXJlIC0gZXhjbGFtYXRpb24gbWFyayAtIGZpcmUgLSBleGNsYW1hdGlvbiBtYXJrIC0gaGVscCBtZSAtIGV4Y2xhbWF0aW9uIG1hcmsuPGJyIC8+TG9va2luZyBmb3J3YXJkIHRvIGhlYXJpbmcgZnJvbSB5b3UuXCJcblx0XCJJIGRvbid0IGtub3cgaWYgaXQncyB0aGUgbG9zcyBvZiBibG9vZCBvciB0aGUgbWVsdGluZyBwbGFzdGljIGZyb20gdGhlIG1vbml0b3IsIGJ1dCBJIGZlZWwgZ3JlYXQhXCJcblx0XCJHb29kIG1vcm5pbmcsIHRoYXQncyBhIG5pY2UgdG5ldGVubmJhLlwiXG5cdFwiSSdtIG5vdCBhIHdpbmRvdyBjbGVhbmVyIVwiXG5cdFwiXFxcIk15IG11bSdzIG9uIEZyaWVuZGZhY2UuIFNoZSBoYXMgcHV0IGRvd24gaGVyIGN1cnJlbnQgbW9vZCBhcyAnc2Vuc3VhbCcuXFxcIlwiXG5cdFwiRWxldmF0b3IncyBub3Qgd29ydGh5LlwiXG5cdFwid29vbXlcIlxuXHRcIlRoZXkgc2F5IHRhdXBlIGlzIHZlcnkgc29vdGhpbmcuXCJcblx0XCJUaGlzIGNpdHkgZGVzZXJ2ZXMgYSBiZXR0ZXIgY2xhc3Mgb2YgY3JpbWluYWwuXCJcblx0XCJUaGUgTGFtYm9yZ2hpbmksIHRoZW4uIE11Y2ggbW9yZSBzdWJ0bGUuXCJcblx0XCJJIHdvdWxkIGxvc2Ugd2VpZ2h0IGJ1dCBJIGhhdGUgbG9zaW5nXCJcblx0XCJIZSBraXNzZWQgbXkgYm90dG9tLCBZb3VyIEhvbm9yLlwiXG5cdFwiXFxcIldvdywgdGhpcyBpcyB0aGUga2luZCBvZiBjYXIgeW91IHNlZSBvbiBjb21tZXJjaWFscy5cXFwiXCJcblx0XCJTaHV0IHVwIEp1ZGdlIVwiXG5cdFwiR2F5IHByb2JlIGNvbWluZyB0byBzYXZlIG1lLiBHb3QgaXQuXCJcblx0XCJObyBhbW91bnQgb2YgY2FyZWZ1bCBkZXNpZ24gYnkgTkFTQSBjYW4gZ2V0IGFyb3VuZCBhIGRldGVybWluZWQgYXJzb25pc3Qgd2l0aCBhIHRhbmsgb2YgcHVyZSBveHlnZW4uXCJcblx0XCJFdmVyeXRoaW5nIHlvdSB0eXBlIGlzIGJlaW5nIGJyb2FkY2FzdCBsaXZlIGFsbCBvdmVyIHRoZSB3b3JsZC48YnIgLz5Mb29rISBBIHBhaXIgb2YgYm9vYnMhIC0+ICguWS4pXCJcblx0XCJcXFwiQnJvdWdodCBwcm9kdWN0IHRvIHN1cmZhY2Ugb2YgTWFycy4gSXQgc3RvcHBlZCB3b3JraW5nLiAwLzEwLlxcXCJcIlxuXHRcIlllcywgb2YgY291cnNlIGR1Y3QgdGFwZSB3b3JrcyBpbiBhIG5lYXItdmFjdXVtLiBEdWN0IHRhcGUgd29ya3MgYW55d2hlcmUuIER1Y3QgdGFwZSBpcyBtYWdpYyBhbmQgc2hvdWxkIGJlIHdvcnNoaXBwZWQuXCJcblx0XCJBcyB3aXRoIG1vc3Qgb2YgbGlmZSdzIHByb2JsZW1zLCB0aGlzIG9uZSBjYW4gYmUgc29sdmVkIGJ5IGEgYm94IG9mIHB1cmUgcmFkaWF0aW9uLlwiXG5cdFwiT25seSBhbiBpZGlvdCB3b3VsZCBrZWVwIHRoYXQgdGhpbmcgbmVhciB0aGUgSGFiLiBTbyBhbnl3YXksIEkgYnJvdWdodCBpdCBiYWNrIHRvIHRoZSBIYWIuXCJcblx0XCJQcm9ibGVtIGlzIChmb2xsb3cgbWUgY2xvc2VseSBoZXJlLCB0aGUgc2NpZW5jZSBpcyBwcmV0dHkgY29tcGxpY2F0ZWQpLCBpZiBJIGN1dCBhIGhvbGUgaW4gdGhlIEhhYiwgdGhlIGFpciB3b24ndCBzdGF5IGluc2lkZSBhbnltb3JlLlwiXG5cdFwiQWxsIHRoZSBzdWJ0bGV0eSBhbmQgZmluZXNzZSBvZiBhIG5hcGFsbSBlbmVtYS5cIlxuXHRcIlxcXCJJJ20gcnVubmluZyBhd2F5IHdpdGggeW91ciB3aWZlIVxcXCIsIFxcXCJHcmVhdCFcXFwiXCJcblx0XCJJZiB5b3Ugc2VlIG15IHdpZmUsIHRlbGwgaGVyIEkgc2FpZCBcXFwiSGVsbG9cXFwiLlwiXG5cdFwiXFxcIkknbSBub3QgYSB2ZWdldGFyaWFuIGJlY2F1c2UgSSBsb3ZlIGFuaW1hbHMsIEknbSB2ZWdldGFyaWFuIGJlY2F1c2UgSSBoYXRlIHBsYW50cy5cXFwiXCJcblx0XCJNYWtlIHVwIGxvb2tzIHByZXR0eSBvbiB0aGUgb3V0c2lkZSwgYnV0IGl0IGRvZXNuJ3QgaGlkZSB0aGUgdWdseSBvbiB0aGUgaW5zaWRlLjxiciAvPlVubGVzcyB5b3UgZWF0IGl0LlwiXG5cdFwiRWR1Y2F0aW9uIGlzIGltcG9ydGFudCBidXQgYmlnIGJpY2VwcyBhcmUgaW1wb3J0YW50ZXIuXCJcblx0XCJKdXN0IGJlY2F1c2UgeW91J3JlIHRyYXNoIGRvZXNuJ3QgbWVhbiB5b3UgY2FuJ3QgZG8gZ3JlYXQgdGhpbmdzLiBJdCdzIGdhcmJhZ2UgY2FuLCBub3QgZ2FyYmFnZSBjYW5ub3QuXCJcblx0XCJcXFwiT2gsIGl0IGRvZXNuJ3QgbGlrZSBiZWluZyBzdHVjayBpbiB0aGUgcGFzdC5cXFwiXCJcblx0XCJJIGhhdmVuJ3QgZWF0ZWQgc2luY2UgdGhlIGxhc3QgdGltZSBJIGVhdGVkLlwiXG5cdFwiXFxcIlRoZXJlJ3MgYWN0dWFsbHkgbW9yZSBjZWxscyBpbiBvdXIgYnJhaW5zIHRoYW4gdGhlcmUgYXJlIGJyYWlucyBpbiBvdXIgZW50aXJlIGJvZHlcXFwiXCJcblx0XCI8Y29kZT5CdWcgMDAwODcxIFtwcm9qZWN0aWxlc10gLSBiYWJpZXMgZmFsbCB0byBkZWF0aCB3aGVuIGJvcm4gb24gc3RhaXJzPC9jb2RlPlwiXG5cdFwiPGNvZGU+VGhpcyBpcyBhIG1lbmFjaW5nIGlyb24gc3Bpa2UuIFRoaXMgb2JqZWN0IG1lbmFjZXMgd2l0aCBzcGlrZXMgb2YgaXJvbi48L2NvZGU+XCJcblx0XCI8Y29kZT5CdWcgNTk3MTogRmF0IGR3YXJ2ZXMgZWF0aW5nIGNhdXNlcyBsYWc8L2NvZGU+XCJcblx0XCI8Y29kZT5CdWcgNjgxNzogJ0JlaG9sZCwgbW9ydGFsLiBJIGFtIGEgZGl2aW5nIGJlaW5nLic8L2NvZGU+XCJcblx0XCI8Y29kZT4nSSBkaWVkLicgJ1RoZSBXZWF0aGVyIGxvb2tzIHRvIGJlIGZpbmUgdG9kYXkuJyAnSSBoZWFyZCB0aGF0IEkgZGllZC4nPC9jb2RlPlwiXG5cdFwiPGNvZGU+J0luIGEgdGltZSBiZWZvcmUgdGltZSwgSSBraWxsZWQgbWUuJyAtSHVtYW4gd2l0aCBub3RoaW5nIGVsc2UgdG8gZ29zc2lwIGFib3V0PC9jb2RlPlwiXG5dXG5cbiQoIFwiI21haW4tLWZvb3Rlci0tcXVvdGVcIiApLmh0bWwoXG5cdHF1b3Rlc1sgTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIHF1b3Rlcy5sZW5ndGggKSBdXG4pXG4iXX0=
