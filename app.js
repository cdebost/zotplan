import 'babel-polyfill';
import express from 'express';
import Mongoose from 'mongoose';
import path from 'path';
import api from './api';

export default ({ port, dbName, googleAuthClient }) => {
    const app = express();

    Mongoose.Promise = global.Promise;
    Mongoose.connect(dbName);

    app.use('/api', api({ googleAuthClient }));

    app.use(express.static(path.join(__dirname, 'public')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
    });

    app.server = app.listen(port);

    return app;
}