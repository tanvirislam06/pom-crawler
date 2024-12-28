#!/usr/bin/env node

const { Command } = require("commander");
const { crawlPage } = require("./crawler");
const { generatePOM } = require("./generator");

// Initialize the CLI program
const program = new Command();

program
  .version("1.0.0") // Set the CLI version
  .description(
    "A CLI tool to crawl web pages and generate Page Object Models (POMs)."
  );

// Command: Crawl a webpage and generate POM
program
  .command("generate")
  .description("Crawl a webpage and generate a POM file.")
  .requiredOption("-u, --url <url>", "URL of the webpage to crawl")
  .requiredOption(
    "-o, --output <directory>",
    "Directory to save the generated POM file"
  )
  .action(async (options) => {
    const { url, output } = options;

    try {
      console.log(`Crawling URL: ${url}...`);

      // Crawl the webpage
      const elements = await crawlPage(url);

      // Extract the page title (replace with actual Puppeteer title extraction if needed)
      const pageTitle = url.replace(/https?:\/\//, "").split("/")[0];

      // Generate the POM file
      await generatePOM(elements, pageTitle, output);

      console.log(`POM file successfully generated in: ${output}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  });

// Parse command-line arguments
program.parse(process.argv);
