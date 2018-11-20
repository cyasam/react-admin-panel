module.exports = (router) => {
  router.get("/", (req, res) => {
    res.send({ success: true, result: 'Api is running...' });
    res.end();
  })

  return router;
}