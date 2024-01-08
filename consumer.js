const kafka = require('./client')
const group = process.argv[2]

async function init() {
  
  /**
   * Consumer will subscribe to a particular kafka topic and then get those messages whenever a producer sends messages
   * to that topic
   */

  // Define a consumer
  console.log('Creating consumer...')
  const consumer = kafka.consumer({
    groupId: group
  })
  console.log('Consumer created.')

  // Connecting the consumer
  console.log('Connecting consumer...')
  await consumer.connect()
  console.log('Consumer connected.')

  // Subscribe to the topic
  await consumer.subscribe({
    topics: ['rider-updates']
  })

  // Consume message
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Group: ${group}: TOPIC:${topic} ; PARTITION:${partition} ; MESSAGE: ${message.value.toString()}`)
    }
  })
}

init()
