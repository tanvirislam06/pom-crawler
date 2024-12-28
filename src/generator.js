const fs = require("fs-extra");
const prettier = require("prettier");
const { pascalCase, getDescriptiveName } = require("./utils/stringUtils");

async function generatePOM(elements, pageTitle, outputDir = "./generatedPOM") {
  // Convert the page title to PascalCase for the class name
  const className = pascalCase(pageTitle);

  // Generate the POM content
  const pomContent = `
    class ${className} {
        constructor() {
            ${elements
              .map((el, idx) => {
                const variableName = getDescriptiveName(el, idx);
                return `this.${variableName} = "${el.selector}";`;
              })
              .join("\n            ")}
        }
    }

    module.exports = new ${className}();
  `;

  // Format the generated POM content
  const formattedContent = await prettier.format(pomContent, {
    parser: "babel",
  });

  // Ensure the output directory exists and save the POM file
  await fs.ensureDir(outputDir);
  const filePath = `${outputDir}/${className}Page.js`;
  await fs.writeFile(filePath, formattedContent, "utf-8");

  console.log(`POM generated at ${filePath}`);
}

module.exports = { generatePOM };
