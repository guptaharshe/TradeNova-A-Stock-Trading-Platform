import PageWrapper from "../components/ui/PageWrapper";
import Card from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { user } = useAuth();

    return (
        <PageWrapper title="Profile">
            <Card>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="text-white font-medium">{user?.email || "Not logged in"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Account Status</p>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-600/20 text-green-400">
                            Active
                        </span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Member Since</p>
                        <p className="text-white">December 2024</p>
                    </div>
                </div>
            </Card>
        </PageWrapper>
    );
};

export default Profile;
