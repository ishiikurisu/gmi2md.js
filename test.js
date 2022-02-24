const example1 = `# 
`;

const expected1 = `
`;

describe("Convert from Gemtext to Markdown", function() {
    it("can convert from gemtext to markdown", function(done) {
        var result = gmi2md(example1);
        chai.assert.ok(result === expected1);
        done();
    });
});
