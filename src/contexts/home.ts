import { createResource } from "solid-js"
import { createContextProvider, fetchMockData } from "../utils"

export const [HomeContext, useHome] = createContextProvider(() => {
  const homeRecord = createResource(() => fetchMockData('data from nested'))[0]

  return { homeRecord }
})

export default HomeContext
