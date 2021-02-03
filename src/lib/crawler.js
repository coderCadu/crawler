const puppeteer = require('puppeteer');
const _ = require('lodash');

async function crawler(checkInDate, checkOutDate) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    const searchEngineUrl = `https://myreservations.omnibees.com/default.aspx?q=5462&version=MyReservation#/&diff=false&CheckIn=${checkInDate}&CheckOut=${checkOutDate}&Code=&group_code=&loyality_card=&NRooms=1&ad=1&ch=0&ag=-`;
    console.log(searchEngineUrl);
    await page.goto(searchEngineUrl);

    const { imgUrlList, apartmentTextList, bestPriceList } = await page.evaluate(() => {
        // pegar a imagem de apresentação de cada apartamento
        const nodeListImgs = document.querySelectorAll('.fancybox-thumbs');
        const imgsArray = [...nodeListImgs];
        const imgUrlList = imgsArray.map(({ href }) => ({ url: href }));

        // pegar o texto de título e a descrição de cada apartamento
        const nodeListExcerpt = document.querySelectorAll('.excerpt a[rel]');
        const excerptArray = [...nodeListExcerpt];
        const apartmentTextList = excerptArray.map((currentItem, index) => {
            const apartmentText = {
                title: index % 2 === 0 ? excerptArray[index].innerText : null,
                description: index % 2 !== 0 ? excerptArray[index].innerText : null
            };

            return apartmentText;
        });

        // pegar o melhor preço de cada apartamento
        const nodeListBestPrice = document.querySelectorAll('h6.bestPriceTextColor');
        const bestPriceArray = [...nodeListBestPrice];
        const bestPriceList = bestPriceArray.map(({ innerText }) => ({ price: innerText }))

        return { imgUrlList, apartmentTextList, bestPriceList };
    });

    // dividir por grupos de imagens
    const imgGroupsList = _.chunk(imgUrlList, 3);

    // separar título e descrição no mesmo objeto
    const apartmentTextListDiv = _.chunk(apartmentTextList, 2);

    function removeEmpty(obj) {
        Object.keys(obj).forEach(function(key) {
            (obj[key] && typeof obj[key] === 'object') && removeEmpty(obj[key]) ||
            (obj[key] === '' || obj[key] === null) && delete obj[key]
        });
        return obj;
    };

    const apartmentText = removeEmpty(apartmentTextListDiv);

    // formar um único objeto com todas as informações
    const apartmentList = _.zip(imgGroupsList, apartmentText, bestPriceList);
    
    // convert to json
    const apartmentListJson = JSON.stringify(apartmentList);

    await browser.close();
    return apartmentListJson;
}

module.exports = crawler;