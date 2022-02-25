function _linekind(line) {
	var kind = "paragraph";

	// code delimiter
	if (line === "```") {
		kind = "code";
	}
	// link
	else if (line.substring(0, 2) === "=>") {
		kind = "link";
	}
	// blockquote
	else if (line[0] === ">") {
		kind = "quote";
	}
	// list
	else if (line[0] === "*") {
		kind = "list";
	}
	// header
	else if (line[0] === "#") {
		kind = "header";
	}
	
	return kind;
}

function _line2link(line) {
	const re = /^=>\s?(.*?)\s+(.*)\s*?$/;
	const matches = line.match(re);
	const text = matches[2];
	const href = matches[1];
	return `[${text}](${href})`;
}

function _addline(outlet, line, lineKind) {
	switch (lineKind) {
		case "link":
			outlet += _line2link(line) + "\n\n";
			break;
		case "quote":
		case "list":
		case "code":
			outlet += line + "\n";
			break;
		default:
			outlet += line + "\n\n";
	}

	return outlet;
}

function gmi2md(inlet) {
	var outlet = "";
	const lines = inlet.split("\n");
	const limit = lines.length;
	var insideBlock = false;
	var insideCodeBlock = false;

	for (var i = 0; i < limit; i++) {
		var line = lines[i];
		var lineKind = _linekind(line);
		
		if (insideCodeBlock) {
			outlet += line + "\n";
			if (lineKind === "code") {
				insideCodeBlock = false;
				outlet += "\n";
			}
		}
		else if (insideBlock && (lineKind === "quote" || lineKind === "list")) {
			outlet += line + "\n";
		}
		else {
			if (lineKind === "quote" || lineKind === "list") {
				insideBlock = true;
			}
			else if (lineKind === "code") {
				insideCodeBlock = true;
			}
			else if (insideBlock) {
				insideBlock = false;
				outlet += "\n";
			}

			outlet = _addline(outlet, line, lineKind);
		}
	}

	return outlet;
}
