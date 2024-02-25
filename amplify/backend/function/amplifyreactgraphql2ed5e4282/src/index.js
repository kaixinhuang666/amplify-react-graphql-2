

// /**
//  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
//  */
// // exports.handler = async (event) => {
// //     console.log(`EVENT: ${JSON.stringify(event)}`);
// //     return {
// //         statusCode: 200,
// //     //  Uncomment below to enable CORS requests
// //     //  headers: {
// //     //      "Access-Control-Allow-Origin": "*",
// //     //      "Access-Control-Allow-Headers": "*"
// //     //  },
// //         body: JSON.stringify('Hello from Lambda!'),
// //     };
// // };


// // const AWS = require('aws-sdk');
// // const dynamoDB = new AWS.DynamoDB.DocumentClient();

// import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
// const dynamoDB = new DynamoDBClient();

// exports.handler = async (event) => {
//     const params = {
//         TableName: "Note-sjdbsnbeqzg3xidmoz2mbpnpwa",
//     };
    
//     try {
//         // const data = await dynamoDB.scan(params).promise();
//         const command = new ScanCommand(params);
//         const data = await dynamoDB.send(command);
//         return {
            
//             body: JSON.stringify(data.Items),
//             headers: {
//                 "Access-Control-Allow-Origin": "*", 
//                 "Access-Control-Allow-Headers": "*"
//             },
//         };
//     } catch (error) {
//         return {
            
//             body: JSON.stringify(error),
//             headers: {
//                 "Access-Control-Allow-Origin": "*",
//                 "Access-Control-Allow-Headers": "*"
//             },
//         };
//     }
// };


// const AWS = require('aws-sdk');
// const dynamoDB = new AWS.DynamoDB.DocumentClient();
// const TABLE_NAME = process.env.TABLE_NAME;

// exports.handler = async (event, context) => {
//     // try {
//     //     const { emailAddress, interviewID, interviewQuestionID, interviewQuestionType } = event;

//     //     const PK = `USER#${emailAddress}`;
//     //     const SK = `INT#${interviewID}#QST#${interviewQuestionType}#${interviewQuestionID}`;

//     //     const getParams = {
//     //         TableName: TABLE_NAME, 
//     //         Key: {
//     //             'PK': PK,
//     //             'SK': SK,
//     //         },
//     //     };

//     //     const response = await dynamoDB.get(getParams).promise();

//     //     if (!response.Item) {
//     //         throw new Error('Interview not found');
//     //     }

//     //     return response.Item;
//     // } catch (error) {
//     //     console.error('Error:', error);
//     //     throw error;
//     // }
//     return {
//         statusCode: 200
  
//     };
// };


// const AWS = require('aws-sdk');
// const dynamoDB = new AWS.DynamoDB.DocumentClient();

// // import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
// // const dynamoDB = new DynamoDBClient();

// exports.handler = async (event) => {
//     const params = {
//         TableName: "Note-sjdbsnbeqzg3xidmoz2mbpnpwa-staging",
//     };
    
//     try {
//         const data = await dynamoDB.scan(params).promise();
//         // const command = new ScanCommand(params);
//         // const data = await dynamoDB.send(command);
//         if (data.Items == []) {
//             // throw new Error('Interview not found');
//             return [];
//         }
//         return {
            
//             body: JSON.stringify(data.Items),
//             headers: {
//                 "Access-Control-Allow-Origin": "*", 
//                 "Access-Control-Allow-Headers": "*"
//             },
//         };
//         // if (data.Item == []) {
//         //     // throw new Error('Interview not found');
//         //     return [];
//         // }
//         // return data.Items;
//     } catch (error) {
//         return {
            
//             body: JSON.stringify(error),
//             headers: {
//                 "Access-Control-Allow-Origin": "*",
//                 "Access-Control-Allow-Headers": "*"
//             },
//         };
//     }
// };
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log("Received event:", JSON.stringify(event, null, 2));
    // const userId = event.identity && event.identity.sub;
    const userId = event.arguments.input.userId;
    console.log("UserId:", userId);

    const params = {
        TableName: "Note-sjdbsnbeqzg3xidmoz2mbpnpwa-staging",
        FilterExpression: "#owner = :userId",
        ExpressionAttributeNames: {
            "#owner": "owner" 
        },
    ExpressionAttributeValues: { ":userId": userId },
    };


    try {
        const data = await dynamoDB.scan(params).promise();
        
        return data.Items.length > 0 ? data.Items : [];
    } catch (error) {
        
        console.error("Error scanning DynamoDB:", error);
        return []; 
    }
};
