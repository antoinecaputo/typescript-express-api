import express, { Express } from 'express';
import helmet from "helmet";
import logger from "morgan";
import {IndexHandler, NotFoundHandler} from "./routes";
import {RestaurantHandler} from "./routes/restaurants";


import dotenv from 'dotenv';
dotenv.config();


/**
 * Init app settings
 */
const app: Express = express();

app.use(helmet()); // https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || 3000;
app.set('port', port);


/**
 * Set routes.
 */

app.get('/restaurants/:restaurantId', RestaurantHandler);

app.get('/', IndexHandler);

app.use(NotFoundHandler)


/**
 * Listen on provided port, on all network interfaces.
 */

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
app.on('error', onError);


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error:any) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
