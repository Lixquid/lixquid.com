## COMMON ######################################################################

eNavBrute = document.getElementById "nav--brute"
eNavDict = document.getElementById "nav--dict"
eNavEval = document.getElementById "nav--eval"
eBruteDiv = document.getElementById "brute--div"
eDictDiv = document.getElementById "dict--div"
eEvalDiv = document.getElementById "eval--div"
eOutputDiv = document.getElementById "output--div"
eOutputError = document.getElementById "output--error"
eOutputText = document.getElementById "output--text"

activeDiv = eBruteDiv

generateBrutePassword = ->
generateDictPassword = ->

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


## BRUTE #######################################################################

do ->

	## Advanced Options Display ##

	eAdvDiv = document.getElementById "brute--adv--div"

	document.getElementById( "brute--adv--toggle" ).addEventListener "click", ->
		if eAdvDiv.style.display
			eAdvDiv.style.display = null
		else
			eAdvDiv.style.display = "none"

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
		catch ex
			if typeof( ex ) == "string"
				eOutputError.style.display = null
				eOutputError.innerHTML = ex
			console.error ex

	## Events ##

	eWords.addEventListener "change", generateDictPassword

return
