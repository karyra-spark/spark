import { sparkModules, type SparkLesson, type SparkModule } from '$content/spark-content';

export type FlatLesson = {
  module: SparkModule;
  lesson: SparkLesson;
  index: number;
  total: number;
  previousSlug?: string;
  nextSlug?: string;
};

export function getFlatLessons(): FlatLesson[] {
  const pairs = sparkModules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      module,
      lesson
    }))
  );

  return pairs.map((item, index) => ({
    ...item,
    index,
    total: pairs.length,
    previousSlug: pairs[index - 1]?.lesson.slug,
    nextSlug: pairs[index + 1]?.lesson.slug
  }));
}

export function getLessonPosition(slug: string) {
  return getFlatLessons().find((item) => item.lesson.slug === slug);
}

export function getNextLessonSlug(slug: string) {
  return getLessonPosition(slug)?.nextSlug;
}

export function getPreviousLessonSlug(slug: string) {
  return getLessonPosition(slug)?.previousSlug;
}

export function getLessonProgressPercent(slug: string) {
  const position = getLessonPosition(slug);
  if (!position) return 0;
  return Math.round(((position.index + 1) / position.total) * 100);
}
