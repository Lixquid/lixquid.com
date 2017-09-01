## COMMON ######################################################################

window.DISABLE_ZXCVBN_LIMIT = false

eNavBrute = document.getElementById "nav--brute"
eNavDict = document.getElementById "nav--dict"
eNavEval = document.getElementById "nav--eval"
eBruteDiv = document.getElementById "brute--div"
eDictDiv = document.getElementById "dict--div"
eEvalDiv = document.getElementById "eval--div"
eOutputDiv = document.getElementById "output--div"
eOutputError = document.getElementById "output--error"
eOutputText = document.getElementById "output--text"
eEvalInput = document.getElementById "eval--input"

activeDiv = eBruteDiv

generateBrutePassword = ->
generateDictPassword = ->
analyzeStrength = ->

hideAllNavs = ->
	eNavBrute.classList.remove "active"
	eNavDict.classList.remove "active"
	eNavEval.classList.remove "active"
	eBruteDiv.style.display = "none"
	eDictDiv.style.display = "none"
	eEvalDiv.style.display = "none"
	eOutputDiv.style.display = "none"

eNavBrute.addEventListener "click", ->
	return if activeDiv == eBruteDiv

	hideAllNavs()
	eNavBrute.classList.add "active"
	eBruteDiv.style.display = null
	eOutputDiv.style.display = null
	activeDiv = eBruteDiv
	generateBrutePassword()

eNavDict.addEventListener "click", ->
	return if activeDiv == eDictDiv

	hideAllNavs()
	eNavDict.classList.add "active"
	eDictDiv.style.display = null
	eOutputDiv.style.display = null
	activeDiv = eDictDiv
	generateDictPassword()

eNavEval.addEventListener "click", ->
	return if activeDiv == eEvalDiv

	hideAllNavs()
	eNavEval.classList.add "active"
	eEvalDiv.style.display = null
	activeDiv = eEvalDiv

document.getElementById( "output--refresh" ).addEventListener "click", ->
	if activeDiv == eBruteDiv
		generateBrutePassword()
	if activeDiv == eDictDiv
		generateDictPassword()

document.getElementById( "output--copy" ).addEventListener "click", ->
	eOutputText.select()
	document.execCommand "copy"
	eOutputText.focus()

randomArray = ( array ) ->
	array[ Math.floor( Math.random() * array.length ) ]

## STRENGTH ANALYSIS ###########################################################

