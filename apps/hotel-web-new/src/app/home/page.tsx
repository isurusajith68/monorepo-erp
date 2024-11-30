import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to={'/select-template'}>
        <Button className="bg-green-500 ml-10">Create Web</Button>
      </Link>
    </div>
  )
}

export default Home
