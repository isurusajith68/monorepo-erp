'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { getFiles1, oneFile } from './action'
import { useState } from 'react'

export default function Button1() {
  const database = async () => {
    //get all files

    const filesInTheFolder = await getFiles1('C:/Users/User/Desktop/New folder')

    console.log('files of the folder', filesInTheFolder)

    //execute only one file

    await oneFile(filesInTheFolder)
  }

  return (
    <div>
      database <br></br>
      <Button className="bg-red-400" onClick={database} type="button">
        add
      </Button>
    </div>
  )
}
