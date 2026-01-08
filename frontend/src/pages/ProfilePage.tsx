import Protected from "@/components/auth/Protected"; 

function ProfilePage() {
  return (
    <Protected>{() => <main></main>}</Protected>
  );
}

export default ProfilePage;
