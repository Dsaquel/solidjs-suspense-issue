import { createComputed, createResource, createRoot } from "solid-js"
import { fetchMockData } from "../utils"

export const nestedStore = createRoot(() => {
  const nestedRecord = createResource(() => fetchMockData('data from nested'))[0]

  createComputed(() => console.log(nestedRecord.state))

  return { nestedRecord }
})

