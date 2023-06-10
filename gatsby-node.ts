exports.onCreatePage = ({ page, actions }) => {
    const { createPage } = actions;
    if (page.path === `/`) {
        console.log("matched!!!")
      page.matchPath = `/*`;
      createPage(page);
    }
  };