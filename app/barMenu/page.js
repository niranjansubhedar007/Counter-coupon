// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Image from "next/image";
// import * as XLSX from 'xlsx';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faDownload, faSearch, faHouse, faPenToSquare, faPlus, faTrash, faAnglesLeft, faAnglesRight, faUpload, faTimes, faArrowDown } from "@fortawesome/free-solid-svg-icons";
// import { useRouter } from "next/navigation";

// const EditModal = ({ isOpen, onCancel, onEdit, menuToEdit }) => {
//     const [editedMenuData, setEditedMenuData] = useState({
//         name: menuToEdit?.name || "",
//         price: menuToEdit?.price || "",
//         uniqueId: menuToEdit?.uniqueId || "",
//         image: null,
//         // mainCategoryId: menuToEdit?.mainCategory._id || "",
//     });
//     const [existingImage, setExistingImage] = useState(null);
//     // const [selectedImage, setSelectedImage] = useState(null);
//     const [errorMessage, setErrorMessage] = useState("");

//     useEffect(() => {
//         let timeoutId;

//         if (errorMessage) {
//             timeoutId = setTimeout(() => {
//                 setErrorMessage("");
//             }, 2000);
//         }

//         return () => {
//             // Cleanup the timeout when the component is unmounted or the error message changes
//             clearTimeout(timeoutId);
//         };
//     }, [errorMessage]);

//     useEffect(() => {
//         // Fetch the existing image when the menuToEdit changes
//         if (menuToEdit) {
//             setExistingImage(
//                 menuToEdit.imageUrl
//                     ? `http://localhost:5000/${menuToEdit.imageUrl}`
//                     : null
//             );

//             // Set other menu data
//             setEditedMenuData({
//                 name: menuToEdit.name,
//                 uniqueId: menuToEdit.uniqueId,
//                 price: menuToEdit.price,
//                 image: null, // Reset the image when editing
//             });
//         }
//     }, [menuToEdit]);



//     const handleInputChange = (e) => {
//         const { name, value, type, files } = e.target;
//         // const file = files ? files[0] : null;
//         // setSelectedImage(file);


//         // Capitalize the first letter if the input is not a file
//         const capitalizedValue = type !== "file" ? value.charAt(0).toUpperCase() + value.slice(1) : value;

//         if (type === "file") {
//             setEditedMenuData((prevData) => ({
//                 ...prevData,
//                 [name]: files[0],
//             }));
//         } else {
//             setEditedMenuData((prevData) => ({
//                 ...prevData,
//                 [name]: capitalizedValue,
//             }));
//         }
//     };
//     const handleEdit = async () => {
//         try {
//             const formData = new FormData();
//             formData.append("name", editedMenuData.name);
//             formData.append("price", editedMenuData.pricePer1Bottle);
//             formData.append("image", editedMenuData.image);
//             formData.append("barSubmenuId", editedMenuData.barSubmenuIdId);
//             // formData.append("mainCategoryId", editedMenuData.mainCategoryId);

//             const response = await axios.put(
//                 `http://localhost:5000/api/liquorBrand/barSubmenu/${menuToEdit._id}`,
//                 formData
//             );

//             console.log("Menu updated successfully:", response.data);
//             onEdit(response.data); // Update the state with the edited menu

//             onCancel(); // Close the edit modal
//         } catch (error) {
//             console.error("Error updating menu:", error);

//             if (error.response && error.response.status === 400) {
//                 const specificErrorMessage = error.response.data.message;

//                 // Ensure specificErrorMessage is defined before using includes
//                 if (specificErrorMessage && specificErrorMessage.includes("uniqueId")) {
//                     setErrorMessage("Error adding menu. Please try again later."); // Update the error message state
//                 } else {
//                     setErrorMessage("Menu ID is already taken"); // Update the error message state
//                 }
//             }
//         }
//     };

//     return (
//         <div
//             className={`fixed inset-0 flex items-center justify-center font-sans z-50 ${isOpen ? "" : "hidden"
//                 }`}
//             style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//         >

//             <div
//                 className="modal-container lg:h-min bg-white p-6 rounded shadow-lg relative font-sans"
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 <button
//                     onClick={() => onCancel(false)}
//                     className="absolute top-4 right-2 bg-red-100 text-red-600 hover:bg-red-200 p-2 py-1 rounded-full text-center"
//                 >
//                     <FontAwesomeIcon icon={faTimes} size="lg" />
//                 </button>
//                 <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-gray-400">
//                     Edit Menu
//                 </h3>
//                 {errorMessage && <div className="fixed inset-0 flex items-center justify-center">
//                     <div className="bg-white border border-red-500 rounded p-7 shadow-md z-50 absolute">
//                         <p className="text-red-500 font-semibold text-center text-xl">Menu Id Is Already Taken!
//                         </p>
//                     </div>
//                     {errorMessage}
//                 </div>}
//                 <form>
//                     <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">
//                         Name
//                     </label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={editedMenuData.name}
//                         onChange={handleInputChange}
//                         autoComplete="off"
//                         className="w-full p-2 mb-2 border rounded-md"
//                     />
//                     <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">
//                         MenuId
//                     </label>
//                     <input
//                         type="number"
//                         name="uniqueId"
//                         value={editedMenuData.uniqueId}
//                         onChange={handleInputChange}
//                         autoComplete="off"

//                         className="w-full p-2 mb-4 border rounded-md"
//                     />
//                     <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">
//                         Price
//                     </label>
//                     <input
//                         type="number"
//                         name="price"
//                         value={editedMenuData.price}
//                         onChange={handleInputChange}
//                         autoComplete="off"

//                         className="w-full p-2 mb-2 border rounded-md"
//                     />
//                     <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400 ml-2">
//                         Previous Image
//                     </label>
//                     <div className="border border-gray-300 rounded-md mt-1 mb-1">
//                         {existingImage && (
//                             <img
//                                 src={existingImage}
//                                 alt="Existing Image"
//                                 className="max-w-md max-h-20 rounded-md"
//                             />
//                         )}
//                     </div>
//                     {/* Display the selected image */}
//                     {/* {selectedImage && (
//                         <img
//                             src={URL.createObjectURL(selectedImage)}
//                             alt="Selected Image"
//                             className="max-w-full max-h-32"
//                         />
//                     )} */}
//                     <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
//                         Image
//                     </label>
//                     <input
//                         type="file"
//                         name="image"
//                         accept="image/*"
//                         onChange={handleInputChange}
//                         autoComplete="off"
//                         className="w-full p-2 mb-2 border rounded-md"
//                     />
//                     <div className="flex justify-between">
//                         <button
//                             type="button"
//                             className="bg-orange-100 hover:bg-orange-200 text-orange-600 font-bold py-2 px-4 rounded-full w-72 mt-1 mx-auto"
//                             onClick={handleEdit}
//                         >
//                             Save
//                         </button>
//                     </div>
//                 </form>
//             </div>
//             );
//         </div>
//     );
// };


// const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
//     if (!isOpen) return null;

//     return (
//         <div
//             className="fixed inset-0 flex items-center justify-center z-50 font-sans "
//             style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//         >
//             <div
//                 className="modal-container border border-red-600 bg-white w-96 p-6 rounded shadow-lg "
//                 onClick={(e) => e.stopPropagation()}
//             >

//                 <p className="text-lg text-red-600 ">
//                     Do you want to delete this Menu ?
//                 </p>
//                 <div className="flex justify-end mt-4">
//                     <button
//                         className=" bg-red-200  hover:bg-red-300 text-red-700 font-bold py-2 px-4 rounded-full mr-2"
//                         onClick={onConfirm}
//                     >
//                         Yes
//                     </button>
//                     <button
//                         className=" bg-slate-300  hover:bg-slate-200 text-slate-700 font-bold py-2 px-4 rounded-full "
//                         onClick={onCancel}
//                     >
//                         No
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const BarList = () => {
//     const [menus, setMenus] = useState([]);
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//     const [menuToDelete, setMenuToDelete] = useState(null);
//     const [mainCategories, setMainCategories] = useState([]); // Added state for main categories
//     const [pageNumber, setPageNumber] = useState(0);
//     const [completeImageUrl, setPreviewImageUrl] = useState("");
//     const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
//     const router = useRouter();
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [menuToEdit, setMenuToEdit] = useState(null);
//     const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//     const [menuToView, setMenuToView] = useState(null);
//     const [file, setFile] = useState(null);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [isExcelUploadOpen, setIsExcelUploadOpen] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
//     const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
//     const [imageUrl, setImageUrl] = useState('');
//     const [selectedImage, setSelectedImage] = useState(null);



//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]);
//     };

//     const filterMenus = () => {
//         const regex = new RegExp(searchQuery, 'i');

//         return menus.filter((menu) => {
//             const lowerCaseName = menu.name?.toLowerCase() || "";
//             const lowerCaseUniqueId = menu.barSubmenuId ? menu.barSubmenuId.toString().toLowerCase() : "";

//             return (
//                 regex.test(lowerCaseName) ||
//                 regex.test(lowerCaseUniqueId)
//             );
//         });
//     };


//     const exportToExcel = (isExportMenu) => {
//         // Create an empty worksheet
//         const ws = XLSX.utils.aoa_to_sheet([['name', 'pricePer1Bottle', 'pricePer30ml', 'pricePer60ml', 'pricePer90ml', 'pricePer120ml', 'pricePer150ml', 'pricePer180ml', 'pricePer375ml', 'pricePer650ml', ' pricePer750ml', 'pricePer1000ml', 'stockLimit', 'sizeMl', 'barSubmenuId']]);

//         // Check if exporting menu data
//         if (isExportMenu) {
//             // Add menu data to the worksheet (assuming menus is an array of menu objects)
//             menus.forEach((menu, index) => {
//                 const menuData = [menu.name, menu.pricePer1Bottle, menu.pricePer30ml, menu.pricePer60ml, menu.pricePer90ml, menu.pricePer120ml, menu.pricePer150ml, menu.pricePer180ml, menu.pricePer375ml, menu.pricePer650ml, menu.pricePer750ml, menu.pricePer1000ml, menu.stockLimit, menu.sizeMl, menu.barSubmenuId];
//                 XLSX.utils.sheet_add_aoa(ws, [menuData], { origin: index + 1 });
//             });
//         }

//         // Set the column width for the 'name' and 'price' columns (1-based index)
//         ws['!cols'] = [{ wch: 20 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }]; // Adjust the width (20 is just an example)

//         // Create an empty workbook
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, isExportMenu ? 'Menus' : 'BlankSheet');

