import components from "prismjs/components.json";
import fs from "fs";
import path from "path";

const { meta, ...languages } = components.languages;

fs.mkdirSync(path.resolve(__dirname, "src"));

const forIndexFile = [];

for (const languageId in languages) {
  if (Object.prototype.hasOwnProperty.call(languages, languageId)) {
    const sourceCodeBase = ['import "prismjs"'];
    const element = languages[languageId];

    if (Array.isArray(element.require)) {
      sourceCodeBase.push(...element.require.map((lang) => `import "./prism-${lang}"`));
    } else if (typeof element.require === "string") {
      sourceCodeBase.push(`import "./prism-${element.require}"`);
    }

    sourceCodeBase.push(`import "prismjs/components/prism-${languageId}"`);

    const fileName = `prism-${languageId}`;
    forIndexFile.push(fileName);

    fs.writeFileSync(path.resolve(`src/${fileName}.ts`), sourceCodeBase.join("\n"));
  }
}

fs.writeFileSync(
  path.resolve("src/index.ts"),
  forIndexFile.map((filename) => `import "./${filename}"`).join("\n")
);
