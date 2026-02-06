import Protected from "@/components/auth/Protected";
import { useAuthStore } from "@/stores/authStore";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typographyH1";
import { useNavigate } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import { PencilIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUpdateProfilePictureMutation } from "@/generated/graphql-types";
import { useCallback } from "react";
import { useCloudinaryWidget } from "@/hooks/useCloudinaryWidget";

function ProfilePage() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const [updateProfilePicture, { loading: updatingPicture }] =
    useUpdateProfilePictureMutation({
      refetchQueries: ["GetCurrentUser"],
    });

  const handleUploadSuccess = useCallback(
    async (pictureUrl: string) => {
      try {
        await updateProfilePicture({
          variables: {
            data: {
              pictureUrl,
            },
          },
        });
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    },
    [updateProfilePicture],
  );

  const { openWidget } = useCloudinaryWidget({
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    onSuccess: handleUploadSuccess,
    onError: (error) => {
      console.error("Erreur du widget Cloudinary :", error);
      alert("Erreur lors du téléchargement de l'image. Veuillez réessayer.");
    },
  });

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <Protected>
      {(user) => (
        <section className="flex items-center justify-center my-6">
          <div className="flex items-center justify-center">
            <div className="w-full px-4">
              <Card className="max-w-2xl w-full bg-white rounded-lg border shadow-md mx-auto">
                <CardHeader>
                  <CardTitle>
                    <TypographyH1 className="text-2xl text-background font-semibold w-full text-center">
                      PROFIL UTILISATEUR
                    </TypographyH1>
                  </CardTitle>
                  <CardDescription className="text-center text-background">
                    Retrouvez vos informations de compte.
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col items-center gap-6 px-6">
                  <div className="relative group h-40 w-40 rounded-full">
                    <Avatar className="h-40 w-40">
                      <AvatarImage src={user.pictureUrl} />
                      <AvatarFallback>
                        <Spinner />
                      </AvatarFallback>
                    </Avatar>

                    <Button
                      onClick={openWidget}
                      disabled={updatingPicture}
                      className={cn(
                        "absolute top-0 left-0 h-40 w-40 m-0 p-0 flex items-center justify-center rounded-full text-white bg-primary",
                        "opacity-0 group-hover:opacity-80 pointer-events-none group-hover:pointer-events-auto",
                        "transition-opacity duration-200",
                        updatingPicture && "cursor-wait",
                      )}
                    >
                      {updatingPicture ? (
                        <Spinner />
                      ) : (
                        <PencilIcon className="h-10 w-10" />
                      )}
                    </Button>
                  </div>

                  <div className="w-full flex flex-col gap-4">
                    <div>
                      <label className="text-sm text-background block mb-1">
                        Nom d'utilisateur
                      </label>
                      <Input value={user.username} readOnly />
                    </div>

                    <div>
                      <label className="text-sm text-background block mb-1">
                        Email
                      </label>
                      <Input value={user.email} readOnly />
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="justify-end gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/dashboard")}
                  >
                    Retour
                  </Button>
                  <Button onClick={handleLogout}>Se déconnecter</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      )}
    </Protected>
  );
}

export default ProfilePage;
