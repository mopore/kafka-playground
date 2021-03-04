import { HighLevelProducer, KafkaClient } from "kafka-node";

console.log('Connecting to Kafka server...');


const client = new KafkaClient(
    {
        kafkaHost: 'localhost:9092',
        connectTimeout: 1000
    }
);
const producer = new HighLevelProducer(client);
const payloads = [
    { topic: 'Topic1', messages: 'hi' },
    { topic: 'Topic2', messages: ['hello', 'world']}
];
producer.on('ready', () => {
    producer.send(payloads, (error, data) => {
        if (error){
            const errorMessage = `Error sending payload to kafka server: ${error}`;
            console.error(errorMessage);
            console.trace();
        }
        else {
            console.log(`Successfully send data to Kafka: ${data}`);
        }
    });
});