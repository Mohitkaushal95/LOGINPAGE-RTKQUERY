import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal, Button, TextField } from "@mui/material";
import { useUpdateProductMutation } from "../store/apiSlice";

const EditProduct = ({ isOpen, onClose, product }) => {
  const validationSchema = Yup.object({
    id: Yup.string().required("ID is required"),
    title: Yup.string().required("Title is required"),
    brand: Yup.string().required("Brand is required"),
    category: Yup.string().required("Category is required"),
    thumbnail: Yup.string()
      .url("Invalid URL")
      .required("Thumbnail URL is required"),
  });
  const [updateProduct] = useUpdateProductMutation();

  const formik = useFormik({
    initialValues: {
      id: product.id,
      title: product.title,
      brand: product.brand,
      category: product.category,
      thumbnail: product.thumbnail,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const updatedProduct = {
        ...values,
      };
      await updateProduct(updatedProduct);
      onClose();
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
        <h2>Edit Product</h2>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="id"
            name="id"
            label="Id"
            value={formik.values.id}
            onChange={formik.handleChange}
            error={formik.touched.id && Boolean(formik.errors.id)}
            helperText={formik.touched.id && formik.errors.id}
          />
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            fullWidth
            id="brand"
            name="brand"
            label="Brand"
            value={formik.values.brand}
            onChange={formik.handleChange}
            error={formik.touched.brand && Boolean(formik.errors.brand)}
            helperText={formik.touched.brand && formik.errors.brand}
          />
          <TextField
            fullWidth
            id="category"
            name="category"
            label="Category"
            value={formik.values.category}
            onChange={formik.handleChange}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
          />
          <TextField
            fullWidth
            id="thumbnail"
            name="thumbnail"
            label="Thumbnail"
            value={formik.values.thumbnail}
            onChange={formik.handleChange}
            error={formik.touched.thumbnail && Boolean(formik.errors.thumbnail)}
            helperText={formik.touched.thumbnail && formik.errors.thumbnail}
          />
          <Button type="submit" color="primary" variant="contained">
            Edit Product
          </Button>
          <Button onClick={onClose} color="secondary" variant="contained">
            Cancel
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default EditProduct;
