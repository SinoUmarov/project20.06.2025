import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosGet } from "../../utils/myaxios";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ImageIcon from '@mui/icons-material/Image';
import AddBoxIcon from '@mui/icons-material/AddBox';

import {
  setTodo,
  setName,
  setDescription,
  setEditName,
  setEditDesc,
  setIdx,
  setLoading,
  setError,
  setModal,
  setInfo,
  setimgid,
  setImg,
  setImgImage,
  setmodaladd,
} from "../../store/reducers/todo/todo";
import axios from "axios";

import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Todo() {
  const dispatch = useDispatch();
  const {
    todo,
    name,
    modaladd,
    description,
    editName,
    editDesc,
    idx,
    imgid,
    loading,
    error,
    modal,
    info,
    img,
    imgImage,
  } = useSelector((state) => state.todo);

  async function getTodo() {
    dispatch(setLoading(true));
    try {
      let { data } = await axiosGet.get(`/api/to-dos`);
      dispatch(setTodo(data.data));
      dispatch(setLoading(false));
      dispatch(setError(false));
    } catch (error) {
      console.error(error);
      dispatch(setError(true));
      dispatch(setLoading(false));
      toast.error("Failed to fetch todos");
    }
  }

  async function handleDelete(id) {
    dispatch(setLoading(true));
    try {
      await axiosGet.delete(`/api/to-dos?id=${id}`);
      getTodo();
      dispatch(setLoading(false));
      dispatch(setError(false));
      toast.success("Todo deleted");
    } catch (error) {
      console.error(error);
      dispatch(setError(true));
      dispatch(setLoading(false));
      toast.error("Delete failed");
    }
  }

  function handleAddImage(id) {
    dispatch(setmodaladd(true));
    dispatch(setimgid(id));
  }

  async function addIMAGE(e) {
    e.preventDefault();
    const formData = new FormData();
    let images = e.target["Images"].files;
    for (let i = 0; i < images.length; i++) {
      formData.append("Images", images[i]);
    }

    try {
      const res = await axiosGet.post(`/api/to-dos/${imgid}/images`, formData);
      toast.success("Images uploaded");
      getTodo();
      dispatch(setImgImage(null));
      dispatch(setmodaladd(false));
      dispatch(setimgid(null));
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      toast.error("Image upload failed");
    }
  }

  async function handleAdd() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("images", img);
    dispatch(setLoading(true));

    try {
      await axiosGet.post(`/api/to-dos`, formData);
      getTodo();
      dispatch(setLoading(false));
      dispatch(setError(false));
      dispatch(setDescription(""));
      dispatch(setName(""));
      dispatch(setImg(null));
      toast.success("Todo added");
    } catch (error) {
      console.error(error);
      dispatch(setError(true));
      dispatch(setLoading(false));
      toast.error("Failed to add todo");
    }
  }

  async function handleCheck(id) {
    dispatch(setLoading(true));
    try {
      await axiosGet.put(`/completed?id=${id}`);
      getTodo();
      dispatch(setLoading(false));
      dispatch(setError(false));
      toast.success("Todo status updated");
    } catch (error) {
      console.error(error);
      dispatch(setError(true));
      dispatch(setLoading(false));
      toast.error("Failed to update status");
    }
  }

  function handleEdit(el) {
    dispatch(setEditName(el.name));
    dispatch(setEditDesc(el.description));
    dispatch(setIdx(el.id));
  }

  async function editUser() {
    dispatch(setLoading(true));
    const newUser = {
      name: editName,
      description: editDesc,
      id: idx,
    };

    try {
      await axiosGet.put(`/api/to-dos`, newUser, {
        header: {
          "Content-Type": "application/json",
        },
      });
      getTodo();
      dispatch(setEditDesc(""));
      dispatch(setEditName(""));
      dispatch(setLoading(false));
      dispatch(setError(false));
      toast.success("Todo edited");
    } catch (error) {
      console.error(error);
      dispatch(setError(true));
      dispatch(setLoading(false));
      toast.error("Failed to edit todo");
    }
  }

  async function handleInfo(el) {
    dispatch(setLoading(true));
    dispatch(setModal(true));
    dispatch(setInfo(el));
    try {
      await axiosGet(`/api/to-dos/${el.id}`);
      getTodo();
      dispatch(setLoading(false));
      dispatch(setError(false));
    } catch (error) {
      console.error(error);
      dispatch(setError(true));
      dispatch(setLoading(false));
      toast.error("Failed to fetch info");
    }
  }

  async function handleDelImage(id) {
    try {
      await axios.delete(
        `https://to-dos-api.softclub.tj/api/to-dos/images/${id}`
      );
      getTodo();
      toast.success("Image deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete image");
    }
  }

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
   jotai todo
      </Typography>


      <Box
        component="form"
        sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Name"
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
          size="small"
          sx={{ flex: "1 1 200px" }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => dispatch(setDescription(e.target.value))}
          size="small"
          sx={{ flex: "2 1 300px" }}
        />
        <Button variant="contained" component="label">
          <ImageIcon/>
          <input
            type="file"
            hidden
            onChange={(e) => dispatch(setImg(e.target.files[0]))}
          />
        </Button>
        <Button variant="contained" onClick={handleAdd}>
          <AddBoxIcon/>
        </Button>
      </Box>

      {/* Edit Todo Form */}
      <Box
        component="form"
        sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Edit Name"
          value={editName}
          onChange={(e) => dispatch(setEditName(e.target.value))}
          size="small"
          sx={{ flex: "1 1 200px" }}
        />
        <TextField
          label="Edit Description"
          value={editDesc}
          onChange={(e) => dispatch(setEditDesc(e.target.value))}
          size="small"
          sx={{ flex: "2 1 300px" }}
        />
        <Button variant="outlined" onClick={editUser}>
          <EditIcon />
        </Button>
      </Box>

      {/* Todos Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Images</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todo.map((el) => (
            <TableRow key={el.id}>
              <TableCell>
                {el.images.map((img) => (
                  <Box
                    key={img.id}
                    sx={{ display: "inline-block", mr: 1, position: "relative" }}
                  >
                    <img
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}
                      alt={img.imageName}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleDelImage(img.id)}
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bgcolor: "rgba(255,255,255,0.7)",
                      }}
                      aria-label="delete image"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </TableCell>
              <TableCell>{el.name}</TableCell>
              <TableCell>{el.description}</TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: el.isCompleted ? "green" : "red" }}
              >
                {el.isCompleted ? "Active" : "Inactive"}
              </TableCell>
              <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => handleDelete(el.id)}
                  sx={{ mr: 1 }}
                >
                  <DeleteForeverIcon/>
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="success"
                  onClick={() => handleCheck(el.id)}
                  sx={{ mr: 1 }}
                >
                  <CheckBoxIcon />
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleEdit(el)}
                  sx={{ mr: 1 }}
                >
                  <EditIcon/>
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleInfo(el)}
                  sx={{ mr: 1 }}
                >
                <InfoIcon/>
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<AddPhotoAlternateIcon />}
                  onClick={() => handleAddImage(el.id)}
                >
                  <InfoIcon/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Loading */}
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1300,
          }}
        >
          <CircularProgress size={90} />
        </Box>
      )}

      {/* Error Display */}
      {error && (
        <Typography
          variant="h3"
          color="error"
          align="center"
          sx={{ mt: 4, mb: 4 }}
        >
          ERROR 
        </Typography>
      )}

      {/* Info Modal */}
      <Dialog open={modal} onClose={() => dispatch(setModal(false))}>
        <DialogTitle>Todo Info</DialogTitle>
        <DialogContent>
          <Typography>ID: {info?.id}</Typography>
          <Typography variant="h6">{info?.name}</Typography>
          <Typography>{info?.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(setModal(false))}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Add Image Modal */}
      <Dialog open={modaladd} onClose={() => dispatch(setmodaladd(false))}>
        <DialogTitle>Add Images</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={addIMAGE}>
            <input
              type="file"
              name="Images"
              multiple
              style={{ marginTop: 8, marginBottom: 16 }}
            />
            <DialogActions>
              <Button type="submit" variant="contained">
                Add +
              </Button>
              <Button onClick={() => dispatch(setmodaladd(false))}>Cancel</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
}