//         // Generate a binary string from the workbook
//         const wbBinary = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

//         // Convert the binary string to a Blob
//         const blob = new Blob([s2ab(wbBinary)], { type: 'application/octet-stream' });

//         // Create a download link and trigger the download
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = isExportMenu ? 'menus.xlsx' : 'blanksheet.xlsx';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     // Helper function to convert a string to an ArrayBuffer
//     const s2ab = (s) => {
//         const buf = new ArrayBuffer(s.length);
//         const view = new Uint8Array(buf);
//         for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
//         return buf;
//     };

//     const handleEdit = (menu) => {
//         setMenuToEdit(menu);
//         setIsEditModalOpen(true);
//     };

//     const [isNewModalOpen, setIsNewModalOpen] = useState(false);
//     const [newMenuData, setNewMenuData] = useState({
//         name: "",
//         price: "",
//         image: null, // Add the image field
//         // mainCategoryId: "",
//     });

//     const handleDelete = (menu) => {
//         // Set the menu to be deleted in the state
//         setMenuToDelete(menu);
//         // Open the delete confirmation modal
//         setIsDeleteModalOpen(true);
//     };

//     const confirmDelete = async () => {
//         try {
//             // Proceed with the delete operation
//             const response = await axios.delete(
//                 `http://localhost:5000/api/liquorBrand/barSubmenu/${menuToDelete._id}`
//             );
//             console.log("Menu deleted successfully:", response.data);

//             // Update the menus state by filtering out the deleted menu
//             setMenus((prevMenus) =>
//                 prevMenus.filter((m) => m._id !== menuToDelete._id)
//             );

//             // Close the delete confirmation modal
//             setIsDeleteModalOpen(false);
//             // Clear the menu to be deleted from the state
//             setMenuToDelete(null);
//         } catch (error) {
//             console.error("Error deleting menu:", error);
//         }
//     };

//     const cancelDelete = () => {
//         // Close the delete confirmation modal without deleting
//         setIsDeleteModalOpen(false);
//         // Clear the menu to be deleted from the state
//         setMenuToDelete(null);
//     };


//     const handleInputChange = (e) => {
//         const { name, value, type, files } = e.target;

//         // If the input is a file (image input), set the image field in a different way
//         if (type === "file") {
//             setNewMenuData((prevData) => ({
//                 ...prevData,
//                 [name]: files[0], // Assuming you only want to handle one file
//             }));
//         } else {
//             setNewMenuData((prevData) => ({
//                 ...prevData,
//                 [name]: capitalizeFirstLetter(value),
//             }));
//         }
//     };
//     const capitalizeFirstLetter = (input) => {
//         return input.charAt(0).toUpperCase() + input.slice(1);
//     };

//     const openExcelUpload = () => {
//         setIsExcelUploadOpen(true);
//     };

//     const closeExcelUpload = () => {
//         setIsExcelUploadOpen(false);
//     };

//     const [errorMessage, setErrorMessage] = useState(null);


//     const addNewMenu = async () => {
//         // Validation: Check if name or price is empty
//         if (!newMenuData.name || !newMenuData.pricePer1Bottle) {
//             setErrorMessage("Name and Price are required.");
//             setTimeout(() => {
//                 setErrorMessage(null);
//             }, 2000);
//             return;
//         }

//         try {
//             const formData = new FormData();
//             formData.append("name", newMenuData.name);
//             formData.append("price1", newMenuData.pricePer1Bottle);
//             formData.append("price30", newMenuData.pricePer30ml);
//             formData.append("price60", newMenuData.pricePer60ml);
//             formData.append("price90", newMenuData.pricePer90ml);
//             formData.append("price120", newMenuData.pricePer120ml);
//             formData.append("price150", newMenuData.pricePer150ml);
//             formData.append("price180", newMenuData.pricePer180ml);
//             formData.append("price375", newMenuData.pricePer375ml);
//             formData.append("price650", newMenuData.pricePer650ml);
//             formData.append("price750", newMenuData.pricePer750ml);
//             formData.append("price1000", newMenuData.pricePer1000ml);
//             formData.append("stockLimit", newMenuData.stockLimit);
//             formData.append("sizeMl", newMenuData.sizeMl);
//             formData.append("liquorCategory", newMenuData.liquorCategory);
//             formData.append("barSubmenuId", newMenuData.barSubmenuId);
//             formData.append("image", newMenuData.image);

//             const response = await axios.post(
//                 "http://localhost:5000/api/liquorBrand/barSubmenu",
//                 formData
//             );

//             console.log("Menu added successfully:", response.data);

//             setMenus((prevMenus) => [...prevMenus, response.data]);

//             setNewMenuData({
//                 name: "",
//                 pricePer1Bottle: "",
//                 pricePer30ml: "",
//                 pricePer60ml: "",
//                 pricePer90ml: "",
//                 pricePer120ml: "",
//                 pricePer150ml: "",
//                 pricePer180ml: "",
//                 pricePer375ml: "",
//                 pricePer650ml: "",
//                 pricePer750ml: "",
//                 pricePer1000ml: "",
//                 stockLimit: "",
//                 sizeMl: "",
//                 menuName: "",
//                 barSubmenuId: "",
//                 liquorCategory: "",
//                 imageUrl: null,
//             });


//             // setIsNewModalOpen(false);
//             setIsSuccessModalOpen(true);
//             setTimeout(() => {
//                 setIsSuccessModalOpen(null);
//                 setIsNewModalOpen(false);
//             }, 2000);

//             setErrorMessage(null);
//         } catch (error) {
//             console.error("Error adding menu:", error);

//             let errorMessage = "Error adding menu. Please try again later.";

//             if (error.response && error.response.status === 400) {
//                 const specificErrorMessage = error.response.data.message;

//                 if (specificErrorMessage) {
//                     if (specificErrorMessage.includes("uniqueId")) {
//                         if (/[a-zA-Z]/.test(newMenuData.uniqueId)) {
//                             errorMessage = "Menu ID should be a numeric value.";
//                         } else {
//                             errorMessage = "Menu ID is already taken.";
//                         }
//                     }
//                 }
//             }

//             setErrorMessage(errorMessage);

//             setTimeout(() => {
//                 setErrorMessage(null);
//             }, 2000);

//             setIsErrorModalOpen(true);

//             setTimeout(() => {
//                 setIsErrorModalOpen(false);
//             }, 2000);
//         }
//     };

//     useEffect(() => {
//         const fetchMenus = async () => {
//             try {
//                 const response = await axios.get(
//                     "http://localhost:5000/api/liquorBrand/barSubmenu/list"
//                 );
//                 setMenus(response.data);
//             } catch (error) {
//                 console.error("Error fetching menus:", error);
//             }
//         };

//         fetchMenus();
//     }, []);

//     const handleFileUpload = async () => {
//         try {
//             if (!file) {
//                 console.error("No file selected");
//                 return;
//             }

//             const formData = new FormData();
//             formData.append("file", file);

//             // Make a POST request to the backend endpoint
//             const response = await axios.post(
//                 "http://localhost:5000/api/liquorBrand/upload-excel",
//                 formData
//             );

//             console.log(response.data); // Handle the response data as needed
//         } catch (error) {
//             console.error("Error uploading file:", error.message);
//         }
//     };
//     const menusPerPage = 10; // Change this to set the number of menus per page

