# WriterWebsite

This is a restricted CRUD App, which I built while learning the React framework. Due to it being developed while learning there are a number of flaws/antipaterns.

This website can be viewed at https://writer-205511.appspot.com/ and is a simple app that allows users to register and submit short stories which can then be rated. Feel free to sign up, the email is not validated, but is required.

In the API backend you will find:
- auth: this will handle registration, sign up, and tocken checking.
- piece: this handles submission and returning the short stories.
- rating: this handles the submission of ratings.

The backend contains the first antipattern. The front passes a reference to the app and component that called it. This is then used to call setState from that reference. This should not be done and the functions should instead return data which can be handled by the component itself.

The front end has the following routes:
- Home: Displays texts.
- Registration: Handles registration and sign in.
- UserPage: Displays all pieces by user.
- Piece: Displays a short story.
- Write: Handles short story sumission.

Interaction with the API is done through the scripts in the apiActions folder. 

