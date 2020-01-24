import 'isomorphic-fetch'

import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import PodcastList from '../components/PodcastList'

export default class extends React.Component {

  static async getInitialProps({ query }) {
    const channelId = query.id
    const URI = `https://api.audioboom.com/channels/${channelId}`
    const URI_AUDIO = `https://api.audioboom.com/channels/${channelId}/audio_clips`
    const URI_SERIES = `https://api.audioboom.com/channels/${channelId}/child_channels`

    let [reqChannel, reqSeries, reqAudios] = await Promise.all([
      fetch(URI),
      fetch(URI_SERIES),
      fetch(URI_AUDIO)
    ])

    let dataChannel = await reqChannel.json()
    let dataAudio = await reqAudios.json()
    let dataSeries = await reqSeries.json()

    let channel = dataChannel.body.channel
    let audioClips = dataAudio.body.audio_clips
    let series = dataSeries.body.channels

    return { channel, audioClips, series }
  }

  render() {
    const { channel, audioClips, series } = this.props
    console.log(series)
    return (
      <>
        <Layout title={ channel.title }>
          <h1>{ channel.title }</h1>

          <h2>Ultimos podcasts</h2>
          <PodcastList audioClips={ audioClips } />

          <h2>Series</h2>
          {series.length > 0 ?
            <ChannelGrid channels={ series } />
          : <p className='error'>No hay series para este canal</p> }
        </Layout>
        <style jsx>{`
          h1 {
            text-align: center;
            color: #9b309b;
          }
          h2 {
            text-indent: 50px;
            color: #552b55;
          }
          .error {
            color: firebrick;
            font-size: 1.2rem;
            padding: 10px 0;
            text-align: center;
          }
        `}</style>
      </>
    )
  }
}