//     const pageCount = Math.ceil(menus.length / menusPerPage);

       
//     // Use the getChildMenuPrice function to display child menu prices
// // const displayMenus = filterMenus()
// // .slice(pageNumber * menusPerPage, (pageNumber + 1) * menusPerPage)
// // .map((menu, index) => (
// //   <tr
// //     key={menu._id}
// //     className={index % 2 === 0 ? "bg-white" : "bg-gray-100 "}
// //   >
// //     <td className="p-2  text-center text-gray ">
// //       {pageNumber * menusPerPage + index + 1}
// //     </td>
// //     <td className="text-left text-gray lg:pl-10 pl-4">{menu.name}</td>
// //     <td className="text-left pl-8">
// //       {menu.imageUrl ? (
// //         <img
// //           src={`http://localhost:5000/${menu.imageUrl}`}
// //           width={50}
// //           height={50}
// //           alt="Menu Image"
// //           className="max-w-full max-h-32 rounded-md shadow-md"
// //         />
// //       ) : (
// //         "No Image"
// //       )}
// //     </td>
// //     <td className="p-2 text-center text-gray text-orange-400">{menu.barSubmenuId}</td>
// //     <td className="p-2  text-center text-gray">{menu.pricePer1Bottle}</td>
// //     {/* Display child menu prices */}
// //     <td className="p-2  text-center text-gray">{menu.childMenus.find(child => child.barCategory === '30ml')?.pricePer30ml || 0}</td>
// //     <td className="p-2  text-center text-gray">{menu.childMenus.find(child => child.barCategory === '60ml')?.pricePer60ml || 0}</td>
// //     <td className="p-2  text-center text-gray">{menu.childMenus.find(child => child.barCategory === '90ml')?.pricePer90ml || 0}</td>
// //     <td className="p-2  text-center text-gray">{menu.childMenus.find(child => child.barCategory === '120ml')?.pricePer120ml || 0}</td>
// //     <td className="p-2  text-center text-gray">{menu.childMenus.find(child => child.barCategory === '150ml')?.pricePer150ml || 0}</td>
// //     <td className="p-2  text-center text-gray">{menu.childMenus.find(child => child.barCategory === '180ml')?.pricePer180ml || 0}</td>
// //     <td className="p-2  text-center text-gray">{menu.childMenus.find(child => child.barCategory === '375ml')?.pricePer375ml || 0}</td>
// //     <td className="p-2  text-center text-gray">{menu.childMenus.find(child => child.barCategory === '650ml')?.pricePer650ml || 0}</td>
// //     <td className="p-2  text-center text-gray">{menu.childMenus.find(child => child.barCategory === '750ml')?.pricePer750ml || 0}</td>
// //     <td className="p-2  text-center text-gray">{menu.childMenus.find(child => child.barCategory === '1000ml')?.pricePer1000ml || 0}</td>
// //     <td className="p-2  text-center text-gray">{menu.stockQty}</td>
// //     <td className="p-2  text-center text-gray">{"-"}</td>
// //     <td className="p-2  text-center text-gray">{"-"}</td>


// //     <td className="py-1 text-center">
// //       <button
// //         className="text-gray-600 mr-3 focus:outline-none font-sans font-medium p-1 rounded-full px-2 text-sm shadow-md" style={{ background: "#ffff", }}
// //         onClick={() => handleEdit(menu)}
// //       >
// //         <FontAwesomeIcon
// //           icon={faPenToSquare}
// //           color="orange"
// //           className="cursor-pointer"
// //         />{" "}
// //       </button>
// //       <button
// //         className="text-gray-600 mr-3 font-sans focus:outline-none font-medium p-1 rounded-full px-2 text-sm shadow-md" style={{ background: "#ffff", }}
// //         onClick={() => handleDelete(menu)}
// //       >
// //         <FontAwesomeIcon
// //           icon={faTrash}
// //           color="red"
// //           className="cursor-pointer"
// //         />{" "}
// //       </button>
// //     </td>
// //   </tr>
// // ));

// const displayMenus = filterMenus()
//   .slice(pageNumber * menusPerPage, (pageNumber + 1) * menusPerPage)
//   .map((menu, index) => (
//     <tr
//       key={menu._id.$oid}
//       className={index % 2 === 0 ? "bg-white" : "bg-gray-100 "}
//     >
//       <td className="p-2  text-center text-gray ">
//         {pageNumber * menusPerPage + index + 1}
//       </td>
//       <td className="text-left text-gray lg:pl-10 pl-4">{menu.name}</td>
//       <td className="text-left pl-8">
//         {menu.imageUrl ? (
//           <img
//             src={`http://localhost:5000/${menu.imageUrl}`}
//             width={50}
//             height={50}
//             alt="Menu Image"
//             className="max-w-full max-h-32 rounded-md shadow-md"
//           />
//         ) : (
//           "No Image"
//         )}
//       </td>
//       <td className="p-2 text-center text-gray text-orange-400">{menu.barSubmenuId}</td>
//       {/* <td className="p-2  text-center text-gray">{menu.pricePer?.pricePer1Bottle || 0}</td> */}
//       {/* Display child menu prices */}
//       {menu.childMenus.map(childMenu => (
//         <td key={childMenu._id?.$oid} className="p-2  text-center text-gray">
//           {/* Access price from pricePer object */}
//           {childMenu.pricePer ? childMenu.pricePer[`pricePer${childMenu.barCategory}`] || 0 : 0}
//         </td>
//       ))}
//       <td className="p-2  text-center text-gray">{menu.stockQty}</td>
//       <td className="p-2  text-center text-gray">{"-"}</td>
//       <td className="p-2  text-center text-gray">{"-"}</td>
//       <td className="py-1 text-center">
//         <button
//           className="text-gray-600 mr-3 focus:outline-none font-sans font-medium p-1 rounded-full px-2 text-sm shadow-md" style={{ background: "#ffff", }}
//           onClick={() => handleEdit(menu)}
//         >
//           <FontAwesomeIcon
//             icon={faPenToSquare}
//             color="orange"
//             className="cursor-pointer"
//           />{" "}
//         </button>
//         <button
//           className="text-gray-600 mr-3 font-sans focus:outline-none font-medium p-1 rounded-full px-2 text-sm shadow-md" style={{ background: "#ffff", }}
//           onClick={() => handleDelete(menu)}
//         >
//           <FontAwesomeIcon
//             icon={faTrash}
//             color="red"
//             className="cursor-pointer"
//           />{" "}
//         </button>
//       </td>
//     </tr>
//   ));

 
//     // const displayMenus = filterMenus()
//     //     .slice(pageNumber * menusPerPage, (pageNumber + 1) * menusPerPage)
//     //     .map((menu, index) => (
//     //         <tr
//     //             key={menu._id}
//     //             className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100 '}
//     //         >
//     //             <td className="p-2  text-center text-gray ">
//     //                 {pageNumber * menusPerPage + index + 1}
//     //             </td>
//     //             <td className="text-left text-gray lg:pl-10 pl-4">{menu.name}</td>
//     //             <td className="text-left pl-8">
//     //                 {menu.imageUrl ? (
//     //                     <img
//     //                         src={`http://localhost:5000/${menu.imageUrl}`}
//     //                         width={50}
//     //                         height={50}
//     //                         alt="Menu Image"
//     //                         className="max-w-full max-h-32 rounded-md shadow-md"
//     //                     />
//     //                 ) : (
//     //                     "No Image"
//     //                 )}
//     //             </td>
//     //             <td className="p-2 text-center text-gray text-orange-400">{menu.barSubmenuId}</td>
//     //             <td className="p-2  text-center text-gray">{menu.pricePer1Bottle}</td>
//     //             <td className="p-2  text-center text-gray">{menu.pricePer30ml}</td>
//     //             <td className="p-2  text-center text-gray">{menu.pricePer60ml}</td>
//     //             <td className="p-2  text-center text-gray">{menu.pricePer90ml}</td>
//     //             <td className="p-2  text-center text-gray">{menu.pricePer120ml}</td>
//     //             <td className="p-2  text-center text-gray">{menu.pricePer150ml}</td>
//     //             <td className="p-2  text-center text-gray">{menu.pricePer180ml}</td>
//     //             <td className="p-2  text-center text-gray">{menu.pricePer375ml}</td>
//     //             <td className="p-2  text-center text-gray">{menu.pricePer650ml}</td>
//     //             <td className="p-2  text-center text-gray">{menu.pricePer750ml}</td>
//     //             <td className="p-2  text-center text-gray">{menu.pricePer1000ml}</td>
//     //             <td className="p-2  text-center text-gray">{menu.stockLimit}</td>
//     //             <td className="p-2  text-center text-gray">{menu.sizeMl}</td>
//     //             <td className="p-2  text-center text-gray">{menu.liquorCategory}</td>


//     //             <td className="py-1 text-center">
//     //                 <button
//     //                     className="text-gray-600 mr-3 focus:outline-none font-sans font-medium p-1 rounded-full px-2 text-sm shadow-md" style={{ background: "#ffff", }}
//     //                     onClick={() => handleEdit(menu)}
//     //                 >
//     //                     <FontAwesomeIcon
//     //                         icon={faPenToSquare}
//     //                         color="orange"

//     //                         className="cursor-pointer"
//     //                     />{" "}

//     //                 </button>
//     //                 <button
//     //                     className="text-gray-600 mr-3 font-sans focus:outline-none font-medium p-1 rounded-full px-2 text-sm shadow-md" style={{ background: "#ffff", }}
//     //                     onClick={() => handleDelete(menu)}
//     //                 >
//     //                     <FontAwesomeIcon
//     //                         icon={faTrash}
//     //                         color="red"
//     //                         className="cursor-pointer"
//     //                     />{" "}

//     //                 </button>
//     //             </td>
//     //         </tr>
//     //     ));

//     const home = () => {
//         router.push("/dashboard");
//     };

