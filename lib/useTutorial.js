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

export function useUserTutorials(user, page = 1, sort = 'new', search = '') {
  const {
    data: tutorials,
    error,
    mutate: mutateTutorials,
  } = useSWR(
    `/api/tutorials/user/${user}?page=${page}&sort=${sort}&search=${encodeURIComponent(
      search
    )}`
  );

  return {
    tutorials,
    mutateTutorials,
    isLoading: !error && !tutorials,
    isError: error,
  };
}

export function useAll(page = 1, sort = 'new', search = '') {
  const {
    data: tutorials,
    error,
    mutate: mutateTutorials,
  } = useSWR(
    `/api/tutorials/all?page=${page}&sort=${sort}&search=${encodeURIComponent(
      search
    )}`
  );

  return {
    tutorials,
    mutateTutorials,
    isLoading: !error && !tutorials,
    isError: error,
  };
}
