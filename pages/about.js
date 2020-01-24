const About = () => (
  <>
    <h1>Next.js</h1>
    <img src='react.png' alt='react' />

  <style jsx global>{`
    body {
      background-color: deeppink;
    }
  `}</style>

  <style jsx>{`
    h1 {
      color: white;
      font-size: 4rem;
      text-align: center;
    }
    img {
      display: block;
      margin: 100px auto;
    }
  `}</style>
  </>
)

export default About;