################################## Bootstrap ###################################

$ ->
	$( '[data-toggle="tooltip"]' ).tooltip()

############################### Extended Navbar ################################

$extNav = $( "#main--ext-nav" )

if localStorage.getItem( "main--ext-nav--hidden" )
	$extNav.hide()

$( "#main--ext-toggle" ).click ->
	$extNav.toggle()
	if localStorage.getItem( "main--ext-nav--hidden" )
		localStorage.removeItem( "main--ext-nav--hidden" )
	else
		localStorage.setItem( "main--ext-nav--hidden", true )



$mainMain = $( "#main--main" )
$body = $( "body" )

$( "#main--darkmode" ).click ->
	$mainMain.toggleClass( "bg-inverse text-white" )
	$body.toggleClass( "_darkmode" )

## Fullscreen #########################

$mainFullscreenClose = $( "#main--fullscreen--close" )
fullscreenTimeout = null

$( "#main--fullscreen" ).click ->
	$body.toggleClass( "_fullscreen" )
	$mainFullscreenClose.show()
	fullscreenTimeout = setTimeout( ->
		$mainFullscreenClose.css( opacity: 0 )
	, 3000 )

$( $mainFullscreenClose ).click ->
	$body.removeClass( "_fullscreen" )
	fullscreenTimeout = null
	$mainFullscreenClose.hide()

$body.on "mousemove", ->
	if not fullscreenTimeout
		return

	$mainFullscreenClose.css( opacity: 1 )

	clearTimeout( fullscreenTimeout )
	fullscreenTimeout = setTimeout( ->
		$mainFullscreenClose.css( opacity: 0 )
	, 3000 )



################################### Settings ###################################

if $( "#main--settings--modal" ).length > 0
	window.config = {}

	$( ".setting--control" ).each ->
		$c = $( this )
		id = $c.attr( "data-id" )
		nosave = $c.attr( "data-nosave" )

		switch $c.attr( "data-type" )
			when "boolean"
				storedValue = localStorage.getItem( id ) == "true"
				if storedValue? and not nosave
					$c.prop( "checked", storedValue )
					window.config[ id ] = storedValue
				else
					storedValue = $c.prop( "checked" )
					window.config[ id ] = storedValue
					if not nosave
						try localStorage.setItem( id, storedValue )

				$c.on "change", ->
					window.config[ id ] = $c.prop( "checked" )
					if not nosave
						try localStorage.setItem( id, window.config[ id ] )
			when "text"
				storedValue = localStorage.getItem( id )
				if storedValue? and not nosave
					$c.val( storedValue )
					window.config[ id ] = storedValue
				else
					storedValue = $c.val()
					window.config[ id ] = storedValue
					if not nosave
						try localStorage.setItem( id, storedValue )

				$c.on "change", ->
					window.config[ id ] = $c.val()
					if not nosave
						try localStorage.setItem( id, window.config[ id ] )

	$( "#main--settings--reset" ).click ->
		if confirm( "Are you sure you want to reset all settings?" )
			$( ".setting--control" ).each ->
				if $( this ).attr( "data-nosave" )
					return
				try localStorage.removeItem( $( this ).attr( "data-id" ) )
			location.reload()

window.mainSetting = ( id, fn ) ->
	fn( true )
	$( ".setting--control[data-id='#{id}']" ).on "change", -> fn( false )


#################################### Quote #####################################