//     const modalContent = (
//         <div
//             className="modal-container bg-white p-6 rounded-md shadow-md relative font-sans w-3/4"
//             onClick={(e) => e.stopPropagation()}
//         >
//             <button
//                 onClick={() => setIsNewModalOpen(false)}
//                 className="absolute top-4 right-4 bg-red-100 text-red-600 hover:bg-red-200 p-2 py-1 rounded-full text-center"
//             >
//                 <FontAwesomeIcon icon={faTimes} size="lg" />
//             </button>
//             <div className="p-1 text-left">
//                 <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-gray-400 text-left">
//                     Add New Menu
//                 </h3>
//                 {errorMessage && (
//                     <div className="fixed inset-0 flex items-center justify-center">
//                         <div className="bg-white rounded p-7 shadow-md z-50 absolute">
//                             <p className="text-red-500 font-semibold text-center text-xl">{errorMessage}</p>
//                         </div>
//                     </div>
//                 )}
//                 {isSuccessModalOpen && (
//                     <div className="fixed inset-0 flex items-center justify-center">
//                         <div className="bg-white border border-green-500 rounded p-7 shadow-md z-50 absolute">
//                             <p className="text-green-500 font-semibold text-center text-xl">
//                                 Menu added successfully!
//                             </p>
//                         </div>
//                     </div>
//                 )}
//                 <form>
//                     <div className="flex">
//                         <div className="flex flex-col mr-4">
//                             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Menu Name</label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={newMenuData.name}
//                                 autoComplete="off"
//                                 onChange={handleInputChange}
//                                 className="w-96 p-2 mb-4 border rounded-md"
//                                 required
//                             />
//                         </div>
//                         <div className="flex flex-col ml-64">
//                             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">BarId</label>
//                             <input
//                                 type="number"
//                                 name="barSubmenuId"
//                                 value={newMenuData.barSubmenuId}
//                                 onChange={handleInputChange}
//                                 autoComplete="off"
//                                 className="w-60 p-2 mb-4 border rounded-md"
//                                 min={0}
//                             />
//                         </div>
//                     </div>
//                     <div className="flex justify-between">
//                         <div className="flex flex-col">
//                             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Price of 1Bottle</label>
//                             <input
//                                 type="number"
//                                 name="pricePer1Bottle"
//                                 value={newMenuData.pricePer1Bottle}
//                                 onChange={handleInputChange}
//                                 autoComplete="off"
//                                 className="w-44 p-2 mb-4 border rounded-md"
//                                 required
//                             />
//                         </div>
//                         <div className="flex flex-col">
//                             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Price30</label>
//                             <input
//                                 type="number"
//                                 name="price30"
//                                 value={newMenuData.pricePer30ml}
//                                 onChange={handleInputChange}
//                                 autoComplete="off"
//                                 className="w-44 p-2 mb-4 border rounded-md"
//                                 required
//                             />
//                         </div>
//                         <div className="flex flex-col">
//                             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Price60</label>
//                             <input
//                                 type="number"
//                                 name="price60"
//                                 value={newMenuData.pricePer60ml}
//                                 onChange={handleInputChange}
//                                 autoComplete="off"
//                                 className="w-44 p-2 mb-4 border rounded-md"
//                                 required
//                             />
//                         </div>
//                         <div className="flex flex-col">
//                             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Price90</label>
//                             <input
//                                 type="number"
//                                 name="price90"
//                                 value={newMenuData.pricePer90ml}
//                                 onChange={handleInputChange}
//                                 autoComplete="off"
//                                 className="w-44 p-2 mb-4 border rounded-md"
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <div className="flex justify-between">
//                         <div className="flex flex-col">
//                             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Price120</label>
//                             <input
//                                 type="number"
//                                 name="price120"
//                                 value={newMenuData.pricePer120ml}
//                                 onChange={handleInputChange}
//                                 autoComplete="off"
//                                 className="w-44 p-2 mb-4 border rounded-md"
//                                 required
//                             />
//                         </div>
//                         <div className="flex flex-col">
//                             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Price150</label>
//                             <input
//                                 type="number"
//                                 name="price150"
//                                 value={newMenuData.pricePer150ml}
//                                 onChange={handleInputChange}
//                                 autoComplete="off"
//                                 className="w-44 p-2 mb-4 border rounded-md"
//                                 required
//                             />
//                         </div>
//                         <div className="flex flex-col">
//                             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Price180</label>
//                             <input
//                                 type="number"
//                                 name="price180"
//                                 value={newMenuData.pricePer180ml}
//                                 onChange={handleInputChange}
//                                 autoComplete="off"
//                                 className="w-44 p-2 mb-4 border rounded-md"
//                                 required
//                             />
//                         </div>
//                         <div className="flex flex-col">
//                             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Price375</label>
//                             <input
//                                 type="number"
//                                 name="price375"
//                                 value={newMenuData.pricePer375ml}
//                                 onChange={handleInputChange}
//                                 autoComplete="off"
//                                 className="w-44 p-2 mb-4 border rounded-md"
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <div className="flex justify-between">
//                         <div className="flex flex-col">
//                             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Price650</label>
//                             <input
//                                 type="number"
//                                 name="price650"
//                                 value={newMenuData.pricePer650ml}
//                                 onChange={handleInputChange}
//                                 autoComplete="off"
//                                 className="w-44 p-2 mb-4 border rounded-md"
//                                 required
//                             />
//                         </div>
//                         <div className="flex flex-col">
//                             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Price750</label>
//                             <input
//                                 type="number"
//                                 name="price750"
//                                 value={newMenuData.pricePer750ml}
//                                 onChange={handleInputChange}
//                                 autoComplete="off"
//                                 className="w-44 p-2 mb-4 border rounded-md"
//                                 required
//                             />
//                         </div>
//                         <div className="flex flex-col">
//                             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Price1000</label>
//                             <input
//                                 type="number"
//                                 name="price1000"
//                                 value={newMenuData.pricePer1000ml}
//                                 onChange={handleInputChange}
//                                 autoComplete="off"
//                                 className="w-44 p-2 mb-4 border rounded-md"
//                                 required
//                             />
//                         </div>
//                         <div className="flex flex-col">
//                             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">StockLimit</label>
//                             <input
//                                 type="number"
//                                 name="stockLimit"
//                                 value={newMenuData.stockLimit}
//                                 onChange={handleInputChange}
//                                 autoComplete="off"
//                                 className="w-44 p-2 mb-4 border rounded-md"
//                                 required
//                             />
//                         </div>
//                         <div className="flex flex-col">
//                             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">SizeMl</label>
//                             <input
//                                 type="text"
//                                 name="sizeMl"
//                                 value={newMenuData.sizeMl}
//                                 onChange={handleInputChange}
//                                 autoComplete="off"
//                                 className="w-44 p-2 mb-4 border rounded-md"
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
//                         Image
//                     </label>
//                     <input
//                         type="file"
//                         name="image"
//                         accept="image/*"
//                         onChange={handleInputChange}
//                         autoComplete="off"
//                         className="w-full p-2 mb-4 border rounded-md"
//                     />
//                     <div className="flex justify-between">
//                         <button
//                             type="button"
//                             className=" bg-orange-100 text-orange-600 hover:bg-orange-200 text-gray font-semibold p-2 px-4 rounded-full mt-4 w-72 mx-auto"
//                             onClick={addNewMenu}
//                         >
//                             Add Menu
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );

//     return (
//         <>

//             <DeleteConfirmationModal
//                 isOpen={isDeleteModalOpen}
//                 onCancel={cancelDelete}
//                 onConfirm={confirmDelete}
//             />


//             <div className="container mx-auto p-2 mt-12 overflow-x-auto  border-gray-300 shadow-md font-sans max-w-7xl">
//                 <div className="flex flex-col md:flex-row items-center justify-between mb-4">
//                     <h1 className="text-xl font-bold font-sans mb-2 md:mb-0 text-orange-600">Sub-Menu List</h1>
//                     <div className="flex flex-col md:flex-row items-center">
//                         <div className="relative mb-2 md:mb-0 md:mr-3">
//                             <input
//                                 className="border-2 border-gray-300 pl-2 rounded-full bg-white h-9 text-sm focus:outline-non"
//                                 id="searchInput"
//                                 type="text"
//                                 name="searchInput"
//                                 placeholder="Search"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                             />
//                             <button type="submit" className="absolute right-0 mr-2 top-1">
//                                 <FontAwesomeIcon icon={faSearch} className="text-gray-700" />
//                             </button>
//                         </div>
//                         <div className="flex justify-between">
//                             <button
//                                 className="text-orange-600 font-bold py-1 rounded-full text-sm bg-orange-100 mr-2 px-2 shadow-md"
//                                 onClick={() => exportToExcel(true)}
//                             >
//                                 <FontAwesomeIcon icon={faDownload} className="mr-1" />
//                                 Export
//                             </button>
//                             <button
//                                 className="text-orange-600 font-bold py-1 rounded-full text-sm bg-orange-100 mr-2 px-2 shadow-md"
//                                 onClick={openExcelUpload}
//                             >
//                                 <FontAwesomeIcon icon={faUpload} className="mr-1" />
//                                 Import
//                             </button>
//                             <button
//                                 className="text-orange-600 font-bold py-1 rounded-full text-sm bg-orange-100 mr-2 px-2 shadow-md"
//                                 onClick={() => exportToExcel(false)}
//                             >
//                                 <FontAwesomeIcon icon={faDownload} className="mr-1" />
//                                 Sample
//                             </button>
//                             <button
//                                 className="text-orange-600 font-bold py-1 rounded-full text-sm bg-orange-100 mr-2 px-2 shadow-md"
//                                 onClick={() => setIsNewModalOpen(true)}
//                             >
//                                 <FontAwesomeIcon icon={faPlus} className="mr-1" />
//                                 Add
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 <table className=" max-w-5xl mx-auto mt-4">
//                     <thead className="text-base bg-zinc-100 text-yellow-700 border">
//                         <tr>
//                             <th className="p-2 whitespace-nowrap">Sr No.</th>
//                             <th className="text-left text-gray lg:pl-10 pl-4">Menu Name</th>
//                             <th className="text-left pl-8">Image</th>
//                             <th className="p-2 pl-4">MenuID</th>
//                             <th className="p-2 pl-4">Price</th>
//                             <th className="p-2 border">Price30</th>
//                             <th className="p-2 border">Price60</th>
//                             <th className="p-2 border">Price90</th>
//                             <th className="p-2 border">Price120</th>
//                             <th className="p-2 border">Price150</th>
//                             <th className="p-2 border">Price180</th>
//                             <th className="p-2 border">Price375</th>
//                             <th className="p-2 border">Price650</th>
//                             <th className="p-2 border">Price750</th>
//                             <th className="p-2 border">Price1000</th>
//                             <th className="p-2 border">Stock Limit</th>
//                             <th className="p-2 border">Size Ml</th>
//                             <th className="p-2 border">Liquor Category</th>
//                             <th className="p-2 text-center">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="text-md font-sans font-bold">{displayMenus}</tbody>
//                 </table>

