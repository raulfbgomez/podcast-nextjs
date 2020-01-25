import 'isomorphic-fetch'
import Error from './_error'

import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import PodcastList from '../components/PodcastListWithClick'
import PodcastPlayer from '../components/PodcastPlayer'

export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = { openPodcast: null }
  }

  static async getInitialProps({ query, res }) {
    const channelId = query.id
    const URI = `https://api.audioboom.com/channels/${channelId}`
    const URI_AUDIO = `https://api.audioboom.com/channels/${channelId}/audio_clips`
    const URI_SERIES = `https://api.audioboom.com/channels/${channelId}/child_channels`
    try {
      let [reqChannel, reqSeries, reqAudios] = await Promise.all([
        fetch(URI),
        fetch(URI_SERIES),
        fetch(URI_AUDIO)
      ])

      if (reqChannel.status >= 400) {
        res.statusCode = reqChannel.status
        return { channel: [], audio_clips: [], series: [], statusCode: 404}
      }
  
      let dataChannel = await reqChannel.json()
      let dataAudio = await reqAudios.json()
      let dataSeries = await reqSeries.json()
  
      let channel = dataChannel.body.channel
      let audioClips = dataAudio.body.audio_clips
      let series = dataSeries.body.channels
      return { channel, audioClips, series, statusCode: 200 }
    } catch (error) {
      return { channel: [], audio_clips: [], series: [], statusCode: 503}
    }
  }

  openPodcast = (event, podcast) => {
    event.preventDefault()
    this.setState({
      openPodcast: podcast
    })
  }

  closePodcast = event => {
    event.preventDefault()
    this.setState({
      openPodcast: null
    })
  }

  render() {
    const { channel, audioClips, series, statusCode } = this.props
    const { openPodcast } = this.state
    
    if (statusCode !== 200) {
      return <Error statusCode={ statusCode } />
    }

    return (
      <>
        <Layout title={ channel.title }>
          
          { openPodcast && 
            <div className="modal">
              <PodcastPlayer clip={ openPodcast } onClose={ this.closePodcast } />
            </div>
          }

          <h1>{ channel.title }</h1>

          <h2>Ultimos podcasts</h2>
          <PodcastList podcasts={ audioClips } onClickPodcast={ this.openPodcast } />

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
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 99999;
          }
        `}</style>
      </>
    )
  }
}