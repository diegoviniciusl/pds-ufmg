import React, { useEffect, useState } from 'react';
import { CreateUserModal, UpdateUserModal, UsersTable } from './components';
import usersService from './services/users-service';
import { CreateUserAttributes, UpdateUserAttributes } from '../../interfaces';
import { User } from '../../models';
import TopLayout from './components/top-layout/top-layout';
import searchHelper from '../../shared/utils/search-helper';

export default function Users() {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState<boolean>(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState<boolean>(false);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [usersSearchTerm, setUsersSearchTerm] = useState<string>('');

  const fetchUsersData = async () => {
    setLoadingUsers(true);

    const fetchedUsers = await usersService.getUsers().catch(() => []);
    setUsers(fetchedUsers);

    setLoadingUsers(false);
  };

  const openUpdateUserModal = (user: User) => {
    setSelectedUser(user);
    setIsUpdateUserModalOpen(true);
  };

  const closeUpdateUserModal = () => {
    setSelectedUser(null);
    setIsUpdateUserModalOpen(false);
  };

  const handleCreateUser = async (createUserAttributes: CreateUserAttributes) => {
    await usersService.createUser(createUserAttributes).then((createdUser) => {
      setUsers([...users, createdUser]);
      setIsCreateUserModalOpen(false);
    }).catch(() => {
      setIsCreateUserModalOpen(true);
    });
  };

  const handleUpdateUser = async (updateUserAttributes: UpdateUserAttributes) => {
    await usersService.updateUser(updateUserAttributes).then((updatedUser) => {
      const updatedUsers = users.map((user) => {
        if (user.userId === updatedUser.userId) return updatedUser;
        return user;
      });

      setUsers(updatedUsers);
      closeUpdateUserModal();
    }).catch(() => {
      setIsUpdateUserModalOpen(true);
    });
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  useEffect(() => {
    const filtered = searchHelper.getFilteredRecordsBySearchTerm<User>(users, usersService.partialMatchKeys, usersService.fullMatchKeys, usersSearchTerm);
    setFilteredUsers(filtered);
  }, [users, usersSearchTerm]);

  return (
    <div className="flex flex-col">
      <CreateUserModal
        isOpen={isCreateUserModalOpen}
        onClose={() => setIsCreateUserModalOpen(false)}
        createUser={handleCreateUser}
      />

      {selectedUser && (
        <UpdateUserModal
          isOpen={isUpdateUserModalOpen}
          onClose={closeUpdateUserModal}
          updateUser={handleUpdateUser}
          user={selectedUser}
        />
      )}

      <div className="mb-5">
        <TopLayout
          setIsCreateUserModalOpen={setIsCreateUserModalOpen}
          onSearchTermChange={(searchTerm: string) => setUsersSearchTerm(searchTerm)}
        />
      </div>

      <UsersTable users={filteredUsers} loadingUsers={loadingUsers} onUpdateUser={openUpdateUserModal} />
    </div>
  );
}
