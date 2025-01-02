# Page Object Model Generator CLI

This project provides a command-line tool to crawl web pages and generate **Page Object Models (POM)**, which can be used in automated UI testing frameworks like WebdriverIO. The tool uses Puppeteer to extract elements with stable attributes (e.g., `data-test-id`, `id`) and outputs structured POM files.

---

## **Features**
- **Web Crawling**: Extracts elements with `data-test-id` and `id` attributes from web pages.
- **POM Generation**: Creates JavaScript files that represent Page Object Models for automated testing.
- **Dynamic Class Naming**: The class name is based on the title of the crawled page.
- **Command-Line Interface**: Easy-to-use CLI for generating POMs with custom URLs and output directories.

---

## **Installation**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-repo-name/pom-generator.git
cd pom-generator
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Link the CLI (Optional)**
To use the tool globally, link it:
```bash
npm link
```

---

## **Usage**

### **Basic Command**
```bash
pom-generator generate -u <url> -o <output-directory>
```

### **Options**
- `-u, --url <url>`: URL of the webpage to crawl (required).
- `-o, --output <directory>`: Directory where the POM file will be saved (required).

### **Example**
```bash
pom-generator generate -u https://demo.applitools.com/ -o ./generatedPOM
```

**Output:**
- Crawls the page at `https://demo.applitools.com/`.
- Generates a POM file in the `./generatedPOM` directory.

---

## **Project Structure**
```
/project-root
│
├── /src
│   ├── /crawler         # Crawler logic
│   ├── /generator       # Generator logic
│   ├── /util            # Utility functions
│   │   └── stringUtils.js
│   └── cli.js           # Entry point for the CLI program
│
├── /generatedPOM        # Directory for generated POM files
├── package.json         # Project metadata
└── README.md            # Documentation
```

---

## **How It Works**

1. **Crawler**
   - The `crawlPage` function uses Puppeteer to load the webpage and extract elements with `data-test-id` and `id` attributes.
   - Each extracted element includes:
     - `tagName`: The HTML tag (e.g., `DIV`, `BUTTON`).
     - `selector`: A unique selector based on `data-test-id` or `id`.
     - `text`: The visible inner text of the element.

2. **Generator**
   - The `generatePOM` function takes the extracted elements and creates a POM class in JavaScript.
   - The class name is derived from the page title, converted to PascalCase.
   - Each element is represented as a property with its selector and a descriptive comment.

3. **CLI**
   - The CLI parses command-line arguments and orchestrates the crawling and generation process.

---

## **Example Output**
For a page with the following elements:
```html
<div id="header">Header Content</div>
<button data-test-id="login-button">Login</button>
<a href="#" data-test-id="learn-more">Learn More</a>
```

The generated POM file will look like:
```javascript
class DemoApplitoolsCom {
  constructor() {
    this.header = "#header"; // Header Content
    this.loginButton = "[data-test-id='login-button']"; // Login
    this.learnMore = "[data-test-id='learn-more']"; // Learn More
  }
}

module.exports = new DemoApplitoolsCom();
```

---

## **Error Handling**
- **No Elements Found**: If no elements with `data-test-id` or `id` are found, the program logs an error and exits.
- **Invalid URL**: Ensure the URL is accessible and loads correctly.

---

## **Dependencies**
- [Puppeteer](https://pptr.dev): For browser automation and web crawling.
- [Commander](https://github.com/tj/commander.js): For building the CLI.
- [fs-extra](https://github.com/jprichardson/node-fs-extra): For enhanced file system operations.
- [Prettier](https://prettier.io): To format the generated POM files.

---

## **Contributing**

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## **License**

This project is licensed under the MIT License. See the LICENSE file for details.

---

## **Contact**
For questions or feedback, open an issue or contact the maintainer at [tanvir6@example.com].

