## Requires ####################################################################

fs = require "fs"
path = require "path"
util = require "util"
yaml = require "js-yaml"

coffeescript = require "coffeescript"
pug = require "pug"
stylus = require "stylus"

## Util ########################################################################

fs.statAsync = util.promisify( fs.stat )
fs.readFileAsync = util.promisify( fs.readFile )
stylus.renderAsync = util.promisify( stylus.render )

renameExtension = ( sourcePath, targetExtension ) ->
    p = path.parse sourcePath
    return path.join( p.dir, "#{p.name}.#{targetExtension}" )

shouldUpdateFile = ( sourcePath, targetExtension ) ->
    stat = await fs.statAsync( sourcePath )
    try
        statTarget = await fs.statAsync( renameExtension(
            sourcePath, targetExtension
        ) )
    catch ex
        if ex.code == "ENOENT"
            # File doesn't exist, should compile
            return true
        else
            throw ex
    return stat.mtime > statTarget.mtime

# Attempts to smart-match a target against a string input
simpleMatch = ( target, input ) ->
    if not target?
        return false
    if target instanceof Array
        return target.reduce( ( f, target2 ) ->
            f or simpleMatch( target2, input )
        , false )
    if target instanceof RegExp
        return input.match( target )
    if typeof target == "string"
        return target == input
    return false # shrug

STAT =
    IGNORE: 0
    OK: 1

forAllFilesAsync = ( options, fn, dir = __dirname ) ->
    # extension: If set, only processes files with the specified extension
    # ignored: An array of filenames to ignore
    # soft: An array of filenames to downgrade warnings when processing
    { extension, ignored, soft } = options

    fs.readdir dir, ( err, files ) ->
        return console.error( err ) if err

        files.forEach ( file ) ->
            filePath = path.join( dir, file )

            if simpleMatch( ignored, "/" + path.relative( __dirname, filePath ) )
                return

            fs.stat filePath, ( err, stat ) ->
                return console.error( err ) if err

                if stat.isDirectory()
                    forAllFilesAsync( options, fn, filePath )
                else
                    if extension? and not file.endsWith( "." + extension )
                        return

                    handleErr = ( err ) ->
                        if simpleMatch( soft, "/" + path.relative( __dirname, filePath ) )
                            console.log "ERRO: #{filePath}"
                        else
                            throw ex

                    try
                        out = fn( filePath )

                        if out instanceof Promise
                            out.then ( r ) ->
                                return if r == STAT.IGNORE
                                console.log "OK  : #{filePath}"
                            .catch handleErr
                        else if not out? or out == STAT.OK
                            console.log "OK: #{filePath}"
                    catch ex
                        handleErr ex

## Tasks #######################################################################

option "-f", "--force", "If specified, ignore file age checking and force a
    recompile."

task "html", "Compile HTML files", ( opt ) ->
    forAllFilesAsync {
        extension: "pug"
        ignored: [
            "/node_modules"
            "/.git"
            "/resources"
            "/blog/posts"
        ]
    }, ( filename ) ->
        if not opt.force and not await shouldUpdateFile( filename, "html" )
            return STAT.IGNORE
        if filename.endsWith( ".t.pug" )
            return STAT.IGNORE

        fs.writeFile(
            renameExtension( filename, "html" ),
            pug.renderFile( filename,
                basedir: __dirname
                doctype: "html"
                ROOT: ""
            ),
            "utf8",
            ( err ) -> console.error err if err
        )

task "blog", "Compile blog posts", ( opt ) ->
    forAllFilesAsync {
        extension: "pug"
    }, ( filename ) ->
        if not opt.force and not await shouldUpdateFile( filename, "html" )
            return STAT.IGNORE

        contents = await fs.readFileAsync( filename, "utf8" )

        match = contents.match ///
            //-             # Comment start
            ( [\s\S]*? )    # Front Matter contents
            (?:             # Until..
                \n \S           # A non-comment line
                | \s* $         # Or the end of the file (empty post??)
            )
        ///
        if not match
            throw "Post #{filename} does not contain a front matter!"

        frontMatter = yaml.safeLoad( match[1] )

        if not frontMatter.title
            throw "Post #{filename} does not have a title!"
        if not frontMatter.date
            throw "Post #{filename} does not have a date!"

    , path.join __dirname, "blog", "posts"

task "html_templates", "Compile HTML Template files", ( opt ) ->
    forAllFilesAsync {
        extension: "t.pug"
        ignored: [
            "/node_modules"
            "/.git"
        ]
    }, ( filename ) ->
        if not opt.force and not await shouldUpdateFile( filename, "js" )
            return STAT.IGNORE

        fs.writeFile(
            renameExtension( filename, "js" ),
            pug.compileFileClient( filename,
                basedir: __dirname
                name: "template_" + path.basename( filename, ".t.pug" )
                ROOT: ""
            ),
            "utf8",
            ( err ) -> console.error err if err
        )

task "css", "Compile CSS files", ( opt ) ->
    forAllFilesAsync {
        extension: "styl"
        ignored: [
            "/node_modules"
            "/.git"
        ]
    }, ( filename ) ->
        if not opt.force and not await shouldUpdateFile( filename, "css" )
            return STAT.IGNORE

        fs.writeFile(
            renameExtension( filename, "css" ),
            await stylus.renderAsync(
                await fs.readFileAsync( filename, "utf8" ),
                globals: ROOT: ""
            ),
            "utf8",
            ( err ) -> console.error err if err
        )

task "js", "Compile JS files", ( opt ) ->
    forAllFilesAsync {
        extension: "coffee"
        ignored: [
            "/node_modules"
            ".git"
        ]
    }, ( filename ) ->
        if not opt.force and not await shouldUpdateFile( filename, "js" )
            return STAT.IGNORE

        fs.writeFile(
            renameExtension( filename, "js" ),
            coffeescript.compile(
                await fs.readFileAsync( filename, "utf8" ),
                filename: filename
                transpile:
                    presets: [ "env" ]
                    plugins: [ "transform-es2015-modules-strip" ]
            ),
            "utf8",
            ( err ) -> console.error err if err
        )

task "all", "Runs all compilation tasks", ( opt ) ->
    invoke "html"
    invoke "html_templates"
    invoke "css"
    invoke "js"