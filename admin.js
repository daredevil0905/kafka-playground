const kafka = require('./client')

async function init() {

  /**
   * Admin is in charge of creating topics and partitions on the kafka service according to which the producers
   * will send messages and consumers will consume the data
   */

  const admin = kafka.admin()

  // Connect the admin to the service
  console.log('Connecting Admin...')
  await admin.connect()
  console.log('Successfully connected admin.')

  // Create topic
  console.log('Creating topic: [rider-updates]...')
  await admin.createTopics({
    topics: [
      {
        topic: 'rider-updates',
        numPartitions: 2
      }
    ]
  })
  console.log('Topic [rider-updates] created successfully.')

  // Disconnect admin
  console.log('Disconnecting Admin...')
  await admin.disconnect()
  console.log('Admin disconnected.')

}

init()
