import { createServer, Model, Response } from 'miragejs';

// Define your Mirage.js server
export function makeServer({ environment = 'development' } = {}) {
    const server = createServer({
        environment,

        // Define your models
        models: {
            portfoliocard: Model,
            assetsHolding: Model,
            fxRate: Model,
        },

        seeds(server) {
            const portfolio = server.create('portfoliocard', { balance: 16999, currency: 'USD' });

            server.create('assetsHolding', { id: '1', currency: 'USD', amount: 1000 });
            server.create('assetsHolding', { id: '2', currency: 'EUR', amount: 1000 });
            server.create('assetsHolding', { id: '3', currency: 'GBP', amount: 1000 });
            server.create('assetsHolding', { id: '4', currency: 'JPY', amount: 1000 });
            server.create('assetsHolding', { id: '5', currency: 'HKD', amount: 1000 });
            server.create('assetsHolding', { id: '6', currency: 'CAD', amount: 1000 });
            server.create('assetsHolding', { id: '7', currency: 'AUD', amount: 1000 });
            server.create('assetsHolding', { id: '8', currency: 'NZD', amount: 1000 });

            // Seed fx rate (Base currency is USD)
            server.create('fxRate', { id: '1', currency: 'USD', rate: 1 });
            server.create('fxRate', { id: '2', currency: 'EUR', rate: 0.90 });
            server.create('fxRate', { id: '3', currency: 'GBP', rate: 0.76 });
            server.create('fxRate', { id: '4', currency: 'JPY', rate: 142.23 });
            server.create('fxRate', { id: '5', currency: 'HKD', rate: 7.79 });
            server.create('fxRate', { id: '6', currency: 'CAD', rate: 1.35 });
            server.create('fxRate', { id: '7', currency: 'AUD', rate: 1.49 });
            server.create('fxRate', { id: '8', currency: 'NZD', rate: 1.62 });

            //  

            //ADD a new field to the assetsHolding model for the rate
            server.db.assetsHoldings.map((asset) => {
                const fxRate = server.db.fxRates.findBy({ currency: asset.currency });
                asset.rate = fxRate.rate;
                return asset;
            });



            console.log('Seeded portfolio:', portfolio);
            console.log('Seeded assetsHolding:', server.db.assetsHoldings);
        },

        // Define your routes
        routes() {
            this.namespace = 'apii';

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
            this.get('/get/fxRates', (schema) => {
                const fxRates = schema.fxRates.all();
                return fxRates.models.map((fxRate) => fxRate.attrs);
            });

            this.post('/change/base-currency', (schema, request) => {
                const { newBaseCurrency } = JSON.parse(request.requestBody);
                const newBaseRate = schema.fxRates.findBy({ currency: newBaseCurrency }).rate;

                schema.db.fxRates.update({ rate: 1 }, { rate: newBaseRate });

                schema.db.fxRates.map((fxRate) => {
                    if (fxRate.currency !== newBaseCurrency) {
                        fxRate.rate = fxRate.rate / newBaseRate;
                    }
                    return fxRate;
                });

                return schema.fxRates.all();
            });

        },
    });

    return server;
}