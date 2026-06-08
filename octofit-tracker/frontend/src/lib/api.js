const getCodespaceName = () => {
  const value = import.meta.env.VITE_CODESPACE_NAME
  return typeof value === 'string' ? value.trim() : ''
}

export const getApiBaseUrl = () => {
  const codespaceName = getCodespaceName()

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`
  }

  return 'http://localhost:8000/api'
}

export const getApiCollectionUrl = (collectionName) => {
  return `${getApiBaseUrl()}/${collectionName}/`
}

export const normalizeCollectionResponse = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    const containerKeys = ['items', 'results', 'data', 'docs']

    for (const key of containerKeys) {
      if (Array.isArray(payload[key])) {
        return payload[key]
      }
    }

    if (payload.data && typeof payload.data === 'object') {
      for (const key of containerKeys) {
        if (Array.isArray(payload.data[key])) {
          return payload.data[key]
        }
      }
    }
  }

  return []
}

export const fetchCollection = async (collectionName) => {
  const url = getApiCollectionUrl(collectionName)
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()

  return {
    items: normalizeCollectionResponse(payload),
    payload,
    url,
  }
}
