import { createContext, useContext } from 'react';
import { Page } from '../../interfaces';

interface PagesContextInformation {
  pages: Page[];
}

export const PAGE_CONTEXT_DEFAULT_VALUE = {
  pages: [],
} as PagesContextInformation;

export const PagesContext = createContext<PagesContextInformation>(PAGE_CONTEXT_DEFAULT_VALUE);

const usePagesContext = () => useContext(PagesContext);

export default usePagesContext;
