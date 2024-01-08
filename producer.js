const kafka = require('./client')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

async function init() {

  /**
   * Producer sends messages to Kafka under the specified topic
   */

  // Define the producer
  console.log('Creating producer...')
  const producer = kafka.producer()
  console.log('Producer creater.')

  // Connect the producer
  console.log('Connecting producer...')
  await producer.connect()
  console.log('Producer connected.')

  // Send messages
  rl.setPrompt('> ')
  rl.prompt()

  rl.on('line', async (line) => {
    const [riderName, location] = line.split(':')
    await producer.send({
      topic: 'rider-updates',
      messages: [
        {
          key: 'location-updates',
          value: JSON.stringify({ name: riderName, location }),
          partition: location.toLowerCase() === 'north' ? 0 : 1
        }
      ]
    })
  }).on('close', async () => {
    // Disconnect the producer
    await producer.disconnect()
    console.log('Disconnected producer.')
  })
}

init()