do ->

	eError = document.getElementById "an--error"
	eOutput = document.getElementById "an--div--output"
	eGuesses = document.getElementById "an--guesses"
	eStrength= document.getElementById "an--strength"
	eWarning = document.getElementById "an--warning"
	eSuggestions = document.getElementById "an--suggestions"
	eCrack1 = document.getElementById "an--crack--1"
	eCrack2 = document.getElementById "an--crack--2"
	eCrack3 = document.getElementById "an--crack--3"
	eCrack4 = document.getElementById "an--crack--4"
	eCrack5 = document.getElementById "an--crack--5"
	eHelpToggle = document.getElementById "an--help--toggle"
	eHelpDiv = document.getElementById "an--help--div"
	eSeqList = document.getElementById "an--seq--list"
	eSeqOutput = document.getElementById "an--seq--output"

	strengthTexts = [
		"Unsuitable"
		"Poor"
		"Adequate"
		"Good"
		"Excellent"
	]
	strengthClasses = [
		"bg-danger"
		"bg-warning"
		"bg-warning"
		"bg-success"
		"bg-success"
	]

	niceTime = ( t ) ->
		p = ( n, s ) ->
			if Math.floor( n ) == 1
				return Math.floor( n ) + " " + s
			else
				return Math.floor( n ) + " " + s + "s"

		if t < 1
			return "Less than a second"
		if t < 60
			return p t, "second"
		if t < 3600
			return p t/60, "minute"
		if t < 86400
			return p t/3600, "hour"
		if t < 31536000
			return p t/86400, "day"
		if t < 3153600000
			return p t/31536000, "year"
		return "Centuries"

	energy_in_universe = 91.954242509439324874590055806510230618400257728381391
	thermoLog = ( input ) ->
		n = input - energy_in_universe

		if n > 0
			# good lord
			return "Requires more energy than available in the universe"
		else if n > -7
			return ( 10 ** n * 100 ) + "%"
		else
			return "10^" + Math.floor( n + 2 ) + " %"

	analyzeToken = ( token ) ->
		eSeqOutput.innerText = (
			k + ": " + v for k, v of token
		).join( "\n" )

	analyzeStrength = ->
		return if not zxcvbn

		pw = eOutputText.value

		if pw.length > 100 and not window.DISABLE_ZXCVBN_LIMIT
			eError.style.display = null
			eOutput.style.display = "none"
			return

		eError.style.display = "none"
		eOutput.style.display = null

		data = zxcvbn( pw )
		window.zxcvbnOutput = data

		eGuesses.value = Math.floor( data.guesses )
		eStrength.style.width =
			Math.min( data.guesses_log10 * 10, 100 ) + "%"
		eStrength.innerText = strengthTexts[ data.score ]
		eStrength.classList = "progress-bar " + strengthClasses[ data.score ]

		if data.feedback.warning
			eWarning.style.display = null
			eWarning.innerHTML = "<strong>Warning</strong><br />" +
				data.feedback.warning
		else
			eWarning.style.display = "none"

		eSuggestions.innerHTML = ""
		if data.feedback.suggestions.length > 0
			for str in data.feedback.suggestions
				e = document.createElement "div"
				e.classList = "alert alert-info"
				e.innerHTML = "<strong>Suggestion</strong><br />" + str
				eSuggestions.appendChild( e )

		eCrack1.value =
			data.crack_times_display.online_throttling_100_per_hour
		eCrack2.value =
			data.crack_times_display.online_no_throttling_10_per_second
		eCrack3.value =
			data.crack_times_display.offline_slow_hashing_1e4_per_second
		eCrack4.value =
			data.crack_times_display.offline_fast_hashing_1e10_per_second
		eCrack5.value = thermoLog( data.guesses_log10 )

		eSeqList.innerHTML = ""
		eSeqOutput.innerHTML = ""
		for seg in data.sequence
			e = document.createElement "a"
			e.href = "#"
			e.innerText = seg.token
			e.addEventListener "click", ( e ) ->
				analyzeToken( seg )
				e.preventDefault()

			eSeqList.appendChild( e )

	eHelpToggle.addEventListener "click", ->
		if eHelpDiv.style.display
			eHelpDiv.style.display = null
			eHelpToggle.classList.add "_toggled"
		else
			eHelpDiv.style.display = "none"
			eHelpToggle.classList.remove "_toggled"

## BRUTE #######################################################################