//                 <div className="flex flex-col items-center mt-1">
//                     <span className="text-xs text-gray-700 dark:text-gray-400">
//                         Showing{" "}
//                         <span className="font-semibold text-gray-900 dark:text-white">
//                             {pageNumber * menusPerPage + 1}
//                         </span>{" "}
//                         to{" "}
//                         <span className="font-semibold text-gray-900 dark:text-white">
//                             {Math.min((pageNumber + 1) * menusPerPage, menus.length)}
//                         </span>{" "}
//                         of{" "}
//                         <span className="font-semibold text-gray-900 dark:text-white">
//                             {menus.length}
//                         </span>{" "}
//                         Menus
//                     </span>
//                     <div className="inline-flex mt-1 xs:mt-0">
//                         <button
//                             className={`${pageNumber === 0
//                                 ? "opacity-50 cursor-not-allowed"
//                                 : "hover:bg-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
//                                 } flex items-center justify-center px-3 h-8 text-xs font-medium text-white bg-gray-800 border-gray-700 rounded-s`}
//                             onClick={() => setPageNumber((prev) => Math.max(prev - 1, 0))}
//                             disabled={pageNumber === 0}
//                         >
//                             <FontAwesomeIcon icon={faAnglesLeft} />
//                         </button>
//                         <button
//                             className={`${pageNumber === pageCount - 1
//                                 ? "opacity-50 cursor-not-allowed"
//                                 : "hover:bg-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
//                                 } flex items-center justify-center px-3 h-8 text-xs font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e`}
//                             onClick={() =>
//                                 setPageNumber((prev) => Math.min(prev + 1, pageCount - 1))
//                             }
//                             disabled={pageNumber === pageCount - 1}
//                         >
//                             <FontAwesomeIcon icon={faAnglesRight} />
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {isPreviewModalOpen && (
//                 <div
//                     className="font-sans fixed inset-0 flex items-center justify-center z-50 m-1"
//                     style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//                 >
//                     <div
//                         className="modal-container bg-white w-72 p-6 rounded shadow-lg"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <button
//                             type="button"
//                             className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                             onClick={() => setIsPreviewModalOpen(false)}
//                         ></button>
//                         <div className="p-1 text-center">
//                             <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-gray-400">
//                                 Image Preview
//                             </h3>
//                             <Image
//                                 src={completeImageUrl}
//                                 alt="Preview"
//                                 width={500}
//                                 height={500}
//                             />
//                             <button
//                                 type="button"
//                                 className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded-full mt-4 mr-2"
//                                 onClick={() => setIsPreviewModalOpen(false)}
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {isNewModalOpen && (
//                 <div
//                     className="font-sans fixed inset-0 flex items-center justify-center z-50 m-1"
//                     style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//                 >
//                     {modalContent}
//                 </div>
//             )}

//             {isEditModalOpen && (
//                 <EditModal
//                     isOpen={isEditModalOpen}
//                     onCancel={() => {
//                         setIsEditModalOpen(false);
//                         setMenuToEdit(null);
//                     }}
//                     onEdit={(editedMenu) => {
//                         // Update the menus state with the edited menu
//                         setMenus((prevMenus) =>
//                             prevMenus.map((menu) =>
//                                 menu._id === editedMenu._id ? editedMenu : menu
//                             )
//                         );
//                     }}
//                     menuToEdit={menuToEdit}
//                     mainCategories={mainCategories}
//                 />
//             )}

//             {isExcelUploadOpen && (
//                 <div className="font-sans fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
//                     <div className="bg-white p-8 rounded shadow-md max-w-md relative">
//                         <button
//                             onClick={closeExcelUpload}
//                             className="absolute top-4 right-4 bg-red-100 text-red-600 hover:bg-red-200 p-2 py-1 rounded-full text-center"
//                         >
//                             <FontAwesomeIcon icon={faTimes} size="lg" />
//                         </button>
//                         <h1 className="text-2xl font-semibold mb-6">Upload Excel File</h1>
//                         <input
//                             type="file"
//                             onChange={handleFileChange}
//                             className="mb-4 p-3 border border-gray-300 rounded w-full"
//                         />
//                         <button
//                             onClick={() => {
//                                 handleFileUpload();
//                                 closeExcelUpload();
//                             }}
//                             className="bg-orange-100 text-orange-600 p-3 rounded-full w-full hover:bg-orange-200 font-semibold"
//                         >
//                             Upload To Excel
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default BarList;



"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faSearch, faHouse, faPenToSquare, faPlus, faTrash, faAnglesLeft, faAnglesRight, faUpload, faTimes, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const EditModal = ({ isOpen, onCancel, onEdit, menuToEdit }) => {
    const [editedMenuData, setEditedMenuData] = useState({
        name: menuToEdit?.name || "",
        price: menuToEdit?.price || "",
        uniqueId: menuToEdit?.uniqueId || "",
        image: null,
        // mainCategoryId: menuToEdit?.mainCategory._id || "",
    });
    const [existingImage, setExistingImage] = useState(null);
    // const [selectedImage, setSelectedImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let timeoutId;

        if (errorMessage) {
            timeoutId = setTimeout(() => {
                setErrorMessage("");
            }, 2000);
        }

        return () => {
            // Cleanup the timeout when the component is unmounted or the error message changes
            clearTimeout(timeoutId);
        };
    }, [errorMessage]);

    useEffect(() => {
        // Fetch the existing image when the menuToEdit changes
        if (menuToEdit) {
            setExistingImage(
                menuToEdit.imageUrl
                    ? `http://localhost:5000/${menuToEdit.imageUrl}`
                    : null
            );

            // Set other menu data
            setEditedMenuData({
                name: menuToEdit.name,
                uniqueId: menuToEdit.uniqueId,
                price: menuToEdit.price,
                image: null, // Reset the image when editing
            });
        }
    }, [menuToEdit]);



    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        // const file = files ? files[0] : null;
        // setSelectedImage(file);


        // Capitalize the first letter if the input is not a file
        const capitalizedValue = type !== "file" ? value.charAt(0).toUpperCase() + value.slice(1) : value;

        if (type === "file") {
            setEditedMenuData((prevData) => ({
                ...prevData,
                [name]: files[0],
            }));
        } else {
            setEditedMenuData((prevData) => ({
                ...prevData,
                [name]: capitalizedValue,
            }));
        }
    };
    const handleEdit = async () => {
        try {
            const formData = new FormData();
            formData.append("name", editedMenuData.name);
            formData.append("price", editedMenuData.pricePer1Bottle);
            formData.append("image", editedMenuData.image);
            formData.append("barSubmenuId", editedMenuData.barSubmenuIdId);
            // formData.append("mainCategoryId", editedMenuData.mainCategoryId);

            const response = await axios.put(
                `http://localhost:5000/api/liquorBrand/barSubmenu/${menuToEdit._id}`,
                formData
            );

            console.log("Menu updated successfully:", response.data);
            onEdit(response.data); // Update the state with the edited menu

            onCancel(); // Close the edit modal
        } catch (error) {
            console.error("Error updating menu:", error);

            if (error.response && error.response.status === 400) {
                const specificErrorMessage = error.response.data.message;

                // Ensure specificErrorMessage is defined before using includes
                if (specificErrorMessage && specificErrorMessage.includes("uniqueId")) {
                    setErrorMessage("Error adding menu. Please try again later."); // Update the error message state
                } else {
                    setErrorMessage("Menu ID is already taken"); // Update the error message state
                }
            }
        }
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center font-sans z-50 ${isOpen ? "" : "hidden"
                }`}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >

            <div
                className="modal-container lg:h-min bg-white p-6 rounded shadow-lg relative font-sans"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={() => onCancel(false)}
                    className="absolute top-4 right-2 bg-red-100 text-red-600 hover:bg-red-200 p-2 py-1 rounded-full text-center"
                >
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-gray-400">
                    Edit Menu
                </h3>
                {errorMessage && <div className="fixed inset-0 flex items-center justify-center">
                    <div className="bg-white border border-red-500 rounded p-7 shadow-md z-50 absolute">
                        <p className="text-red-500 font-semibold text-center text-xl">Menu Id Is Already Taken!
                        </p>
                    </div>
                    {errorMessage}
                </div>}
                <form>
          <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={editedMenuData.name}
            onChange={handleInputChange}
            autoComplete="off"
            className="w-full p-2 mb-2 border rounded-md"
          />
          <div className="flex space-x-4">
            <div className="flex flex-col">
              <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">
                BarId
              </label>
              <input
                type="number"
                name="barSubmenuId"
                value={editedMenuData.barSubmenuId}
                onChange={handleInputChange}
                autoComplete="off"
                className="w-full p-2 mb-4 border rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">
                Price 1Bottle
              </label>
              <input
                type="number"
                name="pricePer1Bottle"
                value={editedMenuData.pricePer1Bottle}
                onChange={handleInputChange}
                autoComplete="off"
                className="w-full p-2 mb-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">
                Price30
              </label>
              <input
                type="number"
                name="pricePer30ml"
                value={editedMenuData.pricePer30ml}
                onChange={handleInputChange}
                autoComplete="off"
                className="w-full p-2 mb-2 border rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">
                Price60
              </label>
              <input
                type="number"
                name="pricePer60ml"
                value={editedMenuData.pricePer60ml}
                onChange={handleInputChange}
                autoComplete="off"
                className="w-full p-2 mb-2 border rounded-md"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex flex-col">
              <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">
                Price90
              </label>
              <input
                type="number"
                name="pricePer90ml"
                value={editedMenuData.pricePer90ml}
                onChange={handleInputChange}
                autoComplete="off"
                className="w-full p-2 mb-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">
                Price120
              </label>
              <input
                type="number"
                name="pricePer120ml"
                value={editedMenuData.pricePer120ml}
                onChange={handleInputChange}
                autoComplete="off"
                className="w-full p-2 mb-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">
                Price150
              </label>
              <input
                type="number"
                name="pricePer150ml"
                value={editedMenuData.pricePer150ml}
                onChange={handleInputChange}
                autoComplete="off"
                className="w-full p-2 mb-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">
                Price180
              </label>
              <input
                type="number"
                name="pricePer180ml"
                value={editedMenuData.pricePer180ml}
                onChange={handleInputChange}
                autoComplete="off"
                className="w-full p-2 mb-2 border rounded-md"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex flex-col">
              <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">
                Price375
              </label>
              <input
                type="number"
                name="pricePer375ml"
                value={editedMenuData.pricePer375ml}
                onChange={handleInputChange}
                autoComplete="off"
                className="w-full p-2 mb-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">
                Price650
              </label>
              <input
                type="number"
                name="pricePer650ml"
                value={editedMenuData.pricePer650ml}
                onChange={handleInputChange}
                autoComplete="off"
                className="w-full p-2 mb-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">
                Price750
              </label>
              <input
                type="number"
                name="pricePer750ml"
                value={editedMenuData.pricePer750ml}
                onChange={handleInputChange}
                autoComplete="off"
                className="w-full p-2 mb-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">
                Price1000
              </label>
              <input
                type="number"
                name="pricePer1000ml"
                value={editedMenuData.pricePer1000ml}
                onChange={handleInputChange}
                autoComplete="off"
                className="w-full p-2 mb-2 border rounded-md"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex flex-col">
              <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">
                Stock Limit
              </label>
              <input
                type="number"
                name="stockLimit"
                value={editedMenuData.stockLimit}
                onChange={handleInputChange}
                autoComplete="off"
                className="w-full p-2 mb-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400">
                Size Ml
              </label>
              <input
                type="number"
                name="sizeMl"
                value={editedMenuData.sizeMl}
                onChange={handleInputChange}
                autoComplete="off"
                className="w-full p-2 mb-2 border rounded-md"
              />
            </div>
          </div>
          <label className="block mb-1 text-sm text-gray-600 dark:text-gray-400 ml-2">
            Previous Image
          </label>
          <div className="border border-gray-300 rounded-md mt-1 mb-1">
            {existingImage && (
              <img
                src={existingImage}
                alt="Existing Image"
                className="max-w-md max-h-20 rounded-md"
              />
            )}
          </div>
          {/* Display the selected image */}
          {/* {selectedImage && (
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Selected Image"
                            className="max-w-full max-h-32"
                        />
                    )} */}
          <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
            autoComplete="off"
            className="w-full p-2 mb-2 border rounded-md"
          />
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-orange-100 hover:bg-orange-200 text-orange-600 font-bold py-2 px-4 rounded-full w-72 mt-1 mx-auto"
              onClick={handleEdit}
            >
              Save
            </button>
          </div>
        </form>
            </div>
            );
        </div>
    );
};


const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 font-sans "
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
            <div
                className="modal-container border border-red-600 bg-white w-96 p-6 rounded shadow-lg "
                onClick={(e) => e.stopPropagation()}
            >

                <p className="text-lg text-red-600 ">
                    Do you want to delete this Menu ?
                </p>
                <div className="flex justify-end mt-4">
                    <button
                        className=" bg-red-200  hover:bg-red-300 text-red-700 font-bold py-2 px-4 rounded-full mr-2"
                        onClick={onConfirm}
                    >
                        Yes
                    </button>
                    <button
                        className=" bg-slate-300  hover:bg-slate-200 text-slate-700 font-bold py-2 px-4 rounded-full "
                        onClick={onCancel}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

const BarList = () => {
    const [menus, setMenus] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [menuToDelete, setMenuToDelete] = useState(null);
    const [mainCategories, setMainCategories] = useState([]); // Added state for main categories
    const [pageNumber, setPageNumber] = useState(0);
    const [barCategories, setBarCategories] = useState([]);
    const [completeImageUrl, setPreviewImageUrl] = useState("");
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const router = useRouter();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [menuToEdit, setMenuToEdit] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [menuToView, setMenuToView] = useState(null);
    const [file, setFile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isExcelUploadOpen, setIsExcelUploadOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);



    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const filterMenus = () => {
        const regex = new RegExp(searchQuery, 'i');

        return menus.filter((menu) => {
            const lowerCaseName = menu.name?.toLowerCase() || "";
            const lowerCaseUniqueId = menu.barSubmenuId ? menu.barSubmenuId.toString().toLowerCase() : "";

            return (
                regex.test(lowerCaseName) ||
                regex.test(lowerCaseUniqueId)
            );
        });
    };


    const exportToExcel = (isExportMenu) => {
        // Create an empty worksheet
        const ws = XLSX.utils.aoa_to_sheet([['name', 'pricePer1Bottle', 'pricePer30ml', 'pricePer60ml', 'pricePer90ml', 'pricePer120ml', 'pricePer150ml', 'pricePer180ml', 'pricePer375ml', 'pricePer650ml', ' pricePer750ml', 'pricePer1000ml', 'stockLimit', 'sizeMl', 'barSubmenuId']]);

        // Check if exporting menu data
        if (isExportMenu) {
            // Add menu data to the worksheet (assuming menus is an array of menu objects)
            menus.forEach((menu, index) => {
                const menuData = [menu.name, menu.pricePer1Bottle, menu.pricePer30ml, menu.pricePer60ml, menu.pricePer90ml, menu.pricePer120ml, menu.pricePer150ml, menu.pricePer180ml, menu.pricePer375ml, menu.pricePer650ml, menu.pricePer750ml, menu.pricePer1000ml, menu.stockLimit, menu.sizeMl, menu.barSubmenuId];
                XLSX.utils.sheet_add_aoa(ws, [menuData], { origin: index + 1 });
            });
        }

        // Set the column width for the 'name' and 'price' columns (1-based index)
        ws['!cols'] = [{ wch: 20 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }]; // Adjust the width (20 is just an example)

        // Create an empty workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, isExportMenu ? 'Menus' : 'BlankSheet');

        // Generate a binary string from the workbook
        const wbBinary = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

        // Convert the binary string to a Blob
        const blob = new Blob([s2ab(wbBinary)], { type: 'application/octet-stream' });

        // Create a download link and trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = isExportMenu ? 'menus.xlsx' : 'blanksheet.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Helper function to convert a string to an ArrayBuffer
    const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    };

    const handleEdit = (menu) => {
        setMenuToEdit(menu);
        setIsEditModalOpen(true);
    };

    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [newMenuData, setNewMenuData] = useState({
      name: "",
      stockLimit: "",
      sizeMl: "",
      liquorCategory: "",
      barSubmenuId: "",
      imageUrl: null,
      // Reset dynamic price fields
      ...barCategories.reduce((acc, category) => ({
          ...acc,
          [`pricePer${category}`]: "",
      }), {})
  });
 

    const handleDelete = (menu) => {
        // Set the menu to be deleted in the state
        setMenuToDelete(menu);
        // Open the delete confirmation modal
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            // Proceed with the delete operation
            const response = await axios.delete(
                `http://localhost:5000/api/liquorBrand/barSubmenu/${menuToDelete._id}`
            );
            console.log("Menu deleted successfully:", response.data);

            // Update the menus state by filtering out the deleted menu
            setMenus((prevMenus) =>
                prevMenus.filter((m) => m._id !== menuToDelete._id)
            );

            // Close the delete confirmation modal
            setIsDeleteModalOpen(false);
            // Clear the menu to be deleted from the state
            setMenuToDelete(null);
        } catch (error) {
            console.error("Error deleting menu:", error);
        }
    };

    const cancelDelete = () => {
        // Close the delete confirmation modal without deleting
        setIsDeleteModalOpen(false);
        // Clear the menu to be deleted from the state
        setMenuToDelete(null);
    };


    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;

        // If the input is a file (image input), set the image field in a different way
        if (type === "file") {
            setNewMenuData((prevData) => ({
                ...prevData,
                [name]: files[0], // Assuming you only want to handle one file
            }));
        } else {
            setNewMenuData((prevData) => ({
                ...prevData,
                [name]: capitalizeFirstLetter(value),
            }));
        }
    };
    const capitalizeFirstLetter = (input) => {
        return input.charAt(0).toUpperCase() + input.slice(1);
    };

    const openExcelUpload = () => {
        setIsExcelUploadOpen(true);
    };

    const closeExcelUpload = () => {
        setIsExcelUploadOpen(false);
    };

    const [errorMessage, setErrorMessage] = useState(null);


    const addNewMenu = async () => {
      // Validation: Check if name or price is empty
      if (!newMenuData.name) {
          setErrorMessage("Name and Price are required.");
          setTimeout(() => {
              setErrorMessage(null);
          }, 2000);
          return;
      }
 
      try {
          const formData = new FormData();
 
          // Append static form data
          formData.append("name", newMenuData.name);
          formData.append("stockLimit", newMenuData.stockLimit);
          formData.append("sizeMl", newMenuData.sizeMl);
          formData.append("liquorCategory", newMenuData.liquorCategory);
          formData.append("barSubmenuId", newMenuData.barSubmenuId);
          formData.append("image", newMenuData.image);
 
          // Append dynamic form data (prices)
        barCategories.forEach(category => {
          const price = newMenuData[`pricePer${category}`] || 0; // Set price to 0 if not provided
          formData.append(`pricePer${category}`, price);
      });
 
          // Make a POST request to add the new menu
          const response = await axios.post(
              "http://localhost:5000/api/liquorBrand/barSubmenu",
              formData
          );
 
          console.log("Menu added successfully:", response.data);
 
          // Reset the form data after successfully adding the menu
          setNewMenuData({
              name: "",
              stockLimit: "",
              sizeMl: "",
              liquorCategory: "",
              barSubmenuId: "",
              imageUrl: null,
              // Reset dynamic price fields
              ...barCategories.reduce((acc, category) => ({
                  ...acc,
                  [`pricePer${category}`]: "",
              }), {})
          });
 
          // Show success message
          setIsSuccessModalOpen(true);
          setTimeout(() => {
              setIsSuccessModalOpen(false);
              setIsNewModalOpen(false);
          }, 2000);
 
          setErrorMessage(null);
      } catch (error) {
          console.error("Error adding menu:", error);
 
          let errorMessage = "Error adding menu. Please try again later.";
 
          if (error.response && error.response.status === 400) {
              const specificErrorMessage = error.response.data.message;
 
              if (specificErrorMessage) {
                  if (specificErrorMessage.includes("uniqueId")) {
                      if (/[a-zA-Z]/.test(newMenuData.uniqueId)) {
                          errorMessage = "Menu ID should be a numeric value.";
                      } else {
                          errorMessage = "Menu ID is already taken.";
                      }
                  }
              }
          }
 
          // Show error message
          setErrorMessage(errorMessage);
 
          setTimeout(() => {
              setErrorMessage(null);
          }, 2000);
 
          setIsErrorModalOpen(true);
 
          setTimeout(() => {
              setIsErrorModalOpen(false);
          }, 2000);
      }
  };  
 

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/liquorBrand/barSubmenu/list"
                );
                setMenus(response.data);
            } catch (error) {
                console.error("Error fetching menus:", error);
            }
        };

        fetchMenus();
    }, []);

    useEffect(() => {
      // Fetch barCategory values from backend API when the component mounts
      axios.get("http://localhost:5000/api/liquorBrand/barCategory/list")
        .then(response => {
          // Update the barCategories state with the received values
          setBarCategories(response.data);
        })
        .catch(error => {
          console.error('Error fetching barCategory values:', error);
        });
    }, []);
   
    const handleFileUpload = async () => {
        try {
            if (!file) {
                console.error("No file selected");
                return;
            }

            const formData = new FormData();
            formData.append("file", file);

            // Make a POST request to the backend endpoint
            const response = await axios.post(
                "http://localhost:5000/api/liquorBrand/upload-excel",
                formData
            );

            console.log(response.data); // Handle the response data as needed
        } catch (error) {
            console.error("Error uploading file:", error.message);
        }
    };
    const menusPerPage = 10; // Change this to set the number of menus per page

    const pageCount = Math.ceil(menus.length / menusPerPage);

