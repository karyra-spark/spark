export type SparkLevel = 'beginner' | 'intermediate' | 'advanced';
export type SparkTrack = 'core' | 'lab';
export type LevelStatus = 'locked' | 'available' | 'in_progress' | 'passed';

export type LevelExamOption = {
  id: string;
  label: string;
  correct?: boolean;
  feedback: string;
};

export type LevelExamQuestion = {
  id: string;
  prompt: string;
  options: LevelExamOption[];
};

export type LevelExam = {
  id: string;
  track: SparkTrack;
  level: SparkLevel;
  title: string;
  summary: string;
  passingScore: number;
  questions: LevelExamQuestion[];
};

export type LevelResult = {
  examId: string;
  track: SparkTrack;
  level: SparkLevel;
  answers: Record<string, string>;
  score: number;
  passed: boolean;
  attempts: number;
  completedAt: string;
};

export type LevelDefinition = {
  id: SparkLevel;
  label: string;
  shortLabel: string;
  title: string;
  copy: string;
  icon: string;
  tone: 'blue' | 'green' | 'purple' | 'orange';
  coreModuleIds: string[];
  labIds: string[];
};
