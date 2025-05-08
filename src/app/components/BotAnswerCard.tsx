export type BotAnswerCardProps = {
  message: string;
};

const BotAnswerCard: React.FC<BotAnswerCardProps> = (props) => {
  return (
    <span
      className="
      self-start
      bg-stone-700 text-white max-w-9/12 p-2 rounded-sm drop-shadow-sm"
    >
      {props.message}
    </span>
  );
};

export default BotAnswerCard;
