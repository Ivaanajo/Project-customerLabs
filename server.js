import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

let segments = []

app.get('/api/segments', (req, res) => {
  res.json(segments);
})

app.post('/api/segments', async (req, res) => {
  const webhookUrl = 'https://webhook.site/23cabedf-ab56-4053-8818-ce019ec2bcc6';
  const requestData = req.body
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    const responseBody = await response.text()
    console.log('Response from Webhook.site:', responseBody)
    if (responseBody.includes('This URL has no default content configured.')) {
      console.log('Webhook.site response indicates no default content.');
      res.status(200).json({ message: 'Data successfully sent to Webhook.site.'})
    } else {
      console.error('Unexpected response from Webhook.site:', responseBody)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } catch (error) {
    console.error('Error sending data to Webhook.site:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.use(express.static('/home/ivannaivan/Downloads/working-project/customerLabs'))

app.get('*', (req, res) => {
  res.sendFile('/home/ivannaivan/Downloads/working-project/customerLabs/index.html')
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});
