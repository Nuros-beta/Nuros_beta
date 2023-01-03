import ProfileView from "components/Profile/ProfileView";

import { useFirebase } from "context/firebase";
import { useFetchProfile } from "hooks/api/use-profile";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter()
	const { user } = useFirebase()
  const { data, isLoading, error } = useFetchProfile(user?.uid)

  if (isLoading) return <p>Loading profile ...</p>
  if ((error as any)?.code === 404 || !data?.profile) router.push('/profile/create')

  console.log("profile: ", data)

  if (data?.profile){
    return <ProfileView profile={data.profile} />;
  }
  return null
}

Profile.auth = true

export default Profile
