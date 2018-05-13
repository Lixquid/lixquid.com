## Configuration ###############################################################

HTMLCOMPILE=pug --obj "{ROOT: ''}" --basedir "."
CSSCOMPILE=stylus
JSCOMPILE=tsc --noImplicitThis

HTMLFILES=\
	index.pug \
	gadgets/lennygenerator/index.pug
CSSFILES=\
	resources/layouts/main/main.styl
JSFILES=\
	resources/layouts/main/main.ts \
	resources/lib/TextTransforms.ts \
	gadgets/lennygenerator/index.ts

## Tasks #######################################################################

all: html css js

html: $(HTMLFILES)
	$(HTMLCOMPILE) $^

css: $(CSSFILES)
	$(CSSCOMPILE) $^

js: $(JSFILES)
	$(JSCOMPILE) $^

watch:
	which inotifywait
	while true; do \
		make -j all; \
		inotifywait -qre close_write .; \
	done

.PHONY: all html css js watch
