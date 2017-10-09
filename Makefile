# Trick from https://stackoverflow.com/a/12110773
.PHONY: all index projects 404 clean
all: index projects 404

define generate
	pandoc pages/$(1).md -o $(1).html \
		--template templates/main \
		--variable title:"$(2)" \
		--variable heading:"$(3)" \
		--variable showFace:$(4)
endef

# For all pages with the main header/footer
index projects: %:
	$(call generate,$*,Adam Carruthers,Hey there!,true)

# For error pages
404: %:
	$(call generate,$*,Error,Whoops!)

clean:
	rm *.html
