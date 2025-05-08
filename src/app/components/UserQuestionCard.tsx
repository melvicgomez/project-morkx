export type UserQuestionCardProps = {
  message: string;
};

const UserQuestionCard: React.FC<UserQuestionCardProps> = (props) => {
  return (
    <span
      className="
      self-end
    bg-slate-800 text-white max-w-9/12 p-2 rounded-sm drop-shadow-sm"
    >
      {props.message}
    </span>
  );
};

export default UserQuestionCard;
