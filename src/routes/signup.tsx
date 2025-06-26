import RegistrationForm from '@/components/profiles/RegistartionForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><RegistrationForm/></div>
}
