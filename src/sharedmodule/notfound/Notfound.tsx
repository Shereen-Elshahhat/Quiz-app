import photo from "../../assets/ll.jpg"
export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col mt-10">
      <img className="w-full sm:w-[50%]" src={photo} alt="not-found" />
      <p className="text-gray-700 font-bold dark:text-white">oooops... No Page Found</p>
    </div>
  )
}