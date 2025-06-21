import { useDispatch, useSelector } from "react-redux";
import { axiosGet } from "../../utils/myaxios";
import { useEffect } from "react";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import ImageIcon from '@mui/icons-material/Image';
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
} from "../../store/reducers/rtctodo/rtctodo";
import axios from "axios";

import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../store/reducers/rtctodoApi";

import { Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";

import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  CircularProgress,
} from "@mui/material";

export default function Todo() {
  const { data: todoData, isLoading, isError } = useGetCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const todo = todoData?.data || [];

  const dispatch = useDispatch();
  const {
    name,
    modaladd,
    description,
    editName,
    editDesc,
    idx,
    imgid,
    modal,
    info,
    img,
  } = useSelector((state) => state.rtctodo);

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
    }
  }

  function handleAddImage(el) {
    dispatch(setmodaladd(true));
    dispatch(setimgid(el.id));
  }

  async function addIMAGE(e) {
    e.preventDefault();
    const formData = new FormData();
    let images = e.target["Images"].files;
    for (let i = 0; i < images.length; i++) {
      formData.append("Images", images[i]);
    }

    try {
      await axiosGet.post(`/api/to-dos/${imgid}/images`, formData);
      getTodo();
      dispatch(setImgImage(null));
      dispatch(setmodaladd(false));
      dispatch(setimgid(null));
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload images");
    }
  }

  async function handleCheck(id) {
    dispatch(setLoading(true));
    try {
      await axiosGet.put(`/completed?id=${id}`);
      getTodo();
      dispatch(setLoading(false));
      dispatch(setError(false));
    } catch (error) {
      console.error(error);
      dispatch(setError(true));
      dispatch(setLoading(false));
    }
  }

  function handleEdit(el) {
    dispatch(setEditName(el.name));
    dispatch(setEditDesc(el.description));
    dispatch(setIdx(el.id));
  }

  const handleAdd = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (img) formData.append("images", img);

    try {
      await addCategory(formData).unwrap();
      dispatch(setDescription(""));
      dispatch(setName(""));
      dispatch(setImg(null));
      toast.success("Added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id).unwrap();
      toast.success("Deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete");
    }
  };

  const editUser = async () => {
    try {
      await updateCategory({
        id: idx,
        name: editName,
        description: editDesc,
      }).unwrap();
      dispatch(setEditDesc(""));
      dispatch(setEditName(""));
      toast.success("Updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update");
    }
  };

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

  // Toast loading/error notifications
  useEffect(() => {
    if (isLoading) {
      toast.info("Loading...", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      });
    }
    if (isError) {
      toast.error("You made a mistake", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  }, [isLoading, isError]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" mb={3}>
   MOBX Todo
      </Typography>

      {/* Add todo */}
      <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
          sx={{ flexGrow: 1, minWidth: 180 }}
        />
        <TextField
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => dispatch(setDescription(e.target.value))}
          sx={{ flexGrow: 2, minWidth: 250 }}
        />
        <Button variant="contained" component="label" sx={{ mr: 1 }}>
          < ImageIcon/>
          <input
            type="file"
            hidden
            onChange={(e) => dispatch(setImg(e.target.files[0]))}
          />
        </Button>
        <Button variant="contained" onClick={handleAdd}>
          Add +
        </Button>
      </Box>

      {/* Edit todo */}
      <Box display="flex" gap={2} flexWrap="wrap" mb={5}>
        <TextField
          label="Edit Name"
          variant="outlined"
          value={editName}
          onChange={(e) => dispatch(setEditName(e.target.value))}
          sx={{ flexGrow: 1, minWidth: 180 }}
          disabled={idx === null}
        />
        <TextField
          label="Edit Description"
          variant="outlined"
          value={editDesc}
          onChange={(e) => dispatch(setEditDesc(e.target.value))}
          sx={{ flexGrow: 2, minWidth: 250 }}
          disabled={idx === null}
        />
        <Button
          variant="contained"
          onClick={editUser}
          disabled={idx === null}
        >
          <EditIcon />
        </Button>
      </Box>

      {/* Todo list */}
      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        <List sx={{ p: 0 }}>
          {todo.map((el) => (
            <ListItem
              key={el.id}
              sx={{
                mb: 3,
                p: 2,
                border: "1px solid gray",
                borderRadius: 2,
                flexDirection: "column",
                alignItems: "flex-start",
              }}
              secondaryAction={
                <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => handleDelete(el.id)}
                  >
                  <AutoDeleteIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleCheck(el.id)}
                  >
                    < CheckCircleIcon />
                  </Button>
                  <Button variant="outlined" onClick={() => handleEdit(el)}>
                    <EditIcon />
                  </Button>
                  <Button variant="outlined" onClick={() => handleInfo(el)}>
                    < InfoIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleAddImage(el)}
                  >
                    < ImageIcon />
                  </Button>
                  <Link to={`/rtctodo/${el.id}`} style={{ textDecoration: "none" }}>
                    <Button variant="outlined">Info by ID</Button>
                  </Link>
                </Box>
              }
            >
              {/* Images */}
              <Box mb={1} display="flex" gap={1} flexWrap="wrap">
                {el.images?.map((img) => (
                  <Box
                    key={img.id}
                    sx={{ position: "relative", display: "inline-block" }}
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
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDelImage(img.id)}
                      sx={{
                        position: "absolute",
                        top: -5,
                        right: -5,
                        minWidth: "unset",
                        padding: "2px 5px",
                        fontSize: 12,
                        borderRadius: "50%",
                      }}
                    >
               <AutoDeleteIcon />
                    </Button>
                  </Box>
                ))}
              </Box>

              <Typography variant="h6">{el.name}</Typography>
              <Typography variant="body1" mb={1}>
                {el.description}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: el.isCompleted ? "green" : "red", fontWeight: "bold" }}
              >
                {el.isCompleted ? "Active" : "Inactive"}
              </Typography>
            </ListItem>
          ))}
        </List>
      )}

      {/* Info Modal */}
      <Dialog open={modal} onClose={() => dispatch(setModal(false))}>
        <DialogTitle>Info</DialogTitle>
        <DialogContent>
          <Typography>ID: {info?.id}</Typography>
          <Typography>Name: {info?.name}</Typography>
          <Typography>Description: {info?.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(setModal(false))}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Add Image Modal */}
      <Dialog open={modaladd} onClose={() => dispatch(setmodaladd(false))}>
        <DialogTitle>Add Images</DialogTitle>
        <DialogContent>
          <form id="addImageForm" onSubmit={addIMAGE}>
            <input
              name="Images"
              type="file"
              multiple
              style={{ marginTop: 10 }}
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            form="addImageForm"
            variant="contained"
          >
            Add +
          </Button>
          <Button onClick={() => dispatch(setmodaladd(false))}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Container>
  );
}
