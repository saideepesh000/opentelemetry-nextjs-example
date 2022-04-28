const { createServer } = require("http")
const { parse } = require("url")
const next = require("next")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

module.exports = {
  startServer: async function startServer() {
    return app.prepare().then(() => {
      createServer((req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
      }).listen(8080, (err) => {
        if (err) throw err
        console.log("> Ready on http://localhost:8080")
      })
    })
  },
}