import app from './app'
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

declare module 'express-serve-static-core' {
    interface Request {
        user: { _id: string }
    }
}



function main() {
    var swaggerDefinitions = {
        info: {
            title: 'Prova Marvel Api',
            version: '1.0.00',
            descriptions: 'Prova de desafio profissional'
        },
        components: {
            schemas: require('./schemas.json')
        }
    }

    var options = {
        swaggerDefinition: swaggerDefinitions,
        apis: ['./src/routes/*.ts']
    }

    var swaggerSpec = swaggerJsDoc(options);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


    app.listen(3000, 'localhost', () => {
        console.log('Server running at port 3000')
    })
}

main()