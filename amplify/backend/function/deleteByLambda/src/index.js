

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const id  = event.arguments.input.id;
    
    const params = {
        TableName: "Note-sjdbsnbeqzg3xidmoz2mbpnpwa-staging",
        Key: {
            id,
        },
    };
    
    try {
        await dynamoDB.delete(params).promise();
        return {
            message: "Note deleted successfully"
        }
        // return {
            
        //     body: JSON.stringify({ message: "Note deleted successfully" }),
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

