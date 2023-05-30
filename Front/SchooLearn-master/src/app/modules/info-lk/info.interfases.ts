export interface IGroup{
  id: number;
  name: string;
}

export interface ISolvedTask {
  id: number;
  name: string;
  scores: number;
}

export interface ISolvedTaskFullInfo {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  subject: string;
  receivedAnswer: string;
  deadline: Date;
  scores: number;
}

export interface IAppTask {
  id: number;
  name: string;
  deadline: Date;
}

export interface IAppTakFullInfo {
  id: number;
  name: string;
  description: string;
  subject: { id: number, name: string };
  difficulty: {id: number, name: string, scores: number, tasks: []};
  teacher: string;
  institution: string;
  isPublic: boolean;
  isExtendedTask: boolean;
  creationDateTime: Date;
  deadline: Date;
}

export interface ISubject {
  id: number;
  name: string;
}

export interface ICreateTask {
  name: string;
  description: string;
  difficulty: string;
  subject: string;
  answer: string;
  isExtended: boolean;
  isPublic: boolean;
  deadline: Date;
}
