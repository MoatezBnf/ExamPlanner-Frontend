import React, { useState, useEffect } from "react";
import PageTitle from "example/components/Typography/PageTitle";
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
import Layout from "example/containers/Layout";

interface UserModel {
  Id: string;
  UserName: string;
  Email: string;
  Role: string;
  DepartmentIds: number[];
}

interface Department {
  DepartmentId: number;
  Name: string;
}

const users: UserModel[] = [
  {
    Id: "1",
    UserName: "John Doe",
    Email: "john.doe@example.com",
    Role: "Admin",
    DepartmentIds: [1, 2],
  },
  {
    Id: "2",
    UserName: "Jane Smith",
    Email: "jane.smith@example.com",
    Role: "User",
    DepartmentIds: [2],
  },
  // Add more users as needed
];

const departments: Department[] = [
  {
    DepartmentId: 1,
    Name: "Engineering",
  },
  {
    DepartmentId: 2,
    Name: "Marketing",
  },
  // Add more departments as needed
];

interface EditUserFormProps {
  user: UserModel | null;
}

const departmentss = Array.from(
  new Set(departments.map((department) => department.Name))
);
const roles = Array.from(new Set(users.map((user) => user.Role)));

function AddUserForm() {
  return (
    <>
      <Label>
        <span>Email</span>
        <Input className="mt-1" type="email" placeholder="Enter Email" />
      </Label>
      <Label className="mt-4">
        <span>Password</span>
        <Input className="mt-1" type="password" placeholder="Enter Password" />
      </Label>
      <Label className="mt-4">
        <span>UserName</span>
        <Input className="mt-1" placeholder="Enter UserName" />
      </Label>
      <Label className="mt-4">
        <span>Role</span>
        <Select className="mt-1">
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
        <Select className="mt-1">
          <option value="">Select Department</option>
          {departmentss.map((department, index) => (
            <option key={index} value={department}>
              {department}
            </option>
          ))}
        </Select>
      </Label>
    </>
  );
}
function EditUserForm({ user }: EditUserFormProps) {
  const [email, setEmail] = useState(user?.Email || "");
  const [userName, setUserName] = useState(user?.UserName || "");
  const [role, setRole] = useState(user?.Role || "");
  const [departmentIds, setDepartmentIds] = useState(user?.DepartmentIds || []);
  return (
    <>
      <Label>
        <span>Email</span>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Label>
      <Label>
        <span>Username</span>
        <Input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </Label>
      <Label>
        <span>Role</span>
        <Select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </Select>
      </Label>
      <Label>
        <span>Departments</span>
        <Select
          multiple
          value={departmentIds.map(String)}
          onChange={(e) =>
            setDepartmentIds(
              Array.from(e.target.selectedOptions, (option) =>
                Number(option.value)
              )
            )
          }
          required
        >
          <option value="1">Engineering</option>
          <option value="2">Marketing</option>
        </Select>
      </Label>
    </>
  );
}

function Users() {
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

  const deleteUser = () => {
    // TODO: Implement delete logic here
    closeDeleteUserModal();
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

  useEffect(() => {
    let filteredUsers = users.filter(
      (user) =>
        user.UserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.Email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (departmentFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.DepartmentIds.some(
          (departmentId) =>
            departments.find(
              (department) => department.DepartmentId === departmentId
            )?.Name === departmentFilter
        )
      );
    }
    if (roleFilter) {
      filteredUsers = filteredUsers.filter((user) => user.Role === roleFilter);
    }
    setData(
      filteredUsers.slice((page - 1) * resultsPerPage, page * resultsPerPage)
    );
  }, [page, searchTerm, departmentFilter, roleFilter]);

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
              <Button>Add</Button>
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
            <option key={i} value={department.Name}>
              {department.Name}
            </option>
          ))}
        </Select>
      </div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Id</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Departments</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{user.Id}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.UserName}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.Email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.Role}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {user.DepartmentIds.map(
                      (id) =>
                        departments.find((d) => d.DepartmentId === id)?.Name
                    ).join(", ")}
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
          <Button>Save</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={isDeleteUserModalOpen} onClose={closeDeleteUserModal}>
        <ModalHeader>Delete User</ModalHeader>
        <ModalBody>
          Are you sure you want to delete user {userToDelete?.UserName}?
        </ModalBody>
        <ModalFooter>
          <Button layout="outline" onClick={closeDeleteUserModal}>
            Cancel
          </Button>
          <Button onClick={deleteUser}>Delete</Button>
        </ModalFooter>
      </Modal>
    </Layout>
  );
}

export default Users;
