import 'isomorphic-fetch'
import Link from 'next/link'

import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'

export default class extends React.Component {

  static async getInitialProps() {
    const URI = 'https://api.audioboom.com/channels/recommended'
    let req = await fetch(URI)
    let { body: channels } = await req.json()
    return { channels }
  }

  render() {

    const { channels } = this.props

    return (
      <Layout title='Podcast'>
        <ChannelGrid channels={ channels } />
      </Layout>
    )
  }
}