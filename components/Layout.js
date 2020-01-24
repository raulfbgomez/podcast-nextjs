import Header from './Header'
import Head from 'next/head'

export default class Layout extends React.Component {
  render() {
    const { children, title } = this.props

    return (
      <div>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <title>{ title }</title>
        </head>
        <Header />
        { children }
        <style jsx global>
          {`
          body {
            background-color: white;
            font-family: system-ui;
            margin: 0;
          }
          `}
        </style>
      </div>
    )
  }
}