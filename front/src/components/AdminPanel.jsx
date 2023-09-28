import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Container } from 'react-bootstrap';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net';
import AdminStats from './AdminStats';
import { deleteUser, editUser } from './functions/userApi';
import {

    MdRestoreFromTrash,
    MdEditNote
} from "react-icons/md";

const AdminPanel = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [isTableInitialized, setIsTableInitialized] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({}); // Un seul état pour les modifications
    const [statistics, setStatistics] = useState([]);

    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const handleFetchAdminUsers = async () => {
        try {
            const response = await axios.get('https://apitest-ruby.vercel.app/api/listAdminUsers');
            setUsers(response.data);
        } catch (error) {
            console.error(error);
            setError('Erreur lors de la récupération des utilisateurs.');
        }
    };

    const handleCheckIsAdmin = async (userId) => {
        try {
            const response = await axios.get(`https://apitest-ruby.vercel.app/api/isAdmin/${userId}`);
            const isAdmin = response.data.isAdmin;
            setIsAdmin(isAdmin);
        } catch (error) {
            console.error(error);
            setError('Erreur lors de la vérification du statut administrateur.');
        }
    };

    const handleUpdateStatistics = (newStatistics) => {
        setStatistics(newStatistics);
    };

    const handleStartEditing = (user) => {
        setIsEditing(true);
        setEditedUser(user);
    };

    const handleCancelEditing = () => {
        setIsEditing(false);
        setEditedUser({});
    };

    const handleSaveChanges = async () => {
        try {
            await axios.put(`https://apitest-ruby.vercel.app/api/editAdminUser/${editedUser._id}`, {
                username: editedUser.username,
                isAdmin: editedUser.isAdmin,
                FullName: editedUser.FullName,
            }, { headers });

            handleFetchAdminUsers();
            handleCancelEditing();
            handleUpdateStatistics();
        } catch (error) {
            console.error(error);
            setError("Erreur lors de la mise à jour de l'utilisateur.");
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId, isAdmin, headers);
            handleFetchAdminUsers();
            handleUpdateStatistics();
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        handleFetchAdminUsers();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const isUserLoggedIn = !!token;

        if (isUserLoggedIn) {
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;
            handleCheckIsAdmin(userId);
        }
    }, []);

    useEffect(() => {
        if (users.length === 0) return;

        if (!isTableInitialized) {
            // Détruire la table existante si elle existe
            if (table) {
                table.destroy();
            }

            // Créer la nouvelle table DataTables
            const newTable = $(tableRef.current).DataTable({
                responsive: {
                    details: false
                },
                processing: true,
                language: {
                    processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
                },
                aaSorting: [[1, 'asc']]
            });

            // Mettre à jour l'état de la table
            setTable(newTable);

            setIsTableInitialized(true);
        }
    }, [users, isAdmin, isTableInitialized]);

    const tableRef = useRef(null);
    const [table, setTable] = useState(null);

    return (
        <>

            <AdminStats onUpdateStatistics={handleUpdateStatistics} />
            <Container className='p-5 bg-dark text-light  bg-opacity-75 ' fluid>

                <h1>Admin Panel</h1>
                {error && <p className="error">{error}</p>}
                <div className="table-responsive p-2">
                    <table className='table table-bordered p-2  text-center' ref={tableRef}>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Full Name</th>
                                <th>Admin</th>
                                <th>Confirmed Email</th>
                                <th>Modify</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>
                                        {isEditing && editedUser._id === user._id ? (
                                            <input
                                                type="text"
                                                value={editedUser.username}
                                                onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })} />
                                        ) : (
                                            user.username
                                        )}
                                    </td>
                                    <td>
                                        {isEditing && editedUser._id === user._id ? (
                                            <input
                                                type="text"
                                                value={editedUser.FullName}
                                                onChange={(e) => setEditedUser({ ...editedUser, FullName: e.target.value })} />
                                        ) : (
                                            user.FullName
                                        )}
                                    </td>
                                    <td>
                                        {isEditing && editedUser._id === user._id ? (
                                            <select
                                                value={editedUser.isAdmin}
                                                onChange={(e) => setEditedUser({ ...editedUser, isAdmin: e.target.value === "true" })}
                                            >
                                                <option value={true}>Yes</option>
                                                <option value={false}>No</option>
                                            </select>
                                        ) : (
                                            user.isAdmin ? 'Yes' : 'No'
                                        )}
                                    </td>
                                    <td>{user.confirmed ? 'Yes' : 'No'}</td>
                                    <td>
                                        {isEditing && editedUser._id === user._id ? (
                                            <>
                                                <button onClick={handleSaveChanges}>Enregistrer</button>
                                                <button onClick={handleCancelEditing}>Annuler</button>
                                            </>
                                        ) : (
                                            <div>


                                                <MdEditNote className="edit-button fs-2 text-dark"
                                                    onClick={() => handleStartEditing(user)}
                                                    disabled={!isAdmin} />


                                                <MdRestoreFromTrash

                                                    className="delete-button fs-2 text-danger"
                                                    onClick={() => handleDeleteUser(user._id)}
                                                    disabled={!isAdmin} />



                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Container></>
    );
};

export default AdminPanel;
