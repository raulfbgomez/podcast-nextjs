import Layout from '../components/Layout'

function Error({ statusCode }) {
  return (
    <Layout title="Ops! Algo ha salido mal">
      <div className="content">
        <p>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
        </p>
      </div>
      <style jsx>{`
        .content {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 90vh;
          width: 100%;
        }
        p {
          color: deeppink;
          font-size: 4rem;
          text-align: center;
        }
      `}</style>
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
