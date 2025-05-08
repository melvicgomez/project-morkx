'use client';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import MainSection from './MainSection';
import { useAppService } from '../context/AppServiceContext';

const InvitationCode = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const regex = /^[A-Za-z0-9]{5}-[A-Za-z0-9]{5}-[A-Za-z0-9]{5}$/;

  const [invitationCode, setInvitationCode] = useState<string>('');
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(true);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [apiCallError, setApiCallError] = useState<string>();
  const [isValidCode, setIsValidCode] = useState<boolean>(false);

  const appService = useAppService();

  const onValidateCode = useCallback(async () => {
    try {
      setIsloading(true);

      const isValidCode = await appService.getValidateInvitationCode(
        invitationCode
      );
      setIsValidCode(isValidCode);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      setApiCallError(errorMessage);
    } finally {
      setIsloading(false);
      setInvitationCode('');
      setIsBtnDisabled(true);
    }
  }, [invitationCode, appService]);

  useEffect(() => {
    setIsBtnDisabled(!regex.test(invitationCode || ''));
  }, [invitationCode, regex]);

  return !isValidCode ? (
    <div className="flex flex-col mx-auto self-center">
      <div className="w-full flex flex-row justify-center absolute z-10 left-0 top-0 bg-gray-950 p-2 h-16">
        <Image
          src="/project_mork.svg"
          alt="App Brand Logo"
          width={70}
          height={70}
        />
      </div>
      {!isLoading && (
        <>
          <h1 className="py-2 text-3xl text-center">Invitation Code</h1>
          <div className="relative w-sm">
            <input
              type="text"
              className="
              h-13.5 uppercase 
              w-full bg-transparent placeholder:text-slate-400 text-gray-200
              text-sm border border-slate-200 rounded-md pl-3 pr-13.5 py-2 transition duration-300 ease
              focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Let the spirits of Ionia guide your words."
              value={invitationCode}
              onChange={(e) => {
                setApiCallError('');
                setInvitationCode(e.target.value);
              }}
            />
            <button
              disabled={isBtnDisabled}
              className={`
            absolute right-1 top-1 rounded bg-slate-800 p-1.5 border
              border-transparent text-center text-sm text-white transition-all
              shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none
              active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none
              disabled:opacity-50 disabled:shadow-none cursor-pointer
              `}
              type="button"
              onClick={!isBtnDisabled ? onValidateCode : undefined}
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

          {isBtnDisabled && invitationCode && (
            <div className="mt-1 text-sm text-red-400 select-none">
              Invalid format of code XXXXX-XXXXX-XXXXX
            </div>
          )}

          {apiCallError && (
            <div className="mt-1 text-sm text-red-400 select-none">
              {apiCallError}
            </div>
          )}
        </>
      )}

      {isLoading && (
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent border-red-500"></div>
        </div>
      )}
    </div>
  ) : (
    <MainSection />
  );
};

export default InvitationCode;
