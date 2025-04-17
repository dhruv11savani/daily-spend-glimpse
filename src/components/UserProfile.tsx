
import React from 'react';
import { User } from '@/types/user';
import { Button } from '@/components/ui/button';
import { LogOut, User as UserIcon } from 'lucide-react';
import { logoutUser } from '@/utils/auth-utils';

interface UserProfileProps {
  user: User;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  const handleLogout = () => {
    logoutUser();
    onLogout();
  };

  return (
    <div className="flex items-center justify-between p-4 bg-card border rounded-md mb-4">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-full">
          <UserIcon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-medium">{user.username}</h3>
          <p className="text-xs text-muted-foreground">
            Joined {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={handleLogout} className="gap-1">
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </div>
  );
};

export default UserProfile;
