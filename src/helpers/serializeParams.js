const serializeParams = params => Object.entries(params).map(([name, value]) => `${name}=${value}`).join('&');

export default serializeParams;