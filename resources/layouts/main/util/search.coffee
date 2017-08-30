## Elements ##

ePagination = document.getElementById "search--pagination"
eInput = document.getElementById "search--input"
eCancelContainer = document.getElementById "search--cancel--container"
eCancel = document.getElementById "search--cancel"

## Variables ##

currentPage = 1
maximumPage = 1

## Search ##

matchesSearch = ( e ) ->
	return true if eInput.value == ""
	return false if not e.dataset.title
	return e.dataset.title.includes( eInput.value )

getItemList = ->
	list = []

	for e in document.getElementsByClassName "search--item"
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
		console.log maximumPage

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
	ea.href = "#"
	ea.classList = [ "page-link" ]
	ea.textContent = "Previous"
	en.appendChild( ea )

	if page == 1
		ea.tabIndex = -1
		en.classList.add( "disabled" )
	else
		ea.addEventListener "click", clickEv( page - 1 )

	for i in [ 1 .. maximumPage ]
		en = document.createElement "li"
		en.classList = [ "page-item" ]
		ePagination.appendChild( en )

		ea = document.createElement "a"
		ea.href = "#"
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
	ea.href = "#"
	ea.classList = [ "page-link" ]
	ea.textContent = "Next"
	en.appendChild( ea )

	if page == maximumPage
		ea.tabIndex = -1
		en.classList.add( "disabled" )
	else
		ea.addEventListener "click", clickEv( page + 1 )

buildList( 1 )
buildPagination( 1 )

sortList = ->
	if eInput.value != ""
		eCancelContainer.style.display = null
	else
		eCancelContainer.style.display = "none"

	buildList( currentPage )
	buildPagination( currentPage )

eInput.addEventListener "input", sortList

eCancel.addEventListener "click", ->
	eInput.value = ""
	sortList()
