import httpRequest from '~/service'

const validateTokenApi = () => {
  return httpRequest.get('/api/validate-token')
}

export { validateTokenApi }
