

function ErrorPage () {
 
    return (
      <>
         <div className="error-page">
            <h1 className="error-code">404</h1>
            <h2 className="error-message">Page Not Found</h2>
            <p className="error-description">
                The page you are looking for does not exist. It might have been moved or deleted.
            </p>
            <a href="/" className="home-link">Go to Home</a>
        </div>
      </>
    ) 
}

export default ErrorPage
