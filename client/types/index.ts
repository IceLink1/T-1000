import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Question {
  _id: string;
  question: string;
  answers: string[];
  correct: number;
  subject: string;
}

export interface QuestionState {
  questions: Question[];
  loading: boolean;
  error: string | null;
}
