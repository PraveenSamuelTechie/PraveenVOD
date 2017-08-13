Web Application Architecture

The Video On-Demand application was developed using JavaScript, HTML, CSS and Bootstrap. 
Dividing the application into two components,

1)	Client

Client has the business-logic (features) of the Video On-Demand Application. The application was developed as a single page application with MVC pattern to improve code readability and maintenance.
JavaScript frameworks & libraries used
- AngularJS.
-	JQuery.
-	MomentJS.
-	OwlCarousel.

CSS
-	Bootstrap.
-	Font-Awesome.
-	Custom CSS.

2)	Server

Express-NodeJS open-source server framework was used. It provides http-web server to run the JavaScript application on the local server/web server.
Hosting
The web-application is hosted on Heroku, a Cloud Application Platform. 
Live Web App Demo: https://quiet-lowlands-94091.herokuapp.com/
 
List of Tools used to complete the application
-	Visual Studio. 
-	Eclipse.
-	GIT Bash.
-	Git Hub.
-	NodeJS CLI (CMD Integrated).
-	Heroku CLI (CMD Integrated).

Code Setup

Prerequisites

-	The targeted system should have the latest version of NodeJS installed.
-	https://nodejs.org/en/download/ to download the latest version of NodeJS.

Steps
-	https://github.com/PraveenSamuelTechie/praveenvod to locate the source of the project (git).  
-	Click on the button “Clone or download” --> “Download ZIP”.
-	Extract the downloaded file. (WinZip, WinRAR or default extractor can be used for extraction).
-	Open command prompt console and navigate to the application folder which is ‘praveenvod-master’.
-	Command: cd [folder-location].
-	After navigating to the application folder, type the command mentioned below,
-	Command: npm install.

Note: The above command reads the package.json folder and installs all dependencies specified.  
-	Once the installation is complete, type the command mentioned below,
-	Command: npm start.

Note: The above command reads the package.json folder and looks for the scripts tag and runs the server.js file.
-	Once the operation completes, you will be notified of the host and port-number of the application.
-	Host : 0.0.0.0 = localhost.
-	Port : 5859.
-	URL : localhost:5859.

Possible Installation Failure Cases

Note: I could test the application in 5 different operating systems operating on Windows. I do not have a Linux/ MacOS system. So, I couldn’t test it in Linux/MacOS environment.
The installation steps could fail due to one of the reasons below,
-	If there is a version conflict between the Node JS version running on the machine than what was mentioned on the package.json file.
Note: In this case, go to command prompt and type the command node -v which will list the NodeJS version of your system.
-	Open package.json file and change the version to resolve the version conflict.
-	The server might not start if there is an application already running on port 5859
Note: In this case, open the server.js file and change the port number to a different number.

List of implemented features

-	List of videos on a scrollable horizontal carousel populated from a web API.
-	Touch friendly carousel.
-	Select a video and play it back in full screen. When playback is finished or user quits it, user is taken back to home page.
-	Display second “Previously watched” carousel on the home page. It is re-sorted according to the most recently watched video.
-	The user can use a mouse and keyboard (arrows/Enter keys) to select the video.
-	Responsive User Interface Design.
-	Content refresh. Each click reloads content from API.
-	Persistent storage of watched items was implemented using local device cache.
-	Live app demo deployed to Heroku.

List of features that I couldn’t implement (Time constraints)

-	Change carousel to Portrait view grid if application is run on a mobile device.
-	Image caching. Upon application restart or content refresh.
-	Error handling.
-	Unit tests.

Known Issues

-	Two browser console errors as exception handling is not implemented for the image retrieval functionality. Although it doesn’t affect the functionalities.
-	During content refresh, the carousel breaks for 2 seconds and then it re-aligns. 
-	The Web-App URL images are dynamic. So, it displays a different image during every load. As image caching functionality is not implemented, the images that are displayed on the history section could be different from those displayed on the Video Catalogue section al-thought it references to the same image link.

Important usage notes

-	Carousel is implemented using Owl Carousel library for the following reasons,
-	Ease of implementation.
-	A plugin with responsive design features. 
-	Large screens will have 8 images.
-	Medium screens will have 5 images.
- Small screens will have 3 images.
-	Touch sensitive: Mobile friendly.
- (Left and Right) arrow keys are used for selection and navigation.
-	(Up and Down) arrow keys are used just in case if the user wants to scroll through the list.
-	Enter key is used to play a selected video.
-	The user will be able to select a video using mouse click.
-	The user will be able to play a video by clicking on an already selected video. (single-click to select a video and double-click to play a video).
-	HTML5 local storage is used to demonstrate persistent storage feature. Note: The history data will remain intact until the browser cookies are cleared. 
