import Image from 'next/image';
import BotAnswerCard from './BotAnswerCard';
import UserQuestionCard from './UserQuestionCard';
import { useCallback, useState } from 'react';
import { useAppService } from '../context/AppServiceContext';

const MainSection = () => {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [questionToBotStr, setQuestionToBotStr] = useState<string>('');
  const [conversationList, setConversationList] = useState<
    { role: 'user' | 'assistant'; message: string }[]
  >([]);

  const appService = useAppService();

  const onMessageSent = useCallback(async () => {
    const conversations = [...conversationList];
    conversations.push({
      role: 'user',
      message: questionToBotStr,
    });
    setConversationList(conversations);

    setIsloading(true);

    try {
      setQuestionToBotStr('');
      const result = await appService.postAskMorkx(questionToBotStr);

      setIsloading(false);
      conversations.push({
        role: 'assistant',
        message: result.choices[0].message.content,
      });
      setConversationList(conversations);
    } catch (error) {
      console.error('Error while asking Morkx:', error);
      setIsloading(false);
    }
  }, [conversationList, questionToBotStr, appService]);

  return (
    <main className="app-main-container flex-1 text-white flex flex-col relative">
      <div className="w-full flex flex-row justify-center absolute z-10 top-0 bg-gray-950 p-2 h-16">
        <Image
          src="/project_mork.svg"
          alt="App Brand Logo"
          width={70}
          height={70}
        />
      </div>
      <div
        className="flex-1 mt-16 mb-20 p-2 overflow-y-auto md:w-3xl  mx-auto
      flex flex-col gap-6
      "
      >
        {conversationList.length === 0 && (
          <h1 className="py-2 text-xl md:text-3xl text-center">
            How I can serve you today?
          </h1>
        )}
        {conversationList.map((conversation) => {
          return conversation.role === 'user' ? (
            <UserQuestionCard message={conversation.message} />
          ) : (
            <BotAnswerCard message={conversation.message} />
          );
        })}
        {isLoading && (
          <div className="flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent border-red-500"></div>
          </div>
        )}
      </div>
      <div className="w-full flex flex-row justify-center absolute z-10 bottom-0 px-4 py-2 md:p-2 h-20">
        <div className="relative w-full md:w-xl lg:w-3xl">
          <input
            type="text"
            className="
            h-13.5
            w-full bg-transparent placeholder:text-slate-400 text-gray-200
            text-sm border border-slate-200 rounded-md pl-3 pr-13.5 py-2 transition duration-300 ease
            focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="What’s on your mind? The Black Rose knows already."
            value={questionToBotStr}
            onChange={(e) => {
              setQuestionToBotStr(e.target.value);
            }}
          />
          <button
            disabled={isLoading && !questionToBotStr}
            className="
            absolute right-1 top-1 rounded bg-slate-800 p-1.5 border
            border-transparent text-center text-sm text-white transition-all
            shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none
            active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none
            disabled:opacity-50 disabled:shadow-none
            cursor-pointer"
            type="button"
            onClick={onMessageSent}
          >
            <Image
              src="/send-svg.svg"
              alt="Submit"
              width={20}
              height={20}
              className="w-8 h-8"
            />
          </button>
        </div>
      </div>
    </main>
  );
};

export default MainSection;
