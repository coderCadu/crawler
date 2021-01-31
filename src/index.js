try {
    require('dotenv/config');
    require('./server');
} catch (err) {
    console.error(err);
}