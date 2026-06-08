import { sparkModules } from '$content/spark-content';
import { getRecommendedModuleId, learningState } from '$state/learning-state.svelte';

export function getRecommendedModule() {
  const id = getRecommendedModuleId();
  return sparkModules.find((module) => module.id === id) ?? sparkModules[0];
}

export function shouldShowBridge(moduleId: string) {
  const module = sparkModules.find((item) => item.id === moduleId);
  if (!module?.bridgeWarning) return false;
  return learningState.experience !== 'explorer';
}

export function getModeLabel() {
  if (learningState.experience === 'beginner') return 'Mode Pemula';
  if (learningState.experience === 'guided') return 'Mode Terarah';
  if (learningState.experience === 'explorer') return 'Mode Penjelajah';
  return 'Mode adaptif belum dipilih';
}
