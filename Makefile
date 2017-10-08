# Trick from https://stackoverflow.com/a/12110773

.PHONY: all index projects 404
all: index projects 404

index projects 404: %:
	pandoc templates/$*.md -o $*.html \
		--include-before-body=partials/header.html \
		--include-after-body=partials/footer.html
