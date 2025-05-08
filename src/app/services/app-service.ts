// services/AppService.ts
import { AskMorkxResponse, ValidationCode } from '../models/App';

export class AppService {
  async getValidateInvitationCode(invitationCode: string): Promise<boolean> {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }validate-invitation-code?code=${encodeURIComponent(
        invitationCode.toUpperCase()
      )}`
    );

    const data: ValidationCode | { error: string } = await response.json();

    if (!response.ok) {
      const errorMessage =
        (data as { error: string })?.error || 'Unknown server error';
      throw new Error(errorMessage);
    }

    const { expiration_date } = data as ValidationCode;

    // If no expiration_date, default to 30 days
    const finalExpirationDate =
      expiration_date ||
      (() => {
        const date = new Date();
        date.setDate(date.getDate() + 30);
        return date.toISOString();
      })();

    localStorage.setItem('invitation_expiration', finalExpirationDate);

    return true;
  }

  async postAskMorkx(message: string): Promise<AskMorkxResponse> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}ask-morkx`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
        redirect: 'follow',
      }
    );

    const result: AskMorkxResponse = await response.json();

    if (!response.ok) {
      throw new Error(
        `Server responded with ${response.status}: ${JSON.stringify(result)}`
      );
    }

    return result;
  }
}
