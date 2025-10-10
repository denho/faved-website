'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBolt,
  faShieldAlt,
  faSyncAlt,
  faMagic,
  faRocket,
  faLock,
  faHeadphones,
  faStar,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'

// ⚠️ SECURITY WARNING: This token is exposed to the client
// Make sure it has ONLY write permissions and is properly scoped
const AIRTABLE_TOKEN = process.env.NEXT_PUBLIC_AIRTABLE_TOKEN
const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID
const AIRTABLE_TABLE_NAME = process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME || 'Submission'

export default function WaitlistForm() {
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      // Validate configuration
      if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) {
        setStatus('error')
        setMessage('Configuration error. Please contact support.')
        return
      }

      // Validate input
      if (!formData.name.trim() || !formData.email.trim()) {
        setStatus('error')
        setMessage('Name and email are required.')
        return
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setStatus('error')
        setMessage('Please enter a valid email address.')
        return
      }

      // Submit directly to Airtable
      const response = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${AIRTABLE_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fields: {
              Name: formData.name,
              Email: formData.email,
              Timestamp: new Date().toISOString(),
            },
          }),
        }
      )

      if (response.ok) {
        setStatus('success')
        setMessage("Thank you for joining the waitlist! We'll be in touch soon.")
        setFormData({ name: '', email: '' })
      } else {
        const errorData = await response.json()

        // Check for duplicate email error
        if (errorData.error?.type === 'INVALID_REQUEST_BODY') {
          setStatus('error')
          setMessage('Unable to process your request. Please try again.')
        } else {
          setStatus('error')
          setMessage('Something went wrong. Please try again later.')
        }
      }
    } catch (error) {
      console.error('Waitlist submission error:', error)
      setStatus('error')
      setMessage('Failed to submit. Please check your connection and try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const feature = (text: string, icon: IconDefinition) => {
    return (
      <li className="flex items-center gap-3">
        <FontAwesomeIcon icon={icon} className="h-4 w-4 text-blue-600" />
        <span>{text}</span>
      </li>
    )
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Join the Faved Cloud Waitlist
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Be the first to know when Faved Cloud launches
        </p>
      </div>
      <div className="container py-12">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg border-1 border-gray-200 bg-white p-8 shadow-md dark:bg-gray-800">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Coming Soon: Faved Cloud
            </h2>
            <p className="mb-6 text-base leading-7 text-gray-600 dark:text-gray-300">
              We're working on a managed cloud version of Faved that will provide all the features
              you love without the need for self-hosting. Plus, extra features you won't get on a
              regular hosting.
            </p>
            <ul className="mb-8 space-y-2 text-gray-600 dark:text-gray-300">
              {feature('Enterprise-grade security with robust database encryption', faLock)}
              {feature('Automatic data backups', faShieldAlt)}
              {feature('Automatic application update', faSyncAlt)}
              {feature('Early access to Beta features', faMagic)}
              {feature('Blazing-fast CDN', faRocket)}
              {feature('Priority handling of your feature requests', faStar)}
              {feature('Priority support', faHeadphones)}
              {feature('Zero setup - start organizing your bookmarks immediately', faBolt)}
            </ul>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="your.email@example.com"
                />
              </div>

              {message && (
                <div
                  className={`rounded-md p-4 ${
                    status === 'success'
                      ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600 w-full rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50"
              >
                {status === 'loading' ? 'Submitting...' : 'Join Waitlist'}
              </button>
            </form>

            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              We respect your privacy and will only use your email to notify you about Faved Cloud.
            </p>
          </div>

          <div className="mt-8 rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
              Prefer Self-Hosting?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Faved will always remain open-source and free to self-host. Check out the{' '}
              <a
                href="https://github.com/denho/faved"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium underline"
              >
                GitHub repository
              </a>{' '}
              to get started today.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
