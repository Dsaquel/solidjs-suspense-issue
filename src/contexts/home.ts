import { createResource, createRoot } from "solid-js"
import { createProjection, fetchMockData } from "../utils"

export const homeStore = createRoot(() => {
  const [homeRecord, _setHome, homeArray] = createProjection(
    createResource(() => fetchMockData('data from home'), { initialValue: {} })[0],
    { transform: (o) => Object.values(o), initialValue: {} }
  )


  return { homeRecord, homeArray }
})
