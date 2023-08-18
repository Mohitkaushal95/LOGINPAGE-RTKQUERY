import React from "react";
import { Button, Modal, TextField } from "@mui/material";
import { useCreateProductMutation } from "../store/apiSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddProduct = ({ isOpen, onClose }) => {
  const validationSchema = Yup.object({
    id: Yup.string().required("ID is required"),
    title: Yup.string().required("Title is required"),
    brand: Yup.string().required("Brand is required"),
    category: Yup.string().required("Category is required"),
    thumbnail: Yup.string()
      .url("Invalid URL")
      .required("Thumbnail URL is required"),
  });
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const formik = useFormik({
    initialValues: {
      id: "",
      title: "",
      brand: "",
      category: "",
      thumbnail: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await createProduct(values);
        onClose();
      } catch (error) {
        console.error("Error creating product:", error);
      }

    },
  });

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <h2>Add Product</h2>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="ID"
            fullWidth
            name="id"
            value={formik.values.id}
            onChange={formik.handleChange}
            error={formik.touched.id && Boolean(formik.errors.id)}
            helperText={formik.touched.id && formik.errors.id}
          />
          <TextField
            label="Title"
            fullWidth
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            label="Brand"
            fullWidth
            name="brand"
            value={formik.values.brand}
            onChange={formik.handleChange}
            error={formik.touched.brand && Boolean(formik.errors.brand)}
            helperText={formik.touched.brand && formik.errors.brand}
          />
          <TextField
            label="Category"
            fullWidth
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
          />
          <TextField
            label="Thumbnail URL"
            fullWidth
            name="thumbnail"
            value={formik.values.thumbnail}
            onChange={formik.handleChange}
            error={formik.touched.thumbnail && Boolean(formik.errors.thumbnail)}
            helperText={formik.touched.thumbnail && formik.errors.thumbnail}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            
          >
            Add Product
          </Button>
          <Button onClick={onClose} color="secondary" variant="contained">
            Cancel
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddProduct;
