"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PayBillForm;
const react_hook_form_1 = require("react-hook-form");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const react_1 = require("react");
const action_1 = require("./_actions/action");
function PayBillForm() {
    const { handleSubmit, control, reset } = (0, react_hook_form_1.useForm)();
    const [isSubmitting, setIsSubmitting] = (0, react_1.useState)(false);
    const [file, setFile] = (0, react_1.useState)(null);
    const onFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]); // Store the selected file
        }
    };
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        // Create a FormData object to send file and other data
        const formData = new FormData();
        if (file) {
            formData.append('receipt', file); // Append the selected file
        }
        else {
            console.error('No file selected');
            setIsSubmitting(false);
            return;
        }
        formData.append('billId', data.billId); // Append additional data
        try {
            // Call the server action to save the data
            const response = await (0, action_1.insertPurchase)(formData);
            if (response.success) {
                reset();
                alert('Receipt uploaded and saved successfully!');
            }
            else {
                alert('Failed to save receipt.');
            }
        }
        catch (error) {
            console.error('Error saving receipt:', error);
            alert('Failed to save receipt.');
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (<form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <react_hook_form_1.Controller name="billId" control={control} render={({ field }) => (<input_1.Input {...field} type="text" placeholder="Enter Bill ID" className="mb-4"/>)}/>

      <input_1.Input type="file" accept="*/*" // Accept any type of file
     className="mb-4" onChange={onFileChange} // Handle file input change
    />

      <button_1.Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Uploading...' : 'Upload Receipt'}
      </button_1.Button>
    </form>);
}
