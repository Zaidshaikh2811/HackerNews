import type { ErrorResponse } from '@/shared/types'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

const app = new Hono()

app.get('/', (c) => {


  throw new HTTPException(404,{message:"Not Found"})


  return c.text('Hello Hono!')
})

app.onError((err, c) => {
 if(err instanceof HTTPException){
  const ErrorResponse=err.res ?? c.json<ErrorResponse>({
    success:false,
    error:err.message,
    isFormError:err.cause && typeof err.cause === 'object' && "form" in err.cause 
    ?err.cause.form==true :false
  },err.status);

  return ErrorResponse;
 }

  return c.json<ErrorResponse>({
    success:false,
    error:process.env.NODE_ENV==="development" ?  (err.stack ?? err.message) : "Internal Server Error",
    isFormError:false
  },500);


})



export default app
