## Elements ####################################################################

eGameCard = $( "#game--card" )
eGameInputRow = $( "#game--input--row" )
eGameError = $( "#game--error" )
eGameOutput = $( "#game--output" )
eGameGuess = $( "#game--guess" )
eGameGiveup = $( "#game--giveup" )
sAmount = $( "#codebreaker--amount" )
sMax = $( "#codebreaker--max" )
sUnique = $( "#codebreaker--unique" )

game = null

## Functions ###################################################################

generateIntegers = ( amt, max ) ->
	( Math.floor( Math.random() * max + 1 ) for [1..amt] )

generateUniqueIntegers = ( amt, max ) ->
	nums = ( x for x in [1..max] )
	for i in [( nums.length - 1 )..1] by -1
		j = Math.floor( Math.random() * ( i + 1 ) )
		[ nums[i], nums[j] ] = [ nums[j], nums[i] ]
	return nums[...amt]

generateNumberSequence = ( amt ) ->
	( x for x in [1..amt] )

checkMaxSetting = ->
	if not sUnique.prop( "checked" )
		return
	if parseInt( sMax.val() ) < parseInt( sAmount.val() )
		alert( "Maximum value must be greater than or equal to amount of
			numbers to solve!" )
		sMax.val( sAmount.val() )

resetGame = ->
	amount = parseInt( sAmount.val() )
	max = parseInt( sMax.val() )
	unique = sUnique.prop( "checked" )

	if not amount or amount < 1 or not max or max < 2
		return

	game =
		amount: amount
		max: max
		unique: unique
		numbers: if unique then generateUniqueIntegers( amount, max ) else
			generateIntegers( amount, max )
		guesses: 0
		hints: 0

	eGameOutput.empty()
	eGameGuess.prop( "disabled", false )
	eGameGiveup.prop( "disabled", false )
	eGameInputRow.empty()

	size = if amount < 5
			"col"
		else if amount < 7
			"col-sm"
		else if amount < 9
			"col-md"
		else "col-12 mt-2"
	for i in [1..amount]
		eGameInputRow.append """
			<div class="#{size}">
				<select class="form-control" id="game--input--#{i}">
					#{
					( for j in [1..max]
						"<option>#{j}</option>" ).join( "" )
					}
				</select>
			</div>
		"""
resetGame()

## Events ######################################################################

sAmount.change ->
	amount = parseInt( $( this ).val() )
	if not amount?
		alert "Amount must be set to a valid integer!"
		return event.preventDefault()
	if amount < 1
		alert "Amount must be set to an integer greater than 0!"
		return event.preventDefault()
	checkMaxSetting()
	resetGame()

sMax.change ->
	max = parseInt( $( this ).val() )
	if not max?
		alert "Maximum must be set to a valid integer!"
		return event.preventDefault()
	if max < 2
		alert "Maximum must be set to an integer greater than 1!"
		return event.preventDefault()
	checkMaxSetting()
	resetGame()

sUnique.change ->
	checkMaxSetting()
	resetGame()

eGameGuess.click ->
	guess = []
	for i in [1..game.amount]
		amt = parseInt( $( "#game--input--#{i}" ).val() )
		return if not amt
		if game.unique and amt in guess
			eGameError.show()
			eGameError.text "Your guess must only consist of unique numbers!
				(#{amt} is repeated)"
			return
		else
			eGameError.hide()
			guess.push amt

	correct = 0
	near = 0
	game.guesses++

	curnums = game.numbers[..]
	for n, i in guess
		if curnums[i] == n
			correct++
			curnums[i] = null

	for n in guess
		if ( ix = curnums.indexOf( n ) ) > -1
			near++
			curnums[ix] = null

	if correct == game.amount
		eGameOutput.prepend """
			<div class="card card-body mt-2 bg-success text-light">
				<small>Guess #{game.guesses}</small>
				<span class="lead">#{guess.join(" ")}</span>
				<span>All correct!</span>
			</div>
		"""
		eGameGuess.prop( "disabled", true )
		eGameGiveup.prop( "disabled", true )
	else
		eGameOutput.prepend """
			<div class="card card-body mt-2">
				<small class="text-muted">Guess #{game.guesses}</small>
				<span class="lead">#{guess.join(" ")}</span>
				<span>
					<span class="text-success">
						<span class="lead font-weight-bold">#{correct}</span>
						correct</span>,
					<span class="text-warning">
						<span class="lead font-weight-bold">#{near}</span>
						in the wrong place</span>,
					<span class="text-danger">
						<span class="lead font-weight-bold">
							#{game.amount - correct - near}
						</span> incorrect</span>
				</span>
			</div>
		"""


$( "#game--reset" ).click ->
	if confirm( "Are you sure you want to start a new game?" )
		resetGame()

eGameGiveup.click ->
	if confirm( "Are you sure you want to give up?" )
		eGameGuess.prop( "disabled", true )
		eGameGiveup.prop( "disabled", true )
		eGameOutput.prepend """
			<div class="card card-body mt-2 bg-warning">
				<small>Gave Up - Answer</small>
				<span class="lead">#{game.numbers.join(" ")}</span>
			</div>
		"""