quotes = [
	"Metal Gear?"
	"This isn't a car"
	"It's like the reverse corkscrew, but you spin me"
	"Certified Penetration Tester"
	"\"I'm still nippy :(\""
	"\"I should add that to the site footer.\""
	"ok hello"
	"Software Developers were seen shouting at a bus"
	"Get out of the lift"
	"Achieved with CSS3"
	"I would"
	"it is a mystery"
	"sometimes I wonder if science thinks about me as much as I think about it idk"
	"hue"
	"And away we go"
	"mvp"
	"rip in peace"
	"You are the Dancing Queen<br />Lettuce Scream<br />Holy Submarine"
	"( ͡° ͜ʖ ͡°)"
	"Reticulating Splines"
	"You wouldn't download a website"
	"sitty thing??"
	"Work harder. Get a car."
	"I solemnly swear I am up to no good."
	"Game of the Year"
	"Britishname Complicated"
	"nyello"
	"i lied"
	"That's moderately Raven"
	"Snaaaaaaaake!"
	"Not enough minerals"
	"Spawn more Overlords"
	"ayyyyyy"
	"But what is the plural of Haggis?"
	"You're not even a real journalism."
	"[website intensifies]"
	"*Angrily fixes Bow Tie*"
	"And the crowd goes mild"
	"well, yes"
	"Why does my tea taste like flowers?"
	"&gt; tfw your almonds aren't activated"
	"You have to be there to be not square"
	"\"I'm happy with my Fisher Price sized Return key\""
	"smell my hair"
	"Best Chick Flick: Chicken Run"
	"how do u face ur problem if ur problem is ur face??"
	"why fall in love when u can fall asleep"
	"*you're"
	"with great power comes great electricity bill"
	"7/11 was a part time job"
	"there was an attempt"
	"u did a do"
	"Be aware of me!"
	"The Alright Wall Of China"
	"You've still got spots!"
	"It was me. I let the dogs out."
	"Humanity was born without claws, without fangs, without scales.<br />So we forged them in fire and crafted them of steel."
	"Oh yes, lot's of yeah."
	"Ah, the Rolls Royce. Truly the Rolls Royce of automobiles."
	"Geth do not *intentionally* infiltrate."
	"/dev/null"
	"kill yourself or die trying"
	"well hello there"
	"not so fast mister"
	"yes i'll hold"
	"now playing"
	"music enabled for 009"
	"Have you tried turning it off and on again?"
	"You wouldn't shoot a policeman"
	"0118 999 881 999 119 725.. 3"
	"I'll just put it here with the rest of the fire."
	"Fire - exclamation mark - fire - exclamation mark - help me - exclamation mark.<br />Looking forward to hearing from you."
	"I don't know if it's the loss of blood or the melting plastic from the monitor, but I feel great!"
	"Good morning, that's a nice tnetennba."
	"I'm not a window cleaner!"
	"\"My mum's on Friendface. She has put down her current mood as 'sensual'.\""
	"Elevator's not worthy."
	"woomy"
	"They say taupe is very soothing."
	"This city deserves a better class of criminal."
	"The Lamborghini, then. Much more subtle."
	"I would lose weight but I hate losing"
	"He kissed my bottom, Your Honor."
	"\"Wow, this is the kind of car you see on commercials.\""
	"Shut up Judge!"
	"Gay probe coming to save me. Got it."
	"No amount of careful design by NASA can get around a determined arsonist with a tank of pure oxygen."
	"Everything you type is being broadcast live all over the world.<br />Look! A pair of boobs! -> (.Y.)"
	"\"Brought product to surface of Mars. It stopped working. 0/10.\""
	"Yes, of course duct tape works in a near-vacuum. Duct tape works anywhere. Duct tape is magic and should be worshipped."
	"As with most of life's problems, this one can be solved by a box of pure radiation."
	"Only an idiot would keep that thing near the Hab. So anyway, I brought it back to the Hab."
	"Problem is (follow me closely here, the science is pretty complicated), if I cut a hole in the Hab, the air won't stay inside anymore."
	"All the subtlety and finesse of a napalm enema."
	"\"I'm running away with your wife!\", \"Great!\""
	"If you see my wife, tell her I said \"Hello\"."
	"\"I'm not a vegetarian because I love animals, I'm vegetarian because I hate plants.\""
	"Make up looks pretty on the outside, but it doesn't hide the ugly on the inside.<br />Unless you eat it."
	"Education is important but big biceps are importanter."
	"Just because you're trash doesn't mean you can't do great things. It's garbage can, not garbage cannot."
	"\"Oh, it doesn't like being stuck in the past.\""
	"I haven't eated since the last time I eated."
	"\"There's actually more cells in our brains than there are brains in our entire body\""
	"<code>Bug 000871 [projectiles] - babies fall to death when born on stairs</code>"
	"<code>This is a menacing iron spike. This object menaces with spikes of iron.</code>"
	"<code>Bug 5971: Fat dwarves eating causes lag</code>"
	"<code>Bug 6817: 'Behold, mortal. I am a diving being.'</code>"
	"<code>'I died.' 'The Weather looks to be fine today.' 'I heard that I died.'</code>"
	"<code>'In a time before time, I killed me.' -Human with nothing else to gossip about</code>"
	"Skunk (ˈskəŋk): Black and white fart squirrel"
	"We don't have time to be sexy"

]

$( "#main--footer--quote" ).html(
	quotes[ Math.floor( Math.random() * quotes.length ) ]
)
