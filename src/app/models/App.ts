export interface ValidationCode {
  code: string;
  expiration_date: string;
}

export interface AskMorkxResponse {
  id: string;
  choices: OpenAIResponse[];
  object: string;
  created: number;
}

export interface OpenAIResponse {
  index: number;
  message: {
    content: string;
  };
}
