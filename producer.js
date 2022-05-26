const { Kafka } = require('kafkajs')
const Chance = require("chance")

const chance = new Chance()
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ["localhost:9092"]
})

const producer = kafka.producer()

const producerMessage = async () => {
  const value = chance.animal();
  console.log(value);
  try {
    await producer.send({
    topic: 'topic101',
    messages: [
      { value }
    ],
  })
  } catch (error) {
    console.log('error',error);
  }
} 
const run = async () => {
  // Producing
  await producer.connect()
  setInterval(producerMessage, 1000);
  // await producer.send({
  //   topic: 'topic101',
  //   messages: [
  //     { value: 'Hello KafkaJS user! rr' },
  //   ],
  // })
  
}

run().catch(console.error)