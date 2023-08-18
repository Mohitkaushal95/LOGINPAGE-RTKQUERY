import React, { useState } from "react";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../store/apiSlice";

import EditProduct from "./EditProduct";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Container,
  Tooltip,
  IconButton,
  Input,
} from "@mui/material";
import AddProduct from "./AddProduct";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const navigate = useNavigate();
  const [deleteProduct] = useDeleteProductMutation();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useGetProductsQuery({ page, searchQuery });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const username = localStorage.getItem('username');
  const name = localStorage.getItem('Name');

  const handleEditModalOpen = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setSelectedProduct(null);
    setIsEditModalOpen(false);
  };
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("Name");
  };
  const handleDelete = async (id) => {
    await deleteProduct(id);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Container maxWidth="xl">
        <AppBar position="static">
          <Toolbar>
            <Typography
              align="left"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Product List
            </Typography>
            <Typography align ='left'>
             {username} {name}
            </Typography>
            <Input
              type="text"
              placeholder="search products..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <Button color="inherit" onClick={handleModalOpen}>
              Add Product
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Paper>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#d5f4e6" }}>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">TITLE</TableCell>
                  <TableCell align="center">BRAND</TableCell>
                  <TableCell align="center">CATEGORY</TableCell>
                  <TableCell align="center">THUMBNAIL</TableCell>
                  <TableCell align="center">ACTION</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data &&
                  data.map((product, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{product.id}</TableCell>
                        <TableCell align="center">{product.title}</TableCell>
                        <TableCell align="center">{product.brand}</TableCell>
                        <TableCell align="center">{product.category}</TableCell>
                        <TableCell align="center">
                          <img
                            src={product.thumbnail}
                            alt="thumbnail"
                            width="100"
                            height="100"
                          ></img>
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => handleEditModalOpen(product)}
                            >
                              <EditIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => handleDelete(product.id)}
                            >
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </Button>
        <Button
          disabled={data.length < 5}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </Container>
      <AddProduct isOpen={isModalOpen} onClose={handleModalClose} />
      {selectedProduct && (
        <EditProduct
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          product={selectedProduct}
        />
      )}
    </>
  );
};

export default Product;
