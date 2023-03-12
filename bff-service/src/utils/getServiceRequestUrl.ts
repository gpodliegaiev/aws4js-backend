const serviceUrlMap = {
  cart: '/profile/cart',
};

export const getServiceRequestUrl = (
  serviceName: string,
  serviceBaseUrl: string,
  serviceInitialUrl: string,
): string => {
  const serviceUrlFromMap = serviceUrlMap[serviceName];
  const serviceUrl = serviceUrlFromMap ? serviceUrlFromMap : serviceInitialUrl;

  return serviceBaseUrl + serviceUrl;
};
