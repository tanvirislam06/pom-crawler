const { pascalCase, camelCase, getDescriptiveName } = require("./stringUtils");

describe("pascalCase", () => {
  it("should convert a string to pascal case", () => {
    expect(pascalCase("hello world")).toBe("HelloWorld");
    expect(pascalCase("hello-world")).toBe("HelloWorld");
    expect(pascalCase("hello_world")).toBe("HelloWorld");
    expect(pascalCase("HELLO_WORLD")).toBe("HelloWorld");
    expect(pascalCase("HELLO-WORLD")).toBe("HelloWorld");
    expect(pascalCase("HELLO WORLD")).toBe("HelloWorld");
  });
});

describe("camelCase", () => {
  it("should convert a string to camel case", () => {
    expect(camelCase("hello world")).toBe("helloWorld");
    expect(camelCase("hello-world")).toBe("helloWorld");
    expect(camelCase("hello_world")).toBe("helloWorld");
    expect(camelCase("HELLO_WORLD")).toBe("helloWorld");
    expect(camelCase("HELLO-WORLD")).toBe("helloWorld");
    expect(camelCase("HELLO WORLD")).toBe("helloWorld");
  });
});

describe("getDescriptiveName", () => {
  it("should return camelCase of data-test-id attribute value", () => {
    const el = { selector: "[data-test-id='test-element']" };
    expect(getDescriptiveName(el, 0)).toBe("testElement");
  });

  it("should return camelCase of id value", () => {
    const el = { selector: "#test-element" };
    expect(getDescriptiveName(el, 0)).toBe("testElement");
  });

  it("should return fallback name for unhandled cases", () => {
    const el = { selector: ".test-element" };
    expect(getDescriptiveName(el, 0)).toBe("element0");
  });

  it("should return different fallback names for different indices", () => {
    const el = { selector: ".test-element" };
    expect(getDescriptiveName(el, 1)).toBe("element1");
    expect(getDescriptiveName(el, 2)).toBe("element2");
  });
});
