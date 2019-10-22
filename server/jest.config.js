module.exports = {
    preset: "jest-puppeteer",
    testRegex: "./*\\.spec\\.js$",
    testEnvironment: "node",
    setupFilesAfterEnv: ["./test/setup.js", "expect-puppeteer"]
};
