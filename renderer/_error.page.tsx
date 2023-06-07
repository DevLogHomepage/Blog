export { Page }
/**
 * This is for 404 page display
 */
function Page({ is404 }: { is404: boolean }) {
  if (is404) {
    /**
     * if page's error is 404 then display this
     */
    return (
      <>
        <h1>404 Page Not Found</h1>
        <p>This page could not be found.</p>
      </>
    )
  } else {
    /**
     * els then display this
     */
    return (
      <>
        <h1>500 Internal Error</h1>
        <p>Something went wrong.</p>
      </>
    )
  }
}
