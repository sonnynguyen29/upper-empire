// Import the AWS SDK (using 'import' instead of 'require')
import { SESClient, SendTemplatedEmailCommand } from '@aws-sdk/client-ses'; // AWS SDK v3

// Initialize SES client in the correct region
const sesClient = new SESClient({ region: 'us-east-1' });

export const handler = async (event) => {
    try {
        // Extract email details from the event body (assuming the event contains JSON body)
        const { toEmail, templateData } = JSON.parse(event.body);
        console.log('event.body', event.body);

        console.log('templateData', templateData);

        // Email parameters for SES using a template
        const emailParams = {
            Destination: {
                ToAddresses: [toEmail], // Email recipient
            },
            Template: 'Preorder-Template', // Name of your email template
            //Template: preOrderTemplate,
            TemplateData: JSON.stringify(templateData), // Template data for placeholders
            Source: 'info@upperempire.com', // Replace with your verified SES email
        };

        console.log('emailParams', emailParams);

        // Create SES command for sending templated email
        const command = new SendTemplatedEmailCommand(emailParams);

        // Send email using SES
        const result = await sesClient.send(command);
        console.log('Email sent successfully:', result);

        // Return success response
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Email sent successfully',
                result: result,
            }),
        };

    } catch (error) {
        console.error('Error sending email:', error);

        // Return error response
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Failed to send email',
                error: error.message,
            }),
        };
    }
};