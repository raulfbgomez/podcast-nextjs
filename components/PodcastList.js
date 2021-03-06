import Link from 'next/link'

const PodcastList = (props) => {
  const { audioClips, onClickPodcast } = props

  function secondsToHms(time) {
    time = Number(time);
    var h = Math.floor(time / 3600);
    var m = Math.floor(time % 3600 / 60);
    var s = Math.round(time % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
  }

  return (
    <div className='items'>
      {audioClips.map(audio => (
        <Link 
          key={audio.id} 
          href={`/podcast?id=${audio.id}`}
          onclick={ event => onClickPodcast(event, podcast)}
        >
          <a className='item'>
            <p>{ audio.title }</p>
            <p>{ secondsToHms(audio.duration) }</p>
          </a>
        </Link>
      ))}
      <style jsx>{`
        .items {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .item {
          border: 1px solid lightgray;
          border-radius: 10px;
          color: #00aeff;
          margin: 6px auto;
          padding: 10px;
          text-decoration: none;
          transition: ease 0.4s all;
          width: 90%;
        }
        .item:hover {
          background-color: #00aeff;
          color: white;
        }
        .item:hover p:last-child {
          color: white;
        }
        .item p:first-child {
          font-weight: 600;
          font-size: 1.1rem;
        }
        .item p:last-child {
          transition: ease 0.4s all;
          color: gray;
          font-size: .8rem;
        }
        .item p {
          margin: 4px 0;
        }
      `}</style>
    </div>
  )
}

export default PodcastList