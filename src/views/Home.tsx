import { A } from "@solidjs/router"
import { homeStore } from "../contexts/home"

export default function Home() {
  const { homeRecord } = homeStore

  return <>
    <h1>Home</h1>
    <div>my resource: {homeRecord().data}</div>
    <A href="/home/nested">nested</A>
  </>
}
