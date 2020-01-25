import { Link } from '../routes'
import slug from '../helpers/slug'

export default class ChannelGrid extends React.Component {
  render() {

    const { channels } = this.props

    return (
      <>
        <div className="channels">
          { channels.map(channel => (
            <Link key={channel.id} route='channel' params={{ 
              slug: slug(channel.title),
              id: channel.id
            }}>
              <a className="channel">
                <img src={ channel.urls.logo_image.original } alt={channel.title} />
                <h2>{ channel.title }</h2>
              </a>
            </Link>
          )) }
        </div>
        <style jsx>{`
        .channels {
          display: grid;
          grid-gap: 20px;
          padding: 35px 25px;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        }
        .channel {
          border-radius: 3px;
          color: #00aeff;
          display: block;
          margin-bottom: 0.5em;
          text-decoration: none;
        }
        .channel:hover {
          box-shadow: 1px 2px 12px 5px rgba(0, 0, 0, 0.15);
          transform: scale(1.1);
        }
        .channel img {
          width: 100%;
        }
        h2 {
          padding: 5px;
          font-size: 0.9em;
          font-weight: 600;
          margin: 0;
          text-align: center;
        }
      `}</style>
    </>
    )
  }
} 