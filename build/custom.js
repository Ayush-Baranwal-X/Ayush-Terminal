var namex = "";
$('body').terminal
    (
        {
            // Function to print something
            help: function () {
                this.echo('');
                this.echo('Here is a list of all available commands');
                this.echo('Arguments that need to be provided by you are given in <> brackets');
                this.echo('Enter the arguments with proper spacing');
                this.echo('');
                this.echo('List of commands');
                this.echo('');
                this.echo('im <Your name> - Welcome message');
                this.echo('ayush - Shows my photo');
                this.echo('github - Takes you to my Github profile');
                this.echo('linkedin - Takes you to my LinkedIn profile');
                this.echo('cv - Takes you to my CV profile');
                this.echo('email - Send me an email');
                this.echo('projects - Displays a list of all my projects');
                this.echo('portfolio - Displays a list of all my projects');
                this.echo('date - Displays the current');
                this.echo('weather <city_name> - Shows the weather in the given city (city name should be a single word)');
                this.echo('refresh - Refresh the terminal');
                this.echo('clear - Completely clear the whole terminal');
                this.echo('joke - Display a joke');
                this.echo('cat <Width> <Height> - Displays a cat picture');
                this.echo('pic <Object> <Width> <Height> - Shows a random picture of "Object" with given width and height');
                this.echo('link <Complete url> - Provides link to your url');
                this.echo('');
            },
            // Joke function
            joke: function () {
                $.ajax({
                    url: 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit',
                    method: 'GET',
                    success: function (response) {
                        var setup = response.setup; // Accessing the URL from the response
                        var delivery = response.delivery; // Accessing the URL from the response
                        if (setup == undefined) {
                            this.echo("Network issue. Please try again.")
                        }
                        else {
                            this.echo(setup); // Output: the resized image
                            this.echo(delivery); // Output: the resized image
                            this.echo('')
                        }
                    }.bind(this), // Ensure 'this' refers to the appropriate context
                    error: function (xhr, status, error) {
                        this.echo("Network issue. Please try again.")
                        // this.error('Failed to fetch image:', error);
                    }.bind(this) // Ensure 'this' refers to the appropriate context
                });
            },
            date: function () {
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                today = mm + '/' + dd + '/' + yyyy;
                this.echo(today);
                this.echo('');
            },
            im: function (name) {
                namex = name;
                this.echo('Hello, ' + name + '. Welcome to this terminal.');
                this.echo('');
            },
            projects: function () {
                this.echo('Here is a list of most of my major projects');
                this.echo('');
                var link = document.createElement('a');
                link.href = 'https://github.com/Ayush-Baranwal-X/ayush_mail';
                link.textContent = 'Dmail (Email Website)';
                link.target = '_blank'; // Open link in a new tab
                this.echo(link);
                this.echo('');

                link = document.createElement('a');
                link.href = 'https://github.com/Ayush-Baranwal-X/my-first-blog';
                link.textContent = 'Ayush\'s Blog (Blog Website)';
                link.target = '_blank'; // Open link in a new tab
                this.echo(link);
                this.echo('');

                link = document.createElement('a');
                link.href = 'https://github.com/Ayush-Baranwal-X/Real-Estate-Price-Prediction';
                link.textContent = 'Real Estate Price Prediction (ML Model)';
                link.target = '_blank'; // Open link in a new tab
                this.echo(link);
                this.echo('');

                link = document.createElement('a');
                link.href = 'https://github.com/Ayush-Baranwal-X/Credit-Card-Fraud-Detection';
                link.textContent = 'Credit Card Fraud Detection (ML Model)';
                link.target = '_blank'; // Open link in a new tab
                this.echo(link);
                this.echo('');

                link = document.createElement('a');
                link.href = 'https://github.com/Ayush-Baranwal-X/Handwritten-Digit-Recognition';
                link.textContent = 'Handwritten-Digit-Recognition (ML Model)';
                link.target = '_blank'; // Open link in a new tab
                this.echo(link);
                this.echo('');

                link = document.createElement('a');
                link.href = 'https://ayushbaranwal.itch.io/driverclub';
                link.textContent = 'Driver Club (Racing Game)';
                link.target = '_blank'; // Open link in a new tab
                this.echo(link);
                this.echo('');

                link = document.createElement('a');
                link.href = 'https://ayushbaranwal.itch.io/wonderland';
                link.textContent = 'Wonderland (Open World Shooting Game)';
                link.target = '_blank'; // Open link in a new tab
                this.echo(link);
                this.echo('');

                link = document.createElement('a');
                link.href = 'https://github.com/Ayush-Baranwal-X/Quiz';
                link.textContent = 'Quiz (Android App)';
                link.target = '_blank'; // Open link in a new tab
                this.echo(link);
                this.echo('');

                link = document.createElement('a');
                link.href = 'https://github.com/Ayush-Baranwal-X/Cookie-Clicker-Bot';
                link.textContent = 'Cookie Clicker (Bot)';
                link.target = '_blank'; // Open link in a new tab
                this.echo(link);
                this.echo('');

                link = document.createElement('a');
                link.href = 'https://github.com/Ayush-Baranwal-X/Dmail-Scraper';
                link.textContent = 'Dmail Scraper (Web Scraper)';
                link.target = '_blank'; // Open link in a new tab
                this.echo(link);
                this.echo('');
            },
            portfolio: function () {
                var link = document.createElement('a');
                link.href = 'https://ayush-baranwal-x.github.io/';
                link.textContent = 'Link to your url';
                link.target = '_blank'; // Open link in a new tab
                link.click();
                this.echo('Welcome back to Terminal');
                this.echo('');
            },
            ls: function () {
                this.echo("root     about     github     projects     linkedin     cv");
                this.echo('');
            },
            cd: function (folder) {
                this.echo("Sorry, you can't leave. You are trapped in this directory :)");
                this.echo('');
            },
            // Function to display a link
            link: function (url) {
                var link = document.createElement('a');
                link.href = 'https://' + url;
                link.textContent = 'Link to your url';
                link.target = '_blank'; // Open link in a new tab
                link.click();
                this.echo(link);
                this.echo('');
            },
            // Complete this
            weather: function (city) {
                $.ajax({
                    url: 'https://wttr.in/'+city+'?T',
                    method: 'GET',
                    success: function (response) {
                        var index1 = response.indexOf('<pre>')+6;
                        var index2 = response.indexOf('</pre>');
                        var img = response.substring(index1,index2); // Accessing the URL from the response
                        if (img == undefined) {
                            this.echo("Network issue. Please try again.")
                        }
                        else {
                            this.echo(img); // Output: the resized image
                            this.echo("Follow @igor_chubin for wttr.in updates")
                        }
                    }.bind(this), // Ensure 'this' refers to the appropriate context
                    error: function (xhr, status, error) {
                        this.echo("Network issue. Please try again.")
                        // this.error('Failed to fetch image:', error);
                    }.bind(this) // Ensure 'this' refers to the appropriate context
                });
            },
            // Function to directly redirect current web page to a new web page
            github: function () {
                var link = document.createElement('a');
                link.href = 'https://github.com/Ayush-Baranwal-X';
                link.textContent = 'Link to your url';
                link.target = '_blank'; // Open link in a new tab
                link.click();
                this.echo('Welcome back to Terminal');
                this.echo('');
            },
            email: function () {
                var link = document.createElement('a');
                link.href = 'mailto:ayushkumarbaranwal1@gmail.com';
                link.textContent = 'Link to your url';
                link.target = '_blank'; // Open link in a new tab
                link.click();
                this.echo('');
            },
            linkedin: function () {
                var link = document.createElement('a');
                link.href = 'https://www.linkedin.com/in/akbiitd';
                link.textContent = 'Link to your url';
                link.target = '_blank'; // Open link in a new tab
                link.click();
                this.echo('Welcome back to Terminal');
                this.echo('');
            },
            cv: function () {
                var link = document.createElement('a');
                link.href = 'https://bit.ly/akbiitd-cv';
                link.textContent = 'Link to your url';
                link.target = '_blank'; // Open link in a new tab
                link.click();
                this.echo('Welcome back to Terminal');
                this.echo('');
            },
            refresh: function () {
                window.location.reload();
                this.echo('');
            },
            // Function to get images of cat of different sizes
            cat: function (width, height) {
                const img = $('<img src="https://placekitten.com/' +
                    width + '/' + height + '">');
                this.echo(img);
                this.echo('');
            },
            pic: function (object, width, height) {
                const img = $('<img src="https://source.unsplash.com/random/' + width + 'x' + height + '/?' + object + '">');
                this.echo(img);
                this.echo('');
            },
            ayush: function () {
                const img = $('<img src="ayush.jpg" width="180" height="200">');
                this.echo(img);
                this.echo('');
            },
        },
        {
            // Text which appears at the top
            greetings: 'Hi! I am Ayush Kumar Baranwal.\n' +
                'Welcome to my custom Web Terminal\n' +
                'Type help to see a list of all commands\n'
        }
    );