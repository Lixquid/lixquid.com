transforms = {}

sInline = document.getElementById "texttransform--inline"
sInstant = document.getElementById "texttransform--instant"
eInput = document.getElementById "input--input"
eFilter = document.getElementById "input--filter"
eGo = document.getElementById "input--go"
eOutput = document.getElementById "input--output"
eOutputDiv = document.getElementById "input--output--div"

if sInline.checked
    eOutputDiv.style.display = "none"
else
    eOutputDiv.style.display = ""
sInstant.disabled = sInline.checked
sInline.addEventListener "change", ->
    if @checked
        eOutputDiv.style.display = "none"
    else
        eOutputDiv.style.display = ""
    sInstant.disabled = @checked

if sInstant.checked
    eGo.style.display = "none"
else
    eGo.style.display = ""
sInline.disabled = sInstant.checked
sInstant.addEventListener "change", ->
    if @checked
        eGo.style.display = "none"
    else
        eGo.style.display = ""
    sInline.disabled = @checked

performTransform = ->
    filter = eFilter.value
    return if not transforms[ filter ]

    if sInline.checked
        eInput.value = transforms[ filter ]( eInput.value )
    else
        eOutput.value = transforms[ filter ]( eInput.value )

eGo.addEventListener "click", performTransform
eFilter.addEventListener "change", performTransform

eInput.addEventListener "input", ->
    if sInstant.checked and not sInline.checked
        performTransform()

############################## TRANSFORM HELPERS ###############################

genMapTransform = ( charmap ) ->
    return ( s ) ->
        ( for i in [0..s.length]
            charmap[ s.charAt( i ) ] ? s.charAt( i ) ).join( "" )

# Lowercase a-z, Uppercase a-z, numbers 0-9
genStringTransform = ( input ) ->
    out = {}
    for x in [0...94]
        if not input[x]?
            return genMapTransform( out )
        out[ String.fromCharCode( 32 + x ) ] = input.charAt( x )
    return genMapTransform( out )

############################## SIMPLE TRANSFORMS ###############################

transforms.uppercase = ( s ) -> s.toUpperCase()
transforms.lowercase = ( s ) -> s.toLowerCase()
transforms.uriencode = ( s ) -> encodeURIComponent( s )
transforms.uridecode = ( s ) -> decodeURIComponent( s.replace( "+", " " ) )
transforms.base64encode = ( s ) -> window.btoa( s )
transforms.base64decode = ( s ) ->
    try
        return window.atob( s )
    catch ex
        throw ex if ex.code != ex.INVALID_CHARACTER_ERR
        return "The given string is not a valid base 64 encoded string!"

################################# HTML ESCAPE ##################################

htmlEscapeReplaces =
    '\'': '&#39;'
    '&': '&amp;'
    '>': '&gt;'
    '<': '&lt;'
    '"': '&quot;'
    '/': '&#x2F;'
    '=': '&#x3D;'
    '`': '&#x60;'
