import { createServer, Model, Response } from 'miragejs';

// Define your Mirage.js server
export function makeServer({ environment = 'development' } = {}) {
    const server = createServer({
        environment,

        // Define your models
        models: {
            portfoliocard: Model,
        },

        seeds(server) {
            const portfolio = server.create('portfoliocard', { balance: 16999, currency: 'USD' });
            console.log('Seeded portfolio:', portfolio);
        },

        // Define your routes
        routes() {
            this.namespace = 'api';

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
                portfolio.update({ balance: portfolio.balance + value });
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
                portfolio.update({ balance: portfolio.balance - value });
                const updatedPortfolio = portfolio.attrs;
                return new Response(200, {}, { message: 'Portfolio updated successfully', data: updatedPortfolio });
            });
        },
    });

    return server;
}