# Got Mail 
## 3813ICT Assignment 1
## GIT REPOSITORY : https://github.com/shweme/AngularChats.git
### Git repository was initialised with code from week 4 lab (see link https://github.com/shweme/AngularLabs). commits were pushed during major milestones like html/css setup, bugs fixed, etc. All commits had appropriate commit messages.
### Data Structures:
#### Server side uses JSON files to store user data such as :
##### users.json - username, isGroupAdmin, password and email. 
##### groups.json - all existing groups
##### channels.json - channel ids, the groups they exist in ( multiple channels can have the same name, so CID is unique)
##### messages.json - history of messages with unique message ids.
#### Server side uses fs to communicate with the JSON files and get/send data required by the client side.

### Angular Architecture:
#### Components:
##### Login - login form
##### Account - profile/account page
##### Chats - Chat page

#### Service: "data manager" service that communicates between components and server side

#### Ng Model used for two way data binding to communicate between HTML and TS. ngIf used in HTML to hide/show elements

#### Routes: paths to all listed components with default being /account is user has logged in or /login if not.


### Client/Server Communication
#### Responsibilities between client and server were divided by having the server provide a REST API which returns requested data parsed on Server side 

#### •Node server architecture: modules, functions, files, global variables. 
#### •A list of routes, parameters, return values, and purpose in the sever side 
#### •Describe the details of the interaction between client and serverby indicating how the files and global vars in server #### side will be changed and how the display of each angular component page will be updated.
