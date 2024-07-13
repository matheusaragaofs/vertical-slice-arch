import express from "express"
import { CreateLogbookController } from "./CreateLogbookController"
import { GetLogbookController } from "./GetLogbookController"

export class ApiServer {
  public static async run(
    port: number,
    controller: CreateLogbookController,
    getController: GetLogbookController
  ): Promise<void> {
    const app = express()

    app.use(express.json())

    app.post("/logbooks", (req, res) => controller.handle(req, res))
    app.get("/loogboks", (req, res) => getController.handle(req, res))

    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  }
}
