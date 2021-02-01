const puppeteer = require('puppeteer');

async function crawler(checkInDate, checkOutDate) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    const searchEngineUrl = `https://myreservations.omnibees.com/default.aspx?q=5462&version=MyReservation#/&diff=false&CheckIn=${checkInDate}&CheckOut=${checkOutDate}&Code=&group_code=&loyality_card=&NRooms=1&ad=1&ch=0&ag=-`;
    console.log(searchEngineUrl);
    await page.goto(searchEngineUrl);

    const pricesList = await page.evaluate(() => {
        const nodeList = document.querySelectorAll('.pricesResultsTextColor');
        const ratePriceArray = [...nodeList];
        const pricesList = ratePriceArray.map(({ innerText }) => ({ 
            preco: innerText,
        }));

        return pricesList;
    });

    const pricesListJson = JSON.stringify(pricesList);

    await browser.close();
    return pricesListJson;
}

module.exports = crawler;
