
export interface Email {
  to: string;
  message: EmailMessage;
}
interface EmailMessage {
  subject: string;
  html: string;
}
