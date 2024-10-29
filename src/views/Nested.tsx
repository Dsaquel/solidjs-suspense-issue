import { A } from "@solidjs/router"
import { useNested } from "../contexts/nested.ts"


export default function NestedComponent() {
  const { nestedRecord } = useNested()

  return (
    <div>
      <h1>Nested</h1>
      <div>my resource: {nestedRecord()?.data}</div>
      <A href="/home">home</A>
    </div>
  )
}

