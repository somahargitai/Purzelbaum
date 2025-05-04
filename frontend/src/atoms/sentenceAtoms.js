import { atom } from 'jotai';

export const currentSentenceAtom = atom('');
export const sentenceAnalysisAtom = atom(null);
export const isLoadingAtom = atom(false);
export const errorAtom = atom(null); 