import { useEffect, useState } from 'react'

function SpinnerLoader() {
  const [text, setText] = useState('')
  const [showImage, setShowImage] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowImage(false)
      setText('i waited to 3 sec to load')
    }, 3000)
  }, [])

  return (
    <div>
      {showImage ? (
        <div className="items-center justify-center">
          <img src="./loading.svg" />
        </div>
      ) : (
        <h3>Text</h3>
      )}
    </div>
  )
}

export default SpinnerLoader
