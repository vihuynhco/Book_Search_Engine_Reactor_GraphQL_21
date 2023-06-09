# Book_Search_Engine_Refactor_GraphQL

## Description

 The Book Search Engine is a web app that gives readers the ability  to search for books using Google Books API and save books and stored on your local storage. You can search for books using any keywords, such as title or description.  You can create your own log in credentials to save your books.  Saved books can be accessed using the "see you books".  

## Table of Contents

- [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Test](#test)
  - [Questions](#questions)

## Installation

  To access this application, you will need to clone the repo to you local terminal.  Install dependencies by
  running npm i in your root directory.Ensure that your connection.js is properly set up with your database, this app uses mongoDB.  Start your server by running npm run develop.  Once your server is up and running you can access client view from your local terminal.
  
## Usage

- When the application loads, you will be presented with a menu that includes options to search for books and login/signup form.
- Clicking on the "Search for Books" option will display an input field and a submit button. Enter a search term and click the submit button to search for books.
- If you are not logged in, the search results will be displayed with book titles, authors, descriptions, images, and links to the books on the Google Books site.
- If you are logged in, you will see a "Save" button for each book in the search results. Clicking the "Save" button will save the book to your account.
- You can access your saved books by clicking on the "See Your Books" option in the menu. The saved books will be displayed with their details, and you can remove a book by clicking the "Remove" button.
- You can also logout by clicking on the "Logout" option in the menu.

## License

  None

## Contributing

  Contributions to the Book Search Engine project are welcome. Feel free to make edits to tailor to your needs.
  
## Test

 To run the tests for the Book Search Engine, follow these steps:

1. Ensure that the application and dependencies are installed by following the installation instructions.
2. Open the terminal or command prompt and navigate to the root directory 
3. Run the command: npm run develop to connect to your local server and graphQL
4. Once you are connected to the server, you should  be able to access the app.

## Questions

Please feel free to reach out to me via email or in github. 

Email: vihuynhco@gmail.com
Github: /vihuynhco
