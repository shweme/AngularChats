# Got Mail 
## 3813ICT Assignment 1
## GIT REPOSITORY : https://github.com/shweme/AngularChats.git
#### This document aims to provide an insight into the software development practices exercised during the development of the Gotmail chat system. Also included is the structure and main system variables to be aware of. This documentation does not provide any code examples, however, a link to the Github repository of the developer has been embedded.
#### GITHUB REPOSITORY LINK: https://github.com/shweme/AngularChats.git
#### As per industry standards, continuous integration for the Gotmail chat system took place through version control software. This allowed me to be mobile and use university computers during the developmental phases. The initial commit included legacy code from Week 4’s lab of the same course. Commits were made to the above Github repository which indicated what feature had been implemented that commit. The Github repository for Gotmail includes all the folders and files that are required to host this particular chat system. When newly cloning into a folder however, the command npm install should be run in the repository to ensure it is able to run. A MongoDB server should also be running for this same purpose.
#### All code required to run the chat application is located in the above Github repository. The server-side functionality containing the database usage is located in the server folder in AngularChats. This server folder contains server.js which implements the main server-side functionality. However, server.js uses socket.js for chats socket functionality, and data.js for MongoDb CRUD operations. DBPopulate.js initially populates the gotmail database with dummy user data. The frontend development was implemented in angular and main functionality is done through modules and services in the src/app folder. More detail on these modules and services will follow

### Data Structures:
#### The server-side storage of data was done through MongoDB database implementation. MongoDB is a NoSQL database management system that is quite lenient with its database file structures. This makes make it more scalable, however I used a RDBMS approach to the database design which allowed logical. The server-side makes use of this through populating the database “gotmail” with the following collections:
#### •	Users collection: contains a list of all the users in the system, their username, email ID, password, whether they’re currently logged in, and if they have any group admin or assis priviledges. 
#### •	Groups collection: contains a list of all groups that have been created, their group ID and the name of the group.
#### •	Channels collection: contains a list of not just each channel that exists in a group, but also all the members in that channel. A single entry in the channels table will look something like this:
##### 	[{"CID":0,
######    "name":"general",
######     "group":"GotMail Support",
######     "owner": "super",
######     "members":["super","shweme"]
######  }]
##### Where CID is the channel’s unique identifier, name is the channel’s name, group indicates which group it belongs to (can only be one). Owner indicates the owner of the channel, and members is a list of all current members.
##### •	Messages collection: Contains a list of all the messages that have been sent through the system. Each “message” has a time it was sent, a body containing the text that was sent, a CID to differentiate what channel it was sent in, and UID to indicate who sent the message.

### RESTful API:
#### The communication of data between server and client side of the Gotmail chat system is done using REST API design over HTTP protocol. HTTP routes were created which directed client-side relaying of information to appropriate server-side routes listening for such relays. The routes present in the Gotmail chat system are:
##### /login:
###### This route uses a Promise to HTTP.post the entered username and password on the login page and returns true if the entered password is valid for the entered username, else false. 
##### /account:
###### This route uses a Promise to HTTP.post the current user’s name to retrieve all user data and returns the current user’s MongoDB entry with name, email, and profile picture.
##### /group:
###### This route uses a Promise to HTTP.post for all the groups currently existing in the database. On account and chat pages, this route helps display all the groups the user is in.
##### /channel:
###### This route uses a Promise to HTTP.post the current user’s name and returns a list of all the channels the user is part of. This, along with the /group route helps display all the groups and channels the user is in on the account and chat pages. 
##### /messages:
###### This route uses a Promise to HTTP.post the channel chat that the user is currently in (CID) and returns a list of all the messages that have been relayed on the chat in chronological order. This message list is then displayed in the chat with channel ID CID.

### Angular Architecture
#### Components
##### LOGIN: Represents the login page which accepts the username and password entered and performs a validation check through RESTful API route /login. This is also the landing page for the Gotmail application.
##### ACCOUNT: Represents the profile page of the current logged in user and displays all user data including name, email, groups, and channels of groups this user is a part of. The account page utilises /account, /group, and /channel routes to retrieve and display this information.
##### CHAT: Represents the actual chat page of the current logged in user and displays all user chat data including the groups they are in, the channels of these groups they are in, and the message in these channels that have been relayed. The chat page utilises /group and /channel for displaying the list of groups and channels and when the user clicks on a channel name /messages displays all messages sent on that chat. The Chat component also uses sockets to display messages as they are received in real-time.

#### Services
##### DATA SERVICE: The data service uses Promises and the HTTP-client to communicate between the components described above and the specific routes corresponding to those described on the server-side. Additionally, it performs a validation check every time the user navigates to a page to ensure that only a logged in user can access the application. It does this through the access of local storage.
##### SOCKETS SERVICE: The sockets service uses the socket.io-client and Observables to communicate to the backend socket.io functions for the chat component. This enables users to view messages as they are sent, in real-time.

#### Models
##### The html views of all components utilise the NgModel for two-way binding with global variables of the corresponding TypeScript files. In addition to this, NgIf and NgFor are used to display appropriate data to the login page and the user’s account and chat pages.
