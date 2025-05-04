const Favicon = () => {
  return (
    <>
      <link
        rel="icon"
        type="image/png"
        href="/images/favicons/favicon-96x96.png"
        sizes="96x96"
      />
      <link
        rel="icon"
        type="image/svg+xml"
        href="/images/favicons/favicon.svg"
      />
      <link rel="shortcut icon" href="/images/favicons/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/favicons/apple-touch-icon.png"
      />
      <meta name="apple-mobile-web-app-title" content="Bryan J. Hickey" />
      <link rel="manifest" href="/images/favicons/site.webmanifest" />
    </>
  )
}

export default Favicon
