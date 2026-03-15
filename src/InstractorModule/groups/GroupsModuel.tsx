
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Groups_URL, Students_URL } from "../../constants/api";
import { axiosInstance } from "../../constants/URL";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import Pagination from "../../sharedmodule/pagination/pagination";
import Modal from "../../sharedmodule/model/Model";
import ConfirmModal from "../../sharedmodule/delete/ConfirmDelete";
import Select from "react-select";
import { useForm } from "react-hook-form";

interface Group {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: string[];
  max_students: number;
}

interface CreateGroupBody {
  name: string;
  students: string[];
}

interface Student {
  _id: string
  first_name: string
  email: string
}


export default function Groups() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [groupList,setGroupList] = useState<Group[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<string | null>(null);
  const [studentList , setStudentList] = useState<Student[]>([])
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const handleEditGroup = (group: Group) => {
  setGroupName(group.name);
  setSelectedStudents(group.students); // الـ IDs الموجودة بالفعل
  setEditingGroupId(group._id);
  setOpenModal(true);
};

   let {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<CreateGroupBody>();
  
    const onSubmit = async() =>{

      const body: CreateGroupBody = {
          name: groupName,
         students: selectedStudents,
        };

     if(editingGroupId) {
         let response = await axiosInstance.put(`${Groups_URL.UPDATE_GROUP(editingGroupId)}`,body);
         console.log(response)
          toast.success("Group updated successfully");
          setShowModal(false);
     }else{
         try {
          let response = await axiosInstance.post(`${Groups_URL.CREATEGroup}`,body);
          toast.success("Group created successfully");
          setGroupName("");
          setSelectedStudents([]);
          setEditingGroupId(null);
          setShowModal(false);

          getAllGroups(page); 
      
    } catch (error) {
      const err = error as AxiosError<{message:string}>;
      console.log(err)
      toast.error(err.response?.data?.message || "Something went wrong")
      
    }
  }
}

  /////////get croups///////////
  const getAllGroups =async(pageNumber: number = 1)=>{
          try {
              let response =await axiosInstance.get(`${Groups_URL.GETALLGroups}?page=${pageNumber}`)
              // console.log(response.data)
              setGroupList(response.data)
          } catch (error) {
              const err = error as AxiosError<{message:string}>;
              console.log(err)
              toast.error(err.response?.data?.message || "Something went wrong")
              
          }
      }

  ////////////////////
  //////delete group/////////
  const handleDeleteGroup = async (id: string) => {
  try {
    await axiosInstance.delete(`${Groups_URL.DELETE_GROUP(id)}`);
    toast.success("Group deleted successfully");
    getAllGroups(page); 
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    toast.error(err.response?.data?.message || "Something went wrong");
  }
};
  //////////////////
  //////get all students////////
   const getAllStudents =async()=>{
    console.log("students api called");
          try {
              let response =await axiosInstance.get(`${Students_URL.GETSTUDENTSWITHOUTGROUP}`)
              console.log(response)
              setStudentList(response.data)
          } catch (error) {
              const err = error as AxiosError<{message:string}>;
              console.log(err)
              toast.error(err.response?.data?.message || "Something went wrong")
              
          }
      }
    
      const studentOptions = studentList.map(student => ({
           value: student._id,
            label: `${student.first_name} (${student.email})`
       }));
  
      useEffect(()=>{
          getAllGroups(page);
          getAllStudents();
      },[page])


  return (
    <div className="bg-white p-6 rounded-xl shadow">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Groups list</h2>

        <button onClick={() => setOpenModal(true)} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
          <FaPlus /> Add Group
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {groupList.map((group, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium">Group : {group.name}</h3>
              <p className="text-sm text-gray-500">No. of students : {group.max_students}</p>
            </div>

            <div className="flex gap-4">
              <FaEdit className="cursor-pointer" onClick={() => handleEditGroup(group)} />
              <FaTrash className="cursor-pointer" 
              onClick={() => {
                setGroupToDelete(group._id);
                setDeleteModalOpen(true);
              }}/>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
         currentPage={page}
         totalPages={totalPages}
         onPageChange={(newPage) => setPage(newPage)}/>
       
       {/*add modal */}
        <Modal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title="Create Group">
         
         <form onSubmit={handleSubmit(onSubmit)}>
         <input
           type="text"
           placeholder="Group Name"
           value={groupName}
           onChange={(e) => setGroupName(e.target.value)}
           className="border w-full p-2 rounded mb-4"
          />

          {/* Students */}
          <div className="mb-4 ">
            <Select
               options={studentOptions}
               isMulti
               value={studentOptions.filter(option => selectedStudents.includes(option.value))}
               onChange={(selectedOptions) => {
                 // حفظ الـ ids في state
                 setSelectedStudents(selectedOptions.map(option => option.value));
               }}
               className="w-full mb-4 "
               classNamePrefix="select"
             />
             </div>

       {/* Buttons */}
      <div className="flex justify-end gap-3">

        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Cancel
        </button>

        <button
        type="submit"
          // onClick={createGroup}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Create
        </button>

      </div>
      </form>
       </Modal>
       {/* delete modal */}
       <ConfirmModal
         isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title="Delete Group"
          description="Are you sure you want to delete this group?"
          onConfirm={() => handleDeleteGroup(groupToDelete!)}
        />
</div>
  );
}