export const focusableSelector = '[data-remote-focusable]';

export const getFocusableElements = (): HTMLElement[] =>
  Array.from(document.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    element => !element.hasAttribute('disabled')
  );
