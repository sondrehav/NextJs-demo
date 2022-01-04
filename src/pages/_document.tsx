import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        </Head>
        <body className={"bg-gray-900 relative overflow-auto text-gray-200"}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument