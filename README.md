
# Pokemon React

## Technologies Used

- [React](http://facebook.github.io/react) is used for UI (Typescript).
- [@tanstack/react-table](https://tanstack.com/table/latest) is used for UI and pagination
- [Redux-toolkit] for global scope
- [RTK-query] (https://redux-toolkit.js.org/rtk-query/overview) for querying and caching data
- [jest](https://jestjs.io/) for test cases.

## Features
- ### Pagination for Pokémon Display
    - Fetches a list of Pokémon from an external API.
    - Implements pagination to show a limited number of Pokémon per page.
    - Provides navigation controls to switch between pages and view more Pokémon.
- ### Detailed Pokémon Information
    - Clicking on a Pokémon from the list displays detailed information.
    - Shows the Pokémon's name, image, height, weight, and types.
- ### Unit and Integration Testing
    - Includes test cases for components to ensure they function correctly.
    - Tests interactions between components and data handling.
- ### Mobile Responsiveness
    - Ensures the application layout adapts well to different screen sizes.
    - Provides a user-friendly experience on mobile devices.

## Requirements

For development, you will only need Node.js installed on your local-machine.

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v16.20.1

    $ npm --version
    v8.19.4

## Folder Structure
    pokemon-react/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── PokemonList.js
    │   │   ├── PokemonDetails.js
    │   │   └── Pagination.js
    │   ├── App.js
    │   ├── index.js
    │   └── setupTests.js
    ├── package.json
    └── README.md

## Setup Instructions
- Clone the repository to your local machine.
- Navigate to the app directory.
- Install dependencies using `npm install`.
- Start the development server with `npm start`.

## Test Cases
Use this command to check test coverage.

    npm run test
