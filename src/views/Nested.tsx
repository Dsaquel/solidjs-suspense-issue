import { A } from "@solidjs/router"
import { nestedStore } from "../contexts/nested"

export default function Nested() {
  const { nestedRecord } = nestedStore

  const hah = () => nestedRecord()?.data

  return <div>
    <h1>Nested</h1>
    <div>my resource: {hah()}</div>
    <A href="/home">home</A>
  </div>
}
