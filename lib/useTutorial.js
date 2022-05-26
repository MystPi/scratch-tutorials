import useSWR from 'swr';

export function useTutorial(id) {
  const {
    data: tutorial,
    error,
    mutate: mutateTutorial,
  } = useSWR(`/api/tutorials/id/${id}`);

  return {
    tutorial,
    mutateTutorial,
    isLoading: !error && !tutorial,
    isError: error,
  };
}

export function useUserTutorials(user) {
  const {
    data: tutorials,
    error,
    mutate: mutateTutorials,
  } = useSWR(`/api/tutorials/user/${user}`);

  return {
    tutorials,
    mutateTutorials,
    isLoading: !error && !tutorials,
    isError: error,
  };
}

export function useAll() {
  const {
    data: tutorials,
    error,
    mutate: mutateTutorials,
  } = useSWR('/api/tutorials/all');

  return {
    tutorials,
    mutateTutorials,
    isLoading: !error && !tutorials,
    isError: error,
  };
}
