import { genPageMetadata } from 'app/seo'
import WaitlistForm from './WaitlistForm'

export const metadata = genPageMetadata({
  title: 'Faved Cloud Waitlist',
  description:
    'Join the waitlist for Faved Cloud - a managed cloud version of Faved bookmark manager',
})

export default function Waitlist() {
  return <WaitlistForm />
}
