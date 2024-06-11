/**
 * use server makes the functions Promise. so whenever any function are called we need to do it with await.
 */

export const setLocalStorage = async ({ name, data }: { name: string; data: string }) => {
  return localStorage.setItem(name, data);
};
