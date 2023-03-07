import twilio from 'twilio'

const accountSid = "AC579a19a53d59b2e42b0760fe5f1719e2"
const authToken = "af0657e245622dd242f1d0daa72da7e2"
 
const client = twilio(accountSid, authToken)

try {
    const message = client.messages.create({
        body: "Hola soy un mensaje",
        from: "+542224503108",
        to: "+542224536377"
    }) 
} catch (error) {
    console.log("Error");
}
