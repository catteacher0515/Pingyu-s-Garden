const redirectKey = 'gh-pages-redirect'

export function restoreGitHubPagesRedirect() {
  const redirect = sessionStorage.getItem(redirectKey)

  if (!redirect) {
    return
  }

  sessionStorage.removeItem(redirectKey)
  window.history.replaceState(null, '', redirect)
}

