const { defineConfig } = require('cypress')

module.exports = defineConfig({
  env: {
    url: "http://localhost:7001",
  },
  projectId: "bj8yoz",
  e2e: {
    setupNodeEvents(on, config) {
    },
  },
});
