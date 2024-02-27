export const hasProtocol = (url: string) => {
  // Regular expression to match URL protocol
  const protocolRegex = /^(https?|ftp):\/\//;

  // Test if the URL starts with a protocol
  return protocolRegex.test(url);
};
