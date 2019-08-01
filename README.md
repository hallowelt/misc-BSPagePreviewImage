# PHP wrapper for PhantomJS (based on Slim 3 Framework)
 
You can use PhantomJS as web-service with this wrapper

# Usage #

Send GET request with such parameters /?url={url}&cookies={cookies}

**required {url}** - address of the page from that you want to get a screenshot

**optional {cookies}** - if page couldn't be open without authentication, please send this param


response - PNG image or exception if something went wrong


# Settings #

/src/settings.php - here you can configure path to the local phantomjs application

