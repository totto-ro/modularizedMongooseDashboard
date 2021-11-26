const {RabbitModel} = require( './../models/rabbitModel' );

const RabbitsController = {
    loadMainPage : function( request, response ){
        RabbitModel
            .getRabbits()
            .then( data =>{
                //console.log(data);
                response.render( 'index', {rabbits:data});
            } )
    },

    showRabbit : function( request, response ){
        let id = ( request.params.id );
    
        RabbitModel
            .getRabbitById( id )
            .then( result =>{
                if( result === null ){
                    throw new Error( "That rabbit doesn't exist" );
                }
                console.log("---------------------------------------");
                console.log(result);
                response.render( 'show', { found: true, rabbit: result });
            })
            .catch( error => {
                response.render( 'show', {found: false} );
            });
    },

    editRabbitPage : function( request, response ){
        let id = request.params.id;
    
        RabbitModel
            .getRabbitById( id )
            .then( result =>{
                if( result === null ){
                    throw new Error( "That rabbit doesn't exist" );
                }
                response.render( 'edit', { found: true, rabbit: result });
            })
            .catch( error => {
                response.render( 'edit', {found: false} );
            });
    },

    updateRabbit : function( request, response ){
        let id = request.params.id;
        const name = request.body.name;
        const color = request.body.color;
        const weight = request.body.weight;
        const height = request.body.height;
        const health = request.body.health;
    
        const currentRabbit = {
            name,
            color,
            weight,
            height,
            health
        };
    
        RabbitModel
            .updateInfo( id, currentRabbit )
            .then( result =>{
                console.log( result );
            })
            .catch( err =>{
                console.log( "Something went wrong!", err);
            });
            response.redirect('/');
    },

    deleteRabbit : function( request, response ){
        let id = request.params.id;
    
        RabbitModel
            .destroy( id )
            .then( result => {
                console.log( result);
                response.redirect( '/' );
            })
            .catch( err => {
                console.log( "Something went wrong!", err );
            })
    },

    newRabbitPage : function( request, response ){
        response.render( 'new' );
    },

    createRabbit : function( request, response ){
        //console.log(request.body);
    
        const name = request.body.name;
        const color = request.body.color;
        const weight = request.body.weight;
        const height = request.body.height;
        const health = request.body.health;
    
        const newRabbit = {
            name,
            color,
            weight,
            height,
            health
        };
        console.log( newRabbit );
        RabbitModel
            .createRabbit( newRabbit )
            .then( result => {
                //console.log(result);
                response.redirect('/');
            })
            .catch( err => {
                //console.log( "Something went wrong!", err );
                request.flash( 'messageError', 'You have to fill all the spaces!' );
                response.redirect( '/new' );
            })
    }

}

module.exports = {RabbitsController};