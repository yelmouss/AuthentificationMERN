import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const AuthGuard = ({ children }) => {
    const navigate = useNavigate()
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Si l'utilisateur n'a pas de token, rediriger vers la page de connexion
            navigate('/login');
            return;
        }
        try {
            const decodedToken = jwtDecode(token);

            // Vérifiez si la date d'expiration du token est dépassée
            if (decodedToken.exp * 1000 < Date.now()) {
                // Token expiré, supprimer le token et rediriger vers la page de connexion
                localStorage.removeItem('token');
                navigate('/login');
            }
        } catch (error) {
            // Erreur lors du décodage du token, supprimer le token et rediriger vers la page de connexion
            localStorage.removeItem('token');
            navigate('/login');
        }
    }, [navigate]);

    return children;
};

export default AuthGuard;
