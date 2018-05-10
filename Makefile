HTMLCOMPILE=pug --obj "{ROOT: ''}" --basedir "."
CSSCOMPILE=stylus
JSCOMPILE=tsc

HTMLFILES=\
	index.pug
CSSFILES=\
	resources/layouts/main/main.styl
JSFILES=\
	resources/lib/TextTransforms.ts

all: html css js

html: $(HTMLFILES)
	$(HTMLCOMPILE) $^

css: $(CSSFILES)
	$(CSSCOMPILE) $^

js: $(JSFILES)
	$(JSCOMPILE) $^

.PHONY: all html css js
