import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/feedbacks')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/feedbacks"!</div>
}
