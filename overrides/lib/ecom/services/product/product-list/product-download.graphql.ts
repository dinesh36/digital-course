const getProductDownloadLinkQuery = `
  query GetProductDownloadLink($sku: String!) {
    downloadProduct(sku: $sku) {
      downloadUrl
    }
  }
`;

export default getProductDownloadLinkQuery;
