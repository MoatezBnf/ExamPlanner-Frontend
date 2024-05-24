import React, { useState, useEffect, useRef } from "react";
import PageTitle from "pages/components/Typography/PageTitle";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Button,
  Pagination,
  Input,
  Select,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  ModalFooter,
} from "@roketid/windmill-react-ui";
import { EditIcon, TrashIcon } from "icons";
import Layout from "pages/containers/Layout";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  getAllDepartments,
} from "pages/api/api";
import axios from "axios";
import ReactSelect from "react-select";

interface UserModel {
  id: string;
  userName: string;
  email: string;
  role: string;
  departmentIds: number[];
}

interface Department {
  departmentId: number;
  name: string;
}

interface EditUserFormProps {
  user: UserModel | null;
}

function Users() {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    getAllUsers().then((response) => setUsers(response.data.data));
    getAllDepartments().then((response) => setDepartments(response.data));
  }, []);

  const handleUpdateUser = (id: string, user: UserModel) => {
    updateUser(id, user).then(() =>
      getAllUsers().then((response) => setUsers(response.data))
    );
  };

  const handleDeleteUser = (id: string) => {
    deleteUser(id).then(() =>
      getAllUsers().then((response) => setUsers(response.data.data))
    );
    closeDeleteUserModal();
  };

  const roles = Array.from(new Set(users.map((user) => user.role)));
  const departmentss = Array.from(
    new Set(departments.map((department) => department.name))
  );

  function AddUserForm() {
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const email = (e.target as any).email.value;
      const userName = (e.target as any).userName.value;
      const password = (e.target as any).password.value;
      const role = (e.target as any).role.value;
      const departmentIds = Array.from(
        (e.target as any).departmentIds.selectedOptions,
        (option: HTMLOptionElement) => Number(option.value)
      );
      try {
        const response = await axios.post(
          "https://localhost:7099/api/user/create-user",
          {
            email: email,
            userName: userName,
            password: password,
            role: role,
            departmentIds: departmentIds,
          }
        );
        getAllUsers().then((response) => setUsers(response.data.data));
        closeAddUserModal();
      } catch (error) {
        console.log("An error occurred. Please try again later.");
      }
    }
    return (
      <form onSubmit={handleSubmit}>
        <Label>
          <span>Email</span>
          <Input
            className="mt-1"
            type="email"
            placeholder="Enter Email"
            name="email"
          />
        </Label>
        <Label className="mt-4">
          <span>Password</span>
          <Input
            className="mt-1"
            type="password"
            placeholder="Enter Password"
            name="password"
          />
        </Label>
        <Label className="mt-4">
          <span>UserName</span>
          <Input
            className="mt-1"
            placeholder="Enter UserName"
            name="userName"
          />
        </Label>
        <Label className="mt-4">
          <span>Role</span>
          <Select className="mt-1" name="role">
            <option value="">Select Role</option>
            {roles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </Select>
        </Label>
        <Label className="mt-4">
          <span>Department</span>
          <Select className="mt-1" name="departmentIds">
            <option value="">Select Department</option>
            {departments.map((department, index) => (
              <option key={index} value={department.departmentId}>
                {department.name}
              </option>
            ))}
          </Select>
        </Label>
        <Button className="mt-4" block type="submit">
          Add
        </Button>
      </form>
    );
  }

  function EditUserForm({ user }: EditUserFormProps) {
    const [email, setEmail] = useState(user?.email || "");
    const [userName, setUserName] = useState(user?.userName || "");
    const [role, setRole] = useState(user?.role || "");
    const [departmentIds, setDepartmentIds] = useState(
      user?.departmentIds || []
    );
    const departmentOptions = departments.map((department) => ({
      value: department.departmentId,
      label: department.name,
    }));
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const email = (e.target as any).email.value;
      const userName = (e.target as any).userName.value;
      const role = (e.target as any).role.value;
      try {
        const response = await axios.put(
          `https://localhost:7099/api/user/update-user/${user?.id}`,
          {
            email: email,
            userName: userName,
            role: role,
            departmentIds: departmentIds,
          }
        );
        getAllUsers().then((response) => setUsers(response.data.data));
        closeEditUserModal();
      } catch (error) {
        console.log("An error occurred. Please try again later.");
      }
    }
    return (
      <form onSubmit={handleSubmit}>
        <Label>
          <span>Email</span>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Label>
        <Label>
          <span>Username</span>
          <Input
            type="text"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </Label>
        <Label>
          <span>Role</span>
          <Select
            value={role}
            name="role"
            onChange={(e) => setRole(e.target.value)}
            required
          >
            {roles.map((roleItem, i) => (
              <option key={i} value={roleItem}>
                {roleItem}
              </option>
            ))}
          </Select>
        </Label>
        <Label>
          <span>Departments</span>
          <ReactSelect
            name="departmentIds"
            isMulti
            options={departmentOptions}
            value={departmentIds.map((id) =>
              departmentOptions.find((option) => option && option.value === id)
            )}
            onChange={(selectedOptions) => {
              const selectedDepartmentIds = selectedOptions
                .map((option) => option && option.value)
                .filter((id) => id !== undefined) as number[];
              setDepartmentIds(selectedDepartmentIds);
            }}
          />
        </Label>
        <Button className="mt-4" block type="submit">
          Save
        </Button>
      </form>
    );
  }

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  function openAddUserModal() {
    setIsAddUserModalOpen(true);
  }

  function closeAddUserModal() {
    setIsAddUserModalOpen(false);
  }
  const [editUser, setEditUser] = useState<UserModel | null>(null);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);

  function openEditUserModal(user: UserModel) {
    setEditUser(user);
    setIsEditUserModalOpen(true);
  }
  function closeEditUserModal() {
    setEditUser(null);
    setIsEditUserModalOpen(false);
  }
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserModel | null>(null);
  const openDeleteUserModal = (user: UserModel) => {
    setUserToDelete(user);
    setIsDeleteUserModalOpen(true);
  };

  const closeDeleteUserModal = () => {
    setUserToDelete(null);
    setIsDeleteUserModalOpen(false);
  };

  const [page, setPage] = useState(1);
  const [data, setData] = useState<UserModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const resultsPerPage = 10;

  function onPageChange(p: number) {
    setPage(p);
  }

  const resetFilters = () => {
    setSearchTerm("");
    setDepartmentFilter("");
    setRoleFilter("");
    setPage(1);
  };

  // useEffect(() => {
  //   let filteredUsers = users.filter(
  //     (user) =>
  //       user.UserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       user.Email.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   if (departmentFilter) {
  //     filteredUsers = filteredUsers.filter((user) =>
  //       user.DepartmentIds.some(
  //         (departmentId) =>
  //           departments.find(
  //             (department) => department.DepartmentId === departmentId
  //           )?.Name === departmentFilter
  //       )
  //     );
  //   }
  //   if (roleFilter) {
  //     filteredUsers = filteredUsers.filter((user) => user.Role === roleFilter);
  //   }
  //   setData(
  //     filteredUsers.slice((page - 1) * resultsPerPage, page * resultsPerPage)
  //   );
  // }, [page, searchTerm, departmentFilter, roleFilter]);

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <PageTitle>Users</PageTitle>
        <div className="flex items-center justify-end space-x-4">
          <Button onClick={openAddUserModal}>Add User</Button>
          <Modal isOpen={isAddUserModalOpen} onClose={closeAddUserModal}>
            <ModalHeader>Add User</ModalHeader>
            <ModalBody>
              <AddUserForm />
            </ModalBody>
            <ModalFooter>
              <Button layout="outline" onClick={closeAddUserModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <Input
            type="text"
            placeholder="Search Users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 px-3 py-2 border rounded-md"
          />
          <Button onClick={resetFilters}>Reset Filters</Button>
        </div>
      </div>
      <div className="flex space-x-4 mb-4">
        <Select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Roles</option>
          {roles.map((roleItem, i) => (
            <option key={i} value={roleItem}>
              {roleItem}
            </option>
          ))}
        </Select>
        <Select
          value={departmentFilter}
          onChange={(e) => {
            setDepartmentFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Departments</option>
          {departments.map((department, i) => (
            <option key={i} value={department.name}>
              {department.name}
            </option>
          ))}
        </Select>
      </div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Departments</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {users.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{user.userName}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.role}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {user.departmentIds
                      .map(
                        (id) =>
                          departments.find((d) => d.departmentId === id)?.name
                      )
                      .join(", ")}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button
                      layout="link"
                      size="small"
                      aria-label="Edit"
                      onClick={() => openEditUserModal(user)}
                    >
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button
                      layout="link"
                      size="small"
                      aria-label="Delete"
                      onClick={() => openDeleteUserModal(user)}
                    >
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={users.length}
            resultsPerPage={10}
            onChange={onPageChange}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
      <Modal isOpen={isEditUserModalOpen} onClose={closeEditUserModal}>
        <ModalHeader>Edit User</ModalHeader>
        <ModalBody>
          <EditUserForm user={editUser} />
        </ModalBody>
        <ModalFooter>
          <Button layout="outline" onClick={closeEditUserModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={isDeleteUserModalOpen} onClose={closeDeleteUserModal}>
        <ModalHeader>Delete User</ModalHeader>
        <ModalBody>
          Are you sure you want to delete user {userToDelete?.userName}?
        </ModalBody>
        <ModalFooter>
          <Button layout="outline" onClick={closeDeleteUserModal}>
            Cancel
          </Button>
          <Button onClick={() => handleDeleteUser(userToDelete?.id || "")}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </Layout>
  );
}

export default Users;
