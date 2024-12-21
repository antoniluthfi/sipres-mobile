import useAxios from '../hooks/useAxios';
import useSWR from 'swr';
import {SWR_CONFIG} from '../utils/api';

export type UserCourseData = {
  academic_year: string; // Tahun akademik
  course_id: number; // ID mata kuliah
  course_name: string; // Nama mata kuliah
  id: number; // ID data
  identification_number: string; // Nomor identifikasi (misalnya NIM)
  role: 'student' | 'lecturer' | 'admin'; // Peran pengguna, misalnya student
  semester: 'odd' | 'even'; // Semester, misalnya ganjil atau genap
  user_id: number; // ID pengguna
  user_name: string; // Nama pengguna
  upcoming_schedule: {
    id: number;
    meeting_number: number;
    date: string;
    start_time: string;
    end_time: string;
  };
  attendance_recap: Array<{
    meeting_number: number;
    is_past: boolean;
    attendance_record: {
      id: number;
      student_id: number;
      attendance_time: string;
      latitude: number;
      longitude: number;
      status: 'present' | 'permission' | 'sick' | 'absent';
      remarks: string;
      file_path: string;
    };
  }>;
};

export const useUserCoursesList = ({
  page = 1,
  limit = 5,
  search = '',
  user_id = '',
  course_id = '',
  include_attendance_recap = 0,
  include_upcoming_schedule = 0,
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
  const apiUrl = `/user-course?page=${page}&limit=${limit}&user_id=${user_id}&course_id=${course_id}&include_attendance_recap=${include_attendance_recap}&include_upcoming_schedule=${include_upcoming_schedule}&search=${search}`;

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
