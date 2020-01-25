import 'isomorphic-fetch'
import Error from 'next/error'

import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'

export default class extends React.Component {

  static async getInitialProps({ res }) {

    try {
      const URI = 'https://api.audioboom.com/channels/recommended'
      let req = await fetch(URI)
      let { body: channels } = await req.json()
      return { channels, statusCode: req.status }
    } catch (error) {
      res.statusCode = 503
      return { channels: [], statusCode: 503 }
    }
  }

  render() {

    const { channels, statusCode } = this.props

    if (statusCode !== 200) {
      return <Error statusCode={ statusCode } />
    }

    return (
      <Layout title='Podcast'>
        <ChannelGrid channels={ channels } />
      </Layout>
    )
  }
}