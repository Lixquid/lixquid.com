## Elements ##

ePagination = document.getElementById "search--pagination"
eList = document.getElementById "search--list"
eInput = document.getElementById "search--input"
eCancelContainer = document.getElementById "search--cancel--container"
eCancel = document.getElementById "search--cancel"

## Variables ##

currentPage = 1
maximumPage = 1

## Anchor Multiplexing ##

getPageNum = ->
	return 1 if not window.location.hash
	match = window.location.hash.match /page=(\d+)/
	return 1 if not match
	num = parseInt( match[1] )
	return 1 if not num
	return num

getSearch = ->
	return null if not window.location.hash
	match = window.location.hash.match /search=([^&]+)/
	return null if not match
	return match[1]

replacePageNum = ( n ) ->
	return "#page=#{n}" if not window.location.hash
	match = window.location.hash.match /page=\d+/
	if not match
		return window.location.hash + "&page=#{n}"
	return window.location.hash.replace( /page=\d+/, "page=#{n}" )

replaceSearch = ( str ) ->
	return "#search=" + str if not window.location.hash
	match = window.location.hash.match /search=[^&]+/
	if not match
		return window.location.hash + "&search=" + str
	return window.location.hash.replace( /search=[^&]+/, "search=" + str )

## Search ##

matchesSearch = ( e ) ->
	input = eInput.value
	return true if input == ""
	return false if not e.dataset.title
	if input.startsWith( "tag:" )
		return e.dataset.tags.toLowerCase()
			.split( "|" ).indexOf( input.substr( 4 ).toLowerCase() ) > -1
	return e.textContent.toLowerCase().includes( input.toLowerCase() )

getItemList = ->
	list = []

	for e in eList.children
		if not matchesSearch( e )
			e.style.display = "none"
			continue
		e.style.display = null
		list.push e

	return list

## Pagination ##

buildList = ( page ) ->
	for e, i in getItemList()
		e.listIndex = i
		maximumPage = Math.ceil( ( i + 1 ) / 10 )

		if page * 10 - 11 < e.listIndex < page * 10
			# e.style.display = null
		else
			e.style.display = "none"

buildPagination = ( page ) ->
	page = maximumPage if page > maximumPage

	currentPage = page
	if maximumPage == 1
		ePagination.style.display = "none"
		return
	else
		ePagination.style.display = null

	ePagination.innerHTML = ""

	clickEv = ( page ) ->
		return ->
			buildList( page )
			buildPagination( page )

	en = document.createElement "li"
	en.classList = [ "page-item" ]
	ePagination.appendChild( en )

	ea = document.createElement "a"
	ea.classList = [ "page-link" ]
	ea.textContent = "Previous"
	en.appendChild( ea )

	if page == 1
		ea.tabIndex = -1
		en.classList.add( "disabled" )
		ea.href = replacePageNum( page )
	else
		ea.addEventListener "click", clickEv( page - 1 )
		ea.href = replacePageNum( page - 1 )

	for i in [ 1 .. maximumPage ]
		en = document.createElement "li"
		en.classList = [ "page-item" ]
		ePagination.appendChild( en )

		ea = document.createElement "a"
		ea.href = replacePageNum( i )
		ea.classList = [ "page-link" ]
		ea.textContent = i
		en.appendChild( ea )

		if page == i
			en.classList.add( "active" )
		else
			ea.addEventListener "click", clickEv( i )

	en = document.createElement "li"
	en.classList = [ "page-item" ]
	ePagination.appendChild( en )

	ea = document.createElement "a"
	ea.classList = [ "page-link" ]
	ea.textContent = "Next"
	en.appendChild( ea )

	if page == maximumPage
		ea.tabIndex = -1
		en.classList.add( "disabled" )
		ea.href = replacePageNum( page )
	else
		ea.addEventListener "click", clickEv( page + 1 )
		ea.href = replacePageNum( page + 1 )

sortList = ->
	if eInput.value != ""
		eCancelContainer.style.display = null
	else
		eCancelContainer.style.display = "none"

	window.location.hash = replaceSearch( eInput.value )
	buildList( currentPage )
	buildPagination( currentPage )

eInput.addEventListener "input", sortList

eCancel.addEventListener "click", ->
	eInput.value = ""
	sortList()

eInput.value = getSearch()
buildList( getPageNum() )
buildPagination( getPageNum() )
