# Project setup

A few steps are required to setup this project but it shouldn't take long.

All commands mentioned should be ran from the project root.

## Prerequisite Software

* [Git](http://git-scm.com) and/or the **GitHub app** (for [Mac or Windows](http://desktop.github.com)).
* [Node.js](http://nodejs.org), (version `>=4.2.1` `<5`). It should include [npm](https://www.npmjs.com/) (node package manager).

## Getting started

### 1. Install packages
All packages for this project can be retrieved by executing following command:
```
npm install
```

### 2. Configuration (optional)
A few servers are set up for this project and the settings for them are available in the `src/server/.settings.json` file.
These are the default values that can be altered via an override:
```Javascript
{
  httpServer: {
    host: 'localhost',
    port: 8080
  },
  staticServer: {
    host: 'localhost',
    port: 8081
  },
  matchServer: {
    host: 'localhost',
    port: 8082,
    sampleSize: 32
  },
  apiVersions: {
    'summoner': 'v1.4',
    'matchlist': 'v2.2',
    'match': 'v2.2',
    'static-data': 'v1.2',
  },
  gameTime: 60 * 60 * 1000
}
```

### 3. Setup node servers
This project runs two servers to retrieve data from the [Riot Games API](https://developer.riotgames.com/).
This is a guide on how to set them up.

#### 3.1 Create `.api.key`
Create an account at [developer.riotgames.com](https://developer.riotgames.com/). Now you automagically have an api key.
Create a file named `.api.key` and add the key to it (no newline). Place it at the root of the project.

#### 3.3 Run
```
npm run static-server
npm run match-server
```

### 4. Run a HTTP server (webpack-dev-server)
I recommend the [webpack-dev-server](https://github.com/webpack/webpack-dev-server) which is included as a packages.

#### 4.1 Run
```
npm run server
```

## Reddit Release
Every release a python script will generate a post on reddit. To improve this script or to create new scripts the following software is required:

* [Python](https://www.python.org/downloads/), (version `>=3.5.1`). It should include [pip](https://pypi.python.org/pypi/pip) (Pip Installs Packages). 
  * [praw](https://praw.readthedocs.org) (`pip install praw`)

`src/reddit/.settings.json`:
```JSON
{
  "SUBREDDIT": "LegendBuilder",
  "REDDIT_USERNAME": "LookAtMeImRedditNow",
  "REDDIT_PASSWORD": "LegendBuilderDaBest"
}
```

## <a name="clang-format"></a> ClangFormat
ClangFormat will format the code according to the style-guide ([CONTRIBUTING.md](CONTRIBUTING#rules)) of this project.
The following command will format all .ts files:
```
npm run format
```

### Visual Studio Code
When using VSCode the command can be integrated in the IDE as a task:

```JSON
{
  "version": "0.1.0",
  "command": "npm",
  "isShellCommand": true,
  "suppressTaskName": true,
  "tasks": [
    {
      "taskName": "format",
      "args": ["run", "clang-format", "--", "${file}", "-i" ],
      "showOutput": "never"
    }
  ]
}
```