do ->

	## Advanced Options Display ##

	eAdvToggle = document.getElementById "brute--adv--toggle"
	eAdvDiv = document.getElementById "brute--adv--div"

	eAdvToggle.addEventListener "click", ->
		if eAdvDiv.style.display
			eAdvDiv.style.display = null
			eAdvToggle.classList.add "_toggled"
		else
			eAdvDiv.style.display = "none"
			eAdvToggle.classList.remove "_toggled"

	## Elements ##

	eLength = document.getElementById "brute--length"
	eUpper = document.getElementById "brute--upper"
	eLower = document.getElementById "brute--lower"
	eDigits = document.getElementById "brute--digits"
	eSymbols = document.getElementById "brute--symbols"
	eAmbiguous = document.getElementById "brute--ambiguous"
	eMinDigits = document.getElementById "brute--mindigits"

	validCharacters = []
	validDigits = []

	## Functions ##

	ambiguousCharacters = [
		'B', 'G', 'I', 'O', 'Q', 'D', 'S', 'Z'
		'l'
		'8', '6', '1', '0', '5', '2'
	]

	generateValidCharacters = ->
		validCharacters = []
		validDigits = []

		for i in [33..126]
			c = String.fromCharCode( i )

			continue if c in ambiguousCharacters and eAmbiguous.checked

			if 48 <= i <= 57
				continue if not eDigits.checked
				validCharacters.push c
				validDigits.push c
			else if 65 <= i <= 90
				continue if not eUpper.checked
				validCharacters.push c
			else if 97 <= i <= 122
				continue if not eLower.checked
				validCharacters.push c
			else if eSymbols.checked
				validCharacters.push c

	generateValidCharacters()

	## Generation Algorithm ##

	shuffleArray = ( array ) ->
		c = array.length
		while c > 0
			i = Math.floor( Math.random() * c )

			c--

			[ array[c], array[i] ] = [ array[i], array[c] ]

		return array

	showError = ( str ) ->
		eOutputError.style.display = null
		eOutputError.innerHTML = str
		throw eOutputError

	generateBrutePassword = ->
		try
			## Validation
			length = parseInt( eLength.value )
			minDigits = parseInt( eMinDigits.value )

			if isNaN( length )
				throw "Password length must be an integer"
			if length <= 0
				throw "Password length must be greater than zero"
			if isNaN( minDigits )
				minDigits = 0
			if minDigits < 0
				throw "Minimum Digits must be zero or greater"
			if minDigits > length
				minDigits = length
			if minDigits > 0
				eDigits.checked = true
				generateValidCharacters()

			if not eUpper.checked and
				not eLower.checked and
				not eDigits.checked and
				not eSymbols.checked

					eLower.checked = true
					generateValidCharacters()

			## Execution
			out = []

			if minDigits > 0
				for [1..minDigits]
					out.push randomArray( validDigits )
			if length > minDigits
				for [1..( length - minDigits )]
					out.push randomArray( validCharacters )

			shuffleArray( out )

			eOutputText.value = out.join ""
			analyzeStrength()
		catch ex
			if typeof( ex ) == "string"
				eOutputError.style.display = null
				eOutputError.innerHTML = ex
			throw ex

	## Events ##

	buildAndGenerate = ->
		generateValidCharacters()
		generateBrutePassword()
	eUpper.addEventListener "change", buildAndGenerate
	eLower.addEventListener "change", buildAndGenerate
	eSymbols.addEventListener "change", buildAndGenerate
	eAmbiguous.addEventListener "change", buildAndGenerate

	eLength.addEventListener "change", generateBrutePassword
	eMinDigits.addEventListener "change", generateBrutePassword

	eDigits.addEventListener "change", ->
		if not @checked
			eMinDigits.value = 0
		buildAndGenerate()

generateBrutePassword()

## DICTIONARY ##################################################################

do ->

	## Elements ##

	eWords = document.getElementById "dict--words"
	eDownloading = document.getElementById "dict--downloading"

	wordList = null

	## Generation Algorithm ##

	loadWordList = ->
		if wordList == 0
			return
		wordList = 0

		req = new XMLHttpRequest
		req.overrideMimeType "application/json"
		req.open "GET", "wordlist.json"
		req.onload = ->
			return if req.readyState != 4
			if req.status == 200
				wordList = JSON.parse( req.responseText )
				eDownloading.style.display = "none"
				generateDictPassword()
			else
				eOutputError.style.display = null
				eOutputError.innerHTML = "Error when downloading word list"
				wordList = null
		req.send null

	generateDictPassword = ->
		try
			## Validation
			words = parseInt( eWords.value )

			if isNaN( words )
				throw "Word count must be an integer"
			if words <= 0
				throw "Word count must be greater than zero"
			if not wordList
				loadWordList()
				return

			## Execution
			out = []

			for [1..words]
				out.push randomArray( wordList ).toLowerCase()

			eOutputText.value = out.join " "
			analyzeStrength()
		catch ex
			if typeof( ex ) == "string"
				eOutputError.style.display = null
				eOutputError.innerHTML = ex
			console.error ex

	## Events ##

	eWords.addEventListener "change", generateDictPassword

eEvalInput.addEventListener "change", ->
	eOutputText.value = eEvalInput.value
	analyzeStrength()
