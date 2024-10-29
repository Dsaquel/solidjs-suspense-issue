import { A } from "@solidjs/router"
import { useHome } from "../contexts/home.ts"

export default function HomeComponent() {
  const { homeRecord } = useHome()

  return (
    <div>
      <h1>Home</h1>
      <div>my resource: {homeRecord()?.data}</div>
      <A href="/home/nested">nested</A>
    </div>
  )
}
