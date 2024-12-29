const pascalCase = (str) =>
  str
    .replace(/[^a-zA-Z0-9]/g, " ") // Replace non-alphanumeric characters with spaces
    .split(" ")
    .filter((word) => word.trim().length > 0) // Remove empty words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join("");

// Helper function to convert strings to camelCase
const camelCase = (str) =>
  str
    .toLowerCase()
    .replace(/[_-\s](.)/g, (_, char) => char.toUpperCase()) // Handle _, -, and space
    .replace(/^\w/, (c) => c.toLowerCase()); // Ensure the first character is lowercase

// Function to generate meaningful and descriptive variable names
const getDescriptiveName = (el, index) => {
  // innerText can be very long and may not be suitable for variable names
  // Uncomment the following line if you want to use innerText
  // Future enhancement: Truncate the text to a reasonable length
  // Future enhancement: Use machine learning to generate more descriptive names
  // if (el.text.length > 0) {
  //     return camelCase(el.text); // Use the inner text of the element
  //   } else
  if (el.selector.startsWith("[data-test='")) {
    const attributeValue = el.selector.match(/data-test='([^']+)'/)[1];
    return camelCase(attributeValue); // Use the value of the `data-test` attribute
  } else if (el.selector.startsWith("#")) {
    return camelCase(el.selector.slice(1)); // Use the `id` value, removing the #
  } else {
    return `element${index}`; // Fallback for unhandled cases (shouldn't occur here)
  }
};

module.exports = { pascalCase, camelCase, getDescriptiveName };
