const getConfigFromEnv = require('directus/dist/utils/get-config-from-env');
const CoinMarketCap = require('coinmarketcap-api');

module.exports = function registerEndpoint(router) {

    const configs = getConfigFromEnv.getConfigFromEnv('COINMARKETCAP_');
    const client = new CoinMarketCap(configs.apiKey);

    router.get('/', (req, res) => {
        client.getQuotes({ symbol: 'ADA' })
            .then(response => {
                const coin = response.data.ADA;
                const quote = coin.quote.USD;
                res.send({
                    data: {
                        max_supply: coin.max_supply,
                        circulating_supply: coin.circulating_supply,
                        total_supply: coin.total_supply,
                        cmc_rank: coin.cmc_rank,
                        ...quote,
                    }
                });
            })
            .catch(error => res.send(error));
    });
};