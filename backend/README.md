<H1>Agency Framework Core</H1>
<p>Agency framework core is part of Agency framework where we host central authentication and app and team managemnts</p>

<h4>Technology Stack</h4>
<li>Node-express</li>
<li>React</li>
<li>Postgresql</li>

To run this app make sure already have the front end application. <a href="https://gitlab.com/hipdevteam/afcorefrontend">Here </a> is the core front end app code repository.
<br><br>Follow the following steps to set up the project.

<h3>Step 1:</h3>
Make sure your system have installed docker and docker compose.Follow the following steps to
install docker in your machine (Ubuntu)

<a href="https://dev.to/semirteskeredzic/docker-docker-compose-on-ubuntu-20-04-server-4h3k">Docker Install</a>
<br>Just follow the Step 1 and Step 4 from this link to install docker and docker-compose

<h3>Step 2:</h3>
Open your Project.
<br>
Create a .env file and copy all from the .env.example

<h3>Step 3:</h3>
Run the following command to create the environment

<b>cd docker-env/</b>
<br>Copy core-local.yml.example to core-local.yml
<br>open the core-local.yml and change all the volume path of your service.<br>
To update the path replace <b>UPDATE_PATH</b> with your local path.

<h3>Step 4:</h3>
Go to your core-frontend app repository and copy .env.example to .env file and update the values. 
<h3>Step 5:</h3>
Run the docker compose command
<br>
<b>sudo docker-compose -f core-local.yml up -d</b>

<br>
To browse the project go to following link
<br>
<a href="http://localhost:4040/">http://localhost:4040/</a>
<br>
To browse the database go to following link
<br>
<a href="http://localhost:9081/">http://localhost:9081/</a>
<br>
user: root<br>
Password: root123
<br>
Create a database schema named <b>af_core</b>

<h3>Step 6</h3>
run this command to enter the container

<b>sudo docker exec -it core-backend sh</b>
<br>
After that Run the migration and db seed command
<br>
<b>npx sequelize-cli db:migrate</b><br>
<b>npx sequelize-cli db:seed:all</b>

<h3>Step 7</h3>
To check the logs you use following commands<br>
<b>sudo docker logs -f schema-backend</b><br>
<b>sudo docker logs -f schema-frontend</b>
