import useAxios from '../hooks/useAxios';
import useSWR from 'swr';
import {SWR_CONFIG} from '../utils/api';

export const useLocationDetails = ({id}: {id: number}) => {
  const axiosInstance = useAxios();

  // Fetcher menggunakan Axios
  const fetcher = async (url: string) => {
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  };

  // URL API dengan parameter
  const apiUrl = `/location/${id}`;

  // Memanfaatkan useSWR untuk fetching data
  const {data, error, isLoading, mutate} = useSWR(apiUrl, fetcher, {
    ...SWR_CONFIG,
  });

  return {
    data: data?.data || null,
    isLoading,
    isError: !!error,
    refetch: mutate, // SWR menyediakan `mutate` untuk me-refresh data
  };
};