transforms.htmlescape = ( s ) ->
    s.replace /['&><"\/=`]/g, ( c ) ->
        htmlEscapeReplaces[c]

################################### REVERSE ####################################

reverseTransformCombining = ///
    # Non-Combining
    (
        [
            \0 - \u02FF
            \u0370 - \u1AAF
            \u1B00 - \u1DBF
            \u1E00 - \u20CF
            \u2100 - \uD7FF
            \uE000 - \uFE1F
            \uFE30 - \uFFFF
        ]
    |
        [ \uD800 - \uDBFF ][ \uDC00 - \uDFFF]
    |
        [ \uD800 - \uDBFF ](?! [ \uDC00 - \uDFFF ] )
    |
        (?: [^ \uD800 - \uDBFF ] | ^ )
        [ \uDC00 - \uDFFF ]
    )

    # Combining
    (
        [
            \u0300 - \u036F
            \u1AB0 - \u1AFF
            \u1DC0 - \u1DFF
            \u20D0 - \u20FF
            \uFE20 - \uFE2F
        ]+
    )
///g

transforms.reverse = ( s ) ->
    s = s.replace(
        reverseTransformCombining,
        ( _, original, marks ) ->
            transforms.reverse( marks ) + original
    ).replace(
        /([\uD800-\uDBFF])([\uDC00-\uDFFF])/g,
        '$2$1'
    )

    return ( s.charAt( i ) for i in [s.length..0] ).join("")

########################### CHARACTER MAP TRANSFORMS ###########################

###
_id = "
\ !\"#$%&'()*+,-./\
0123456789\
:;<=>?@\
ABCDEFGHIJKLMNOPQRSTUVWXYZ\
[\\]^_`\
abcdefghijklmnopqrstuvwxyz\
{|}~
"
###

transforms.rot5 = genStringTransform "
\ !\"#$%&'()*+,-./\
5678901234\
:;<=>?@\
ABCDEFGHIJKLMNOPQRSTUVWXYZ\
[\\]^_`\
abcdefghijklmnopqrstuvwxyz\
{|}~
"
transforms.rot13 = genStringTransform "
\ !\"#$%&'()*+,-./\
0123456789\
:;<=>?@\
NOPQRSTUVWXYZABCDEFGHIJKLM\
[\\]^_`\
nopqrstuvwxyzabcdefghijklm\
{|}~
"

transforms.rot135 = genStringTransform "
\ !\"#$%&'()*+,-./\
5678901234\
:;<=>?@\
NOPQRSTUVWXYZABCDEFGHIJKLM\
[\\]^_`\
nopqrstuvwxyzabcdefghijklm\
{|}~
"

transforms.rot47 = genStringTransform "
\ PQRSTUVWXYZ\
[\\]^_`\
abcdefghijklmnopqrstuvwxyz\
{|}~!\"#$%&'()*+,-./\
0123456789\
:;<=>?@\
ABCDEFGHIJKLMNO
"

transforms.circled = genStringTransform "
\ !\"#$%&'()*+,-./\
\u24ea\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\
:;<=>?@\
\u24b6\u24b7\u24b8\u24b9\u24ba\u24bb\u24bc\u24bd\u24be\u24bf\u24c0\u24c1\
\u24c2\u24c3\u24c4\u24c5\u24c6\u24c7\u24c8\u24c9\u24ca\u24cb\u24cc\u24cd\
\u24ce\u24cf\
[\\]^_`\
\u24d0\u24d1\u24d2\u24d3\u24d4\u24d5\u24d6\u24d7\u24d8\u24d9\u24da\u24db\
\u24dc\u24dd\u24de\u24df\u24e0\u24e1\u24e2\u24e3\u24e4\u24e5\u24e6\u24e7\
\u24e8\u24e9\
{|}~
"

transforms.superscript = genMapTransform
    "0": "\u2070"
    "1": "\u00b9"
    "2": "\u00b2"
    "3": "\u00b3"
    "4": "\u2074"
    "5": "\u2075"
    "6": "\u2076"
    "7": "\u2077"
    "8": "\u2078"
    "9": "\u2079"

    "a": "\u1d43"
    "b": "\u1d47"
    "c": ""
    "d": "\u1d48"
    "e": "\u1d49"
    "f": ""
    "g": "\u1d4d"
    "h": "\u02b0"
    "i": ""
    "j": "\u02b2"
    "k": "\u1d4f"
    "l": ""
    "m": "\u1d50"
    "n": ""
    "o": "\u1d52"
    "p": "\u1d56"
    "q": ""
    "r": "\u02b3"
    "s": ""
    "t": "\u1d57"
    "u": "\u1d58"
    "v": "\u1d5b"
    "w": "\u02b7"
    "x": "\u02b8"
    "y": "\u02b8"
    "z": ""

    "A": "\u1d2c"
    "B": "\u1d2e"
    "C": ""
    "D": "\u1d30"
    "E": "\u1d31"
    "F": ""
    "G": "\u1d33"
    "H": "\u1d34"
    "I": "\u1d35"
    "J": "\u1d36"
    "K": "\u1d37"
    "L": "\u1d38"
    "M": "\u1d39"
    "N": "\u1d3a"
    "O": "\u1d3c"
    "P": "\u1d3e"
    "Q": ""
    "R": "\u1d3f"
    "S": ""
    "T": "\u1d40"
    "U": "\u1d41"
    "V": ""
    "W": "\u1d42"
    "X": ""
    "Y": ""
    "Z": ""
