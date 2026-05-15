module.exports = {
  branches: ["main"],

  repositoryUrl:
    "https://github.com/MuhammedFayazTS/easystart-cli.git",

  plugins: [
    "@semantic-release/commit-analyzer",

    "@semantic-release/release-notes-generator",

    [
      "@semantic-release/npm",
      {
        npmPublish: true,
      },
    ],

    "@semantic-release/github",
  ],
};