import { Avatar, AvatarFallback } from '../ui/avatar';

interface Props {
  email: string;
}

const UserAvatar = ({ email }: Props) => {
  return (
    <Avatar className="w-8 h-8">
      <AvatarFallback>{email?.slice(0, 1)?.toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
