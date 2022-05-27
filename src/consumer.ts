import Chance from 'chance';
import { Consumer, Kafka, Producer } from "kafkajs";

class KafkaProducer {
  private _kafka: Kafka; 
  private _chance: Chance;
  private _producer: Producer;
  private _consumer: Consumer;

  constructor() {
    this._chance = new Chance();
    this._kafka = new Kafka({ clientId: "my-app", brokers: ["localhost:9092"],});
  }

  public async producerMessage(): Promise<void> {
  //  const admin = this._kafka.admin()   
  //  await admin.connect()                
  //   await admin.createTopics({
  //     waitForLeaders: true,
  //     topics: [
  //       { topic: 'test-topic2',numPartitions: 1, replicationFactor:1 },
  //     ],
  //   })
    const value = this._chance.animal();
    console.log(value);
    try {
      await this._producer.send({
        topic: 'topic101',
        messages: [
          { value }
        ],
      })
    } catch (error) {
      console.log('error',error);
    }
  }

  public async run(): Promise<void> {
    this._consumer = this._kafka.consumer({groupId: 'topic101'});
    await this._consumer.connect();
    await this._consumer.subscribe({ topic: 'topic101', fromBeginning: true })
    await this._consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        })
      },
    })
  }
}

new KafkaProducer().run();




