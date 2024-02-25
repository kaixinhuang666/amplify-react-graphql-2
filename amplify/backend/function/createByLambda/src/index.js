

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
// const uuid = require('uuid'); 

exports.handler = async (event) => {
    // const note = JSON.parse(event.body);
    // note.id = uuid.v4(); 
    
    
    const note= {
        __typename: "Note",
        id: event.arguments.input.id,
        name: event.arguments.input.name,
        description: event.arguments.input.description,
        image: event.arguments.input.image,
        owner: event.arguments.input.owner,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    
    const params = {
        TableName: "Note-sjdbsnbeqzg3xidmoz2mbpnpwa-staging",
        Item: note,
    };
    
    try {
        await dynamoDB.put(params).promise();
        return note;
        // return {
            
        //     body: JSON.stringify(note),
        //     headers: {
        //         "Access-Control-Allow-Origin": "*",
        //         "Access-Control-Allow-Headers": "*"
        //     },
        // };
    } catch (error) {
        return {
            
            body: JSON.stringify(error),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
        };
    }
};
