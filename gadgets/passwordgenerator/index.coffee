## Elements #####

eLength = document.getElementById "setting--length"
eUpper = document.getElementById "setting--upper"
eLower = document.getElementById "setting--lower"
eDigits = document.getElementById "setting--digits"
eSymbols = document.getElementById "setting--symbols"
eAmbiguous = document.getElementById "setting--ambiguous"
eMinDigits = document.getElementById "setting--mindigits"
eRefresh = document.getElementById "pg--refresh"
eOutput = document.getElementById "pg--output"
eError = document.getElementById "pg--error"

## Functions #########

validCharSet = []
validDigitSet = []

showError = ( str ) ->
	eError.style.display = null
	eError.innerHTML = str
	throw null

generateCharSet = ->
	validCharSet = []
	validDigitSet = []
	for i in [33..126]
		c = String.fromCharCode( i )
		if 65 <= i <= 90
			if eAmbiguous.checked and c in [ 'B', 'G', 'I', 'O', 'Q', 'D', 'S', 'Z' ]
				continue
			if not eUpper.checked
				continue
			validCharSet.push c
		else if 97 <= i <= 122
			if eAmbiguous.checked and c in [ 'l' ]
				continue
			if not eLower.checked
				continue
			validCharSet.push c
		else if 48 <= i <= 57
			if eAmbiguous.checked and c in [ '8', '6', '1', '0', '5', '2' ]
				continue
			if not eDigits.checked
				continue
			validCharSet.push c
			validDigitSet.push c
		else if eSymbols.checked
			validCharSet.push c

generateCharacter = ->
	validCharSet[ Math.floor( Math.random() * validCharSet.length ) ]

generateDigit = ->
	validDigitSet[ Math.floor( Math.random() * validDigitSet.length ) ]

shuffleArray = ( arr ) ->
	c = arr.length
	while c > 0
		i = Math.floor( Math.random() * c )

		c--

		[ arr[c], arr[i] ] = [ arr[i], arr[c] ]

	return arr

generatePassword = ->

	if not eUpper.checked and not eLower.checked and not eDigits.checked and not eSymbols.checked
		showError "At least one class of characters must be allowed"

	length = parseInt( eLength.value )
	if isNaN( length ) or length < 1
		showError "Length must be an integer above 0"

	minDigits = parseInt( eMinDigits.value or "0" )
	if isNaN( minDigits ) or minDigits < 0
		showError "Minimum digits must be a positive integer"
	if minDigits > length
		showError "Minimum digits must not be more than password length"
	if minDigits > 0
		eDigits.checked = true

	generateCharSet()

	out = []
	if minDigits > 0
		for [1..minDigits]
			out.push generateDigit()
	if length - minDigits > 0
		for [1..( length - minDigits )]
			out.push generateCharacter()

	shuffleArray( out )

	eOutput.value = out.join ""
	eError.style.display = "none"

## Events ######

eRefresh.addEventListener "click", generatePassword
eLength.addEventListener "change", generatePassword
eMinDigits.addEventListener "change", generatePassword
eLower.addEventListener "change", generatePassword
eUpper.addEventListener "change", generatePassword
eDigits.addEventListener "change", generatePassword
eSymbols.addEventListener "change", generatePassword
eAmbiguous.addEventListener "change", generatePassword

generatePassword()
