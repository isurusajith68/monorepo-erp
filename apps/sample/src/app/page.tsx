import { add } from '@new/sample-lib'

export default function Home() {
  return (
    <div>
      <h1>Sample App</h1>
      <p>1 + 2 = {add(1, 2)}</p>
    </div>
  )
}
