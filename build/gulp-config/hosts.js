module.exports = {

    staging: {
        host: 'staging.host',
        username: 'username',
        password: 'fancypassword',
        path: '/home/httpd/virtualhost'
    },

    production: {
        host: 'production.host',
        username: 'username',
        password: 'fancypassword',
        path: '/home/httpd/virtualhost'
    },


    //remote host of developer box for mobile debug with weinre
    devbox: {
        ports: {
            weinre: 10500,
            connect: 10100 //optional port for standalone static server
        }
    }
};