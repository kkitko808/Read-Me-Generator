const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");


const questions = [
    {
        name: "gitName",
        message: "What is your github username?"
    },
    {
        name: "projectTitle",
        message: "What is your project's title?'"
    },
    {
        name: "description",
        message: "What is a short description of your project?"
    },
    {
        name: "contents",
        message: "List off the table of contents."
    },
    {
        type: "list",
        name: "installation",
        choices: ["D:", "C:", "Desktop"]
    },
    {
        name: "usage",
        message: "Usage of the project?"
    },
    {
        name: "license",
        message: "What type of license?"
    },
    {
        name: "contributing",
        message: "Who else contributed?"
    },
    {
        name: "tests",
        message: "Enter tests here"
    },
    {
        name: "questions",
        message: "Write any questions here"
    }
];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function () {
    })
}

function init() {
    // having an inquirer call of the questions then once the user is finished runs the rest of the code.
    inquirer.prompt(questions).then(function (data) {
        // github query url as var
        var queryURL = `https://api.github.com/users/${data.gitName}`;

        axios
            .get(queryURL)
            .then(function (res) {
                // setting the user avater and email from response as variables
                var userImage = res.data.avatar_url;
                var userEmail = res.data.email;
                var userGitName = res.data.login;
                // generates the output for the readme
                var readMeText =
                    `# Project Name
${data.projectTitle}

# Description
${data.description}

# Table of Contents
${data.contents}

# Installation
${data.installation}

# Usage
${data.usage}

# License
${data.license}

# Test(s)
${data.tests}


## Github Username
${data.gitName}

## Github profile image
${userImage}

## Email
${userEmail}
`
                // writeToFile call given the text just entered!
                writeToFile(userGitName + ".md", readMeText);
            })
    })
}

init();