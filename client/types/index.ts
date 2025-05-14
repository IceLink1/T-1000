import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Question {
  _id: string;
  title: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
  subject: string;
}

export interface QuestionState {
  questions: Question[];
  loading: boolean;
  error: string | null;
}