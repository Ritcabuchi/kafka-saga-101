import Chance from 'chance';
import { Consumer, Kafka, Partitioners, Producer } from "kafkajs";

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
    this._producer = this._kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
    await this._producer.connect();
    setInterval(async  () => await this.producerMessage(), 1000);
    
  }
}

new KafkaProducer().run();






