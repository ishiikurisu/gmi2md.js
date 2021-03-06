const gemini_text_1 = `# First header
This is an example of gemini text.
In gemini, every line is a different paragraph.
* This is a list in Gemini
* Lists are also separated from the rest of the text
Which means this paragraph is separated from the list
> This is a blockquote
Yet another paragraph.
## Differences to HTTP
### Links
In Gemini, just like Gopher, links are in separated lines
=> gemini://geminispace.info/ Gemini Space Info Search Engine
Some links in some browsers may display images, but not this one.
### Code blocks
Not really a difference, but they also appear in Gemini:
\`\`\`
#include <stdio.h>

int main() {
	printf("Hello world!\\n");
	return 0;
}
\`\`\`
And I think that's all!`;

const markdown_text_1 = `# First header

This is an example of gemini text.

In gemini, every line is a different paragraph.

* This is a list in Gemini
* Lists are also separated from the rest of the text

Which means this paragraph is separated from the list

> This is a blockquote

Yet another paragraph.

## Differences to HTTP

### Links

In Gemini, just like Gopher, links are in separated lines

[Gemini Space Info Search Engine](gemini://geminispace.info/)

Some links in some browsers may display images, but not this one.

### Code blocks

Not really a difference, but they also appear in Gemini:

\`\`\`
#include <stdio.h>

int main() {
	printf("Hello world!\\n");
	return 0;
}
\`\`\`

And I think that's all!

`;

describe("Convert from Gemtext to Markdown", function() {
	it("can convert from gemini links to markdown links", function() {
		var links = [
			"=> gemini://rawtext.club/~sloum/spacewalk.gmi Link to Space Walk",
			"=> ./gemlog/index.gemini Index Page",
			"=> gemini://gemini.circumlunar.space      Circumlunar Space",
			"=> https://www.crisjr.eng.br Respect    my     space"
		];
		var expected_results = [
			"[Link to Space Walk](gemini://rawtext.club/~sloum/spacewalk.gmi)",
			"[Index Page](./gemlog/index.gemini)",
			"[Circumlunar Space](gemini://gemini.circumlunar.space)",
			"[Respect    my     space](https://www.crisjr.eng.br)"
		];
		for (var i = 0; i < links.length; i++) {
			var link = links[i];
			var expected = expected_results[i];
			var result = _line2link(link);
			chai.assert.ok(result === expected);
		}
	});

	it("can convert from gemtext to markdown", function() {
		var result = gmi2md(gemini_text_1);

		chai.assert.ok(result === markdown_text_1);
	});
});
