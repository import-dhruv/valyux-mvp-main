import { getUserProfile } from "@/lib/actions/user"
import { ProfileForm } from "@/components/dashboard/profile-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function ProfilePage() {
  const { data: profile } = await getUserProfile()

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="mt-2 text-slate-600">Manage your account information and preferences</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your profile details</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm initialProfile={profile} />
        </CardContent>
      </Card>
    </div>
  )
}
