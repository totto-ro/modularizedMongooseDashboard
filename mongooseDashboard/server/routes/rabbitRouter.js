const express = require( 'express' );
const RabbitRouter = express.Router();
const { RabbitsController } = require( './../controllers/rabbitsController' );

RabbitRouter
    .get( '/', RabbitsController.loadMainPage )

RabbitRouter
    .get("/show/:id", RabbitsController.showRabbit);

RabbitRouter
    .route( '/edit/:id' )
    .get( RabbitsController.editRabbitPage )
    .post( RabbitsController.updateRabbit );

RabbitRouter
    .post("/destroy/:id", RabbitsController.deleteRabbit);

RabbitRouter
    .route( '/new' )
    .get( RabbitsController.newRabbitPage )
    .post( RabbitsController.createRabbit );

module.exports = { RabbitRouter };