const fetch = require("node-fetch");
const md = require("markdown-it")();

// function to get blogposts
async function getAllBlogposts() {
  let blogposts = [];

  try {
    // initiate fetch
    const data = await fetch(
      "https://sheridan-dev-strapi.herokuapp.com/posts",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    // store the JSON response when promise resolves
    const response = await data.json();

    // handle CMS errors
    if (response.errors) {
      const errors = response.errors;
      errors.map((error) => {
        console.log(error.message);
      });
      throw new Error("Issue retrieving data from the CMS");
    }

    // update blogpost array with the data from the JSON response
    const responseHTML = response.map((blogpost) => ({
      ...blogpost,
      content: md.render(blogpost.content),
    }));
    blogposts = blogposts.concat(responseHTML);
  } catch (error) {
    throw new Error(error);
  }

  // format blogposts objects
  const blogpostsFormatted = blogposts.map((item) => {
    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      body: item.content,
      author: item.author,
      date: item.published_at,
    };
  });

  // return formatted blogposts
  return blogpostsFormatted;
}

// export for 11ty
module.exports = getAllBlogposts;
