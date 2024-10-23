import { LoaderFunctionArgs } from '@remix-run/node'
import { Link, useParams } from '@remix-run/react'
import React from 'react'
import { Button } from '~/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { client } from '~/db.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const result = await client.query('SELECT * FROM public.webtemplatedata')
  if (result.rows.length === 0) {
    return {}
  } else {
    console.log('first', result.rows)
    return result.rows
  }
}

function CreateWeb() {
  const params = useParams()
  const hotelId = params.id // This gives you "23"
  const temp1id = 1;
  const temp2id = 2;
  console.log('idh', hotelId)

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="bg-blue-900">Create Web</Button>
        </PopoverTrigger>
        <PopoverContent className="w-[100%] -ml-[15%] bg-slate-100">
          <div className="space-x-2">
            <h4 className="font-extrabold leading-none text-xl ml-10 mb-9">Select Template</h4>
          </div>
          <div className="grid grid-cols-2 gap-5 ml-[7%]">
            <div>
              <div className="ml-0">
                <h1>Template 1</h1>
                <p>This is a template 1</p>
                <h1 hidden>temp id = {temp1id}</h1>
              </div>

              <div className="bg-slate-100 border-2 w-[80%] text-center">
                <img src="/temp.png" width={500} height={10} alt={'Template 1'} />
              </div>
              <div className="mt-2 ml-[30%] flex gap-8">
                <div>
                 <Button className='bg-blue-400 hover:bg-blue-500'>Live Demo</Button>
                </div>
                <div>
                <Link to={`/create-web?hotelId=${hotelId}?tempid=${temp1id}`}>
                  <Button>Use This</Button>
                </Link>
                </div>
              </div>
            </div>

            <div>
              <div className="ml-0">
                <h1>Template 2</h1>
                <p>This is a template 2</p>
                <h1 hidden>temp id = {temp2id}</h1>
              </div>

              <div className="bg-slate-100 border-2 w-[80%] text-center">
                <img src="/temp.png" width={500} height={10} alt={'Template 2'} />
              </div>
              <div className="mt-2 ml-[30%] flex gap-8">
              <div>
                 <Button className='bg-blue-400 hover:bg-blue-500'>Live Demo</Button>
                </div>
               <div>
                <Link to={`/create-web?hotelId=${hotelId}?tempid=${temp2id}`}>
                  <Button>Use This</Button>
                </Link>
               </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default CreateWeb
