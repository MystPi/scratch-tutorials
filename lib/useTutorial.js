import useSWR from 'swr';

export default function useTutorial(id, user = false) {
  let endpoint = null;

  if (id) {
    if (user) {
      endpoint = `/api/tutorials/user/${id}`;
    } else {
      endpoint = `/api/tutorials/id/${id}`;
    }
  }

  const { data: tutorial, error, mutate: mutateTutorial } = useSWR(endpoint);

  return {
    tutorial,
    mutateTutorial,
    isLoading: !error && !tutorial,
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