const displayMenus = filterMenus()
  .slice(pageNumber * menusPerPage, (pageNumber + 1) * menusPerPage)
  .map((menu, index) => (
    <tr
      key={menu._id.$oid}
      className={index % 2 === 0 ? "bg-white" : "bg-gray-100 "}
    >
      <td className="p-2  text-center text-gray ">
        {pageNumber * menusPerPage + index + 1}
      </td>
      <td className="text-left text-gray lg:pl-10 pl-4">{menu.name}</td>
      <td className="text-left pl-8">
        {menu.imageUrl ? (
          <img
            src={`http://localhost:5000/${menu.imageUrl}`}
            width={50}
            height={50}
            alt="Menu Image"
            className="max-w-full max-h-32 rounded-md shadow-md"
          />
        ) : (
          "No Image"
        )}
      </td>
      <td className="p-2 text-center text-gray text-orange-400">{menu.barSubmenuId}</td>
      {/* <td className="p-2  text-center text-gray">{menu.pricePer?.pricePer1Bottle || 0}</td> */}
      {/* Display child menu prices */}
      {menu.childMenus.map(childMenu => (
        <td key={childMenu._id?.$oid} className="p-2  text-center text-gray">
          {/* Access price from pricePer object */}
          {childMenu.pricePer ? childMenu.pricePer[`pricePer${childMenu.barCategory}`] || 0 : 0}
        </td>
      ))}
      <td className="p-2  text-center text-gray">{menu.stockQty}</td>
      <td className="p-2  text-center text-gray">{"-"}</td>
      <td className="p-2  text-center text-gray">{"-"}</td>
      <td className="py-1 text-center">
        <button
          className="text-gray-600 mr-3 focus:outline-none font-sans font-medium p-1 rounded-full px-2 text-sm shadow-md" style={{ background: "#ffff", }}
          onClick={() => handleEdit(menu)}
        >
          <FontAwesomeIcon
            icon={faPenToSquare}
            color="orange"
            className="cursor-pointer"
          />{" "}
        </button>
        <button
          className="text-gray-600 mr-3 font-sans focus:outline-none font-medium p-1 rounded-full px-2 text-sm shadow-md" style={{ background: "#ffff", }}
          onClick={() => handleDelete(menu)}
        >
          <FontAwesomeIcon
            icon={faTrash}
            color="red"
            className="cursor-pointer"
          />{" "}
        </button>
      </td>
    </tr>
  ));

 
    const home = () => {
        router.push("/dashboard");
    };

    const modalContent = (
        <div
            className="modal-container bg-white p-6 rounded-md shadow-md relative font-sans w-3/4"
            onClick={(e) => e.stopPropagation()}
        >
            <button
                onClick={() => setIsNewModalOpen(false)}
                className="absolute top-4 right-4 bg-red-100 text-red-600 hover:bg-red-200 p-2 py-1 rounded-full text-center"
            >
                <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
            <div className="p-1 text-left">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-gray-400 text-left">
                    Add New Menu
                </h3>
                {errorMessage && (
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="bg-white rounded p-7 shadow-md z-50 absolute">
                            <p className="text-red-500 font-semibold text-center text-xl">{errorMessage}</p>
                        </div>
                    </div>
                )}
                {isSuccessModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="bg-white border border-green-500 rounded p-7 shadow-md z-50 absolute">
                            <p className="text-green-500 font-semibold text-center text-xl">
                                Menu added successfully!
                            </p>
                        </div>
                    </div>
                )}
                       <form>
                       <div className="flex justify-between">
    <div className="flex flex-col">
        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            Menu Name
        </label>
        <input
            type="text"
            name="name"
            value={newMenuData.name}
            autoComplete="off"
            onChange={handleInputChange}
            className="w-96 p-2 mb-2 border rounded-md"
            required
        />
    </div>
    <div className="flex flex-col">
        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            BarId
        </label>
        <input
            type="number"
            name="barSubmenuId"
            value={newMenuData.barSubmenuId}
            onChange={handleInputChange}
            autoComplete="off"
            className="w-full p-2 mb-4 border rounded-md"
            min={0}
        />
    </div>
