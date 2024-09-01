const axios = require('axios');


exports.index = async (req, res) => {
    res.render('index', {
        title: 'Dashboard'
    });
}

exports.price = async (req, res) => {

    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1');
      
    const data = response.data;

    

    res.render('price', {
        title: 'Price',
        coinsData: data
    });
}

exports.exchange = async (req, res) => {
    try {
        const id = req.query.id;

        // Use Promise.all to fetch data concurrently
        const [infoResponse, chartResponse] = await Promise.all([
            axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&per_page=1&page=`),
            axios.get(`https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=1`)
        ]);

        // Extract the necessary data
        const coinInfo = infoResponse.data[0];

        // chartData need to process. 
        const chartData = chartResponse.data.map(dataPoint => ({
            x: dataPoint[0],  // Timestamp converted to Date
            y: [dataPoint[1], dataPoint[2], dataPoint[3], dataPoint[4]]  // Open, High, Low, Close
        }));

        coinInfo.ohlc = chartData;
        console.log(coinInfo);
        // Render the data to the template
        res.render('exchange', {
            title: 'Exchange',
            coinInfo            
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the data.');
    }
};