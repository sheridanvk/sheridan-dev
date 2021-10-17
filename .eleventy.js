module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats(["jpg", "md", "njk"]);
  eleventyConfig.addPassthroughCopy("css");
  return {
    passthroughFileCopy: true,
  };
};
