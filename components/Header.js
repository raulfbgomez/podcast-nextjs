import Link from 'next/link'

const Header = () => (
  <>
    <header>
      <Link href='/'>
        <a>Podcasts</a>
      </Link>
    </header>
    <style jsx>{`
      header {
        background-color: #00aeff;
        border-botom: 1px solid white;
        box-shadow: 1px 1px 10px #000;
        padding: 15px;
        text-align: center;
        z-index: 9999;
      }
      header a {
        color: #fff;
        font-weight: 600;
        font-size: 2rem;
        text-decoration: none;
      }
    `}</style>
  </>
)

export default Header