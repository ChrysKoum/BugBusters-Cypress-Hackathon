const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'bj8yoz',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
