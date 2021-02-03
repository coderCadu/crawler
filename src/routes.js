const router = require('express').Router();

const crawler = require('./lib/crawler');

router.post('/buscar', async (request, response) => {
    const apartmentList = await crawler(request.body.checkin, request.body.checkout);

    response.status(200).send(apartmentList);
});

module.exports = router;