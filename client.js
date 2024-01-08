const { Kafka } = require('kafkajs')

const client = new Kafka({
  clientId: 'kafka-playground',
  brokers: ['<PRIVATE_IP>:9092']
})

module.exports = client
