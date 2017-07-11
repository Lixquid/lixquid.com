$( -> $( "#transform--input" ).focus() )

## Transforms ##################################################################

fcc = String.fromCharCode

transforms = {
	"Uppercase": ( input ) -> input.toUpperCase()
	"Lowercase": ( input ) -> input.toLowerCase()
	"ROT 13": ( input ) ->
		input.replace /[a-z]/gi, ( c ) ->
			c = c.charCodeAt( 0 )
			if c >= 97
				return fcc( ( c - 97 + 13 ) % 26 + 97 )
			else
				return fcc( ( c - 65 + 13 ) % 26 + 65 )
	"ROT 47": ( input ) ->
		input.replace  /[\x21-\x7e]/g, ( c ) ->
			fcc( ( c.charCodeAt( 0 ) - 33 + 47 ) % 94 + 33 )
	"Fullwidth": ( input ) ->
		input.replace  /[\x21-\x7e]/g, ( c ) ->
			fcc( c.charCodeAt( 0 ) + 65281 - 33 )
	"Circled": ( input ) ->
		input.replace /[a-z1-9]/gi, ( c ) ->
			c = c.charCodeAt( 0 )
			if c >= 97
				fcc( c + 9424 - 97 )
			else if c >= 65
				fcc( c + 9398 - 65 )
			else
				fcc( c + 9312 - 49 )
	"Math Fraktur": ( input ) ->
		input.replace /[a-z]/gi, ( c ) ->
			c = c.charCodeAt( 0 )
			if c >= 97
				fcc( 55349 ) + fcc( c + 56710 - 97 )
			else
				fcc( 55349 ) + fcc( c + 56684 - 65 )
	"Blackboard Bold": ( input ) ->
		input.replace /[a-z0-9]/gi, ( c ) ->
			c = c.charCodeAt( 0 )
			# nice one, unicode
			switch c
				when 67 then return fcc( 8450 )
				when 72 then return fcc( 8461 )
				when 78 then return fcc( 8469 )
				when 80 then return fcc( 8473 )
				when 81 then return fcc( 8474 )
				when 82 then return fcc( 8477 )
				when 90 then return fcc( 8484 )

			if c >= 97
				fcc( 55349 ) + fcc( c + 56658 - 97 )
			else if c >= 65
				fcc( 55349 ) + fcc( c + 56632 - 65 )
			else
				fcc( 55349 ) + fcc( c + 57304 - 48 )

}

## Variables ###################################################################

$transformType = $( "#transform--mode" )
$transformInput = $( "#transform--input" )
$transformOutput = $( "#transform--output" )

lipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
	euismod turpis sit amet magna sodales fermentum vitae eu tellus. Etiam
	nulla tortor, ultrices id orci sit amet, mattis pharetra nibh. Vivamus
	iaculis imperdiet odio non faucibus. Morbi ac aliquet nunc. Quisque eget
	erat vitae eros suscipit dignissim. Nunc turpis magna, aliquet nec eleifend
	in, dictum sed nunc. Aliquam sed tristique nunc, quis pellentesque urna.
	\n
	ABCDEFGHIJKLMNOPQRSTUVWXYZ
	\n
	abcdefghijklmnopqrstuvwxyz
	\n
	0123456789"

## Events ######################################################################

for key of transforms
	$transformType.append( "<option>#{key}</option>" )

doTransform = ->
	input = $transformInput.val()
	transform = transforms[ $transformType.val() ]

	if not transform?
		throw "No transform?"

	if not input
		$transformInput.val( lipsum )
		input = lipsum

	$transformOutput.val( transform( input ) )

$( "#transform--confirm" ).on "click", doTransform

doCopy = ->
	$transformOutput.select()
	try document.execCommand( "copy" )
	$transformInput.select()

## Keyboard Shortcuts ##########################################################

shortcutEnter = 13
shortcutUp = 38
shortcutDown = 40

$transformInput.keydown ( e ) ->
	if not e.ctrlKey
		return

	switch e.keyCode
		when shortcutEnter
			doTransform()
			if e.shiftKey
				doCopy()
		when shortcutUp
			el = $( "#transform--mode option:selected" )
			if not el.prev()
				return
			el.prop( "selected", false ).prev().prop( "selected", true )
		when shortcutDown
			el = $( "#transform--mode option:selected" )
			if not el.next()
				return
			el.prop( "selected", false ).next().prop( "selected", true )
