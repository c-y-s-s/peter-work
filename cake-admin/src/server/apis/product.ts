import httpRequest from '~/service'

const postCreateProductApi = (data: any) => {
  return httpRequest.post('/adminapi/product/upload', data)
}

export { postCreateProductApi }
