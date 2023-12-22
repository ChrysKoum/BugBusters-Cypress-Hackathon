const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    url: "https://rahulshettyacademy.com/seleniumPractise/#/",
  },
  projectId: "bj8yoz",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});


// const cypress = require("cypress");
// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   env: {
//     url: 'http://localhost:7001'
//   },
//   projectId: "9z7esn",
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//     specPattern: 'cypress/e2e/integration tests/*.js'
//   },
// });
