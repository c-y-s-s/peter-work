import httpRequest from '~/service'

const getProductListApi = async () => {
  const responseData = (await httpRequest.get('/web/product/list')) as any
  return responseData.data.value.data
}

export { getProductListApi }
