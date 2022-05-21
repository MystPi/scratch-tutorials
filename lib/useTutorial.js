import useSWR from 'swr';

export default function useTutorial(id) {
  const {
    data: tutorial,
    error,
    mutate: mutateTutorial,
  } = useSWR(id ? `/api/tutorials/id/${id}` : null);

  return {
    tutorial,
    mutateTutorial,
    isLoading: !error && !tutorial,
    isError: error,
  };
}
