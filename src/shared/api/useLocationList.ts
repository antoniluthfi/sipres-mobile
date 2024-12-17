import useAxios from '../hooks/useAxios';
import useSWR from 'swr';
import {SWR_CONFIG} from '../utils/api';

export type LocationData = {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  radius: number;
  created_at: string;
  updated_at: string;
};

export const useLocationList = ({
  page = 1,
  limit = 5,
  search = '',
}) => {
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
  const apiUrl = `/location?page=${page}&limit=${limit}&search=${search}`;

  // Memanfaatkan useSWR untuk fetching data
  const {data, error, isLoading, mutate} = useSWR(apiUrl, fetcher, {
    ...SWR_CONFIG,
  });

  return {
    data: data?.data || null,
    pagination: data?.pagination || null,
    isLoading,
    isError: !!error,
    refetch: mutate, // SWR menyediakan `mutate` untuk me-refresh data
  };
};
