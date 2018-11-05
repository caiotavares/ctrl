import { Router, Request, Response } from 'express';
import * as BodyParser from 'body-parser';

function handle(handleFn: Function, request: Request, response: Response) {
  try {
    let { status, result } = handleFn(request)
    response.status(status)
    response.send(result)
  }
  catch ({ status, error }) {
    response.status(status ? status : 500)
    response.send(error)
  }
}

abstract class BaseController {
  public readonly router: Router

  constructor() {
    this.router = Router()
    this.router.use(BodyParser.json())
    this.registerRoutes(this.router)
  }

  protected abstract registerRoutes(router: Router)
}

export { Router, BaseController, Request, Response, handle }
