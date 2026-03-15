import { useEffect, useState } from "react";
import { Students_URL } from "../../constants/api";
import { axiosInstance } from "../../constants/URL";
import user1 from "../../assets/user.jpg";
import user2 from "../../assets/user3.jpg";
import user3 from "../../assets/user4.jpg";
import user4 from "../../assets/user2.jpg";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import Pagination from "../../sharedmodule/pagination/pagination";


interface Student {
  _id: string;
  first_name: string;
  email: string;
}

function Students() {
  const userImages = [user1, user2, user3, user4];
  const [studentList, setStudentList] = useState<Student[]>([]);
  const [page, setPage] = useState(1);

  const studentsPerPage = 8;

  const getAllStudents = async () => {
    try {

      const response = await axiosInstance.get(
        `${Students_URL.GETALLSTUDENTS}`
      );

      setStudentList(response.data);

    } catch (error) {

      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong");

    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  // pagination logic
  const startIndex = (page - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;

  const paginatedStudents = studentList.slice(startIndex, endIndex);

  const totalPages = Math.ceil(studentList.length / studentsPerPage);

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Students list</h2>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-3">

        {paginatedStudents.map((student,index) => (
          <div
            key={student._id}
            className="flex bg-white shadow rounded p-2 items-center"
          >
            <img
              src={userImages[index % userImages.length]}
              className="w-16 h-16 rounded mr-4"
            />

            <div>
              <h3 className="text-lg font-semibold">{student.first_name}</h3>
              <p className="text-gray-600 text-sm">{student.email}</p>
            </div>

          </div>
        ))}

      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(page) => setPage(page)}
      />

    </div>
  );
}

export default Students;