import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getLesson } from '$content/spark-content';

export const load: PageLoad = ({ params }) => {
  const result = getLesson(params.slug);
  if (!result) error(404, 'Lesson tidak ditemukan');
  return result;
};
