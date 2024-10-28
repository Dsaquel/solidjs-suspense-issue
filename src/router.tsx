import {
  lazy,
  ParentProps,
  Suspense,
  onMount,
} from 'solid-js'
import { Navigate, Route, Router } from '@solidjs/router'

const HomeView = lazy(() => import('./views/Home'))
const NestedView = lazy(() => import('./views/Nested'))

function NotFound() {
  return <>Not found</>
}

function Loading() {
  return <>Loading</>
}

function Error(props: any) {
  onMount(() => console.log(props.error))
  return <>Oops Something went wrong</>
}

export const ErrorAndSuspense = (props: ParentProps) => {
  return (
    <Suspense fallback={<Loading />}>{props.children}</Suspense>
  )
}

export default function AppRoutes() {
  return (
    <Router root={ErrorAndSuspense} preload={false}>
      <Route path="/home">
        <Route component={HomeView} />
        <Route path="/nested">
          <Route component={NestedView} />
        </Route>
      </Route>
      <Route path="*" component={() => <Navigate href={"/home"} />} />
    </Router>
  )
}
