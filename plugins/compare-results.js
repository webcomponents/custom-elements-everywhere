module.exports = {
  name: "Compare Results",
  run: ({beforePath, afterPath} = {}) => {
    return Promise.resolve({
      failPR: false,
      prettyLog: "Hello from example plugin.",
      markdownLog: "## Hello from example plugin."
    });
  }
};
