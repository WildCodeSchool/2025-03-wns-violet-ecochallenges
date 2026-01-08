import DashboardBanner from "./DashboardBanner";
import Protected from "@/components/auth/Protected"; 

function DashboardPage() {
  return (
    <Protected>
      {(user) => (
        <main>
          <DashboardBanner username={user.username} />
        </main>
      )}
    </Protected>
  );
} 

export default DashboardPage;
