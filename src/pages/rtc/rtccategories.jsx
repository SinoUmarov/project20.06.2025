import { useState } from "react";
import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryByIdQuery,
} from "../../store/reducers/rtccategoriesApi";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

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
  CircularProgress,
  Box,
} from "@mui/material";

export default function Categories() {
  const [name, setName] = useState("");
  const [editName, setEditName] = useState("");
  const [idx, setIdx] = useState(null);
  const [modal, setModal] = useState(false);
  const [infoId, setInfoId] = useState(null);

  const { data, isLoading, isError } = useGetCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const { data: info } = useGetCategoryByIdQuery(infoId, { skip: !infoId });

  const handleAdd = async () => {
    if (!name.trim()) return;
    await addCategory({ name });
    setName("");
  };

  const handleEdit = async () => {
    if (!editName.trim()) return;
    await updateCategory({ id: idx, name: editName });
    setEditName("");
    setIdx(null);
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
  };

  const openEdit = (el) => {
    setEditName(el.name);
    setIdx(el.id);
  };

  const openInfo = (id) => {
    setInfoId(id);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setInfoId(null);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
     ZUSTAND Categories
      </Typography>

      {/* Add new category */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Category name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button variant="contained" onClick={handleAdd}>
        <AddBoxIcon/>
        </Button>
      </Box>

      {/* Edit category */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Edit category"
          variant="outlined"
          fullWidth
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          disabled={idx === null}
          onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
        />
        <Button
          variant="contained"
          onClick={handleEdit}
          disabled={idx === null}
          color="primary"
        >
          <SaveAltIcon/>
        </Button>
      </Box>

      {/* List categories */}
      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress size={60} />
        </Box>
      ) : isError ? (
        <Typography variant="h5" color="error" align="center" mt={5}>
          ERROR 
        </Typography>
      ) : (
        <List>
          {data?.data?.map((el) => (
            <ListItem
              key={el.id}
              sx={{
                border: "1px solid #ccc",
                borderRadius: 2,
                mb: 2,
                flexDirection: "column",
                alignItems: "flex-start",
              }}
              secondaryAction={
                <>
                  <Button
                    color="error"
                    onClick={() => handleDelete(el.id)}
                    sx={{ mr: 1 }}
                  >
                    <AutoDeleteIcon/>
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => openEdit(el)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon/>
                  </Button>
                  <Button variant="contained" onClick={() => openInfo(el.id)}>
                    <InfoIcon/>
                  </Button>
                </>
              }
            >
              <Typography>
                <strong>ID:</strong> {el.id}
              </Typography>
              <Typography>
                <strong>Name:</strong> {el.name}
              </Typography>
            </ListItem>
          ))}
        </List>
      )}

      {/* Info Modal */}
      <Dialog open={modal} onClose={closeModal} fullWidth maxWidth="xs">
        <DialogTitle>Category Info</DialogTitle>
        <DialogContent dividers>
          {info ? (
            <>
              <Typography gutterBottom>
                <strong>ID:</strong> {info?.data?.id}
              </Typography>
              <Typography gutterBottom>
                <strong>Name:</strong> {info?.data?.name}
              </Typography>
            </>
          ) : (
            <Box display="flex" justifyContent="center" p={3}>
              <CircularProgress />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
