const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ["localhost:9092"]
})

// const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'topic101' })

const run = async () => {
  // Producing
  await consumer.connect()
  await consumer.subscribe({ topic: 'topic101', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  })
  
}

run().catch(console.error)