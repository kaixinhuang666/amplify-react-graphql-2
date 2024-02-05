

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid'); 

exports.handler = async (event) => {
    const note = JSON.parse(event.body);
    note.id = uuid.v4(); 
    
    const params = {
        TableName: "Note-sjdbsnbeqzg3xidmoz2mbpnpwa",
        Item: note,
    };
    
    try {
        await dynamoDB.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(note),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
        };
    }
};
