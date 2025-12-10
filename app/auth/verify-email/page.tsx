import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function VerifyEmailPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Your Email</CardTitle>
        <CardDescription>Check your inbox for a verification link</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
          <p className="font-medium">We&apos;ve sent you a verification email!</p>
          <p className="mt-2">Click the link in the email to confirm your account and start comparing prices.</p>
        </div>
        <div className="text-center text-sm text-slate-600">
          <Link href="/" className="font-medium text-blue-600 hover:underline">
            Return to home
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
