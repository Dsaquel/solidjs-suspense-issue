import { createComputed, createResource } from "solid-js"
import { createContextProvider, fetchMockData } from "../utils"

export const [NestedContext, useNested] = createContextProvider(() => {
  const nestedRecord = createResource(() => fetchMockData('data from nested'))[0]

  createComputed(() => console.log(nestedRecord.state))

  return { nestedRecord }
})

export default NestedContext
