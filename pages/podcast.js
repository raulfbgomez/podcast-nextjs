import Link from 'next/link'
import Header from '../components/Header'

export default class extends React.Component {
  static async getInitialProps({ query }) {
    const podcastId = query.id
    const URI = `https://api.audioboom.com/audio_clips/${podcastId}.mp3`
    const req = await fetch(URI).then(data => data.json())
    const podcast = req.body
    return { podcast }
  }

  render() {
    const { podcast } = this.props
    console.log(podcast.audio_clip)
    return (
      <>
        <Header />
        <div className='wrapper'>
          <Link href={`/channel/?id=${podcast.audio_clip.channel.id}`}>
            <a className='button'> Back to channel </a>
          </Link>
          <img src={podcast.audio_clip.urls.image} alt='image'/>
          <div className="footer">
            <h1>{ podcast.audio_clip.title }</h1>
            <p>{ podcast.audio_clip.description }</p>
            <audio controls>
              <source src={podcast.audio_clip.urls.high_mp3} />
              Your Browser does not support the audio tag
            </audio>
          </div>
        </div>
        <style jsx>{`
          .button {
            background-color: white;
            border-radius: 10px;
            color: #0099ff;
            font-weight: 600;
            padding: 10px;
            text-decoration: none;
            position: absolute;
            left: 10px;
            top: 65px;
          }
          .wrapper {
            background-color: #00aeff;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: calc(100vh - 80px);
          }
          .wrapper img {
            display: block;
            margin: 50px auto 0;
            max-width: 300px;
          }
          .footer {
            background: #0099ff;
            color: white;
            text-align: center;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
          }
          .footer p {
            padding: 10px;
          }
          audio {
            border-radius: 10px;
            display: block;
            margin: 15px auto;
            width: 90%;
          }
        `}</style>
        <style jsx global>
          {`
          body {
            background-color: white;
            font-family: system-ui;
            margin: 0;
          }
          `}
        </style>
      </>
    )
  }
}