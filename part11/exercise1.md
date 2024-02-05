Hypothetical Scenario:
An application is being worked on by a team of 6 people. The application is in active development and will be released soon. The application is coded in Python using a framework like Flask or Django.

Points to discuss:
- Some common steps in a CI setup include linting, testing, and building. What are the specific tools for taking care of these steps in the ecosystem of the language you picked? You can search for the answers by google.
Linting: Flake8, Pylint, Black
Testing: pytest, unittest
Building: setuptools, distutils, poetry

- What alternatives are there to set up the CI besides Jenkins and GitHub Actions? Again, you can ask google!
Some alternatives include:
Docker and Semaphore for a small or medium sized Flask application. Docker will handle the testing within a containerized environment before the app gets deployed. Semaphore with Flask acts as a simple task manager that sets up the Docker environment/container for the app.
The code for the app can be hosted on GitLab and GitLab also includes its own CI/CD software.
If the application is larger and requires more containers then Kubernetes is a good option because it can manage multiple containers runtimes including Docker. This is good for scaling applications.
Microsoft Azure can create cloud-hosted CI/CD pipelines for any language and platform. It is free and open source.
Amazon Web Services AWS also allows you to create cloud-hosted CI/CD pipelines.

- Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?
Self-hosted:
Pros:
Good for complex and large applications
If you want complete customization and have special requirements
Cons:
Complicated to set up and maintain

Cloud-based:
Pros:
Good for simple and medium sized applications
Doesn't have any special requirements and doesn't require graphics card to run tests so doesn't have large build times that need more GPU or RAM etc.
Ease of use and scalability
Cons:
Limited if you have special requirements
Limited if you require more GPU and RAM to build and deploy

What to consider:
The size and complexity of the application
How do you want to scale the application?
Any special requirements?
Cost? How much you are willing to spend on the CI/CD pipeline?