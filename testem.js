module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  launch_in_ci: [
    'Chrome'
  ],
  launch_in_dev: [
    'Chrome'
  ],
  browser_args: {
    Chrome: {
      ci: [
        // --no-sandbox is needed when running Chrome inside a container
        process.env.CI ? '--no-sandbox' : null,
      "--headless",
      "--disable-gpu",
      "--remote-debugging-port=9222",
      "--remote-debugging-address=0.0.0.0",
      "--no-sandbox",
      "--user-data-dir=/tmp"
      ].filter(Boolean)
    }
  }
}