</div>
            {/* Dynamically generated input fields for each barCategory */}
            <div className="flex flex-wrap">
    {barCategories.map((category, index) => (
      <div className="flex flex-col w-1/6 mb-4 px-2" key={index}>
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                {category}
            </label>
            <input
                type="number"
                name={`pricePer${category}`}
                value={newMenuData[`pricePer${category}`]}
                onChange={handleInputChange}
                autoComplete="off"
                className="w-full p-2 border rounded-md"
            />
        </div>
   
        ))}
      </div>

{/*          
          <div className="flex space-x-4">
          <div className="flex flex-col">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
              BarId
            </label>
            <input
              type="number"
              name="barSubmenuId"
              value={newMenuData.barSubmenuId}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-2 mb-4 border rounded-md"
              min={0}
            />
         </div>
         <div className="flex flex-col">
       
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
              Price of 1Bottle
            </label>
            <input
              type="number"
              name="pricePer1Bottle"
              value={newMenuData.pricePer1Bottle}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-2 mb-4 border rounded-md"
              required
            />
            </div>
            <div className="flex flex-col">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
              Price30
            </label>
            <input
              type="number"
              name="price30"
              value={newMenuData.pricePer30ml}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-2 mb-4 border rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
              Price60
            </label>
            <input
              type="number"
              name="price60"
              value={newMenuData.pricePer60ml}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-2 mb-4 border rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
              Price90
            </label>
            <input
              type="number"
              name="price90"
              value={newMenuData.pricePer90ml}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-2 mb-4 border rounded-md"
            />
        </div>
          </div> */}
{/*          
          <div className="flex space-x-4">
       
          <div className="flex flex-col">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
              Price120
            </label>
            <input
              type="number"
              name="price120"
              value={newMenuData.pricePer120ml}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-2 mb-4 border rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
              Price150
            </label>
            <input
              type="number"
              name="price150"
              value={newMenuData.pricePer150ml}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-2 mb-4 border rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
              Price180
            </label>
            <input
              type="number"
              name="price180"
              value={newMenuData.pricePer180ml}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-2 mb-4 border rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
              Price375
            </label>
            <input
              type="number"
              name="price375"
              value={newMenuData.pricePer375ml}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-2 mb-4 border rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
              Price650
            </label>
            <input
              type="number"
              name="price650"
              value={newMenuData.pricePer650ml}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-2 mb-4 border rounded-md"
            />
          </div>
        </div> */}

        {/* <div className="flex space-x-4">
          <div className="flex flex-col">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
              Price750
            </label>
            <input
              type="number"
              name="price750"
              value={newMenuData.pricePer750ml}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-2 mb-4 border rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
              Price1000
            </label>
            <input
              type="number"
              name="price1000"
              value={newMenuData.pricePer1000ml}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-2 mb-4 border rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
              StockLimit
            </label>
            <input
              type="number"
              name="stockLimit"
              value={newMenuData.stockLimit}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-2 mb-4 border rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
              SizeMl
            </label>
            <input
              type="text"
              name="sizeMl"
              value={newMenuData.sizeMl}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-2 mb-4 border rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
              Tin
            </label>
            <input
              type="number"
              name="priceTin"
              value={newMenuData.pricePerTin}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-2 mb-4 border rounded-md"
            />
          </div> */}
          {/* <div className="flex flex-col">
          <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
            Size
          </label>
          <select
            name="sizeMl"
            value={newMenuData.sizeMl}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="">Select Size</option>
            {sizes.map((size, index) => (
              <option key={index} value={size}>
                {size} ml
              </option>
            ))}
          </select>
        </div> */}
        {/* </div> */}
        <div className="flex space-x-4">
        <div className="flex flex-col">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
              StockLimit
            </label>
            <input
              type="number"
              name="stockLimit"
              value={newMenuData.stockLimit}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-2 mb-4 border rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
              SizeMl
            </label>
            <input
              type="text"
              name="sizeMl"
              value={newMenuData.sizeMl}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-2 mb-4 border rounded-md"
            />
          </div>
          <div className="flex flex-col">
        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
          Image
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleInputChange}
          autoComplete="off"
          className="w-full p-2 mb-4 border rounded-md"
        />
        </div>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className=" bg-orange-100 text-orange-600 hover:bg-orange-200 text-gray font-semibold p-2 px-4 rounded-full mt-4 w-72 mx-auto"
            onClick={addNewMenu}
          >
            Add Menu
          </button>
        </div>
      </form>
            </div>
        </div>
    );

    return (
        <>

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onCancel={cancelDelete}
                onConfirm={confirmDelete}
            />


            <div className="container mx-auto p-2 mt-12 overflow-x-auto  border-gray-300 shadow-md font-sans max-w-7xl">
                <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                    <h1 className="text-xl font-bold font-sans mb-2 md:mb-0 text-orange-600">Sub-Menu List</h1>
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="relative mb-2 md:mb-0 md:mr-3">
                            <input
                                className="border-2 border-gray-300 pl-2 rounded-full bg-white h-9 text-sm focus:outline-non"
                                id="searchInput"
                                type="text"
                                name="searchInput"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="absolute right-0 mr-2 top-1">
                                <FontAwesomeIcon icon={faSearch} className="text-gray-700" />
                            </button>
                        </div>
                        <div className="flex justify-between">
                            <button
                                className="text-orange-600 font-bold py-1 rounded-full text-sm bg-orange-100 mr-2 px-2 shadow-md"
                                onClick={() => exportToExcel(true)}
                            >
                                <FontAwesomeIcon icon={faDownload} className="mr-1" />
                                Export
                            </button>
                            <button
                                className="text-orange-600 font-bold py-1 rounded-full text-sm bg-orange-100 mr-2 px-2 shadow-md"
                                onClick={openExcelUpload}
                            >
                                <FontAwesomeIcon icon={faUpload} className="mr-1" />
                                Import
                            </button>
                            <button
                                className="text-orange-600 font-bold py-1 rounded-full text-sm bg-orange-100 mr-2 px-2 shadow-md"
                                onClick={() => exportToExcel(false)}
                            >
                                <FontAwesomeIcon icon={faDownload} className="mr-1" />
                                Sample
                            </button>
                            <button
                                className="text-orange-600 font-bold py-1 rounded-full text-sm bg-orange-100 mr-2 px-2 shadow-md"
                                onClick={() => setIsNewModalOpen(true)}
                            >
                                <FontAwesomeIcon icon={faPlus} className="mr-1" />
                                Add
                            </button>
                        </div>
                    </div>
                </div>

                <table className=" max-w-5xl mx-auto mt-4">
                <thead className="text-base bg-zinc-100 text-yellow-700 border">
        <tr>
            <th className="p-2 whitespace-nowrap">Sr No.</th>
            <th className="text-left text-gray lg:pl-10 pl-4">Menu Name</th>
            <th className="text-left pl-8">Image</th>
            <th className="p-2 pl-4">MenuID</th>
            {/* Generate dynamic headers for each category */}
            {barCategories.map((category, index) => (
                <th key={index} className="p-2 border">{`Price${category}`}</th>
            ))}
            <th className="p-2 border">Stock Limit</th>
            <th className="p-2 border">Size Ml</th>
            <th className="p-2 border">Liquor Category</th>
            <th className="p-2 text-center">Actions</th>
        </tr>
    </thead>
                    <tbody className="text-md font-sans font-bold">{displayMenus}</tbody>
                </table>

                <div className="flex flex-col items-center mt-1">
                    <span className="text-xs text-gray-700 dark:text-gray-400">
                        Showing{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {pageNumber * menusPerPage + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {Math.min((pageNumber + 1) * menusPerPage, menus.length)}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {menus.length}
                        </span>{" "}
                        Menus
                    </span>
                    <div className="inline-flex mt-1 xs:mt-0">
                        <button
                            className={`${pageNumber === 0
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
                                } flex items-center justify-center px-3 h-8 text-xs font-medium text-white bg-gray-800 border-gray-700 rounded-s`}
                            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 0))}
                            disabled={pageNumber === 0}
                        >
                            <FontAwesomeIcon icon={faAnglesLeft} />
                        </button>
                        <button
                            className={`${pageNumber === pageCount - 1
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
                                } flex items-center justify-center px-3 h-8 text-xs font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e`}
                            onClick={() =>
                                setPageNumber((prev) => Math.min(prev + 1, pageCount - 1))
                            }
                            disabled={pageNumber === pageCount - 1}
                        >
                            <FontAwesomeIcon icon={faAnglesRight} />
                        </button>
                    </div>
                </div>
            </div>

            {isPreviewModalOpen && (
                <div
                    className="font-sans fixed inset-0 flex items-center justify-center z-50 m-1"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <div
                        className="modal-container bg-white w-72 p-6 rounded shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => setIsPreviewModalOpen(false)}
                        ></button>
                        <div className="p-1 text-center">
                            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-gray-400">
                                Image Preview
                            </h3>
                            <Image
                                src={completeImageUrl}
                                alt="Preview"
                                width={500}
                                height={500}
                            />
                            <button
                                type="button"
                                className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded-full mt-4 mr-2"
                                onClick={() => setIsPreviewModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isNewModalOpen && (
                <div
                    className="font-sans fixed inset-0 flex items-center justify-center z-50 m-1"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    {modalContent}
                </div>
            )}

            {isEditModalOpen && (
                <EditModal
                    isOpen={isEditModalOpen}
                    onCancel={() => {
                        setIsEditModalOpen(false);
                        setMenuToEdit(null);
                    }}
                    onEdit={(editedMenu) => {
                        // Update the menus state with the edited menu
                        setMenus((prevMenus) =>
                            prevMenus.map((menu) =>
                                menu._id === editedMenu._id ? editedMenu : menu
                            )
                        );
                    }}
                    menuToEdit={menuToEdit}
                    mainCategories={mainCategories}
                />
            )}

            {isExcelUploadOpen && (
                <div className="font-sans fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded shadow-md max-w-md relative">
                        <button
                            onClick={closeExcelUpload}
                            className="absolute top-4 right-4 bg-red-100 text-red-600 hover:bg-red-200 p-2 py-1 rounded-full text-center"
                        >
                            <FontAwesomeIcon icon={faTimes} size="lg" />
                        </button>
                        <h1 className="text-2xl font-semibold mb-6">Upload Excel File</h1>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="mb-4 p-3 border border-gray-300 rounded w-full"
                        />
                        <button
                            onClick={() => {
                                handleFileUpload();
                                closeExcelUpload();
                            }}
                            className="bg-orange-100 text-orange-600 p-3 rounded-full w-full hover:bg-orange-200 font-semibold"
                        >
                            Upload To Excel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default BarList