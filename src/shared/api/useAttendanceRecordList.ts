import useAxios from '../hooks/useAxios';
import useSWR from 'swr';
import {SWR_CONFIG} from '../utils/api';

export type AttendanceRecord = {
  id: number;
  attendance_time: string;
  longitude: string;
  latitude: string;
  course_meeting_id: number;
  meeting: {
    id: number;
    meeting_number: number;
    date: string;
    course: {
      id: number;
      name: string;
      code: string;
    };
  };
  status: 'present' | 'permission' | 'sick' | 'absent';
  remarks: string | null;
  file_path: string | null;
  student: {
    id: number;
    name: string;
    identification_number: string;
  };
  created_at: string;
  updated_at: string;
};

export const useAttendanceRecordList = ({
  page = 1,
  limit = 5,
  search = '',
  user_id = '',
  course_id = '',
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

  const urlApi = `/attendance/records?page=${page}&limit=${limit}&user_id=${user_id}&course_id=${course_id}&search=${search}`;

  const {data, error, isLoading, mutate} = useSWR(urlApi, fetcher, SWR_CONFIG);

  return {
    data: data?.data || null,
    pagination: data?.pagination || null,
    isLoading,
    isError: !!error,
    refetch: mutate, // SWR menyediakan `mutate` untuk me-refresh data
  };
};
