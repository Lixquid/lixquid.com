## Elements ##

ePagination = document.getElementById "search--pagination"

## Functions ##

maximumPage = 1

buildList = ( page ) ->
	for e, i in document.getElementsByClassName "search--item"
		if not e.listIndex?
			e.listIndex = i
			maximumPage = Math.ceil( ( i + 1 ) / 10 )

		if page * 10 - 11 < e.listIndex < page * 10
			e.style.display = null
		else
			e.style.display = "none"

buildPagination = ( page ) ->
	if maximumPage == 1
		ePagination.style.display = "none"
		return

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

## Build ##

buildList( 1 )
buildPagination( 1 )
