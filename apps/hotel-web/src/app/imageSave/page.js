"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PayBillForm;
const react_hook_form_1 = require("react-hook-form");
const input_1 = require("@/components/ui/input");
const react_1 = require("react");
function PayBillForm({ invoiceid, setParentFileRecords, }) {
    const { handleSubmit, control, reset } = (0, react_hook_form_1.useForm)();
    const [isSubmitting, setIsSubmitting] = (0, react_1.useState)(false);
    const [fileRecords, setFileRecords] = (0, react_1.useState)([]);
    const [previewImages, setPreviewImages] = (0, react_1.useState)([]);
    const [previewImageUrl, setPreviewImageUrl] = (0, react_1.useState)([]); // State for preview
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    const [currentImageIndex, setCurrentImageIndex] = (0, react_1.useState)(null); // State for currently viewed image
    const [imageId, setImageId] = (0, react_1.useState)(null);
    //this working only file selecting
    const onFileChange = (event) => {
        //set valuse for the current component
        if (event.target.files) {
            //console.log("event.target.value", event.target.value);
            const selectedFiles = Array.from(event.target.files); //get selected files
            setFileRecords((prevRecords) => [
                //adding previous selected items to new selected items
                ...prevRecords,
                ...selectedFiles.map((file) => ({ id: null, file, title: '' })),
            ]);
            setParentFileRecords((prevRecords) => [
                //setvalues for the parent componet
                ...prevRecords,
                ...selectedFiles.map((file) => ({ id: null, file, title: '' })),
            ]);
        }
    };
    (0, react_1.useEffect)(() => {
        //this intialy work but not showing image.y-> no any selected images
        const imageUrls = fileRecords //getting image urls by maping filerecords
            .map((fileRecord) => {
            console.log('ppp', fileRecord.file?.type);
            return fileRecord.file?.type.startsWith('image/')
                ? URL.createObjectURL(fileRecord.file)
                : null;
        });
        console.log('imageUrlsqqq', fileRecords);
        setPreviewImages(imageUrls); //set priew image list of array
        //console.log("fileRecs", fileRecords);
        // Clean up object URLs on component unmount
        return () => {
            previewImages.forEach((url) => URL.revokeObjectURL(url)); //make image urls for each image
        };
    }, [fileRecords]);
    const removeImage = async (index) => {
        const delID = fileRecords[index].id;
        if (delID) {
            const del = await DeletePurchaseImage(delID);
            if (del.success) {
                setPreviewImages((prevImages) => [
                    ...prevImages.slice(0, index),
                    ...prevImages.slice(index + 1),
                ]);
                setFileRecords((prevRecords) => [
                    ...prevRecords.slice(0, index),
                    ...prevRecords.slice(index + 1),
                ]);
            }
        }
        else {
            setPreviewImages((prevImages) => [
                ...prevImages.slice(0, index),
                ...prevImages.slice(index + 1),
            ]);
            setFileRecords((prevRecords) => [
                ...prevRecords.slice(0, index),
                ...prevRecords.slice(index + 1),
            ]);
        }
    };
    const openModal = (index) => {
        setCurrentImageIndex(index); // Set the index of the image to be viewed
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentImageIndex(null); // Reset current image index
    };
    // useEffect(() => {
    //   if (imageId !== null) {
    //     const fetchImage = async () => {
    //       const response = await getImage(3);
    //       if (response.success && response.image) {
    //         const blob = new Blob([new Uint8Array(response.image.data)], {
    //           type: "image/jpeg",
    //         });
    //         const imageUrl = URL.createObjectURL(blob);
    //         setPreviewImages([imageUrl]); // Assuming single image fetch, modify if multiple
    //       }
    //     };
    //     fetchImage();
    //   }
    // }, [imageId]);
    // useEffect(() => {
    //   if (invoiceid) {
    //     ///////////////////////////////////////////////////retrive invoice image////////////////////////////////////////////
    //     const fetchImage = async () => {
    //       const response = await getImage(Number(invoiceid));
    //       //console.log("response",response)
    //       if (response.success && response.imagedata) {
    //         const fileArr: File[] = [];
    //         const titleArr: string[] = [];
    //         const idArr: string[] = [];
    //         const newaaray = response.imagedata.map((record, index) => {
    //           //console.log("record.image",record.image.data)
    //           // Convert Buffer to Blob
    //           const blob = new Blob([new Uint8Array(record.image.data)], {
    //             type: "image/jpeg",
    //           }); // Assuming JPEG format
    //           const imageUrl = URL.createObjectURL(blob); // Create URL from Blob
    //           // setPreviewImageUrl(imageUrl); // Set the image URL for preview
    //           // setPreviewImageUrl(imageUrl); // Set the image URL for preview
    //           // build fileRecords
    //           const file = new File([blob], index.toString() + ".jpg", {
    //             type: "image/jpeg",
    //           });
    //           console.log("file", file);
    //           fileArr.push(file);
    //           titleArr.push(record.description);
    //           idArr.push(record.id);
    //           return { imageUrl };
    //         });
    //         //console.log("newaaray",newaaray)
    //         // setFileRecords(
    //         //   fileArr.map((f, i) => ({
    //         //     id: idArr[i],
    //         //     title: titleArr[i],
    //         //     file: f,
    //         //   }))
    //         // );
    //         setParentFileRecords(
    //           fileArr.map((f, i) => ({
    //             id: idArr[i],
    //             title: titleArr[i],
    //             file: f,
    //           }))
    //         );
    //         //setPreviewImages( newaaray )
    //       }
    //     };
    //    // fetchImage();
    //   }
    // }, []);
    (0, react_1.useEffect)(() => {
        //testing
        console.log('previewImageUrl', previewImages);
    }, [previewImages]);
    const ontitleChange = (e, index) => {
        //console.log("index", e, index);
        setFileRecords((p) => {
            const newfr = { ...p[index], title: e.target.value };
            if (fileRecords.length == 0) {
                return [newfr];
            }
            else {
                return [...p.slice(0, index), newfr, ...p.slice(index + 1)];
            }
        });
        setParentFileRecords((p) => {
            const newfr = { ...p[index], title: e.target.value };
            if (fileRecords.length == 0) {
                return [newfr];
            }
            else {
                return [...p.slice(0, index), newfr, ...p.slice(index + 1)];
            }
        });
    };
    return (<>
      <input_1.Input type="file" accept="image/*" className="mb-4" onChange={onFileChange} multiple/>

      {previewImages.length > 0 && (<div className="mb-4">
          <h2 className="text-lg font-semibold">Image Previews:</h2>
          <div className="flex flex-wrap gap-2">
            {previewImages.map((imageUrl, index) => (<div key={fileRecords[index].file.name} className="relative">
                {/* <div key={index} className="relative"> */}
                <img src={imageUrl} alt={`Image Preview ${index + 1}`} className="w-52 cursor-pointer" onClick={() => openModal(index)} // Pass the index of the image
            />
                <button type="button" onClick={() => removeImage(index)} className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded">
                  X
                </button>
              </div>))}
          </div>
        </div>)}

      {isModalOpen && currentImageIndex !== null && (<div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50" onClick={closeModal}>
          <div className="bg-white rounded-lg max-w-md max-h-screen overflow-auto">
            <img src={previewImages[currentImageIndex]} alt={`Enlarged Image Preview ${currentImageIndex + 1}`} className="w-full h-auto"/>
          </div>
        </div>)}
    </>);
}
