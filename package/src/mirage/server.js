import { createServer, Model, Response } from 'miragejs';

// Define your Mirage.js server

let server = null;
export function makeServer({ environment = 'development' } = {}) {

    if (!server) {
        const server = createServer({
            environment,

            // Define your models
            models: {
                portfoliocard: Model,
                assetsHolding: Model,
                baseFxRate: Model,
                displayFxRate: Model,
            },

            seeds(server) {
                const portfolio = server.create('portfoliocard', { balance: 16999, currency: 'USD' });

                // Seed assets holding 
                server.create('assetsHolding', { id: '1', currency: 'USD', amount: 1000, rate: null, marketValue: 0 });
                server.create('assetsHolding', { id: '2', currency: 'EUR', amount: 1000, rate: null, marketValue: 0 });
                server.create('assetsHolding', { id: '3', currency: 'GBP', amount: 1000, rate: null, marketValue: 0 });
                server.create('assetsHolding', { id: '4', currency: 'JPY', amount: 1000, rate: null, marketValue: 0 });
                server.create('assetsHolding', { id: '5', currency: 'HKD', amount: 1000, rate: null, marketValue: 0 });
                server.create('assetsHolding', { id: '6', currency: 'CAD', amount: 1000, rate: null, marketValue: 0 });
                server.create('assetsHolding', { id: '7', currency: 'AUD', amount: 1000, rate: null, marketValue: 0 });
                server.create('assetsHolding', { id: '8', currency: 'NZD', amount: 1000, rate: null, marketValue: 0 });

                // Seed fx rate (Base currency is USD)
                server.create('baseFxRate', { id: '1', currency: 'USD', rate: 1 });
                server.create('baseFxRate', { id: '2', currency: 'EUR', rate: 0.90 });
                server.create('baseFxRate', { id: '3', currency: 'GBP', rate: 0.76 });
                server.create('baseFxRate', { id: '4', currency: 'JPY', rate: 142.23 });
                server.create('baseFxRate', { id: '5', currency: 'HKD', rate: 7.79 });
                server.create('baseFxRate', { id: '6', currency: 'CAD', rate: 1.35 });
                server.create('baseFxRate', { id: '7', currency: 'AUD', rate: 1.49 });
                server.create('baseFxRate', { id: '8', currency: 'NZD', rate: 1.62 });

                // Seed fx rate (Display currency default is USD)
                server.create('displayFxRate', { id: '1', currency: 'USD', rate: 1 });
                server.create('displayFxRate', { id: '2', currency: 'EUR', rate: 0.90 });
                server.create('displayFxRate', { id: '3', currency: 'GBP', rate: 0.76 });
                server.create('displayFxRate', { id: '4', currency: 'JPY', rate: 142.23 });
                server.create('displayFxRate', { id: '5', currency: 'HKD', rate: 7.79 });
                server.create('displayFxRate', { id: '6', currency: 'CAD', rate: 1.35 });
                server.create('displayFxRate', { id: '7', currency: 'AUD', rate: 1.49 });
                server.create('displayFxRate', { id: '8', currency: 'NZD', rate: 1.62 });




                //update the rate of each asset in the assetsHolding model by mapping through the displayFX model


                console.log('Seeded portfolio:', portfolio);
                console.log('Seeded assetsHolding:', server.db.assetsHoldings);
            },

            // Define your routes
            routes() {
                this.namespace = 'api';

                // ==========================================================================================================

                // GET user portfolio
                this.get('/portfolios', (schema) => {
                    const portfolio = schema.portfoliocards.first();
                    return portfolio.attrs;
                });

                // user portfolio deposite
                this.post('/deposite', (schema, request) => {
                    const { value } = JSON.parse(request.requestBody);
                    const portfolio = schema.portfoliocards.first();
                    if (!portfolio) {
                        return new Response(404, {}, { error: 'Portfolio not found' });
                    }
                    portfolio.update({ balance: portfolio.balance + Number(value) });
                    const updatedPortfolio = portfolio.attrs;
                    return new Response(200, {}, { message: 'Portfolio updated successfully', data: updatedPortfolio });
                });

                // user portfolio withdraw
                this.post('/withdraw', (schema, request) => {
                    const { value } = JSON.parse(request.requestBody);
                    const portfolio = schema.portfoliocards.first();
                    if (!portfolio) {
                        return new Response(404, {}, { error: 'Portfolio not found' });
                    }
                    if (portfolio.balance < value) {
                        return new Response(400, {}, { error: 'Insufficient balance' });
                    }
                    portfolio.update({ balance: portfolio.balance - Number(value) });
                    const updatedPortfolio = portfolio.attrs;
                    return new Response(200, {}, { message: 'Portfolio updated successfully', data: updatedPortfolio });
                });

                // ==========================================================================================================

                // GET user assets holding, return all assets in an array
                this.get('/assets', (schema) => {
                    const assets = schema.assetsHoldings.all();
                    console.log('assets', assets.models.map((asset) => asset.attrs));
                    return assets.models.map((asset) => asset.attrs);
                });


                // ==========================================================================================================

                // GET fx rate
                this.get('/get/displayFxRates', (schema) => {
                    const displayFxRates = schema.displayFxRates.all();
                    return displayFxRates.models.map((displayFxRates) => displayFxRates.attrs);
                });

                // POST fx rate when Base change by Header
                // This route is to take the pass in currency, 
                // use that currency as a base currency to calculate the fx rate for the rest of the currencies in displayFxRates
                this.post('/change/base-currency', (schema, request) => {
                    const { currency } = JSON.parse(request.requestBody);
                    const baseFxRate = schema.baseFxRates.findBy({ currency });

                    if (!baseFxRate) {
                        return new Response(400, {}, { error: 'Base currency not found' });
                    }

                    // Update the rate of each display currency in the displayFxRates Table
                    const baseRate = baseFxRate.rate;
                    const originalFxRates = schema.baseFxRates.all();
                    originalFxRates.models.forEach((originalFxRate) => {
                        const newRate = originalFxRate.rate / baseRate;
                        const displayFxRate = schema.displayFxRates.findBy({ currency: originalFxRate.currency });
                        displayFxRate.update({ rate: newRate });
                        console.log('newRate', newRate);
                    });



                    // Update the rate of each asset in the assetsHolding model by mapping through the displayFX model
                    schema.assetsHoldings.all().models.forEach((asset) => {
                        const displayFxRate = schema.displayFxRates.findBy({ currency: asset.currency });
                        if (displayFxRate) {

                            const rate = displayFxRate.rate;
                            const marketValue = asset.amount * rate;
                            console.log('marketValue', marketValue);
                            console.log('rate', rate);
                            asset.update({ rate: rate, marketValue: marketValue });

                        }
                    });
                    console.log('assets', schema.assetsHoldings.all().models.map((asset) => asset.attrs));
                    return schema.displayFxRates.all().models.map((displayFxRate) => displayFxRate.attrs);
                });

            },
        });
    }
    return server;
}