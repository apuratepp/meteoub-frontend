// http://emberjs.com/guides/models/connecting-to-an-http-server/#toc_url-host

export default DS.RESTAdapter.extend({
  host: 'http://meteoub.equip9.org',
  // host: 'http://localhost:3000',
});
