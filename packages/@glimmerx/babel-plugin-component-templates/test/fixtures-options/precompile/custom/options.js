// babel-plugin-test only supports options as an options.json file,
// so we have to manually pass this through to our fixture.

export default {
  precompileTemplate(template) {
    return `CUSTOM_COMPILER("${template}")`;
  },
};
