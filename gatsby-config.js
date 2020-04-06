module.exports = {
  plugins: [
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "images",
        path: `${__dirname}/content/images`,
      },
    },
    {
      resolve: "gatsby-plugin-sharp"
    },
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-normalize-paths",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1000,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-tinacms",
      options: {
        plugins: [
          "gatsby-tinacms-remark",
          {
            resolve: "gatsby-tinacms-git",
            options: {
              pathToRepo: process.cwd(),
              pathToContent: "",
              defaultCommitMessage: "chore: update from tina",
              defaultCommitName: "tinacms",
              defaultCommitEmail: "git@tinacms.com",
              pushOnCommit: true,
            },
          },
        ]
      }
    }
  ]
}
